<template>
  <div style="position: fixed; top: 0; left: 0; width: 100%; z-index: 10">
    <AppTopNav />
  </div>
  <!-- 内容模块 -->
  <div class="Ask-body">
    <div class="Ask-body-inner">
      <!-- 内容左 列表 -->
      <div class="Ask-body-left">
        <!-- 左头像 -->
        <div class="Ask-profile-head-info-t-l">
          <div class="Ask-profile-head-info-t-l-avatar" style="width: 32%">
            <img
              class="avatar"
              :src="
                userStore.myUserInfo.avatar_path
                  ? userStore.myUserInfo.avatar_path
                  : ''
              "
              alt=""
            />
          </div>
          <!-- 资料编辑 -->
          <div class="Ask-profile-head-info-t-r-top" style="width: 68%">
            <div class="Ask-profile-head-info-t-r-top-left">
              <div style="font-size: 22px">
                {{
                  userStore.myUserInfo.nick_name
                    ? userStore.myUserInfo.nick_name
                    : ""
                }}
              </div>
              <div style="font-size: 18px">
                年龄:{{
                  userStore.myUserInfo.age ? userStore.myUserInfo.age : ""
                }}
              </div>
              <div class="resume" style="font-size: 16px">
                个人简介：{{ userStore.myUserInfo.profile }}
              </div>
              <div class="resume" style="font-size: 13px">
                个人简介：{{ userStore.myUserInfo.profile }}
              </div>
            </div>
          </div>
        </div>
        <!-- 右数据 -->
        <div class="Ask-profile-head-info-t-r">
          <!-- 数据显示 -->
          <div class="Ask-profile-head-info-t-r-bottom">
            <ul>
              <!-- <li>
                <a href="jscrip:;">ID:<span>{{
                  userStore.myUserInfo.user_id ? userStore.myUserInfo.user_id : ""
                }}</span></a>
              </li> -->
              <li>
                <a href="jscrip:;">
                  <span>
                    <img
                      src="../../assets/resume/icon_30brnocwcck/zuopin.png"
                      alt=""
                    />
                  </span>
                  作品:<span>{{ articleShu }}</span></a
                >
              </li>
              <li>
                <a href="jscrip:;">
                  <span>
                    <img
                      src="../../assets/resume/icon_30brnocwcck/shangpin.png"
                      alt=""
                  /></span>

                  商品:<span>{{ CommodityShu }}</span></a
                >
              </li>
              <li>
                <a href="jscrip:;">
                  <span>
                    <img
                      src="../../assets/resume/icon_30brnocwcck/fensiguanli.png"
                      alt=""
                  /></span>
                  粉丝:<span>{{
                    userStore.myUserInfo.fans_count
                      ? userStore.myUserInfo.fans_count
                      : 0
                  }}</span></a
                >
              </li>
              <li>
                <a href="jscrip:;">
                  <span>
                    <img
                      src="../../assets/resume/icon_30brnocwcck/guanzhu.png"
                      alt=""
                  /></span>
                  关注:<span>{{
                    userStore.myUserInfo.follow_count
                      ? userStore.myUserInfo.follow_count
                      : 0
                  }}</span></a
                >
              </li>
            </ul>
            <div class="Ask-profile-head-info-t-r-top-right">
              <!-- <router-link to="/alterMyMsg" @click="changeClass"><img src="../../assets/resume/redact.png" alt="" />编辑资料</router-link> -->
              <a href="jscrip:;" @click="changeClassStyle"
                ><img src="../../assets/resume/redact.png" alt="" />编辑资料</a
              >
            </div>
          </div>
        </div>
        <div class="Ask-body-list2">
          <div class="blogStar-header">
            <span> 文章创作</span>
          </div>
          <div class="blogStar-cont">
            <router-link to="/subArticle">去创作</router-link>
          </div>
        </div>
        <div class="Ask-body-list3">
          <div
            class="Ask-common-box-head"
            style="
              font-size: 18px;
              font-family: SourceHanSansCN-Bold, SourceHanSansCN;
              font-weight: 700;
              color: #000000;
            "
          >
            业务成绩
          </div>

          <div class="Ask-common-box-bottom">
            <div class="Ask-common-box-content">
              <div class="blogStar-cont">
                <router-link to="/ProductRelease"> 发布商品</router-link>
              </div>
              <!-- <li>订单处理</li> -->
              <!-- <li> 购物车</li> -->
            </div>
          </div>
        </div>
      </div>
      <div class="Ask-body-right">
        <!-- 内容导航 -->
        <div class="navList-box">
          <div class="navlist">
            <ul style="">
              <!-- 这里需要一个控制 class 的方法以及控制自己隐藏的方法 -->
              <li
                :class="{ active: isActive === 1 }"
                @click="changeClass(1)"
                style="margin-left: 24px"
              >
                <router-link to="/my/lately">最近</router-link>
              </li>
              <li :class="{ active: isActive === 2 }" @click="changeClass(2)">
                <router-link to="/my/article2">文章</router-link>
              </li>
              <li :class="{ active: isActive === 3 }" @click="changeClass(3)">
                <router-link to="/my/commodity">商品</router-link>
              </li>
              <li :class="{ active: isActive === 4 }" @click="changeClass(4)">
                <router-link
                  :to="{
                    path: 'attention',
                  }"
                  >关注/订阅/互动</router-link
                >
              </li>
              <!-- 收藏页面分流为文章下收藏文章 商品下收藏商品
                                <li :class="{ active: isActive === 5 }" @click="changeClass(5)"><router-link
                                    to="/my/collect">收藏</router-link> </li>
                                 -->
              <!-- 留到以后
                                <li class="Ask-navlist-search" id="search1" @click="SearchSwitchover">
                                <span>搜索TA的内容</span>
                                <img src="../../assets/resume/search1.png" alt="">
                            </li> -->
            </ul>
            <!-- 搜索 -->
            <div class="m-search-btn" id="search2" style="display: none">
              <!-- 和上方控制自己隐藏的方法 -->
              <img
                class="m-search-img-hide"
                src="../../assets/resume/icon-search2.png"
                alt=""
              />
              <input id="mSearchInput" type="text" placeholder="搜索" />
              <div class="m-search-btn-box">
                <!-- 绑定搜索接口 -->
                <span>搜索</span>
                <span @click="cancelSearch">取消</span>
              </div>
            </div>
          </div>
          <div class="mainContent" style="">
            <!-- 路由 -->
            <router-view></router-view>
          </div>
        </div>
        <!-- 右侧边栏  放二维码
        <div></div> -->
      </div>
    </div>
  </div>
  <!-- 编辑模块 -->
  <div id="edit-module">
    <edit />
  </div>
