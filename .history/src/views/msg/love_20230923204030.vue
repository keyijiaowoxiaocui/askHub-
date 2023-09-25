<template>
    <div class="top">
        <div class="line"></div>
        <h3 style="color: black;">点赞收藏</h3>
    </div>
    <div class="content" v-for="(item, index) in systemLists" :key="index">
        <div class="left">{{ item.imgUrl }}</div>
        <div class="right">
            <div class="one">
                <div class="author">{{ item.author }}</div>
                <div class="time">
                    <h6 style="margin-top: 4px;margin-right: 4px;font-weight: 100;">{{ item.time }}</h6>
                    <h3>关注了你</h3>
                </div>
            </div>
            <!-- <div class="anniu"> -->
            <button class="anniu">{{ item.guanzhu ? '互相关注' : '关注' }}</button>
            <!-- </div> -->
        </div>
    </div>
    <!-- 分页器区域 -->
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
        :small="small" :background="true" layout="total,prev, pager, next,jumper" :total="400"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 30px;" />
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { getLoveList } from "@/api/msg/love";
import loveStore from "@/store/msg/love";
let love = loveStore();

const systemLists = reactive([
  {
    imgUrl: "这里是头像图片1",
    author: "这个是关注你的人",
    time: "这个填写关注时间",
    guanzhu: true,
  },
  {
    imgUrl: "这里是头像图片2",
    author: "这个是关注你的人",
    time: "这个填写关注时间",
    guanzhu: false,
  },
  {
    imgUrl: "这里是头像图片3",
    author: "这个是关注你的人",
    time: "这个填写关注时间",
    guanzhu: false,
  },
]);

onMounted(() => {
  getLoveList(1).then((res) => {
    console.log(123);
    console.log(res);
  });
});
</script>

<style lang="scss">
@import "./pagination.css";

.top {
  display: flex;
  margin: 20px auto;
  color: aliceblue;
}

.line {
    width: 4px;
    height: 24px;
    background-color: #409eff;
    margin: 0 10px;
}

.content {
    margin-top: 10px;
    display: flex;
    height: 100px;
    color: rgb(0, 0, 0);
    border-top: 1px solid rgb(88, 94, 88);

    .left {
        width: 80px;
        height: 80px;
        margin-top: 15px;
        background-color: #409eff;
        border-radius: 40px;
        margin-left: 5px;
    }

  .right {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    width: 100%;
    // background-color: rgb(0, 255, 255);

    .one {
      margin-left: 10px;
      margin-top: 10px;

      .time {
        display: flex;
        margin-top: 5px;
      }
    }

    .anniu {
      width: 60px;
      height: 36px;
      margin-right: 20px;
      margin-top: 15px;
      cursor: pointer;
    }

        .anniu:hover {
            color: #409eff;
        }
    }
}

.author:hover {
    color: #409eff;
    cursor: pointer;
}
h3{
    color: black !important;
}
</style>