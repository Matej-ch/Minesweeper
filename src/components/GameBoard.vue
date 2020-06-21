<template>
    <div class="gameboard">

    </div>
</template>

<script>
    export default {
        name: "GameBoard",
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