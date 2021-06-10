/*
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\store\page\contest.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:22:52
 */
import { instance } from '@/core/axios/index.js'
import config from '../config.js'
export default {
    namespaced: true,
    state: {
        rankBooks: [],
        activityId: '',
        initLoad: false,
        errStatus: ''
    },
    mutations: {
        INITCONTESTDATA(state, payload) {
            state.rankBooks = payload.rankBooks;
            state.activityId = payload.activityId || '';
            state.initLoad = payload.initLoad;
            state.errStatus = payload.errStatus
        },
    },
    actions: {

        async getRankList({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/xsdq/activity/writingcontest');
            try {
                res = res.data;
                let rankBooks = [],
                    errStatus = "",
                    activityId = '';
                if (res.status == 0) {
                    rankBooks = res.data.rankList;
                    activityId = res.data.activityId;
                    errStatus = 0
                } else {
                    errStatus = res.status
                }
                commit('INITCONTESTDATA', {
                    rankBooks,
                    initLoad: true,
                    activityId,
                    errStatus
                })
            } catch (error) {
                commit('INITCONTESTDATA', {
                    rankBooks: [],
                    initLoad: true,
                    errStatus: 'err'
                })
            }
        },
    }
}