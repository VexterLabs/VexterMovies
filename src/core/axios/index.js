/*
 * @Description:
 * @FilePath: \haiwai_pc\src\core\axios\index.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-05-08 15:44:44
 */
import Axios from 'axios'
import Vue from 'vue'

// import { getCookie } from '../js/cookie'
// let deviceId = getCookie('visitor')

let instance = Axios.create({})

export function axiosConfig(app, store) {
    //接口请求拦截，是否需要登录，需要登录弹出登录框
    instance.interceptors.response.use(
        res => {
            if (res.data.status == 6 && !res.config.url.includes("chapter/unlock") && !res.config.url.includes("alpha")) { // 章节也读解锁页面已经有包含了登录组件,去重
                store.dispatch('moduleHome/changeUserInfo', {})
                localStorage.removeItem('userInfo')
                store.dispatch('moduleHome/changeLoginShow', { isShow: true })
                return res
            }
            return res;
        },
        error => {
            console.log(error, '---------');
        }
    )

    instance.interceptors.request.use(config => {
        let time_four = (new Date()).valueOf() + ''
        time_four = time_four.substr(time_four.length - 8)
        config.headers.requestId = 'HWYC' + time_four + parseInt(Math.random() * 1e4)
            // config.headers.deviceId = deviceId
            // console.log('类型', config.data, typeof config.data)
            // if (config.data && btoa) {
            //     config.data = { params: btoa(JSON.stringify(config.data)) };
            //     console.log('请求拦截', config.data);
            // }
        return config
    }, err => {
        return Promise.reject(err)
    })

}
let Plugin = {}
Plugin.install = function(Vue, options) {
    Vue.prototype.$axios = instance;
}
Vue.use(Plugin);
export {
    instance
}

// 封装Node - 设置cookie
export function nodeSetCookie(value) {
    instance.defaults.headers.Cookie = value;
}

export default instance