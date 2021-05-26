import { createApp } from './app'
import { axiosConfig, nodeSetCookie } from '@/core/axios/index'
import {handleSEO} from '@/core/seo/seo.js'

const isDev = process.env.NODE_ENV !== 'production'
const { app, router, store } = createApp()
axiosConfig(app, store, router)
    // This exported function will be called by `bundleRenderer`.
    // This is where we perform data-prefetching to determine the
    // state of our application before actually rendering it.
    // Since data fetching is async, this function is expected to
    // return a Promise that resolves to the app instance.
export default context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const { app, router, store } = createApp()
            // axiosConfig(app, store, router)
        const { url } = context
        const { fullPath } = router.resolve(url).route

        // if (fullPath !== url) {
        //     return reject({ url: fullPath })
        // }

        // 设置服务器端 router 的位置，首屏渲染
        router.push(context.url)
        if (context.cookies.TOKEN) {
            store.state.cookies = context.cookies.TOKEN || '';
            nodeSetCookie('TOKEN=' + context.cookies.TOKEN)
        } else {
            nodeSetCookie('');
        }


        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
                // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            // 对所有匹配的路由组件调用 `asyncData()`，获取，处理数据，然后存在 vuex
            // 供客户端使用
            Promise.all(matchedComponents.map((component) => {
                // 每次路由匹配到相关组件后, 首先执行组件内asyncData函数, 参数1: 数据控制器;参数2:当前路由实例;
                // 将组件created相关操作写入asyncData中, 只能操作到state,route, 所以需要将相关ajax写入state方法中触发
                return component.asyncData && component.asyncData({
                    store,
                    route: router.currentRoute
                })
            })).then(() => {
                isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
                    // 在所有预取钩子(preFetch hook) resolve 后，
                    // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                    // 当我们将状态附加到上下文，
                    // 并且 `template` 选项用于 renderer 时，
                    // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state

                    // 处理SEO
                context = handleSEO(context);

                    // Promise 应该 resolve 应用程序实例，以便它可以渲染
                resolve(app)

            }).catch(reject)
        }, reject)
    })
}