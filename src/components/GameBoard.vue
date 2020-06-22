<template>
    <div class="gameboard" :style="cssVars">

    </div>
</template>

<script>

    import { mapGetters } from "vuex";

    export default {
        name: "GameBoard",
        computed: {
            ...mapGetters(['width','height','size']),
            cssVars: function() {
                return {
                    "--width": this.width,
                    "--height": this.height,
                    "--size": `${this.size}px`
                }
            }
        },
        method : {
            generateGameBoard: function() {

            }
        },
    }
</script>

<style scoped lang="scss">
    .gameboard {
        background-color: silver;
        padding: 15px;
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size: 1.5em;
    }
</style>