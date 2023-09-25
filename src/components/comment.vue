<template>
  <div class="comments-wrapper">
    <div v-if="isLogin" class="comments">
      <p class="conT">评论</p>
      <!-- 一级评论框 -->
      <form class="subFir" @submit.prevent="submitComment">
        <div class="headPor" @click="tomy">
          <headPortrait :useravatar='useravatar.avatar_path' />
        </div>
        <textarea v-model="newComment.content" placeholder="评论内容" required></textarea>
        <button class="Mbutton" type="submit">评论</button>
      </form>
      <ul v-infinite-scroll="throttledFunc">
        <!-- 一级评论 -->
        <li class="firComment" v-for="comment in comments1" :key="comment.commentId">
          <div class="comment">
            <!-- 评论人头像 -->
            <div class="headPor" @click="toPerson(comment)">
              <headPortrait :useravatar='comment.publisherInformation.avatar_path' />
            </div>
            <!-- 评论内容 -->
            <div class="commentMain">
              <strong class="commentName">{{ comment.publisherInformation.nick_name }}</strong>
              <p class="commentContent">{{ comment.content }}</p>
            </div>
            <!-- <button class="Mbutton" @click="addReply(comment, comments1)">回复</button> -->

            <div class="Lreply2_wrapper">
              <a v-if="tocommentData.belong_user_id == useravatar.user_id" @click="deleteComment(comment)"
                class="Lreply2">删除评论</a>
            </div>

            <button class="Mbutton" @click="addReply(comment, comments1)">回复</button>
          </div>
          <!-- 二级评论框 -->
          <form class="subSec" v-if="comment.isReply" @submit.prevent="submitComment2(comment)">
            <div class="headPor" @click="tomy">
              <headPortrait :useravatar='useravatar.avatar_path' />
            </div>
            <textarea v-model="newComment2.content" placeholder="评论内容" required></textarea>
            <button class="Mbutton" type="submit">评论</button>
          </form>
          <!-- 二级评论 -->
          <ul v-if="comment.replies">
            <li class="secComment" v-for="comment2 in comment.replies" :key="comment2.commentId">
              <div class="reply comment">
                <!-- 评论人 -->
                <div class="headPor" @click="toPerson(comment2)">
                  <headPortrait :useravatar='comment2.publisherInformation.avatar_path' />
                </div>
                <!-- v-if="comment.commentedUser.user_id!=0" -->
                <div class="commentMain">
                  <div v-if="comment2.commentedUser.user_id == 0">
                    <strong class="commentName">{{ comment2.publisherInformation.nick_name }}</strong>
                  </div>
                  <div v-else>
                    <strong class="commentName">{{ comment2.publisherInformation.nick_name }}</strong>
                    <strong class="commentName"> 回复了 {{ comment2.commentedUser.nick_name
                    }}</strong>
                  </div>
                  <!-- 评论内容 -->
                  <p class="commentContent">{{ comment2.content }}</p>
                </div>
                <div class="Lreply2_wrapper">
                  <a v-if="tocommentData.belong_user_id == useravatar.user_id" @click="deleteComment(comment2)"
                    class="Lreply2">删除评论</a>
                </div>
                <button class="Mbutton" @click="addReply(comment2, comment.replies)">回复</button>
              </div>
              <form class="subSec" v-if="comment2.isReply" @submit.prevent="submitComment3(comment, comment2)">
                <div class="headPor">
                  <headPortrait :useravatar='useravatar.avatar_path' />
                </div>
                <textarea v-model="newComment3.content" placeholder="评论内容" required></textarea>
                <button class="Mbutton" type="submit">评论</button>
              </form>
            </li>
          </ul>
          <div>
            <a v-if="comment.ismore" @click="getSecondComment(comment)" class="Lreply">查看回复</a>
            <a v-else class="Lreply_N">没有更多了</a>
          </div>
        </li>
      </ul>
      <div>
        <a v-if="newComment.ismore && loading" class="F_Lreply">正在加载...</a>
        <p v-if="!newComment.ismore" class="F_Lreply_N">没有更多了</p>
      </div>
    </div>
    <div v-else class="comments">
            <p class="conT">评论</p>

            <router-link to="/login">
              <p class="noLogin"> 请先登录 </p>
            </router-link>
    </div>
  </div>
  <h1>
  </h1>
