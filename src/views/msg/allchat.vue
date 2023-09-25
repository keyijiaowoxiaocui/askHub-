<template>
  <div class="container">
    <div class="leftSide">
      <!--header-->
      <div class="header-top">
        <div class="userimg">
          <img
            src="https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c"
            class="cover"
          />
        </div>
        <h3 style="margin-left: 10px">啊叼一只鱼</h3>
      </div>
      <!--搜索-->
      <div class="search_chat">
        <div>
          <input type="text" placeholder="搜索..." />
          <i class="iconfont icon-sousuo" />
        </div>
      </div>
      <!--群聊列表-->
      <div v-for="(item, index) in chatLists" :key="item.chatRoomId">
        <div class="chatlist">
          <!-- 高亮 -->
          <div
            ref="blockDom"
            class="block"
            @click="checkChat(item.chatRoomId, item.lastMsg.Id, item, index)"
          >
            <div class="imgbx">
              <img :src="item.groupAvatar" class="cover" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>{{ item.chatRoomName }}</h4>
                <p class="time">{{ formatMessage(item.lastMsgTime) }}</p>
              </div>
              <div class="message_p">
                <p>
                  {{ item.lastMsg ? item.lastMsg.sendUserMsg.nickName : []
                  }}{{ item.lastMsg.message ? "：" : ""
                  }}{{ item.lastMsg ? item.lastMsg.message : [] }}
                </p>
                <!-- <b
                  :style="
                    item.isShield
                      ? 'background-color:#c4c4c4'
                      : 'background-color: #fb4a40'
                  "
                  v-if="item.isRead != 0"
                  >{{ item.isRead }}</b
                > -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧聊天框 -->
    <div class="rightSide" @dragover.prevent @drop="handleDrop">
      <div class="header">
        <div class="imgText">
          <div class="userimg">
            <img :src="friendInfo.avatar" class="cover" />
          </div>
          <h4>
            {{ friendInfo.groupname }}<br /><span>{{
              limitLiteral(friendInfo.info)
            }}</span>
          </h4>
        </div>
        <ul class="nav_icons">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="是否设置为“特别消息”提醒"
            placement="bottom"
          >
            <li><span class="iconfont icon-xiaoxi"></span></li
          ></el-tooltip>
          <el-dropdown>
            <li><span class="iconfont icon-gengduo"></span></li>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in setting"
                  :key="index"
                  style="display: flex; justify-content: space-between"
                  >{{ item }}
                  <el-switch v-if="index != 0 && index != 1" v-model="value"
                /></el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </ul>
      </div>
      <!--聊天对话框-->
      <div class="chatBox" ref="scrollChatBox">
        <div v-for="(item, index) in allMessages" :key="index">
          <div class="message my_message" v-if="item.userId === uid">
            <span class="time"
              >{{ formatMessage(item.releaseDate) }}
              {{ item.sendUserMsg ? item.sendUserMsg.nickName : "" }}</span
            >
            <div
              class="chatcont"
              style="background: #79bbff"
              v-html="item.msg"
            ></div>
            <el-avatar
              class="avatar"
              :size="40"
              :src="item.sendUserMsg ? item.sendUserMsg.avatarPath : []"
            ></el-avatar>
          </div>
          <div class="message frnd_message" v-else>
            <el-avatar
              class="avatar"
              :size="40"
              :src="item.sendUserMsg ? item.sendUserMsg.avatarPath : []"
            ></el-avatar>
            <span class="time"
              >{{ item.sendUserMsg ? item.sendUserMsg.nickName : "" }}
              {{ formatMessage(item.releaseDate) }}</span
            >
            <div
              class="chatcont"
              style="background: #fafbd2"
              v-html="item.msg"
            ></div>
          </div>
        </div>
      </div>

      <!--聊天输入框-->
      <div class="chatbox_input">
        <div
          class="emoji"
          v-show="isEmoji"
          @mousemove="showEmoji"
          @mouseout="closeEmoji"
          contenteditable="true"
        >
          <ul class="emoji-default">
            <li
              v-for="(item, index) in EmojiImg"
              :key="index"
              @click="chooseEmoji(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="instrument">
          <span
            class="iconfont icon-biaoqing1"
            @mouseenter="showEmoji"
            @mouseout="closeEmoji"
          ></span>
          <label for="file-input" class="custom-file-upload">
            <span class="iconfont icon-tupian"></span>
          </label>
          <input
            id="file-input"
            type="file"
            @change="handleImageUpload"
            style="display: none"
          />
        </div>
        <div class="chat-text" style="height: 80%">
          <div
            class="textarea"
            id="outputDLg"
            ref="textDom"
            contenteditable="true"
            v-on:input="keyDown"
            v-bind="$attrs"
            @keyup.alt.enter="inputChange"
            maxlength="300"
            cols="30"
            rows="5"
            :placeholder="placeholder"
          ></div>
          <span class="text-num">{{ textnum }}/500</span>
          <button class="send" @click="sendVal">发 送</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
  onBeforeMount,
} from "vue";
import { formatTime, limitLiteral, formatMessage } from "../../utils/formDate";
import { EmojiImg } from "../../assets/msg/emoji";
import { uploadImages } from "@/api/chatmsg";
import { restrictionPic, compressPic } from "@/utils/compressPic";
import WebSocketClass from "@/utils/WebScoket";
import useallChatStore from "@/store/user/allchat";
import { watchEffect } from "vue";
import { getAllCont } from "@/api/chat";

