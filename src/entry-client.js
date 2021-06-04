import Vue from "vue";
import { createApp } from "./app";
import { axiosConfig } from "@/core/axios/index";
import HelloJs from 'hellojs';
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// import "tinymce/icons/default/icons.min.js";
import "tinymce/themes/modern/theme";
// import "tinymce/themes/silver/theme.js";
Vue.prototype.tinymce = tinymce;
// import 'amfe-flexible'
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 内置window对象
import { ZxImageProcess } from "image-process";
import "swiper/dist/css/swiper.min.css";
// Vue.use(swiper).use(swiperSlide);
Vue.component('swiper', swiper)
Vue.component('swiperSlide', swiperSlide)
Vue.component('Editor', Editor)
Vue.prototype.$hello = HelloJs;
Vue.prototype.ZxImageProcess = ZxImageProcess;
// import ProgressBar from './components/progressbar.vue'
import { logPvFun, logClickFun, logEventFun } from './core/js/log.js' //? 三方登录
window.$logPv = logPvFun
window.$logClick = logClickFun
window.$logEvent = logEventFun
import MetaInfo from 'vue-meta-info';

import VueCropper from "vue-cropper";
import Message from './components/global/message/index.vue'
Vue.use(MetaInfo)
Vue.use(VueCropper)
Vue.use(Message);
//复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 横竖屏切换重绘
window.onorientationchange = function () {
    window.location.reload();
}
const { app, router, store } = createApp();

// 客户端特定引导逻辑……
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            })
                .then(next)
                .catch(next);
        } else {
            next();
        }
    },

    // beforeRouteLeave(to, from, next) {
    //     var router = this.$router;
    //     // 如果是前进，则不做处理
    //     if (router.handleType == 1) {
    //         next()
    //     } else {
    //         router.beforeRouteBack(to, from, next, this.backFn)

    //     }
    // },

    methods: {
        backFn(to, from, next) {
            next(true)
        }
    }
});


// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，
// 自动嵌入到最终的 HTML 中。
// 而在客户端，在挂载到应用程序之前，store 就应该获取到状态：
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    // 路由拦截器
    // 首次刷新获取更新用户信息
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
        try {
            userInfo = JSON.parse(userInfo)
            store.dispatch('moduleHome/changeUserInfo', userInfo)
        } catch (error) { }
    } else window.localStorage.clear();

    window.reloadFirst = true;
    store.dispatch('moduleHome/changeCurrentPath', router.history.current.path)
    router.beforeEach((to, from, next) => {
        if (!to.path.includes('book_info')) { // 还原title desc
            let ms = window.document.getElementsByTagName("meta");
            if (ms && ms.length > 0) {
                for (let index = 0; index < ms.length; index++) {
                    const element = ms[index];
                    if (element.name == 'description') {
                        element.content = "小說大全是一款免費多、顏值高、更新快的電子書閱讀神器，頁面設計精美大方，給你超級舒適的視覺體驗；隨時隨地，連載秒更。百家電子文庫，私人訂制推薦，都市辣文、玄幻修真、盜墓摸金、懸疑、鐵血軍事豪門總裁、校園純愛、古言仙俠、穿越宮鬥、幻想言情、影視原著應有盡有。網文：《鬼手神醫：王妃請上比特《龍王殿》《封少的掌上嬌妻》《幸得相愛，陸少深深寵》《都市無敵醫聖》《至尊女婿》《騙婚總裁：獨寵小嬌妻》《閃婚老公太凶猛》等暢銷書：《你好，舊時光》《你的孤獨，雖敗猶榮》《靈魂有香氣的女子》《微微一笑很傾城》等，趕走生活中無聊的每1秒。小說大全，千萬用戶正在使用的小說閱讀APP！打發無聊時間的絕佳利器！百萬部經典小說樣樣俱全，小說更新實时提醒，從此追書也是件幸福事。";
                    }
                }
            }
            window.document.getElementsByTagName("title")[0].innerText = '小說大全-全新海量火熱小说';
        }

        // 责编,协编分享地址拼接shareCode
        if (to.query.shareCode) {
            window.localStorage.setItem("shareCode", to.query.shareCode)
        }

        // 右键打开推荐搜索标签,地址栏携带参数keywordtag, 获取关键字给store赋值
        if (to.path == '/search' && to.query.keywordtag) {
            store.dispatch("moduleSearch/changeKeyWord", to.query.keywordtag);
        }

        if (!window.document.cookie.includes('TOKEN')) {
            window.localStorage.removeItem('userInfo');
            store.dispatch('moduleHome/changeUserInfo', {})
        }
        // 路由切换更新获取用户信息
        userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            try {
                userInfo = JSON.parse(userInfo)
                store.dispatch('moduleHome/changeUserInfo', userInfo)
            } catch (error) { }
        } else window.localStorage.clear();

        if (to.meta.requireAuth) {
            // 这里是登录过期的问题，登陆过期刷新页面，如果需要登录页面就跳转到登录页，
            // 如果是请求接口需要登录，则弹窗提示登录,因此需要在afterEach中定义一个变量
            if (!(userInfo && userInfo.id)) {
                if (window.reloadFirst) {
                    store.dispatch('moduleHome/changeLoginShow')
                } else {
                    next('/login')
                }
            } else {
                next()
            }
        } else {
            next()
        }

    })

    router.afterEach((to, from) => {
        window.reloadFirst = true;
        store.dispatch('moduleHome/changeCurrentPath', to.path)
        if (to.name !== '书籍阅读器') {
            window.scrollTo(0, 0)
        }
    })

    router.beforeResolve((to, from, next) => {
        if (to.meta.keepAlive && store.state.cacheHistoryList.indexOf(to.fullPath) != -1) {
            return next();
        }
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);
        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c);
        })
        const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _);

        if (!asyncDataHooks.length) {
            return next();
        }
        Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to })))
            .then(() => {
                // bar.finish()
                next();
            })
            .catch(next);
    });

    // actually mount to DOM
    // 这里假定 App.vue 模板中根元素具有 `id="app"`
    axiosConfig(app, store);
    app.$mount("#app");
});