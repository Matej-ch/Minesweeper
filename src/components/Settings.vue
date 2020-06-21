<template>
    <div class="difficulty">
        <div class="setting"><a href="#">Game</a></div>
        <div class="setting"><a href="#">Display</a></div>
        <div class="setting"><a href="#">Controls</a></div>


        <div>this will go to game menu</div>
        <div><button @click="difficulty('easy',10)">Easy</button></div>
        <div><button @click="difficulty('medium',40)">Medium</button></div>
        <div><button @click="difficulty('hard',99)">Expert</button></div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "Settings",
        methods: {
            difficulty: function (diffLevel,bombs) {
                this.setDifficulty({difficulty:diffLevel});

                this.resetTimer();

                this.setBombCount(bombs);
            },
            ...mapActions(['setDifficulty','resetTimer','setBombCount'])
        }
    }
</script>

<style scoped lang="scss">
    .difficulty {
        display: flex;
        width: 100%;

        .setting {
            font-size: 1em;
            padding: 15px;
        }
    }
</style>