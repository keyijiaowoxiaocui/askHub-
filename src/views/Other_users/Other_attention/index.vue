<template>
    <div class="mainContent-box">
        <!-- 关注模块 -->
        <div class="blog-second-list">
            <ul>
                <li style="color: #1171ee;" @click="getfollowlists(userStore.otherId)">关注的人</li>
                <!-- <li @click="getfanslists(queryId)">粉丝</li> -->
            </ul>
        </div>
        <div class="mainContent-bottom">
            <template v-for="(item) in other_followlists" :key="item.user_id">
                <div class="mainContent-bottom-list-content"
                    v-show="item.is_user_follow == false && item.user_id != userStore.userId">
                    <div class="sub-people-left">
                        <!-- <a href="jscrip:;"><img :src="item.avatar_path" alt="" /></a> -->
                        <router-link :to="{ path: '/OtherUsers/OtherLately', query: { OtherUserId: item.user_id } }">
                            <img :src="item.avatar_path" alt="" /></router-link>
                        <div class="sub-people-content">
                            <router-link :to="{ path: '/OtherUsers/OtherLately', query: { OtherUserId: item.user_id } }">
                                <div class="sub-people-title">
                                    <a href="jscrip:;">{{ item.nick_name }}</a>
                                </div>
                                <div class="sub-people-text"> {{ item.profile }}</div>
                            </router-link>

                        </div>
                    </div>
                    <div class="sub-people-right">
                        <!-- 添加点击事件取消关注 -->
                        <div class="subed-btn">已关注</div>
                    </div>

                </div>
            </template>

        </div>
    </div>
</template>
<script >
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getFollowLists } from '@/api/my-api'
import userInfoStore from "@/store/user/user.js";

export default {
    setup() {
        let userStore = userInfoStore();

        let rotate = useRoute()
        // let queryId = ref('')

        let other_followlists = ref([])
        //粉丝列表 没事看啥人家粉丝
        // const getfanslists = async (userid) => {
        //     const res = await getFansLists(userid)
        //     console.log('粉丝', res);
        //     other_followlists.value = res.data.data
        // }
        //关注列表
        const getfollowlists = async (userid) => {
            const res = await getFollowLists(userid)
            console.log('关注', res);
            other_followlists.value = res.data.data
        }

        onMounted(() => {
            getfollowlists(userStore.otherId)
            // queryId.value = rotate.query.OtherUserId
        });
        return {
            other_followlists, userStore, rotate,
            // queryId,
            // getfanslists,
            getfollowlists,
        }
    }
}
</script>

<style lang="scss">
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
}

.blog-second-list>ul>li {
    line-height: 40px;
    color: #000000;
    height: 100%;
    // padding: 0 24px;
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
    // background-color: #fff;
}

.mainContent-bottom-list-content {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 24px;
    margin: 0 24px;
    border-bottom: 1px solid rgba(30, 128, 255, 0.3);

    >div {
        max-width: 70%;
    }
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
    border: 2px solid rgba(30, 128, 255, 0.3);
    color: #1171ee;
    background: #abcdff;
}
</style>