<template>
    <div class="showDetails">
        <AppTopNav />
        <div class="main_wrapper">
            <div class="main">
                <div class="seller">
                    <!-- <a href="javascript:;" class="right_a">
                        <img v-if="!seller.avatar_path" :src="seller.avatar_path" alt="">
                        <img v-else src="https://p3-passport.byteimg.com/img/mosaic-legacy/3793/3131589739~64x64.awebp" alt="">
                    </a> -->
                    <div class="right_a">
                        <headPortrait :useravatar='seller.avatar_path' />
                    </div>
                    <div class="sellerMessage">
                        <span class="sellerName">昵称：{{ seller.nick_name }}</span>
                        <span class="sellerPro">个性签名：{{ seller.profile }}</span>
                    </div>
                    <div class="callSeller">
                        <button class="Mbutton iconfont">&#xe637; 联系卖家</button>
                    </div>
                </div>
                <div class="shop_wrapper">
                    <div class="shop">
                        <div class="left">
                            <div class="big_img" ref="target">
                                <img class="mainPic" :src="shopDetails.commodity_images[currIndex]">
                                <!-- <div class="layer" v-show="!isOutside" :style="shadeMove"></div> -->
                            </div>
                            <ul class="small_img">
                                <li v-for="(img, i) in shopDetails.commodity_images" :key="i" @mouseenter="currIndex = i">
                                    <img :class="{ 'mainPic': 'true', 'active': i === currIndex }" :src="img"
                                         alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="right">
                            <div class="name">商品名称: {{ shopDetails.name }}</div>
                            <div class="introduction">商品介绍: {{ shopDetails.introduction }}</div>
                            <div class="price">商品价格: {{ shopDetails.price }}</div>
                            <button class="Mbutton iconfont">&#xe637; 联系卖家</button>
                            <button @click="collectShop" v-if="shopDetails.total == 0" class="Mbutton iconfont">&#xe86d;
                                收藏商品</button>
                            <button @click="collectShop" v-if="shopDetails.total == 1" class="Mbutton iconfont">&#xe86d;
                                已收藏</button>
                        </div>
                    </div>
                    <div class="showComment" v-if="tocommentData.styleId && tocommentData.belong_user_id">
                        <comment :tocommentData="tocommentData" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
// 引入userSoure
import userStore from '@/store/user/user.js'
let userstore = userStore()
// 引入需要的接口api
import { getShowDetails, getShowPublisher, collectCommodity } from '@/api/shop/shop.js'
import { getUserData_a } from '@/api/UserApis.js'
// 顶部导航栏
import AppTopNav from '@/components/AppTopNav.vue'
import comment from '@/components/comment.vue'
import headPortrait from '@/components/user/headPortrait.vue'
import { ElMessage } from 'element-plus'
const route = useRoute();


// 导入 useMouseInElement，响应式获取鼠标相对于元素的位置
// import { useMouseInElement } from '@vueuse/core'

// 传给评论的数据
const tocommentData = reactive({
    commentStyle: '商品',
    styleId: '',
    belong_user_id: ''
})

const shopID = ref('')

const shopDetails = ref({
    name: '',
    price: 0,
    commodity_images: [],
    introduction: '',
    belong_user_id: '',
    total: ''
})

const userId = ref()

const seller = ref({
    user_id: '',
    nick_name: '',//昵称
    avatar_path: '',//头像
    profile: '',//个性签名
})

const currIndex = ref(0)

onMounted(() => {
    shopID.value = route.params.id
    tocommentData.styleId = route.params.id
    userId.value = localStorage.getItem('uid')
    console.log('666', shopID.value);
    // 根据商品ID获得该商品的信息
    getShowDetails(userId.value, shopID.value).then(res => {
        console.log('213', res);
        let data = res.data.data
        shopDetails.value.name = data.name
        shopDetails.value.price = data.price
        shopDetails.value.commodity_images = data.commodity_images
        shopDetails.value.introduction = data.introduction
        shopDetails.value.belong_user_id = data.belong_user_id
        shopDetails.value.total = res.data.total
    })

    // // 根据商品ID获得发布该商品的用户信息
    getShowPublisher(shopID.value).then(res => {
        console.log('1', res);
        getUserData_a(res).then(res2 => {
            console.log('2', res2);
            let data = res2.data.data
            seller.value.user_id = data.user_id;
            seller.value.nick_name = data.nick_name;
            seller.value.avatar_path = data.avatar_path;
            seller.value.profile = data.profile;
            tocommentData.belong_user_id = data.user_id
        })
    })
})


