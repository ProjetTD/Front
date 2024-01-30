<template>
  <div class="home">
    <div class="flex row gap-3" v-for="alien in aliens" :key="alien">
      <p>Nom: {{ alien.name }}</p>
      <p>ID: {{ alien.id_alien }}</p>
      <p>Vie: {{ alien.health }}</p>
      <p>Puissance: {{ alien.power }}</p>
      <p>Vitesse: {{ alien.speed }}</p>
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: 'HomeView',
  data() {
    return {
      aliens: null,
    }
  },
  methods: {
    async getAliens() {
      const response = await this.$api.get('/aliens/');
      this.aliens = response.data;
    },
  },
  mounted() {
    this.getAliens();
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: black;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  text-align: center;
}

.home > div {
  animation: fade 3s ease-in-out;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(-50);
  }
}
</style>