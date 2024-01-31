<template>
  <div class="flex items-center justify-center w-full p-6">
    <img class="h-[600px]" src="@/assets/images/player/plate.png">
    <robot v-for="robot in robots" :key="robot.id" :position="robot.position"></robot>
    <alien v-for="alien in aliens" :key="alien.id" :position="alien.position"></alien>
  </div>
</template>

<script>
import Robot from "./Robot.vue";
import Alien from "./Alien.vue";

export default {
  components: {
    Robot,
    Alien,
  },
  data() {
    return {
      robots: [{ id: 1, position: { x: 0, y: 0 } }],
      aliens: [{ id: 1, position: { x: 3, y: 3 } }],
    };
  },
};
</script>