</template>
  
<script setup>
import { reactive, onMounted, ref, defineProps,watchEffect } from 'vue';
import { subComment, getFirstComment_a, getSecondComment_a, deleteComment_a, deleteShopComment_a, deleteArticleComment_a } from '@/api/shop/shop.js'
import headPortrait from '@/components/user/headPortrait.vue'
import { getUserData_a } from '@/api/UserApis.js'
import { ElMessage } from 'element-plus'
import router from '@/router';
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入是否登录方法
// import isLogin from '@/hokes/isLogin.js'
// 用来路由传参 (router用来跳转,route用来获取参数)
import { useRoute } from 'vue-router'
const route = useRoute()

const props = defineProps({
  tocommentData: {
    type: String,
    default: ''
  }
})
// 是否登录
const isLogin = ref(false)

// 本用户id
const useravatar = ref('')

// 商品一级评论
let comments1 = reactive([])
// 商品二级评论
let comments2 = reactive([])

// 传过来的数据
let tocommentData = reactive({})

// 商品一级评论内容
const newComment = reactive({
  content: '',
  ismore: true,
  userId: '',
  mainId: ''
})


// 商品二级评论内容
const newComment2 = reactive({
  content: ''
})

// 商品三级评论内容
const newComment3 = reactive({
  content: ''
})

//提交一级评论 
const submitComment = async () => {

  // 将表单提交的评论添加到一级评论中
  console.log('a1111111111?',newComment.userId);
  const data = {
    userId: newComment.userId.toString(),
    commentObjectId: newComment.mainId,
    commentType: tocommentData.commentStyle + '一级评论',
    content: newComment.content,
  }
  console.log('a11111111?',data.userId);
  subComment(data).then(res => {
    console.log('一级评论', res);
    if (res.data.message == 'success') {
      ElMessage({
        message: "评论成功！",
        type: "success",
      });
      newComment.ismore = true
      getFirstComment()
    }
  })
  newComment.content = '';
}

//提交二级评论 
const submitComment2 = async (comment) => {

  // let isL = await isLogin()
  // if (isL) {
  // } else {
  //   ElMessage({
  //     message: '请先登录',
  //     type: 'error'
  //   })
  // }
    // 将表单提交的评论添加到一级评论中
    const data = {
      userId: newComment.userId,
      commentType: tocommentData.commentStyle + '二级评论',
      commentObjectId: comment.commentId,
      content: newComment2.content,
    }
    subComment(data).then(res => {
      if (res.data.message == 'success') {
        ElMessage({
          message: "评论成功！",
          type: "success",
        });
      }
    })
    newComment2.content = '';


}

//提交三级评论 
const submitComment3 = async (comment, comments) => {
  // let isL = await isLogin()
  // if (isL) {
  // } else {
  //   ElMessage({
  //     message: '请先登录',
  //     type: 'error'
  //   })
  // }
    // 将表单提交的评论添加到一级评论中
    console.log('hahah', comment);
    const data = {
      userId: newComment.userId,
      commentType: tocommentData.commentStyle + '二级评论',
      commentObjectId: comment.commentId,
      content: newComment3.content,
      respondentId: comments.publisherInformation.user_id,
    }
    subComment(data).then(res => {
      ElMessage({
        message: "评论成功！",
        type: "success",
      });
    })
    newComment3.content = '';


}

// 打开回复框
const addReply = async (comment, comments) => {
  // let isL = await isLogin()
  // if (isL) {
  // } else {
  //   ElMessage({
  //     message: '请先登录',
  //     type: 'error'
  //   })
  // }
    console.log(comment);
    console.log(comments);
    comments.forEach(com => {
      if (com.commentId == comment.commentId) {
        comment.isReply = !comment.isReply
      } else {
        com.isReply = false
      }
    })

}

