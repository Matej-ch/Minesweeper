const state ={
    planted: 0,
    bombsCount: 10,
}

const getters = {
    remainingBombs: state => {
        return state.bombsCount;
    }
}

const mutations = {
    setBombCount(state,bombCount) {
        state.bombsCount = bombCount;
    }
}

const actions = {
    setBombCount({ commit },bombCount) {
        commit('setBombCount',bombCount);
    }
}

export  default  {
    state,
    getters,
    actions,
    mutations
}