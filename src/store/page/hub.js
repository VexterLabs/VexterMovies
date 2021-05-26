/*
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\store\page\hub.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:23:19
 */
import { instance } from '@/core/axios/index.js'
import config from '../config.js'
export default {
    namespaced: true,
    state: {
        totals: 0,
        books: [],
        hubInfo: {},
        initLoad: false,
    },
    mutations: {
        INIHUBLISTDATA(state, payload) {
            state.books = payload.books;
            state.totals = payload.totals;
        },
        INIHUBINFODATA(state, payload) {
            state.hubInfo = payload.hubInfo;
            state.initLoad = payload.initLoad;
        }
    },
    actions: {
        async getHubList({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/webfic/hub', payLoad);
            try {
                res = res.data;
                let books = [];
                let totals = 0;
                if (res.status == 0) {
                    let result = res.data;
                    books = result.records || [];
                    totals = result.pages;
                }
                commit('INIHUBLISTDATA', {
                    books,
                    totals,
                })
            } catch (error) {
                console.log(error)
                commit('INIHUBLISTDATA', {
                    books: [],
                    totals: 0,

                })
            }
        },

        async getHubInfo({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/webfic/hub/detail', payLoad);
            try {
                res = res.data;
                let hubInfo = {};
                if (res.status == 0) {
                    hubInfo = res.data
                }
                commit('INIHUBINFODATA', {
                    hubInfo,
                    initLoad: true,
                })
            } catch (error) {
                commit('INIHUBINFODATA', {
                    hubInfo: {},
                    initLoad: false
                })
            }
        },
    }
}