import request from "@/request";

// 获取用户点赞收藏列表
export function getLoveList(params) {
    return request({
        method: 'get',
        url: '/message/followmessagelist',
        params:{params}
    })
}
