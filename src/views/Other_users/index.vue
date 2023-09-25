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
          <div class="Ask-profile-head-info-t-l-avatar" style="32%">
            <!-- <a href="jscrip:;"> <img src="../../assets/resume/head-portrait.jpg" alt=""> -->

            <a href="jscrip:;">
              <!-- <template v-if="userStore.otherUserInfo === ' '">

                                <img class="avatar" src="" alt="">

                            </template>

                            <template v-else>

                                <img class="avatar" :src="userStore.myUserInfo.avatar_path ? userStore.myUserInfo.avatar_path : ''" alt="">

                            </template> -->

              <img
                class="avatar"
                :src="
                  (userStore.otherUserInfo.avatar_path =
                    userStore.otherUserInfo.avatar_path != ' '
                      ? userStore.otherUserInfo.avatar_path
                      : '')
                "
                alt=""
              />
            </a>
          </div>

          <!-- 资料编辑 -->

          <div
            class="Ask-profile-head-info-t-r-top"
            style="width: 68%; color: rgb(0, 0, 0)"
          >
            <div class="Ask-profile-head-info-t-r-top-left">
              <div style="font-size: 22px">
                {{
                  userStore.otherUserInfo.nick_name
                    ? userStore.otherUserInfo.nick_name
                    : ""
                }}
              </div>

              <div style="font-size: 18px">
                年龄:{{
                  userStore.otherUserInfo.age ? userStore.otherUserInfo.age : ""
                }}
              </div>

              <div class="resume" style="font-size: 13px">
                个人简介：{{
                  userStore.otherUserInfo.profile
                    ? userStore.otherUserInfo.profile
                    : ""
                }}
              </div>
            </div>
          </div>
        </div>

        <!-- 右数据 -->

        <div class="Ask-profile-head-info-t-r">
          <!-- 数据显示 -->

          <div class="Ask-profile-head-info-t-r-bottom">
            <ul>
              <!-- <li><a href="jscrip:;">ID:<span>{{ userStore.otherUserInfo.user_id }}</span></a></li> -->

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
                    userStore.otherUserInfo.fans_count
                      ? userStore.otherUserInfo.fans_count
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
                    userStore.otherUserInfo.follow_count
                      ? userStore.otherUserInfo.follow_count
                      : 0
                  }}</span></a
                >
              </li>
            </ul>

            <div class="Ask-profile-head-info-t-r-top-right">
              <span
                v-if="isFollow == true"
                @click="
                  getcancelFollow(userStore.userId, Route.query.OtherUserId)
                "
              >
                已关注
              </span>

              <span
                v-else
                @click="getfollow(userStore.userId, Route.query.OtherUserId)"
                >关注</span
              >
            </div>
          </div>
        </div>

        <div class="Ask-body-list2">
          <div class="blogStar-header">
            <span> 文章创作</span>

            <!-- <div class="blogStar-header-cont">

                            <span style="">未入围</span>

                            <a href="jscrip:;">奖励</a>

                        </div> -->
          </div>

          <div class="blogStar-cont">
            <!-- <p>距离入围还差 25 篇高质量文章</p> -->

            <router-link to="/article">去创作</router-link>

            <!-- <a href="jscrip:;"> 去创作</a> -->
          </div>
        </div>

        <div class="Ask-body-list3">
          <div class="Ask-common-box-head">业务成绩</div>

          <div class="Ask-common-box-bottom">
            <div class="Ask-common-box-content">
              <div class="blogStar-cont">
                <router-link to="/ProductRelease"> 发布商品</router-link>
              </div>

              <!-- <li><img src="../../assets/resume/20210114022831.png" alt="">订单处理</li>

                                <li> <img src="../../assets/resume/20210114022828.png" alt=""> 购物车</li> -->
            </div>

            <div></div>
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
                <router-link
                  :to="{
                    path: '/OtherUsers/OtherLately',
                    query: { OtherUserId: userStore.otherUserInfo.user_id },
                  }"
                  >最近</router-link
                >
              </li>

              <li :class="{ active: isActive === 2 }" @click="changeClass(2)">
                <router-link
                  :to="{
                    path: '/OtherUsers/OtherArticle',
                    query: { OtherUserId: userStore.otherUserInfo.user_id },
                  }"
                  >文章</router-link
                >
              </li>

              <li :class="{ active: isActive === 3 }" @click="changeClass(3)">
                <router-link
                  :to="{
                    path: '/OtherUsers/OtherCommodity',
                    query: { OtherUserId: userStore.otherUserInfo.user_id },
                  }"
                  >商品</router-link
                >
              </li>

              <li :class="{ active: isActive === 4 }" @click="changeClass(4)">
                <router-link
                  :to="{
                    path: '/OtherUsers/OtherAttention',
                    query: { OtherUserId: userStore.otherUserInfo.user_id },
                  }"
                  >关注/订阅/互动</router-link
                >
              </li>

              <!-- 

                                其他用户收藏属于隐私不能看 取消

                                <li :class="{ active: isActive === 5 }" @click="changeClass(5)"><router-link

                                    :to="{ path: '/OtherUsers/OtherCollect', query: { OtherUserId: OtherUser.user_id } }">收藏</router-link>

                            </li> -->

              <!-- <li class="Ask-navlist-search" id="search1" @click="SearchSwitchover">

                                <span>搜索TA的内容</span>

                                <img src="../../assets/resume/search1.png" alt="">

                            </li> -->
            </ul>

            <!-- 搜索 -->

            <!-- <div class="m-search-btn" style="display: none;">

                         和上方控制自己隐藏的方法 

                            <img class="m-search-img-hide" src="../../assets/resume/icon-search2.png" alt="">

                            <input id="mSearchInput" type="text" placeholder="搜索">

                            <div class="m-search-btn-box" id="search2" @click="cancelSearch">

                             

                                <span>搜索</span>

                                <span @click="cancelSearch">取消</span>

                            </div>

                        </div> -->
          </div>

          <div class="mainContent" style="">
            <!-- 路由 -->

            <router-view></router-view>
          </div>
        </div>

        <!-- 右侧边栏  放二维码-->

        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

