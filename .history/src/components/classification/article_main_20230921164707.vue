<template>
  <div class="main1">
    <!-- <h2>这部分包括标题、排行榜、文章主要部分和右边侧边栏</h2> -->

    <!-- <div class="lable">
			<h2>分类标题部分</h2>
		</div> -->

    <div class="main_article">
      <!-- 文章主页的榜单部分没办法实现暂时先隐藏 
			<div class="top">
				<div class="comprehensive_article">
					<div class="name">综合文章榜 <span>更多> </span></div>

					<div class="title_total">
						<div class="title3">
							<span class="number1">1</span>

							<a href=""
								><span
									>为什么dseeeeeeeeeeeeeeeeeeewereeeeeeeeere还我?</span
								>
							</a>
						</div>

						<div class="title3">
							<span class="number2">2</span>

							<a href=""
								><span>为什么dsewerwwerwre还我?</span>
							</a>
						</div>

						<div class="title3">
							<span class="number3">3</span>

							<a href=""
								><span>为什么dsewerwwerwre还我?</span>
							</a>
						</div>
					</div>
				</div>

				<div class="comprehensive_article">
					<div class="name">综合文章榜 <span>更多> </span></div>

					<div class="title_total">
						<div class="title3">
							<span class="number1">1</span>

							<a href=""
								><span
									>为什么dseeeeeeeeeeeeeeeeeeewereeeeeeeeere还我?</span
								>
							</a>
						</div>

						<div class="title3">
							<span class="number2">2</span>

							<a href=""
								><span>为什么dsewerwwerwre还我?</span>
							</a>
						</div>

						<div class="title3">
							<span class="number3">3</span>

							<a href=""
								><span>为什么dsewerwwerwre还我?</span>
							</a>
						</div>
					</div>
				</div>

				<div class="comprehensive_article">
					<div class="name">
						<i class="el-icon-edit"></i> 综合文章榜

						<span>更多> </span>
					</div>

					<div class="title_total">
						<div class="title3">
							<span class="number1">1</span>

							<a href=""
								><span
									>为什么dseeeeeeeeeeeeeeeeeeewereeeeeeeeere还我?</span
								>
							</a>
						</div>

						<div class="title3">
							<span class="number2">2</span>

							<a href=""
								><span>为什么dsewerwwerwre还我?</span>
							</a>
						</div>

						<div class="title3">
							<span class="number3">3</span>

							<a href=""
								><span>为什么dsewerwwerwre还我?</span>
							</a>
						</div>
					</div>
				</div>
			</div>
      -->

      <div class="article">
        <nav>
          <span
            class="font1"
            :class="{ 'border-bottom': isClicked === '1' }"
            @click="goToRoute('1')"
            ref="font1"
          >
            <a href="javascript:;">推荐</a>
          </span>

          <!-- <span
						class="font1"
						:class="{ 'border-bottom': isClicked === '2' }"
						@click="goToRoute('2')"
						ref="font1"
					>
						<a href="javascript:;">最新</a>
					</span> -->
          <!-- 二级分类栏 -->
          <!-- <div class="right_select">
						<el-select v-model="value" placeholder="请选择具体分类">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</div> -->
          <!-- <router-view></router-view> -->
        </nav>
        <recommend_newest />
      </div>

      <!-- <div>
				<div class="right_column">这是右边的赚钱位置</div>
			</div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { createRouter, createWebHistory, useRouter } from 'vue-router'
import articleStore from '@/store/article_homepage/article'
import recommend_newest from '@/components/classification/recommend_newest'

export default {
  components: {
    recommend_newest,
  },
  setup () {
    let classColumn = articleStore()

    //实例化仓库对象
    const isClicked = ref()
    const router = useRouter()
    const navItems = ref([])

    //下面的注释不能删 功能暂时不需要
    // const goToRoute = (tab) => {
    // 	isClicked.value = tab;
    // 	if (tab === '1') {
    // 		router.push('/article/article_main/recommend');
    // 	} else if (tab === '2') {
    // 		router.push('/article/article_main/recommend');
    // 	}
    // };
    //下面的注释不能删 功能暂时不需要


    onMounted(() => {
      isClicked.value = '1'
    })
    return {
      isClicked,
    }
  },
};
</script>

<style lang="scss" scoped>
//临时加个标签样式开始
//临时标签的样式结束
.main1 {
  //height: auto;
  position: relative;
  height: 100%;
  flex: 1;
  margin-left: 20px;

  .lable {
    width: 1000px;
    height: 40px;
  }

  .main_article {
    position: relative;

    width: 720px;
    height: 100%;

    //height: 1000px;
    background-color: #ffffff;

    .top {
      width: 720px;
      border-bottom: 0.2px solid #585e58;
      height: 152px;

      //background-color: #000;

      margin-top: 0px;

      display: flex;

      box-sizing: border-box;
      cursor: pointer;

      .comprehensive_article:nth-child(-n + 2) {
        border-right: 3px solid #dfd7d775;
      }

      .comprehensive_article {
        width: 220px;

        padding-top: 10px;

        padding-left: 5px;

        display: flex;

        flex-direction: column;

        margin-left: 10px;

        margin-top: 5px;

        margin-bottom: 5px;
      }

      .title_total {
        height: 108px;

        display: flex;

        flex-direction: column;

        justify-content: space-evenly;
      }

      .name {
        float: left;

        font-size: 17px;

        padding-right: 10px;

        width: 200px;
      }

      .name span {
        float: right;

        font-size: 14px;

        color: #777777;
      }

      .number1 {
        font-size: 16px;

        font-weight: 600;

        background: linear-gradient(
          180deg,
          #f64242 20%,

          rgba(246, 66, 66, 0.4) 80%
        );

        color: transparent;
      }

      .number2 {
        font-size: 16px;

        font-weight: 600;

        background: linear-gradient(
          180deg,
          #ff7426 20%,

          rgba(255, 116, 38, 0.4) 80%
        );

        color: transparent;
      }

      .number3 {
        font-size: 16px;

        font-weight: 600;

        background: linear-gradient(
          180deg,
          #ffac0c 20%,

          rgba(255, 172, 12, 0.4) 80%
        );

        color: transparent;

        -webkit-background-clip: text;
      }

      .title3 {
        float: right;

        height: 18px;

        font-size: 14px;
      }

      .title3 a span {
        display: block;

        overflow: hidden;

        text-overflow: ellipsis;

        -o-text-overflow: ellipsis;

        white-space: nowrap;

        float: right;

        width: 207px;

        color: #3b3939;
      }

      .title3 a span:hover {
        color: #617697;
      }
    }

    .title_tatal .article {
      width: 720px;

      height: 600px;

      background-color: #0071ee;

      margin-top: 20px;
    }
  }
}

.right_column {
  position: absolute;

  top: 0;

  right: -278px;

  width: 260px;

  height: 200px;

  background-color: rgb(250, 71, 0);
}

nav {
  position: relative;
  border-bottom: 0.2px solid #fff;
  margin-top: 10px;

  //background-color: #000;

  width: 720px;

  height: 48px;

  border-radius: 4px;
}

nav .font1 {
  display: inline-block;

  height: 24px;

  margin-left: 35px;

  font-size: 16px;

  color: #000000 !important;

  margin-top: 10px;
  //border-bottom: 2px solid rgb(10, 34, 106);
}
nav .font1 a {
  color: #000000;
}

.right_select {
  position: absolute;

  top: 8px;

  right: 5px;

  width: 200px;
}

.bottom_flog {
  border-bottom: 2px solid #1171ee;
}
.border-bottom {
  border-bottom: 2px solid #1171ee;
}
</style>
