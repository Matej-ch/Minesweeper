<template>
    <div class="cell"
         @click="reveal"
         @contextmenu.prevent="flag"
         :data-surrounding-bombs="cellData.surroundingBombs"
         :class="{revealed: cellData.revealed, 'wrong-pick': gameFailed && ((cellData.bomb && cellData.revealed) || (!cellData.bomb && cellData.flagged))}">

        <span v-if="cellData.flagged">F</span>
        <span v-else-if="cellData.revealed && cellData.bomb">B</span>
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
            ...mapGetters(['gameFailed','cells'])
        },
        methods: {
            reveal: function () {
                if(this.gameFailed) { return; }

                if(this.cellData.id == undefined) { return; }

                if(this.cellData.flagged) { return; }

                if (!this.cellData.revealed) {
                    this.updateCellReveal(this.cellData);


                }
            },
            flag: function () {

                if(this.gameFailed) { return; }

                if(this.cellData.id == undefined) { return; }

                this.updateCellFlag(this.cellData);
            },
            ...mapActions(['updateCellFlag','updateCellReveal'])
        }
    }
</script>

<style scoped lang="scss">

    @mixin add-shadow($offset) {
        $opposite: calc(#{$offset} * -1);
        box-shadow: inset $offset $offset 0 0 rgba(255, 255, 255, 0.45),
        inset $opposite $opposite 0 0 rgba(0, 0, 0, 0.25);
    }

    .cell {
        background-color: silver;
        width: var(--size);
        height: var(--size);
        line-height: var(--size);

        &:not(.revealed) {
            $shadow: calc(var(--size) / 12.5);
            @include add-shadow($shadow);
            border-radius: 4px;
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
</style>