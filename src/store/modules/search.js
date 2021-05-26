import { instance } from '@/core/axios/index.js'
import config from '../config.js'
export default {
    namespaced: true,
    state: {
        keyword: '',
        pageSize: 10,
        pageNo: 1,
        totals: 1,
        books: [],
        allBookCount: 0,
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
            let res = await instance.post('/webfic/book/search', {
                "keyword": state.keyword,
                "pageNo": state.pageNo,
                "type": "DEFAULT",
                "pageSize": state.pageSize
            })
            if (target.vm && target.vm.$store) target.vm.$store.dispatch('moduleHome/changeLoadingStatus', true)

            if (res.data.status == 0 && res.data.data) {
                let result = res.data.data
                state.totals = result.pages
                state.allBookCount = result.total
                state.books = result.records
                state.isNull = false

            } else if (res.data.status == 0 && !res.data.data) {
                state.books = []
                state.isNull = true
                state.allBookCount = 0
            } else {
                state.isNull = true
            }
            await target.vm.$nextTick();
            // document.body.scrollTop = 0;
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