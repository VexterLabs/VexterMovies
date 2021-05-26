import { instance } from '@/core/axios/index.js'
import config from '../config.js'
export default {
    namespaced: true,
    state: {
        bookTypes: [],
        totals: 10,
        books: [],
        currentIndex: ''
    },
    mutations: {
        INITCATDATA(state, payload) {

            state.books = payload.books;
            state.totals = payload.totals;
        },
        INITTYPES(state, payload) {
            state.bookTypes = payload.bookTypes;
        },
        INITCUTTENT(state, payload) {
            state.currentIndex = payload.currentIndex
        }
    },
    actions: {
        async getCategoryData({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/webfic/book/browse', payLoad);
            let bookTypes = [],
                books = [],
                totals = 0;
            try {
                res = res.data;

                if (res.status == 0) {
                    let data = res.data;

                    if (data.bookTypes && data.bookTypes.length > 0) {
                        data.bookTypes.map(item => {
                            item.subTypes.map(innerItem => {
                                innerItem.active = false
                            })
                            bookTypes.push({
                                name: item.name,
                                id: item.id,
                                subTypes: [{ oneTypeId: item.id, id: 0, name: 'All', active: false }, ...item.subTypes]
                            })
                        })
                    }
                    totals = data.page.pages
                    books = data.page.records
                } else {
                    this.$msg({
                        content: "Network Error , Status: " + res.data.status
                    });
                }
            } catch (error) {

            }

            if (payLoad.facet) commit('INITTYPES', { bookTypes })
            commit('INITCATDATA', { books, totals })

        }
    }
}