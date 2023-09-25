<template>

  <div class="top_nav_wrapper">

    <div class="logo">

      <img src="https://askhub-v1-1317893442.cos.ap-beijing.myqcloud.com/askhub/14629076786483200.png" alt="" />

    </div>

    <div class="top_nav_right">

      <router-link to="/articleDrafts">

        <button class="Mbutton" plain>草稿箱</button>

      </router-link>

      <button class="Mbutton" type="primary" @click="drawerBT">

        发布

      </button>

      <el-drawer v-model="drawer" title="I am the title" :with-header="false">

        <span class="sub_set">

          <div class="sub_wrapper">

            <span class="sub_text">*文章类别 : </span>

            <div class="set_class">

              <!-- <button :class="{class_active:isActive}" @click="changeButClass">类别1</button> -->

              <button v-for="(item, index) in cateGory.article_cateGory" :key="item.categoryId"

                @click="changeButClass(item.categoryId)" :class="{ class_active: item.isActive }">{{

                  item.categoryName }}</button>

            </div>

          </div>

          <div class="sub_wrapper sub_label">

            <span class="sub_text">*标签 : </span>

            <div class="set_label">

              <el-select v-model="form.labelsId" multiple placeholder="请添加搜索标签">

                <el-option v-for="item in options" v-show="form.category == item.category_id && form.labelsId.length < 3"

                  :key="item.label_id" :label="item.label_name" :value="item.label_name" />

              </el-select>

            </div>

          </div>

          <div class="sub_wrapper">

            <span class="sub_text">封面 : </span>

            <div class="subImgWrapper">

              <div class="up_img">

                <el-icon class="avatar-uploader-icon">

                  <Plus />

                </el-icon>

                <input id="file" class="img_input" type="file" @change="handleFileUpload" accept="image/*">

                <div v-if="uploadImg.uploadedImageUrl">

                  <img :src="uploadImg.uploadedImageUrl" alt="Uploaded Image" class="sub_img">

                </div>

              </div>

            </div>

          </div>

          <div class=" sub_wrapper">

            <span class="sub_text">*摘要 : </span>

            <div class="summary-box">

              <textarea class="summary-textarea" v-model="content.articleContent" @input="handleInput"

                placeholder="请输入文章内容"></textarea>

              <p class="summary-info">

                字数：{{ content.summaryCount }}/{{ content.maxCount }}

                <button type="submit" @click="getContent">一键输入</button>

              </p>

            </div>

          </div>

          <div class="sub_wrapper">

            <span class="sub_text">*是否公开 : </span>

            <div>

              <el-radio-group v-model="form.publicOrNot">

                <el-radio label="1" border>公 开</el-radio>

                <el-radio label="0" border>不公开</el-radio>

              </el-radio-group>

            </div>

          </div>

          <div class="sub_wrapper">

            <!-- <span class="sub_text">测试 : </span> -->

            <div class="clearSub">

              <el-button type="primary" @click="subArticle(form)">

                确认发布

              </el-button>

            </div>

          </div>

        </span>

      </el-drawer>

      <a href="javascript:;" class="right_a">

        <headPortrait />

      </a>

    </div>

  </div>

  <div class="form_wrapper">

    <form class="form_main" method="post">

      <div class="tit">

        <input type="text" placeholder="请输入标题……" v-model="form.title" @input="titL" @keydown.enter="handleEnterKey">



      </div>

      <TEditor ref="editor" :richTextContent="richTextContent" v-model="state.content" />

    </form>

  </div>

</template>

  

<script setup>

// 引入富文本组件

import TEditor from '@/components/article/vl-tinymce.vue'

import { onMounted, reactive, toRef, watch, onBeforeUnmount, watchEffect, } from 'vue'

import { ref } from 'vue'

import { getCategory, upload, subArticle_a, getArticleTag_a, saveArticleDraft_a, getArticleDraftById_a } from '@/api/ArticleApis.js'

import { Plus, Delete } from '@element-plus/icons-vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import { onBeforeRouteLeave } from 'vue-router'

import headPortrait from '@/components/user/headPortrait.vue'



// 引入userSoure

import userStore from "@/store/user/user.js";

let userstore = userStore();



const drawer = ref(false);



// 点击发布表单验证

