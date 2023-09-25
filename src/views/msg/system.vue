<template>
  <div class="top">
    <div class="line"></div>
    <h3>系统消息</h3>
  </div>
  <div style="width: 100%; height: 1px; background: #c7c7c7"></div>
  <div class="cont">
    <ul class="system-list" v-for="(item, index) in systemLists" :key="index">
      <li class="list">
        <div class="top-box">
          <span class="title">{{ item.title }}</span>
          <span class="time">{{ item.time }}</span>
        </div>
        <div class="bottom">
          <span class="text">
            <span>{{ item.text }}</span>
            <a :href="item.detail" class="detail-link">查看详情</a>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const systemLists = reactive([
  {
    title: "系统升级成功！",
    time: "2023年5月21日 18:30",
    text: "系统bug修复。。。",
    detail: "",
  },
  {
    title: "《你心中的一团锦绣，总有脱口而出的一日》发布成功",
    time: "2023年5月21日 18:30",
    text: "嗨~ 我好久不见的家人们，近来可安好？可曾按时吃早饭？可曾倾听叶间的蝉鸣？可曾望着傍晚的天空发呆？可曾早睡？可曾舒颜欢笑？朋友们，生活是自己的，舒心便罢了。我近况甚佳，略显忙碌。暑期伊始，偶有担忧着将来，不晓深浅，前路迷蒙，却也迈着愈发坚定的步子，往前赶路。前路是何路？走一走便知了。",
    detail: "",
  },
]);
</script>

<style scoped>
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
.comment-list {
  margin-top: 40px;
  list-style: none;
  box-sizing: border-box;
}
h3 {
  color: #000;
}
.list {
  border-bottom: 1px solid #d0d0d0;
  cursor: pointer;
  padding: 24px 16px;
  line-height: 24px;
}
.top-box .title {
  color: #000;
  font-weight: bold;
}
.top-box .time {
  color: #999;
  font-size: 12px;
  line-height: 22px;
  margin: 0 10px;
}
.bottom {
  color: #000;
}
.bottom .text {
  font-size: 12px;
  line-height: 19px;
  word-break: break-word;
}
.detail-link {
  color: #409eff;
  padding: 0 5px;
  text-decoration: none;
}
.detail-link:hover {
  color: #0080ff;
}
</style>