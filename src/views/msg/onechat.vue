<template>
    <div class="container">
        <div class="leftSide">
            <!--header-->
            <div class="header-top">
                <div class="userimg">
                    <img :src="chat.userMsg.avatar_path" class="cover" />
                </div>
                <h3 style="margin-left: 10px">{{ chat.userMsg.nick_name }}</h3>
                <div>
                    <!-- Form -->
                    <el-button text @click="dialogFormVisible = true">
                        创建群聊
                    </el-button>

                    <!-- 群聊名称 -->
                    <el-dialog v-model="dialogFormVisible" title="创建群聊信息">
                        <!-- 群聊人数 -->
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                            @change="handleCheckAllChange">Check all</el-checkbox>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                                city
                            }}</el-checkbox>
                        </el-checkbox-group>

            <!-- 群聊名称 -->

            <el-form :model="form" style="margin-top: 5px">
              <el-form-item>
                <el-input v-model="form.name" placeholder="请输入群聊名称" />
              </el-form-item>
            </el-form>

            <!-- 上传图片 -->

            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />

              <el-icon
                v-else
                class="avatar-uploader-icon"
                style="border: 1px solid #000"
              >
                <Plus />
              </el-icon>
            </el-upload>

            <!-- 取消确认按钮 -->

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>

                <el-button type="primary" @click="dialogFormVisible = false">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>

      <!--搜索-->

      <div class="search_chat">
        <div>
          <input type="text" placeholder="搜索..." />

          <i class="iconfont icon-sousuo" />
        </div>
      </div>

      <!--单聊列表-->

      <div v-for="(item, index) in chat.leftMenu.data" :key="item.user_id">
        <div class="chatlist">
          <!-- 高亮 -->

          <div class="block active" @click="checkChat(index)">
            <div class="imgbx">
              <img :src="item.avatar_path" class="cover" />
            </div>

            <div class="details">
              <div class="listHead">
                <h4>{{ item.nick_name }}</h4>

                <p class="time">{{ item.most_new_message_time }}</p>
              </div>

              <div class="message_p">
                <p>{{ item.most_new_message }}</p>

                <b
                  :style="
                    item.not_read_count != 0
                      ? 'background-color: #fb4a40'
                      : 'background-color:#c4c4c4'
                  "
                  v-if="item.not_read_count != 0"
                  >{{ item.not_read_count }}</b
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧聊天框 -->

    <div class="rightSide">
      <div class="header">
        <!-- 顶部聊天对象显示 -->

        <div class="imgText">
          <div class="userimg">
            <img :src="detailPerson.avatar" class="cover" />
          </div>

          <h4>
            {{ detailPerson.name }}
          </h4>
        </div>

        <ul class="nav_icons">
          <li><span class="iconfont icon-xiaoxi"></span></li>

          <li><span class="iconfont icon-gengduo"></span></li>
        </ul>
      </div>

      <!--聊天历史展示框-->

      <div class="chatBox" ref="scrollChatBox">
        <!-- chat.record.data -->

        <div v-for="(item, index) in chat.record.data" :key="index">
          <!-- 自己发送的消息 -->

          <div
            class="message my_message"
            v-if="item.send_user_id == chat.userMsg.user_id"
          >
            <span class="time">{{ item.send_time }}</span>

            <p>{{ item.content }}<br /></p>

            <el-avatar
              class="avatar"
              :size="40"
              :src="chat.userMsg.avatar_path"
            ></el-avatar>
          </div>

          <!-- 对方发送的消息 -->

          <div
            class="message frnd_message"
            v-if="item.send_user_id !== chat.userMsg.user_id"
          >
            <el-avatar
              class="avatar"
              :size="40"
              :src="detailPerson.avatar"
            ></el-avatar>

            <span class="time">{{ item.send_time }}</span>

            <!-- 消息 -->

            <p>{{ item.content }}<br /></p>
          </div>
        </div>
      </div>

      <!--聊天输入框-->

      <div class="chatbox_input">
        <div class="instrument">
          <span class="iconfont icon-biaoqing1"></span>

          <span class="iconfont icon-tupian"></span>
        </div>

        <div class="chat-text">
          <textarea
            v-model="inputVal"
            maxlength="300"
            name=""
            id=""
            cols="30"
            rows="5"
          ></textarea>

          <button class="send" @click="sendVal">发 送</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, reactive } from "vue";

import WebSocketClass from "@/utils/WebScoket";

// 引入仓库

import chatStore from "@/store/user/onechat";

let chat = chatStore();

// 群聊名称相关

const dialogTableVisible = ref(false);

const dialogFormVisible = ref(false);

const defaultInputValue = "输入群聊名称";

const form = reactive({
  name: "",

  region: "",

  date1: "",

  date2: "",

  delivery: false,

  type: [],

  resource: "",

  desc: "",
});

// 上传图片

import { ElMessage, ElTable } from "element-plus";

import { Plus } from "@element-plus/icons-vue";

const imageUrl = ref("");

const handleAvatarSuccess = function (response, uploadFile) {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = function (rawFile) {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");

    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("Avatar picture size cannot exceed 2MB!");

    return false;
  }

  return true;
};

