import { defineStore } from "pinia"

import { getPersonMsg } from '@/api/chat'

const chatStore = defineStore('oneChat', {
    state: () => {
        return {
            // 用户信息
            userMsg: {},
            // 用户列表
            leftMenu:{},
            // 用户聊天记录
            record:{},
        }
    },
    actions: {
        // 获取用户信息
        async userList() {
            let res = await getPersonMsg()
            console.log(res.data.data);
            this.userMsg = res.data.data
            console.log(this.userMsg);
        }
    }
})

export default chatStore;
