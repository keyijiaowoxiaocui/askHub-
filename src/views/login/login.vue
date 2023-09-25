<template>
    <div>
        <div class="body">
            <div class="section">
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
                <div class="box">
                    <div class="square" style="--i:0;"></div>
                    <div class="square" style="--i:1;"></div>
                    <div class="square" style="--i:2;"></div>
                    <div class="square" style="--i:3;"></div>
                    <div class="square" style="--i:4;"></div>
                    <transition mode="out-in">
                        <div class="container" v-if="islogin">
                            <div class="form">
                                <h2>登录</h2>
                                <form>
                                    <div class="inputBox">
                                        <input v-model="form.phone" placeholder="电话号码">
                                    </div>
                                    <div class="inputBox">
                                        <input type="password" v-model="form.password" placeholder="密码">
                                    </div>
                                    <div class="inputBox inpt_but">
                                        <input class="but" type="button" value="登 录" @click="subList(form)">
                                        <input class="but" type="button" value="注 册" @click="toRegister">
                                    </div>
                                    <router-link to="/lostPwd">
                                        <p class="forget">忘记密码 ?<a href="#">点击这里</a></p>
                                    </router-link>
                                </form>
                            </div>
                        </div>
                        <div class="container" v-else>
                            <div class="form">
                                <h2>注册</h2>
                                <form>
                                    <div class="inputBox">
                                        <input v-model="form.phone" placeholder="电话号码">
                                    </div>
                                    <div class="inputBox">
                                        <input v-model="form.code" placeholder="短信验证码">
                                        <button v-if="!senCodeDisavled"
                                            :class="form.phone == '' ? 'code_f subCode' : 'code_t subCode'"
                                            :disabled="form.phone == '' ? true : false"
                                            @click="subCode(form)">发送验证码</button>
                                        <button v-if="senCodeDisavled" class="code_f subCode" disabled="true">{{
                                            codeTime + '秒后再次获取' }}</button>
                                    </div>
                                    <div class="inputBox">
                                        <input v-model="form.nick_name" placeholder="昵称">
                                    </div>
                                    <div class="inputBox">
                                        <el-tooltip class="box-item" effect="light" content="密码为8~16位" placement="bottom">
                                            <input v-model="form.password" placeholder="密码">
                                        </el-tooltip>
                                    </div>
                                    <div class="inputBox inpt_but">
                                        <input class="but" type="button" value="返回登录" @click="tologin">
                                        <input class="but" type="button" value="立即注册" @click="subRegister(form)">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </transition>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ex, subCode_a, register_a, login_a, getUserData_a, ex3 } from '@/api/UserApis';
import { setToken } from "@/utils/setToken.js";
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

