import {getUserData_a} from '@/api/UserApis.js'
export default async function(){
    // 判断用户是否登录
     let res = await getUserData_a()
     console.log('res',res.data.message);

     if (res.data.message === '用户信息返回成功') {
        return true;
     }else{
        return false;
     }
}