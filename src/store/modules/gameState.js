const state ={
    cells: [],
}

const getters = {
    generatedCells: (state,getters) => {
        const bombs = Array.from({length: getters.width * getters.height});

        let planedBombs = 0;
        while (planedBombs !== getters.bombsCount) {
            const index = Math.floor(Math.random() * getters.width * getters.height);
            if (!bombs[index]) {
                bombs[index] = true;
                planedBombs++;
            }
        }

        return bombs.map((bomb, i, array) => {
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
                surroundingBombs
            }
        });
    },
    cells: state => {
        return state.cells;
    },
    tileCoordinates: (state,rootState) => (index) => {
        return {
            row: Math.floor(index / rootState.width),
            column: index % rootState.width,
        };
    },
    index: (rootState)  =>(row,column) => {
        if (row < 0) return;
        if (column < 0) return;
        if (row >= rootState.height) return;
        if (column >= rootState.width) return;

        // Return index
        return row * rootState.width + column;
    },
    gameFailed: (state) => {
        return state.cells.find(cell => cell.bomb && cell.revealed);
    }
}

const mutations = {
    setCells(state,cells) {
        state.cells = cells;
    },
    updateCell(state,cell) {

        state.cells.map(cll => (cll == cell) ? {...cll, flagged: !cll.flagged} : cll);
    }
}

const actions = {
    setCells({commit},cells) {
        commit('setCells',cells);
    },
    updateCell({commit},cell) {
        commit('updateCell',cell);
    }
}

export  default  {
    state,
    getters,
    actions,
    mutations
}