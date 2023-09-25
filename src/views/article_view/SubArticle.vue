<template>
	<div class="sub_wrapper">
		<div class="top_nav_wrapper">
			<div class="logo">
				<img src="https://askhub-v1-1317893442.cos.ap-beijing.myqcloud.com/askhub/14629076786483200.png" alt="" />
			</div>

			<div class="top_nav_right">
				<router-link to="/articleDrafts">
					<button class="Mbutton" plain>草稿箱</button>
				</router-link>

				<button class="Mbutton" type="primary" @click="drawerBT">
					发布
				</button>

				<el-drawer v-model="drawer" :with-header="false">
					<span class="sub_set">
						<div class="sub_wrapper">
							<span class="sub_text">*文章类别 : </span>

							<div class="set_class">
								<!-- <button :class="{class_active:isActive}" @click="changeButClass">类别1</button> -->

								<button v-for="item in cateGory.article_cateGory" :key="item.categoryId"
									@click="changeButClass(item.categoryId)" :class="{ class_active: categoryid == item.categoryId }">
									{{ item.categoryName }}
								</button>
							</div>
						</div>

						<div class="sub_wrapper sub_label">
							<span class="sub_text">*标签 : </span>

							<div class="set_label">
								<el-select v-model="form.labelsId" multiple placeholder="请添加搜索标签">
									<el-option v-if="options.length > 0" v-for="item in options" v-show="categoryid == item.category_id &&
										form.labelsId.length < 3
										" :key="item.label_id" :label="item.label_name" :value="item.label_id" />
								</el-select>
								<span class="sub_labelNum">{{ form.labelsId.length }}/3</span>
							</div>
						</div>

						<div class="sub_wrapper">
							<span class="sub_text">封面 : </span>

							<div class="subImgWrapper">
								<div class="up_img">
									<el-icon class="avatar-uploader-icon">
										<Plus />
									</el-icon>

									<input id="file" class="img_input" type="file" @change="handleFileUpload"
										accept="image/*" />

									<div v-if="uploadImg.uploadedImageUrl">
										<img :src="uploadImg.uploadedImageUrl" alt="Uploaded Image" class="sub_img" />
									</div>
								</div>
								<div class="clearSub2">
									<el-button type="primary" @click="reUpload">
										重新上传
									</el-button>
								</div>
							</div>

						</div>

						<div class="sub_wrapper">
							<span class="sub_text">*摘要 : </span>

							<div class="summary-box">
								<textarea class="summary-textarea" v-model="content.articleContent" @input="handleInput"
									placeholder="请输入文章内容"></textarea>

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

				<a href="javascript:;" class="right_a" @click="toMy">

					<headPortrait :useravatar='useravatar' />

				</a>
			</div>
		</div>

		<div class="form_wrapper">
			<form class="form_main" method="post">
				<div class="tit">
					<input type="text" placeholder="请输入标题……" v-model="form.title" @input="titL"
						@keydown.enter="handleEnterKey" />
				</div>

				<TEditor ref="editor" :modelValue=richTextContent v-model="state.content" />
			</form>
		</div>

	</div>
</template>

<script setup>
// 引入富文本组件

import TEditor from '@/components/article/vl-tinymce.vue';

import {
	onMounted,
	reactive,
	toRef,
	watch,
	onBeforeUnmount,
	watchEffect,
} from 'vue';

import { ref } from 'vue';

