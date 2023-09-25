// 项目中我们大多数时候都会把对应的接口请求封装成api来调用
import request from '../request.js';
// 测试接口
export function ex() {
    // console.log('haha',params);
    return request({
        method: 'get',
        url: '/user/userinfo',
    });
}

// 发送验证码接口
export function subCode_a(params) {
    console.log(params);
    return request({
        method: 'get',
        url: `/user/code?phone=${params}`,
    });
}

// 修改密码发送验证码接口
export function pwdsubCode_a(params) {
    return request({
        method: 'get',
        url: `/user/seekcode?phone=${params}`,
    });
}

// 注册接口
export function register_a(data) {
    // console.log('data',data);
    return request({
        method: 'post',
        url: '/user/signup',
        data,
    });
}

// 登录接口
export function login_a(data) {
    return request({
        method: 'post',
        url: '/user/signin',
        data,
    });
}

// 获取用户信息
export function getUserData_a() {
    return request({
        method: 'get',
        url: '/user/userinfo',
    });
}

// 忘记密码
export function lostPwd_a(data) {
    return request({
        method: 'put',
        url: '/user/seekpsw',
        data
    });
}

//用户关注
export function getFollow(data) {
    return request({
        method: 'post',
        url: '/user/follow',
        data,
    });
}
//用户取消关注
export function cancelFollow(data) {
    return request({
        method: 'post',
        url: '/user/cancelfollow',
        data,
    });
}

// ex
export function ex3() {
    return request({
        method: 'get',
        url: '/user/followmessagereceive',
    });
}