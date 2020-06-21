import Vuex from 'vuex'
import Vue from 'vue'
import config from './modules/config'
import cells from "./modules/cells"


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        config,
        cells
    }
})