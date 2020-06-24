<template>
  <div id="app">
    <div class="h-container">
      <div class="v-container">

        <Settings />

        <div class="fullboard">
          <ScoreBoard/>

          <GameBoard />
        </div>
      </div>
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
  flex-flow: wrap;
  flex-direction: column;
  justify-content: center;
}

  .fullboard {
    background-color: $bc;
    padding: 0 20px 20px 20px;
  }

  .h-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
  }

  .v-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
</style>
