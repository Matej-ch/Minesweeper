const state = {
    difficulty: 'easy',
    width: 8,
    height: 8,
    cellSize: 50,
}

const getters = {
    width: state => {
        return state.width;
    },
    height: state => {
        return state.height;
    },
    size: state => {
        return state.cellSize
    },
}

const mutations = {
    updateDifficulty(state,payload) {
        state.width = payload.width;
        state.height = payload.height;
        state.cellSize = payload.cellSize;
        state.difficulty = payload.diff;
    }
}

const actions = {
    resetTimer({ commit }) {
        commit('resetTimer');
    },
    setDifficulty({ commit },payload) {
        let diffLookup = [
            {diff: 'easy',width:8,height:8,cellSize:50},
            {diff: 'medium',width:16,height:16,cellSize:35},
            {diff: 'hard',width:30,height:16,cellSize:25},
            {diff: 'custom', width:payload.width, height:payload.height, cellSize:payload.cellSize}];

        let selectedDiff = diffLookup.find(diffLevel => diffLevel.diff === payload.difficulty);

        commit('updateDifficulty',selectedDiff);
    }
}

export  default  {
    state,
    getters,
    actions,
    mutations
}