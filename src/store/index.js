import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import cate from './modules/cate/cate';
import specs from './modules/specs/specs';
import banner from './modules/banner/banner';
import goods from './modules/goods/goods';
import seck from './modules/seck/seck';
import actions from './actions';
import {state,mutations,getters} from './mutations';
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        cate,specs,banner,goods,seck
    }
})