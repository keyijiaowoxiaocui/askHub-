/*
李阳用来测试的文件
*/

// 引入 axios
import axios from 'axios';

// import { getToken } from './utils/setToken.js';
import { getToken } from '@/utils/setToken';
import { Message } from 'element-plus';
// 封装 baseURL
const request = axios.create({
    baseURL: "http://152.136.61.154:8888/api/v1",
    timeout: 5000, //请求的超时毫秒数
    contentType: "application/json",
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
        // 在请求之前做些什么(获取并设置token)
        // console.log('请求');
        // 对双token的操作
        // config.headers['token'] = getToken('token')
        // console.log(config);


        return config;
    }),
    (error) => {
        return Promise.reject(error);
    };

// 添加响应拦截器
request.interceptors.response.use((response) => {
        // 对响应数据做些什么
        // console.log('响应');
        return response;
    }),
    (error) => {
        return Promise.reject(error);
    };

// 向外暴露 request
export default request; 