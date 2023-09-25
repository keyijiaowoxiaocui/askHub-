<template>
    <!-- <AppTopNav /> -->
    <div class="edit">
        <!-- <div> -->
        <div class="edit-item">
            <span class="label">修改头像</span>
            <div>
                <div class="up_img">
                    <input id="file" class="img_input" type="file" @change="handleFileUpload" accept="image/*">
                </div>
                <div>
                    <img v-if="uploadImg.uploadedImageUrl" :src="uploadImg.uploadedImageUrl" alt="Uploaded Image"
                        class="sub_img">
                </div>
            </div>
        </div>
        <div class="edit-item">
            <span class="label">修改名称</span>
            <div>
                <el-input v-model="userInfo.nick_name" type="textarea" class="create-input" placeholder="请输入内容"></el-input>

            </div>
        </div>
        <div class="edit-item">
            <span class="label">性别</span>
            <div>
                <!-- <el-input v-model="userInfo.gender" type="textarea" class="create-input" placeholder="请输入内容"></el-input> -->
                <el-radio label="男" style="color: #000000;" v-model="userInfo.gender">男</el-radio>
                <el-radio label="女" style="color: #000000;" v-model="userInfo.gender">女</el-radio>
            </div>
        </div>
        <div class="edit-item">
            <span class="label">年龄</span>
            <div>
                <!-- 只能输入数字 -->
                <el-input v-model.trim.number="userInfo.age" type="number" class="create-input"
                    oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div class="edit-item">
            <span class="label">个人简介</span>
            <div style="text-align: center;">
                <el-input v-model="userInfo.profile" style="" maxlength="100" clos="2" rows="5" type="textarea"
                    class="create-input" placeholder="请输入内容"></el-input>
                <span class="fontCount">{{ userInfo.profile.length ? userInfo.profile.length : 0 }}/100</span>

            </div>
        </div>
        <!-- </div> -->
        <div>
            <el-button class="send" type="primary" color="#abcdff" size="medium" @click="updateuserinfo">提交</el-button>
            <el-button class="send" type="primary" color="#abcdff" size="medium" @click="cancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import { upload } from '@/api/ArticleApis'
import { getUserData_a } from '@/api/UserApis';
import { setupdateuserinfo } from '@/api/my-api'
import { useRouter } from 'vue-router';
import AppTopNav from '@/components/AppTopNav.vue';
import userInfoStore from "@/store/user/user.js";


export default {
    components: {
        AppTopNav
    },
    setup() {
        let userStore = userInfoStore();

        const userInfo = reactive({
            "user_id": "",
            "nick_name": "",
            "age": 0,
            "gender": "",
            "avatar_path": "",
            "profile": ""
        })
        const router = useRouter();
        const uploadImg = reactive({
            uploadedImage: '',
            uploadedImageUrl: ''
        })
        // 图片上传
        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            uploadImg.uploadedImage = file;
            uploadimg()
        };

        const uploadimg = () => {
            if (uploadImg.uploadedImage) {
                const formData = new FormData();
                formData.append('image', uploadImg.uploadedImage);

                // 假设有一个用于上传的 API
                // 在这里调用上传 API，将 `formData` 作为参数发送到服务器
                upload(formData).then(res => {
                    console.log(res);
                    uploadImg.uploadedImageUrl = res.data.data;
                    userInfo.avatar_path = uploadImg.uploadedImageUrl
                    // console.log(uploadImg.uploadedImageUrl);
                })

                // // 上传成功后，获取服务器返回的图片URL
                // const uploadedImageUrl = 'https://example.com/uploads/image.jpg';
                // uploadImg.uploadedImageUrl = uploadedImageUrl;
            }
        };
        // 获取用户id
        const getUser = async () => {
            const { data } = await getUserData_a();
            console.log('用户Id', data);
            userInfo.user_id = data.data.user_id,
                userInfo.nick_name = data.data.nick_name,
                userInfo.age = data.data.age,
                userInfo.gender = data.data.gender,
                uploadImg.uploadedImageUrl = data.data.avatar_path
            userInfo.profile = data.data.profile
        }
        // 编辑资料接口
        const updateuserinfo = async () => {
            const aa = {
                "user_id": userInfo.user_id,
                "nick_name": userInfo.nick_name,
                "age": userInfo.age,
                "gender": userInfo.gender,
                "avatar_path": userInfo.avatar_path,
                "profile": userInfo.profile,
            }
            console.log(aa);
            // 判断aa所有属性是否为空
            if (aa.nick_name == '' || aa.age == '' || aa.gender == '' || aa.avatar_path
                == '' || aa.profile == '') {
                alert('请将信息填写完整')
                return
            } else {
                const res = await setupdateuserinfo(aa);
                console.log('编辑资料请求返回', res);
                if (res.data.message == "用户更新信息成功") {
                    alert('修改成功')
                    // router.push('/my')
                    location.reload();

                }
            }

        }

        // 取消
        const cancel = () => {
            let edit = document.getElementById("edit-module");
            // console.log(edit);
            edit.style.display = "none";
        }

        onMounted(() => {
            getUser()
        });
        return {
            userInfo, router,
            uploadimg, uploadImg, handleFileUpload, getUser, updateuserinfo, cancel
        }

    }
}
</script>
<style lang="scss">
.edit {
    background-color: rgba(255, 255, 255, 0.795);
    padding: 10px 0 20px 20px;
    margin: 0px auto;
    margin-top: 100px;
    width: 800px;
    height: 410px;
    color: #000000;
    border-radius: 8px;
    overflow: auto;
    // text-align: center;

    // display: flex;
    // 水平居中可换行   
    // flex-wrap: wrap;
    // justify-content: center;
    // >div {
    //     width: 400px;
    //     margin: 0 auto;
    // }

    .edit-item {
        display: flex;
        margin-bottom: 20px;

        .label {
            width: 58px;
            margin-right: 30px
        }

        .fontCount {
            position: relative;
            color: #000;
            bottom: 30px;
            // right: -100px;
        }
    }

    border: 1px solid;
    // border-image: linear-gradient(45deg, rgb(229, 219, 157), rgb(243, 153, 201)) 1;
    // clip-path: inset(0px round 10px);
    // animation: huerotate 6s infinite linear;
    // /*
    //     hue-rotate() (en-US) 函数在输入图像上应用色相旋转。
    //         angle 一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。
    //         若值未设置值，默认为 0deg。该值虽然没有最大值，超过 360deg 的值相当于又绕一圈。

    //     svg 元素 失效！！
    //     */
    // filter: hue-rotate(360deg);
}

// @keyframes huerotate {
//     0% {
//         filter: hue-rotate(0deg);
//     }

//     100% {
//         filter: hue-rorate(360deg);
//     }

// }

.avatar-uploader .el-upload {
    border: 1px dashed rgba(30, 128, 255, 0.3);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: #000000;

}

.avatar-uploader .el-upload:hover {
    border-color: rgba(30, 128, 255, 0.3);

}

.avatar-uploader-icon {
    // color: #8c939d;
    width: 178px;
    line-height: 178px;
    text-align: center;
    color: #000000;

}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
    color: #000000;

}

.sub_img {
    width: 100px;
    height: 100px;
    color: #000000;

}

.create-input .el-input__inner {
    color: #000 !important;
}

.el-button {
    border: 1px solid rgba(30, 128, 255, 0.3);
    background: #ffffff;
}

.el-button:hover {
    border: 1px solid rgba(30, 128, 255, 0.3);
    background: #abcdff !important;
    color: #1171ee;
}
</style>