// 聊天列表

const checkAll = ref(false);

const isIndeterminate = ref(true);

const checkedCities = ref(["Shanghai", "Beijing"]);

const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cities : [];

  isIndeterminate.value = false;
};

const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;

  checkAll.value = checkedCount === cities.length;

  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};

const inputVal = ref("");

let ws = new WebSocketClass(
  `ws://cong.e3.luyouxia.net:14479/api/v1/privatechat/chat?id=${localStorage.getItem(
    "uid"
  )}`,
  3
);

// 获取具体聊天人员信息

let detailPerson = reactive({
  avatar: "",

  name: "",

  id: "",
});

const list = {
  code: 50003,

  receive_id: "401295610889637888",

  msg: "0",

  is_read: false,
};

// 获取单聊对方的信息

const checkChat = (index) => {
  console.log(index);

  detailPerson.avatar = chat.leftMenu.data[index].avatar_path;

  detailPerson.name = chat.leftMenu.data[index].nick_name;

  detailPerson.id = chat.leftMenu.data[index].user_id;

  chat.leftMenu.data[index].not_read_count = 0;

  console.log(detailPerson);

  list.code = 50004;

  list.receive_id = chat.leftMenu.data[index].user_id;

  ws.send(JSON.stringify(list));

  ws.getMessage((res) => {
    console.log("聊天记录");

    console.log(JSON.parse(res.data));

    chat.record = JSON.parse(res.data);

    console.log(chat.record);
  });
};

// 发送消息

const sendVal = () => {
  list.code = 50001;

  list.receive_id = detailPerson.id;

  list.msg = inputVal.value;

  console.log(list);

  ws.send(JSON.stringify(list));

  console.log("消息已发送111");

  let pp = {
    content: inputVal.value,

    is_read: true,

    rev_user_id: detailPerson.id,

    send_time: Date.now(),

    send_user_id: chat.userMsg.user_id,
  };

  chat.record.data.push(pp);

  console.log(pp);

  ws.getMessage((res) => {
    console.log(res);

    console.log("收到消息的触发函数");

    console.log(JSON.parse(res.data));

    console.log(JSON.parse(res.data).msg); //消息

    let ppp = {
      content: JSON.parse(res.data).msg,

      is_read: true,

      rev_user_id: chat.userMsg.user_id,

      send_time: Date.now(),

      send_user_id: detailPerson.id,
    };

    console.log(ppp);

    chat.record.data.push(ppp);
  });

  inputVal.value = "";
};

// 左侧聊天列表数据

let leftMenu = {};

ws.getMessage((res) => {
  leftMenu = res.data;

  console.log("左侧聊天列表");

  console.log(leftMenu);
});

onMounted(() => {
  // 请求接口获取用户信息

  chat.userList();

  ws.send(JSON.stringify(list));
});
</script>



<style scoped>
@import url("../../assets/chatimg/iconfont.css");

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.avatar-uploader .avatar {
  width: 178px;

  height: 178px;

  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);

  border-radius: 6px;

  cursor: pointer;

  position: relative;

  overflow: hidden;

  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #000000;
    width: 178px;
    height: 178px;
    text-align: center;
}

* {
  margin: 0;

  padding: 0;

  box-sizing: border-box;

  font-family: "Open Sans", sans-serif;
}

.container {
    /* position: relative; */
    width: 1396px;
    max-width: 100%;
    height: calc(100vh - 140px);
    /* background: #fff; */
    background: #f2f3f5;
    /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.06); */
    display: flex;
}

.container .leftSide {
    /* position: relative; */
    flex: 30%;
    background: #f2f3f5;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
}

.container .rightside {
  /* position: relative; */

  flex: 70%;

  background: #e5ddd5;
}

.container .rightside::before {
  content: "";

  /* position: absolute; */

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  /* background: url("../../assets/chatimg/bgimg.jpg"); */

  opacity: 0.06;
}

.header {
    width: 100%;
    height: 60px;
    /* background: #ededed; */
    background: #f2f3f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
}

.header-top {
    width: 100%;
    height: 60px;
    /* background: #ededed; */
    background: #f2f3f5;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 15px;
}

h3,
h4 {
    color: #000000;
}

.userimg {
  display: flex;

  width: 40px;

  height: 40px;

  overflow: hidden;

  border-radius: 50%;

  cursor: pointer;
}

.cover {
  width: 100%;

  height: 100%;

  object-fit: cover;
}

.nav_icons {
  display: flex;
}

.nav_icons .iconfont {
  font-size: 25px;

  color: #f2f2f2;
}

.nav_icons .iconfont:hover {
    color: #409eff;
}

.nav_icons li {
  display: flex;

  list-style: none;

  cursor: pointer;

  /* color: #51585c; */

  color: #585e58;

  font-size: 1.5em;

  margin-left: 22px;
}

.search_chat {
  position: relative;

  width: 100%;

  height: 50px;

  /* background: #f6f6f6; */

  background: #1d1e1d;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 0 15px;
}

