<template>
    <a href="javascript:;" class="head">
        <img v-if="useravatar" :src="useravatar" alt="">
        <img v-else src="https://p3-passport.byteimg.com/img/mosaic-legacy/3793/3131589739~64x64.awebp" alt="">
    </a>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import { getUserData_a } from '@/api/UserApis.js'


const props = defineProps({
    useravatar: String,
})

// const avatar_path = ref('')

// watch(() => props.userid, () => {
//     //监控props内容的变化
//     getUserData_a(props.userid).then(res2 => {
//         let data = res2.data.data
//         avatar_path.value = data.avatar_path;
//     })
// })

// 去个人页面
const toPerson = () => {
    if (usId.value === author_id.value) {
        router.push('/my/lately')
    } else {
        router.push('/OtherUsers/OtherLately?OtherUserId=' + author_id.value)
    }
}

</script>

<style lang="scss" scoped>
.head {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    margin: auto 0;
    text-align: center;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>