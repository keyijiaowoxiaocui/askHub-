<template>
  <!-- 头部 -->
  <AppTopNav></AppTopNav>
  <!-- 主体部分 -->
  <el-card style="width: 140px; margin-left: 160px; margin-top: 40px">
    <ul id="left">
      <li v-for="item in menuList" :key="item.id" @click="handleClick(item.id)">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
    </ul>
  </el-card>

  <!-- 内容出口 -->
  <el-card style="margin-left: 350px; margin-right: 15%; margin-top: -323px">
    <div class="right" style="width: 100%">
      <router-view></router-view>
    </div>
  </el-card>

  <!-- </el-card> -->
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import AppTopNav from "@/components/AppTopNav";
import { getAllChat } from "@/api/chat";

// 默认选中第一个
const activeIndex = ref(0);

const menuList = [
  { id: "0", title: "点赞收藏", path: "/msg/love" },
  { id: "1", title: "新增粉丝", path: "/msg/fan" },
  { id: "2", title: "评论", path: "/msg/comment" },
  { id: "3", title: "系统消息", path: "/msg/system" },
  { id: "4", title: "私聊", path: "/msg/onechat" },
  { id: "5", title: "群聊", path: "/msg/allchat" },
  { id: "6", title: "直播", path: "/msg/liveStream" },
];

onMounted(() => {
  handleClick(0);
});
// tab 被选中时触发
const handleClick = (tab) => {
  activeIndex.value = tab;
  let liDom = document.getElementById("left").getElementsByTagName("li");
  for (let i = 0; i < liDom.length; i++) {
    liDom[i].style.backgroundColor = "";
    liDom[i].getElementsByTagName("a")[0].style.color = "#000";
    liDom[i].getElementsByTagName("a")[0].style.fontWeight = "400";
  }
  liDom[tab].style.backgroundColor = "#b1d3ff80";
  console.log(liDom[tab].getElementsByTagName("a")[0]);
  liDom[tab].getElementsByTagName("a")[0].style.fontWeight = "bold";
  liDom[tab].getElementsByTagName("a")[0].style.color = "#409eff";
};
</script>

<style scoped lang="scss">
#left {
  width: 100px;


  li {
    font-size: 600;
    padding: 10px;
    text-align: center;
  }
  li:hover {
    background-color: #eaf2ff;
  }

  a {
    color: #000000;
  }

  /*在index.css全局样式表中，重新router-link-active 的样式*/
  .router-link-active {
    color: #1171ee;
    font-weight: bold;
  }
}
</style>