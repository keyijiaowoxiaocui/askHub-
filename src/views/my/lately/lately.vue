<template>
    <div class="mainContent-box">
        <div>
            <article class="blog-list-box" v-for="(item) in person" :key="item.ID">
                <div style="width: 100%;">
                    <div class="blog-box-left">
                        <template v-if="item.thumbnail != ''">
                            <router-link :to="{ path: `/article_details/${item.articleID}` }">

                                <img :src="item.thumbnail" alt="">
                            </router-link>

                        </template>
                        <template v-else>
                            <!-- <img src="../../../assets/resume/eso1208a.jpg" alt=""> -->
                        </template>
                    </div>
                    <div class="blog-box-right">
                        <div class="blog-box-right-top">
                            <router-link :to="{ path: `/article_details/${item.articleID}` }">
                                <div class="blog-box-right-top-t">
                                    <h4 style="color: #000000;">
                                        {{ item.title }}
                                    </h4>
                                </div>
                                <div class="blog-box-right-top-b">
                                    {{ item.briefIntroduction }}
                                </div>
                            </router-link>
                        </div>
                        <div class="blog-box-right-bottom">
                            <div class="blog-box-right-bottom-left">
                                <!-- <div class="article-type">原创</div> -->
                                <div>发布时间 {{ item.releaseDate }}</div>
                                <div>{{ item.likeCount }} 阅读</div>
                                <div>{{ item.collectionCount }} 收藏</div>
                                <div class="fuzhi" @click="handleGenerateLink(item.articleID)">复制链接</div>
                            </div>
                            <div class="btn-edit-article">
                                <!-- 这里需要一个跳转修改当前文章的方法 -->
                                <router-link
                                    :to="{ path: '/subArticle', query: { articleId: item.articleID } }">编辑</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>
<script >

import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import { getUserData_a } from '@/api/UserApis';

import { getAllArticleByUserId } from "../../../api/my-api.js";
import userInfoStore from "@/store/user/user.js";
import defaultImg from "../../../assets/resume/eso1208a.jpg";
export default {
    setup() {
        // 数据
        // 默认图片
        // let defaultImg = ref('@/assets/resume/eso1208a.jpg');
        let userStore = userInfoStore();

        // 数据 个人文章列表
        const person = ref([]);

        const route = useRoute()
        // 用户信息 不用了
        let myUserInfo = ref({})
        // 生成当前页面链接并复制 需要后台配合  PC端使用
        const handleGenerateLink = (articleID) => {
            let { origin } = window.location
            let { pathname } = window.location
            // console.log(val, '复制链接')
            // let url = window.location.href //当前或他人 页面链接地址  目前是当前
            let url = `${origin + pathname}#/article_details/${articleID}`
            let inputNode = document.createElement('input')  // 创建input
            inputNode.value = url // 赋值给 input 值
            document.body.appendChild(inputNode) // 插入进去
            inputNode.select() // 选择对象
            document.execCommand('Copy') // 原生调用执行浏览器复制命令
            inputNode.className = 'oInput'
            inputNode.style.display = 'none' // 隐藏
            alert('链接已复制')
        }

        //获取用户信息+文章列表 未优化
        let my_users = async () => {
            let res = await getUserData_a()
            myUserInfo.value = res.data.data

            //    获取个人所有文章列表  按日期从近到晚
            const res2 = await getAllArticleByUserId(res.data.data.user_id);
            console.log('个人所有文章列表', res2);
            person.value = res2.data.data;

        }
        //获取用户信息+文章列表 优化
        let my_users2 = async () => {
            if (userStore.userId) {
                // myUserInfo.value = userStore.myUserInfo
                //    获取个人所有文章列表  按日期从近到晚
                const res2 = await getAllArticleByUserId(userStore.userId);
                console.log('个人所有文章列表', res2);
                person.value = res2.data.data;
            }

        }
        // 监视
        watch(() => userStore.userId, () => {
            my_users2()
        })
        onMounted(() => {
            my_users2()
        });


        return {
            person, defaultImg,
            handleGenerateLink, my_users2

        }
    }
}

</script>
<style lang="scss">
/* 最近模块 lately */

.mainContent-box {
    height: 100%;
    width: 95%;
    /* overflow: auto; */
    /* background-color: #1d1e1d; */

}

.blog-list-box {
    /* background-color: #1d1e1d; */
    display: flex;
}

.blog-list-box>div {
    display: flex;
    padding: 24px 0;
    margin: 0 8px;
    // margin-right: 16px;
    border-bottom: 1px solid rgba(30, 128, 255, 0.3);
}

.blog-box-left {
    position: relative;
    margin-right: 16px;
}

.blog-box-left img {
    width: 178px;
    height: 100px;
    border-radius: 2px;
    -o-object-fit: cover;
    object-fit: cover;
    display: block;
    border: 1px solid rgba(30, 128, 255, 0.3);
}

.blog-list-box .blog-box-right {
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
    display: flex;
    align-items: center;

    .fuzhi:hover {
        color: #1171ee;
    }
}

.blog-box-right .blog-box-right-bottom .blog-box-right-bottom-left>div {
    color: #000000;
    line-height: 20px;
    font-size: 14px;
    margin-right: 8px;
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
</style>