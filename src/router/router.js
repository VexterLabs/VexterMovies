/*
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\router\router.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-05-11 15:04:33
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-30 13:37:28
 */
import Vue from "vue";
// import Router from "./navigator";
// import Login from './login/login'
import Router from 'vue-router'
// import Create from './Create/Create'
import Index from './Index/Index'
// import Share from './Feed/Share'
Vue.use(Router);


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location) // .catch(err => err)
}

export function createRouter() {
    return new Router({
        mode: "history",
        routes: [
            // ...Create, // 写书相关
            // ...Share, // 约稿相关
            ...Index,
            // ...Login, // 登录模块
            // {
            //     path: '/language',
            //     name: 'HelloWorld',
            //     component: resolve => require(['@/components/HelloWorld'], resolve)
            // },
            //  
            // {
            //     path: '/twitter_login',
            //     name: 'twitter_login',
            //     component: resolve => require(['@/Views/Home/TwitterLogin.vue'], resolve)
            // }
        ]
    });
}