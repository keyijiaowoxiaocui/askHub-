<template >
    <div style="width: 100%;">
        <AppTopNav />
    </div>
    <div class="main2">
        <div class="main-top">
            <div class="main-top-top">
                <span>1. 上传商品图片</span>
                <span>最多可上传5
                    张</span>
                <div class="sell-img">
                    <div>
                        <div class="image-upload">
                            <div style="display: flex;" v-if="uploadImg.uploadedImageUrl" class="image-upload-left">
                                <div v-for="imageUrl in uploadImg.uploadedImageUrl" :key="imageUrl.index"
                                    @click="handleDelete(imageUrl)">
                                    <span class="xian">
                                        <img src="../../assets/resume/icon_30brnocwcck/shanchu.png" alt="">
                                    </span>
                                    <img :src="imageUrl" alt="Uploaded Image" class="sub_img">
                                </div>

                            </div>
                            <!-- <div class="up_img"> -->
                            <div class="upload-input">
                                <input id="file" class="img_input" type="file" @change="handleFileUpload" multiple required
                                    accept="image/*">
                            </div>


                            <!-- </div> -->


                            <!-- <button @click="uploadimg">点击上传</button> -->
                        </div>
                    </div>
                </div>
                <div style="font-size: 18px;">
                    <span>2. 商品价格</span>
                    <div style="margin-top:20px ;">￥： <input type="number"
                            style=" width: 200px; height: 25px; background-color: rgb(255, 255, 255);" v-model="price"
                            class="create-input" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="金额">

                        <!-- <el-input style="background-color: rgb(227, 227, 228);" v-model="price" type="number"
                            class="create-input" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入内容"></el-input> -->
                    </div>
                </div>

            </div>
        </div>

        <div class="main-bottom">
            <div class="main-bottom-top">
                <span>3. 确认商品类目</span>
                <span>请确认或修改商品类目</span>
            </div>
            <!-- <div class="main-bottom-center">
                <span><input type="search" placeholder="类目搜索" /></span>
                <button>
                    <img src="../../assets/Product_release_img/sousuo.png" alt="" />
                    <span>搜索</span>
                </button>
            </div> -->
            <div class="main-bottom-b">
                <div style="overflow: auto; margin-right: 50px; border: 1px solid rgba(30, 128, 255, 0.3);;">
                    <ul class="group-wrap">
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 1 }" id="1"
                                @click=" setLeiMu(1), changeStyle(1)">
                                <span>游戏话费</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 2 }" id="2"
                                @click="setLeiMu(2), changeStyle(2)">
                                <span>服装鞋包</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 3 }" id="3"
                                @click="setLeiMu(3), changeStyle(3)">
                                <span>手机数码</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 4 }" id="4"
                                @click="setLeiMu(4), changeStyle(4)">
                                <span>家用电器</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 5 }" id="5"
                                @click="setLeiMu(5), changeStyle(5)">
                                <span>美妆饰品</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 6 }" id="6"
                                @click="setLeiMu(6), changeStyle(6)">
                                <span>母婴用品</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 7 }" id="7"
                                @click="setLeiMu(7), changeStyle(7)">
                                <span>家居建材</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 8 }" id="8"
                                @click="setLeiMu(8), changeStyle(8)">
                                <span>百货食品</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 9 }" id="9"
                                @click="setLeiMu(9), changeStyle(9)">
                                <span>运动户外</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 10 }" id="10"
                                @click="setLeiMu(10), changeStyle(10)">
                                <span>文化玩乐</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 11 }" id="11"
                                @click="setLeiMu(11), changeStyle(14)">
                                <span>生活服务</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 12 }" id="12"
                                @click="setLeiMu(12), changeStyle(15)">
                                <span>其他商品</span>
                            </div>
                        </li>
                        <li class="group-item">
                            <div class="group-title" :class="{ changeStyle: changeS === 13 }" id="13"
                                @click="setLeiMu(13), changeStyle(13)">
                                <span>汽配摩托</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="font-size: 18px; margin-bottom: 10px;">商品介绍</div>
                    <textarea placeholder="请输入" maxlength="180" draggable="false"
                        style="width: 400px; font-size: 18px; background-color: rgb(255, 255, 255); resize:none; border-radius:5px 10px 10px 5px;"
                        v-model="shopIntroduce" name="beizhu" clos="60" rows="15"></textarea>
                    <span class="fontCount">{{ shopIntroduce.length }}/180</span>
                </div>
            </div>
        </div>
    </div>
    <div class="category-path">
        <div class="path-info-wrap">
            <div class="path-list">
                <span class="path-label">所选类目 :</span>
                <span id="leiMuZhi">{{ LeiMu }}</span>
                <span class="shop-name">商品名称 ：<input v-model="shopName" type="text"></span>
                <button id="leiMuTi" style="background-color:#abcdff; color: #000;" @click="submit">提交</button>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import { getpublishCommodity } from "@/api/shop/shop"