import {
	getCategory,
	upload,
	subArticle_a,
	getArticleTag_a,
	saveArticleDraft_a,
	getArticleDraftById_a,
	deleteArticleDraftById_a,
	getArticleDetails,
	modifyArticle_a
} from '@/api/ArticleApis.js';
import { getUserData_a } from '@/api/UserApis.js'
import { Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import headPortrait from '@/components/user/headPortrait.vue';
// 引入userSoure
import userStore from '@/store/user/user.js';
import router from '@/router';
let userstore = userStore();
const drawer = ref(false);
const route = useRoute();
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

// 文章类别id
let categoryid = ref('-1')

let richTextContent = ref('');

// 本用户id
const useravatar = ref('')

onMounted(() => {
	options.value = [1,2]
	console.log('youmeiyou', route.query.articleId);
	// 执行获取文章类别
	getCategory2();

	form.belongUserID = localStorage.getItem('uid');

	// 获取用户信息
	getUserData_a(form.belongUserID).then(res => {
		let data = res.data.data
		useravatar.value = data.avatar_path;
	})

	// 获取文章标签
	getArticleTag();

	// 获取文章编辑
	if (route.query.articleId) {
		let id = route.query.articleId;
		getArticleDetails(id,localStorage.getItem('uid')).then((res) => {
			let data = res.data.data;
			form.title = data.title;
			console.log('data.content', data);
			form.content = data.content;
			// form.category = data.category;
			// form.briefIntroduction = data.briefIntroduction;
			// form.thumbnail = data.thumbnail;
			// form.publicOrNot = data.publicOrNot ? 1 : 0;
			// form.labelsId = data.labelsId;
			richTextContent.value = data.content;
		});
	}

	// 获取草稿
	if (localStorage.getItem('draftId')) {
		let id = localStorage.getItem('draftId');
		getArticleDraftById_a(id).then((res) => {
			let data = res.data.data;
			draftData.draftArticleID = data.draftArticleID;
			form.title = data.title;
			// console.log('data.content', data.content);
			form.content = data.content;
			richTextContent.value = data.content;
		});

		localStorage.setItem('draftId', '');
	}


	// window.addEventListener('beforeunload', e => beforeunloadHandler(e))

	// window.addEventListener('unload', e => unloadHandler(e))
});

let form = reactive({
	belongUserID: '', //发布人ID

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

	if (form.title.length > 80) {
		form.title = form.title.slice(0, 80);
	}
};

// 创建一个引用来存储 editor 实例
const editor = ref(null);
//标题框回车光标定位再文本框

const handleEnterKey = (event) => {
	// //阻止事件行为
	if (event.key === 'Enter') {
		event.preventDefault();
	}
};

// 发布文章
const subArticle = async (form) => {
	if (form.belongUserID == '') {
		await userstore.getUserData();

		form.belongUserID = userstore.belongUserID;
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

	const formData = new FormData();
	formData.append('category', form.category);
	formData.append('title', form.title);
	formData.append('briefIntroduction', form.briefIntroduction);
	formData.append('thumbnail', form.thumbnail);
	formData.append('content', form.content);
	formData.append('publicOrNot', form.publicOrNot);
	form.labelsId.forEach((hobby, index) => {
		// console.log('hobby', hobby);
		// console.log('index', index);
		formData.append('labelsId', hobby);
	});

	if (route.query.articleId) {
		// 更新文章
		formData.append('articleID', route.query.articleId);

		modifyArticle_a(formData).then((res) => {
			console.log(res);

			ElMessage({
				message: '文章编辑成功！',
				type: 'success',
			});

			// router.push('/article/1')
		});
	} else {
		// 发布文章
		formData.append('belongUserID', form.belongUserID);
		formData.append('draftArticleID', draftData.draftArticleID);



		// console.log('formData', formData.get('labelsId[1]'));

		subArticle_a(formData).then((res) => {
			// console.log(res);

			ElMessage({
				message: '文章发布成功！',
				type: 'success',
			});

			router.push('/article/1')
		});
	}





};


//循环传入的值转换formData

// const jsonToFormData = (config) => {
// 	console.log('你好安逸呵呵哈哈哈或或');
// 	const formData = new FormData();

// 	Object.keys(config).forEach((key) => {
// 		formData.append(key, config[key]);
// 	});
// 	console.log('formData.labelsId123123123123',formData);

// 	return formData;
// };
// function convertToFormData(data) {
// 	const formData = new FormData();

// 	for (const key in data) {
// 		console.log('key', key);
// 		if (data[key] !== undefined && data[key] !== null) {
// 			if (Array.isArray(data[key])) {
// 				data[key].forEach((item) => {
// 					formData.append(`${key}[]`, item);
// 				});
// 			} else {
// 				formData.append(key, data[key]);
// 			}
// 		}
// 	}

// 	return formData;
// }

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
		// console.log('button.isActive', button);
		// console.log('button.categoryId', button.categoryId);
		// console.log('button_click', button_click);
		button.isActive = button.categoryId === button_click;

		if (button.categoryId === button_click) {
			form.category = button.categoryName;
			categoryid.value = button.categoryId
			console.log('!!!form.category', form.category);
			// 清空标签，防止添加不同类别下的标签
			form.labelsId = []
		}
	});
};

