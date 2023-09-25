<template>
	<div class="app-top-nav">
		<ul class="left">
			<div class="tupian">
				<img
					src="https://askhub-v1-1317893442.cos.ap-beijing.myqcloud.com/askhub/14629076786483200.png"
					alt=""
				/>
			</div>
			<li
				v-for="(item, index) in navItems"
				:key="index"
				@click="goToRoute(item.path)"
			>
				{{ item.name }}
			</li>
		</ul>
		<div class="search_box">
			<!--input搜索框-->
			<input
				type="text"
				class="search_text"
				placeholder="不如探索一下AskHub?"
				v-model="inpval"
				@input="handleInputChange"
				@keyup.enter="performSearch"
			/>
			<!-- 商品页面搜索框 -->
			<a
				v-if="getrouter.go_router == '/shop'"
				class="search_btn"
				@click="shopSearch(inpval)"
				><span class="iconfont icon-sousuo"></span>
			</a>
			<a
				v-if="getrouter.go_router.includes('article')"
				class="search_btn"
				@click="articleSearch(inpval)"
				><span class="iconfont icon-sousuo"></span
			></a>
		</div>
		<ul id="right">
			<router-link to="/msg">
				<li>
					<span class="iconfont icon-xiaoxi"></span>&nbsp;&nbsp;消息
				</li>
			</router-link>
			<router-link to="/my">
				<li>
					<span class="iconfont icon-zhuye1"></span
					>&nbsp;&nbsp;个人中心
				</li>
			</router-link>
			<router-link target="_blank" to="/subArticle">
				<li>
					<span class="iconfont icon-weibiaoti--"></span
					>&nbsp;&nbsp;写文章
				</li>
			</router-link>
			<router-link to="/login">
				<li>
					<span class="iconfont icon-denglu"></span>&nbsp;&nbsp;登录
				</li>
			</router-link>
		</ul>
	</div>
	<el-tooltip
		class="box-item"
		effect="dark"
		content="工单中心，解疑答惑"
		placement="left-start"
	>
		<div class="work-order" @click="orderClick">
			<img src="../assets/work_order/send_order.png" alt="" />
		</div>
	</el-tooltip>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// import { ShoppingCart } from '@element-plus/icons'
import shopStore from '@/store/shop/shop';
import articleStore from '@/store/article_homepage/article';
import { useRouter } from 'vue-router'; // 引入userRouter

let getrouter = reactive({
	go_router: '',
});

// 搜索相关数组
const searchList = reactive({
	page_size: '2',
	page_num: '1',
	desc: true,
	name: '',
});

export default {
	setup() {
		// 获取小仓库
		let searchShop = shopStore();
		let articleSearchSrore = articleStore();
		// 搜集输入框数据
		const inpval = ref('');
		const navItems = ref([]);
		//模拟从后台获取导航栏信息
		const fetchNavItems = () => {
			//这里可以使用异步请求来获取导航栏的数据
			//模拟数据
			const response = [
				{ id: 1, name: '主页', path: '/' },
				{ id: 2, name: '一点文章', path: '/article' },
				{ id: 2, name: '买了个卖', path: '/shop' },
				// { id: 2, name: "发现精彩", path: "/article" },
				// { id: 2, name: "占个位吧", path: "/article" },
				// { id: 2, name: "逛一逛", path: "/article" },
				// { id: 2, name: "瞅瞅别人", path: "/article" },
			];
			navItems.value = response;
		};

		//动态获取导航栏数据
		fetchNavItems();
		const router = createRouter({
			history: createWebHistory(),
			routes: [
				{
					path: '/article',
					component: { template: '<div>Article</div>' },
				},
			],
		});

		// 商品搜索功能
		const shopSearch = (inpval) => {
			searchList.name = inpval;
			searchShop.getsearchCommodity(searchList);
		};
		// 文章搜索功能
		const articleSearch = (inpval) => {
			console.log(inpval);
			articleSearchSrore.getSearchArticle(inpval);
		};
		// 监听输入框变化的函数
		const handleInputChange = (event) => {
			console.log(event);
			inpval.value = event.target.value;
			if (inpval.value == '') {
				searchShop.commodityList(1);
			}
		};

		onMounted(() => {
			// 获取路由
			const router = useRouter();
			console.log(router.currentRoute._rawValue.path);
			getrouter.go_router = router.currentRoute._rawValue.path;
			console.log(getrouter.go_router);
			console.log(getrouter.go_router === '/shop');
		});
		return {
			navItems,
			inpval,
			shopSearch,
			handleInputChange,
			getrouter,
			searchList,
			articleSearch,
		};
	},

	methods: {
		goToRoute(path) {
			this.$router.push(path);
		},
		// 点击后跳转工单中心
		orderClick() {
			// 获取当前登录的用户id
			const userid = localStorage.getItem('uid');
			// 通过判断是否存在用户id来判断当前用户是否登录
			if (userid) {
				const { href } = this.$router.resolve({
					path: '/workpage',
				});
				window.open(href, '_blank');
			} else {
				ElMessage({
					message: '用户未登录，正在跳转登录页面...',
					type: 'warning',
				});
				setTimeout(() => {
					this.$router.push('/login');
				}, 2000);
			}
		},
	},
};
</script>

