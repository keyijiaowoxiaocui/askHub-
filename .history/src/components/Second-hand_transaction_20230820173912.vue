<template>
	<div class="commodity w">
		<h1>猜你喜欢<span class="iconfont icon-guanzhu1"></span></h1>
		<p>个性推荐</p>
		<div class="big_commodity">
			<commodity />
		</div>
	</div>
</template>

<script>
import commodity from '@/components/commodity.vue';
export default {
	components: {
		commodity,
	},
};
</script>

<style lang="scss" scoped>
.commodity {
	padding-bottom: 50px;
}
.big_commodity {
	width: 1170px;
	height: 380px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	padding-top: 20px;
}
h1 {
	display: inline;
	padding-top: 50px;
	padding-left: 50px;
	color: #f2f2f2;
}
p {
	width: 64px;
	height: 20px;
	background-color: #2abd72;
	margin-left: 10px;
	display: inline;
	color: #fff;
	text-align: center;
}
</style>