</template>
<script>
import { ref, onMounted, reactive } from "vue";
import AppTopNav from "@/components/AppTopNav.vue";
import { getUserData_a } from "@/api/UserApis";
import edit from "@/views/alter_my_msg/index.vue";
import {
  getAllArticleByUserId,
  getAllCommodityByBelongUserId,
} from "@/api/my-api";
// 引入pinia
import userInfoStore from "@/store/user/user.js";
export default {
  components: {
    AppTopNav,
    edit,
  },
  setup() {
    // 数据
    let userStore = userInfoStore();

    // 存储个人ID 跳转其他页面都要传 无用了
    // let myId = ref("");
    // 控制高亮
    let isActive = ref(1);
    // 用户信息 不需要了
    let myUserInfo = ref({});
    // 文章数量
    let articleShu = ref(0);
    // 商品数量
    let CommodityShu = ref(0);

    let aa = {
      belong_user_id: userStore.userId,
      //  是否降序排列
      desc: false,
      //   页码数量
      page_num: "",
      //   页面大小
      page_size: 1000,
    };
    // 存储第一次数据
    function changeClass(i) {
      // console.log(i);
      isActive.value = i;
      console.log(isActive.value);
    }

    //搜索特效 切换
    // let SearchSwitchover = () => {
    //   let search1 = document.getElementById("search1");
    //   let search2 = document.getElementById("search2");
    //   search1.style.display = "none";
    //   search2.style.display = "block";
    // };

    // let cancelSearch = () => {
    //   let search1 = document.getElementById("search1");
    //   let search2 = document.getElementById("search2");

    //   search1.style.display = "flex";
    //   search2.style.display = "none";
    // };

    //获取用户信息 优化
    let my_users2 = async () => {
      await userStore.getUserData();
      console.log("个人信息");

      aa.belong_user_id = userStore.userId;
      console.log("aa", aa);
      let res2 = await getAllCommodityByBelongUserId(aa);
      console.log("res2", res2);
      if (res2.data.data != null) {
        console.log("total属性", res2.data.data.total);

        CommodityShu.value = res2.data.total;
      } else {
        CommodityShu.value = 0;
      }
      // CommodityShu.value = res2.data.total;
      let res3 = await getAllArticleByUserId(userStore.userId);
      console.log("res3", res3);
      if (res3.data.data != null) {
        console.log("length属性", res3.data.data.length);
        articleShu.value = res3.data.data.length;
      } else {
        articleShu.value = 0;
      }
    };

    // 编辑模块
    let changeClassStyle = () => {
      // 获取id节点
      let edit = document.getElementById("edit-module");
      // console.log(edit);
      edit.style.display = "block";
    };

    onMounted(() => {
      my_users2();
    });
    return {
      isActive,
      articleShu,
      CommodityShu,
      changeClass,
      // SearchSwitchover,
      // cancelSearch,
      my_users2,
      userStore,
      changeClassStyle,
    };
  },
};
</script>
<style lang="scss">
#Ask-toolbar {
  position: relative;
  width: 100%;
  width: max-content;
  top: 0px;
  left: 0px;
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #000000;
}

