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
                        <div class="container">
                            <div class="form">
                                <h2>找回密码</h2>
                                <form>
                                    <div class="inputBox">
                                        <input v-model="form.phone" placeholder="电话号吗">
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
                                        <el-tooltip class="box-item" effect="light" content="密码为8~16位" placement="bottom">
                                            <input v-model="form.new_password" placeholder="密码">
                                        </el-tooltip>
                                    </div>
                                    <div class="inputBox">
                                        <input v-model="form.new_sure_password" placeholder="确认密码">
                                    </div>
                                    <div class="inputBox inpt_but">
                                        <input class="but" type="button" value="返回登录" @click="tologin">
                                        <input class="but" type="button" value="确认修改" @click="confirm(form)">
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

<script setup>
import { ex, subCode_a, lostPwd_a,pwdsubCode_a } from '@/api/UserApis';
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

// 引入userSoure
import userStore from '@/store/user/user.js'
let userstore = userStore()


const router = useRouter()


let form = reactive({
    phone: '',
    new_password: '',
    new_sure_password: '',
    code: ''
})

// 表单验证
const checkForm = (form) => {
    let thisphone = form.phone
    let thispassword = form.new_password
    let thiscode = form.code
    let thispassword2 = form.new_sure_password
    let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;

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

        if (thispassword == '') {
            alert('请输入密码')
            return false;
        }

        if (thispassword.length < 8 || thispassword.length > 16) {
            // 重置密码
            form.new_password = ''

            alert('密码长度在8-16位字符之间')
            return false;
        }


        if (thispassword2 == '') {
            alert('请输入确认密码')
            return false;
        }
        console.log(thispassword);
        console.log(thispassword2);
        if (thispassword2 != thispassword) {

            alert('请保证俩次密码相同')
            return false;
        }

        return true;
    
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
let codeTime = ref(10)
let senCodeDisavled = ref(false)
// 验证码倒计时
const codeDown = () => {
    senCodeDisavled.value = true
    const interval = window.setInterval(function () {
        if ((codeTime.value--) <= 0) {
            codeTime.value = 10
            senCodeDisavled.value = false
            window.clearInterval(interval)
        }
        localStorage.setItem('codeTime', codeTime.value)
    }, 1000)
}
// 发送验证码
const subCode = (form) => {
    if (checkCode(form)) {
        pwdsubCode_a(form.phone).then(res => {
            ElMessage({
                message: res.data.message,
                type: 'success',
            })
        })
        codeDown()
    }
    console.log(form.code);
}

// 修改密码操作
const confirm = (form) => {
    if (checkForm(form)) {
        lostPwd_a(form).then(res => {
            if(res.data.message == '用户修改密码成功'){
                ElMessage({
                        message: '修改成功！',
                        type: 'success',
                    })
                    router.push('/login')
            }
        })
    }
}

// 前往登录页面
const tologin = () => {
    router.push('/login')
}

onMounted(() => {
    // 刷新后验证码倒计时不重置
    let codeTime_old = localStorage.getItem('codeTime')
    if (codeTime_old < 10 && codeTime_old > 0) {
        codeTime.value = codeTime_old
        codeDown()
    }

})

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

    background: linear-gradient(to bottom, #f1f4f9, #dff1ff);

}

.section .color {

    position: absolute;

    filter: blur(150px);

}

.section .color:nth-child(1) {

    top: -350px;

    width: 600px;

    height: 600px;

    background: #ff359b;

}

.section .color:nth-child(2) {

    bottom: -150px;

    left: 100px;

    width: 500px;

    height: 500px;

    background: #fffd87;

}

.section .color:nth-child(3) {

    bottom: 50px;

    right: 100px;

    width: 500px;

    height: 500px;

    background: #00d2ff;

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
    right: 40px;
    font-size: 15px;
}

.code_f {
    background: none;
    border: none;
}

.code_t {
    color: #2e77e5;
    background: none;
    border: none;
}
</style>