let inputVal = ref("");
let textnum = ref(0);
let currentInstance = ref();
let placeholder = ref("Alt+回车键发送内容");
const value = ref(true);
let isEmoji = ref(false);
let setting = [
  "邀请成员",
  "查看群成员",
  "置顶聊天",
  "消息免打扰",
  "屏蔽群消息",
  "退出群聊",
];
const uid = localStorage.getItem("uid");
const allChatList = useallChatStore();
allChatList.getAllList();
let ws = new WebSocketClass(
  "ws://152.136.61.154:8888/api/v1/chat/connectChat?userId=" + uid,
  5
);

let chatLists = ref();
let allMessages = ref([]);
// const chatLists  = reactive([
//   {
//     id: 1,
//     avatar:
//       "https://picx.zhimg.com/v2-2606eeb8264d449495d0d6bf48d44e35_r.jpg?source=1940ef5c",
//     groupname: "算法交流群",
//     username: "前端小菜鸟",
//     time: "14:25",
//     newchat: "请问大佬，前后端如何实现webScoket交互？",
//     isRead: 0,
//     isShield: false,
//   },
//   {
//     id: 2,
//     avatar: "https://p.qqan.com/up/2021-4/16196625695897672.jpg",
//     groupname: "美少女集结营",
//     username: "超级无敌美少女啦啦啦",
//     time: "15:10",
//     newchat: "好像躺尸啊~",
//     isRead: "99+",
//     isShield: true,
//   },
//   {
//     id: 3,
//     avatar:
//       "https://ts1.cn.mm.bing.net/th/id/R-C.b243195fe44d70de12d9fea232751f81?rik=yB9gjT6mQoc8CA&riu=http%3a%2f%2fimg.touxiangwu.com%2f2020%2f3%2fYFFNNb.jpeg&ehk=CgmKHaIE1wbFW%2fjFvoksF2cfAcG9XCxRZf9stetykKU%3d&risl=&pid=ImgRaw&r=0",
//     groupname: "社会主义接班人",
//     username: "腰果",
//     time: "11:15",
//     newchat: "有点饿",
//     isRead: 1,
//     isShield: false,
//   },
// ]);
// let allMessages = reactive([
//   {
//     avatar:
//       "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",

//     cont: "xdm，今晚七点，牛客小白月赛要开始啦！",
//     time: "10:15",
//     isMine: true,
//     username: "null",
//   },
//   {
//     avatar: "https://www.qzqn8.com/wp-content/uploads/2020/02/3-23.jpg",
//     cont: "前端做不了一点",
//     time: "10:15",
//     isMine: false,
//     username: "微雨",
//   },
//   {
//     avatar:
//       "https://tupian.qqw21.com/article/UploadPic/2020-6/202062818292567250.jpg",

