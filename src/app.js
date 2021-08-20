import Vue from 'vue'
import './core/axios/index'
import { createRouter } from './router/router'
import { createStore } from './store/store'
import { sync } from 'vuex-router-sync'
import VueLazyload from 'vue-lazyload'
import App from './app.vue'
import i18n from './i18n/i18n'
import VarFn from './js/common/VarFn'
import 'element-ui/lib/theme-chalk/index.css';
import messageBox from './components/global/messageBox/index.vue' // 使用报错，待解决

Vue.use(messageBox)
Vue.use(VarFn)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
});

// import { Settings } from 'luxon'; // 语言设置先保留
// Settings.defaultLocale = 'en';
// 导出一个工厂函数，用于创建新的应用程序，router 和 store 实例
export function createApp() {
    // 创建 router 和 store 实例
    const router = createRouter()
    const store = createStore()

    // 同步路由状态(route state)到 store
    sync(store, router)
    function getUuiD(randomLength){
        return Number(Math.random().toString().substr(2,randomLength) + Date.now()).toString(36)
    }
    // 创建应用程序实例，将 router 和 store 注入
    const app = new Vue({
        fackUid: getUuiD(16),
        router,
        store,
        i18n,
        // 根实例简单的渲染应用程序组件
        render: h => h(App)
    })

    // 暴露 app, router 和 store
    return { app, router, store }
}