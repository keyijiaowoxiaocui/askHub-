// 仅定义商品模块中的defineStore，用这个来定义一个store
import { defineStore } from "pinia";

import { getLoveList } from "@/api/msg/love";

const loveStore = defineStore("love", {
    state: () => {
        return{
            List:[1,2,3],
        }
    },
    action:{
        async loveList(params){
            console.log(params);
            let res = await getLoveList(params)
            console.log(res);
        },
    }
});

export default loveStore;