// 加载动画
const loading = ref(false)
let pageNum = 1;
let defierence = 0;
// 获取一级评论
const getFirstComment = () => {
  console.log('newComment.mainId', tocommentData);

  const data = {
    commentObjectId: newComment.mainId,
    commentType: tocommentData.commentStyle + '一级评论',
    pageNum: pageNum,
    pageSize: 3,
  }

  if (newComment.ismore) {

    loading.value = true

    setTimeout(function () {
      getFirstComment_a(data).then(res => {
        // console.log('获取一级评论', res.data.data);

        if (res.data.data == null) {
          // 没有更多了
          newComment.ismore = false;
          return;
        }
        if (res.data.data.length < data.pageSize) {
          // 没有更多了
          newComment.ismore = false;
        }
        loading.value = false
        // 将新的数据添加到 comments1 中
        if (res.data.data.length > 0) {
          // 请求到实际的数据和需求数据的差，用来判断下次请求该是怎样的

          console.log('defierence', defierence);
          let size = data.pageSize - res.data.data.length
          if (size == 0) {
            pageNum++
            res.data.data = res.data.data.slice(defierence)
            // console.log('nishuone1', res.data.data);
            defierence = 0
          }
          if (size > 0) {
            let data = res.data.data
            res.data.data = data.slice(defierence)
            defierence = data.length
            // console.log('nishuone1', res.data.data);
          }

          res.data.data.forEach(comment => {
            // 添加回复判断
            comment.isReply = false;
            // 添加回复数组
            comment.replies = [];
            // 添加层级
            comment.level = 1;
            // 添加查看回复判断
            comment.ismore = true;
            // 添加分页信息
            comment.pageNum = 1;

            comments1.push(comment);
          });
        }
      })
    }, 1500);
  }
}


// 创建一个节流函数
function throttle(func, delay) {
  let lastExecutionTime = 0;
  return function () {
    const currentTime = Date.now();

    if (currentTime - lastExecutionTime > delay) {
      func();
      lastExecutionTime = currentTime;
    }
  };
}
// 在组件的setup函数中初始化节流函数
const throttledFunc = throttle(getFirstComment, 1500);


// 获取二级评论
const getSecondComment = (comment) => {
  let pageNum = 1;
  const data = {
    commentObjectId: comment.commentId,
    commentType: tocommentData.commentStyle + '二级评论',
    pageNum: comment.pageNum,
    pageSize: 2,
  }
  comment.pageNum++;

  console.log('666', comment);
  comments1.forEach(com => {
    if (com.commentId == comment.commentId) {
      getSecondComment_a(data).then(res => {
        console.log('hahah', res);
        if (res.data.data == null) {
          // 没有更多了
          comment.ismore = false;
          return;
        }
        if (res.data.data.length < data.pageSize) {
          // 没有更多了
          comment.ismore = false;
        }

        console.log('获取二级评论', res.data.data);
        // 将新的数据添加到 comments1 中
        res.data.data.forEach(comment => {
          // 添加回复判断
          comment.isReply = false;
          // 添加回复数组
          comment.replies = [];
          // 添加层级
          comment.level = 2;

          com.replies.push(comment);
        });
        console.log('获取了二级评论', comments1);
      })
      return;
    }
  })


}
// 获取三级评论
const getThirdComment = (comment) => {
  console.log(123);
  const data = {
    commentObjectId: comment.commentId,
    commentType: tocommentData.commentStyle + '二级评论',
    pageNum: 1,
    pageSize: 3,
  }

  comments1.forEach(com => {
    if (com.commentId == comment.commentId) {
      getSecondComment_a(data).then(res => {
        console.log('获取二级评论', res.data.data);
        // 将新的数据添加到 comments1 中
        res.data.data.forEach(comment => {
          // 添加回复判断
          comment.isReply = false;
          // 添加回复数组
          comment.replies = [];
          // 添加层级
          comment.level = 2;
          com.replies.push(comment);
        });
        console.log('获取了二级评论', comments1);
      })
      return;
    }
  })


}
// watchEffect(()=>{
//   console.log('tocommentData.styleId123456789', tocommentData.value.styleId);
// })
onMounted(() => {
  isLogin.value = localStorage.getItem('uid') ? true : false;
  tocommentData = props.tocommentData
  console.log('诶嘿123', tocommentData);
  // 获取本用户id
  newComment.userId = localStorage.getItem('uid')
  console.log('hahahahahhahahha',localStorage.getItem('uid'));
  // 获取商品id
  newComment.mainId = tocommentData.styleId

  getUserData_a(newComment.userId).then(res => {
    let data = res.data.data
    useravatar.value = data;
  })

  // 获取一级评论
  throttledFunc()
})

