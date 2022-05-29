<template>
    <div class="scoreboard">
        <div class="remaining">{{remainingBombsWithZeros()}}</div>
        <div>
            <button class="face-btn" @click="reset">
                <img :src="imgSrc">
            </button>
        </div>
        <div class="time">{{(`00${time}`).slice(-3)}}</div>
    </div>
</template>

<script setup>

import {useGameStateStore} from "../store/gameStateStore";
import {useBombsStore} from "../store/bombsStore";
import {ref, watch, computed} from "vue";

const gameState = useGameStateStore();
const bombsState = useBombsStore();

const time = ref(0);
const timerIntervalID = ref(undefined);

function remainingBombsWithZeros() {
    return (`00${bombsState.remainingBombs}`).slice(-3);
}

const gameIsProgress = computed(() => {
    if (gameState.gameStatus === 'sad.png' || gameState.gameStatus === 'glasses.png') return false;

    return gameState.cells.find((cell) => cell.revealed);
});

const imgSrc = computed(() => {
    return new URL(`../assets/${gameState.gameStatus}`, import.meta.url).href
})

function reset() {
    gameState.generateCells();
    time.value = 0;
    timerIntervalID.value = undefined;
}

watch(gameIsProgress, (value) => {
    if (value) {
        timerIntervalID.value = setInterval(() => {
            time.value++;
        }, 1000);
    } else {
        clearInterval(timerIntervalID.value);
    }
})

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

    img {
        max-width: 40px;
    }

}
</style>