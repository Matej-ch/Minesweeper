<template>
    <div class="cell"
         @click="reveal(cellData.id)"
         @contextmenu.prevent="flag"
         :data-surrounding-bombs="cellData.surroundingBombs"
         :class="{revealed: cellData.revealed, 'wrong-pick': gameFailed && ((cellData.bomb && cellData.revealed) || (!cellData.bomb && cellData.flagged))}">

        <img class="image" v-if="cellData.flagged" :src="require('@/assets/flag.png')">
        <img v-else-if="cellData.revealed && cellData.bomb" :src="require('@/assets/bomb.png')">
        <span v-else-if="cellData.revealed && cellData.surroundingBombs">{{ cellData.surroundingBombs }}</span>

    </div>
</template>

<script>

    import { mapGetters,mapActions } from "vuex";

    export default {
        name: "Cell",
        props : {
            cellData: {
                type: Object
            },
        },
        computed : {
            ...mapGetters(['gameFailed','cells','tileCoordinates','index','flagsCount'])
        },
        methods: {
            reveal: function (id) {
                if(this.gameFailed) { return; }

                if(id == undefined) { return; }

                let cell = this.cells.find(cll => cll.id === id);

                if(cell.flagged) { return; }

                if (!cell.revealed) {
                    this.updateCellReveal(cell);


                    if(!cell.bomb && cell.surroundingBombs === 0) {
                        const {row,column} = this.tileCoordinates(cell.id);

                        this.reveal(this.index(row - 1, column - 1)); // Reveal top left neighbour
                        this.reveal(this.index(row - 1, column - 0)); // Reveal top neighbour
                        this.reveal(this.index(row - 1, column + 1)); // Reveal top right neighbour
                        this.reveal(this.index(row - 0, column - 1)); // Reveal left neighbour
                        this.reveal(this.index(row - 0, column + 1)); // Reveal right neighbour
                        this.reveal(this.index(row + 1, column - 1)); // Reveal bottom left neighbour
                        this.reveal(this.index(row + 1, column - 0)); // Reveal bottom neighbour
                        this.reveal(this.index(row + 1, column + 1)); // Reveal bottom right neighbour
                    } else {
                        this.setCells(this.cells.map(cll => (cell.bomb) ? {...cll, revealed: true} : cll));
                    }
                }
            },
            flag: function () {

                if(this.gameFailed) { return; }

                if(this.cellData.id == undefined) { return; }

                if(this.cells.filter(cell => cell.flagged).length === this.flagsCount) { return; }

                this.updateCellFlag(this.cellData);
            },
            ...mapActions(['updateCellFlag','updateCellReveal','setCells'])
        }
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

        &:not(.revealed) {
            $shadow: calc(var(--size) / 15);
            $color1: rgba(255, 255, 255, 0.45);
            $color2:rgba(0, 0, 0, 0.35);
            @include add-shadow($shadow,$color1,$color2);
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