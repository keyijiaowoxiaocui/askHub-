import request from '../request.js';
export function uploadImages(data) {
  return request({
    method: 'post',
    url: '/images/uploadImage',
    data,
  });
}