import { getUserData_a, login_a } from '@/api/UserApis';
import { uploads } from '@/api/ArticleApis'
import AppTopNav from '@/components/AppTopNav.vue';

export default {
    components: {
        AppTopNav
    },
    setup() {
        // 样式变换
        const changeS = ref(0)

        // 用户id
        const myUserId = ref(' ')
        // 商品名字
        const shopName = ref("")
        // 商品类目
        const LeiMu = ref("");
        // 商品介绍
        const shopIntroduce = ref("")
        // 图片数量
        let pictureShu = ref(6)
        // 商品价格
        const price = ref('')
        // 样式换
        const changeStyle = (a) => {
            changeS.value = a
        }
        //为商品分类LeiMu赋值
        const setLeiMu = (aa) => {
            let groupItem = document.getElementById(aa);
            let groupBottom = groupItem.firstChild;
            LeiMu.value = groupBottom.innerHTML
        };
        //  获取访问客户Id
        const getUser = async () => {
            const { data } = await getUserData_a();
            console.log('用户Id', data);
            myUserId.value = data.data.user_id
        }
        //    用户在前端页面中选择要上传的图片文件，通常使用<input type="file">元素来实现文件选择功能。用户可以通过点击该元素或拖拽文件到该元素上来选择文件。

        // 当用户选择文件后，浏览器会将选中的文件存储在一个FileList对象中。可以通过JavaScript代码来访问这个对象，获取用户选择的文件。

        // 在上传之前，可以对选中的文件进行一些验证和处理，例如检查文件类型、大小等。这可以通过JavaScript代码来实现。

        // 一旦验证和处理完成，可以使用FormData对象来创建一个表单数据对象，将选中的文件添加到该对象中。FormData对象可以通过append方法来添加文件。

        // 创建一个HTTP请求，通常使用XMLHttpRequest对象或现代的fetch API来发送请求。将FormData对象作为请求的数据体，并指定上传的URL地址。
        const uploadImg = reactive({
            uploadedImage: [],
            uploadedImageUrl: []
        })
        // 防止多次提交
        let j = -1
        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            console.log(event.target.files);
            pictureShu.value = pictureShu.value - 1;
            j++
            if (pictureShu.value === 0) {
                alert('图片已达上限')
                return
            }
            uploadImg.uploadedImage.push(file);
            uploadimg()
        }

        const uploadimg = () => {
            if (uploadImg.uploadedImage) {
                const formData = new FormData();
                // console.log('uploadImgL列表', uploadImg.uploadedImage);
                for (var i = j; i < uploadImg.uploadedImage.length; i++) {
                    console.log('uploadImg.uploadedImage[i]', uploadImg.uploadedImage[i]);
                    formData.append("images", uploadImg.uploadedImage[i]);
                }
                console.log('formData', formData);
                // formData.append('images', uploadImg.uploadedImage);

                // 假设有一个用于上传的 API
                // 在这里调用上传 API，将 `formData` 作为参数发送到服务器
                uploads(formData).then(res => {
                    console.log(res);
                    uploadImg.uploadedImageUrl.push(...res.data.data);
                    // console.log(uploadImg.uploadedImageUrl);
                }).catch(err => {
                    alert("图片格式错误,请使用jpg或png格式")
                    uploadImg.uploadedImage.pop()
                }
                )

            }
        };
        // 删除图片
        const handleDelete = (imageUrl) => {
            // 获取所点击的当前元素的第二个子元素
            console.log(imageUrl);
            // 从uploadImg.uploadedImageUrl 中删除当前元素
            uploadImg.uploadedImageUrl.splice(uploadImg.uploadedImageUrl.indexOf(imageUrl), 1);
            // 从uploadImg.uploadedImage 中删除当前元素
            uploadImg.uploadedImage.splice(uploadImg.uploadedImage.indexOf(imageUrl), 1);
            j--;
            pictureShu.value = pictureShu.value + 1;

        }
        // 提交数据
        const submit = async () => {
            let shopArry = []
            uploadImg.uploadedImageUrl.forEach(file => {
                shopArry.push(file)
            })
            console.log(shopArry);
            let shop_data = {
                "belong_user_id": myUserId.value,
                // "commodity_images": imgList.imageList[0].url,
                "commodity_images": shopArry,
                "name": shopName.value,
                "price": parseInt(price.value),
                "introduction": shopIntroduce.value,
                "classify": LeiMu.value
            }
            if (shop_data.belong_user_id === '' || shop_data.commodity_images.length === 0 || shop_data.name === '' || shop_data.price < 0 || shop_data.price === '' || shop_data.introduction === '' || shop_data.classify === '') {
                alert('信息不全')
                return
            } else {
                console.log('shop_data', shop_data);
                const res = await getpublishCommodity(shop_data)
                console.log('resss', res)
                if (res.data.message == 'success') {
                    uploadImg.uploadedImage = []
                    uploadImg.uploadedImageUrl = []
                    shopName.value = ''
                    price.value = ''
                    shopIntroduce.value = ''
                    LeiMu.value = ''
                    pictureShu.value = 6
                    alert('发布成功')
                    // location.reload();
                }
            }

        }

        onMounted(() => {
            getUser()
        });
        return {
            LeiMu, pictureShu, changeS,
            // fileInput, selectedImage,
            setLeiMu,
            price,
            submit,
            // imgList,
            // handleImg,
            // handleReshow,
            // handleAvatarSuccess,
            shopName,
            shopIntroduce,
            getUser,
            uploadimg,
            handleFileUpload,
            uploadImg,
            changeStyle, handleDelete

        };
    },
};
</script>
<style lang="scss">
// body {
//     background: rgb(255, 255, 255);
// }

