import AppBanner from '@/components/library/AppBanner';
export default {
	// 导出一个插件的方式
	install(app) {
		// 全局注册组件
		app.component(AppBanner.name, AppBanner);
	},
};