// 收藏商品
const collectShop = () => {

    console.log('123');
    collectCommodity({ 'commodity_id':Number(shopID.value) , 'collector_id': userId.value }).then(res => {
        console.log('123', res);
        if (res.data.message == 'success') {


      if ( shopDetails.value.total == 1) {
        ElMessage({
            message: "取消收藏!",
        type: "success",
      });
      shopDetails.value.total = 0
      }else{
        ElMessage({
            message: "收藏成功!",
        type: "success",
      });
      shopDetails.value.total = 1
      }

        }
    })
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
    color: #f2f2f2;
    z-index: 100;
    height: 35px;
    line-height: 35px;
    padding-right: 8px;
    padding-left: 8px;
    margin-top: 9px;
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
    margin-left: 20px;
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
    border-radius: 5px;
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

.showDetails {
    box-sizing: border-box;
    display: block;
    width: 100%;
    background-color: #f2f3f5;
    padding: 12px 0;
    height: 100%;
}

.main_wrapper {
    width: 100%;

    .seller {
        position: relative;
        display: flex;
        margin: 12px auto 0;
        height: 80px;
        width: 1192px;
        border-radius: 40px;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 12px;
        position: relative;
        margin-top: 30px;
        background-color: $background-color;
        border: 1px solid #585e58;

        .right_a {
            width: 56px;
            height: 56px;
        }

        .sellerMessage {
            display: flex;
            margin-left: 50px;
            flex-direction: column;
            justify-content: space-around;

            .sellerName {
                height: 22px;
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: $title;
                letter-spacing: 0;
                line-height: 22px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 300px;
                font-weight: 600;
                color: $smallFont;
            }

            .sellerPro {
                height: 14px;
                font-family: PingFang SC;
                font-size: 14px;
                color: $smallFont;
                line-height: 14px;
                color: $smallFont;
            }
        }

        .callSeller {
            position: absolute;
            right: 20px;
            line-height: 56px;
        }
    }

    .shop_wrapper {
        position: relative;
        background-color: $background-color;
        margin: 12px auto 40px;
        width: 1192px;
        border-radius: 24px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 14px 0;
        border: 1px solid #585e58;

        .shop {
            padding: 0 14px;
            display: flex;
            height: 100%;
            padding-bottom: 12px;

            .left {
                width: 453px;

                .big_img {
                    position: relative;
                    display: flex;
                        justify-content: center;
                        /* 水平居中 */
                        align-items: center;
                        /* 垂直居中 */
                    width: 450px;
                    height: 450px;

                    .mainPic {
                        display: block;
                        border-radius: 12px;
                        max-width: 100%;
                        max-height: 100%;
                    }
                }

                .small_img {
                    display: flex;
                    margin-top: 10px;

                    li {
                        display: flex;
                        justify-content: center;
                        /* 水平居中 */
                        align-items: center;
                        /* 垂直居中 */
                        width: 68px;
                        height: 68px;
                        margin-right: 10px;

                        .mainPic {
                            box-sizing: border-box;
                            border-radius: 12px;
                            display: block;
                            max-width: 100%;
                            max-height: 100%;
                        }

                        .active {
                            padding: 2px;
                            border: 1px solid #585e58;
                        }
                    }
                }
            }

            .right {
                // float: left;
                margin-left: 21px;
                width: 694px;
                height: 200px;
                // background-color: green;

                .name {
                    line-height: 28px;
                    color: $title;
                    letter-spacing: 0;
                    font-size: 20px;
                    font-family: PingFang SC;
                    font-weight: 900;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .introduction {
                    height: 62px;
                    font-family: PingFang SC;
                    font-size: 14px;
                    color: $smallFont;
                    line-height: 20px;
                }

                .price {
                    color: $dolor;
                    font-size: 20px;
                }
            }
        }
    }
}

.right>div {
    margin-bottom: 50px;
}
</style>