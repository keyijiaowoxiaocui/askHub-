<template>
	<AppTopNav />
	<div>
		<el-card class="container" v-for="(item, index) in article.searchResult" :key="index" @click="goDetail(index)"
			style="
				background-color: #ffffff;
				/* border-bottom: #070501;
				border-left: #070501;
				border-right: #070501; */
				height: 150px;
			">
			<div>
				这里填什么啊
				<div style="display: inline-block; margin-left: 5px"></div>
				{{ item.releaseDate }}
			</div>
			<h2 style="margin-top: 10px">
				{{ item.title }}
			</h2>
			<h4 style="margin-top: 10px">
				{{ item.briefIntroduction }}
			</h4>
			<div class="bottoms">
				<div class="bottomleft">
					<div class="left">
						<el-icon>
							<View />
						</el-icon>
						132
					</div>
					<div class="right">
						<el-icon>
							<Star />
						</el-icon>
						132
					</div>
				</div>
				<div class="bottomright">点击查看更多</div>
			</div>
		</el-card>
		<div style="display: flex; justify-content: center;margin-top: 20px;">
			<!-- 分页器 -->
			<el-pagination v-model:current-page="pageNo" :page-size="15" layout="prev, pager, next, jumper" :total="total"
				@current-change="handleCurrentChange" :background="true" />
		</div>

		<el-card class="container" v-if="article.searchResult == null" style="
				background-color: #ffffff;
				/* border-bottom: #070501;
				border-left: #070501;
				border-right: #070501; */
			">
			<h2>没有该内容</h2>
		</el-card>


	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 引入userRouter
const router = useRouter();
import { View, Star } from '@element-plus/icons';

import AppTopNav from '@/components/AppTopNav';
import articleStore from '@/store/article_homepage/article';

let article = articleStore();
import { ref } from 'vue';

let pageNo = ref();
let total = ref();

// 点击下边页码时数据发生改变
const handleCurrentChange = (val) => {
	// alert(val)
	pageNo.value = val;
	console.log(`current page: ${val}`);
	shopStoreList.commodityList(val);
};

// 去商品详情页面方法
const goDetail = (index) => {
	console.log(article.searchResult[index].articleID);
	article.getDetailArticle(article.searchResult[index].articleID);
	router.push('article_details/' + article.searchResult[index].articleID);
};
</script>

<style scoped lang="scss">
* {
	color: rgb(0, 0, 0);
	list-style: none;
}

.container {
	margin-top: 20px;
	width: 60%;
	margin-left: 20%;
}

.bottoms {
	width: 100%;
	display: flex;
	justify-content: space-between;

	.bottomleft {
		width: 130px;
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}

	.bottomright {
		margin-top: 20px;
	}
}
</style>
