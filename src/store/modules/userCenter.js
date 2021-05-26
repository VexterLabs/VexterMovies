/*
 * @Description:
 * @FilePath: \haiwai_pc\src\store\modules\userCenter.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-06-17 11:52:52
 */
export default {
  namespaced: true,
  state: {
    incomeList: [],
    workDataList: [],
    attendanceBonus: 0,
    incomeGeneralData:{},
  },
  mutations: {
    CHANGEINCOMELIST(state, target) {
      state.incomeList = target
    },
    CHANGEWORKDATALIST(state, target) {
      state.workDataList = target
    },
    CHANGEATTEND(state, target) {
      state.attendanceBonus = target
    },
    CHANGEAGENDERDATA(state, target) {
      state.incomeGeneralData = target
    },
  },
  actions: {
    changeIncomeList({ commit }, target) {
      commit('CHANGEINCOMELIST', target)
    },
    changeWorkDataList({ commit }, target) {
      commit('CHANGEWORKDATALIST', target)
    },
    changeAttend({ commit }, target) {
      commit('CHANGEATTEND', target)
    },
    changeIncomeGeneralData({ commit }, target) {
      commit('CHANGEAGENDERDATA', target)
    }
  }
}
