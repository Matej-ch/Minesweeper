import {defineStore} from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => {
        return {
            difficulty: 'easy',
            width: 8,
            height: 8,
            cellSize: 50,
            darkMode: false,
        }
    },

    getters: {
        size: (state) => state.cellSize
    },

    actions: {
        updateDifficulty(payload) {

            const diffLookup = [
                {diff: 'easy', width: 8, height: 8, cellSize: 50},
                {diff: 'medium', width: 16, height: 16, cellSize: 35},
                {diff: 'hard', width: 30, height: 16, cellSize: 25},
                {diff: 'custom', width: payload.width, height: payload.height, cellSize: payload.cellSize}];

            const selectedDiff = diffLookup.find(diffLevel => diffLevel.diff === payload.difficulty);

            this.width = selectedDiff.width;
            this.height = selectedDiff.height;
            this.cellSize = selectedDiff.cellSize;
            this.difficulty = selectedDiff.diff;
        }
    }
})