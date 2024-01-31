<template>
  <div class="alien" :style="{ top: position.y * 50 + 'px', left: position.x * 50 + 'px' }"></div>
</template>

<script>
export default {
  props: ["position"],
};
</script>

<style scoped>
#app {
  text-align: center;
}

.robot,
.alien {
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: red; /* or blue for aliens */
}
</style>