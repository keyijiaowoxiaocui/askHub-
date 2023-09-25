<template>
  <div class="main-grid">
    <div class="main-header">
      <h1>我的工单</h1>
    </div>
    <div class="main-flex">
      <div @click="hotQueShow" class="hot-show"></div>
      <div class="hot-que" v-if="isShow">
        <h3>热点问题</h3>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            v-for="(item, index) in hotQuestion"
            :key="index"
            :title="limitLiteral(item.title)"
            :name="index"
          >
            <div>问：{{ item.question }}</div>
            <div>答：{{ item.answer }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="main-content">
        <div class="cont-top">
          <el-input
            v-model="input"
            @keyup.enter="searchClick"
            placeholder="请输入工单标题"
          />
          <el-button type="primary" class="search_click" @click="searchClick"
            >查询</el-button
          >
          <el-button type="primary" @click="orderClick" class="order_click"
            >提交工单</el-button
          >
        </div>
        <div class="cont-body">
          <div class="example-pagination-block">
            <div class="example-demonstration">
              <el-table
                :data="tableData()"
                style="width: 100%"
                @row-click="workOrderinfo"
              >
                <el-table-column
                  prop="workOrderId"
                  label="工单编号"
                  width="200px"
                />
                <el-table-column prop="title" label="标题" />
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="200px"
                />
                <el-table-column
                  prop="resolved"
                  :formatter="formatter"
                  label="状态"
                  width="150px"
                />
              </el-table>
            </div>
            <el-pagination
              layout="prev, pager, next"
              :total="changePage.total"
              @current-change="handelCurrentChange"
              v-model:current-page="changePage.currentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, onMounted } from "vue";
import { mapState } from "pinia";
import { getWorkOrder, searchWorkOrder } from "@/api/workorder.js";
import { ElMessage } from "element-plus";
import { limitLiteral } from "@/utils/formDate";

// 热点问题弹窗
const isShow = ref(true);
// 热点问题手风琴
const activeName = ref("1");
// 热点问题数据
const hotQuestion = reactive([
  {
    title: "请问如何使用AskHub",
    question: "我想要实现某个功能，但是我找不到在哪里",
    answer: "这个功能在设置里找",
  },
  {
    title:
      "钉钉小程序如何内嵌pdf文件钉钉小程序如何内嵌pdf文件钉钉小程序如何内嵌pdf文件",
    question:
      "我看开放文档上，好像web-view可以实现这个需求，但是我直接放这个链接，它会自动跳到手机内置浏览器上，通过浏览器下载pdf，查看",
    answer: "这个功能在设置里找",
  },
  {
    title: "钉钉小程序分包如何返回导航页",
    question: "钉钉小程序分包页面左上角显示的默认返回按钮如何返回导航页",
    answer: "已给用户发送了保留当前页的跳转方法",
  },
]);
// 实例化useRouter
const router = useRouter();
// 双向绑定inpu搜索框内容
const input = ref("");
// 获取本地存储的用户id
const userid = localStorage.getItem("uid");
// 双向绑定该用户所有的工单数据
let alltableData = reactive([]);
// 分页器功能：当前页、总页数
let changePage = reactive({
  currentPage: 1,
  total: 0,
});
// 组件完成初始渲染并创建 DOM 节点后调用接口，获取该用户的所有工单数据
onMounted(() => {
  getworkorder(userid);
});
const hotQueShow = function () {
  isShow.value = !isShow.value;
};
// 封装一个接口方法，获取该用户的所有工单数据
const getworkorder = function (id) {
  getWorkOrder(id)
    .then((res) => {
      if (res.data.code == 0) {
        // 反转接收到的用户工单数据（按照提交工单的时间排序）
        alltableData = res.data.data.reverse();
        changePage.total = res.data.data.length;
      } else {
        ElMessage({
          message: "获取用户信息失败，请检查当前网络！",
          type: "error",
        });
      }
    })
    .catch((res) => {
      ElMessage({
        message: "获取用户信息失败，请检查当前网络！",
        type: "error",
      });
    });
};
// 分页展示功能
const tableData = () => {
  // 过滤器，判断当前所在页，每页展示10条数据
  return alltableData.filter(
    (item, index) =>
      index < changePage.currentPage * 10 &&
      index >= 10 * (changePage.currentPage - 1)
  );
};
// 当前页
const handelCurrentChange = (value) => {
  changePage.currentPage = value;
};
// 格式化呈现工单状态
const formatter = function (row, column) {
  return row.resolved ? "已解决" : "未解决";
};
// 点击查看该工单详情
const workOrderinfo = function (row) {
  // push方法是useRouter()才有的
  router.push(`/orderinfo?id=${row.workOrderId}`);
};
// 点击去提交工单
const orderClick = function () {
  router.push(`/orderpage?userId=${userid}`);
};
// 根据用户输入信息，进行模糊查找工单
const searchClick = function () {
  searchWorkOrder(userid, input.value)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (res.data.data) {
          alltableData = res.data.data;
          changePage.total = res.data.data.length;
        } else {
          alltableData = [];
          changePage.total = 0;
        }
      } else {
        ElMessage({
          message: "查询失败，请检查当前网络！",
          type: "error",
        });
      }
    })
    .catch((res) => {
      ElMessage({
        message: "查询失败，请检查当前网络！",
        type: "error",
      });
    });
};
</script>

<style scoped>
@import "./work_order.css";
.main-grid {
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
.hot-que {
  width: 450px;
  /* background-color: #070501; */
  margin-right: 100px;
  padding: 0 10px;
  border: 1px solid #d0d0d0;
}
.hot-show {
  width: 15px;
  height: 100px;
  background: #409eff;
  margin-top: 25px;
}
.hot-que h3 {
  /* color: #f2f2f2; */
  color: #409eff;
  margin: 10px 20px;
}
.main-content {
  /* background-color: #070501; */
  margin: 24px auto;
  width: 90%;
  height: calc(100% - 48px);
  overflow: auto;
  padding: 60px 50px 40px;
  border: 1px solid #d0d0d0;
  box-shadow: 0px 0px 5px 0px #c7c7c7;
}
.cont-top {
  display: flex;
  justify-content: space-between;
}
.search_click,
.order_click {
  margin-left: 15px;
  /* background-color: #070501; */
  border: 1px solid #409eff;
}

</style>