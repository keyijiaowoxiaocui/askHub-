<template>
  <div class="mainContent-box">
    <!-- <div class="mainContent-box" ref="boxx" @mousewheel="divScroll"> -->

    <!--  @mousewheel="divScroll" -->

    <!-- 商品模块 -->

    <div class="blog-commodity-list">
      <ul>
        <li
          :class="{ cutStyle: current === 1 }"
          @click="getCommodity(), changeStyle(1)"
        >
          我的商品
        </li>

        <li
          :class="{ cutStyle: current === 2 }"
          @click="getCollectCommodity(), changeStyle(2)"
        >
          收藏的商品
        </li>
      </ul>
    </div>

    <!--局部元素滚动事件 scroll无法触发事件-->

    <div>
      <article
        class="blog-list-box"
        v-for="item in partCommodity"
        :key="item.ID"
      >
        <div class="blog-box-left" v-if="item.commodity_images != null">
          <router-link :to="{ path: `/shop/${item.commodity_id}` }">
            <template v-if="item.commodity_images[0] != ''">
              <img :src="item.commodity_images[0]" alt="" />
            </template>

            <template v-else>
              <img src="../../../assets/resume/eso1208a.jpg" alt="" />
            </template>
          </router-link>
        </div>

        <div class="blog-box-right">
          <div class="blog-box-right-top">
            <router-link :to="{ path: `/shop/${item.commodity_id}` }">
              <div class="blog-box-right-top-t">
                <h4 style="color: #000000">
                  {{ item.classify }}-{{ item.name }}
                </h4>
              </div>

              <div class="blog-box-right-top-b">
                {{ item.introduction }}
              </div>
            </router-link>
          </div>

          <div class="blog-box-right-bottom">
            <div class="blog-box-right-bottom-left">
              <div class="blog-commodity-price">￥ {{ item.price }}</div>

              <div>发布时间 {{ item.CreatedAt }}</div>

              <div>收藏 {{ item.collection }}</div>

              <div class="shanchu" @click="DeleteCommodity(item.commodity_id)">
                删除
              </div>
            </div>

            <div class="btn-edit-article">
              <!-- 编辑 -->

              <router-link
                :to="{
                  path: '/UpdataRelease',
                  query: { shopid: item.commodity_id },
                }"
                >编辑</router-link
              >
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>



<script >
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

import { useRoute } from "vue-router";

import { getUserData_a } from "@/api/UserApis";

import { getdeleteCommodity } from "@/api/shop/shop.js";

import {
  getAllCommodityByBelongUserId,
  getCollectCommodityByBelong,
} from "../../../api/my-api.js";

import userInfoStore from "@/store/user/user.js";

