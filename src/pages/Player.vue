<template>
  <div v-if="user.name !== undefined && user.name" class="h-screen w-full flex items-center justify-center flex-col gap-6 mt-6 mb-2">
    <div class="flex flex-col items-center justify-center h-full w-full gap-6"> <!--MAIN-->
      <div class="flex flex-col lg:flex-row items-center justify-center gap-3 mt-28 lg:mt-0">
        <!-- Informations sur le joueur -->
        <div class="flex flex-row items-center justify-center gap-2 border-white border-[1px] bg-black/95 rounded-xl px-3 py-2">
          <img title="Pseudo" class="h-6 w-6" src="@/assets/images/player/account.svg">
          <p title="Pseudo" class="font-normal">{{ user.name }}</p>
          <img title="Ressources" class="h-6" src="@/assets/images/player/ressources.svg">
          <p title="Ressources" class="font-normal">{{ user.ressources }}</p>
          <img title="Score" class="h-6" src="@/assets/images/player/score.svg">
          <p title="Score" class="font-normal">{{ user.score }}</p>
        </div>
        <!-- Informations sur la partie -->
        <div class="flex flex-row items-center justify-center gap-2 border-white border-[1px] bg-black/95 rounded-xl px-3 py-2">
          <img title="Status de la partie" class="h-6" src="@/assets/images/player/clock.svg">
          <p title="Status de la partie" class="font-normal">{{ this.$lang.get(game.status) }}</p>
          <img :title="'Level ' + game.id_level" class="h-6" src="@/assets/images/player/game.svg">
          <p :title="'Level ' + game.id_level" class="font-normal">{{ game.id_level }}</p>
          <img title="Score de la partie" class="h-6" src="@/assets/images/player/score_game.svg">
          <p title="Score de la partie" class="font-normal">{{ game.score }}</p>
        </div>
        <!-- Informations sur le niveau -->
        <div class="flex flex-row items-center justify-center gap-2 border-white border-[1px] bg-black/95 rounded-xl px-3 py-2">
          <img title="Nombre d'aliens" class="h-6" src="@/assets/images/player/mobs.svg">
          <p title="Nombre d'aliens" class="font-normal">{{ level.number_of_alien }}</p>
          <img title="Récompense" class="h-6" src="@/assets/images/player/reward.svg">
          <p title="Récompense" class="font-normal">{{ level.reward }}</p>
        </div>
      </div>
      <div class="flex flex-row items-center justify-center mt-6"> 
        <div class="flex flex-col justify-center ml-6">
          <div v-for="row in 5" :key="row" class="flex">
            <div v-for="col in 10" :key="col" class="w-12 h-12 border-white border-[1px] rounded-lg bg-green-500 m-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'Player',
  components: {},
  data() {
    return {
      aliens: []
    }
  },
  computed: {
    user() {
      return store.state.user;
    },
    game() {
      return store.state.game;
    },
    level() {
      return store.state.level;
    }
  },
  methods: {
    getCookie(name) {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    },
    async spawnAliens() {
      try {
        const response = await this.$api.get('/aliens');
        const alienTypes = response.data;

        let aliens = [];

        // Spawn aliens based on probabilities
        for (const alienType of alienTypes) {
          const aliensToSpawn = alienType.probability * this.level.number_of_alien / 100;

          console.log('Alientospawn', aliensToSpawn);

          for (let i = 0; i < aliensToSpawn; i++) {
            aliens.push(alienType);
          }
        }

        console.log('Aliens:', aliens);

        // Shuffle the array to ensure randomness
        for (let i = 10; i < aliens.length; i++) {
          const randomIndex = Math.floor(Math.random() * (aliens.length - 10)) + 10;
          const temp = aliens[i];
          aliens[i] = aliens[randomIndex];
          aliens[randomIndex] = temp;
        }

        // Trim the array to match the level's number_of_alien
        aliens = aliens.slice(0, this.level.number_of_alien);

        this.aliens = aliens;
      } catch (error) {
        console.error('Erreur lors de la récupération des aliens:', error);
        // Handle error
        return [];
      }
    }
  },
  mounted() {
    this.spawnAliens();
  }
}
</script>

<style scoped>
</style>
