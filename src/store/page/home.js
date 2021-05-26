import { instance } from '@/core/axios/index.js'
import config from '../config.js'
export default {
    namespaced: true,
    state: {
        // 详情
        bookInfo: {},
        originalBooks: [],
        fafictionTitle: "",
        maylikelist: {
            name: "You may also like",
            items: []
        },
        packNum: 0,
        matePseudonym: false,
        nullPageFalg: true,
        alphalist: {
            name: "Myths from Alpha and Luna",
            items: [],
            isAlpha: true,
        },
        // 首页
        bookList: [],
        // 排行榜
        books: [],
        tabs: [],
        totals: 1,
        // 更多列表
        moreBooks: [],
        moreName: '',
        allBookCount: 0,
    },
    mutations: {
        INITDATA(state, payload) {
            state.bookList = payload;
        },
        INITRANKDATA(state, payload) {
            state.tabs = payload.tabs;
            state.books = payload.books;
            state.totals = payload.totals;
        },
        INITBOOKINFODATA(state, payload) {
            state.bookInfo = payload.bookInfo;
            state.originalBooks = payload.originalBooks;
            state.fafictionTitle = payload.fafictionTitle;
            state.maylikelist.items = payload.recommends;
            state.packNum = payload.packNum;
            state.matePseudonym = payload.matePseudonym;
            state.alphalist.items = payload.mateTheAlphaBooks;
            state.nullPageFalg = payload.nullPageFalg
        },

        INITMOREDATA(state, payload) {
            state.moreBooks = payload.books;
            state.moreName = payload.moreName;
            state.allBookCount = payload.allBookCount;
        }
    },

    actions: {
        async getIndexData({ commit }, payload) {
            let res = await instance.post(config.ENV + '/webfic/home/index');
            try {
                res = res.data
                if (res.status == 0) {
                    commit('INITDATA', res.data.pageColumns)
                }
            } catch (error) {
                commit('INITDATA', [])
            }
        },

        async getRankingData({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/webfic/home/rank', payLoad);
            try {
                res = res.data
                if (res.status == 0) {
                    let result = res.data
                    let tabs = result.tabs || []
                    let books = []
                    result.itemPage.records.map((item, index) => {
                        books.push({
                            ...item,
                            mine_index: index + 1
                        })
                    })
                    const totals = result.itemPage.pages
                    commit('INITRANKDATA', {
                        tabs,
                        books,
                        totals
                    })
                }
            } catch (error) {
                commit('INITRANKDATA', {
                    tabs: [],
                    books: [],
                    totals: 0
                })
            }
        },

        async getBookInfoData({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/webfic/book/detail', payLoad);
            let bookInfo = {},
                originalBooks = [],
                fafictionTitle = "",
                recommends = [],
                packNum = 0,
                matePseudonym = false,
                nullPageFalg = true,
                mateTheAlphaBooks = [];
            try {
                res = res.data;
                if (res.status === 0) {
                    let data = res.data;
                    bookInfo = data.book || {};
                    if (data.originalBooks && data.originalBooks instanceof Array && data.originalBooks.length > 0) {
                        let str = "";
                        originalBooks = data.originalBooks;
                        data.originalBooks.forEach(function(item) {
                            str += `《${item.originalBookName}》`;
                        });
                        fafictionTitle = `This is a ${str} fanfiction`;
                    }
                    recommends = data.recommends || [];
                    packNum = data.packNum || 0;
                    matePseudonym = data.matePseudonym || false;
                    mateTheAlphaBooks = data.mateTheAlphaBooks || []
                } else {
                    nullPageFalg = false
                }


            } catch (error) {

            }
            commit('INITBOOKINFODATA', {
                bookInfo,
                originalBooks,
                fafictionTitle,
                recommends,
                packNum,
                matePseudonym,
                mateTheAlphaBooks,
                nullPageFalg
            })
        },

        async getMoreData({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/webfic/home/second/list', payLoad);
            let books = [],
                moreName = "",
                allBookCount = 0;
            try {
                res = res.data;
                if (res.status == 0 && res.data.items) {
                    let data = res.data;
                    books = data.items;
                    moreName = data.name;
                    allBookCount = data.totalSize;
                } else {
                    this.$msg({
                        content: "Network Error , Status: " + res.data.status
                    });
                }
            } catch (error) {

            }
            commit('INITMOREDATA', {
                books,
                moreName,
                allBookCount
            })

        }
    }
}