//     cont: "后端做不了一点",
//     time: "10:15",
//     isMine: false,
//     username: "MENTAL",
//   },
//   {
//     avatar:
//       "https://tupian.qqw21.com/article/UploadPic/2020-9/202091321254563363.jpg",

//     cont: "全栈做不了一点",
//     time: "10:15",
//     isMine: false,
//     username: "九天|落尘",
//   },
//   {
//     avatar:
//       "https://tupian.qqw21.com/article/UploadPic/2020-6/20206281744999788.jpg",

//     cont: "会全栈是不是可以接一些小程序的单子，自己做？",
//     time: "10:15",
//     isMine: false,
//     username: "苍苍",
//   },
//   {
//     avatar:
//       "https://tupian.qqw21.com/article/UploadPic/2020-2/20202122495253108.jpg",

//     cont: "你找个前端的组队呗",
//     time: "10:15",
//     isMine: false,
//     username: "抱猫",
//   },
//   {
//     avatar:
//       "https://tupian.qqw21.com/article/UploadPic/2020-7/202071022111771390.jpg",

//     cont: "感觉前端比后端都难",
//     time: "10:15",
//     isMine: false,
//     username: "学习中",
//   },
//   {
//     avatar:
//       "https://tupian.qqw21.com/article/UploadPic/2020-4/20204322544055862.jpg",

//     cont: "那你这不是闹吗",
//     time: "10:15",
//     isMine: false,
//     username: "三无",
//   },
// ]);

let friendInfo = ref({
  avatar: "",
  groupname: "",
  info: "",
});
watchEffect(() => {
  chatLists.value = allChatList.chatLists;
  console.log(allChatList.chatLists);
  // friendInfo.value = {
  //   avatar: allChatList.chatLists[0]
  //     ? allChatList.chatLists[0].groupAvatar
  //     : "",
  //   groupname: allChatList.chatLists[0]
  //     ? allChatList.chatLists[0].chatRoomName
  //     : "",
  //   info: "",
  // };
  if (allChatList.chatLists[0])
    checkChat(
      allChatList.chatLists[0].chatRoomId,
      allChatList.chatLists[0].lastMsg.Id,
      allChatList.chatLists[0],
      0
    );
});

console.log(friendInfo);
onMounted(() => {
  currentInstance = getCurrentInstance();
  chatLists.value = allChatList.chatLists;
  currScroll();
});

ws.getMessage((res) => {
  console.log(22222);
  console.log(res);
});

