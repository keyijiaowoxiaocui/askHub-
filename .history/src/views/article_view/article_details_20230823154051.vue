<template>
	<AppTopNav />

	<div class="position_main w">
		<div class="sidebar_icon">
			<div class="icon center_container" @click="changeColor">
				<span
					:style="{ color: iconColor }"
					class="iconfont icon-xiai"
				></span>
				<div class="number">{{ articleData.likeCount }}</div>
			</div>
			<div class="icon center_container">
				<span class="iconfont icon-pinglun"></span>
				<div class="number">{{ articleData.commentCount }}</div>
			</div>

			<div class="icon center_container" @click="changeColor2">
				<span
					class="iconfont icon-shoucang1"
					:style="{ color: iconColor2 }"
				></span>
				<div class="number">{{ articleData.collectionCount }}</div>
			</div>
			<!-- <div class="icon center_container">
				<span class="iconfont icon-zhuanfa"></span>
			</div> -->
		</div>
		<div class="article_right_column">
			<div class="central">
				<div class="article">
					<div class="article_article">
						<el-breadcrumb class="icondetials_header">
							{{ articleData.title }}
						</el-breadcrumb>

						<div class="author_time_read">
							<span class="author" commodity>
								<!-- {{ articleData.nick_name }} -->
							</span>
							<span class="time">
								{{ articleData.releaseDate }}
							</span>
							<!-- <span class="read"
									><span
										class="iconfont icon-zhengkaiyanjing"
									></span
									>&nbsp;3333</span
								> -->
						</div>
						<div class="content">
							<div v-html="articleData.content"></div>
						</div>
						<div class="tag_list">
							<span class="list_title">标签:</span>
							<div class="tag_list_container">
								<span
									v-for="item in articleData.labelsId"
									:key="item.id"
									>vue
								</span>
							</div>
						</div>
					</div>
				</div>

				<!-- <div class="commodity_recommendation">
						<span class="title">商品推荐</span>
						<div class="commodity">
							<div class="commodity1">
								<div class="image">
									<img src="https://gw.alicdn.com/bao/uploaded/i2/4087729500/O1CN01JG4Pyx2K33Rs1PykF_!!0-item_pic.jpg_300x300q90.jpg_.webp"
										alt="图片" />
								</div>
								<div class="commodity_name_price">
									<div class="commodity_title_box">
										<span class="commodity_title"
											>到底是谁动了我的网页？？？？？？？iam
											a queencard ？？？u wanna be a
											queencard？？？？</span
										>
									</div>
									<span>神三元</span>
									<span class="buy_people">234购买</span>
									<div class="commodity_price">￥88</div>
								</div>
							</div>
							<div class="commodity1">
								<div class="image">
									<img src="https://gw.alicdn.com/bao/uploaded/i2/4087729500/O1CN01JG4Pyx2K33Rs1PykF_!!0-item_pic.jpg_300x300q90.jpg_.webp"
										alt="图片" />
								</div>
								<div class="commodity_name_price">
									<div class="commodity_title_box">
										<span class="commodity_title"
											>到底是谁动了我的网页？？？？？？？iam
											a queencard ？？？u wanna be a
											queencard？？？？</span
										>
									</div>
									<span>神三元</span>
									<span class="buy_people">234购买</span>
									<div class="commodity_price">￥88</div>
								</div>
							</div>
						</div>
					</div> -->
				<!-- 这部分是评论功能 -->
				<div class="comment">
					<comment2 />
				</div>
			</div>
			<div class="right_sidebar">
				<div class="author_information">
					<a href="javascript:;" class="user_item">
						<div class="avatar">
							<img :src="userData.avatar_path" alt="头像" />
						</div>
						<div class="name_box">
							<span class="name_box_name">
								{{ userData.nick_name }}
							</span>
							<!-- <div class="people_title">
									{{ articleData.category }}
								</div> -->
						</div>
					</a>
					<div class="operate_btn" v-if="usId != author_id">
						<button
							v-if="!isFollowed"
							class="follow_btn"
							@click="follow"
						>
							关注
						</button>
						<button v-else class="follow_btn2" @click="noFollow">
							已关注
						</button>
						<a href="javascript:;" class="link_message">
							<div class="private_message">私信</div>
						</a>
					</div>
					<div class="thumb">
						<span class="content"
							><span class="iconfont icon-follow"></span
							>&nbsp;获得点赞&nbsp;<span class="count">
								{{ articleData.likeCount }}
							</span></span
						>
					</div>
					<div class="read">
						<span class="read_read"
							><span class="iconfont icon-shoucang2"></span
							>&nbsp;文章被收藏&nbsp;<span class="count">
								{{ articleData.collectionCount }}
							</span></span
						>
					</div>
				</div>

				<div class="catalog"></div>
			</div>
		</div>
	</div>
