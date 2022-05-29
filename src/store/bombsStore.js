import {defineStore} from 'pinia'
import {useGameStateStore} from './gameStateStore';

export const useBombsStore = defineStore('bombs', {
    state: () => {
        return {
            bombsCount: 10
        }
    },
    getters: {
        remainingBombs: (state) => {
            const gameState = useGameStateStore();
            return state.bombsCount - gameState.cells.filter((cell) => cell.flagged).length
        }
    },
})