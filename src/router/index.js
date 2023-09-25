import { createRouter, createWebHashHistory } from 'vue-router';
import { ElMessage } from 'element-plus'

import Layout from '@/views/Layout.vue';
import Home from '@/views/Home.vue';
import Personal_center from '@/views/Personal_center';
import shop from '@/views/shop/index.vue';
import msg from '@/views/msg/index.vue';

import allchat from '@/views/msg/allchat.vue';
import comment from '@/views/msg/comment.vue';
import fan from '@/views/msg/fan.vue';
import love from '@/views/msg/love.vue';
import onechat from '@/views/msg/onechat.vue';
import system from '@/views/msg/system.vue';
import liveStream from '@/views/msg/liveStream.vue'

import article_main from '@/components/classification/article_main.vue';
import recommend_newest from '@/components/classification/recommend_newest.vue';
import attention from '@/components/classification/attention.vue';
import Article from '@/views/article_view/Article';
import article_details from '@/views/article_view/article_details.vue';

import homeSearchResult from '@/views/homeSearchResult/index.vue'

// token方法引用
import { setToken, getToken, removeToken } from '../utils/setToken.js';

// 解决组件自己跳自己报错问题
const routes = [{
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/',
        children: [{
            path: '/',
            component: Home,
            meta: {},
        }, ],
    },
    {
        path: '/article',
        name: 'article',
        component: Article,
        // redirect: /article
        children: [{
            path: '/article/:categoryId',
            name: 'article_main',
            component: article_main,
            //redirect: '/article/2/recommend',
            children: [{
                path: 'recommend',
                name: 'recommend',
                component: recommend_newest,
            }, ],
        }, ],
    },
    {
        path: '/personal_center',
        component: Personal_center,
    },

    {
        path: '/ex',
        name: 'ex',
        component: () =>
            import ('../views/ex.vue'),
    },

    //文章具体详情页路由
    {
        path: '/article_details/:articleID',
        name: 'article_details',
        //redirect: '/article_details',
        component: article_details,
        prpos: true,
    },


    // 我的个人主页
    {
        path: '/my',
        redirect: '/my/lately',
        name: 'my',
        component: () =>
            import ('../views/my/my.vue'),
        children: [{
            path: "lately",
            name: 'lately',
            component: () =>
                import ('../views/my/lately/lately.vue'),
        }, {
            path: "article2",
            name: 'article2',
            component: () =>
                import ('../views/my/article/index.vue'),
        }, {
            path: `attention`,
            name: 'attention',
            component: () =>
                import ('../views/my/attention/index.vue'),
        }, {
            path: "collect",
            name: 'collect',
            component: () =>
                import ('../views/my/collect/index.vue'),
        }, {
            path: "commodity",
            name: 'commodity',
            component: () =>
                import ('../views/my/commodity/index.vue'),
        }]
    },
    // 他人个人主页
    {
        path: '/OtherUsers',
        redirect: '/OtherUsers/OtherLately',
        name: 'OtherUsers',
        component: () =>
            import ('../views/Other_users/index.vue'),
        children: [{
            path: "OtherLately",
            name: 'OtherLately',
            component: () =>
                import ('../views/Other_users/Other_lately/index.vue'),
        }, {
            path: "OtherArticle",
            name: 'OtherArticle',
            component: () =>
                import ('../views/Other_users/Other_article/index.vue'),
        }, {
            path: "OtherAttention",
            name: 'OtherAttention',
            component: () =>
                import ('../views/Other_users/Other_attention/index.vue'),
        }, {
            path: "OtherCollect",
            name: 'OtherCollect',
            component: () =>
                import ('../views/Other_users/Other_collect/index.vue'),
        }, {
            path: "OtherCommodity",
            name: 'OtherCommodity',
            component: () =>
                import ('../views/Other_users/Other_commodity/index.vue'),
        }]
    },
    // 商品发布
    {
        path: "/UpdataRelease",
        name: 'UpdataRelease',
        component: () =>
            import ('../views/updata_shop/index.vue'),
    },
    // 编辑商品
    {
        path: "/ProductRelease",
        name: 'ProductRelease',
        component: () =>
            import ('../views/Product_release/index.vue'),
    },
    // 编辑个人信息
    {
        path: '/alterMyMsg',
        name: 'alterMyMsg',
        component: () =>
            import ('../views/alter_my_msg/index.vue')
    },
    // 商品模块路由配置
    {
        path: '/shop',
        name: shop,
        component: () =>
            import ('../views/shop/index.vue'),
    },
    // 商品详情路由配置
    {
        path: '/shop/:id',
        name: shop,
        component: () =>
            import ('../views/shop/shopDetails.vue'),
    },
    // 消息模块路由配置
    {
        path: '/msg',
        name: msg,
        component: () =>
            import ('../views/msg/index.vue'),
        children: [{
            path: '/msg/allchat',
            name: allchat,
            component: () =>
                import('../views/msg/allchat.vue')
        },
        {
            path: '/msg/comment',
            name: allchat,
            component: () =>
                import('../views/msg/comment.vue')
        },
        {
            path: '/msg/fan',
            name: allchat,
            component: () =>
                import('../views/msg/fan.vue')
        },
        {
            path: '/msg/love',
            name: allchat,
            component: () =>
                import('../views/msg/love.vue')
        },
        {
            path: '/msg/onechat',
            name: allchat,
            component: () =>
                import('../views/msg/onechat.vue')
        },
        {
            path: '/msg/system',
            name: allchat,
            component: () =>
                import('../views/msg/system.vue')
        }, {
            path: '/msg/liveStream',
            name: liveStream,
            component: () =>
                import('../views/msg/liveStream.vue')
        },
        ]
    },
    // 提交文章页面路由
    {
        path: '/subArticle',
        name: 'subArticle',
        component: () =>
            import ('../views/article_view/SubArticle.vue'),
    },
    // 草稿箱页面路由
    {
        path: '/articleDrafts',
        name: 'articleDrafts',
        component: () =>
            import ('../views/article_view/articleDrafts.vue'),
    },
    // 登录页面路由
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/login.vue'),
    },
    // 忘记密码页面路由
    {
        path: '/lostPwd',
        name: 'lostPwd',
        component: () =>
            import ('../views/login/lostPwd.vue'),
    },
    {
        path: '/workpage',
        name: 'workpage',
        component: () =>
            import ('../views/work_order/work_page.vue'),
    },
    {
        path: '/orderpage',
        name: 'orderpage',
        component: () =>
            import ('../views/work_order/order_page.vue'),
    },
    {
        path: '/orderinfo',
        name: 'orderinfo',
        component: () =>
            import ('../views/work_order/order_info.vue'),
    },
    {
        path: '/homeSearchResult',
        name: homeSearchResult,
        component: () =>
            import ('../views/homeSearchResult/index.vue'),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 前置路由守卫， 让用户登录后就不会访问到登录页面了
router.beforeEach((to, from, next) => {
    console.log('beforeEach', to, from);
    if (to.path === '/login' || to.path === '/Login') {
        //判断当前路由是否需要进行权限控制
        if (localStorage.getItem('refreshToken')) {
            ElMessage({
            	message: '您已登录！',
            	type: 'success',
            })
            next('/'); //放行
        } else {
            next(); //放行
        }
    } else {
        next(); //放行
    }
});


export default router;