::-webkit-scrollbar {
    width: 10px;
    /*对垂直流动条有效*/
    height: 10px;
    /*对水平流动条有效*/
    background-color: rgba(75, 73, 73, 0.6);
}

::-webkit-scrollbar-track {
    background-color: rgb(255, 255, 255);

}


::-webkit-scrollbar-thumb {

    background-color: rgb(175, 172, 172);

}

.main2 {
    margin: 0 auto;
    width: 100%;
    // height: 270px;
    // padding: 24px;
    color: #000000be;
    // background: #292929c7;
    // background: url(https://media2.giphy.com/media/3ohzAN9PzGgxpQaiM8/giphy.gif?cid=ecf05e47k751f35tl0i04ur6wjqbvv3pvrzec5psxq34vv8j&ep=v1_gifs_search&rid=giphy.gif&ct=g);
    // background-size: cover;
    // background-position: center;
    // background-repeat: no-repeat;

    .main-top {
        width: 912px;
        background: #ffffff;
        padding: 20px;
        border-radius: 30px;
        margin: 0 auto;
        opacity: .9;
    }

    .main-bottom {
        width: 912px;
        background: #ffffff;
        padding: 20px;
        margin: 20px auto;
        border-radius: 30px;
        margin-bottom: 60px;
        opacity: .9;

    }
}

//上半部分格式

.main-top .main-top-top {
    overflow: hidden;

}

.main-top .main-top-top {
    >span:nth-child(1) {
        color: #000000;
        margin-right: 6px;
        text-align: left;
        font-weight: 500;
        font-size: 18px;

        ::before {
            content: "*";
            color: #000000;
        }

    }

    >span:nth-child(2) {
        font-size: 12px;
        color: #000000;
        overflow: hidden;
        clear: both;
        line-height: 20px;
    }
}

.main-top .main-top-top .sell-img {
    margin: 20px 0 70px 0;

    display: flex;

    >div {
        // width: 100px;
        // height: 100px;
        margin-right: 20px;
    }



}

//下半部分
.main-bottom-top {
    width: 100%;

    >span:nth-child(1) {
        color: #000000;
        margin-right: 6px;
        text-align: left;
        font-weight: 500;
        font-size: 18px;

        ::before {
            content: "*";
            color: #000000;
        }
    }

    >span:nth-child(2) {
        font-size: 12px;
        color: #000000;
        overflow: hidden;
        clear: both;
        line-height: 20px;
    }
}