// 标签下拉框

const options = ref([]);

// 获取文章标签

const getArticleTag = () => {
	getArticleTag_a().then((res) => {
		console.log('options.value', res.data.data);
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
			uploadImg.uploadedImageUrl = res.data.data;

			// console.log(uploadImg.uploadedImageUrl);

			form.thumbnail = uploadImg.uploadedImageUrl;
		});
	}
};

// 封面重新上传
const reUpload = () => {
	uploadImg.uploadedImageUrl = '';
	uploadImg.uploadedImage = '';
}

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

const articleContent = ref('');

const unsavedChanges = ref(false);

// 去个人页面
const toMy = () => {
	router.push('/my/lately')
}

// 保存草稿

const draftData = reactive({
	belongUserID: '',
	title: '',
	content: '',
	draftArticleID: '',
});

// 保存草稿的方法

const saveArticleDraft = async () => {
	draftData.belongUserID = form.belongUserID;

	draftData.title = form.title || '未命名文章';

	draftData.content = form.content;

	// 将数据转换为formdata格式
	const formData = new FormData();
	formData.append('belongUserID', form.belongUserID);
	formData.append('category', form.category);
	formData.append('title', form.title);
	formData.append('briefIntroduction', form.briefIntroduction);
	formData.append('thumbnail', form.thumbnail);
	formData.append('content', form.content);
	formData.append('publicOrNot', form.publicOrNot);
	formData.append('draftArticleID', draftData.draftArticleID);

	form.labelsId.forEach((hobby, index) => {
		// console.log('hobby', hobby);
		// console.log('index', index);
		formData.append('labelsId', hobby);
	});

	await saveArticleDraft_a(formData);
};

// 监听路由跳转

const confirmLeave = (to, from, next) => {
	console.log('路由跳转');
	console.log('to', to);
	console.log('from', from);

	if (to.fullPath == "/articleDrafts" || to.fullPath == "/my/lately" || to.fullPath == from.fullPath) {
		if (unsavedChanges.value) {
			ElMessageBox.confirm('', '编辑内容尚未保存，是否保存？', {
				confirmButtonText: '保存',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					// 用户点击了确认按钮
					console.log('用户确认操作');
					saveArticleDraft();
					unsavedChanges.value = false;
					next();
				})
				.catch(() => {
					// 用户点击了取消按钮或者关闭了对话框
					console.log('用户取消操作');
					unsavedChanges.value = false;
					next();
				});
		} else {
			console.log(3);
			next();
		}
	} else {
		next()
	}

};

// 在路由跳转前触发

onBeforeRouteLeave(confirmLeave);

// 监听页面关闭事件
const beforeUnloadHandler = (e) => {
	console.log('关闭事件');

	if (unsavedChanges.value) {

		e.preventDefault();

		e.returnValue = '您有未保存的文章内容，确定要离开吗？';
	}
};

// 用户确认关闭
const unloadHandler = () => {
	localStorage.setItem('artitle', form.title)
	localStorage.setItem('arcontent', form.content)

	unsavedChanges.value = false;

	console.log('确认退出');
};

// 监听文章内容的变化
watchEffect(() => {
	unsavedChanges.value = form.content !== '' || form.title !== '';

	console.log('form.content', form.content !== '');

	console.log('form.title', form.title !== '');

	console.log('unsavedChanges', unsavedChanges.value);
});

// 添加页面关闭事件监听
window.addEventListener('beforeunload', (e) => beforeUnloadHandler(e));
window.addEventListener('unload', (e) => unloadHandler(e));

// 在组件销毁前移除事件监听
onBeforeUnmount(() => {
	window.removeEventListener('beforeunload', beforeUnloadHandler);
	window.removeEventListener('unload', unloadHandler);
});
</script>


