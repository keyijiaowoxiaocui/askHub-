<template>
	<div class="left_note w" v-for="(item, index) in items" :key="index">
		<div class="avatar_time">
			<div class="avatar">
				<img :src="item.user.avatar_path" alt="" />
			</div>
		</div>
		<div class="content" v-if="index % 2 !== 0">
			<div class="tranagle"></div>
			<span>
				<router-link
					:to="{
						path: '/OtherUsers/OtherLately',
						query: { OtherUserId: item.id },
					}"
					>{{ item.user.nick_name }}</router-link
				>
				Write Down
				<i>{{ item.releaseDate }}</i>
				<div class="text" @click="click_to_article(index)">
					<p id="timu">{{ item.title }}</p>
					<p id="contentt">
						{{ item.content }}
					</p>
				</div>
			</span>
		</div>
		<!-- 下面是右边盒子的部分 -->
		<!-- <div class="avatar_time">
			<div class="avatar">
				<img :src="item.url" alt="头像" />
			</div>
			<p id="data">{{ item.data }}</p>
		</div> -->
		<div class="content2" v-if="index % 2 == 0">
			<div class="tranagle2"></div>
			<span>
				<router-link
					:to="{
						path: '/OtherUsers/OtherLately',
						query: { OtherUserId: item.id },
					}"
					>{{ item.user.nick_name }}</router-link
				>
				Write Down
				<i>{{ item.releaseDate }}</i>
				<div class="text" @click="click_to_article(index)">
					<p id="timu">{{ item.title }}</p>
					<p id="contentt">
						{{ item.content }}
					</p>
				</div>
			</span>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getHotArticles } from '../api/ArticleApis.js';
export default {
	setup() {
		const router = useRouter();
		const items = ref();
		let article_id = ref('');

		const getArticles = async () => {
			const res = await getHotArticles();

			console.log('这个是大主页文章', res.data.data);
			items.value = res.data.data;
			article_id.value = res.data.data.articleID;
		};
		const click_to_article = (index) => {
			router.push('/article_details/' + items.value[index].articleID);
		};

		onMounted(() => {
			getArticles();
		});

		return {
			items,
			getHotArticles,
			article_id,
			click_to_article,
		};
	},
};
</script>

<style lang="scss" scoped>
.left_note {
	padding-top: 30px;
	//z-index: ;
}

.avatar_time {
	position: relative;
	width: 86px;
	height: 72px;
	background-color: #ecf0f5;
	margin-top: 2px;
	margin-left: auto;
	margin-right: auto;
	z-index: 100;
	padding-top: 5px;
}

.avatar {
	width: 40px;
	height: 40px;
	//background-color: #ec6f6f;
	margin: 10px auto;
	overflow: hidden;
	border-radius: 50%;

	img {
		width: 100%;
		height: 100%;
	}
}

p {
	display: block;
	padding-top: -4px;

	margin-left: -1px;

	//color: #252424;
}

#data {
	text-align: center;
}

.content {
	position: relative;
	width: 522px;

	background-color: #fff;
	//margin-left: -83px;
	//padding-left: -83px;
	margin-top: -72px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
	//z-index: 1;
}

.content:hover {
	cursor: pointer;
}

.content2:hover {
	cursor: pointer;
}

.tranagle {
	display: block;
	width: 0;
	height: 0;

	border: 10px solid;
	/*更改border的宽度即可改变三角的大小*/
	border-color: transparent transparent transparent #fff;

	position: absolute;
	top: 21px;
	left: 522px;

	z-index: 100;
}

span {
	//position: absolute;
	display: block;
	//	background-color: #5696e4;
	margin-left: 15px;
	//margin-top: 13px;
	padding-top: 10px;
	color: black;
}

a {
	font-weight: 700;
	font-size: 16px;
	color: black !important;
}

#timu {
	display: block;
	//position: absolute;
	padding-top: 5px;
	font-size: 18px;
}

#contentt {
	display: block;
	padding: 10px;
	padding-bottom: 20px;
}

.content2 {
	position: relative;
	width: 522px;
	//515px
	background-color: #fff;

	margin-left: 672px;
	margin-top: -72px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.tranagle2 {
	display: block;
	width: 0;
	height: 0;

	border: 10px solid;
	/*更改border的宽度即可改变三角的大小*/
	border-color: transparent #fff transparent transparent;

	position: absolute;
	top: 21px;
	left: -18px;
}
</style>