.main-bottom-center {
    margin-top: 10px;

    span>input {
        width: 200px;
        height: 34px;
        padding: 0 9px;
        font-size: 12px;
        border-radius: 12px 0 0 12px;
        outline: none;
        vertical-align: middle;
        background-color: transparent;
        color: #000000;
        border: 1px solid rgba(30, 128, 255, 0.3);
    }

    >button {
        border-style: solid;
        background: #ffffff;
        border-color: transparent;
        padding: 0 12px;
        height: 36px;
        font-size: 12px;
        // border-width: 1px;
        margin: 0;
        vertical-align: top;
        border-radius: 0 12px 12px 0;
        color: #000000;

        >img {
            width: 15px;
            height: 15px;
            vertical-align: -3px;
            color: #000000;
        }
    }
}

// 最下面
.category-path {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 66px;
    line-height: 66px;
    border-top: 0;
    background-color: #ffffff;
    box-shadow: 0 -1px 3px 0 rgba(30, 128, 255, 0.3);

    .path-info-wrap {
        width: 950px;
        margin: 0 auto;
    }
}

// 图片上传

.sub_img {
    width: 120px;
    height: 120px;
    margin: 10px;
    border: 2px solid;
}

#shop-price {
    margin: 10px 0;
    width: 200px;
    height: 30px;
    border: 0;
    border-bottom: 2px dashed rgba(30, 128, 255, 0.3);

}

.image-upload {
    // position: relative;
    display: flex;
    justify-content: flex-start;

    .image-upload-left {
        >div {
            position: relative;

            >span {

                width: 120px;
                height: 120px;
                background: rgba(255, 255, 255, 0.623);
                position: absolute;
                top: 10px;
                left: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                display: none;

                >img {
                    width: 50px;
                    height: 50px;
                }
            }
        }

        >div:hover {
            >span {
                display: flex;
            }
        }

    }

    .upload-input {
        position: relative;
        width: 120px;
        height: 120px;
        border: 2px dashed rgba(30, 128, 255, 0.3);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 11px;
        background: url(../../assets/resume/icon_30brnocwcck/jiahao.png) no-repeat center center;

        input[type="file"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }

    img {
        width: 120px;
        height: 120px;
        margin: 10px;
        // border: 2px solid;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(30, 128, 255, 0.3);
    }
}


// 商品分类
.main-bottom-b {
    display: flex;

    >div {
        width: 45%;
        height: 450px;
    }


}

.changeStyle {
    color: #1171ee;
}

.group-item {
    // border-bottom: 1px dashed #ccc;
    padding: 4px 0;
    font-size: 20px;

    >.group-item-bottom {
        display: none;
    }

    >.group-title {
        // color: #999;
        line-height: 36px;
        padding: 0 4px;
        cursor: pointer;
    }

}

.group-item:hover .group-title {
    background: #abcdff;
}

.group-title {
    display: flex;
    justify-content: space-between;

    .icon-wrap {
        width: 60px;
        height: 35px;
        border: 0;
        background-color: #ffffff;
        font-size: 18px;
        border-radius: 12px;
        color: #000000;
    }
}

.fontCount {
    position: relative;
    color: #000;
    bottom: 30px;
    right: -180px;
}

// 所选类目
.path-list {
    color: #000000;

    .path-label {
        width: 100px;
        font-size: 25px;
    }

    #leiMuZhi {
        display: inline-block;
        width: 200px;
        height: 34px;
        padding: 0 9px;
        outline: none;
        vertical-align: middle;
        background-color: transparent;
        color: #000000;
        border: 0;
        border-bottom: 1px dotted;
        margin-bottom: 12px;
        font-size: 25px;
        line-height: 34px;
        margin-right: 53px;
        margin-left: 12px;
    }

    .shop-name {
        font-size: 25px;
        margin-right: 25px;

        input {
            color: #000000;
            border: 0;
            border-bottom: 1px dotted;
            // margin-bottom: 5px;
            font-size: 25px;
            line-height: 34px;
            outline: none;
            vertical-align: middle;
            cursor: pointer;
            background: rgb(255, 255, 255);
            margin-right: 10px;
            margin-bottom: 7px;
        }
    }

    button {
        width: 60px;
        height: 37px;
        background-color: #1171ee;
        color: #000000;
        border: 0;
        margin-left: 5px;
        margin-bottom: 5px;
    }
}

.create-input {
    border: 0px;
    border-bottom: 1px solid #000000;
}
</style>