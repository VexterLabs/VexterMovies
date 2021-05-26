/*
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\store\modules\hub.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:22:23
 */
export default {
    namespaced: true,
    state: {
        keyword: '',
        pageSize: 4,
        pageNo: 1,
        totals: 10,
        books: [],
        allBookCount: 200,
        isNull: false
    },
    mutations: {
        async CHANGESEARCHRESULT(state, target) {
            target = target || {}
            if (target.pageNo) {
                state.pageNo = target.pageNo
            }
            if (target.keyword) {
                state.keyword = target.keyword
            }
            let res = await target.vm.$axios.post('/webfic/hub', {
                "pageNo": state.pageNo,
                "pageSize": state.pageSize
            })
            target.vm.$store.dispatch('moduleHome/changeLoadingStatus', true)

            if (res.data.status == 0 && res.data.data) {
                let result = res.data.data
                state.allBookCount = result.total
                state.totals = Math.ceil(Number(result.total) / state.pageSize)
                state.books = result.records
                state.isNull = false

            } else if (res.data.status == 0 && !res.data.data) {
                state.books = []
                state.isNull = true
                state.allBookCount = 0
            } else {
                state.isNull = true
            }
            await target.vm.$nextTick()
            document.body.scrollTop = 0;
        },
        CHANGEKEYWORD(state, target) {
            state.keyword = target
        },
        CHANGEBOOKS(state, target) {
            state.books = target.books
            state.allBookCount = target.allBookCount
        }
    },
    actions: {
        changeSearchResult({ commit }, target) {
            commit('CHANGESEARCHRESULT', target)
        },
        changeKeyWord({ commit }, target) {
            commit('CHANGEKEYWORD', target)
        },
        changeBooks({ commit }, target) {
            commit('CHANGEBOOKS', target)
        },
    }
}