// 引入userSoure
import userStore from '@/store/user/user.js'
export default {
    name: '',
    userId: "",

    setup() {
        let userstore = userStore()
        const router = useRouter()

        //登录的一系列 
        let form = reactive({
            nick_name: '',
            phone: '',
            password: '',
            code: ''
        })
        let islogin = ref(true)
        // 表单验证
        const checkForm = (form) => {
            console.log('123', form);
            let thisphone = form.phone
            let thispassword = form.password
            let thiscode = form.code
            let thisusername = form.nick_name
            let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;

            if (islogin.value) {
                if (thisphone == '') {
                    alert('请输入手机号')
                    return false;
                }

                if (!phoneReg.test(thisphone)) {

                    // 重置手机号
                    form.phone = ''

                    alert('请输入正确的手机号')
                    return false;
                }

                if (thispassword == '') {
                    alert('请输入密码')
                    return false;
                }

                if (thispassword.length < 8 || thispassword.length > 16) {
                    // 重置密码
                    form.password = ''

                    alert('密码长度在8-16位字符之间')
                    return false;
                }

                return true;
            } else {
                if (thisphone == '') {
                    alert('请输入手机号')
                    return false;
                }

                if (!phoneReg.test(thisphone)) {

                    // 重置手机号
                    form.phone = ''

                    alert('请输入正确的手机号')
                    return false;
                }

                if (thiscode == '') {
                    alert('请输入验证码')
                    return false;
                }

                if (thisusername == '') {
                    alert('请输入昵称')
                    return false;
                }

                if (thispassword == '') {
                    alert('请输入密码')
                    return false;
                }

                if (thispassword.length < 8 || thispassword.length > 16) {

                    // 重置密码
                    form.password = ''

                    alert('密码长度在8-16位字符之间')
                    return false;
                }

                return true;
            }
        }

        //进行登录操作 
        const subList = (form) => {
            if (checkForm(form)) {
                login_a(form).then(
                    res => {
                        if (res.data.code === 1025) {
                            ElMessage({
                                message: '密码错误',
                                type: 'error',
                            })
                            return;
                        }
                        if (res.data.code === 1026) {
                            ElMessage({
                                message: '手机号错误',
                                type: 'error',
                            })
                            return;
                        }

                        setToken("accessToken", res.data.data.access_token)
                        setToken("refreshToken", res.data.data.refresh_token)
                        ElMessage({
                            message: '登录成功！',
                            type: 'success',
                        })

                        // ex3().then(res => {
                        //     console.log('!!!!',res);
                        // })

                        userstore.getUserData();
                        router.push('/')
                    }, (err) => {
                        console.log(err);
                    })
            }
        }

        // 验证码表单验证
        const checkCode = (form) => {
            let thisphone = form.phone
            let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (thisphone == '') {
                alert('请输入手机号')
                return false;
            } else {
                if (!phoneReg.test(thisphone)) {
                    alert('请输入正确的手机号')
                    return false;
                }
            }
            return true;
        }
        // 注册倒计时
        let codeTime = ref(60)
        let senCodeDisavled = ref(false)
        // 验证码倒计时
        const codeDown = () => {
            senCodeDisavled.value = true
            const interval = window.setInterval(function () {
                if ((codeTime.value--) <= 0) {
                    codeTime.value = 60
                    senCodeDisavled.value = false
                    window.clearInterval(interval)
                }
                localStorage.setItem('codeTime', codeTime.value)
            }, 1000)
        }
        // 发送验证码
        const subCode = (form) => {
            if (checkCode(form)) {
                subCode_a(form.phone).then(res => {
                    ElMessage({
                        message: res.data.message,
                        type: 'success',
                    })
                })
                codeDown()
            }
            console.log(form.code);
        }

        // 注册操作
        const subRegister = (form) => {
            if (checkForm(form)) {
                register_a(form).then(res => {
                    ElMessage({
                        message: res.data.message,
                        type: 'success',
                    })
                })
                islogin.value = !islogin.value
                console.log('注册成功');
            }
        }


        // 前往注册页面
        const toRegister = () => {
            console.log(islogin);
            islogin.value = !islogin.value
            form.phone = ''
            form.password = ''
            form.code = ''
            form.nick_name = ''
            // localStorage.setItem('islogin',islogin.value)
        }

        // 前往登录页面
        const tologin = () => {
            form.phone = ''
            form.password = ''
            form.code = ''
            form.nick_name = ''

            islogin.value = !islogin.value
        }


        onMounted(() => {
            // 刷新后验证码倒计时不重置
            let codeTime_old = localStorage.getItem('codeTime')
            if (codeTime_old < 60 && codeTime_old > 0) {
                codeTime.value = codeTime_old
                codeDown()
            }
            // console.log(123);
            // console.log(form.phone);
            // console.log(islogin.value);
            // islogin.value = localStorage.getItem('islogin')
        })

        return {
            form,
            codeTime,
            senCodeDisavled,
            islogin,

            subList,
            subCode,
            subRegister,
            toRegister,
            tologin,
        }
    },
}

</script>

<style lang="scss" scoped>
// 注册登录切换动画


* {

    margin: 0;

    padding: 0;

    box-sizing: border-box;

    font-family: 'Poppins', sans-serif;

}

.body {

    overflow: hidden;


}

