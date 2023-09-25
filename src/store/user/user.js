// 仅定义商品模块中的defineStore，用这个来定义一个store
import { defineStore } from "pinia"
import { getUserData_a } from "@/api/UserApis.js"
import { getOtherInfo } from '@/api/my-api'

const useStore = defineStore('User', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            userId: '',
            myUserInfo: {},
            otherId: '',
            otherUserInfo: {},
        }
    },

    actions: {
        // 获取用户数据
        async getUserData () {
            let res = await getUserData_a()
            this.myUserInfo = res.data.data
            this.userId = res.data.data.user_id

            localStorage.setItem("uid", this.userId)

        },
        // 获取其他用户数据
        async getOtherUserData (uid) {
            console.log("uid", uid)
            let res = await getOtherInfo(uid)
            console.log("res", res.data.data)
            this.otherUserInfo = res.data.data
            this.otherId = res.data.data.user_id
        }
    },
})

// 对外暴露
export default useStore