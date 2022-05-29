<template>
    <div class="gameBoard" :style="cssVars">
        <Cell v-for="cell in gameState.cells" :key="cell.id" :cellData="cell"/>
    </div>
</template>

<script setup>

import Cell from "./Cell.vue";
import {useConfigStore} from "../store/configStore";
import {useGameStateStore} from "../store/gameStateStore";
import {computed} from "vue";

const configState = useConfigStore();
const gameState = useGameStateStore();

const cssVars = computed(() => {
    return {
        "--width": configState.width,
        "--height": configState.height,
        "--size": `${configState.size}px`
    }
})

</script>

<style scoped lang="scss">

.gameBoard {
    background-color: silver;
    display: grid;
    grid-template-columns: repeat(var(--width), auto);
    grid-template-rows: repeat(var(--height), auto);
    user-select: none;
    font-size: 1.5em;
    width: calc(var(--width) * var(--size));
}

</style>