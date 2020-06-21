<template>
  <div id="app">

      <DifficultyOptions />

    <div class="board">
      <ScoreBoard/>

      <GameBoard />
    </div>

  </div>
</template>

<script>
import DifficultyOptions from "./components/DifficultyOptions";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";

export default {
  name: 'App',
  components: {
    ScoreBoard,
    GameBoard,
    DifficultyOptions,
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
  width: 100%;
}

  .board {
    background-color: $bc;
  }
</style>
