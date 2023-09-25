import { defineStore } from 'pinia';
import {
	getCategory,
	sendCategoryId,
	getAllArticleData,
	getSearchArticle,
	getArticleDetails,
} from '../../api/ArticleApis';
const articleStore = defineStore('Article', {
	state: () => {
		return {
			//分类列表
			classList: [],
			//存放文章所有数据列表
			articledata: [],
			// 测试数组
			test: [],
			scrollY: 0,
			// 侧边栏id
			leftid: '',
			// 搜索文章所带的参数
			searchArticle: {
				keywords: '5',
				page_size: 5,
				page_num: 1,
				desc: false,
			},
			articleDetails: [],
			//artID: '',
			details: [],
			loadedDataCount: 0,
			searchResult: [],
			// 文章详细信息
			detailArticleMessage: {},
		};
	},
	actions: {
		async category() {
			let res = await getCategory();
			this.classList = res.data.data;
		},

		async postCategoryId(categoryId) {
			sendCategoryId(categoryId)
				.then((res) => {
					//console.log('发过去了');
				})
				.catch((error) => {
					console.error(error);
				});
		},

		async getArticleData(categoryId, startIndex, viewCount) {
			console.log('勾八的test,', this.test);
			// let res = await getAllArticleData(categoryId.value);
			// console.log('777777777', res);
			console.log(this.articledata);
			// this.leftid = categoryId;
			// 加载更多数据
			this.loadedDataCount = 0;
			if (
				Array.isArray(this.test) &&
				this.test.length > 0 &&
				this.articledata.length < this.test.length
			) {
				// 计算要加载的数据范围
				const endIndex = Math.min(
					startIndex + viewCount,
					this.test.length
				);

				// 获取要加载的数据片段
				const newData = this.test.slice(startIndex, endIndex);
				//这里面截取的是三
				console.log(newData);

				// 将新数据添加到已有数据中
				this.articledata = [...this.articledata, ...newData];

				// 增加已加载数据的计数
				this.loadedDataCount += newData.length;
				console.log(333333);
				console.log(categoryId);
				console.log(
					' newData newData',
					newData,
					'endIndexendIndex',
					endIndex
				);
			}
		},
		// 根据类别获取所有文章
		async getAllData(categoryId) {
			console.log('aaaaaaaaaaaaa');
			this.articledata = [];
			let res = await getAllArticleData(categoryId);
			//console.log('咋没东西呢', res);

			this.test = res.data.data;
			this.getArticleData(categoryId, 0, 5);
			//this.articledata = res.data.data;
			console.log('this.test', this.test, this);
			//console.log('this.articledata', this.articledata);
			// return res;
		},
		// 搜索文章接口
		async getSearchArticle(inpval) {
			this.searchArticle.keywords = inpval;
			console.log('搜索文章1', this.searchArticle);
			let res = await getSearchArticle(
				this.searchArticle.keywords,
				this.searchArticle.page_size,
				this.searchArticle.page_num,
				this.searchArticle.desc
			);
			//console.log('搜索文章2', res);
			this.searchResult = res.data.data;
			console.log(this.searchResult);
			//console.log('搜索文章3', this.articledata);
		},

		// 获取文章详情
		async articleDetails(id) {
			const res = await getArticleDetails(id);
			//console.log('idddddddddddddddddd', id);
			this.details = res.data.data;
			console.log('rucilipu', this.details);
		},
		// 文章详情接口
		async getDetailArticle(ID) {
			console.log(ID);
			let res = await getArticleDetails(ID);
			console.log(res.data.data);
			this.detailArticleMessage = res.data.data;
			console.log(this.detailArticleMessage);
		},
	},
});
export default articleStore;
