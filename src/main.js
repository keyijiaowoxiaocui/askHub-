import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//引入初始化样式
import '@/assets/styles/base.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import myelement from '@/components/library';
import './assets/font_4169078_2qmm68cmchn/iconfont.css';
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// 图标icon
import * as Icons from '@element-plus/icons';
const app = createApp(App);

app.use(hljsVuePlugin)


// 注册Icons 全局组件
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key]);
});

// 引入pinia
import pinia from './store';

createApp(App)
    .use(pinia)
    .use(router)
    .use(ElementPlus)
    .use(myelement)
    .mount('#app');