<style lang="scss" scoped>

$background-color:#fff;
$smallFont:#515767;
$title:#000000;
$blue1:#1171ee;
$blue2:#007FFF;
$buttoncolor:#1171ee;
$burronback:#abcdff;
$buttonborder:1px solid rgba(30, 128, 255, 0.3);
$dolor:#FF6600;

.Mbutton {
	width: 80px;

	color: #f2f2f2;

	z-index: 100;

	height: 35px;

	line-height: 35px;

	padding-right: 8px;

	padding-left: 8px;

	margin-top: 20px;

	margin-left: 9px;

	border-radius: 13px;

	transition: border-color 0.4s;

	/* 添加边框颜色过渡效果 */

	position: relative;

	/* 添加相对定位，用于伪元素的绝对定位 */

	border-bottom: 1px solid #585e58;

  border-color: #252933;
	color: #252933 !important;
	border-top: none;

	border-left: none;

	border-right: none;
}

/* 鼠标悬停状态下 */

.Mbutton:hover {
	/* ... 其他样式 ... */

	border-color: #fff;

	/* 添加边框颜色 */
}

/* 鼠标按下状态下 */

.Mbutton:active {
  border-color: #585e58;
  color: #0000;
  /* 添加边框颜色 */
  transform: translateY(0);
}

/* 动态荧光白效果 */

.Mbutton:hover::before,
.Mbutton:active::before {
	content: '';

	/* 添加伪元素内容 */

	position: absolute;

	top: -2px;

	/* 控制位置以覆盖边框 */

	left: -2px;

	/* 控制位置以覆盖边框 */

	right: -2px;

	/* 控制位置以覆盖边框 */

	bottom: -2px;

	/* 控制位置以覆盖边框 */

	border: 1px solid transparent;

	/* 初始边框设置为透明 */

	border-radius: 5px;

	animation: glow 2s infinite;

	/* 添加动画效果 */

	border-radius: 10px;
}

/* 定义荧光动画 */

@keyframes glow {

	0%,
	100% {
    border-color: #585e58;
	}

	50% {
		border-color: transparent;
	}
}

.form_wrapper {
	width: 100%;

	height: 100%;

	border-top: 1px solid #585e58;

	margin-top: 20px;

	padding-top: 20px;
}

.form_main {
	width: 1000px;

	margin: 0 auto;
}

// 右侧弹出框

/* 针对所有浏览器 */
.element {
	-ms-overflow-style: none;
	/* IE and Edge */
	scrollbar-width: none;
	/* Firefox */
}

/* 针对 Webkit 浏览器（如 Chrome, Safari） */
.element::-webkit-scrollbar {
	display: none;
}

.tit {
	padding-bottom: 10px;
}

.tit input {
	font-size: 24px;

	width: 100%;

	height: 40px;

	box-sizing: border-box;

	border: none;

	/* 移除边框 */

	outline: none;

	/* 移除选中时的外边框 */

	box-shadow: none;

	/* 禁止调整大小 */

	resize: none;

	background-color: $background-color;

	color: $title;

	// border-bottom: 1px dotted #ccc;

	display: table-cell;

	vertical-align: middle;

	padding: 5px;

	// border: 1px solid #585e58;
}

.top_nav_wrapper {
	width: 1508px;

	margin: 0 auto;

	height: 64px;

	display: flex;

	justify-content: space-between;

	line-height: 64px;
	min-width: 1500px;

	.logo {
		width: 150px;

		height: 50px;

		margin: auto 0;

		img {
			width: 100%;

			height: 100%;
		}
	}

	.top_nav_right {
		width: 235px;

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

.top_nav_right>.el-button {
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

			background-color: #fff !important;
			margin-left: -40px;
		}

	}

	.sub_labelNum {
		color: #86909c;
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

	// background-color: #515767;

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

.summary-info>button {
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

.summary-info>button:hover {
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
	line-height: 150px;
}

.clearSub .el-button {
	margin-left: 168px;
}

// .clearSub2 .el-button {
// 	// margin-left: 168px;
// }clearSub2 .el-button {
// 	// margin-left: 168px;
// }
</style>
