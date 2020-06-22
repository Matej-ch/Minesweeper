const state ={
    cells: [],
}

const getters ={
    /*generateCells: (state,rootState,getters) => {
        const bombs = Array.from({length: rootState.width * rootState.height});
        let planedBombs = 0;

        while (planedBombs !== rootState.bombsCount) {
            const index = Math.floor(Math.random() * rootState.width * rootState.height);
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
    },*/
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
    }
}

const mutations = {}

const actions = {}

export  default  {
    state,
    getters,
    actions,
    mutations
}