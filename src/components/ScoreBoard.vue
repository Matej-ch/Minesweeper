<template>
    <div class="scoreboard">
        <div>Flags count</div>
        <div><button @click="reset">RESET(SMILE FACE)</button></div>
        <div>times</div>
    </div>
</template>

<script>

    import { mapActions } from "vuex";

    export default {
        name: "ScoreBoard",
        methods : {
            reset: function () {

                this.resetTimer();
            },
            ...mapActions['resetTimer']
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