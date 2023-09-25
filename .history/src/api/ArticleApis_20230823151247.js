// 项目中我们大多数时候都会把对应的接口请求封装成api来调用
import request from '../request.js';

// 获得热门文章
export function getHotArticles() {
	return request({
		method: 'get',
		url: '/article/getPopularArticle',
	});
}
//获取主页广告位轮播图图片
export function getPictures(grade) {
	return request({
		menthod: 'get',
		url: `/advertisement/getAdvertisingByGrade?grade=${grade}`,
	});
}

//获得主页推荐商品
export function getCommodity(page_size, page_num, desc) {
	return request({
		method: 'get',
		url: `/commodity/getAllCommodityOrderByCollection?page_size=${page_size}&page_num=${page_num}&desc=${desc}`,
	});
}
//  获取推荐作者
export function getAuthor() {
	return request({
		method: 'get',
		url: '/article/getRecommendedWriter',
	});
}
// 获取所有文章类别
export function getCategory() {
	console.log('1232444');
	return request({
		method: 'get',
		url: '/article/getAllCategories',
	});
}

export function sendCategoryId(data) {
	return request({
		method: 'get',
		url: '/article/getArticleByCategory',
		data,
	});
}

//获取对应分类文章的接口
export function getAllArticleData(params) {
	return request({
		method: 'get',
		url: `/article/getArticleByCategory?category=${params}`,
	});
}

//获取文章详情接口
export function getArticleDetails(articleID, usId) {
	return request({
		method: 'get',
		url: `/article/viewSpecificContent?articleID=${articleID}&userID=${usId}`,
		// url: '/article/viewSpecificContent',
		// params: params,
	});
}

// 上传图片文件
export function upload(data) {
	return request({
		method: 'post',
		url: '/images/uploadImage',
		data,
	});
}

// 发布文章
export function subArticle_a(data) {
	return request({
		method: 'post',
		url: '/article/publishArticle',
		data,
	});
}

// 搜索文章接口
export function getSearchArticle(keywords, page_size, page_num, desc) {
	//console.log(134143143);
	return request({
		method: 'get',
		url: `/article/searchArticlesByKeywords?keywords=${keywords}&page_size=${page_size}&page_num=${page_num}&desc=${desc}`,
	});
}
//点赞取消点赞的接口
export function getLikeorNot(userId, articleId) {
	return request({
		method: 'post',
		url: `/article/likeArticle?userId=${userId}&articleId=${articleId}`,
	});
}
//收藏或取消收藏文章
export function getCollection(userId, articleId) {
	return request({
		method: 'post',
		url: `/article/collectArticle?userId=${userId}&articleId=${articleId}`,
	});
}
//获取文章一级评论
export function getFirstLevelComments(
	commentObjectId,
	commentType,
	pageNum,
	pageSize
) {
	return request({
		method: 'get',
		url: `/comment/GetComment?commentObjectId=${commentObjectId}&commentType=${commentType}&pageNum=${pageNum}&pageSize=${pageSize}`,
	});
}
//获取文章二级评论
export function getSecondLevelComments(
	commentObjectId,
	commentType,
	pageNum,
	pageSize
) {
	return request({
		method: 'get',
		url: `/comment/GetComment?commentObjectId=${commentObjectId}&commentType=${commentType}&pageNum=${pageNum}&pageSize=${pageSize}`,
	});
}
//发表评论
export function postComments() {
	return request({
		method: 'post',
		url: `/comment/postComment`,
	});
}

// 获取文章标签接口
export function getArticleTag_a() {
	return request({
		method: 'get',
		url: '/article/getAllArticleLabel',
	});
}

// 保存或更新文章草稿
export function saveArticleDraft_a(data) {
	return request({
		method: 'post',
		url: '/article/saveArticleDraft',
		data,
	});
}

// 删除文章草稿
export function deleteArticleDraftById_a(params) {
	return request({
		method: 'delete',
		url: `/article/deleteArticleDraftById?draftArticleID=${params}`,
	});
}

// 获取用户的文章草稿列表
export function getArticleDraftByUserId_a(params) {
	return request({
		method: 'get',
		url: `/article/getArticleDraftByUserId?userId=${params}`,
	});
}

// 获取文章草稿具体内容
export function getArticleDraftById_a(params) {
	return request({
		method: 'get',
		url: `/article/getArticleDraftById?draftArticleID=${params}`,
	});
}