<style lang="css" scoped>
.app-top-nav {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	z-index: -10;
	min-height: 60px;
	max-height: 50px;
	background-color: #000;
}

.app-top-nav ul {
	display: flex;
	width: 590px;
	display: flex;
	width: 390px;

	line-height: 50px;
	justify-content: space-between;
	line-height: 50px;
	justify-content: space-between;

	margin-left: 20px;
}

.app-top-nav ul li {
	color: #777777;
	z-index: 100;
	color: #f2f2f2;
	z-index: 100;

	height: 35px;
	line-height: 35px;

	padding-right: 8px;
	padding-left: 8px;
	margin-top: 9px;
	border-radius: 13px;
	transition: border-color 0.4s; /* 添加边框颜色过渡效果 */
	position: relative; /* 添加相对定位，用于伪元素的绝对定位 */
	border-bottom: 1px solid #585e58;
}
/* 鼠标悬停状态下 */
.app-top-nav ul li:hover {
	/* ... 其他样式 ... */
	border-color: #fff; /* 添加边框颜色 */
}

/* 鼠标按下状态下 */
.app-top-nav ul li:active {
	/* ... 其他样式 ... */
	border-color: #fff; /* 添加边框颜色 */
}

/* 动态荧光白效果 */
.app-top-nav ul li:hover::before,
.app-top-nav ul li:active::before {
	content: ''; /* 添加伪元素内容 */
	position: absolute;
	top: -2px; /* 控制位置以覆盖边框 */
	left: -2px; /* 控制位置以覆盖边框 */
	right: -2px; /* 控制位置以覆盖边框 */
	bottom: -2px; /* 控制位置以覆盖边框 */
	border: 1px solid transparent; /* 初始边框设置为透明 */
	border-radius: 5px;
	animation: glow 2s infinite; /* 添加动画效果 */
	border-radius: 10px;
}
/* 定义荧光动画 */
@keyframes glow {
	0%,
	100% {
		border-color: #fff;
	}
	50% {
		border-color: transparent;
	}
}

.app-top-nav ul li:hover {
	color: #fff;
}

.app-top-nav ul li a {
	padding: 0 10px;
}

.app-top-nav ul li a:hover {
	color: #e26237;
}

#right {
	width: 356px;
	margin-right: 10px;
}

.search_box {
	vertical-align: center;
	/*这个设定是让盒子的搜索框固定不动*/
	transform: translate(-50%);
	/* 设置背景颜色 */
	background-color: transparent;
	/* 设置图标默认状态下大小，圆形 */
	height: 28px;
	padding: 10px;
	/* 设置圆角 */
	border-radius: 6px;
	padding-top: 5px;
	margin-top: 5px;
	margin-right: -440px;
	width: 400px;
}

.search_text {
	/* 清除默认样式 */
	border: none;

	background: none;
	outline: none;
	float: left;
	padding: 0;
	color: #f2f2f2;
	/* 设置文字样式 */
	font-size: 14px;
	line-height: 36px;
	width: 0;
	/* 动画过渡 */
	transition: 0.5s;
	border-bottom: 1px solid #fff;

	margin-top: -2px;
	margin-left: 4px;
	margin-right: 5px;
	width: 350px;
	padding-left: 10px;
}

/* 先设置默认状态，40px 的黑色圆形搜索框，中心为外网导入的红色 search 图标； */
.search_btn {
	color: #e84118;
	float: right;

	/* 设置默认状态下搜索框样式 */
	width: 32px;
	height: 32px;
	line-height: 32px;
	border-radius: 50%;

	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: 0.5s;
	margin-top: -34px;
}
.work-order {
	z-index: 100;
	position: fixed;
	bottom: 50px;
	right: 30px;
}
.work-order img {
	width: 70px;
	height: 70px;
	border-radius: 50%;
}
.tupian {
	width: 150px;
	height: 50px;
}
.tupian img {
	width: 100%;
	height: 100%;
}
.icon-sousuo {
	color: white;
	padding-top: 17px;
	font-size: 31px;
}
</style>