export default {
  setup() {
    let element = window;

    let userStore = userInfoStore();

    // 样式切换

    let current = ref(1);

    // 数据 个人商品列表

    const person = ref([]);

    // 备份列表

    let personList = [];

    const route = useRoute();

    // 用户信息 无用

    let myUserInfo = ref({});

    let aa = {
      belong_user_id: userStore.userId,

      //  是否降序排列

      desc: false,

      //   页码数量

      page_num: "",

      //   页面大小

      page_size: 1000,
    };

    let bb = {
      page_size: 1000,

      page_num: "",

      desc: false,

      collectorId: "",
    };

    function changeStyle(value) {
      current.value = value;
    }

    //获取用户信息+商品列表 未优化

    let my_users = async () => {
      let res = await getUserData_a();

      myUserInfo.value = res.data.data;

      aa.belong_user_id = res.data.data.user_id;

      bb.collectorId = res.data.data.user_id;

      const res2 = await getAllCommodityByBelongUserId(aa);

      console.log("个人商品列表", res2);

      personList = res2.data.data;

      person.value = personList;
    };

    //获取用户信息+商品列表 优化

    let my_users2 = async () => {
      // myUserInfo.value = userStore.myUserInfo

      aa.belong_user_id = userStore.userId;

      bb.collectorId = userStore.userId;

      console.log("aaaaaa", aa);

      const res2 = await getAllCommodityByBelongUserId(aa);

      console.log("个人商品列表", res2);

      personList = res2.data.data;

      person.value = res2.data.data;

      if (res2.data.data != null) {
        partCommodity.value = person.value.slice(0, 5);

        num = 5;
      } else {
        partCommodity.value = [];
      }
    };

    // 个人商品列表

    let getCommodity = async () => {
      const res2 = await getAllCommodityByBelongUserId(aa);

      console.log("个人商品列表", res2);

      personList = res2.data.data;

      person.value = personList;

      if (res2.data.data != null) {
        partCommodity.value = person.value.slice(0, 5);

        num = 5;
      } else {
        partCommodity.value = [];
      }

      // partCommodity.value = person.value.slice(0, 5)

      // num = 5
    };

    // 收藏的商品列表

    let getCollectCommodity = async () => {
      const res2 = await getCollectCommodityByBelong(bb);

      console.log("个人收藏商品列表", res2);

      personList = res2.data.data;

      person.value = personList;

      if (res2.data.data != null) {
        partCommodity.value = person.value.slice(0, 5);

        num = 5;
      } else {
        partCommodity.value = [];
      }

      // partCommodity.value = person.value.slice(0, 5)

      // num = 5
    };

    // 删除商品

    // 防抖或节流

    let ant = false;

    let DeleteCommodity = async (data) => {
      if (ant === false) {
        ant = true;

        partCommodity.value = partCommodity.value.filter(
          (item) => item.commodity_id !== data
        );

        partCommodity.value.push(...person.value.slice(num, num + 1));

        console.log("删除商品参数", data);

        const res = await getdeleteCommodity(data);

        // userStore.getUserData()

        if (res.data.code == 0) {
          console.log("删除商品", res);

          ant = false;
        } else {
          console.log(res.data.data);
        }
      }
    };

    // 滑动绑定事件

    let huascroll = () => {
      let { scrollTop, offsetHeight, scrollHeight, clientHeight } =
        document.documentElement;

      // 输出滚轮的各种数据

      // console.log(scrollTop, offsetHeight, clientHeight, scrollHeight)

      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        // console.log(1111);

        if (person.value.length <= partCommodity.value.length) {
          // console.log("这是person", person.value.length);

          scrollTop = 0;

          if (isalert.value) {
            isalert.value = false;

            alert("没有更多了");
          }

          return;
        } else {
          // console.log(person.value.slice(num, num + 4));

          // let shuzu = person.value.slice(num, num + 5)

          // console.log(num);

          partCommodity.value.push(...person.value.slice(num, num + 5));

          num += 5;

          isalert.value = true;

          // console.log(partCommodity.value);
        }

        // partCommodity.value.push()
      }
    };

    // 获取滚动条位置

    // 创建响应式的ref对象 样式布局换了 绑定对象不用了

    let boxx = ref(null);

    let partCommodity = ref([]);

    let num = 5;

    //  alert是否弹出

    let isalert = ref(false);

    // 样式布局换了

    let divScroll = () => {
      // window.onload = () => {

      element.addEventListener("scroll", huascroll);
    };

    onMounted(() => {
      my_users2();

      divScroll();
    });

    // 清理绑定事件

    onBeforeUnmount(() => {
      element.removeEventListener("scroll", huascroll);
    });

    // 监视路由变化 清理事件

    watch(
      () => route.path,
      (newVal, oldVal) => {
        console.log("新的路由", newVal, oldVal);

        if (newVal != oldVal) {
          element.removeEventListener("scroll", function () {});

          partCommodity.value = [];
        }
      }
    );

    return {
      person,
      current,
      changeStyle,
      boxx,
      partCommodity,

      my_users2,
      getCommodity,
      getCollectCommodity,
      DeleteCommodity,
      divScroll,
    };
  },
};
</script>