function currScroll() {
  if (currentInstance.ctx)
    currentInstance.ctx.$refs.scrollChatBox.scrollTop =
      currentInstance.ctx.$refs.scrollChatBox.scrollHeight;
}
function showEmoji() {
  isEmoji.value = true;
}
function closeEmoji() {
  isEmoji.value = false;
}
function chooseEmoji(item) {
  isEmoji.value = true;
  placeholder.value = "";
  currentInstance.ctx.$refs.textDom.innerHTML += item;
}
function handleImageUpload(event) {
  const file = event.target.files[0];
  uploadPic(file);
}
function handleDrop(event) {
  event.preventDefault();
  let file = event.dataTransfer.files[0];
  uploadPic(file);
}
function uploadPic(file) {
  const form = new FormData();
  compressPic(file, 0.92).then(function (res) {
    form.append("image", res.file);
  });
  uploadImages(form)
    .then((res) => {
      placeholder.value = "";
      currentInstance.ctx.$refs.textDom.innerHTML += `<img src=${res.data.data} style="width:98%;display:inline"> </img> <br>`;
    })
    .catch((res) => {
      console.log(res);
    });
}
function checkChat(roomid, lastid, list, index) {
  let blockDom = document.querySelectorAll(".block");
  if (blockDom[index]) {
    for (let i = 0; i < blockDom.length; i++) {
      blockDom[i].style.backgroundColor = "#fff";
    }
    blockDom[index].style.backgroundColor = "#f2f2f2";
  }
  friendInfo.value = {
    avatar: list.groupAvatar,
    groupname: list.chatRoomName,
    info: "",
  };
  getAllCont(roomid, lastid)
    .then((res) => {
      console.log(res.data.data);
      allMessages.value = res.data.data;
    })
    .catch((res) => {
      console.log(res);
    });

  // if (e == 1) {
  //   friendInfo.avatar =
  //     "https://picx.zhimg.com/v2-2606eeb8264d449495d0d6bf48d44e35_r.jpg?source=1940ef5c";
  //   friendInfo.groupname = "算法交流群";
  //   friendInfo.info = "快来交流算法吧！";
  //   chatLists[e - 1].isRead = 0;
  //   allMessages = reactive([
  //     {
  //       avatar:
  //         "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",

  //       cont: "xdm，今晚七点，牛客小白月赛要开始啦！",
  //       time: "10:15",
  //       isMine: true,
  //       username: "null",
  //     },
  //     {
  //       avatar: "https://www.qzqn8.com/wp-content/uploads/2020/02/3-23.jpg",
  //       cont: "前端做不了一点",
  //       time: "10:15",
  //       isMine: false,
  //       username: "微雨",
  //     },
  //     {
  //       avatar:
  //         "https://tupian.qqw21.com/article/UploadPic/2020-6/202062818292567250.jpg",

  //       cont: "后端做不了一点",
  //       time: "10:15",
  //       isMine: false,
  //       username: "MENTAL",
  //     },
  //     {
  //       avatar:
  //         "https://tupian.qqw21.com/article/UploadPic/2020-9/202091321254563363.jpg",

  //       cont: "全栈做不了一点",
  //       time: "10:15",
  //       isMine: false,
  //       username: "九天|落尘",
  //     },
  //     {
  //       avatar:
  //         "https://tupian.qqw21.com/article/UploadPic/2020-6/20206281744999788.jpg",

  //       cont: "会全栈是不是可以接一些小程序的单子，自己做？",
  //       time: "10:15",
  //       isMine: false,
  //       username: "苍苍",
  //     },
  //     {
  //       avatar:
  //         "https://tupian.qqw21.com/article/UploadPic/2020-2/20202122495253108.jpg",

  //       cont: "你找个前端的组队呗",
  //       time: "10:15",
  //       isMine: false,
  //       username: "抱猫",
  //     },
  //     {
  //       avatar:
  //         "https://tupian.qqw21.com/article/UploadPic/2020-7/202071022111771390.jpg",

  //       cont: "感觉前端比后端都难",
  //       time: "10:15",
  //       isMine: false,
  //       username: "学习中",
  //     },
  //     {
  //       avatar:
  //         "https://tupian.qqw21.com/article/UploadPic/2020-4/20204322544055862.jpg",

  //       cont: "那你这不是闹吗",
  //       time: "10:15",
  //       isMine: false,
  //       username: "三无",
  //     },
  //   ]);
  // } else if (e == 2) {
  //   friendInfo.avatar = "https://p.qqan.com/up/2021-4/16196625695897672.jpg";
  //   friendInfo.groupname = "美少女集结营";
  //   friendInfo.info = "我们代表正义，代表美貌，代表聪慧，代表月亮消灭你！";
  //   chatLists[e - 1].isRead = 0;
  //   allMessages = reactive([
  //     {
  //       avatar:
  //         "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",
  //       cont: "今天中午吃什么？",
  //       time: "10:15",
  //       isMine: true,
  //       username: "啊叼一只鱼",
  //     },
  //     {
  //       avatar: "https://pic.qqtn.com/up/2018-3/15220559531183988.jpg",

  //       cont: "不知道诶，感觉没什么好吃的",
  //       time: "10:15",
  //       isMine: false,
  //       username: "小凡同学",
  //     },
  //     {
  //       avatar:
  //         "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",

  //       cont: "要不我们去吃三餐的鸡公煲吧？",
  //       time: "10:15",
  //       isMine: true,
  //       username: "啊叼一只鱼",
  //     },
  //     {
  //       avatar:
  //         "https://tse4-mm.cn.bing.net/th/id/OIP-C.OV6k7M8MYtUb4tjeO3ppcwAAAA?pid=ImgDet&rs=1",

  //       cont: "我觉着可以",
  //       time: "10:15",
  //       isMine: false,
  //       username: "王胖胖不胖",
  //     },
  //     {
  //       avatar:
  //         "https://tse2-mm.cn.bing.net/th/id/OIP-C.euXvCaJqAR0Z8ySZK29FEgAAAA?pid=ImgDet&rs=1",

  //       cont: "什么？尊嘟假嘟！！！",
  //       time: "10:15",
  //       isMine: false,
  //       username: "煦煦子",
  //     },
  //     {
  //       avatar:
  //         "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",

  //       cont: "对啊，你要去吗？",
  //       time: "10:15",
  //       isMine: true,
  //       username: "啊叼一只鱼",
  //     },
  //     {
  //       avatar:
  //         "https://tse2-mm.cn.bing.net/th/id/OIP-C.euXvCaJqAR0Z8ySZK29FEgAAAA?pid=ImgDet&rs=1",

  //       cont: "扶朕起来，朕可以！！！",
  //       time: "10:15",
  //       isMine: false,
  //       username: "煦煦子",
  //     },
  //   ]);
  // } else {
  //   friendInfo.avatar =
  //     "https://ts1.cn.mm.bing.net/th/id/R-C.b243195fe44d70de12d9fea232751f81?rik=yB9gjT6mQoc8CA&riu=http%3a%2f%2fimg.touxiangwu.com%2f2020%2f3%2fYFFNNb.jpeg&ehk=CgmKHaIE1wbFW%2fjFvoksF2cfAcG9XCxRZf9stetykKU%3d&risl=&pid=ImgRaw&r=0";
  //   friendInfo.groupname = "社会主义接班人";
  //   friendInfo.info =
  //     "富强、民主、文明、和谐；自由、平等、公正、法治；爱国、敬业、诚信、友善";
  //   chatLists[e - 1].isRead = 0;
  //   allMessages = reactive([
  //     {
  //       avatar:
  //         "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",
  //       cont: "在吗在吗？",
  //       time: "10:15",
  //       isMine: true,
  //       username: "啊叼一只鱼",
  //     },
  //     {
  //       avatar: "https://p.qqan.com/up/2020-5/2020052808384070565.jpg",

  //       cont: "在写作业",
  //       time: "10:15",
  //       isMine: false,
  //       username: "ikun哥",
  //     },
  //     {
  //       avatar:
  //         "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",

  //       cont: "天气太热了天气太热了天气太热了!!!",
  //       time: "10:15",
  //       isMine: true,
  //       username: "啊叼一只鱼",
  //     },
  //     {
  //       avatar:
  //         "https://tupian.qqw21.com/article/UploadPic/2020-3/2020326228653393.jpg",

  //       cont: "对啊 也不下雨",
  //       time: "10:15",
  //       isMine: false,
  //       username: "月凌喵",
  //     },
  //     {
  //       avatar:
  //         "https://tse2-mm.cn.bing.net/th/id/OIP-C.Oi-FEFgZguv65_tNmivUhQAAAA?pid=ImgDet&rs=1",

  //       cont: "希望以后凉快点",
  //       time: "10:15",
  //       isMine: false,
  //       username: "哔啵哔啵",
  //     },
  //   ]);
  // }
  currScroll();
}
function inputChange() {
  sendVal();
}
function keyDown(event) {
  console.log(event.target.innerText);
  placeholder.value = "";
  const text = event.target.innerText;

  textnum.value = text.length;
  if (textnum.value > 500) {
    event.target.innerText = text.slice(0, 500);
    textnum.value = 500;
  }
}
function sendVal() {
  inputVal.value = currentInstance.ctx.$refs.textDom.innerHTML;
  let time = formatTime();
  allMessages.value.push({
    msg: inputVal.value,
    releaseDate: time,
    sendUserMsg: {
      avatarPath:
        "https://picx.zhimg.com/v2-86c6ce6928b2e76118b7c026270931ed_r.jpg?source=1940ef5c",
      nickName: "啊叼一只鱼",
      userId: uid,
    },
    userId: uid,
  });
  currScroll();
  currentInstance.ctx.$refs.textDom.innerHTML = "";
  inputVal.value = "";
  placeholder.value = "Alt+回车键发送内容";
  textnum.value = 0;
}
</script>

