<template>
	<div id="AppBanner">
		<div class="banner">
			<el-carousel
				height="43vw"
				:interval="5000"
				arrow="always"
				class="imgs-wall"
			>
				<el-carousel-item v-for="(item, index) in items" :key="index">
					<a :href="item.page"
						><img :src="item.ImageAddress" alt="热门商品位"
					/></a>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPictures } from '@/api/ArticleApis.js';
export default {
	setup() {
		const items = ref();

		const getMainPicture = async (grade) => {
			const res = await getPictures(grade);
			items.value = res.data.data;
		};
		onMounted(() => {
			getMainPicture(1);
		});

		return {
			items,
			getMainPicture,
		};
	},
};
</script>

<style lang="scss" scoped>
#AppBanner {
	width: 100%;
	.imgs-wall {
		width: 100%;
	}
}
.banner {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.el-carousel__item {
	width: 100% !important;

	img {
		width: 100%;
		height: 100%;
	}
}

.el-carousel__item h3 {
	color: #475669;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
	text-align: center;
}

.el-carousel__item:nth-child(2n) {
	background-color: #79a1d8;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #669ad4;
}
</style>
