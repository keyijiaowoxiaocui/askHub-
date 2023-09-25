<template>
  <div class="all" v-for="(item, index) in items" :key="index">
    <router-link
      :to="{
        path: '/OtherUsers/OtherLately',
        query: { OtherUserId: item.user_id },
      }"
    >
      <div class="circle">
        <img :src="item.avatar_path" alt="头像" />
      </div>

      <h2>{{ item.nick_name }}</h2>

      <span class="text_slice">{{ item.profile }}</span>
      <a class="button" href="javascript:;" role="button"> 了解更多</a>
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuthor } from '@/api/ArticleApis.js'
export default {
  setup () {
    const router = useRouter()
    //使用ref包裹数据
    const items = ref([])
    const getRecommendAuthor = async () => {
      try {
        const res = await getAuthor()
        items.value = res.data.data
      }
      catch (error) {
        console.log("发生错误", error)
      }
    }

    //在组件挂载后触发数据并获取操作
    onMounted(() => {
      getRecommendAuthor()
    })
    return {
      items,
      onLinkClick,
      getRecommendAuthor,
    }
  },
};
</script>

<style lang="scss" scoped>
.all {
  padding-top: 50px;
  width: 200px;
  height: 309px;
  display: table;
}

@media screen and (max-width: 200px) {
  .all {
    width: 400px;
  }
}

.circle {
  width: 200px;
  height: 200px;
  background: #456bd9;
  //border: 0.1875em solid #0f1c3f;
  border-radius: 50%;
  //box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.all h2 {
  width: 199px;
  margin-top: 10px;
  //vertical-align: center;
  text-align: center;
  padding-left: 3px;
  color: #515767;
}

.all span {
  display: block;
  width: 200px;
  color: #a8a8a8;

  text-align: center;
}

.text_slice {
  width: 200px;
  height: 19px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.all .button {
  display: block;
  text-align: center;
  line-height: 33px;

  color: aliceblue;
  width: 78px;
  height: 33px;
  background-color: #03a2ea;

  border-radius: 17px;
  font-size: 14px;
  margin-left: 65px;
  margin-top: 10px;
}
</style>
