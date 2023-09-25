<template>
    <div class="mainContent-box">
        <!-- 文章模块 -->
        <div class="blog-second-list">
            <ul>
                <li :class="{ cutStyle: current === 1 }" @click="getPersonAttention(), changeStyle(1)">
                    所有
                </li>
                <li :class="{ cutStyle: current === 2 }" @click="getPersonPublicArticleBy(), changeStyle(2)">公开
                </li>
                <li :class="{ cutStyle: current === 3 }" @click="getPersonPrivacyArticleBy(), changeStyle(3)">
                    私密
                </li>
                <li :class="{ cutStyle: current === 4 }" @click="getPersonCollectArticleBy(), changeStyle(4)">收藏的文章</li>
            </ul>
        </div>
        <div ref="Box" @scroll="divScroll">
            <template v-for="(personList) in person" :key="personList.articleID">
                <article class="blog-list-box" style="width: 100%;">
                    <div class="blog-box-left">
                        <!-- <img src="../../../assets/resume/最近1.png" alt=""> -->
                        <!-- <router-link :to="{ path: `/article_details/articleID=${personList.articleID}` }"> -->
                        <!-- <router-link :to="{ path: `/article_details/${personList.articleID}` }">

                            <img :src="personList.thumbnail" alt=""></router-link> -->

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
                            <!-- <router-link :to="{ path: `/article_details/articleID=${personList.articleID}` }"> -->
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
                                <div>发布时间 {{ personList.releaseDate }}</div>
                                <div>{{ personList.likeCount }} 阅读</div>

                                <div>{{ personList.collectionCount }} 收藏</div>
                                <div @click="deleteOneArticle(personList.articleID)">删除</div>
                                <div class="fuzhi" @click="handleGenerateLink(personList.articleID)">复制链接</div>
                            </div>
                            <div class="btn-edit-article">
                                <!-- 这里需要一个跳转修改前文章的方法 编辑 -->
                                <router-link
                                    :to="{ path: '/subArticle', query: { articleId: personList.articleID } }">编辑</router-link>
                            </div>
                        </div>
                    </div>
                </article>
            </template>

        </div>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { getAllArticleByUserId, getPublicArticleByUserId, getArticleCollect, deleteArticle } from "../../../api/my-api.js";
import { getUserData_a } from '@/api/UserApis';
import userInfoStore from "@/store/user/user.js";

export default {
    setup() {
        let userStore = userInfoStore();

        // 选中样式切换
        let current = ref(1)
        // 用户信息 无用
        // let myUserInfo = ref({})
        //用户Id 无用
        // let myUserInfoId = ref('')
        // 数据 文章列表
        let person = ref([])
        // 临时存放文章列表
        let personList = []
        // 数据 个人公开文章列表

        const personPublic = ref([]);
        // 数据 个人私密文章列表

        let personPrivacy = ref([])
        function changeStyle(value) {
            // console.log(value);
            current.value = value
        }

        //    获取个人所有文章列表  按日期从近到晚
        const getPersonAttention = async () => {
            console.log('所有id', userStore.userId);
            const res = await getAllArticleByUserId(userStore.userId);
            console.log("所有", res);
            personPublic.value = res.data.data;
            person.value = personPublic.value
            personList = res.data.data;
        }
        // 获取个人所有公开文章列表
        const getPersonPublicArticleBy = async () => {
            console.log('公开id', userStore.userId);
            const res = await getPublicArticleByUserId(userStore.userId)
            console.log("公开", res);
            person.value = res.data.data;
        }
        // 获取个人收藏文章列表
        const getPersonCollectArticleBy = async () => {
            console.log('收藏id', userStore.userId);
            const res = await getArticleCollect(userStore.userId)
            console.log("收藏", res);
            person.value = res.data.data;
        }
        // 获取个人所有私密文章列表
        const getPersonPrivacyArticleBy = async () => {
            console.log('私密id', userStore.userId);
            const res = await getAllArticleByUserId(userStore.userId);
            console.log("私密", res);
            let linShi = res.data.data;
            person.value = linShi.filter(item => {
                if (item.publicOrNot == 0) {
                    return item
                }
            });
        }
        // 删除文章
        // 用于防抖或节流
        let ant = false;
        const deleteOneArticle = async (id) => {
            if (ant == false) {
                ant = true
                personList = person.value
                person.value = personList.filter(item => item.articleID !== id)
                // 字符串转数字
                const idNum = Number(id)
                const res = await deleteArticle(idNum)
                console.log("删除", res);
                if (res.data.code == 0) {
                    ant = false
                    alert("删除成功")
                }
            }
        }
        // 生成当前页面链接并复制链接
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
        //获取用户信息 未优化
        let my_users = async () => {
            let res = await getUserData_a()
            myUserInfo.value = res.data.data;
            myUserInfoId.value = res.data.data.user_id;
            const res2 = await getAllArticleByUserId(myUserInfoId.value);
            person.value = res2.data.data;
        }
        //获取用户信息 优化
        let my_users2 = async () => {
            // myUserInfo.value = userStore.myUserInfo;
            // myUserInfoId.value = userStore.userId;

            const res2 = await getAllArticleByUserId(userStore.userId);
            person.value = res2.data.data;
        }
        let divScroll = (e) => {
            const sh = this.$refs.Box.scrollHeight
            const ch = this.$refs.Box.clientHeight
            const st = this.$refs.Box.scrollTop
            console.log('滚动条高度' + sh)
            console.log('可视区高度' + ch)
            console.log('距离顶部距离' + st)
            if (ch + st == sh) {
                console.log('到底啦...')
            }
        }

        onMounted(() => {
            my_users2()
        });
        return {
            person, personPublic, personPrivacy, current,
            getPersonAttention,
            handleGenerateLink,
            getPersonPublicArticleBy, my_users2, getPersonPrivacyArticleBy, changeStyle, getPersonCollectArticleBy, deleteOneArticle, divScroll
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

.blog-list-box>div {
    display: flex;
    padding: 24px 0;
    margin: 0 8px;
    // margin-right: 16px;
    border-bottom: 1px solid rgba(30, 128, 255, 0.3);
}

.blog-list-box {
    display: flex;
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
        color: #1171ee;
    }
}

.blog-box-right .blog-box-right-bottom .blog-box-right-bottom-left>div {
    // color: #555666;
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
    // height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: 24px;
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    z-index: 2;
}

.blog-second-list>ul>li {
    line-height: 40px;
    color: #000000;
    height: 100%;
    // padding: 0 24px;
    // margin-left: 16px;
    margin-right: 24px;
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

.blog-second-list>ul .cutStyle {
    color: #1171ee;
}
</style>