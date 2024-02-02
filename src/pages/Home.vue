<template>
  <div class="home">
    <div class="flex flex-col items-center justify-center">
      <p class="font-black text-[1.5rem] lg:text-[3rem] z-10">RoboDefense: Invasion Extraterrestre</p>
    </div>
    <div class="scaleAnim overflow-hidden flex flex-col lg:flex-row items-center justify-center m-10 p-10 gap-4 w-4/5 h-full border-white/20 border-[1px] rounded-lg bg-black/95">
      <div class="w-full flex h-full flex-col gap-3 items-center justify-center">
        <div class="flex flex-row gap-3 items-center justify-center w-full">
          <img class="h-8" src="@/assets/images/player/rules.svg" />
          <h1 class="font-black text-3xl uppercase">Principe du jeu</h1>
        </div>
        <hr>
        <p class="opacity-75 font-medium text-center">
          Bienvenue dans "RoboDefense: Invasion Extraterrestre", un jeu captivant où l'avenir de la planète dépend de votre habileté à défendre la terre contre une horde d'aliens hostiles ! Inspiré du concept de "Plants vs. Zombies", ce jeu combine stratégie, action et une pointe d'humour dans une bataille épique entre des robots de haute technologie et des envahisseurs extraterrestres. Votre mission est simple mais cruciale : en tant que commandant de l'unité de défense robotique de la Terre, vous devez placer judicieusement vos robots le long du champ de bataille pour repousser les vagues incessantes d'aliens.
        </p>
      </div>
      <div v-if="!uid" class="flex w-full h-full items-center justify-center">
        <div class="button gap-3 p-2 border-white border-[1px] rounded-xl flex items-center justify-center">
          <svg class="h-6" fill="#ffffff" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-device">
            <path d="M2 1H20V2H20.94V20H20V21H2V20H1.06V2H2V1M3 3V19H19V3H3M4 4H18V12H4V4M5 14H8V17H5V14M12 15H14V17H12V15M15 14H17V16H15V14Z" />
          </svg>
          <button v-on:click="popup = !popup" class="font-bold uppercase">Commencer à jouer</button>
        </div>
      </div>
      <div v-else class="flex w-full h-full items-center justify-center">
        <div class="button gap-3 p-2 border-white border-[1px] rounded-xl flex items-center justify-center">
          <svg class="h-6" fill="#ffffff" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-device">
            <path d="M2 1H20V2H20.94V20H20V21H2V20H1.06V2H2V1M3 3V19H19V3H3M4 4H18V12H4V4M5 14H8V17H5V14M12 15H14V17H12V15M15 14H17V16H15V14Z" />
          </svg>
          <router-link to="/player"><button class="font-bold uppercase">Continuer à jouer</button></router-link>
        </div>
      </div>
    </div>
    <transition name="fadeTransition">
      <div v-show="popup"
           class="z-[99] justify-center h-full gap-14 flex-col absolute lg:fixed w-full bg-black/95 text-white top-0 left-0 flex items-center text-center">
        <div class="relative w-4/5 lg:w-1/3 flex items-center justify-center gap-4">
          <img class="mt-12 w-10 h-10" src="@/assets/images/player/more.svg" />
          <h1 class="mt-12 font-black text-[1rem] lg:text-[1.5rem] z-10 uppercase">Création de la partie</h1>
          <button
            class="absolute top-0 left-0 p-2 w-8 border border-gray-500 h-8 bg-black/70"
            v-on:click="popup = false">
            <img src="@/assets/images/player/cross.svg" />
          </button>
        </div>
        <div class="flex items-center flex-col w-4/5 lg:w-1/3 gap-7">
          <span>
            <p class="font-medium">Avant de commencer une partie, merci de renseigner votre pseudonyme.</p>
            <br>
            <br>
            <i class="opacity-60">(Si vous vous déconnectez vous pouvez rentrer le pseudo que vous avez utilisé la dernière fois que vous avez joué, sinon veuillez créer un compte)</i>
          </span>
          <div class="input-container !w-full flex flex-col gap-4">
            <p class="uppercase font-bold">Créer un compte / Se connecter</p>
            <div class="content !rounded-lg">
              <img class="opacity-70 h-14" src="@/assets/images/player/account.svg">
              <input class="!w-full" id="title"
                placeholder="Ecrivez votre pseudo..." type="text" v-model="inputPseudo" />
            </div>
          </div>
          <div class="w-full flex flex-col gap-4 justify-center items-center">
            <button class="button w-[230px] h-[50px] font-bold uppercase border-white border-[1px] rounded-md" v-on:click="createPlayer(inputPseudo)">Commencer</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="js">
import store from '@/store';

export default {
  name: 'HomeView',
  data() {
    return {
      popup: false,
      inputPseudo: '',
    }
  },
  computed: {
    uid() {
      return this.getCookie('uid') || store.state.uid;
    },
    pseudo() {
      return store.state.pseudo;
    },
    ressources() {
      return store.state.ressources;
    },
    score() {
      return store.state.score;
    },
  },
  methods: {
    createPlayer(pseudo) {
      if(pseudo == null || pseudo == '') {
        alert('Veuillez renseigner un pseudo !')
        return
      } else if(pseudo.length <= 3) {
        alert('Votre pseudo doit contenir au moins 3 caractères !')
        return
      }

      this.$api.post('/players', {
        name: pseudo,
        score: 0,
        level: 0,
        ressources: 100,
      })
      .then((response) => {
        this.setCookie('uid', response.data.uid);

        store.commit('setUid', response.data.uid);
        store.commit('setPseudo', pseudo);
        store.commit('setRessources', response.data.ressources);
        store.commit('setScore', response.data.score);
        
        this.$router.push('/player')
      })
      .catch((error) => {
        if(error.response.data.detail.code === 'PLAYER_ALREADY_EXISTS') {
          this.$api.get(`/players/name/${this.inputPseudo}`)
          .then((response) => {
            this.setCookie('uid', response.data.uid);

            store.commit('setUid', response.data.uid);
            store.commit('setPseudo', response.data.name);
            store.commit('setRessources', response.data.ressources);
            store.commit('setScore', response.data.score);
            
            this.$router.push('/player')
          })
        } else {
          console.log(error.response.data)
        }
      })
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}; path=/`;
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
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: white;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 12px;
  text-align: center;
}

.button {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
  background-color: white;
  color: black;
  & svg {
    fill: black;
  }
}

.scaleAnim {
  box-shadow: 0 0 18px 14px rgba(0, 0, 0, 0.574);
  animation: scaleAnim 1.5s ease-in-out;
}

.home {
  animation: fade 1.5s ease-in-out;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleAnim {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1.0);
  }
}
</style>