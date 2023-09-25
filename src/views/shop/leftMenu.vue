<template>
    <el-card style="margin-top: 30px;margin-left: 150px;background-color: #ffffff !important;">
        <div class="left">
            <p class="p" style="cursor: pointer;font-size: 18px;padding: 8px;" @click="allMenu">全部</p>
            <span v-for="(item, index) in leftMenuList.leftMenu" class="sp" @click="getName(index)" :class="active?now:notnow">
                <p class="p">{{ item.classify }}</p>
            </span>
        </div>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import shopStore from '@/store/shop/shop'
let leftMenuList = shopStore()
let shopStoreList = shopStore()
// 查询数组
const searchList = reactive({
    page_size: '5',
    page_num: '1',
    desc: 'true',
    classify: ''
})
let active = ref(false)

// 点击方法
const getName = (index) => {
    active = true
    console.log(leftMenuList.leftMenu[index]);
    searchList.classify = leftMenuList.leftMenu[index].classify
    console.log(leftMenuList.leftMenu[index].classify);
    console.log(searchList);
    leftMenuList.getLeftMenuSearch(searchList)
}
// 点击展示全部商品
const allMenu = () => {
    shopStoreList.commodityList(1)
}

</script>

<style scoped>
.now {
    background-color: #eaf2ff;
    color: #1e80ff;
}

.notnow {
    background-color: #ffffff;
    color: #000000;
}

.left {
    border: #585e58;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #000;

    .sp {
        padding: 8px;


        .p {
            cursor: pointer;
            font-size: 18px;
        }

        .p:hover {
            transform: scale(1.1);
        }
    }

    .sp:hover {
        background-color: #eaf2ff;
        color: #1e80ff;
    }

    .p:hover {
        background-color: #eaf2ff;
        color: #1e80ff;
    }
}
</style>

