<template>
  <div
    class="single_item"
    v-for="(item, index) in items"
    :key="index"
    @click="onLinkClick(index)"
  >
    <!-- 点击到商品详情 -->
    <div class="image" @click="onLinkClick(index)">
      <img
        :src="item.commodity_images ? item.commodity_images[0] : ''"
        alt="商品图片"
      />
    </div>
    <span>{{ item.name }}</span>
    <span class="brif">{{ item.introduction }}</span>
    <span class="price">￥{{ item.price }}</span>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getCommodity } from "../api/ArticleApis.js"
export default {
  setup () {
    const router = useRouter()
    const getRecommendCommodity = async (page_size, page_num, desc) => {
      const res = await getCommodity(page_size, page_num, desc)
      //console.log('有东西吗', res);
      items.value = res.data.data
      //console.log('做操时间到', items.value);
    }
    const items = ref()
    const onLinkClick = (index) => {
      //console.log(items.value[index].commodity_id, "76t767576");
      router.push("/shop/" + items.value[index].commodity_id)
    }
    onMounted(() => {
      getRecommendCommodity(6, 1, true)
    })

    return {
      items,
      onLinkClick,
      getRecommendCommodity,
    }
  },
};
</script>

<style lang="scss" scoped>
.single_item {
  position: relative;
  width: 370px;
  height: 172px;
  //background-color: rgb(247, 249, 250);
  background-color: #ffffff;
  border-radius: 17px;
  //margin: 20px;
  transition: transform 0.1s ease-in-out;
  box-shadow: 4px 5px 6px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.single_item:hover {
  transform: translateX(8px);
}

.image {
  width: 150px;
  height: 150px;
  //background-color: #6dc2ea;
  margin-top: 13px;
  margin-left: 11px;
  border-radius: 10px;
  overflow: hidden;
}

.title {
  //position: relative;
  //float: left;
  width: 187px;
  height: 46px;

  margin-top: 10px;
  margin-left: 14px;
}

span {
  display: block;
  width: 187px;
  height: 46px;
  position: absolute;
  top: 26px;
  left: 171px;
  font-size: 17px;
  word-wrap: break-word;
  word-break: normal;
  color: #000000;
}

.price {
  color: #ff6600;
  top: 136px;
}

.brif {
  margin-top: 20px;
  font-size: 14px;
  color: #515767;
  width: 186px;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
