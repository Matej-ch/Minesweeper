<template>
    <div class="scoreboard">
        <div>{{ remainingBombs | addLeadingZeros }}</div>
        <div><button @click="reset">{{ gameStatus }}</button></div>
        <div>{{ time | addLeadingZeros }}</div>
    </div>
</template>

<script>

    import {mapActions,mapGetters} from "vuex";

    export default {
        name: "ScoreBoard",
        computed: {
            ...mapGetters(['time','remainingBombs','gameStatus'])
        },
        methods : {
            reset: function () {
                console.log('reset');
                this.generateCells();
            },
            ...mapActions(['generateCells'])
        }
    }
</script>

<style scoped>
    .scoreboard {
        padding: 15px;
        width: 100%;
        background-color: silver;
        display: flex;
        flex-direction: row;
        font-size: 1.5em;
    }
</style>