* {
  margin: 0;
  padding: 0;
}

// body {
//   background-color: rgb(243, 244, 246);
// }

img {
  vertical-align: middle;
}

::-webkit-scrollbar {
  width: 10px;
  /*对垂直流动条有效*/
  height: 10px;
  /*对水平流动条有效*/
  background-color: rgba(75, 73, 73, 0.6);
}

::-webkit-scrollbar-track {
  background-color: rgb(255, 255, 255);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(153, 152, 152);
}

/* 内容模块 */

.Ask-body {
  margin-top: 15px;
  // margin: 0 auto;
}

.Ask-body-inner {
  // width: 1330px;
  width: 90%;
  display: flex;
  min-height: 610px;
  padding-bottom: 32px;
  margin: 0 auto;
  overflow: hidden;
}

/*内容 左侧模块 */
.Ask-body-left {
  width: 338px;
  height: 85vh;

  margin-right: 10px;
  background: #ffffff;
  // border: rgb(88, 94, 88);
  border: 1px solid rgba(30, 128, 255, 0.3);
  position: fixed;
  top: 70px;
  // left: 65px;
  right: 69%;

  // box-shadow: rgb(255, 255, 255) 1px 1px 6px 1px inset;
  // box-shadow: -2px -2px 8px #ffffff;
  .Ask-profile-head-info-t-l {
    height: 140px;
    display: flex;
    justify-content: center;
  }

  .Ask-profile-head-info-t-l .Ask-profile-head-info-t-l-avatar {
    width: 102px;
    height: 102px;
    border: 4px solid rgba(30, 128, 255, 0.3);
    border-radius: 50%;
    // background: #fff;
  }

  .Ask-profile-head-info-t-l-avatar img {
    // width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
  }

  .Ask-profile-head-info-t-l .Ask-profile-head-info-t-l-avatar:hover {
    transform: rotate(666turn);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
  }

  .Ask-profile-head-info-t-r {
    flex: 1;
    margin-left: 16px;
  }

  .Ask-profile-head-info-t-r-top {
    margin-left: 16px;
    height: 100%;
    margin-top: 10px;
  }

  .Ask-profile-head-info-t-r-top-right {
    margin-top: 10px;
    /* display: flex; */
    overflow: hidden;
  }

  .Ask-profile-head-info-t-r-top-right img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    vertical-align: middle;
  }

  .Ask-profile-head-info-t-r-top-right a {
    align-items: center;
    font-size: 14px;
    width: 96px;
    text-align: center;
    height: 32px;
    border-radius: 20px;
    border: 1px solid rgba(30, 128, 255, 0.3);
    text-decoration: none;
    outline: none;
    display: flex;
    justify-content: center;
    color: #000000;
    float: right;
    margin-right: 10px;
  }

  .Ask-profile-head-info-t-r-top-right a:hover {
    border: 1px solid rgba(30, 128, 255, 0.3);
    background: #abcdff;
    color: #1171ee;
  }

  .Ask-profile-head-info-t-r-bottom {
    margin-top: 10px;
  }

  .Ask-profile-head-info-t-r-bottom li {
    margin: 10px;

    > a {
      color: #000000;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      margin-right: 4px;

      span {
        font-size: 16px;
        margin: 0 7px;

        img {
          width: 18px;
          height: 18px;
          vertical-align: middle;
          // background-color: #b3b3b3;
        }
      }
    }
  }

  .Ask-profile-head-info-t-r-bottom li:hover a {
    color: #1171ee;
  }

  .Ask-profile-head-info-t-r-bottom li > span {
    display: inline-block;
    width: 1px;
    height: 16px;
    // background: #1d1e1d;
    margin: 0 16px;
  }

  .Ask-body-list2 {
    // background: #fff;
    margin: 10px 0;
    width: 338px;
    border-radius: 2px;
    margin-right: 10px;
    padding-bottom: 10px;
  }

  .blogStar-header {
    height: 40px;
    align-items: center;
    opacity: 1;
    box-sizing: border-box;
    margin-left: 10px;
    border-bottom: 1px solid rgba(30, 128, 255, 0.3);
  }

  .blogStar-header > span {
    font-size: 18px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: 700;
    color: #000000;
  }

  .blogStar-header-cont {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blogStar-header-cont span {
    background: #abcdff;
    border: none;
    color: #000000;
    width: 44px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 2px;
    /* border: 1px solid #fc5531; */
    font-size: 12px;
    /* font-family: PingFangSC-Regular, PingFang SC; */
    font-weight: 400;
    /* color: #fc5531; */
    margin-left: 4px;
  }

  .Ask-profile-head-info-t-r-top {
    margin-left: 16px;
    height: 100%;
    margin-top: 10px;

    .resume {
      height: 70px;
      overflow: hidden;
      white-space: break-spaces;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      // -webkit-line-clamp: 1;
    }
  }

  .blogStar-cont a {
    width: 306px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 18px;
    border: 1px solid rgba(30, 128, 255, 0.3);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    background: rgb(255, 255, 255);
    margin-top: 16px;
    display: block;
    margin-left: 15px;
  }

  .blogStar-cont a:hover {
    border: 1px solid rgba(30, 128, 255, 0.3);
    background: #abcdff;
    color: #1171ee;
  }

  .Ask-body-list3 {
    /* background: #fff; */
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .Ask-common-box-head {
    font-size: 20px;
    // color: #222226;
    font-weight: 500;
    line-height: 48px;
    margin-left: 10px;
    // border-bottom: 1px solid rgba(30, 128, 255, 0.3);
    border-bottom: 1px solid rgba(30, 128, 255, 0.3);
  }

  .Ask-common-box-achievement li {
    margin-bottom: 12px;
    color: #000000;
    font-size: 18px;
    line-height: 22px;
    display: flex;
  }

  .Ask-common-box-achievement li img {
    margin-right: 10px;
    width: 22px;
    height: 22px;
    display: block;
    /* // background-size: cover; */
  }
}

.Ask-body-right {
  flex: 1;
  background-color: #ffffff;
  // height: 85vh;
  // border: 1px solid rgba($color: #ffffff, $alpha: 1.0);
  // box-shadow: 2px 0px 5px #ffffff;
  // overflow: hidden;
  width: 50%;
  // height: 100%;
  min-height: 88vh;
  margin-left: 30%;
  position: relative;
  top: 56px;
  margin-bottom: 30px;
  color: #000000;
}

.Ask-body-left > div {
  // background-color: #fff;
  color: #000000;
}

/* 内容 右模块 */

.navList-box {
  // width: 100%;
  // height: 98%;
  position: relative;
  border-radius: 2px;
  // overflow: hidden;
}

.navlist {
  width: 95%;
  height: 48px;
  line-height: 48px;
  // background: #1d1e1d;
  box-shadow: 0 1px 0 0 rgba(30, 128, 255, 0.3);
  border-radius: 2px 2px 0 0;
  display: flex;
  align-items: center;
  transform: translateZ(0);
}

.navlist ul li {
  float: left;
  flex-grow: 1;
  margin-right: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.navList-box .navlist .active:before {
  content: "";
  width: 24px;
  height: 2px;
  background: #000000;
  border-radius: 1px;
  position: absolute;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

/* 内容搜索 */

.Ask-navlist-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(30, 128, 255, 0.3);
  cursor: pointer;
  width: 350px;
  color: #555666;
  margin-top: 10px;
  margin-left: 200px;
}

.Ask-navlist-search img {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.Ask-navlist-search:hover {
  border: 1px solid rgba(30, 128, 255, 0.3);
}

.m-search-img-hide {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  left: 24px;
}

#mSearchInput {
  font-size: 14px;
  width: 638px;
  height: 32px;
  line-height: normal;
  outline: 0;
  background: #ffffff;
  vertical-align: top;
  text-indent: 16px;
  padding-right: 34px;
  border: 1px solid rgba(30, 128, 255, 0.3);
  position: absolute;
  left: 42px;
  top: 0;
}

.m-search-btn {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 32px;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.m-search-btn-box {
  position: absolute;
  width: 90px;
  height: 32px;
  top: 1px;
  right: 4px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.m-search-btn-box > span {
  width: 50%;
  height: 16px;
  line-height: 16px;
  display: block;
  font-size: 14px;
  margin-left: 8px;
}

.m-search-btn-box > span:first-child {
  color: #222226;
  text-align: left;
  border-right: 2px solid rgba(30, 128, 255, 0.3);
  box-sizing: border-box;
}

// 编辑模块
#edit-module {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 100;
  // transition: all 1s;
  background-color: #ffffff8c;
  display: none;
}
</style>