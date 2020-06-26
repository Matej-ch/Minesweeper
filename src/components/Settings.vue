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

        <transition name="fade">
            <div v-show="game" class="window game">
                <div class="header">Game <a @click="game = false" class="close">X</a></div>
                <div class="content">
                    <div class="btn-wrapper">
                        <button @click="difficulty('easy',10)">Easy</button>
                    </div>
                    <div class="btn-wrapper">
                        <button @click="difficulty('medium',40)">Medium</button>
                    </div>
                    <div class="btn-wrapper">
                        <button @click="difficulty('hard',99)">Expert</button>
                    </div>
                    <div class="btn-wrapper">

                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-show="display" class="window display">
                <div class="header">Display <a class="close" @click="display = false">X</a></div>
                <div class="content"><label for="nightmode">Night mode</label> <input id="nightmode" type="checkbox" @click="switchMode"></div>
            </div>
        </transition>

        <transition name="fade">
            <div v-show="controls" class="window controls">
                <div class="header">Controls <a class="close" @click="controls = false">X</a></div>
                <ul>
                    <li><span class="bold">Left-click</span> an empty square to reveal it.</li>
                    <li><span class="bold">Right-click</span> (or <span class="bold">Ctrl+click</span>) an empty square to flag it.</li>
                </ul>
            </div>
        </transition>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Settings",
        data: function () {
            return {
                controls: false,
                display: false,
                game: false
            }
        },
        computed : {
            ...mapGetters(['darkMode'])
        },
        methods: {
            difficulty: function (diffLevel,bombs) {
                this.setDifficulty({difficulty:diffLevel});

                this.resetTimer();

                this.setBombCount(bombs);
            },
            switchMode: function () {
                this.setDarkMode(!this.darkMode);
            },
            ...mapActions(['setDifficulty','resetTimer','setBombCount','setDarkMode'])
        }
    }
</script>

<style scoped lang="scss">

    .dark a {
        color: whitesmoke;
    }

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
            bottom: -162px;
        }

        &.display {
            bottom: -38px;
            left: 60px;
        }
    }

    .close {
        float: right;
        font-weight: bold;
        font-size: 1.1em;
        cursor: pointer;
    }
    .btn-wrapper {
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>