<style scoped>
/* @import url("../work_order/work_order.css"); */
@import url("../../assets/chatimg/iconfont.css");
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
  /* background: #070501; */
  /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.06); */
  display: flex;
}

.leftSide {
  background: #ffffff;
  border-right: 1px solid #e4e4e4;
}
.rightSide {
  width: 67%;
}
.header {
  width: 100%;
  height: 60px;
  background: #f2f2f2;
  /* background: #0f0d07; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.header-top {
  width: 100%;
  height: 60px;
  background: #f2f2f2;
  /* background: #0f0d07; */
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 15px;
}
h3,
h4 {
  color: #000;
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
  color: #999;
}
.nav_icons .iconfont:hover {
  color: #409eff;
}

.nav_icons li {
  display: flex;
  list-style: none;
  cursor: pointer;
  /* color: #51585c; */
  color: #999;
  font-size: 1.5em;
  margin-left: 22px;
}
.search_chat {
  position: relative;
  width: 100%;
  height: 50px;
  background: #fff;
  /* background: #1d1e1d; */
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
  background: #f2f2f2;
  /* background: #2a2a29; */
  padding: 6px;
  height: 38px;
  border-radius: 30px;
  font-size: 14px;
  padding-left: 40px;
  color: #000;
}
.search_chat div input::placeholder {
  /* color: #bbb; */
  color: #999;
}
.search_chat div i {
  position: absolute;
  left: 30px;
  top: 14px;
  font-size: 1.5em;
  color: #000;
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
  box-shadow: 0px 0px 5px 0px #c7c7c7;
}
.chatlist .block.active {
  background: #f2f2f2;
  /* background: #0f0d07; */
}
.chatlist .block:hover {
  background: #f2f2f2;
  /* background: #2a2a29; */
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
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.chatlist .block .details .listHead .time {
  font-size: 0.75em;
  color: #999;
}

.message_p {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.message_p p {
  width: 200px;
  color: #000;
  /* -webkit-line-break: 1; */
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.message_p b {
  color: #000;
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
  color: #999;
}
.chatBox {
  width: 100%;
  height: calc(100% - 300px);
  padding: 35px;
  overflow-y: auto;
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
  color: #999;
}
/* .my_message p {
  text-align: left;
} */
.chatcont {
  text-align: left;
  max-width: 45%;
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
  color: #070501;
  word-wrap: break-word;
}
.frnd_message {
  justify-content: flex-start;
}
.frnd_message .time {
  position: absolute;
  top: -20px;
  left: 65px;
  color: #999;
}
.frnd_message .avatar {
  margin-right: 20px;
  margin-top: -20px;
}
.chatbox_input {
  width: 100%;
  height: 240px;
  background: #f2f2f2;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
}
.chatbox_input .iconfont {
  font-size: 25px;
  color: #000;
  margin: 0 5px;
}
.chatbox_input .iconfont:hover {
  color: #409eff;
}
.chatbox_input .instrument {
  margin-bottom: 10px;
}
.chatbox_input .textarea {
  resize: none;
  width: 95%;
  height: 75%;
  margin: 0 20px;
  padding: 10px 20px;
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 1em;
  color: #000;
  background-color: #ffffff;
  overflow: auto;
  word-wrap: break-word;
}
.textarea::-webkit-scrollbar {
  display: none;
}
.textarea::before {
  content: attr(placeholder);
  color: #999;
}
.chatbox_input .text-num {
  margin: 20px;
  color: #999;
}
.chatbox_input .send {
  font-size: 14px;
  margin-top: 10px;
  color: #999;
  float: right;
  width: 80px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #9b9b9b;
  background-color: #f2f2f2;
}
.chatbox_input .send:hover {
  border: 1px solid #409eff;
  color: #409eff;
}
.emoji {
  position: absolute;
  text-align: left;
  width: 25%;
  height: 20%;
  bottom: 195px;
  margin-bottom: 35px;
  background: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(231, 231, 231, 0.12),
    0 0 6px 0 rgba(161, 161, 161, 0.04);
}
.emoji-default {
  width: 95%;
  height: 90%;
  overflow-y: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  margin: 0 auto;
}
.emoji-default::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.emoji-default li {
  display: inline-block;
  padding: 5px;
  font-size: 15px;
  width: 25px;
  height: 25px;
  overflow: hidden;
  cursor: pointer;
}
</style>