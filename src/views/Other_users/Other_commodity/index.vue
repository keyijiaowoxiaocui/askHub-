<template>
    <div class="mainContent-box">
        <!-- 商品模块 -->
        <div class="blog-commodity-list">
            <ul>
                <li style="color: #1171ee;" @click="getCommodity">
                    用户商品
                </li>
            </ul>
        </div>
        <div>
            <article class="blog-list-box" v-for="(item) in person" :key="item.ID">
                <div class="blog-box-left" v-if="item.commodity_images != null">
                    <!-- <img :src="item.commodity_images[0]" alt=""> -->
                    <router-link :to="{ path: `/shop/${item.commodity_id}` }"> <img :src="item.commodity_images[0]"
                            alt=""></router-link>
                </div>
                <div class="blog-box-right">
                    <div class="blog-box-right-top">
                        <router-link :to="{ path: `/shop/${item.commodity_id}` }">
                            <div class="blog-box-right-top-t">
                                <h4 style="color: #000000;">
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
                            <!-- <div>50 浏览</div>
                                <div>30 购买</div>
                                <div> 2 评论</div> -->
                            <div>{{ item.collection }} 收藏</div>
                        </div>
                        <!-- 其他用户的我不可编辑 -->
                        <!-- <div class="btn-edit-article">
                                编辑
                            </div> -->
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { getUserData_a } from '@/api/UserApis';
import userInfoStore from "@/store/user/user.js";

import { getAllCommodityByBelongUserId } from "../../../api/my-api.js";
export default {
    setup() {
        let userStore = userInfoStore();

        // 数据 个人文章列表
        const person = ref([]);
        let otherId = ref('')

        const route = useRoute()
        // 用户信息
        let myUserInfo = ref({})
        let aa = {
            belong_user_id: userStore.otherId,
            //  是否降序排列
            desc: false,
            //   页码数量
            page_num: '',
            //   页面大小
            page_size: 1000
        }
        let bb = {
            page_size: '',
            page_num: 1000,
            desc: false,
            colletorld: ''
        }
        // 个人商品列表
        let getCommodity = async (aa) => {
            const res2 = await getAllCommodityByBelongUserId(aa);
            console.log('个人商品列表', res2);
            person.value = res2.data.data;
        }
        // 收藏的商品列表
        let getCollectCommodity = async () => {
            const res2 = await getAllCommodityByBelongUserId(bb);
            console.log('个人收藏商品列表', res2);
            person.value = res2.data.data;
        }
        onMounted(() => {
            // otherId.value = route.query.OtherUserId
            aa.belong_user_id = userStore.otherId
            bb.colletorld = userStore.otherId
            console.log('其他用户ididididid', aa.belong_user_id);
            getCommodity(aa)
        })
        return {
            person, myUserInfo,
            // otherId,
            getCommodity, getCollectCommodity
        }
    }
}

</script>

<style>
.mainContent-box {
    height: 100%;
    /* overflow: auto; */
    /* background-color: #1d1a1e; */
}

.blog-list-box {
    /* background-color: #fff; */
}

.blog-list-box>a {
    display: flex;
    padding: 24px 0;
    margin: 0 24px;
    border-bottom: 1px solid rgba(30, 128, 255, 0.3);
}

.blog-box-left {
    position: relative;
    margin-right: 16px;
}

.blog-box-left>img {
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
    width: 100%;
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
}

.blog-box-right .blog-box-right-bottom .blog-box-right-bottom-left>div {
    color: #000000;
    line-height: 20px;
    font-size: 14px;
    margin-right: 20px;
}

.blog-box-right .blog-box-right-bottom .blog-box-right-bottom-left .article-type {
    text-align: center;
    width: 34px;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    font-size: 12px;
    margin-right: 8px;
    color: #000000;
    /* background: rgba(235, 96, 86, 0.1); */
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
    /* padding: 0 24px; */
    /* background: #fff; */
    border-bottom: 1px solid rgba(30, 128, 255, 0.3);
    position: relative;
    top: 1px;
}

.blog-commodity-list>ul {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    /* margin-left: 24px; */
}

.blog-commodity-list>ul>li {
    line-height: 40px;
    color: #000000;
    height: 100%;
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

.blog-box-right-bottom-left>div {
    margin-right: 20px;
}

.blog-box-right .blog-box-right-bottom .blog-box-right-bottom-left .blog-commodity-price {
    font-size: 20px;
    color: #FF6600;
    margin-right: 20px;
}
</style>