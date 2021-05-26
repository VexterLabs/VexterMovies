/*
 * @Description: 
 * @FilePath: \webfic_pc_ssr\src\store\page\alpha.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-12-23 19:14:36
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-12-31 17:22:36
 */
import { instance } from '@/core/axios/index.js'
import config from '../config.js'
export default {
    namespaced: true,
    state: {
        rankBooks: [],
        activityId: '',
        login: false,
        mateShareInfo: {},
        packShareInfo: {},
        initLoad: false,
        errStatus: '',
        totalViewCount:0,
    },
    mutations: {
        INITALPHADATA(state, payload) {
            state.rankBooks = payload.rankBooks;
            state.mateShareInfo = payload.mateShareInfo || {};
            state.packShareInfo = payload.packShareInfo || {};
            state.activityId = payload.activityId || '';
            state.login = payload.login || false;
            state.initLoad = payload.initLoad;
            state.errStatus = payload.errStatus;
            state.totalViewCount = payload.totalViewCount || 0;
        },
    },
    actions: {

        async getAlphaList({ commit }, payLoad) {
            let res = await instance.post(config.ENV + '/webfic/activity/alpha/contest');
            try {
                res = res.data;
                let rankBooks = [],
                    mateShareInfo = {},
                    errStatus = "",
                    packShareInfo = {},
                    activityId = '',
                    totalViewCount = 0,
                    login = false;

                if (res.status == 0) {
                    rankBooks = res.data.rankList;
                    activityId = res.data.activityId;
                    login = res.data.login;
                    mateShareInfo = res.data.mateShareInfo || {};
                    packShareInfo = res.data.packShareInfo || {};
                    totalViewCount = res.data.totalViewCount || 0;
                    console.log(mateShareInfo)
                    console.log(packShareInfo)
                    errStatus = 0
                } else {

                    errStatus = res.status
                }
                commit('INITALPHADATA', {
                    rankBooks,
                    mateShareInfo,
                    packShareInfo,
                    initLoad: true,
                    login,
                    activityId,
                    errStatus,
                    totalViewCount
                })
            } catch (error) {
                commit('INITALPHADATA', {
                    rankBooks: [],
                    initLoad: true,
                    errStatus: 'err'
                })
            }
        },

        initAlphaData({commit} , target){
            commit("INITALPHADATA" , target)
        }
    }
}