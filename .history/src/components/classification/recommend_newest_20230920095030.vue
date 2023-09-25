<template>
  <div class="articles">
    <div
      class="article1"
      v-for="(item, index) in Column.articledata"
      :key="index"
      @click="onLinkClick(item.articleID)"
    >
      <div class="entry">
        <div class="top_content">
          <div class="name">
            <a href="javascript:;">{{ item.user.nick_name }}</a>
          </div>

          <div class="data">{{ item.releaseDate }}</div>

          <div class="span" v-for="item in labelsId" :key="item">
            <a href="javascript:;">{{ item }}</a>
          </div>
        </div>

        <div class="content_main">
          <div class="title">
            <!-- <a href=""> 点击这个跳转到文章详情页面</a> -->

            {{ item.title }}
          </div>

          <div class="container_bottom">
            <div class="content_content">
              {{ item.briefIntroduction }}
            </div>
          </div>

          <ul>
            <li>
              <span class="iconfont icon-shoucang1"></span
              >{{ item.collectionCount }}
            </li>

            <li>
              <span class="iconfont icon-keaide"></span>{{ item.likeCount }}
            </li>

            <!-- <li><span class="iconfont icon-pinglun1"></span>7</li> -->

            <li id="click_more">
              点击查看更多<span class="iconfont icon-fabu"></span>
            </li>

            <!-- <li>不感兴趣</li> -->
          </ul>
        </div>
      </div>
    </div>

    <div ref="loadMoreTrigger"></div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount, onMounted, reactive, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import articleStore from '@/store/article_homepage/article'

export default {
  setup () {
    let categoryId = ref(5)

    const loadedDataCount = ref(0) // 计数已加载的数据数量

    const loadMoreTrigger = ref(null)

    let isLoading = false

    // 滚动触底加载的阈值，指定触底多少距离时触发加载更多数据

    const loadMoreThreshold = 100

    let hasLoadedAllData = false // 标记是否已加载所有数据

    const defaultDataCount = 1 // 默认展示的数据条数

    // 文章ID

    let Column = articleStore()

    const router = useRouter()

    const route = useRoute()

    const reloadArticleData = async (categoryId) => {
      // 重新加载数据

      await classColumn.getAllData(categoryId)
    }

    const onLinkClick = async (articleID) => {
      // 调用仓库方法

      await Column.articleDetails(articleID)

      console.log('recommend_nest组件中的', articleID)

      router.push('/article_details/' + articleID)
    }

    //用户触底滚动时加载更多数据的函数

    const loadMoreData = () => {
      if (isLoading && hasLoadedAllData) return
      // 获取视口的高度，即可见窗口的高度
      const vh = document.documentElement.clientHeight
      // 获取当前页面的滚动距离，兼容不同浏览器的写法
      const scrollY =
        document.documentElement.scrollTop || document.body.scrollTop
      // 计算页面底部的位置，即滚动距离加上视口高度
      const bottomOfPage = scrollY + vh
      if (
        loadMoreTrigger.value &&
        bottomOfPage + loadMoreThreshold >=
        loadMoreTrigger.value.offsetTop
      ) {
        console.log('看这个判断满足条件了没')
        // 标记为正在加载数据，防止重复加载
        isLoading = true
        // 计算起始索引，即当前已显示数据的末尾索引
        const startIndex = Column.articledata.length
        const viewCount = 5
        console.log(99999999999)
        console.log(categoryId)
        // 加载数据
        Column.getArticleData(categoryId, startIndex, viewCount).then(
          () => {
            // 数据加载完成后，重置加载状态
            isLoading = false
            // 判断是否加载了所有数据，如果是则更新标志
            if (Column.articledata.length === Column.test.length) {
              hasLoadedAllData = true
            }
          }
        )
      }
    }

    onMounted(async () => {
      // await Column.getArticleData(categoryId, 0, 3); // 加载初始的三条数据
      loadedDataCount.value = 5 // 初始化已加载数据数量
      console.log(2222222)
      window.addEventListener('scroll', loadMoreData)
      // console.log('loadMoreTrigger.value:', loadMoreTrigger.value);
    })
    watch(Column.articledata, () => {
      loadMoreTrigger.value = document.querySelector(
        '.article1:last-child'
      )
    })
    return {
      Column,
      onLinkClick,
      loadMoreTrigger,
      loadedDataCount,
      reloadArticleData,
      categoryId,
    }
  },
};
</script>

<style lang="scss" scoped>
.articles {
  width: 720px;

  position: absolute;

  //height: 1000px;

  //top: 300px;

  //background-color: #000;

  border-radius: 4px;

  //margin-top: 15px;

  display: flex;

  flex-direction: column;
}

.article1 {
  width: 720px;

  height: 164px;

  color: #fff;

  //background-color: #000;

  padding-left: 10px;

  box-sizing: border-box;

  margin-bottom: 12px;
}

.entry {
  width: 680px;

  height: 159px;

  margin-top: 12px;

  display: flex;

  flex-direction: column;

  margin-left: 11px;

  //background-color: rgb(43, 65, 144);

  box-sizing: border-box;
}

.top_content {
  //background-color: #fff;

  display: flex;

  flex-direction: row;

  padding-top: 5px;

  .name,
  .data,
  .span {
    //background-color: blue;

    margin-left: 10px;

    color: #fff;

    font-size: 13px;

    height: 25px;
  }

  .name,
  .data {
    border-right: 1px solid #dfd7d775;

    padding-right: 20px;
    cursor: pointer;
  }
}

.span a {
  margin-right: 5px;
}

.content_main {
  cursor: auto;
  //background-color: #eb4a4a;

  display: flex;

  flex-direction: column;

  //flex-direction: row;

  //background-color: red;

  width: 700px;

  flex: 1;

  margin-right: 5px;

  border-bottom: 1px solid #e4e6eb;
}

.title {
  cursor: pointer;
  font-weight: 600;

  font-size: 20px;

  color: #fff;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  margin-top: 8px;
}

.content_main ul {
  position: relative;

  display: flex;

  flex-direction: row;

  padding-bottom: 4px;

  bottom: 4px;

  left: 5px;
}

.content_main ul li {
  margin-right: 20px;

  box-sizing: border-box;

  vertical-align: center;

  color: #fff;
}

.container_bottom {
  //background-color: rgb(231, 182, 182);

  height: 82px;

  width: 700px;

  display: flex;
}

.container_bottom .content_content {
  //background-color: green;
  cursor: pointer;

  margin-top: 5px;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  vertical-align: center;

  color: #fff;

  vertical-align: center;

  height: 0 auto;

  line-height: 25px;

  //margin-top: 15px;

  min-width: 580px;
}

#click_more {
  cursor: pointer;
  position: absolute;

  color: #a5a9b1;

  font-size: 8px;

  width: 92px;

  height: 17px;

  //border: 1px solid #fff;

  //margin-bottom: px;

  padding-right: 0px;

  right: 5px;

  bottom: 0px;

  //border: 1px solid #fff;
}
</style>
