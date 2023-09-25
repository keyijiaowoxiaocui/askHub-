<template>
    <div class="mainContent-box">
        <!-- 文章模块 -->
        <div class="blog-second-list">
            <ul>
                <li style="color: #1171ee;" @click="getPersonPublicArticleBy">公开</li>
            </ul>
        </div>
        <div>
            <article class="blog-list-box" v-for="(personList) in person" :key="personList.ID">
                <div class="blog-box-left">
                    <!-- <a href=""> <img :src="personList.thumbnail" alt=""></a> -->
                    <template v-if="personList.thumbnail != ''">
                        <router-link :to="{ path: `/article_details/${personList.articleID}` }">

                            <img :src="personList.thumbnail" alt="">
                        </router-link>

                    </template>
                    <template v-else>
                        <!-- <img src="../../../assets/resume/eso1208a.jpg" alt=""> -->
                    </template>

                </div>
                <div class="blog-box-right">
                    <div class="blog-box-right-top">
                        <router-link :to="{ path: `/article_details/${personList.articleID}` }">
                            <div class="blog-box-right-top-t">
                                <h4 style="color: #000000;">
                                    {{ personList.title }}
                                </h4>
                            </div>
                            <div class="blog-box-right-top-b">
                                {{ personList.briefIntroduction }}
                            </div>
                        </router-link>
                    </div>
                    <div class="blog-box-right-bottom">
                        <div class="blog-box-right-bottom-left">
                            <!-- <div class="article-type">原创</div> -->
                            <div>发布时间 {{ personList.releaseDate }}</div>
                            <div>{{ personList.likeCount }} 阅读</div>

                            <div>{{ personList.collectionCount }} 收藏</div>
                            <div class="fuzhi" @click="handleGenerateLink(personList.articleID)">复制链接</div>
                            <!-- <div class="btn-edit-article">
                                <router-link
                                    :to="{ path: '/subArticle', query: { articleId: personList.articleID } }">编辑</router-link>
                            </div> -->
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import { getAllArticleByUserId, getPublicArticleByUserId } from "../../../api/my-api.js";
import userInfoStore from "@/store/user/user.js";

export default {
    setup() {
        let userStore = userInfoStore();

        // 数据 个人公开文章列表
        const person = ref([]);
        let otherId = ref('')
        let route = useRoute()
        // 获取个人所有公开文章列表
        const getPersonPublicArticleBy = async () => {
            const res = await getPublicArticleByUserId(userStore.otherId)
            console.log("公开", res);
            person.value = res.data.data;
        }
        // 生成当前页面链接并复制 需要后台配合  PC端使用
        const handleGenerateLink = () => {
            // console.log(val, '复制链接')
            let url = window.location.href //当前或他人 页面链接地址  目前是当前
            let inputNode = document.createElement('input')  // 创建input
            inputNode.value = url // 赋值给 input 值
            document.body.appendChild(inputNode) // 插入进去
            inputNode.select() // 选择对象
            document.execCommand('Copy') // 原生调用执行浏览器复制命令
            inputNode.className = 'oInput'
            inputNode.style.display = 'none' // 隐藏
            alert('链接已复制')
        }

        onMounted(() => {
            // 接口关了
            // otherId.value = route.query.OtherUserId
            getPersonPublicArticleBy()

        });
        return {
            person, route, otherId,
            handleGenerateLink,
            getPersonPublicArticleBy
        }
    }
}
</script>
<style lang="scss">
.mainContent-box {
    height: 100%;
    // overflow: auto;
    // background-color: #1d1a1e;
}

.blog-list-box {
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

.blog-box-left>a>img {
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
    // background: rgba(235, 96, 86, 0.1);
}

.btn-edit-article {
    margin-left: auto;
    display: none;
    line-height: 20px;
}

.blog-list-box:hover .btn-edit-article {
    display: inline-block;
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
    // background: #fff;
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
    // margin-left: 24px;
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
</style>