import { useRoute, useRouter } from "vue-router";

import {
  getFollow,
  cancelFollow,
  getAllArticleByUserId,
  getAllCommodityByBelongUserId,
  getOtherInfo,
} from "@/api/my-api";

import AppTopNav from "@/components/AppTopNav.vue";

import userInfoStore from "@/store/user/user.js";

export default {
  components: {
    AppTopNav,
  },

  setup() {
    // 数据

    let userStore = userInfoStore();

    // 存储其他用户个人数据 没用了

    // const OtherUser = ref({})

    // 控制高亮

    const isActive = ref(1);

    // 访问客户Id 没用

    // const myUserId = ref(' ')

    //通过route接收 其他客户个人Id

    const Route = useRoute();

    const router = useRouter();

    //   其他用户Id 无用了

    // let otherId = ref('')

    // 文章数量

    let articleShu = ref(0);

    // 商品数量

    let CommodityShu = ref(0);

    let aa = {
      belong_user_id: userStore.otherId,

      //  是否降序排列

      desc: false,

      //   页码数量

      page_num: "",

      //   页面大小

      page_size: 1000,
    };

    // 是否已关注

    let isFollow = ref(true);

    function changeClass(i) {
      // console.log(i);

      isActive.value = i;

      console.log(isActive.value);
    }

    //获取其他用户文章列表

    const getPersonAttention = async () => {
      if (userStore.otherId) {
        let res = await getAllArticleByUserId(userStore.otherId);

        if (res.data.data != null) {
          console.log("length属性", res.data.data.length);

          articleShu.value = res.data.data.length;
        } else {
          articleShu.value = 0;
        }
      }
    };

    // 商品列表

    let getAllCommodityUserId = async (aa) => {
      console.log("aaaaaaaaaa", aa);

      let res = await getAllCommodityByBelongUserId(aa);

      console.log("其他用户商品数据", res);

      if (res.data.data != null) {
        console.log("total属性", res.data.data.total);

        CommodityShu.value = res.data.total;
      } else {
        CommodityShu.value = 0;
      }
    };

    //  获取访问客户Id   // 根据用户id获取用户信息

    const getUser = async () => {
      await userStore.getUserData();

      // console.log('访问客户Id', data.data);

      // myUserId.value = userStore.userId;

      console.log("获取到的query参数", Route.query.OtherUserId);

      if (Route.query.OtherUserId) {
        await userStore.getOtherUserData(Route.query.OtherUserId);

        // console.log('其他客户信息', res.data.data);

        // OtherUser.value = res.data.data

        // setTimeout(() => {

        //     console.log('123456789', userStore.otherUserInfo);

        // }, 1000);

        getAllCommodityUserId(aa);

        getPersonAttention();

        isFollow.value = userStore.otherUserInfo.is_user_follow;
      }
    };

    // 根据用户id获取用户信息

    const getOtherInfoMessage = async () => {
      console.log("其他用户Id", Route.query.OtherUserId);

      await userStore.getOtherUserData(Route.query.OtherUserId);

      // console.log('其他客户信息', res.data.data);

      // OtherUser.value = res.data.data

      if (userStore.otherUserInfo != "") {
        isFollow.value = userStore.otherUserInfo.is_user_follow;
      } else {
        await userStore.getOtherUserData(Route.query.OtherUserId);

        isFollow.value = userStore.otherUserInfo.is_user_follow;
      }
    };

    // 关注功能  传入访问客户Id（自己） 与 其他用户个人id

    const getfollow = async (self_id, other_id) => {
      isFollow.value = true;

      const data = { self_id, other_id };

      const res = await getFollow(data);

      console.log(res);
    };

    // 取消关注

    const getcancelFollow = async (self_id, other_id) => {
      isFollow.value = false;

      const data = { self_id, other_id };

      const res = await cancelFollow(data);

      console.log("取消关注", res);
    };

    onMounted(() => {
      //  获取本地存储的uid 确认是否登录

      const uid = localStorage.getItem("uid");

      if (uid == null) {
        router.push("/login");

        return;
      } else if (uid === Route.query.OtherUserId) {
        router.push("/my");

        return;
      } else {
        isActive.value = 1;

        //通过路由获取其他客户个人ID

        console.log("获取到的query参数", Route.query.OtherUserId);

        // if(Route.query.OtherUserId===use)

        getUser();

        // getOtherInfoMessage()

        aa.belong_user_id = Route.query.OtherUserId;

        console.log("qwertertertert", aa);
      }
    });

    // 监听路由参数的变化 避免路由跳转同一页面数据不刷新问题

    watch(
      () => Route.query.OtherUserId,

      (newValue, oldValue) => {
        //  获取本地存储的uid 确认是否登录

        const uid = localStorage.getItem("uid");

        if (uid == null) {
          router.push("/login");

          return;
        } else if (uid === Route.query.OtherUserId) {
          // console.log("当前路由", Route.fullPath);

          // 获取到其他客户个人ID

          router.push("/my");

          return;
        } else {
          aa.belong_user_id = Route.query.OtherUserId;

          isActive.value = 1;

          getUser();
        }
      },

      { immediate: true } // 立即执行一次
    );

    return {
      isActive,
      articleShu,
      CommodityShu,
      isFollow,
      userStore,

      changeClass,

      getPersonAttention,
      getAllCommodityUserId,

      // SearchSwitchover,

      // cancelSearch,

      getUser,

      // myUserId,

      // OtherUser,

      Route,

      getfollow,
      getOtherInfoMessage,
      getcancelFollow,
    };
  },
};
</script>

