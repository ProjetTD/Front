<template>
  <div>
    <p>Bienvenue !</p>
    <board></board>
  </div>
</template>

<script>
import Board from '@/components/player/Board.vue'

export default {
  name: 'Player',
  components: {
    Board
  }
}
</script>

<style scoped>
</style>
