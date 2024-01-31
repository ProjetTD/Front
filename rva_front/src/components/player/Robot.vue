<template>
  <div class="robot" :style="{ top: position.y * 50 + 'px', left: position.x * 50 + 'px' }"></div>
</template>

<script>
export default {
  props: ["position"],
};
</script>