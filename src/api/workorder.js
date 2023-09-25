import request from '../request.js';

// 获取全部的工单
export function getWorkOrder(data) {
  return request({
    method: 'get',
    url: `/workOrder/getUserAllWorkOrder?userId=${data}`,
  });
}
// 获取工单详情信息
export function getWorkOrderinfo(data) {
  return request({
    method: 'get',
    url: `/workOrder/getWorkOrderById?workOrderId=${data}`,
    data,
  });
}

// 提交工单
export function sendWorkOrder(data) {
  return request({
    method: 'post',
    url: '/workOrder/postWorkOrder',
    data
  })
}

// 上传图片
export function uploadImages(data) {
  return request({
    method: 'post',
    url: '/images/uploadImage',
    data,
  });
}

// 根据关键字搜索用户工单
export function searchWorkOrder(userId, keywords) {
  return request({
    method: 'get',
    url: `/workOrder/getWorkOrdersByKeywords?userId=${userId}&keywords=${keywords}`
  })
}