.search_chat div {
  width: 100%;
}

.search_chat div input {
    width: 100%;
    outline: none;
    border: none;
    /* background: #fff; */
    background: #ffffff;
    padding: 6px;
    height: 38px;
    border-radius: 30px;
    font-size: 14px;
    padding-left: 40px;
    color: #000000;
}

.search_chat div input::placeholder {
  /* color: #bbb; */

  color: #d6d6d6;
}

.search_chat div i {
  position: absolute;

  left: 30px;

  top: 14px;

  font-size: 1.5em;

  color: #aaa;
}

.chatlist {
  /* position: relative; */

  height: calc(100%-110px);

  overflow-y: auto;
}

.chatlist .block {
  /* position: relative; */

  cursor: pointer;

  width: 100%;

  display: flex;

  align-items: center;

  padding: 15px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.chatlist .block.active {
  /* background: #ebebeb; */

  background: #0f0d07;
}

.chatlist .block:hover {
  /* background: #f5f5f5; */

  background: #2a2a29;
}

.chatlist .block .imgbx {
  /* position: relative; */

  min-width: 45px;

  height: 45px;

  overflow: hidden;

  border-radius: 50%;

  margin-right: 10px;
}

.chatlist .block .details {
  /* position: relative; */

  width: 100%;
}

.chatlist .block .details .listHead {
  display: flex;

  justify-content: space-between;

  margin-bottom: 5px;
}

.chatlist .block .details .listHead h4 {
  width: 70%;

  font-size: 1.1em;

  font-weight: 600;

  /* color: #111; */

  color: #f2f2f2;

  text-overflow: ellipsis;

  overflow: hidden;

  white-space: nowrap;
}

.chatlist .block .details .listHead .time {
  font-size: 0.75em;

  color: #aaa;
}

.message_p {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.message_p p {
  width: 200px;

  color: #aaa;

  -webkit-line-break: 1;

  font-size: 0.9em;

  text-overflow: ellipsis;

  overflow: hidden;

  white-space: nowrap;
}

.message_p b {
  color: #fff;

  min-width: 20px;

  height: 20px;

  border-radius: 50%;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 0.75em;
}

.imgText {
  display: flex;

  justify-content: center;

  align-items: center;
}

.imgText h4 {
  font-weight: 500;

  line-height: 1.2em;

  margin-left: 15px;
}

.imgText h4 span {
  font-size: 0.8em;

  color: #aaa;
}

.chatBox {
  width: 100%;

  height: calc(100% - 300px);

  padding: 35px;

  overflow-y: auto;

  /* background-color: #fff; */

  /* background-image: url("../../assets/chatimg/bgimg.jpg"); */
}

.chatBox::-webkit-scrollbar {
  display: none;
}

.message {
  position: relative;

  display: flex;

  width: 100%;

  margin: 40px 0;
}

.message p {
    right: 0;
    text-align: right;
    max-width: 50%;
    padding: 12px;
    background: #409eff;
    border-radius: 10px;
    font-size: 14px;
}

.message p span {
  display: block;

  margin-top: 5px;

  font-size: 0.85em;

  opacity: 0.5;
}

.my_message {
  justify-content: flex-end;
}

.my_message .avatar {
  margin-left: 20px;

  margin-top: -20px;
}

.my_message .time {
  position: absolute;

  top: -20px;

  right: 65px;

  color: #aaa;
}

.my_message p {
  text-align: left;
}

.frnd_message {
  justify-content: flex-start;
}

.frnd_message .time {
  position: absolute;

  top: -20px;

  left: 65px;

  color: #aaa;
}

.frnd_message .avatar {
  margin-right: 20px;

  margin-top: -20px;
}

.frnd_message p {
  background: #fafbd2;

  text-align: left;
}

.message.frnd_message p::before {
  content: "";

  top: 0;

  left: -12px;

  width: 20px;

  height: 20px;

  background: linear-gradient(
    225deg,
    #fafbd2 0%,

    #fafbd2 50%,

    transparent 50%,

    transparent
  );
}

.chatbox_input {
    width: 100%;
    height: 240px;
    /* background: #f0f0f0; */
    background: #0f0d07;
    padding: 15px;
    justify-content: space-between;
    align-items: center;
}

.chatbox_input .iconfont {
    font-size: 25px;
    color: #000000;
    margin: 0 5px;
}

.chatbox_input .iconfont:hover {
    color: #409eff;
}

.chatbox_input .instrument {
  margin-bottom: 10px;
}

.chatbox_input textarea {
    resize: none;
    width: 95%;
    margin: 0 20px;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 8px;
    font-size: 1em;
    color: #000000;
    background-color: #f2f2f2;
}

textarea::-webkit-scrollbar {
  display: none;
}

.chatbox_input .text-num {
  margin: 20px;

  color: #aaa;
}

.chatbox_input .send {
    font-size: 14px;
    margin-top: 10px;
    color: #000;
    float: right;
    width: 80px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #9b9b9b;
    background-color: #fff;
}

.chatbox_input .send:hover {
    background-color: #409eff;
}
</style> 
