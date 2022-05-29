import {defineStore} from 'pinia'
import {useConfigStore} from "./configStore";
import {useBombsStore} from "./bombsStore";

export const useGameStateStore = defineStore('gameState', {
    state: () => {
        return {
            cells: [],
            gameState: 0,
            flagsCount: 10,
        }
    },

    getters: {
        tileCoordinates: () => {
            const config = useConfigStore();
            return (index) => {
                return {
                    row: Math.floor(index / config.width),
                    column: index % config.width,
                }
            };
        },

        index: () => {
            const config = useConfigStore();
            return (row, column) => {
                if (row < 0) return;
                if (column < 0) return;
                if (row >= config.height) return;
                if (column >= config.width) return;

                return row * config.width + column;
            }
        },

        gameFailed: (state) => state.cells.find(cell => cell.bomb && cell.revealed),

        gameWon: (state) => {
            const config = useConfigStore();
            const bombs = useBombsStore();
            return (config.width * config.height - bombs.bombsCount) === state.cells.filter((t) => t.revealed).length;
        },

        gameStatus: (state) => {
            if (state.gameFailed) return 'sad.png';
            if (state.gameWon) return 'glasses.png';
            return 'smiley.png';
        }
    },

    actions: {
        updateCellFlag(cell) {
            this.cells = this.cells.map(cll => (cll.id === cell.id) ? {...cll, flagged: !cll.flagged} : cll);
        },

        updateCellReveal(cell) {
            this.cells = this.cells.map(cll => (cll.id === cell.id) ? {...cll, revealed: true} : cll);
        },

        generateCells() {

            const config = useConfigStore();
            const bombsStore = useBombsStore();

            const bombs = Array.from({length: config.width * config.height});

            let planedBombs = 0;

            while (planedBombs !== bombsStore.bombsCount) {
                const index = Math.floor(Math.random() * config.width * config.height);
                if (!bombs[index]) {
                    bombs[index] = true;
                    planedBombs++;
                }
            }

            this.cells = bombs.map((bomb, i, array) => {
                const {row, column} = this.tileCoordinates(i);

                let surroundingBombs = 0;
                if (array[this.index(row - 1, column - 1)]) surroundingBombs++;
                if (array[this.index(row - 1, column - 0)]) surroundingBombs++;
                if (array[this.index(row - 1, column + 1)]) surroundingBombs++;
                if (array[this.index(row - 0, column - 1)]) surroundingBombs++;
                if (array[this.index(row - 0, column + 1)]) surroundingBombs++;
                if (array[this.index(row + 1, column - 1)]) surroundingBombs++;
                if (array[this.index(row + 1, column - 0)]) surroundingBombs++;
                if (array[this.index(row + 1, column + 1)]) surroundingBombs++;

                return {
                    bomb,
                    flagged: false,
                    revealed: false,
                    id: i,
                    surroundingBombs
                }
            });
        }
    }
})