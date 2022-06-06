<template>
    <div id="app" :class="configState.darkMode === true ? 'dark' : ''">
        <div class="h-container">
            <div class="v-container">

                <Settings/>

                <div class="fullboard">
                    <ScoreBoard/>

                    <GameBoard/>
                </div>
            </div>

            <LeaderBoard/>

        </div>

    </div>
</template>

<script setup>
import Settings from "./components/Settings.vue";
import GameBoard from "./components/GameBoard.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
import {useConfigStore} from "./store/configStore";
import {onMounted} from 'vue'
import {useGameStateStore} from "./store/gameStateStore";
import {useBombsStore} from "./store/bombsStore";
import LeaderBoard from "./components/LeaderBoard.vue";

const configState = useConfigStore();
const gameState = useGameStateStore()
const bombsState = useBombsStore()

onMounted(() => {
    configState.updateDifficulty({difficulty: 'easy'});
    bombsState.bombsCount = 10;
    gameState.generateCells();
})

</script>

<style lang="scss">

@import './assets/styles/normalize.css';
@import './assets/styles/main.css';

$bc: silver;

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    &.dark {
        background-color: black;
    }
}

.dark .fullboard {
    background-color: #a6a6a6;
}

.fullboard {
    background-color: $bc;
    padding: 0 20px 20px 20px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.h-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
}

.v-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}
</style>
