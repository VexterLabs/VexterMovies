/*
 * @Description:
 * @FilePath: \haiwai_m\src\store\store.js
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2020-05-11 15:04:33
 * @LastEditors: CuiGang
 * @LastEditTime: 2020-07-25 12:12:31
 */
import Vue from 'vue'
import Vuex from 'vuex'
import moduleRead from './modules/read'
import moduleHome from './modules/home'
import moduleSearch from './modules/search'
import moduleUserCenter from './modules/userCenter'
import axios from "axios";
import HomeDataModule from "./page/home";
import HubDataModule from "./page/hub";
import ContestDataModule from "./page/contest";
import AlphaDataModule from "./page/alpha";
import moduleHub from './modules/hub'
import HomeCategoryModule from "./page/category";

Vue.use(Vuex);
const CancelToken = axios.CancelToken;
export function createStore() {
    return new Vuex.Store({
        state: { source: CancelToken.source(), },
        modules: {
            moduleRead,
            moduleHome,
            moduleSearch,
            moduleUserCenter,
            HomeDataModule,
            moduleHub,
            HubDataModule,
            HomeCategoryModule,
            ContestDataModule,
            AlphaDataModule
        }
    });
}