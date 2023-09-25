<template>
  <div class="comments-wrapper">
    <div class="comments">
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
            <p v-else class="Lreply_N">没有更多了</p>
          </div>
        </li>
      </ul>
      <div>
        <a v-if="newComment.ismore && loading" class="F_Lreply">正在加载...</a>
        <p v-if="!newComment.ismore" class="F_Lreply_N">没有更多了</p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { reactive, onMounted, ref, defineProps } from 'vue';
import { subComment, getFirstComment_a, getSecondComment_a } from '@/api/shop/shop.js'
import headPortrait from '@/components/user/headPortrait.vue'
import { getUserData_a } from '@/api/UserApis.js'
import { ElMessage } from 'element-plus'
// 用来路由传参 (router用来跳转,route用来获取参数)
import { useRoute } from 'vue-router'
import router from '@/router';

const route = useRoute()

const props = defineProps({
  belong_user_id: String,
})

// 本用户id
const useravatar = ref('')

// 商品一级评论
let comments1 = reactive([])
// 商品二级评论
let comments2 = reactive([])

// 商品一级评论内容
const newComment = reactive({
  content: '',
  ismore: true,
  userId: 0,
  mainId: 0
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
  const data = {
    userId: newComment.userId,
    commentType: '文章一级评论',
    commentObjectId: newComment.mainId,
    content: newComment.content,
  }
  console.log(data);
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
  // 将表单提交的评论添加到一级评论中
  const data = {
    userId: newComment.userId,
    commentType: '文章二级评论',
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
  // } else {
  //   ElMessage({
  //     message: '请先登录',
  //     type: 'error'
  //   })
  // }

}

//提交三级评论 
const submitComment3 = async (comment, comments) => {
  // let isL = await isLogin()
  // if (isL) {
  // 将表单提交的评论添加到一级评论中
  console.log('hahah', comment);
  const data = {
    userId: newComment.userId,
    commentType: '文章二级评论',
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
  // } else {
  //   ElMessage({
  //     message: '请先登录',
  //     type: 'error'
  //   })
  // }

}

// 打开回复框
const addReply = async (comment, comments) => {
  // let isL = await isLogin()
  // if (isL) {
  console.log(comment);
  console.log(comments);
  comments.forEach(com => {
    if (com.commentId == comment.commentId) {
      comment.isReply = !comment.isReply
    } else {
      com.isReply = false
    }
  })
  // } else {
  //   ElMessage({
  //     message: '请先登录',
  //     type: 'error'
  //   })
  // }
}

// 加载动画
const loading = ref(false)
let pageNum = 1;
let defierence = 0;
// 获取一级评论
const getFirstComment = () => {
  const data = {
    commentObjectId: newComment.mainId,
    commentType: '文章一级评论',
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
    commentType: '文章二级评论',
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

onMounted(() => {

  // 获取本用户id
  newComment.userId = parseInt(localStorage.getItem('uid'))
  // 获取商品id
  console.log('路由id', route.params.articleID);
  newComment.mainId = parseInt(route.params.articleID)

  getUserData_a(newComment.userId).then(res => {
    let data = res.data.data

    console.log('获取了用户数据', data);
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
</script>
  
  
<style lang="scss" scoped>
.Mbutton {
  width: 80px;
  color: #f2f2f2;
  z-index: 100;
  height: 35px;
  line-height: 35px;
  padding-right: 8px;
  padding-left: 8px;
  margin-top: 27px;
  margin-left: 9px;
  border-radius: 13px;
  transition: border-color 0.4s;
  /* 添加边框颜色过渡效果 */
  position: relative;
  /* 添加相对定位，用于伪元素的绝对定位 */
  border-bottom: 1px solid #585e58;
  background-color: #070501;
  border-top: none;
  border-left: none;
  border-right: none;
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
  border-color: #fff;
  /* 添加边框颜色 */
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
    border-color: #fff;
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
      width: 75%;
      height: 100%;
      padding: 5px 10px;
      border: 1px solid var(--Ga1);
      border-radius: 6px;
      background-color: var(--bg3);
      font-family: inherit;
      line-height: 38px;
      resize: none;
      outline: none;
      background-color: #2a2a29;
      color: #f2f2f2;
    }

    textarea:focus {
      background-color: #1a1a1a;
    }

    .subFir {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .firComment {
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

        .commentMain {
          display: flex;
          width: 80%;
          flex-direction: column;
          height: 100%;

          .commentName {
            margin-right: 5px;
            margin-bottom: 10px;
            color: #f2f2f2;
          }

          .commentContent {
            color: #f2f2f2;
          }
        }
      }

      .secComment {
        margin-top: 5px;

        .headPor {
          width: 36px;
          height: 36px;
          margin-right: 46px;
          margin-top: -6px;
        }

        .comment:hover {
          background-color: #070501;
        }

        .comment {
          display: flex;
          justify-content: space-between;
          background-color: #1a1a1a;
          border-radius: 10px;

          .commentMain {
            display: flex;
            width: 76%;
            flex-direction: column;
            height: 100%;

            .commentName {
              margin-right: 5px;
              margin-bottom: 10px;
              color: #f2f2f2;
            }

            .commentContent {
              color: #f2f2f2;
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

    .Lreply:hover {
      color: #00aeec;
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