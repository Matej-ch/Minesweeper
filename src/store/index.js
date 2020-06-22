import Vuex from 'vuex'
import Vue from 'vue'
import config from './modules/config'
import gameState from "./modules/gameState"
import bombs from "./modules/bombs"


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        config,
        gameState,
        bombs
    },
    strict: process.env.NODE_ENV !== 'production'
})