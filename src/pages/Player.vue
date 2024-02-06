<template>
  <div v-if="user.name !== undefined && user.name" class="h-screen w-full flex items-center justify-center flex-col gap-6 mt-2 mb-2">
    <div class="flex flex-col items-center justify-center h-full w-full gap-6"> <!--MAIN-->
      <div class="flex flex-col lg:flex-row items-center justify-center gap-3 mt-10 lg:mt-0">
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
        <div class="flex flex-col justify-center">
          <div v-for="row in 5" :key="row" class="flex">
            <div v-for="col in 10" :key="col" class="flex items-center justify-center w-20 h-20 even:border-white odd:border-black border-[1px] rounded-lg m-1 even:bg-black odd:bg-white">
              <div v-if="col === aliensColumn && row === 1" :class="'w-16 h-16 flex items-center justify-center'">
                <img v-if="aliens.length > 0" :src="getAlienImage(aliens[0].name)" class="-scale-x-[1] w-16 h-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import Normal from '@/assets/images/player/alien_Normal.png';
import Runner from '@/assets/images/player/alien_Runner.png';
import Tank from '@/assets/images/player/alien_Tank.png';

export default {
  name: 'Player',
  components: {},
  data() {
    return {
      aliens: [],
      aliensColumn: 10
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
    getAlienImage(alienName) {
      switch (alienName) {
        case 'Normal':
          return Normal;
        case 'Runner':
          return Runner;
        case 'Tank':
          return Tank;
        default:
          return "";
      }
    },
    getRandomRow() {
      return Math.floor(Math.random() * 5);
    },
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

        for (const alienType of alienTypes) {
          const aliensToSpawn = alienType.probability * this.level.number_of_alien / 100;

          console.log('Aliens to spawn:', aliensToSpawn);

          for (let i = 0; i < aliensToSpawn; i++) {
            this.aliens.push(alienType);
          }
        }

        for (let i = 10; i < this.aliens.length; i++) {
          const randomIndex = Math.floor(Math.random() * (this.aliens.length - 10)) + 10;
          const temp = this.aliens[i];
          this.aliens[i] = this.aliens[randomIndex];
          this.aliens[randomIndex] = temp;
        }

        const interval = setInterval(() => {
          if (this.aliens.length > 0) {
            this.aliensColumn -= 1;
            if (this.aliensColumn === 0) {
              this.aliensColumn = 10;
            }
            if(this.aliensColumn === 10) {
              this.aliens.shift();
              this.level.number_of_alien = this.aliens.length;
            }
          } else {
            clearInterval(interval);
          }
        }, 500);
      } catch (error) {
        console.error('Erreur lors de la récupération des aliens:', error);
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
