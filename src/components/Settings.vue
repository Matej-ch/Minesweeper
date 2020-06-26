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
                <div class="sub-info">
                    <div class="center" style="min-width: 100px">&nbsp;</div>
                    <div class="center">Width</div>
                    <div class="center">Height</div>
                    <div class="center">Bombs</div>
                </div>
                <div class="content">
                    <div class="btn-wrapper">
                        <button class="btn" @click="difficulty('easy',10)">Easy</button>
                        <div class="center">8</div>
                        <div class="center">8</div>
                        <div class="center">10</div>
                    </div>
                    <div class="btn-wrapper">
                        <button class="btn" @click="difficulty('medium',40)">Medium</button>
                        <div class="center">16</div>
                        <div class="center">16</div>
                        <div class="center">40</div>
                    </div>
                    <div class="btn-wrapper">
                        <button class="btn" @click="difficulty('hard',99)">Expert</button>
                        <div class="center">30</div>
                        <div class="center">16</div>
                        <div class="center">99</div>
                    </div>
                    <div class="btn-wrapper">
                        <button class="btn" @click="difficulty('custom',0)">Custom</button>
                        <div class="center"><input type="number" value="10" ref="width" class="input"></div>
                        <div class="center"><input type="number" value="10" ref="height" class="input"></div>
                        <div class="center"><input type="number" value="4" ref="bombs" class="input"></div>
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

                if(diffLevel === 'custom') {
                    this.setDifficulty({difficulty:diffLevel,
                        width: parseInt(this.$refs.width.value),
                        height: parseInt(this.$refs.height.value),
                        cellSize: 35});

                    this.setBombCount(parseInt(this.$refs.bombs.value));
                } else {
                    this.setDifficulty({difficulty:diffLevel});

                    this.setBombCount(bombs);
                }

                this.resetTimer();

                this.generateCells();
            },
            switchMode: function () {
                this.setDarkMode(!this.darkMode);
            },
            ...mapActions(['setDifficulty','resetTimer','setBombCount','setDarkMode','generateCells'])
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
            bottom: -242px;
            min-width: 300px;
        }

        &.display {
            bottom: -38px;
            left: 60px;
        }
    }

    .sub-info {
        display: flex;
        padding: 3px;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .close {
        float: right;
        font-weight: bold;
        font-size: 1.1em;
        cursor: pointer;
    }
    .btn-wrapper {
        padding-bottom: 5px;
        padding-top: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .btn {
        border: 3px solid #fff;
        color: #fff;
        font-family: inherit;
        font-size: inherit;
        background: none;
        cursor: pointer;
        padding: 10px 20px;
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 700;
        outline: none;
        position: relative;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        transition: all 0.3s;
        min-width: 100px;

    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .center {
        align-self: center;
    }

    .input {
        max-width: 50px;
    }
</style>