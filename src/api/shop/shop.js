
// import request from "@/utils/request";
import request from "@/request";

// 获取商品所有信息
export function getAllCommodityMsg(page_size, page_num, desc) {
    return request({
        method: 'get',
        url: `/commodity/getAllCommodity?page_size=${page_size}&page_num=${page_num}&desc=${desc}`,
    });
}

// 搜索商品接口
export function searchTwoCommodity(params) {
    console.log(params);
    return request({
        method: 'get',
        url: '/commodity/searchCommodityByQuery',
        params: params
    })
}

// 收藏商品接口
export function collectCommodity(data) {
    console.log(data);
    return request({
        method: 'post',
        url: '/commodity/collectCommodity',
        data: data
    })
}

// 左侧菜单接口
export function leftMenu() {
    return request({
        method: 'get',
        url: '/commodity/getCommodityClassify'
    })
}
// 左侧分类查询
export function searchClassfiy(params) {
    console.log(params);
    return request({
        method: 'get',
        url: '/commodity/searchCommodityByClassify',
        params: params
    })
}
// 获取用户基本信息
export function getPersonMsg() {
    return request({
        method: 'get',
        url: '/user/userinfo',
    })
}
// 发布商品
export function getpublishCommodity(data) {
    return request({
        method: 'post',
        url: '/commodity/publishCommodity',
        data
    })
}

// 删除商品
export function getdeleteCommodity(commodity_id) {
    console.log("删除商品", commodity_id);
    return request({
        method: 'DELETE',
        url: `/commodity/deleteCommodity?commodity_id=${commodity_id}`,
    })
}

// 更新商品
export function getupdeleteCommodity(data) {
    console.log("更新商品", data);
    return request({
        method: 'post',
        url: '/commodity/updateCommodity',
        data
    })
}


// 根据ID获取商品信息
export function getShowDetails(user_id,commodity_id) {
    return request({
        method: 'get',
        url: `/commodity/getCommodityDetail?user_id=${user_id}&commodity_id=${commodity_id}`,
    })
}

// 根据商品ID获取发布该商品的用户ID
export function getShowPublisher(commodity_id) {
    return request({
        method: 'get',
        url: `/commodity/getCommodityPublicUserIdByComId?commodity_id=${commodity_id}`,
    })
}

// 发表评论
export function subComment(data) {
    return request({
        method: 'post',
        url: '/comment/postComment',
        data
    })
}

// 获取一级评论
export function getFirstComment_a(data) {
    return request({
        method: 'get',
        url: `/comment/GetComment?commentObjectId=${data.commentObjectId}&commentType=${data.commentType}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    })
}

// 获取二级评论
export function getSecondComment_a(data) {
    return request({
        method: 'get',
        url: `/comment/GetComment?commentObjectId=${data.commentObjectId}&commentType=${data.commentType}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    })
}

// 获取三级评论
export function getThirdComment_a(data) {
    return request({
        method: 'get',
        url: `/comment/GetComment?commentObjectId=${data.commentObjectId}&commentType=${data.commentType}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    })
}

// 删除评论
export function deleteComment_a(commentId,userId) {
    return request({
        method: 'delete',
        url: `/comment/deleteComment?commentId=${commentId}&userId=${userId}`,
    })
}
// 删除自己文章评论
export function deleteArticleComment_a(aticleId,userId,commentId) {
    return request({
        method: 'delete',
        url: `/comment/deleteArticleComment?articleId=${aticleId}&userId=${userId}&commentId=${commentId}`,
    })
}

// 删除自己商品评论
export function deleteShopComment_a(commentId,userId,commendityId) {
    return request({
        method: 'delete',
        url: `/comment/deleteCommodityComment?commentId=${commentId}&userId=${userId}&commendityId=${commendityId}`,
    })
}