<template>
  <div id="app">

      <Settings />

    <div class="fullboard">
      <ScoreBoard/>

      <GameBoard />
    </div>

  </div>
</template>

<script>
import Settings from "./components/Settings";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

import {mapActions} from 'vuex';

export default {
  name: 'App',
  created() {
    this.setDifficulty({difficulty:'easy'});
    this.setBombCount(10);
    this.generateCells();
  },
  components: {
    ScoreBoard,
    GameBoard,
    Settings,
  },
  methods: {
    ...mapActions(['setDifficulty','setBombCount','generateCells'])
  }
}
</script>

<style lang="scss">

  @import './assets/styles/normalize.css';
  @import './assets/styles/main.css';

  $bc: silver;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  width: 100%;
}

  .fullboard {
    background-color: $bc;
    width: 100%;
  }
</style>
