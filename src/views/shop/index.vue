<template>
	<div class="common-layout">
		<AppTopNav></AppTopNav>
		<el-container>
			<!-- <el-header style="background-color: aqua;">
                这里是头部分类
            </el-header> -->
			<el-container>
				<!-- 左侧区域 -->
				<el-aside width="350px" class="left">
					<LeftMenu></LeftMenu>
				</el-aside>
				<!-- 内容展示区域 -->
				<el-main>
					<!-- 数据展示区域 -->
					<el-row :gutter="12">
						<el-col :span="18">
							<el-card v-if="shopStoreList.commodityMsg == null" style="margin-top: 10px">
								<h1>未搜索到相关商品</h1>
							</el-card>
							<div v-else class="card">
								<el-card class="neibucard" v-for="(
										item, index
									) in shopStoreList.commodityMsg" :key="index" :body-style="{ padding: '0px' }">
									<!-- 头像 -->
									<el-avatar shape="square" :size="180" :fit="cover" :src="item.commodity_images[0]"
										@click="toDetails(item.commodity_id)" />
									<!-- 内容 -->
									<div class="content">
										<div class="title" @click="toDetails(item.commodity_id)">
											<h1 style="color: black;">{{ item.name }}</h1>
											<div class="warp" style="color: black;">
												{{ item.introduction }}
											</div>
										</div>
										<div class="bottom">
											<div>
												<span style="
														font-size: 22px;
														color: #FF6600;
													">￥</span>
												<p class="price">
													{{ item.price }}
												</p>
											</div>
										</div>
									</div>
								</el-card>
							</div>
						</el-col>
						<el-col :span="5" style="margin-top: 10px;margin-left: -50px;">
							<el-card style="color: rgb(0, 0, 0);">
								这里打算放一些广告或者文章
							</el-card>
						</el-col>
					</el-row>
					<!-- 分页器区域 -->
					<el-col :span="16">
						<div style="margin-top: 20px; margin-left: 40px;display: flex;justify-content: center;">
							<el-pagination v-model:current-page="pageNo" :page-size="15" layout="prev, pager, next, jumper"
								:total="total" @current-change="handleCurrentChange" :background="true" />
						</div>
					</el-col>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // 引入userRouter
// 顶部导航栏
import AppTopNav from '@/components/AppTopNav.vue';
import LeftMenu from '@/views/shop/leftMenu.vue';
// 获取商品信息相关的小仓库
import shopStore from '@/store/shop/shop';
let shopStoreList = shopStore();

import defineStore from '@/store/user/user';
let a = defineStore();
console.log(a.userId);

// 测试
import { ElMessage } from 'element-plus';
let total = ref();
let pageNo = ref();
// 收集商品向后端传的对象
let collects = reactive({
	commodity_id: 0,
	collector_id: '',
});
// 点击下边页码时数据发生改变
const handleCurrentChange = (val) => {
	// alert(val)
	pageNo.value = val;
	console.log(`current page: ${val}`);
	shopStoreList.commodityList(val);
};

// 收藏商品
const collect = (index) => {
	console.log(index);
	console.log(shopStoreList.commodityMsg[index].commodity_id);
	collects.commodity_id = shopStoreList.commodityMsg[index].commodity_id;
	console.log(collects.commodity_id);
	shopStoreList.getcollectCommodity(collects);
	collectCommodity(collects).then((res) => {
		if (res.data.code == 0) {
			ElMessage({
				message: '收藏成功',
				grouping: true,
				type: 'success',
			});
		}
	});
};

// 获取本用户collector_id
const getpersonid = async () => {
	await shopStoreList.getPersonMsg();
	collects.collector_id = shopStoreList.user_id;
	console.log(shopStoreList.user_id);
};

// 跳转到商品详情页
const toDetails = (id) => {
	console.log(id);
	router.push('/shop/' + id);
};

let router = useRouter();

// 监听仓库中商品数据的变化
watch(shopStoreList.commodityMsg, (newValue, oldValue) => {
	console.log('commodityMsg changed from', oldValue, 'to', newValue);
});

watch(shopStoreList.total, (newValue, oldValue) => {
	console.log(newValue);
	total = newValue
})

/**
 * 
 */

// watchEffect(() => {
// 	console.log(shopStoreList.total);
// 	total.value = shopStoreList.total
// })

// 组件挂载执行的操作
onMounted(async () => {
	await shopStoreList.commodityList(1);
	shopStoreList.getLeftMenu();
	console.log('组件挂载');
	// 获取本用户collector_id
	getpersonid();
	console.log(shopStoreList.total);
	total.value = shopStoreList.total;
	// 获取路由中meta的值
	const route = useRoute();
	console.log(route);
});
</script>

<style scoped lang="scss">
.warp {
	width: 180px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-height: 2.4em;
	/* 2行文本的高度，根据字体大小和行高调整 */
	line-height: 1.2em;
	/* 行高，根据需要调整 */
}

* {
	background-color: #ffffff;
}

.common-layout {
	height: 100%;
	width: 100%;
}

.left {
	position: static;
}

.main {
	display: flex;

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;

		.bottom {
			display: flex;
			justify-content: space-between;
			margin-top: 25px;

			.el-button {
				z-index: 100;
			}

			.price {
				margin-top: 5px;
				display: inline-block;
				font-size: 16px;
				font-weight: 800;
				color: #FF6600;
			}
		}
	}
}

.card {
	margin-top: -20px;
	display: flex;
	flex-wrap: wrap;
}

.neibucard:hover {
	transform: scale(1.1);
}

.neibucard {
	width: 180px;
	height: 300px;
	margin-top: 30px;
	margin-left: 40px;
	background-color: #ffffff;

	.el-avatar {
		cursor: pointer;
	}
}

.title {
	cursor: pointer;
	padding: 5px;
	font-size: 12px;
	text-overflow: ellipsis;
	width: 180px;
	height: 49px;
	line-height: 16px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.el-card {
	background-color: #ffffff !important;
}

.el-pager li {
	background-color: #f9f9f9 !important;
}

.el-pager li {
	background-color: #ffffff !important;
}

.el-pager li {
	color: black !important;
}
</style>
