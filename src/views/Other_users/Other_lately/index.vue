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
                                    <h4 style="color: rgb(0, 0, 0);">
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
                                <!-- <div>30 点赞</div> -->
                                <!-- <div> 2 评论</div> -->
                                <div>{{ item.collectionCount }} 收藏</div>
                                <div class="fuzhi" @click="handleGenerateLink(item.articleID)">复制链接</div>
                            </div>
                            <!-- <div class="btn-edit-article">
                                这里需要一个跳转修改当前文章的方法
                                <router-link
                                    :to="{ path: '/subArticle', query: { articleId: item.articleID } }">编辑</router-link>
                            </div> -->
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
import { getOtherInfo, getAllArticleByUserId } from '@/api/my-api';
import userInfoStore from "@/store/user/user.js";

export default {
    setup() {
        // 数据
        let userStore = userInfoStore();

        //   其他用户Id 
        // let otherId = ref('')
        // 数据 被访问用户公开文章列表
        const person = ref([]);

        const route = useRoute()
        // 生成当前页面链接并复制 需要后台配合  PC端使用
        const handleGenerateLink = (articleID) => {
            let { origin } = window.location
            let { pathname } = window.location
            // console.log(val, '复制链接')
            // let url = window.location.href //当前或他人 页面链接地址  目前是当前
            let url = `${origin + pathname}#/article_details/articleId?articleId=${articleID}`
            let inputNode = document.createElement('input')  // 创建input
            inputNode.value = url // 赋值给 input 值
            document.body.appendChild(inputNode) // 插入进去
            inputNode.select() // 选择对象
            document.execCommand('Copy') // 原生调用执行浏览器复制命令
            inputNode.className = 'oInput'
            inputNode.style.display = 'none' // 隐藏
            alert('链接已复制')
        }
        // 获取个人公开文章列表
        const getAllArticle = async () => {
            const res = await getAllArticleByUserId(route.query.OtherUserId);
            console.log('个人所有文章列表', res);
            person.value = res.data.data;
        }
        // 监视userStore.otherId属性变化
        // watch(userStore.otherId, () => {
        //     getAllArticle();
        // })
        onMounted(() => {
            //通过路由获取其他客户个人ID
            console.log("获取到的query参数", route.query.OtherUserId);
            // otherId.value = route.query.OtherUserId
            getAllArticle()
        });
        return {
            // otherId,
            person, route,
            handleGenerateLink
        }
    }
}

</script>
<style lang="scss">
/* 最近模块 lately */
.mainContent-box {
    height: 100%;
    /* overflow: auto; */
    /* background-color: #1d1a1e; */
}

.blog-list-box {
    /* background-color: #fff; */
    display: flex;
}

.blog-list-box>div {
    display: flex;
    padding: 24px 0;
    margin: 0 24px;
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

    .fuzhi:hover {
        color: #abcdff;
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
    /* background: rgba(235, 96, 86, 0.1); */
}

.btn-edit-article {
    margin-left: auto;
    display: none;
    line-height: 20px;
}

.blog-list-box:hover .btn-edit-article {
    display: block;
}
</style>