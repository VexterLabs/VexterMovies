export default {
    namespaced: true,
    state: {
        opeationIndex: -1,
        bgColor: 0,
        fontSize: 20,
        currentChapterId: '',
        currentChapterName: ''
    },
    mutations: {
        CHANGEOPEATIONINDEX(state,index){
            state.opeationIndex = index
        },
        CHANGEBGCOLOR(state, bgColor){
            state.bgColor = bgColor
        },
        CHANGEFONTSIZE(state, fontSize){
            state.fontSize = fontSize
        },
        CHANGECHAPTERID(state, target){
            if(target.id){
                state.currentChapterId = target.id
            }
            if(target.chapterName){
                state.currentChapterName = target.chapterName
            }
        }
    },
    actions: {
        changeOpeationIndex({commit}, index){
            commit('CHANGEOPEATIONINDEX',index)
        },
        changeBgColor({ commit }, bgColor){
            commit('CHANGEBGCOLOR', bgColor)
        },
        changeFontSize({ commit }, fontSize){
            commit('CHANGEFONTSIZE', fontSize)
        },
        changeChapterId({commit}, target){
            if(target){
                commit('CHANGECHAPTERID', target)
            }
        }
    }
}
