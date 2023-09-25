<template>
  <div class="top">
    <div class="line"></div>
    <h3>收到的评论</h3>
  </div>
  <div style="width: 100%; height: 1px; background: #c7c7c7"></div>
  <div class="cont">
    <ul class="comment-list" v-for="(item, index) in commentLists" :key="index">
      <li class="list">
        <el-avatar class="avatar" :size="50" :src="item.avatar"></el-avatar>
        <div class="info">
          <div>
            <a href="" class="user">{{ item.username }}</a>
            <span class="comment-slogan">{{ item.commentslogan }}</span>
            <a href="">{{ item.article }}</a>
          </div>
          <div class="time">{{ item.time }}</div>
          <p>{{ item.commentcont }}</p>
        </div>
        <div class="reply-delete">
          <span class="iconfont icon-huifu">&nbsp;回复</span>
          <span class="iconfont icon-shanchu">&nbsp;删除</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { reactive, onMounted, getCurrentInstance } from "vue";
import WebSocketClass from "@/utils/WebScoket";

const commentLists = reactive([
  {
    username: "黑芝麻味的汤圆",
    avatar:
      "https://picx.zhimg.com/v2-9cfdec32274c857e69703c451c2a9e09_r.jpg?source=1940ef5c",
    commentslogan: "评论了我的文章",
    article: "《你心中的一团锦绣，总有脱口而出的一日》",
    time: "2023.07.23 08:56",
    commentcont: "好好写文章呀，期待期待！",
  },
  {
    username: "啊叼一只鱼",
    avatar:
      "https://picx.zhimg.com/v2-599068bda08bbc8256d08b01f78e5d6b_r.jpg?source=1940ef5c",
    commentslogan: "回复了我的评论",
    article: "",
    time: "2023.07.23 08:56",
    commentcont: "上班不要摸鱼啦！",
  },
]);

onMounted(() => {
  console.log(11111);
});
</script>

<style scoped>
@import url("../../assets/chatimg/iconfont.css");
.top {
  display: flex;
  margin: 20px auto;
}
.line {
  width: 4px;
  height: 24px;
  background-color: #409eff;
  margin: 0 10px;
}
h3 {
  color: #000;
}
.comment-list {
  list-style: none;
  color: #000;
}
.list {
  margin-top: 40px;
  display: flex;
  border-bottom: 1px solid #d0d0d0;
  cursor: pointer;
}
.avatar {
  margin-right: 15px;
}
.info {
  display: inline;
  flex: 1;
}
.info a {
  font-size: 15px;
  color: #409eff;
}
.info .user {
  font-weight: bold;
  margin: 0 5px 0 0;
  color: #000;
}
.info a:hover {
  font-size: 15px;
  color: #0080ff;
}
.info .time {
  margin-top: 2px;
  font-size: 12px;
  color: #999;
  line-height: normal;
}
.comment-list p {
  margin: 10px 0 0;
  font-size: 15px;
  line-height: 1.7;
}
.reply-delete {
  margin: 40px auto;
}
.reply-delete span {
  margin-right: 20px;
}
.reply-delete .iconfont:hover {
  color: #0080ff;
}
</style>