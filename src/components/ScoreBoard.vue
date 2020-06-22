<template>
    <div class="scoreboard">
        <div>{{ flags | addLeadingZeros }}</div>
        <div><button @click="reset">RESET(SMILE FACE)</button></div>
        <div>{{ time | addLeadingZeros }}</div>
    </div>
</template>

<script>

    import { mapActions,mapGetters } from "vuex";

    export default {
        name: "ScoreBoard",
        computed: {
            ...mapGetters(['time','flags'])
        },
        methods : {
            reset: function () {

                this.resetTimer();
            },
            ...mapActions(['resetTimer'])
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