</template>

<script>
import AppTopNav from '@/components/AppTopNav.vue';
import {
	ref,
	reactive,
	onMounted,
	nextTick,
	onBeforeUnmount,
	watch,
	onBeforeMount,
} from 'vue';
import {
	getArticleDetails,
	getLikeorNot,
	getCollection,
} from '@/api/ArticleApis';
import articleStore from '@/store/article_homepage/article';

import { upload } from '@/api/ArticleApis.js';
import { getUserData_a, getFollow, cancelFollow } from '@/api/UserApis.js';

//import recommend_newestVue from '@/components/classification/recommend_newest.vue';

import { useRoute } from 'vue-router';
import comment2 from '@/components/comment2.vue';
export default {
	components: {
		AppTopNav,
		//recommend_newestVue,
		comment2,
	},
	setup() {
		//获取当前是否关注
		let isFollowed = ref(false);
		// 文章数据
		let articleData = ref({});
		// 用户数据
		let userData = ref({});
		// 文章id
		let articleID = ref('');
		const route = useRoute();
		let classColumn = articleStore();
		//使用者的id也就是我
		let usId = ref('');
		//这是文章id
		let artId = ref('');
		// 这是作者的id
		let author_id = ref('');
		let obj_obj = reactive({ self_id: '', other_id: '' });
		//关注和取消关注
		const follow = async () => {
			obj_obj.self_id = usId.value;
			obj_obj.other_id = author_id.value;
			console.log(
				'看一下能不能获得id usId.value,author_id.value',
				usId.value,
				author_id.value
			);
			await getFollow(obj_obj);
			isFollowed.value = true;
			console.log('isFollowed', isFollowed.value);
		};
		//用户取消关注
		const noFollow = async () => {
			obj_obj.self_id = usId.value;
			obj_obj.other_id = author_id.value;
			await cancelFollow(obj_obj);
			isFollowed.value = true;
			console.log('isFollowed', isFollowed.value);
		};
		const iconColor = ref('');
		const iconColor2 = ref('');
		const changeColor = () => {
			console.log('usId.value', usId.value);
			console.log('articleID.value', articleID.value);
			getLikeorNot(usId.value, articleID.value).then((res) => {
				console.log('res.data.message', res.data.message);
				if (res.data.message === '取消点赞成功') {
					iconColor.value = 'white';
					articleData.value.likeCount--;
					articleData.value.isLike = false;
				} else if (res.data.message === '点赞成功') {
					iconColor.value = 'red';
					articleData.value.likeCount++;
					articleData.value.isLike = true;
				}
				getArticleDetails(articleID.value, usId.value).then((res) => {
					console.log('hahaaha', res.data.data);
				});
			});
		};
		//收藏
		const changeColor2 = () => {
			getCollection(usId.value, articleData.value.articleID).then(
				(res) => {
					if (res.data.message === '取消收藏成功') {
						iconColor2.value = 'white';
						articleData.value.isCollection = false;
						articleData.value.collectionCount--;
					} else if (res.data.message === '收藏成功') {
						iconColor2.value = 'red';
						articleData.value.collectionCount++;
						articleData.value.isCollection = true;
					}
					console.log('res.data.message', res.data.message);
					getArticleDetails(articleID.value, usId.value).then(
						(res) => {
							console.log('hahaaha', res.data.data);
						}
					);
				}
			);
		};
		const activeName = ref('tab0');
		const scroll = ref(0);
		const navList = ref([]);
		const tabPosition = ref('right');
		//处理标签点击事件
		const handleClick = (tab, event) => {
			jump(tab.index);
		};
		//监听滚动事件，更新滚动距离
		const dataScroll = () => {
			scroll.value =
				document.documentElement.scrollTop || document.body.scrollTop;
		};
		// 跳转到指定标题位置
		const jump = (index) => {
			const jump = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
			const total = jump[index].offsetTop - 100;

			window.scrollTo({
				top: total,
				behavior: 'smooth', // 可选，添加平滑滚动效果
			});
		};
		// 监听滚动距离的变化，根据滚动位置更新活动选项
		const loadScroll = () => {
			for (let i = navList.value.length - 1; i >= 0; i--) {
				if (scroll.value >= navList.value[i].offsetTop - 120) {
					activeName.value = 'tab' + i;
					break;
				}
			}
		};
		// 收集所有标题，并设置样式
		const selectAllTitle = () => {
			const title = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
			navList.value = Array.from(title).map((item) => {
				item.name = item.innerHTML;
				item.name = item.name.slice(0, 18) + '...';
				const index = item.localName.indexOf('h');
				item.lev =
					'lev' +
					item.localName.substring(index + 1, item.localName.length);
				return item;
			});
		};
		// 监听滚动距离的变化，更新活动选项
		watch(scroll, loadScroll);

		// 调整不同级别标题的样式
		onMounted(() => {
			articleID.value = route.params.articleID;
			console.log('hahhaha', articleID.value);
			usId.value = localStorage.getItem('uid');
			// classColumn.articleDetails(items.obj.articleID);
			getArticleDetails(articleID.value, usId.value).then((res) => {
				console.log('res', res);
				articleData.value = res.data.data;
				author_id.value = res.data.data.belongUserID;
				console.log(
					'这是这篇文章的数据articleData.value',
					articleData.value
				);
				userData.value = res.data.data.user;
				console.log('这是用户的数据可以拿得到吗', userData.value);
				console.log(
					'看能否拿到本地存储的uid',
					localStorage.getItem('uid')
				);
				console.log('文章作者idauthor_id', author_id.value);

				if (res.data.data.isLike) {
					iconColor.value = 'red';
				} else {
					iconColor.value = 'white';
				}
				if (res.data.data.isCollection) {
					iconColor2.value = 'red';
				} else {
					iconColor2.value = 'white';
				}
				if (res.data.data.isUserFollow) {
					isFollowed.value = true;
				} else {
					isFollowed.value = false;
				}
			});
			setTimeout(() => {
				const navs = document.querySelectorAll('.el-tabs__item');
				for (let i = navs.length - 1; i >= 0; i--) {
					const nav = document.querySelector('#' + navs[i].id);
					nav.style.padding = '0';
					const level = navList.value[i].lev;
					if (level === 'lev1') {
						nav.style.paddingLeft = '0px';
					} else if (level === 'lev2') {
						nav.style.paddingLeft = '10px';
					} else if (level === 'lev3') {
						nav.style.paddingLeft = '30px';
					} else if (level === 'lev4' || level === 'lev5') {
						nav.style.paddingLeft = '55px';
						nav.style.fontWeight = '400';
					}
				}
			});
			//这里为什么控制台会一直跳
			//changeColor();

			// 添加滚动事件监听
			window.addEventListener('scroll', dataScroll);
			// 收集标题并设置样式
			selectAllTitle();
		});

		let data = ref({});

		onBeforeUnmount(() => {
			window.removeEventListener('scroll', dataScroll);
		});
		return {
			data,
			tabPosition,
			handleClick,
			activeName,
			scroll,
			navList,
			dataScroll,
			iconColor,
			changeColor,
			artId,
			usId,
			articleData,
			userData,
			iconColor2,
			changeColor2,
			follow,
			noFollow,
			isFollowed,
			author_id,
			obj_obj,
		};
	},
};
</script>

