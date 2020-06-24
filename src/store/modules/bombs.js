const state ={
    bombsCount: 10,
}

const getters = {
    remainingBombs: (state,rootState) => {
        return state.bombsCount - rootState.cells.filter((cell) => cell.flagged).length;
    },
    bombsCount: function (state) {
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