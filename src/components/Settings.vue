<template>
    <div class="difficulty">
        <div class="setting">
            <a @click.prevent="game = !game; display = false; controls=false" href="#">Game</a>
        </div>
        <div class="setting">
            <a @click.prevent="display =!display;game=false;controls=false" href="#">Display</a>
        </div>
        <div class="setting">
            <a @click.prevent="controls = !controls;display = false;game=false" href="#">Controls</a>
        </div>

        <div v-show="game" class="window game">
            <div class="header">Game</div>
            <div class="content">
                <div>
                    <button @click="difficulty('easy',10)">Easy</button>
                </div>
                <div>
                    <button @click="difficulty('medium',40)">Medium</button>
                </div>
                <div>
                    <button @click="difficulty('hard',99)">Expert</button>
                </div>
            </div>

        </div>

        <div v-show="display" class="window display">
            <div class="header">Display</div>
            <div class="content">Night mode <input type="checkbox"></div>
        </div>

        <div v-show="controls" class="window controls">
            <div class="header">Controls</div>
            <ul>
                <li><span class="bold">Left-click</span> an empty square to reveal it.</li>
                <li><span class="bold">Right-click</span> (or <span class="bold">Ctrl+click</span>) an empty square to flag it.</li>
            </ul>
        </div>

    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "Settings",
        data: function () {
            return {
                controls: false,
                display: false,
                game: false
            }
        },
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
        position: relative;

        .setting {
            font-size: 1.2em;
            padding: 15px;
        }
    }

    .bold {
        font-weight: bold;
    }

    .window {
        position: absolute;
        background-color: slategray;
        .header {
            background-color: dodgerblue;
            padding: 5px;
            color: white;
            font-weight: bold;
            text-align: left;
        }

        .content {
            padding: 5px;
        }

        &.controls {
            bottom: -68px;
            right: 8px;
            ul {
                text-align: left;
                padding-left: 20px;
                line-height: 1.5em;
            }
        }

        &.game {
            bottom: -79px;
        }

        &.display {
            bottom: -38px;
            left: 60px;
        }
    }
</style>