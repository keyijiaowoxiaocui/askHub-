// 引入 axios
import axios from 'axios'
import router from './router'
import { setToken, getToken, removeToken } from './utils/setToken.js'

// 封装 baseURL
const request = axios.create({
    baseURL: 'http://1291322316ls.e2.luyouxia.net:25188/api/v1',
    // baseURL: 'http://152.136.61.154:8888/api/v1',
    // baseURL: 'https://www.askhub.top/api/v1',
    timeout: 40000, //请求的超时毫秒数
    contentType: 'application/json',
})

let refreshToken = getToken('refreshToken') || ''
let isrefreshToken = false
if (!getToken('refreshToken')) {
    isrefreshToken = false
    if (!getToken('refreshToken')) {
        isrefreshToken = true
    }
}

// 添加请求拦截器
request.interceptors.request.use((config) => {
        // console.log('isrefreshToken',isrefreshToken);
        // 在请求之前做些什么(获取并设置token)
        // console.log('请求');
        // 对双token的操作
        // console.log('isrefreshToken', isrefreshToken);
        // console.log('isrefreshToken', isrefreshToken);

        let token = getToken('accessToken')
            // 如果有token
        if (token) {
            // 并且token没过期
            if (!isrefreshToken) {
                config.headers['x-token'] = getToken('accessToken') || ''
            }
        }

        // 如果有refreshToken
        if (refreshToken) {
            // 且需要刷新token
            if (isrefreshToken) {
                config.headers['x-token'] = getToken('refreshToken')
            }
        }
        return config
    }),
    (error) => {
        return Promise.reject('hhhhhh')
    }

// 添加响应拦截器
request.interceptors.response.use((response) => {
        // 对响应数据做些什么
        console.log('响应状态码', response.data.code)
            // console.log('isrefreshToken', isrefreshToken);

        let code = response.data.code

        // 还没有设置refreshToken请求头，需要设置一下再次发送请求
        if (!refreshToken && getToken('refreshToken') != null) {
            refreshToken = getToken('refreshToken')
            return request(response.config)
        }

        if (code == 401) {
            //accessToken过期了，需要带着refreshToken，去换取新的token
            refreshToken = getToken('refreshToken')
            isrefreshToken = true
                // 相当于重新走一遍刚刚的请求
            return request(response.config)
        }

        if (code == 1024) {
            setToken('accessToken', response.data.data)
            isrefreshToken = false
            return request(response.config)
        } else if (code == 1023) {
            // 将本地token删除
            removeToken('refreshToken')
            removeToken('accessToken')
                // 跳转到登录页面，重新登录
            router.push('/login')
                //返回信息，让用户重新登录
            isrefreshToken = true
            alert('登录已超期,请重新登录')
        }

        return response
    }),
    (error) => {
        return Promise.reject(error)
    }

// 向外暴露 request
export default request