const drawerBT = () => {

  if (form.title == "") {

    ElMessage({

      message: "请填写文章题目！",

      type: "error",

    });

    return false;

  }

  if (form.content == "") {

    ElMessage({

      message: "请填写文章内容！",

      type: "error",

    });

    return false;

  }

  drawer.value = true;

};



let state = reactive({

  content: "", //获取TEditor的内容

});



watch(

  () => state.content,

  () => {

    //监控TEditor内容的变化

    console.log(state.content)

    form.content = state.content

  })



let richTextContent = ref('')



onMounted(() => {

  // 执行获取文章类别

  getCategory2()

  form.userId = localStorage.getItem('uid')

  // 获取文章标签

  getArticleTag()



  // 获取草稿

  if (localStorage.getItem('draftId')) {

    let id = localStorage.getItem('draftId')

    getArticleDraftById_a(id).then(res => {

      let data = res.data.data;

      draftData.draftArticleID = data.draftArticleID;

      form.title = data.title;

      console.log('data.content', data.content);

      richTextContent.value = data.content;

    })

    localStorage.setItem('draftId', '')

  }



  // window.addEventListener('beforeunload', e => beforeunloadHandler(e))

  // window.addEventListener('unload', e => unloadHandler(e))

})



// onBeforeUnmount(() => {

//   console.log('213122222222222222222222222222222');

//   window.removeEventListener('beforeunload', e => beforeunloadHandler(e));

//   window.removeEventListener('unload', unloadHandler())

// })



// let beginTime = 0;

// let differTime = 0;

// const beforeunloadHandler = (e) => {

//   // // 取消事件的默认行为，以便弹出确认框

//   // e.preventDefault();

//   // // 设置提示消息

//   // e.returnValue = 'hahahha';

//   // console.log('点击退出');



//   beginTime = new Date().getTime()



//   e = e || window.event;

//   if (e) {

//     e.returnValue = '关闭提示';

//   }

//   return '关闭提示';

// }



// // 保存草稿

// const draftData = ({

//   belongUserID: '4546404013838336',

//   title: '草稿1',

//   content: '草稿1',

//   draftArticleID: ''

// })



// const unloadHandler = async () => {

//   let formData = jsonToFormData(draftData);



//   await saveArticleDraft_a(formData)

//   console.log('确认退出');

// }





// 发布文章需要的数据

let form = reactive({

  userId: '',//发布人ID

  category: '',//文章类别

  title: '',//文章标题

  briefIntroduction: '',//文章概要

  thumbnail: '',//封面

  content: '',//文章内容

  publicOrNot: '1',//是否公开

  labelsId: [],//文章标签

})



let istit = ref(true)



// 监控标题长度，限制标题

const titL = (() => {

  console.log(form.title.length);

  if (form.title.length > 80) {

    form.title = form.title.slice(0, 80)

  }

})





const editor = ref();

//标题框回车光标定位再文本框

const handleEnterKey = (event) => {

  // //阻止事件行为

  event.preventDefault();

};



// 发布文章

const subArticle = async (form) => {

  if (form.userId == '') {

    await userstore.getUserData();

    form.userId = userstore.userId

  }

  if (form.category == '') {

    ElMessage({

      message: '请选择文章类别！',

      type: 'error',

    })

    return false;

  }

  if (form.labelsId == '') {

    ElMessage({

      message: '请选择文章标签！',

      type: 'error',

    })

    return false;

  }

  if (form.briefIntroduction == '') {

    ElMessage({

      message: '请填写文章摘要！',

      type: 'error',

    })

    return false;

  }



  console.log(form);



  let formData = jsonToFormData(form);



  subArticle_a(formData).then((res) => {

    console.log(res);

    ElMessage({

      message: "文章发布成功！",

      type: "success",

    });

  });

};



//循环传入的值转换formData

const jsonToFormData = (config) => {

  const formData = new FormData();

  Object.keys(config).forEach((key) => {

    formData.append(key, config[key]);

  });

  return formData;

};





// 文章类比按钮改变样式

// 获取文章类别

let cateGory = reactive({

  article_cateGory: [],

});

const getCategory2 = () => {

  getCategory().then((res) => {

    res.data.data.map((item) => {

      item.isActive = false;

    });

    cateGory.article_cateGory = res.data.data;

  });

};

const changeButClass = (button_click) => {
