<template>
    <div class="gameboard" :style="cssVars">
        <Cell v-for="(cell,i) in generatedCells" :key="i" :cellData="cell"/>
    </div>
</template>

<script>

    import Cell from "@/components/Cell";
    import { mapGetters } from "vuex";

    export default {
        name: "GameBoard",
        components: {
            Cell
        },
        computed: {
            ...mapGetters(['width','height','size','generatedCells']),
            cssVars: function() {
                return {
                    "--width": this.width,
                    "--height": this.height,
                    "--size": `${this.size}px`
                }
            }
        },
        method : {
        },
    }
</script>

<style scoped lang="scss">

    .gameboard {
        background-color: silver;
        display: grid;
        grid-template-columns: repeat(var(--width), auto);
        grid-template-rows: repeat(var(--height), auto);
        user-select: none;
        font-size: 1.5em;
        width: calc(var(--width) * var(--size));
    }

</style>