.section {

    display: flex;

    justify-content: center;

    align-items: center;

    min-height: 100vh;

    background-image: url(https://askhub-v1-1317893442.cos.ap-beijing.myqcloud.com/askhub/14252328215384064.jpg);

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

}

.section .color {

    position: absolute;

    filter: blur(150px);

}

.section .color:nth-child(1) {

    top: -350px;

    width: 900px;

    height: 1000px;

    // background: #0e176b7e;

}

.section .color:nth-child(2) {

    bottom: 0;

    left: 100px;

    width: 500px;

    height: 500px;

    // background: #2c146e;

}

.section .color:nth-child(3) {

    bottom: 50px;

    right: 100px;

    width: 900px;

    height: 500px;

    // background: #2a2086;

}

.box {
    position: relative;
    min-width: 400px;
    min-height: 520px;
}

.box .square {

    position: absolute;

    backdrop-filter: blur(5px);

    box-shadow: 0 25px 45px rgb(0, 0, 0, 0.1);

    border: 1px solid rgb(255, 255, 255, 0.5);

    border-right: 1px solid rgb(255, 255, 255, 0.2);

    border-bottom: 1px solid rgb(255, 255, 255, 0.2);

    background: rgb(255, 255, 255, 0.1);

    border-radius: 10px;

    animation: animate 10s linear infinite;

    animation-delay: calc(-1s*var(--i));

}

/* 动画 */

@keyframes animate {

    0%,
    100% {

        transform: translateY(-40px);

    }

    50% {

        transform: translate(40px);

    }

}

.box .square:nth-child(1) {

    top: -50px;

    right: -60px;

    width: 100px;

    height: 100px;

}

.box .square:nth-child(2) {

    top: 150px;

    left: -100px;

    width: 120px;

    height: 120px;

    z-index: 2;

}

.box .square:nth-child(3) {

    bottom: 50px;

    right: -60px;

    width: 80px;

    height: 80px;

    z-index: 2;

}

.box .square:nth-child(4) {

    bottom: -80px;

    left: 100px;

    width: 50px;

    height: 50px;

}

.box .square:nth-child(5) {

    top: -40px;

    left: 140px;

    width: 60px;

    height: 60px;

}

.container {

    position: relative;

    width: 400px;

    min-height: 400px;


    display: flex;

    justify-content: center;

    align-items: center;

    background: rgb(255, 255, 255, 0.1);

    border-radius: 10px;

    backdrop-filter: blur(5px);

    box-shadow: 0 25px 45px rgb(0, 0, 0, 0.1);

    border: 1px solid rgb(255, 255, 255, 0.5);

    border-right: 1px solid rgb(255, 255, 255, 0.2);

    border-bottom: 1px solid rgb(255, 255, 255, 0.2);

    transition: all 1s;

    opacity: 1;

}

.form {

    position: relative;

    height: 100%;

    width: 100%;

    padding: 40px;

}

.form h2 {

    position: relative;

    color: #fff;

    font-size: 24px;

    font-weight: 600;

    letter-spacing: 1px;

    margin-bottom: 40px;

}

// .form h2::before {

//     content: '';

//     position: absolute;

//     left: 0;

//     bottom: -10px;

//     width: 80px;

//     height: 4px;

//     background: #fff;

// }

.form .inputBox {

    width: 100%;

    margin-top: 20px;

}

.form .inputBox input {

    width: 100%;

    background: rgb(255, 255, 255, 0.2);

    border: none;

    outline: none;

    padding: 10px 20px;

    border-radius: 35px;

    border: 1px solid rgb(255, 255, 255, 0.5);

    border-right: 1px solid rgb(255, 255, 255, 0.2);

    border-bottom: 1px solid rgb(255, 255, 255, 0.2);

    font-size: 16px;

    letter-spacing: 1px;

    color: #fff;

    box-shadow: 0 5px 15px rgb(0, 0, 0, 0.05);

}

.form .inputBox input::placeholder {

    color: #fff;

}

.form .inputBox input[type="button"] {

    background: #fff;

    color: #666;

    max-width: 100px;

    cursor: pointer;

    margin-bottom: 20px;

    font-weight: 600;

}

.forget {

    margin-top: 5px;

    color: #fff;

}

.forget a {

    color: #fff;

    font-weight: 600;

}

.inpt_but {
    text-align: center;
}

.inpt_but .but {
    max-width: 120px !important;
}

.inpt_but .but:nth-child(1) {
    margin-right: 5px;

}

.inpt_but .but:nth-child(2) {
    margin-left: 5px;
}

.v-enter-from {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s;
}

v-enter-to,
v-leave-from {
    opacity: 1;
}

.v-leave-to {
    opacity: 0;
}

// 发送验证码按钮


.subCode {
    position: absolute;
    height: 34px;
    width: 110px;
    top: 178px;
    right: 45px;
    font-size: 15px;
}

.code_f {
    background: none;
    border: none;
}

.code_t {
    color: #2abd72;
    background: none;
    border: none;
}
</style>