// 去个人页面
const toPerson = (comm) => {
  if (comm.publisherInformation.user_id == useravatar.value.user_id) {
    router.push('/my/lately')
  } else {
    router.push('/OtherUsers/OtherLately?OtherUserId=' + comm.publisherInformation.user_id)
  }
}

const tomy = () => {
  router.push('/my/lately')
}

// 删除评论
const deleteComment = (com) => {
  console.log('删除评论', comments1);
  if (tocommentData.commentStyle == '商品') {
    console.log('删商品');

    deleteShopComment_a(com.commentId, useravatar.value.user_id, tocommentData.styleId).then(res => {
      console.log();
      if (res.data.message == 'success') {
        for (let i = 0; i < comments1.length; i++) {
          if (comments1[i].replies.length > 0) {
            for (let j = 0; j < comments1[i].replies.length; j++) {
              if (comments1[i].replies[j].commentId == com.commentId) {
                comments1[i].replies.splice(j, 1);
                break;
              }
            }
          }
          if (comments1[i].commentId == com.commentId) {
            comments1.splice(i, 1);
            break;
          }
        }

        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      }
    })
  } else if (tocommentData.commentStyle == '文章') {
    console.log('删文章');
    deleteArticleComment_a(tocommentData.styleId, useravatar.value.user_id, com.commentId).then(res => {
      console.log();
      if (res.data.message == 'success') {
        for (let i = 0; i < comments1.length; i++) {
          if (comments1[i].replies.length > 0) {
            for (let j = 0; j < comments1[i].replies.length; j++) {
              if (comments1[i].replies[j].commentId == com.commentId) {
                comments1[i].replies.splice(j, 1);
                break;
              }
            }
          }
          if (comments1[i].commentId == com.commentId) {
            comments1.splice(i, 1);
            break;
          }
        }

        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      }
    })
  }
}
</script>
  
  
<style lang="scss" scoped>
$background-color:#fff;
$smallFont:#515767;
$title:#000000;
$blue1:#1171ee;
$blue2:#007FFF;
$buttoncolor:#1171ee;
$burronback:#abcdff;
$buttonborder:1px solid rgba(30, 128, 255, 0.3);
$dolor:#FF6600;

.Mbutton {
  width: 80px;
  color: #f2f2f2;
  z-index: 100;
  height: 35px;
  line-height: 35px;
  padding-right: 8px;
  padding-left: 8px;
  margin-top: 20px;
  margin-left: 9px;
  // margin: 0 auto;
  border-radius: 13px;
  transition: border-color 0.4s;
  /* 添加边框颜色过渡效果 */
  position: relative;
  /* 添加相对定位，用于伪元素的绝对定位 */
	border-bottom: 1px solid #585e58;

  border-color: #252933;
	color: #252933 !important;
  border-top: none;
  border-left: none;
  border-right: none;
}

.Mbutton2 {
  font-size: 20px;
  color: #fff;
  margin-top: 35px;
  cursor: pointer;
}

/* 鼠标悬停状态下 */
button:hover {
  /* ... 其他样式 ... */
  border-color: #fff;
  /* 添加边框颜色 */
}

/* 鼠标按下状态下 */
button:active {
  /* ... 其他样式 ... */
  border-color: #585e58;
  color: #0000;
  /* 添加边框颜色 */
  transform: translateY(0);
}

/* 动态荧光白效果 */
button:hover::before,
button:active::before {
  content: '';
  /* 添加伪元素内容 */
  position: absolute;
  top: -2px;
  /* 控制位置以覆盖边框 */
  left: -2px;
  /* 控制位置以覆盖边框 */
  right: -2px;
  /* 控制位置以覆盖边框 */
  bottom: -2px;
  /* 控制位置以覆盖边框 */
  border: 1px solid transparent;
  /* 初始边框设置为透明 */
  border-radius: 13px;
  animation: glow 2s infinite;
  /* 添加动画效果 */
  border-radius: 10px;
}

