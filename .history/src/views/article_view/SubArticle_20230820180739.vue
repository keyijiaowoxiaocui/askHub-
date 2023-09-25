<template>
	<div class="top_nav_wrapper">
		<div class="logo">
			<img
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAjVBMVEUAAADAx8/O0d3Ax8/Fy9TW6//Ax8/Ax8/ByNHFzNXAx8/BydLHzNnAx8/Ax8/Ax8/Ax8/Ax8/Ax8/ByNDCydLBydLDytPAxs/Ax8/Bx8/Ax9DByNDI1NjBx8/ByNDBydHAx8/Ax8/Ax8/Ax9DBx8/ByNDCydHAxs/Ax8/Ax8/Ax8/AyNDAyM/Ax8+/xs5Sz1QlAAAALnRSTlMA+wfvGAPm8zoS2h4O9+DIwpl4aTMtJNSikXBGC11MQOq2r4V/UinNu6piV4zQ37a4wwAAAiFJREFUWMPtmN1yskAMhgOKioBUFAXFItXa/9z/5X0OfmEosRt2JgedKc8ZjOyuyZs3ARgYGPhLuHnmgiLjB8SXANSYTfDKaA9KrByscRKd8GXY8BQqrBdji22oE0Bi9KiS4rg530ZJhEuseStAL8+UYz0lkgq1GAfwuwhdMVM+WHCZx4FkF4s19OZ5ingsJbVHB+jJ+WYFO9Eucg/68I5IQpbsYtdXxsZSC14Q2X+QZGwwg/0Ib0xKK8v/zxk6JHT8eAwWeDmtWIXf9PlE95e2TeswxRvztK1PvBG9gzUpPTz9aOuzhkRth19hDenN+6TrVx9EivzCA3mmFR7G1/Vf6erE9bxZ+p0bWxw9A+OxkchsvaAI3P/dPGXaurvzlkQcUY4uwDh3N0qcH2NTvGGNoTOHFYUCiA9T9nYONjiJQQ3RQbhJlEe8wqYbdpj0fgXkLneDGGvY/NWWUuV3A+s0EvmhMWeuoeZPnsFFZnc8MnJWgitxNl8Gn1vPRN/kFI0TZ26fAYU5u0EiX534m3w7Eb2aK8SgpWMpzW7GjblvB3JoeJXxerTy7UPHBwyOsYJerBfMq5mn2fh220s/PVZsp5brCvCnuKP5FdvLjNCPUkM0BC7bVsfk+UrBGt7TXdb9BQT1svnEnn2rvphXiQiT26rxjY3OqyiRFUovy3RS3bfRSan1waGZMVXwctmrrKdPqhgt0jnVtBa+DwMDA3r8A41Ik44EoNuxAAAAAElFTkSuQmCC"
				alt=""
			/>
		</div>
		<div class="top_nav_right">
			<span class="right_sp">保存成功</span>
			<router-link to="/articleDrafts">
				<el-button plain>草稿箱</el-button>
			</router-link>
			<el-button type="primary" @click="drawerBT"> 发布 </el-button>
			<el-drawer
				v-model="drawer"
				title="I am the title"
				:with-header="false"
			>
				<span class="sub_set">
					<div class="sub_wrapper">
						<span class="sub_text">*文章类别 : </span>
						<div class="set_class">
							<!-- <button :class="{class_active:isActive}" @click="changeButClass">类别1</button> -->
							<button
								v-for="(
									item, index
								) in cateGory.article_cateGory"
								:key="item.categoryId"
								@click="changeButClass(item.categoryId)"
								:class="{ class_active: item.isActive }"
							>
								{{ item.categoryName }}
							</button>
						</div>
					</div>
					<div class="sub_wrapper sub_label">
						<span class="sub_text">*标签 : </span>
						<div class="set_label">
							<el-select
								v-model="form.labelsId"
								multiple
								placeholder="请添加搜索标签"
							>
								<el-option
									v-for="item in options"
									v-show="
										form.category == item.category_id &&
										form.labelsId.length < 3
									"
									:key="item.label_id"
									:label="item.label_name"
									:value="item.label_name"
								/>
							</el-select>
						</div>
					</div>
					<div class="sub_wrapper">
						<span class="sub_text">封面 : </span>
						<div class="subImgWrapper">
							<div class="up_img">
								<el-icon class="avatar-uploader-icon">
									<Plus />
								</el-icon>
								<input
									id="file"
									class="img_input"
									type="file"
									@change="handleFileUpload"
									accept="image/*"
								/>
								<div v-if="uploadImg.uploadedImageUrl">
									<img
										:src="uploadImg.uploadedImageUrl"
										alt="Uploaded Image"
										class="sub_img"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="sub_wrapper">
						<span class="sub_text">*摘要 : </span>
						<div class="summary-box">
							<textarea
								class="summary-textarea"
								v-model="content.articleContent"
								@input="handleInput"
								placeholder="请输入文章内容"
							></textarea>
							<p class="summary-info">
								字数：{{ content.summaryCount }}/{{
									content.maxCount
								}}
								<button type="submit" @click="getContent">
									一键输入
								</button>
							</p>
						</div>
					</div>
					<div class="sub_wrapper">
						<span class="sub_text">*是否公开 : </span>
						<div>
							<el-radio-group v-model="form.publicOrNot">
								<el-radio label="1" border>公 开</el-radio>
								<el-radio label="0" border>不公开</el-radio>
							</el-radio-group>
						</div>
					</div>
					<div class="sub_wrapper">
						<!-- <span class="sub_text">测试 : </span> -->
						<div class="clearSub">
							<el-button type="primary" @click="subArticle(form)">
								确认发布
							</el-button>
						</div>
					</div>
				</span>
			</el-drawer>
			<a href="javascript:;" class="right_a">
				<img
					src="https://p3-passport.byteimg.com/img/mosaic-legacy/3793/3131589739~64x64.awebp"
					alt=""
				/>
			</a>
		</div>
	</div>
	<div class="form_wrapper">
		<form class="form_main" method="post">
			<div class="tit">
				<textarea
					type="text"
					placeholder="请输入标题……"
					v-model="form.title"
					@input="titL"
					@keydown.enter="handleEnterKey"
				>
				</textarea>
			</div>
			<TEditor ref="editor" v-model="state.content" />
		</form>
	</div>
