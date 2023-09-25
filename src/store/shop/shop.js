// 仅定义商品模块中的defineStore，用这个来定义一个store
import { defineStore } from "pinia"

// 引入接口
import {
    getAllCommodityMsg,
    searchCommodity,
    searchTwoCommodity,
    collectCommodity,
    leftMenu,
    searchClassfiy,
    getPersonMsg,
} from '@/api/shop/shop'

// 通过defineStore来定义一个属于商品的仓库store，内部会自动管理store
const shopStore = defineStore('Shop', {
    // 存储数据的地方
    state: () => {
        return {
            // 请求商品列表所带的参数
            shopList: {
                "page_size": '15',
                "page_num": '1',
                "desc": true,
            },
            // 存放商品所有数据数组
            commodityMsg: [],
            // 搜索数组
            inpval: '',
            // 收藏的商品数据
            collect: [],
            // 左侧商品菜单
            leftMenu: [],
            // 用户信息
            userMsg: [],
            user_id:'',
            // 一共多少条数据
            total:'',
        }
    },
    // 异步|逻辑|请求数据
    actions: {
        // 获取商品列表接口
        async commodityList(pageNo) {
            this.shopList.page_num = pageNo
            console.log(this.shopList);
            let res = await getAllCommodityMsg(this.shopList.page_size, this.shopList.page_num, this.shopList.desc)
            this.commodityMsg = res.data.data
            this.total = res.data.total
            console.log(res.data.total);
            console.log(res);
        },
        // 搜索功能需要的接口
        async getsearchCommodity(searchList) {
            console.log(searchList);
            let res = await searchTwoCommodity(searchList)
            console.log(res.data);
            this.commodityMsg = res.data.data
            this.total = res.data.total
            console.log(this.commodityMsg);
        },
        // 收藏商品接口
        async getcollectCommodity(data) {
            this.collect = data
            let res = await collectCommodity(data)
            console.log(res.data);
        },
        // 左侧菜单接口
        async getLeftMenu() {
            let res = await leftMenu()
            console.log(res.data.data);
            this.leftMenu = res.data.data
            this.leftMenu = Array.from(new Set(this.leftMenu))
            console.log(this.leftMenu);
        },
        // 左侧菜单分类查询接口
        async getLeftMenuSearch(searchList) {
            let res = await searchClassfiy(searchList)
            console.log(res);
            console.log(res.data.data);
            this.commodityMsg = res.data.data
            this.total = res.data.total
            console.log(this.total);
            console.log(this.commodityMsg);
        },
        // 获取该用户基本信息
        async getPersonMsg() {
            let res = await getPersonMsg()
            this.userMsg = res.data.data
            console.log(this.userMsg.user_id);
            this.user_id = this.userMsg.user_id
        }
    },
})

// 对外暴露
export default shopStore;
