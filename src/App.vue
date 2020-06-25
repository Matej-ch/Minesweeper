<template>
  <div id="app" :class="darkMode === true ? 'dark' : ''">
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

import {mapActions, mapGetters} from 'vuex';

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
    ...mapActions(['setDifficulty','setBombCount','generateCells','timePassed','setIntervalID'])
  },
  computed : {
    ...mapGetters(['darkMode','intervalID','gameInProgress'])
  },
  watch : {
    gameInProgress(value) {

      if (value) {
        this.setIntervalID(setInterval(() => {
          this.timePassed(1);
        }, 1000));
      } else {
        // Once the game ended stop the timer
        clearInterval(this.intervalID);
      }
    }
  },
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
  height: 100%;

  &.dark {
    background-color: black;
  }
}

  .dark .fullboard {
    background-color: #a6a6a6;
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
    justify-content: flex-start;
    height: 100%;
  }
</style>
