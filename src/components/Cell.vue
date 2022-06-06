<template>
    <div class="cell"
         @click="reveal(cellData.id)"
         @contextmenu.prevent="flag"
         :data-surrounding-bombs="cellData.surroundingBombs"
         :class="{revealed: cellData.revealed, 'wrong-pick': gameState.gameFailed && ((cellData.bomb && cellData.revealed) || (!cellData.bomb && cellData.flagged))}">

        <img class="image" v-if="cellData.flagged" :src="flagUrl">
        <img class="image" v-else-if="cellData.revealed && cellData.bomb" :src="bombUrl">
        <span v-else-if="cellData.revealed && cellData.surroundingBombs">{{cellData.surroundingBombs}}</span>

    </div>
</template>

<script setup>

import {useGameStateStore} from "../store/gameStateStore";

const gameState = useGameStateStore();

const flagUrl = new URL(`../assets/flag.png`, import.meta.url).href
const bombUrl = new URL(`../assets/bomb.png`, import.meta.url).href

const props = defineProps({
    cellData: Object
})

function reveal(id) {
    if (gameState.gameFailed) {
        return;
    }

    if (id === undefined || id === null) {
        return;
    }

    let cell = gameState.cells.find(cll => cll.id === id);

    if (cell.flagged) {
        return;
    }

    if (!cell.revealed) {
        gameState.updateCellReveal(cell);

        if (!cell.bomb && cell.surroundingBombs === 0) {
            const {row, column} = gameState.tileCoordinates(cell.id);

            reveal(gameState.index(row - 1, column - 1)); // Reveal top left neighbour
            reveal(gameState.index(row - 1, column - 0)); // Reveal top neighbour
            reveal(gameState.index(row - 1, column + 1)); // Reveal top right neighbour
            reveal(gameState.index(row - 0, column - 1)); // Reveal left neighbour
            reveal(gameState.index(row - 0, column + 1)); // Reveal right neighbour
            reveal(gameState.index(row + 1, column - 1)); // Reveal bottom left neighbour
            reveal(gameState.index(row + 1, column - 0)); // Reveal bottom neighbour
            reveal(gameState.index(row + 1, column + 1)); // Reveal bottom right neighbour
        } else {
            gameState.cells = gameState.cells.map(cll => (cell.bomb) ? {...cll, revealed: true} : cll);
            gameState.gameState = 1;
        }
    }
}

function flag() {
    if (gameState.gameFailed) {
        return;
    }

    if (props.cellData.id === undefined || props.cellData.id === null) {
        return;
    }

    if (gameState.cells.filter(cell => cell.flagged).length === gameState.flagsCount) {
        return;
    }

    gameState.updateCellFlag(props.cellData);
}

</script>

<style scoped lang="scss">

@mixin add-shadow($offset,$color1,$color2) {
    $opposite: calc(#{$offset} * -1);
    box-shadow: inset $offset $offset 0 0 $color1,
    inset $opposite $opposite 0 0 $color2;
}

.dark .cell {
    background-color: #a6a6a6;
}

.cell {
    background-color: silver;
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    font-weight: bold;
    font-size: 2rem;

    &:not(.revealed) {
        $shadow: calc(var(--size) / 15);
        $color1: rgba(255, 255, 255, 0.45);
        $color2: rgba(0, 0, 0, 0.35);
        @include add-shadow($shadow, $color1, $color2);
        border-radius: 1px;
        cursor: pointer;
    }

    &.revealed {
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
    }

    &.wrong-pick {
        background-color: lightcoral;
    }

    &[data-surrounding-bombs="1"] {
        color: blue;
    }

    &[data-surrounding-bombs="2"] {
        color: green;
    }

    &[data-surrounding-bombs="3"] {
        color: red;
    }

    &[data-surrounding-bombs="4"] {
        color: purple;
    }

    &[data-surrounding-bombs="5"] {
        color: maroon;
    }

    &[data-surrounding-bombs="6"] {
        color: turquoise;
    }

    &[data-surrounding-bombs="7"] {
        color: black;
    }

    &[data-surrounding-bombs="8"] {
        color: gray;
    }
}

.image {
    max-width: 35px;
}
</style>