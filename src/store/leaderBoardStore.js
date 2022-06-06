import {defineStore} from 'pinia'

export const useLeaderBoardStore = defineStore('leaderBoardStore', {
    state: () => {
        return {
            scores: [],
        }
    },

    getters: {
        leaderboard: (state) => {
            state.scores = JSON.parse(localStorage.getItem('scores'));
            return state.scores;
        }
    },
    actions: {
        updateLeaderboard() {

        }
    }
});