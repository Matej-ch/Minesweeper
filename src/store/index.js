import Vuex from 'vuex'
import Vue from 'vue'
import config from './modules/config'
import cells from "./modules/cells"
import bombs from "./modules/bombs"


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        config,
        cells,
        bombs
    },
    strict: process.env.NODE_ENV !== 'production'
})