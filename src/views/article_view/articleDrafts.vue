<template>
    <div class="draftsWrapper">
        <AppTopNav />
        <div class="drafts">
            <div class="headwrapper">
                <div class="header">
                    <span>草稿箱</span>
                </div>
            </div>
            <div class="mainwrapper">
                <ul>
                    <li class="main" v-if="draftData.length > 0" v-for="item in draftData" :key="item.ID">
                        <div @click="checkDraft(item.draftArticleID)" class="titlewrapper">
                            <div class="title">{{ item.title }}</div>
                            <div class="time">{{ item.releaseDate }}</div>
                        </div>
                        <div class="del">
                            <button class="Mbutton" @click="deleteArticleDraftById(item.draftArticleID)">删除</button>
                        </div>
                    </li>
                    <li v-if="draftData.length <= 0">
                        <p class="nodraft">还没有草稿哦</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script setup>
import AppTopNav from '@/components/AppTopNav.vue';
import { onMounted, ref } from 'vue'
import { getArticleDraftByUserId_a, deleteArticleDraftById_a } from '@/api/ArticleApis.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()

const userId = ref('')

const draftData = ref([])

// 删除草稿
const deleteArticleDraftById = ((id) => {
    console.log('你啊你懂我新房',id);
    deleteArticleDraftById_a(id).then(res => {
        if (res.data.message == 'success') {
            ElMessage({
                message: "删除成功！",
                type: "success",
            });
        }
        getArticleDraftByUserId()
    })
})

const getArticleDraftByUserId = (() => {
    getArticleDraftByUserId_a(userId.value).then(res => {
        console.log('res.data.data',res.data.data);
        draftData.value = res.data.data;

        console.log('draftData',draftData.value);
    })
})

onMounted(() => {
    userId.value = localStorage.getItem('uid')
    setTimeout(() => {
        getArticleDraftByUserId()
    }, 1300);
})

// 选择草稿
const checkDraft = (id) => {
    console.log('id',id);
    localStorage.setItem('draftId', id)
    router.push('/subArticle')
}
</script>

<style lang="scss" scoped>

$background-color:#fff;
$smallFont:#515767;
$title:#000000;
$blue1:#1171ee;
$blue2:#007FFF;
$buttoncolor:#1171ee;
$burronback:#abcdff;
$buttonborder:1px solid rgba(30, 128, 255, 0.3);
$dolor:#FF6600;

.Mbutton {
    width: 80px;
    color: #f2f2f2;
    z-index: 100;
    height: 35px;
    line-height: 35px;
    padding-right: 8px;
    padding-left: 8px;
    margin-top: 0;
    margin-left: 9px;
    border-radius: 13px;
    transition: border-color 0.4s;
    /* 添加边框颜色过渡效果 */
    position: relative;
    /* 添加相对定位，用于伪元素的绝对定位 */
	border-bottom: 1px solid #585e58;

  border-color: #252933;
	color: #252933 !important;
    border-top: none;
    border-left: none;
    border-right: none;
}

/* 鼠标悬停状态下 */
.Mbutton:hover {
    /* ... 其他样式 ... */
    border-color: #fff;
    /* 添加边框颜色 */
}

/* 鼠标按下状态下 */
.Mbutton:active {
    border-color: #585e58;
  color: #0000;
  /* 添加边框颜色 */
  transform: translateY(0);
}

/* 动态荧光白效果 */
.Mbutton:hover::before,
.Mbutton:active::before {
    content: '';
    /* 添加伪元素内容 */
    position: absolute;
    top: -2px;
    /* 控制位置以覆盖边框 */
    left: -2px;
    /* 控制位置以覆盖边框 */
    right: -2px;
    /* 控制位置以覆盖边框 */
    bottom: -2px;
    /* 控制位置以覆盖边框 */
    border: 1px solid transparent;
    /* 初始边框设置为透明 */
    border-radius: 13px;
    animation: glow 2s infinite;
    /* 添加动画效果 */
    border-radius: 10px;
}

/* 定义荧光动画 */
@keyframes glow {

    0%,
    100% {
        border-color: #585e58;
    }

    50% {
        border-color: transparent;
    }
}

.draftsWrapper {
    width: 100%;
    // height: 100vh;
    min-height: 100vh;

    .drafts {
        width: 980px;
        min-height: 200px;
        margin: 0 auto;
        background-color: $background-color;
        margin-top: 25px;

        .headwrapper {
            padding: 10px;
            border-bottom: 2px solid #585e58;

            .header {
                width: 100%;
                height: 40px;
                // background-color: red;

                span {
                    height: 40px;
                    line-height: 40px;
                    font-weight: 400;
                    font-size: 20px;
                    color: #8e98a5;
                }
            }

        }

        .mainwrapper {
            padding: 10px;

            .main {
                display: flex;
                width: 100%;
                margin: unset;
                border-bottom: 1px solid #585e58;
                height: 86px;
                box-sizing: border-box;
                justify-content: space-between;


                .titlewrapper {
                    margin: 5px;
                    padding: 15px;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    justify-content: space-between;
                    cursor: pointer;
                }


                .titlewrapper:hover {
                    background-color: #f2f3f5;
                }

                .title {
                    color: $title;
                }

                .time {
                    color: $smallFont;
                }

                .del {
                    margin: auto 0;
                }
            }


            .nodraft {
                font-size: 50px;
                text-align: center;
                color: $title;
            }
        }

    }
}
</style>