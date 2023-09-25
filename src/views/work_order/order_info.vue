<template>
  <div class="main-question">
    <div class="main-header">
      <h1>{{ orderInfo.orders.title }}</h1>
    </div>
    <div class="main-flex">
      <div class="main-ques">
        <h2>问题详情</h2>
        <div class="line"></div>
        <ul>
          <li>
            <p>
              问题反馈用户：<span>{{ orderInfo.orders.name }}</span>
            </p>
          </li>
          <li>
            <p>
              用户邮箱：<span>{{ orderInfo.orders.email }}</span>
            </p>
          </li>
          <li>
            <p>
              工单ID：<span>{{ orderInfo.orders.workOrderId }}</span>
            </p>
          </li>
          <li>
            <p>
              工单类型：<span>{{ orderInfo.orders.classification }}</span>
            </p>
          </li>
          <li>
            <p>
              问题描述：<span>{{ orderInfo.orders.title }}</span>
            </p>
          </li>
          <li>
            <p>图片内容：</p>
            <div class="image">
              <img
                v-for="(item, index) in orderInfo.orders.annex"
                :key="index"
                :src="item"
                alt=""
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="main-ques">
        <h2>处理结果</h2>
        <div class="line"></div>
        <div class="result">
          <ul>
            <li>
              <p>
                处理人：<span>{{
                  orderInfo.orders.workOrderResult.headName ||
                  "正在为您找寻处理人！"
                }}</span>
              </p>
            </li>
            <li>
              <p>
                处理结束时间：<span>{{
                  orderInfo.orders.workOrderResult.endTime || "请耐心等待~"
                }}</span>
              </p>
            </li>
            <li>
              <p>
                处理结果：<span>{{
                  orderInfo.orders.workOrderResult.resultFeedback ||
                  "正在处理中，请耐心等待！"
                }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { getWorkOrderinfo } from "@/api/workorder.js";
import { ElMessage } from "element-plus";

const route = useRoute();
let orderId = route.query.id;
onMounted(() => {
  getOrderInfo(orderId);
});

let orderInfo = reactive({
  orders: {
    annex: [],
    classification: "",
    content: "",
    email: "",
    name: "",
    phone: "",
    resolved: "",
    title: "",
    workOrderId: "",
    workOrderResult: {
      headName: "",
      endTime: "",
      resultFeedback: "",
    },
  },
});
const getOrderInfo = function (id) {
  getWorkOrderinfo(id)
    .then((res) => {
      if (res.data.code == 0) {
        console.log(res.data.data);
        orderInfo.orders = res.data.data;
      } else {
        ElMessage({
          message: "数据加载失败，请检查当前网络！",
          type: "error",
        });
      }
    })
    .catch((res) => {
      console.log(res);
      ElMessage({
        message: "数据加载失败，请检查当前网络！",
        type: "error",
      });
    });
};
</script>

<style scoped>
.main-question {
  width: 100%;
  max-width: 90%;
  margin: 60px auto 0;
}
.main-header {
  margin-bottom: 20px;
}
.main-header h1 {
  text-align: center;
  color: #000;
}
.main-flex {
  display: flex;
}
.main-ques {
  /* background-color: #070501; */
  margin: 24px 20px;
  width: 90%;
  height: calc(100% - 48px);
  overflow: auto;
  padding: 60px 50px 40px;
  border: 1px solid #d0d0d0;
  box-shadow: 0px 0px 5px 0px #c7c7c7;
}
.main-ques h2 {
  color: #000;
}
.main-ques .line {
  width: 10%;
  height: 10px;
  margin-top: -6px;
  background-color: #409eff;
}

li {
  margin: 30px 0px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #f2f2f2;
}
li p {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
li p span {
  font-weight: 500;
  margin-right: 15px;
}
.image img {
  width: 200px;
  margin: 20px 10px;
}
</style>