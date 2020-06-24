const state ={
    cells: [],
    gameState: 0,
    flagsCount: 10,
    timePassed: 0,
}

const getters = {
    cells: state => {
        return state.cells;
    },
    tileCoordinates: (state,rootState) => (index) => {
        return {
            row: Math.floor(index / rootState.width),
            column: index % rootState.width,
        };
    },
    index: (state,rootState)  =>(row,column) => {
        if (row < 0) return;
        if (column < 0) return;
        if (row >= rootState.height) return;
        if (column >= rootState.width) return;

        return row * rootState.width + column;
    },
    gameFailed: (state) => {
        return state.cells.find(cell => cell.bomb && cell.revealed);
    },
    gameWon: (state,rootState) => {
        return (rootState.width * rootState.height - rootState.bombsCount) === state.cells.filter((t) => t.revealed).length;
    },
    gameInProgress: () => {
        return true;
    },
    gameStatus: (state,getters) => {
        if(getters.gameFailed) return 'FAIL';
        if(getters.gameWon) return 'WON';
        return 'IN PROGRESS';
    },

    time: state => {
        return state.timePassed;
    },
    flagsCount: state => {
        return state.flagsCount;
    }
}

const mutations = {
    setCells(state,cells) {
        state.cells = cells;
    },
    updateCellFlag(state,cell) {
        state.cells = state.cells.map(cll => (cll.id === cell.id) ? {...cll, flagged: !cll.flagged} : cll);
    },
    updateCellReveal(state,cell) {
        state.cells = state.cells.map(cll => (cll.id === cell.id) ? {...cll, revealed: true} : cll);
    },
    resetTimer(state) {
        state.timePassed = 0 ;
    },
}

const actions = {
    updateCellFlag({commit},cell) {
        commit('updateCellFlag',cell);
    },
    updateCellReveal({commit},cell) {
        commit('updateCellReveal',cell);
    },
    generateCells({ commit,getters }) {
        const bombs = Array.from({length: getters.width * getters.height});

        let planedBombs = 0;
        while (planedBombs !== getters.bombsCount) {
            const index = Math.floor(Math.random() * getters.width * getters.height);
            if (!bombs[index]) {
                bombs[index] = true;
                planedBombs++;
            }
        }

        let cells = bombs.map((bomb, i, array) => {
            const { row, column } = getters.tileCoordinates(i);

            let surroundingBombs = 0;
            if (array[getters.index(row - 1, column - 1)]) surroundingBombs++;
            if (array[getters.index(row - 1, column - 0)]) surroundingBombs++;
            if (array[getters.index(row - 1, column + 1)]) surroundingBombs++;
            if (array[getters.index(row - 0, column - 1)]) surroundingBombs++;
            if (array[getters.index(row - 0, column + 1)]) surroundingBombs++;
            if (array[getters.index(row + 1, column - 1)]) surroundingBombs++;
            if (array[getters.index(row + 1, column - 0)]) surroundingBombs++;
            if (array[getters.index(row + 1, column + 1)]) surroundingBombs++;

            return {
                bomb,
                flagged: false,
                revealed: false,
                id: i,
                surroundingBombs
            }
        })

        commit('setCells',cells)
    }
}

export  default  {
    state,
    getters,
    actions,
    mutations
}