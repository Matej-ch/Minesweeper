<template>
    <div class="scoreboard">
        <div class="remaining">{{ remainingBombs | addLeadingZeros }}</div>
        <div><button class="face-btn" @click="reset"><img :src="require('@/assets/' + gameStatus + '')"></button></div>
        <div class="time">{{ time | addLeadingZeros }}</div>
    </div>
</template>

<script>

    import {mapActions,mapGetters} from "vuex";

    export default {
        name: "ScoreBoard",
        computed: {
            ...mapGetters(['remainingBombs','gameStatus','cells']),
            gameIsProgress() {

                if (this.gameStatus === 'sad.png'  || this.gameStatus === 'glasses.png') return false;

                if (!this.cells.find((cell) => cell.revealed)) return false;

                return true;
            }
        },
        data: function() {
            return {
                time: 0, // Seconds passed since the game started
                timerIntervalID: undefined
            }
        },
        watch: {
            gameIsProgress(value) {
                if (value) {
                    this.timerIntervalID = setInterval(() => {
                        this.time++;
                    }, 1000);
                } else {
                    clearInterval(this.timerIntervalID);
                }
            }
        },
        methods : {
            reset: function () {
                this.generateCells();
            },
            ...mapActions(['generateCells'])
        },
    }
</script>

<style scoped lang="scss">
    .scoreboard {
        padding: 15px;
        width: 100%;
        background-color: silver;
        display: flex;
        flex-direction: row;
        font-size: 1.5em;
        justify-content: space-between;

        .remaining {
            font-weight: bold;
            font-size: 1.5em;
        }

        .time {
            font-weight: bold;
            font-size: 1.5em;
        }
    }

    .dark .scoreboard {
        background-color: #a6a6a6;
    }

    .face-btn {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        img{
            max-width: 40px;
        }

    }
</style>