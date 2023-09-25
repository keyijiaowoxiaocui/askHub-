<template>
  <div class="mainContent-box">
    <!-- 关注模块 -->
    <div class="blog-second-list">
      <ul>
        <li :class="{ cutStyle: current === 1 }" @click="getfollowlists(userStore.userId), changeStyle(1)">关注的人</li>
        <li :class="{ cutStyle: current === 2 }" @click="getfanslists(userStore.userId), changeStyle(2)">粉丝</li>
      </ul>
    </div>
    <div class="mainContent-bottom">
      <template v-for="(item) in followlists" :key="item.user_id">
        <div class="mainContent-bottom-list-content">
          <div class="sub-people-left">
            <router-link :to="{ path: '/OtherUsers/OtherLately', query: { OtherUserId: item.user_id } }">
              <img :src="item.avatar_path" alt="" /></router-link>

            <div class="sub-people-content">
              <div class="sub-people-title">
                <router-link :to="{ path: '/OtherUsers/OtherLately', query: { OtherUserId: item.user_id } }">
                  {{ item.nick_name }}</router-link>
              </div>
              <div class="sub-people-text"> {{ item.profile }}</div>
            </div>
          </div>
          <div class="sub-people-right">
            <!-- 添加点击事件取消关注 -->
            <div class="subed-btn" v-if="item.is_user_follow === true || item.is_user_follow === false && isguanZhu"
              @click="getcancelFollow(userStore.userId, item.user_id)">
              已关注
            </div>
            <div class="subed-btn" v-if="item.is_user_follow === false && !isguanZhu"
              @click="setfollow(userStore.userId, item.user_id)">
              关注
            </div>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>
<script >
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getFollowLists, getFansLists, cancelFollow, getFollow } from "@/api/my-api";
import userInfoStore from "@/store/user/user.js";

export default {
  setup() {
    let userStore = userInfoStore();

    // 判断是否删除当前关注 直接将数组数据删除即可
    // let isShow = ref(false)
    let rotate = useRoute();
    // let queryId = ref('')
    let current = ref(1)
    // 粉丝是否关注
    let isfensi = ref(false)
    // 关注对象id
    let followlists = ref([]);
    // const fanslists = reactive([]);
    function changeStyle(value) {
      current.value = value
    }
    //粉丝列表
    let getfanslists = async (userid) => {

      const res = await getFansLists(userid);
      console.log("粉丝列表", res);
      isguanZhu.value = false
      followlists.value = res.data.data;
    };
    //关注列表
    let isguanZhu = ref(false)
    let getfollowlists = async (userid) => {
      const res = await getFollowLists(userid);
      console.log("关注列表", res);
      isguanZhu.value = true
      followlists.value = res.data.data;
    };
    // 取消关注
    const getcancelFollow = async (self_id, other_id) => {
      // isShow.value = true 
      other_id = other_id.toString()
      const data = { self_id, other_id }
      console.log("取消关注", data);
      //根据other_id 删除followlists数组内该元素
      followlists.value = followlists.value.filter(item => item.user_id != other_id)
      const res = await cancelFollow(data)
      console.log('取消关注', res);
    }
    // 用户关注
    const setfollow = async (self_id, other_id) => {
      other_id = other_id.toString()
      const data = { self_id, other_id }
      console.log("关注对象", data);
      const res = await getFollow(data)
      console.log('已关注', res);
    }

    // watch(() => isguanZhu, () => {
    //   if (isguanZhu.value == true) {
    //     let subed = document.getElementsByClassName('subed-btn')
    //     subed.innerHTML = '已关注'
    //   }
    // }
    // )

    onMounted(() => {
      getfollowlists(userStore.userId);
      // queryId.value = userStore.userId
    });
    return {
      isfensi, userStore, current, isguanZhu,
      followlists,
      getfanslists,
      getfollowlists, getcancelFollow, setfollow, changeStyle
    };
  },
};
</script>

<style lang="scss">
/* 关注模块 */
.mainContent-box {
  height: 100%;
  // overflow: auto;
}

.blog-second-list {
  height: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  // padding: 0 24px;
  // background: #1d1a1e;
  border-bottom: 1px solid rgba(30, 128, 255, 0.3);
  position: relative;
  top: 1px;
}

.blog-second-list>ul {
  width: 97%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 14px;
  font-weight: 500;

  .cutStyle {
    color: #1171ee;
  }
}

.blog-second-list>ul>li {
  line-height: 40px;
  color: #000000;
  height: 100%;
  // padding: 0 24px;
  // margin-left: 16px;
  margin-left: 24px;
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

.mainContent-bottom {
  // background-color: #413f3f;
}

.mainContent-bottom-list-content {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-top: 24px;
  margin: 0 24px;
  border-bottom: 1px solid rgba(30, 128, 255, 0.3);

  // >div {
  //   max-width: 70%;
  // }
}

.mainContent-bottom-list-content>.sub-people-left {
  display: flex;
  position: relative;
}

.mainContent-bottom-list-content>.sub-people-left>a>img {
  width: 48px;
  height: 48px;
  border: 1px solid rgba(30, 128, 255, 0.3);
  border-radius: 50%;
  margin-right: 9px;
  cursor: pointer;
}

.mainContent-bottom-list-content>.sub-people-left .sub-people-content .sub-people-title {
  font-size: 19px;
}

.mainContent-bottom-list-content>.sub-people-left .sub-people-content .sub-people-text {
  color: #000000;
  margin-right: 4px;
  font-size: 14px;
  margin-top: 10px;
  // 只展示一行 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;

}

.mainContent-bottom-list-content .sub-people-right {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 32px;
}

.mainContent-bottom-list-content .sub-people-right .subed-btn {
  width: 74px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid rgba(30, 128, 255, 0.3);
  color: #000000;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
}

.mainContent-bottom-list-content .sub-people-right .subed-btn:hover {


  border: 1px solid rgba(30, 128, 255, 0.3);
  background: #abcdff;
  color: #000;

}
</style>