</template>

<script setup>
// 引入富文本组件
import TEditor from '@/components/article/vl-tinymce.vue';
import { onMounted, reactive, toRef, watch, onBeforeUnmount } from 'vue';
import { ref } from 'vue';
import {
	getCategory,
	upload,
	subArticle_a,
	getArticleTag_a,
	saveArticleDraft_a,
	deleteArticleDraftById_a,
} from '@/api/ArticleApis.js';
import { Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';

// 引入userSoure
import userStore from '@/store/user/user.js';
let userstore = userStore();

const drawer = ref(false);

// 点击发布表单验证
const drawerBT = () => {
	if (form.title == '') {
		ElMessage({
			message: '请填写文章题目！',
			type: 'error',
		});
		return false;
	}
	if (form.content == '') {
		ElMessage({
			message: '请填写文章内容！',
			type: 'error',
		});
		return false;
	}
	drawer.value = true;
};

let state = reactive({
	content: '', //获取TEditor的内容
});

watch(
	() => state.content,
	() => {
		//监控TEditor内容的变化
		console.log(state.content);
		form.content = state.content;
	}
);

onMounted(() => {
	// 执行获取文章类别
	getCategory2();
	console.log(userstore.userId);
	form.userId = localStorage.getItem('uid');
	console.log('form.userId', form.userId);
	getArticleTag();

	window.addEventListener('beforeunload', confirmClose);
});

// 发布文章需要的数据
let form = reactive({
	userId: '', //发布人ID
	category: '', //文章类别
	title: '', //文章标题
	briefIntroduction: '', //文章概要
	thumbnail: '', //封面
	content: '', //文章内容
	publicOrNot: '1', //是否公开
	labelsId: [], //文章标签
});

let istit = ref(true);

// 监控标题长度，限制标题
const titL = () => {
	console.log(form.title.length);
	if (form.title.length > 100) {
		form.title = form.title.slice();
	}
};

const editor = ref();
//标题框回车光标定位再文本框
const handleEnterKey = (event) => {
	// //阻止事件行为
	event.preventDefault();
};

// 发布文章
const subArticle = async (form) => {
	if (form.userId == '') {
		await userstore.getUserData();
		form.userId = userstore.userId;
	}
	if (form.category == '') {
		ElMessage({
			message: '请选择文章类别！',
			type: 'error',
		});
		return false;
	}
	if (form.labelsId == '') {
		ElMessage({
			message: '请选择文章标签！',
			type: 'error',
		});
		return false;
	}
	if (form.briefIntroduction == '') {
		ElMessage({
			message: '请填写文章摘要！',
			type: 'error',
		});
		return false;
	}

	console.log(form);

	let formData = jsonToFormData(form);

	subArticle_a(formData).then((res) => {
		console.log(res);
		ElMessage({
			message: '文章发布成功！',
			type: 'success',
		});
	});
};

//循环传入的值转换formData
const jsonToFormData = (config) => {
	const formData = new FormData();
	Object.keys(config).forEach((key) => {
		formData.append(key, config[key]);
	});
	return formData;
};

// 文章类比按钮改变样式
// 获取文章类别
let cateGory = reactive({
	article_cateGory: [],
});
const getCategory2 = () => {
	getCategory().then((res) => {
		res.data.data.map((item) => {
			item.isActive = false;
		});
		cateGory.article_cateGory = res.data.data;
	});
};
const changeButClass = (button_click) => {
	cateGory.article_cateGory.forEach((button) => {
		button.isActive = button.categoryId === button_click;
		if (button.categoryId === button_click) {
			form.category = button.categoryId;
		}
	});
};

// 标签下拉框
const options = ref([]);

// 获取文章标签
const getArticleTag = () => {
	getArticleTag_a().then((res) => {
		options.value = res.data.data;
	});
};

// 封面上传
const uploadImg = reactive({
	uploadedImage: '',
	uploadedImageUrl: '',
});

const handleFileUpload = (event) => {
	const file = event.target.files[0];
	uploadImg.uploadedImage = file;
	uploadimg();
};

const uploadimg = () => {
	if (uploadImg.uploadedImage) {
		const formData = new FormData();
		formData.append('image', uploadImg.uploadedImage);
		console.log('uploadImg.uploadedImage', uploadImg.uploadedImage);
		// 假设有一个用于上传的 API
		// 在这里调用上传 API，将 `formData` 作为参数发送到服务器
		upload(formData).then((res) => {
			console.log(res);
			uploadImg.uploadedImageUrl = res.data.data;
			// console.log(uploadImg.uploadedImageUrl);
			form.thumbnail = uploadImg.uploadedImageUrl;
		});
	}
};

// 摘要
const content = reactive({
	articleContent: '',
	maxCount: 200,
	currentCount: 0,
	summary: '',
	summaryCount: 0,
});

let handleInput = () => {
	content.currentCount = content.articleContent.length;
	if (content.currentCount <= content.maxCount) {
		content.summary = content.articleContent;
		content.summaryCount = content.currentCount;
	} else {
		content.summary =
			content.articleContent.slice(0, content.maxCount - 3) + '...';
		content.summaryCount = content.summary.length;
		content.currentCount = content.summary.length;
		content.articleContent = content.summary;
	}
	form.briefIntroduction = content.summary;
};
// 一键获取摘要
const getContent = () => {
	const div = document.createElement('div');
	div.innerHTML = state.content;
	console.log(div.innerHTML);
	content.articleContent = div.textContent || div.innerText;
	handleInput();
};

// router.beforeEach((to, from) => {
//     // 在这里可以执行一些清理操作或确认操作
//     const shouldLeave = confirm("确定要离开吗？");

//     if (shouldLeave) {
//         // 允许离开
//     } else {
//         return false; // 取消离开
//     }
// })

let draftData = reactive({
	belongUserID: '',
	title: '',
	content: '',
	draftArticleID: '',
});
</script>

<style lang="scss" scoped>
.form_wrapper {
	width: 100%;
	height: 100%;
	border-top: 1px solid #f7f7f7;
	margin-top: 50px;
	padding-top: 20px;
}

.form_main {
	width: 750px;
	margin: 0 auto;
}

.tit {
	padding-bottom: 10px;
}

.tit textarea {
	font-size: 24px;
	width: 100%;
	box-sizing: border-box;
	border: none;
	/* 移除边框 */
	outline: none;
	/* 移除选中时的外边框 */
	box-shadow: none;
	/* 禁止调整大小 */
	resize: none;
	background-color: #fefefe;
	color: #777;
	border-bottom: 1px dotted #ccc;
}

.top_nav_wrapper {
	width: 1000px;
	margin: 0 auto;
	height: 64px;
	display: flex;
	justify-content: space-between;
	line-height: 64px;

	.logo {
		width: 37px;
		height: 37px;
		margin: auto 0;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.top_nav_right {
		width: 300px;
		display: flex;
		justify-content: space-between;

		.right_sp {
			font-size: 14px;
			white-space: nowrap;
			color: #c9cdd4;
			cursor: default;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		.right_a {
			overflow: hidden;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-color: #eee;
			background-position: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			cursor: pointer;
			margin: auto 0;
			text-align: center;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.top_nav_right > .el-button {
	margin: auto 0;
}

// 发布按钮的设置
.sub_set {
	.sub_wrapper {
		display: flex;

		.sub_text {
			font-size: 14px;
			white-space: nowrap;
			color: #c9cdd4;
			cursor: default;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			width: 100px;
		}
	}

	.sub_label {
		margin-bottom: 30px;
	}

	// 设置类别
	.set_class {
		display: flex;
		flex-wrap: wrap;

		button {
			height: 32px;
			padding: 2px 16px;
			font-size: 14px;
			line-height: 22px;
			cursor: pointer;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			margin: auto 0;
			width: 100px;
			margin-left: 10px;
			margin-bottom: 10px;
			border: none;
			background-color: #f4f5f5;
			color: #86909c;
		}

		button:hover {
			background-color: #e5e6eb;
		}

		.class_active {
			background-color: #e8f3ff;
			color: #1d7dfa;
		}
	}

	// 设置标签
	.set_label {
		.el-select {
			// height: 30px !important;
			// margin-top: -5px;
			margin-left: -40px;
		}
	}
}

.summary-box {
	position: relative;
	width: 100%;
}

.summary-textarea {
	width: 100%;
	height: 150px;
	padding: 10px;
	resize: none;
	margin-top: 20px;
	margin-left: -14px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 2px;
	outline: none;
}

.summary-textarea:focus {
	border: 1px solid #409eff;
}

.summary-info {
	width: 300px;
	position: absolute;
	top: 136px;
	left: 105px;
	font-size: 14px;
	color: #888;
}

.summary-info > button {
	margin-left: 5px;
	height: 32px;
	padding: 2px 16px;
	font-size: 14px;
	line-height: 22px;
	cursor: pointer;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	margin: auto 0;
	width: 100px;
	margin-left: 10px;
	margin-bottom: 10px;
	border: 1px solid #ddd;
	background-color: #f4f5f5;
	color: #86909c;
}

.summary-info > button:hover {
	background-color: #e5e6eb;
}

// 上传图片
.up_img {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
	margin: 0;
	width: 150px;
	min-width: 100px;
	min-height: 150px;
	line-height: 1.4;
	font-size: 16px;
	font-weight: 400;
	color: var(--text-color);
	background-color: var(--bg-color);
	direction: ltr;
	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	transition: background-color var(--el-transition-duration-fast);
	text-align: center;
	line-height: 150px;
}

#file {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

.subImgWrapper {
	position: relative;
	margin-left: -40px;
}

.sub_img {
	width: 100%;
	max-width: 150px;
	max-height: 150px;
	position: absolute;
	top: 0;
	left: 0;
}

.clearSub .el-button {
	margin-left: 168px;
}
</style>
