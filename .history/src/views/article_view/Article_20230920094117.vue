<template>
  <AppTopNav />
  <div class="sidebar_top w" v-show="screenWidth <= 1000">
    <div
      class="specific"
      @click="onLinkClick(item.categoryId)"
      v-for="(item, index) in classColumn.classList"
      :key="index"
    >
      <!-- <a href="">{{ item.categoryName }}</a> -->
      <a href="javascript:;">{{ item.categoryName }}</a>
    </div>
  </div>

  <div class="article_classification w" @scroll="handleScroll">
    <div class="sidebar" v-show="screenWidth > 1000">
      <div
        class="border"
        v-for="(item, index) in classColumn.classList"
        :key="index"
      >
        <button
          class="specific"
          @click="onLinkClick(item.categoryName)"
          :class="isActive === item.categoryId ? 'active' : ''"
          :disabled="isActive === item.categoryId ? true : false"
        >
          <!-- <router-link to="/article/1">{{ -->
          {{ item.categoryName }}
          <!-- }}</router-link> -->
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import AppTopNav from '@/components/AppTopNav.vue'
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategory } from '@/api/ArticleApis'
import { getAllArticleData } from '@/api/ArticleApis'
import articleStore from '@/store/article_homepage/article'
import { getCurrentInstance } from 'vue'

export default {
  components: {
    AppTopNav,
  },
  setup () {
    //const moreShowBoolen = ref(false);
    //实例化对象
    const loadedDataCount = ref(0)
    let height = ref(0)
    let isActive = ref(0)
    let classColumn = articleStore()
    // 尝试从本地存储中读取已加载的文章数据
    const loadedArticleData = JSON.parse(
      localStorage.getItem('loadedArticleData')
    )
    if (loadedArticleData) {
      classColumn.articledata = loadedArticleData
      loadedDataCount.value = loadedArticleData.length
    }
    const router = useRouter()
    const listHeight = ref(0)
    const screenWidth = ref(window.innerWidth)
    const getClass = () => {
      classColumn.category()
    }
    const onLinkClick = async (id) => {
      console.log(555555)
      router.push('/article/' + id)
      await classColumn.getAllData(id)
      console.log('数据', classColumn.test)
      isActive.value = id
    }
    onMounted(async () => {
      router.push('/article/1')
      console.log(12345678)
      await classColumn.getAllData(5)

      getClass()
    })
    //防抖函数
    const debounce = (fn, delay) => {
      let timer
      return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, delay)
      }
    }
    return {
      screenWidth,
      onLinkClick,
      classColumn,
      getClass,
      isActive,
      listHeight,
      //a,
      height,
      // loadMoreData,
      loadedDataCount,
    }
  },
};
</script>

<style lang="scss" scoped>
.article_classification {
  margin-top: 20px;
  display: flex;
  //height: 2000px;
}

.sidebar {
  //position: fixed;
  position: sticky;
  z-index: 999;
  padding-top: 10px;
  //粘性定位要给top值，不然不生效
  top: 20px;
  width: 180px;
  height: 358px;
  max-height: 440px;

  /*元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效*/

  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 4px 4px 4px 5px rgba(0, 0, 0, 0.1);
  //box-shadow: 0 0 5px rgba(255, 255, 255, 0.8); /* 调整阴影大小和颜色透明度 */

  .border {
    display: flex;
    flex-direction: column;

    //max-height: 470px;
  }

  .specific {
    width: 164px;
    height: 45px;
    border-radius: 5px;
    /*	position: -webkit-sticky;
		position: sticky;
		top: 0px;*/
    font-size: 15px;
    line-height: 45px;

    box-sizing: border-box;
    color: #f2f2f2;
    position: relative;
    border: none;
    border-bottom: 0.2px solid #585e58;
    background-color: #1a1a1a;

    cursor: pointer;
  }

  .specific:hover {
    background-color: #101010;

    a {
      color: #fff;
    }
  }

  a {
    color: #f2f2f2;
    vertical-align: center;

    line-height: 46px;
  }

  .border {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    vertical-align: center;
    line-height: 45px;
    margin: 8px;
    margin-top: 0px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
}

.sidebar::-webkit-scrollbar-thumb {
  // 滑块颜色
  border-radius: 5px; // 滑块圆角
  background-color: #e2ebf0;
}

.active {
  background-color: #101010 !important;
  //border-bottom: 1px solid #000;
}

.more {
  width: 70px;
  height: 30px;
  background-color: red;
  right: 10%;
}
</style>
