<template>
	<!-- 1.顶部通栏  -->
	<AppTopNav />
	<!-- 二级路由 -->
	<router-view></router-view>
	<!-- 2.主体区域 -->
	<!-- 主题部分中的原创写手部分 -->
	<Recommend_user />
	<SecondHand_transaction />
	<Mood_Notes />
	<!-- 3.底部区域 -->

	<footer_bottom />
</template>

<script>
import AppTopNav from '@/components/AppTopNav.vue';
import Recommend_user from '@/components/Recommend_user';
import SecondHand_transaction from '@/components/Second-hand_transaction';
import Mood_Notes from '@/components/Mood_ notes.vue';
import footer_bottom from '@/components/footer_bottom.vue';
export default {
	//注册组件
	components: {
		AppTopNav,
		Recommend_user,
		SecondHand_transaction,
		Mood_Notes,
		footer_bottom,
	},
};
</script>

<style lang="scss" scoped></style>
