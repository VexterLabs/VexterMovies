/*
 * @Description:
 * @FilePath: \haiwai_pc\src\store\modules\home.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-06-12 11:57:19
 */

export default {
    namespaced: true,
    state: {
        userInfo: {},
        loadingFinished: false,
        isShowLogin: false,
        currentPath: '/',
        addCurrentBookInfo: {}, // 当前点击的书籍信息(这里是为了处理未登录时点击加入书架，登录之后自动加入书籍的问题)
        callBackObj: false,
    },
    mutations: {
        CHANGEUSERINFO(state, target) {
            state.userInfo = target
        },
        CHANGELOADINGSTATUs(state, target) {
            state.loadingFinished = target
        },
        async CHANGELOGINSHOW(state, target) {
            // console.log('----------------target');
            // console.log('----------------');
            // console.log(state.callBackObj);
            if (target) {
                state.isShowLogin = target.isShow
                if (target.callBackObj) {
                    console.log(target.callBackObj);
                    state.callBackObj = target.callBackObj;
                } else {
                    state.callBackObj = false;
                }
            } else {
                console.log(state.callBackObj.callback);

                state.isShowLogin = !state.isShowLogin
                if (state.callBackObj) {
                    let tempCBObj = state.callBackObj;
                    await tempCBObj.callback(...tempCBObj.callbackParam);
                }
                state.callBackObj = false;
            }
        },
        CHANGECURRENTPATH(state, target) {
            state.currentPath = target
        },
        // 点击改变书籍信息
        CHANGEADDCURRENTBOOKINFO(state, target) {
            state.addCurrentBookInfo = target
        }
    },
    actions: {
        changeUserInfo({ commit }, target) {
            commit('CHANGEUSERINFO', target)
        },
        changeLoadingStatus({ commit }, target) {
            commit('CHANGELOADINGSTATUs', target)
        },
        changeLoginShow({ commit }, target) {
            console.log(target)
            commit('CHANGELOGINSHOW', target)
        },
        changeCurrentPath({ commit }, target) {
            commit('CHANGECURRENTPATH', target)
        },
        // commt修改书籍信息
        changeAddCurrentBookInfo({ commit }, target) {
            commit('CHANGEADDCURRENTBOOKINFO', target)
        }
    }
}