/* 定义荧光动画 */
@keyframes glow {

  0%,
  100% {
    border-color: #585e58;
  }

  50% {
    border-color: transparent;
  }
}

.comments-wrapper {
  width: 100%;
  margin-top: 20px;

  .comments {
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 12px;
    // background-color: red;

    .headPor {
      width: 56px;
      height: 56px;
      margin-right: 20px;
      margin: auto;
    }

    textarea {
      width: 78%;
      height: 100%;
      padding: 5px 10px;
      border: 1px solid var(--Ga1);
      border-radius: 6px;
      background-color: var(--bg3);
      font-family: inherit;
      line-height: 38px;
      resize: none;
      outline: none;
      background-color: #f2f3f5;
      color: $smallFont;
      border: 1px solid #f2f3f5;
    }

    textarea:focus {
      background-color: #fff;
      border: 1px solid $smallFont;
    }

    .subFir {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }

    .comment:hover .Lreply2 {
      display: block;
    }

    .firComment {
      position: relative;
      border-bottom: 1px solid #585e58;
      padding-bottom: 5px;

      .subSec {
        display: flex;
        justify-content: space-between;

        .headPor {
          margin-right: 20px;
        }

        textarea {
          width: 73%;

        }

        button {
          margin-left: 20px;
        }
      }

      .comment {
        display: flex;
        justify-content: space-between;
        min-height: 60px;
        padding: 5px;

        .commentMain {
          display: flex;
          width: 70%;
          flex-direction: column;
          height: 100%;

          .commentName {
            margin-right: 5px;
            margin-bottom: 10px;
            color: $title;
          }

          .commentContent {
            color: $smallFont;
          }
        }
      }

      .secComment {
        position: relative;

        .headPor {
          width: 36px;
          height: 36px;
          margin-right: 20px;
          margin-top: 0px;
        }

        .comment:hover {
          background-color: #f2f3f5;
        }

        .comment {
          display: flex;
          justify-content: space-between;
          background-color: #fff;
          border-radius: 10px;

          .commentMain {
            display: flex;
            width: 76%;
            flex-direction: column;
            height: 100%;

            .commentName {
              margin-right: 5px;
              margin-bottom: 10px;
              color: $title;
            }

            .commentContent {
              color: $smallFont;
            }
          }
        }
      }
    }


    .Lreply {
      padding-left: 108px;
      font-size: 13px;
      color: #9499A0;
      cursor: pointer;
    }

    .Lreply2 {
      display: none;
      font-size: 13px;
      color: #9499A0;
      cursor: pointer;
    }

    .Lreply:hover {
      color: #2abd72;
    }

    .Lreply2:hover {
      color: #2abd72;
    }

    .Lreply2_wrapper {
      width: 60px;
      margin-top: 30px;
    }

    .Lreply_N {
      padding-left: 108px;
      font-size: 13px;
      color: #9499A0;
    }

    .F_Lreply {
      color: #9499A0;
      cursor: pointer;
    }

    .F_Lreply_N {
      color: #9499A0;
    }
  }
}

.comments {
  font-family: Arial, sans-serif;
  padding: 20px;

  .conT {
    font-size: 25px;
    font-weight: bold;
    color: #fff;
  }
  .noLogin{
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    padding: 20px;
    cursor: pointer;
  }
  .noLogin:hover{
    color: #2abd72;
  }
}

.comment-item {
  margin-bottom: 20px;
}

.comment {
  // background-color: #f0f0f0;
  padding: 10px;
}

.reply-button {
  background-color: #e1e1e1;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}

.replies-list {
  margin-top: 10px;
  padding-left: 20px;
}

.reply-item {
  margin-bottom: 10px;
}

.reply {
  background-color: #f9f9f9;
  padding: 10px;
}

.sub-reply-item {
  margin-bottom: 5px;
}

.sub-reply {
  background-color: #f9f9f9;
  padding: 5px;
}

.comment-form {
  margin-top: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
}
</style>