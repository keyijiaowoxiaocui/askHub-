import request from "../request.js";


// 获取某人所有文章列表
export function getAllArticleByUserId(userId) {
    console.log('所有', userId);
    return request({
        method: 'get',
        url: `/article/getAllArticleByUserId?userId=${userId}`,

    })
}

// 获取某人所有商品列表
export function getAllCommodityByBelongUserId(data) {
    console.log('个人商品列表', data);
    return request({
        method: 'get',
        url: '/commodity/getAllCommodityByBelongUserId',
        params: data
    })
}

// 获取某人所有收藏商品列表
export function getCollectCommodityByBelong(data) {
    console.log('个人收藏商品列表', data);
    return request({
        method: 'get',
        url: '/commodity/getAllCommodityByCollector',
        params: data
    })
}

// 获取某人所有公开文章列表
export function getPublicArticleByUserId(userId) {
    console.log('公开文章', userId);
    return request({
        method: 'get',
        url: `/article/getPublicArticleByUserId?userId=${userId}`,
    })
}

// 获取某人所有收藏文章列表
export function getArticleCollect(userId) {
    console.log('公开文章', userId);
    return request({
        method: 'get',
        url: `/article/getCollectArticle?userId=${userId}`,
    })
}
// 返回用户信息
export function getUserInfo(token) {
    console.log('用户信息', token);
    return request({
        method: 'get',
        url: `/user/userInfo?token=${token}`,
    })
}
// 返回其他用户信息
export function getOtherInfo(id) {
    console.log('其他用户信息', id);
    return request({
        method: 'get',
        url: `/user/otheruserinfo?otherId=${id}`
    })
}

// 关注接口
export function getFollow(data) {
    console.log(data);
    return request({
        method: 'post',
        url: '/user/follow',
        data
    })
}

// 取消关注
export function cancelFollow(data) {
    console.log(data);
    return request({
        method: 'post',
        url: '/user/cancelfollow',
        data
    })
}
// 获取关注列表
export function getFollowLists(userId) {
    console.log('用户Id', userId);
    return request({
        method: 'get',
        url: `/user/followlists?user_id=${userId}`
    })
}

//获取粉丝列表
export function getFansLists(userId) {
    console.log('用户Id', userId);
    return request({
        method: 'get',
        url: `/user/fanslists?user_id=${userId}`
    })
}

// 用户编辑个人资料
export function setupdateuserinfo(data) {
    console.log('编辑资料', data);
    return request({
        method: 'put',
        url: '/user/updateuserinfo',
        data
    })
}

// 文章删除
export function deleteArticle(data) {
    console.log('文章删除', data);
    return request({
        method: 'delete',
        url: `/article/deleteArticle?articleID=${data}`,
    })
}