<style lang="scss" scoped>
.sidebar_icon {
	position: fixed;

	float: left;
	width: 48px;
	height: 429px;

	border-radius: 4px;
	margin-left: -15px;

	.icon {
		position: relative;
		width: 46px;
		height: 46px;
		border-radius: 50%;
		background-color: #000;
		margin-top: 32px;
		color: white;

		.iconfont {
			font-size: 26px;
		}

		.number {
			position: absolute;
			background-color: #2abd72;
			top: 0;
			left: 75%;
			border-radius: 9px;
			font-size: 11px;
			text-align: center;
			white-space: nowrap;
			color: #fff;
			height: 17px;
			width: 33px;
		}
	}

	.center_container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.article_right_column {
	position: relative;
	margin-left: 58px;
	width: 1140px;
	height: auto;
	//background-color: teal;
	border-radius: 4px;
}

.central {
	width: 820px;
	height: auto;
	//background-color: violet;
	border-radius: 4px;
	padding-top: 20px;

	.article {
		//	margin-top: 10px;
		width: 820px;
		//height: 500px;

		//background-color: #74759b;
		border-radius: 4px;
		box-sizing: border-box;
		box-shadow: 0 0 10px #585e58;

		.article_article {
			width: 790px;

			margin: 15px;
			//margin-top: 20px;

			box-sizing: border-box;

			//background-color: rgba(52, 213, 132, 0.654);
			h1 {
				//	margin: 0 0 1.667rem;
				//font-size: 2.667rem;
				font-weight: 600;
				line-height: 1.31;
				color: #252933;
				margin-top: 10px;
				padding-right: 10px;
			}

			.author_time_read {
				margin-top: 19px;
				width: 756px;
				height: 24px;
				//background-color: violet;
				display: flex;
				min-width: 0;
				flex-grow: 1;

				.author {
					display: inline-block;
					vertical-align: top;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 14px;
					font-weight: 500;
					padding-right: 10px;
				}

				.time,
				.read {
					padding-right: 10px;
					color: #8a919f;
				}
			}

			.tag_list {
				margin-top: 20px;
				width: 756px;
				height: 44px;
				display: flex;
				align-items: flex-start;
				flex-wrap: nowrap;

				.tag_list_container {
					margin-top: -8px;
					margin-left: 5px;
					//width: 52px;
					height: 32px;
					//background-color: #f7f8fa;
					border-radius: 4px;
					vertical-align: center;
					line-height: 32px;
					text-align: center;
				}
			}
		}
	}

	.commodity_recommendation {
		width: 820px;
		height: 226px;
		background-color: #fff;
		box-sizing: border-box;
		margin-top: 20px;
		border-radius: 4px;
	}

	.commodity_recommendation .title {
		display: block;
		font-size: 18px;
		font-weight: 600;
		line-height: 30px;
		//margin-bottom: 12px;
		padding-top: 18px;
		padding-left: 37px;
	}

	.commodity {
		width: 756px;
		height: 148px;
		//background-color: slategray;
		display: grid;
		grid-template-columns: repeat(2, 370px);
		grid-gap: 16px;
		margin-left: 30px;
		margin-top: 8px;

		//margin-bottom: 20px;
		.commodity1 {
			width: 370px;
			height: 148px;
			background-color: #fff;
			border-radius: 4px;
			display: flex;
			flex-direction: row;
			width: 370px;
			border: 1px solid #e4e6eb;
			border-radius: 4px;
			box-sizing: border-box;
			padding: 16px;
			cursor: pointer;
			overflow: hidden;
		}

		.commodity1 .image {
			width: 80px;
			height: 112px;
			background-color: rgb(61, 96, 194);

			img {
				display: block;
				height: 100%;
				width: 100%;
				//object-fit: contain;
			}
		}

		.commodity_name_price {
			width: 245px;
			height: 112px;
			//background-color: tomato;
			margin-left: 5px;

			.commodity_title_box {
				font-weight: 500;
				font-size: 16px;
				line-height: 24px;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				margin-bottom: 8px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.commodity_title {
				font-weight: 500;
				font-size: 16px;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				margin-bottom: 8px;
			}

			.commodity_price {
				color: #f64242;
				font-size: 16px;
				font-weight: 500;
				line-height: 24px;
				width: 170px;
				cursor: pointer;
				margin-top: 12px;
			}

			.buy_people {
				margin-left: 141px;
				font-size: 12px;
				color: #8a919f;
			}
		}
	}
}
.comment {
	width: 820px;
	box-shadow: 0 0 10px #585e58;
	border-radius: 4px;
	max-width: 1140px;
	position: relative;
	margin: 20px auto;
	.comment_form {
		//background-color: wheat;
		display: flex;
		position: relative;
		padding-top: 10px;
		border-radius: 2px;
		flex-direction: column;
		word-break: break-word;
		margin-left: 20px;
		.header {
			margin-bottom: 30px;
			.header_title {
				font-size: 18px;
				line-height: 30px;
				font-weight: 600;
			}
		}
		.content {
			display: flex;
			align-items: flex-start;
			.avatar_avatar {
				margin-right: 16px;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				//background-color: red;
				.avatar_img {
					border-radius: 50%;
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.form_box {
				flex: 1 1 auto;
				position: relative;
				.auth_card {
					position: relative;
					margin-right: 20px;
					.input_box {
						//font-size: 0;
						transition: all 0.3s;
						background-color: rgb(239, 201, 194);
						border: 1px solid transparent;
						border-radius: 4px;
						position: relative;
						z-index: 100;

						.rich_input {
							position: relative;
							padding: 8px 12px;
							outline: none;
							min-height: 64px;
							line-height: 22px;
							font-size: 14px;
							resize: both;
						}
					}
				}
				.action_box {
					display: flex;
					align-items: center;
					margin-top: 8px;
					padding-right: 40px;
					.emoji_container {
						position: relative;
						z-index: 1;
						.emoji_box {
							display: flex;
							align-items: center;
							position: relative;
							cursor: pointer;
							span {
								font-size: 13px;
								color: #515767;
							}
						}
					}
					.submit {
						flex: 0 0 auto;
						margin-left: auto;
						padding-right: 10px;
						span {
							font-size: 14px;
							line-height: 22px;
							letter-spacing: 0.2px;
							color: #515767;
							margin-right: 16px;
						}
						button {
							background: #abcdff;
							flex: 0 0 auto;
							margin-left: auto;
							width: 92px;
							text-align: center;
							font-size: 14px;
							line-height: 36px;
							border-radius: 4px;
							color: #fff;
							padding: 0;
							cursor: pointer;
							border: none;
						}
					}
				}

				.login_guide {
					width: 699px;
					height: 64px;
					background-color: #f2f3f5;
					position: absolute;
					top: 0;
					left: 0;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					font-size: 15px;
					font-weight: 400;
					border-radius: 4px;
					.login_guide_button {
						color: #1e80ff;
						font-weight: 500;
						cursor: pointer;
						margin: 0 4px;
					}
				}
			}
		}
	}
	.comment_list_wrapper {
		padding: 40px 0 0px;
		//background-color: steelblue;
		margin-left: 20px;
		.title {
			position: relative;
			line-height: 30px;
			font-weight: 600;
			font-weight: 18px;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 8px;
		}
		.list {
			.comment {
				display: flex;
				padding: 16px 0;
				width: 800px;
				//background-color: violet;
				.user_popover {
					//align-items: unset; 用于将 align-items 属性重置为默认值，以便修改或恢复元素在弹性容器中的交叉轴对齐方式。
					align-items: unset;
					.user_link {
						margin: 0 0 auto;
						.jj_avatar {
							background-color: seagreen;
						}
					}
				}
				.content_box {
					flex: 1 1 auto;
					margin-left: 16px;

					max-width: calc(100% - 48px);
					.comment_main {
						position: relative;
						.delete {
							position: absolute;
							right: 20px;
							bottom: 0;
							font-size: 14px;
							line-height: 22px;
							text-align: center;
							color: #f64242;
							cursor: pointer;
							z-index: 9;
							//这个是只有作者才能看得见的页面
							//display: none;
						}
						.user_box {
							display: flex;
							align-items: center;
							.popover_box {
								align-items: unset;
								.username {
									display: flex;
									align-items: center;
								}
								time {
									background-color: turquoise;
									margin-left: auto;
									font-size: 14px;
									line-height: 22px;
									color: #8a919f;
								}
							}
						}
						.content {
							display: -webkit-box;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
						}
						.limit_btn {
							margin-top: 8px;
							cursor: pointer;
							font-size: 14px;
							line-height: 22px;
							color: #1e80ff;
						}
						.action_box {
							display: flex;
							align-items: center;
							margin-top: 8px;
							.action_left {
								flex: 0 0 auto;
								display: flex;
								align-items: center;
							}
						}
					}
					.subcomment_wrapper {
						//overflow-y: scroll;
						word-break: break-word;
						background-color: #6695f5;
						border-radius: 4px;
						//用于控制用户是否能够选择元素中的文本。当将该属性设置为none时，用户将无法选中元素中的文本内容。
						//user-select: none;
						margin-right: 20px;
						.sub_comment_list {
							margin-top: 16px;
							//margin-right: 10px;
							padding: 16px 8px;
							//background-color: red;
							border-radius: 4px;
							.sub_comment.user_link {
								flex: 0 0 auto;
							}
						}
					}
				}
			}
		}
	}
}

.related {
	width: 820px;
	//height: 1000px;
	background-color: #fff;
	border-radius: 4px;
	margin-top: 20px;
	padding-bottom: 30px;
	.related_title {
		display: inline-block;
		font-size: 16px;
		font-weight: 600;
		line-height: 20px;
		padding: 16px 20px 12px;
	}
	.center_recommend_article {
		//background-color: violet;
		width: 820px;
		margin: 0 auto;
		//margin-left: 20px;
	}
}
.component {
	width: 800px;
	//height: 800px;
	//background-color: thistle;
	margin: 0 auto;
	margin-top: -12px;
	//margin-bottom: 30px;
	.articles {
		width: 800px;

		//height: 1000px;

		background-color: #fff;

		border-radius: 4px;

		margin-top: 15px;

		display: flex;

		flex-direction: column;
	}

	.article1 {
		width: 780px;

		height: auto;

		//background-color: greenyellow;
		margin: 0 auto;
		border-top: 1px solid #e4e6eb;
	}

	.entry {
		width: 680px;

		height: 159px;

		//background-color: green;

		//margin: 0 auto;

		margin-top: 12px;

		display: flex;
		flex-direction: column;
		margin-left: 11px;
		//background-color: rgb(43, 65, 144);
	}
	.top_content {
		background-color: #fff;
		display: flex;
		flex-direction: row;
		.name,
		.data,
		.span {
			//background-color: blue;
			margin-left: 10px;
			color: #515767;
			font-size: 13px;
			height: 25px;
		}
		.name,
		.data {
			border-right: 1px solid #dfd7d775;
			padding-right: 20px;
		}
	}
	.span a {
		margin-right: 5px;
	}
	.container {
		background-color: grey;
	}

	.content_main {
		//background-color: #eb4a4a;
		display: flex;
		flex-direction: column;
		//flex-direction: row;
		//background-color: red;
		width: 760px;
		flex: 1;
		margin-right: 5px;
		//border-bottom: 1px solid #e4e6eb;
	}

	.title {
		font-weight: 600;
		font-size: 16px;
		color: #252933;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 8px;
	}

	.content_main ul {
		display: flex;
		flex-direction: row;
		padding-bottom: 4px;
		height: 20px;
	}
	.content_main ul li {
		margin-right: 20px;
		box-sizing: border-box;
		vertical-align: center;
		color: #515767;
	}
	.content_main ul li:hover {
		color: blue;
	}

	.container_bottom {
		//background-color: rgb(231, 182, 182);
		height: 82px;
		width: 760px;
		display: flex;
	}

	.img_box {
		width: 120px;
		height: 80px;
		background-color: green;
		border-radius: 4px;

		img {
			width: 120px;
			height: 80px;
		}
	}
	.container_bottom .content_content {
		//background-color: green;
		margin-top: 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: center;
		color: #515767;
		vertical-align: center;
		height: 0 auto;
		line-height: 59px;
		//margin-top: 15px;
	}
}
.right_sidebar {
	position: sticky;
	position: absolute;
	top: 20px;
	right: 0;
	width: 300px;
	height: auto;
	box-shadow: 0 0 5px #585e58;
	/* 调整阴影大小和颜色透明度 */
	border-radius: 4px;
}

.author_information {
	width: 300px;
	height: 211px;
	//background-color: tomato;
	border-radius: 4px;

	.user_item {
		padding-bottom: 10px;
		padding-top: 13px;
		padding-left: 8px;
		display: flex;
		align-items: center;
		//background-color: violet;
		border-radius: 4px;

		.avatar {
			display: inline-block;
			position: relative;
			box-sizing: border-box;
			flex: 0 0 auto;
			width: 48px;
			height: 48px;
			border-radius: 50%;
			background-color: whitesmoke;

			img {
				//border-radius: 50%;
				width: 100%;
				height: 100%;
				//object-fit: cover;
				//background-color: yellowgreen;
				overflow: hidden;
			}
		}

		.name_box {
			visibility: visible;
			flex: 1 1 auto;
			min-width: 0;
			margin-left: 10px;

			.name_box_name {
				max-width: 128px;
				display: inline-block;
				vertical-align: top;
				text-overflow: hidden;
				white-space: nowrap;
				font-size: 18px;
				font-weight: 500;
				line-height: 22px;
			}

			.people_title {
				margin-top: 4px;
				font-size: 14px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: 400;
				line-height: 22px;
				color: #f2f2f2;
			}
		}
	}

	.operate_btn {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		margin-top: 7px;

		.follow_btn {
			border-radius: 4px;
			width: 122px;
			font-size: 14px;
			justify-content: center;
			padding: 7px 20px;
			background-color: #2abd72;
			margin-left: 16px;
			border: none;
			color: white;
		}

		.follow_btn2 {
			border-radius: 4px;
			width: 122px;
			font-size: 14px;
			justify-content: center;
			padding: 7px 20px;
			background-color: #41da8b;
			margin-left: 16px;
			border: none;
			color: white;
		}

		.private_message {
			font-size: 14px;
			box-sizing: border-box;
			display: flex;
			width: 122px;
			height: 36px;
			background: rgba(30, 128, 255, 0.05);
			border: 1px solid #41da8b;
			border-radius: 4px;
			color: #2abd72;
			justify-content: center;
			align-items: center;
			margin-left: 22px;
		}
	}

	.thumb,
	.read {
		margin-top: 17px;
		display: flex;
		align-items: center;
		margin-left: 23px;

		.read_read,
		.content {
			font-size: 16px;
		}
		.icon-xiai,
		.icon-zhengkaiyanjing {
			font-size: 20px;
		}
	}
}

.related_articles {
	width: 300px;
	//height: 406px;
	//background-color: rgb(239, 155, 0);
	border-radius: 0 0 4px 4px;

	.block_title {
		padding: 10px 0 0;
		margin: 10px 20px;
		font-size: 17px;
		line-height: 16px;
		font-weight: 500;
		//background-color: red;
	}

	.block_body {
		padding-top: 14px;
		padding-left: 20px;
	}

	.entry_list {
		padding-bottom: 20px;

		.item {
			display: block;
			margin-bottom: 20px;

			//height: 57px;
			.entry_title {
				line-height: 22px;
				font-size: 16px;
				font-weight: 400;
			}

			.entry_title:hover {
				color: #41da8b;
			}

			.entry_meta_box {
				margin-top: 4px;

				.entry_meta {
					display: inline-block;
					font-size: 14px;
					line-height: 22px;
					font-weight: 400;
					color: #f2f2f2;
				}
			}
		}
	}
}

.catalog {
	position: sticky;
	/**/
	top: 20px;
	left: 69%;

	width: 300px;
	//height: 391px;
	//background-color: thistle;
	border-radius: 4px;
	//margin-bottom: 100px;
}

.avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.item {
	display: flex;
	align-items: center;
	margin-right: 16px;
	line-height: 22px;
	font-size: 14px;
	cursor: pointer;
	color: #515767;
}

.center_container {
	background-color: #000;
}

.content {
	color: #f2f2f2;
}

.read {
	color: #f2f2f2;
}

.icondetials_header {
	padding-top: 10px;
	font-size: 20px;
	font-weight: bold;
	color: #f2f2f2;
}

.list_title {
	color: #f2f2f2;
}

.tag_list_container {
	color: #f2f2f2;
}

.name_box {
	color: #f2f2f2;
}
</style>
