// http://log.goodnovel.com/pclogpd.php, 打点的url
// http://log.goodnovel.com/pclog_bgdj.php，也可以走https线路
let logUrl = 'https://log.webfic.com/pclogpd.php' // 点击、pv、event打点url
let exposureUrl = 'https://log.goodnovel.com/pclog_bgdj.php' // 曝光url
import logAxios from '../axios/logAjax'
import { getCookie } from './cookie'
import {logAddUserId} from "./common"

const deviceId = getCookie('visitor')

// if(process.env.NODE_ENV === 'development'){
//     logUrl = '/logApi/pclogpd.php'
//     exposureUrl = '/logApi/pclog_bgdj.php'
// }

/**
 * pv、uv打点类，data是传入的参数
 *
 * @export
 * @class LogPv
 */
class LogPv{
    constructor(data){
        const windowNavigator = window.navigator;
        let locationhref = window.location.href;
        data = data||{}
        this.data = {
            tag: 101, // tag=101是pv、uv，类型
            appName: windowNavigator.appName, // 浏览器的官方名称
            appVersion: windowNavigator.appVersion, // 表示浏览器的版本
            platform: windowNavigator.platform, // 表示浏览器的所在系统平台
            product: windowNavigator.product, // 当前浏览器的产品名称
            userAgent: windowNavigator.userAgent, // 当前浏览器的用户代理字符串
            sw: window.screen.width, // 获取屏幕分辨率的宽度
            sh: window.screen.height, // 获取屏幕分辨率的高度
            prev: data.prev || '', // 上一个页面非必填
            ptype: data.ptype || '', // 当前页面必填
            deviceId: deviceId, // 唯一标识符
            map: data.map||{}, // 其他非必填参数
        }
        this.data.map.platform = "WEB";
        this.data.map.url = locationhref;
        // this.data = logAddUserId(this.data);// 加入用户ID uid字段
        this.logPvAjax()
    }
    logPvAjax(){
    //   console.log("PV--start");
    //   console.log(this.data);
    //   console.log("PV--end");
        try {
            logAxios.get(logUrl +'?json=' + JSON.stringify(this.data))
        } catch (error) {

        }
    }
}
/**
 * 暴露出去的方法，pv、uv直接调用
 * @param {参数对象} data
 */
export const logPvFun = (data) => {
    new LogPv(data)
}

/**
 * 点击事件打点tag=102
 *
 * @class LogClick
 */
class LogClick{
    constructor(data){
        const windowNavigator = window.navigator
        let locationhref = window.location.href;
        data = data||{}
        this.data = {
            tag: 102, // tag=102是点击事件打点类型
            appName: windowNavigator.appName, // 浏览器的官方名称
            appVersion: windowNavigator.appVersion, // 表示浏览器的版本
            platform: windowNavigator.platform, // 表示浏览器的所在系统平台
            product: windowNavigator.product, // 当前浏览器的产品名称
            userAgent: windowNavigator.userAgent, // 当前浏览器的用户代理字符串
            sw: window.screen.width, // 获取屏幕分辨率的宽度
            sh: window.screen.height, // 获取屏幕分辨率的高度
            module: data.module || '', // 当前点击元素的所属页面
            zone: data.zone || '', // 点击的区域
            adid: data.adid || '', // 点击元素的id(例如书籍id之类)
            deviceId: deviceId, // 唯一标识符
            map: data.map||{}, // 其他非必填参数
        }
        this.data.map.platform = "WEB"
        this.data.map.url = locationhref;
        this.logPvAjax()
    }
    logPvAjax(){
    //   console.log("CLK--start");
    //   console.log(this.data);
    //   console.log("CLK--end");

        try {
            logAxios.get(logUrl +'?json=' + JSON.stringify(this.data))
        } catch (error) {

        }
    }
}

export const logClickFun = (data) => {

    new LogClick(data)
}


/**
 * event 事件，tag=103
 *
 * @class LogEvent
 */
class LogEvent{
    constructor(data){
        const windowNavigator = window.navigator
        let locationhref = window.location.href;
        data = data||{}
        this.data = {
            tag: 103, // tag=103是事件打点类型
            appName: windowNavigator.appName, // 浏览器的官方名称
            appVersion: windowNavigator.appVersion, // 表示浏览器的版本
            platform: windowNavigator.platform, // 表示浏览器的所在系统平台
            product: windowNavigator.product, // 当前浏览器的产品名称
            userAgent: windowNavigator.userAgent, // 当前浏览器的用户代理字符串
            sw: window.screen.width, // 获取屏幕分辨率的宽度
            sh: window.screen.height, // 获取屏幕分辨率的高度
            event: data.event || '', // 事件名称：例如，czcg,fbcg
            deviceId: deviceId, // 唯一标识符
            map: data.map||{}, // 其他非必填参数
        }
        this.data.map.platform = "WEB"
        this.data.map.url = locationhref;
        this.logPvAjax()
    }
    logPvAjax(){
    //   console.log("EVENT--start");
    //   console.log(this.data);
    //   console.log("EVENT--end");

        try {
            logAxios.get(logUrl +'?json=' + JSON.stringify(this.data))
        } catch (error) {

        }
    }
}

export const logEventFun = (data) => {
    new LogEvent(data)
}

