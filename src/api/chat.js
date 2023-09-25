import request from "@/request";

// 获取用户基本信息
export function getPersonMsg() {
  return request({
    method: 'get',
    url: '/user/userinfo',
  })
}

export function getAllChat(data) {
  return request({
    method: 'get',
    url: '/chat/getChatRoomMsg?userId=' + data
  })
}

export function getAllCont(roomid, lastid) {
  return request({
    method: 'get',
    url: '/chat/findGroupChatRecords?chatRoomId=' + roomid + '&lastMsgId=' + lastid
  })
}
