const state ={
    planted: 0,
    bombsCount: 10,
}

const getters = {
}

const actions = {
    setBombCount({ commit },bombCount) {
        commit('setBombCount',bombCount);
    }
}

const mutations = {
    setBombCount(state,bombCount) {
        state.bombsCount = bombCount;
    }
}

export  default  {
    state,
    getters,
    actions,
    mutations
}