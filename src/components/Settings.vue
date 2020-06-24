<template>
    <div class="difficulty">
        <div class="setting"><a href="#">Game</a></div>
        <div class="setting"><a href="#">Display</a></div>
        <div class="setting"><a href="#">Controls</a></div>

        <div style="display: none">
            <div>this will go to game menu</div>
            <div><button @click="difficulty('easy',10)">Easy</button></div>
            <div><button @click="difficulty('medium',40)">Medium</button></div>
            <div><button @click="difficulty('hard',99)">Expert</button></div>
        </div>

        <div style="display: none">
            Night mode <input type="checkbox">
        </div>

        <div style="display: none">
            <ul>
                <li>Left-click an empty square to reveal it.</li>
                <li>Right-click (or Ctrl+click) an empty square to flag it.</li>
            </ul>
        </div>

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
            font-size: 1.2em;
            padding: 15px;
        }
    }
</style>