<style lang="scss">
#Ask-toolbar {
  position: relative;

  min-width: 100%;

  width: max-content;

  top: 0px;

  left: 0px;

  // background-color: aqua;
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

  // color: #dfdcdc;
}

body {
  // background-color: rgb(243, 244, 246);
}

img {
  vertical-align: middle;
}

::-webkit-scrollbar {
  width: 10px;

  /*对垂直流动条有效*/

  height: 10px;

  /*对水平流动条有效*/

  background-color: rgba(255, 255, 255, 0.6);
}

::-webkit-scrollbar-track {
  background-color: rgb(255, 255, 255);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(138, 138, 138);
}

/* 内容模块 */

.Ask-body {
  // margin-top: 20px;
}

.Ask-body-inner {
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

  min-height: 610px;

  height: 85vh;

  margin-right: 10px;

  /* background-color: #fc5531; */

  background: #ffffff;

  position: fixed;

  top: 70px;

  right: 69%;

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

    // background: #363636;
  }

  .Ask-profile-head-info-t-l-avatar img {
    width: 100%;

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

    .resume {
      height: 70px;

      overflow: hidden;

      white-space: break-spaces;

      word-break: break-all;

      display: -webkit-box;

      -webkit-box-orient: vertical;
    }
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

  .Ask-profile-head-info-t-r-top-right span {
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

    float: right;

    color: #000000;
  }

  .Ask-profile-head-info-t-r-top-right span:hover {
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

        img {
          width: 20px;

          height: 20px;

          margin-right: 5px;

          vertical-align: middle;

          // background-color: #b3b3b3;
        }
      }
    }
  }

  // .Ask-profile-head-info-t-r-bottom li:hover span,

  .Ask-profile-head-info-t-r-bottom li:hover a {
    color: #1171ee;
  }

  .Ask-profile-head-info-t-r-bottom li > span {
    display: inline-block;

    width: 1px;

    height: 16px;

    // background: #e8e8ed;

    margin: 0 16px;
  }

  .Ask-body-list2 {
    // background: #fff;

    /* padding: 8px 0; */

    margin: 10px 0;

    width: 338px;

    border-radius: 2px;

    margin-right: 10px;

    padding-bottom: 10px;
  }

  .blogStar-header {
    /* background-image: url(../../assets/resume/start.png); */

    /* background-size: cover; */

    height: 40px;

    /* display: flex; */

    align-items: center;

    /* border-radius: 4px; */

    opacity: 1;

    box-sizing: border-box;

    margin-left: 10px;
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
    // background: rgba(232, 232, 237, .3);

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

  .blogStar-header-cont span:hover {
    color: #1171ee;

    background: #abcdff;

    border: 1px solid rgba(30, 128, 255, 0.3);
  }

  .blogStar-cont p {
    text-align: center;

    padding-top: 16px;

    font-size: 14px;

    color: #000000;

    margin-top: 10px;
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

    // background: #fc5531;

    margin-top: 16px;

    display: block;

    margin-left: 15px;
  }

  .blogStar-cont a:hover {
    color: #1171ee;

    background: #abcdff;

    border: 1px solid rgba(30, 128, 255, 0.3);
  }

  .Ask-body-list3 {
    /* background: #fff; */

    border-radius: 2px;

    margin-bottom: 10px;
  }

  .Ask-common-box-head {
    font-size: 20px;

    color: #000000;

    font-weight: 500;

    line-height: 48px;

    margin-left: 10px;

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

  // overflow: hidden;

  width: 50%;

  min-height: 88vh;

  background: #ffffff;

  margin-left: 30%;

  position: relative;

  top: 56px;

  margin-bottom: 30px;
}

/* 内容 右模块 */

.navList-box {
  // width: 100%;

  // height: 80vh;

  position: relative;

  border-radius: 2px;
}

.navlist {
  width: 95%;

  height: 48px;

  line-height: 48px;

  // background: #1d1a1e;

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

  > a {
    width: 100%;
  }
}

.navList-box .navlist .active:before {
  content: "";

  width: 24px;

  height: 2px;

  background: #181818;

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

  // background: #f5f6f7;

  border-radius: 16px;

  border: 1px solid rgba(30, 128, 255, 0.3);

  cursor: pointer;

  width: 350px;

  color: #000000;

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

  // background: #3b3b3b;

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
  color: #000000;

  text-align: left;

  border-right: 2px solid #3b3b3b;

  box-sizing: border-box;
}

.search_text {
  display: none;
}
</style>