<style lang="scss">
.mainContent-box {
  height: 100%;

  /* overflow: auto; */

  /* background-color: #1d1a1e; */
}

.blog-list-box > a {
  display: flex;

  padding: 24px 0;

  margin: 0 24px;

  border-bottom: 1px solid rgba(30, 128, 255, 0.3);
}

.blog-box-left {
  position: relative;

  margin-right: 16px;
}

.blog-box-left > img {
  width: 178px;

  height: 100px;

  border-radius: 2px;

  -o-object-fit: cover;

  object-fit: cover;

  display: block;

  border: 1px solid rgba(30, 128, 255, 0.3);
}

.blog-box-right {
  display: flex;

  -webkit-box-pack: justify;

  -ms-flex-pack: justify;

  justify-content: space-between;

  -webkit-box-orient: vertical;

  -webkit-box-direction: normal;

  -ms-flex-direction: column;

  flex-direction: column;

  width: 90%;
}

.blog-box-right .blog-box-right-top .blog-box-right-top-t {
  display: flex;

  -webkit-box-pack: justify;

  -ms-flex-pack: justify;

  justify-content: space-between;
}

.blog-box-right .blog-box-right-top .blog-box-right-top-b {
  color: #000000;

  margin-top: 4px;

  line-height: 19px;

  overflow: hidden;

  white-space: normal;

  word-break: break-word;

  display: -webkit-box;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 2;
}

.blog-box-right .blog-box-right-bottom {
  display: flex;

  justify-content: space-between;

  margin-top: 12px;
}

.blog-box-right .blog-box-right-bottom .blog-box-right-bottom-left {
  /* display: -ms-flexbox; */

  display: flex;

  /* -webkit-box-align: center;

    -ms-flex-align: center; */

  align-items: center;

  .shanchu:hover {
    color: #1171ee;
  }
}

.blog-box-right .blog-box-right-bottom .blog-box-right-bottom-left > div {
  color: #000000;

  line-height: 20px;

  font-size: 14px;

  margin-right: 20px;
}

.blog-box-right
  .blog-box-right-bottom
  .blog-box-right-bottom-left
  .article-type {
  text-align: center;

  width: 34px;

  height: 20px;

  line-height: 20px;

  border-radius: 2px;

  font-size: 12px;

  margin-right: 8px;

  color: #000000;

  background: rgb(255, 255, 255);
}

.btn-edit-article {
  margin-left: auto;

  display: none;

  line-height: 20px;
}

.blog-list-box:hover .btn-edit-article {
  display: inline-block;
}

.blog-commodity-list {
  height: 40px;

  display: -webkit-box;

  display: -ms-flexbox;

  display: flex;

  -webkit-box-align: center;

  -ms-flex-align: center;

  align-items: center;

  padding: 0 24px;

  /* background: #fff; */

  border-bottom: 1px solid rgba(30, 128, 255, 0.3);

  position: relative;

  top: 1px;
}

.blog-commodity-list > ul {
  width: 97%;

  height: 100%;

  display: -webkit-box;

  display: -ms-flexbox;

  display: flex;

  font-size: 14px;

  font-weight: 500;
}

.blog-commodity-list > ul > li {
  line-height: 40px;

  color: #000000;

  height: 100%;

  /* padding: 0 24px; */

  margin-left: 24px;

  /* margin-right: 24px; */

  text-align: center;

  cursor: pointer;

  display: -webkit-box;

  display: -ms-flexbox;

  display: flex;

  -webkit-box-align: center;

  -ms-flex-align: center;

  align-items: center;

  position: relative;
}

.blog-commodity-list > ul .cutStyle {
  color: #1171ee;
}

.blog-box-right-bottom-left > div {
  margin-right: 20px;
}

.blog-box-right
  .blog-box-right-bottom
  .blog-box-right-bottom-left
  .blog-commodity-price {
  font-size: 20px;

  color: #ff6600;

  margin-right: 20px;
}
</style>