<template>
  <nav class="relative px-6 z-[50]">
    <div class="flex items-center gap-[30px] uppercase">
      <img class="w-[60px]" src="./assets/images/brand/logo.png">
      <router-link to="/">
        <svg class="h-6 duration-200" fill="#a5a5a5" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-door-box">
          <path d="M13,14H11V12H13ZM16,18H17V17H18V5H17V4H5V5H4V17H5V18H6V6H16ZM18,20H4V19H3V18H2V4H3V3H4V2H18V3H19V4H20V18H19V19H18ZM14,18V8H8V18Z" />
        </svg>
        <p class="hidden lg:block">Accueil</p>
      </router-link>
      <router-link v-if="user.id_player" to="/player">
        <svg class="h-6 duration-200" fill="#a5a5a5" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-device">
          <path d="M2 1H20V2H20.94V20H20V21H2V20H1.06V2H2V1M3 3V19H19V3H3M4 4H18V12H4V4M5 14H8V17H5V14M12 15H14V17H12V15M15 14H17V16H15V14Z" />
        </svg>
        <p class="hidden lg:block">Jeux</p>
      </router-link>
    </div>
    <div v-if="user.id_player && user.name" class="flex items-center gap-[30px]">
      <div class="flex items-center justify-center gap-2 border-white border-[1px] rounded-xl px-3 py-2">
        <img title="Pseudo" class="h-6" src="@/assets/images/player/account.svg">
        <p title="Pseudo" class="font-normal">{{ user.name }}</p>
        <img title="Ressources" class="h-6" src="@/assets/images/player/ressources.svg">
        <p title="Ressources" class="font-normal">{{ user.ressources }}</p>
        <img title="Score" class="h-6" src="@/assets/images/player/score.svg">
        <p title="Score" class="font-normal">{{ user.score }}</p>
      </div>
      <button class="font-normal flex items-center justify-center gap-2 border-white border-[1px] rounded-xl px-2 py-2 hover:text-black hover:bg-white duration-200" v-on:click="removeSession">
        <svg class="h-6" fill="#ffffff" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-arrow-left-circle">
          <path d="M12 16H10V15H9V14H8V13H7V12H6V10H7V9H8V8H9V7H10V6H12V8H11V9H10V10H16V12H10V13H11V14H12V16M15 21H7V20H5V19H4V18H3V17H2V15H1V7H2V5H3V4H4V3H5V2H7V1H15V2H17V3H18V4H19V5H20V7H21V15H20V17H19V18H18V19H17V20H15V21M16 17H17V16H18V14H19V8H18V6H17V5H16V4H14V3H8V4H6V5H5V6H4V8H3V14H4V16H5V17H6V18H8V19H14V18H16V17Z" />
        </svg>
        <p class="hidden lg:block">Se déconnecter</p>
      </button>
    </div>
    <div v-else class="flex items-center gap-[30px]">
      <button v-on:click="popup = true" class="font-normal flex items-center justify-center gap-2 border-white border-[1px] rounded-xl px-2 py-2 hover:text-black hover:bg-white duration-200">
        <svg class="h-6" fill="#ffffff" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-arrow-right-circle">
          <path d="M7 1H15V2H17V3H18V4H19V5H20V7H21V15H20V17H19V18H18V19H17V20H15V21H7V20H5V19H4V18H3V17H2V15H1V7H2V5H3V4H4V3H5V2H7V1M6 5H5V6H4V8H3V14H4V16H5V17H6V18H8V19H14V18H16V17H17V16H18V14H19V8H18V6H17V5H16V4H14V3H8V4H6V5M10 6H12V7H13V8H14V9H15V10H16V12H15V13H14V14H13V15H12V16H10V14H11V13H12V12H6V10H12V9H11V8H10V6Z" />
        </svg>
        <p class="hidden lg:block">Se connecter</p>
      </button>
    </div>
  </nav>
  <transition name="fadeTransition">
    <div v-show="popup"
          class="z-[99] justify-center h-full gap-8 flex-col absolute lg:fixed w-full bg-black/95 text-white top-0 left-0 flex items-center text-center">
      <div class="w-4/5 lg:w-2/5 flex flex-col items-center justify-center border-[1px] border-white/30 rounded-lg p-8 bg-black/70 gap-10">
        <div class="relative w-full flex items-center justify-center gap-4">
          <img class="mt-12 w-10 h-10" src="@/assets/images/player/more.svg" />
          <h1 class="mt-12 font-black text-[1rem] lg:text-[1.5rem] z-10 uppercase">Création de la partie</h1>
          <button
            class="absolute top-0 left-0 w-8 rounded-md border border-gray-500 h-8 bg-black/70 hover:border-white duration-200"
            v-on:click="popup = false">
            <img src="@/assets/images/player/cross.svg" />
          </button>
        </div>
        <div class="flex items-center flex-col w-full gap-7">
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
    </div>
  </transition>
  <router-view/>
</template>


<script lang="js">
import store from '@/store.js';

export default {
  name: 'App',
  data() {
    return {
      popup: false,
      inputPseudo: '',
    }
  },
  computed: {
    user() {
      return store.state.user;
    },
    game() {
      return store.state.game;
    }
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
        this.setCookie('uid', response.data.id_player);

        store.commit('setUser', response.data);

        this.$router.push('/player')
      })
      .catch((error) => {
        if(error.response.data.detail.code === 'PLAYER_ALREADY_EXISTS') {
          this.$api.get(`/players/name/${this.inputPseudo}`)
          .then((response) => {
            this.setCookie('uid', response.data.id_player);

            store.commit('setUser', response.data);
            
            this.popup = false;
            this.$router.push('/player')
          })
        } else {
          console.log(error.response.data)
        }
      })
    },
    removeSession() {
      store.commit('resetUser');
      store.commit('resetGame');
      this.setCookie('uid', '', -1);
      this.setCookie('gid', '', -1);
      this.$router.go();
      this.$router.push('/');
    },
    async getPlayer() {
      if(this.getCookie('uid') === null) {
        this.$router.push('/')
      } else {
        await this.$api.get(`/players/${this.getCookie('uid')}`)
        .then((response) => {
          store.commit('setUser', response.data);
        })
        .catch((error) => {
          console.log(error.response.data.detail.code)
        })
      }
    },
    async getGame() {
      if(this.getCookie('gid') === null) {
        this.$router.push('/')
      } else {
        await this.$api.get(`/games/${this.getCookie('gid')}`)
        .then((response) => {
          store.commit('setGame', response.data);
          this.getLevel();
        })
        .catch((error) => {
          console.log(error.response.data)
        })
      }
    },
    async getLevel() {
      if(this.game.id_level === null) {
        this.$router.push('/')
      } else {
        await this.$api.get(`/levels/${this.game.id_level}`)
        .then((response) => {
          store.commit('setLevel', response.data);
        })
        .catch((error) => {
          console.log(error.response.data)
        })
      }
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
  },
  mounted() {
    if(this.getCookie('uid') !== null) {
      this.getPlayer()
    }
    if(this.getCookie('gid') !== null) {
      this.getGame()
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900');
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import '@/assets/styles/default.scss';

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

body {
  scrollbar-gutter: stable;
}

button:hover > svg {
  fill: #000000;
  transition: all 0.2s ease-in-out;
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

body {
  background: rgb(7, 7, 7);
  margin: 0;
  z-index: -1;
}

body::after {
  opacity: 0.3;
  content: "";
  background: url('@/assets/images/brand/background.svg') repeat center center fixed;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}

nav {
  height: 80px;
  z-index: 50;
  width: 100%;
  background-color: rgb(3, 3, 3, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  border-bottom: 1px solid rgb(59, 59, 59)
}

nav a {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  font-weight: 700;
  color: rgb(165, 165, 165);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

nav a:hover {
  color: white;
}

nav a:hover > svg {
  fill: rgb(255, 255, 255);
}

nav a.router-link-exact-active {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 1px solid white;
  gap: 0.5rem;
  border-radius: 0.75rem;
  padding: 0.5rem;
  font-weight: 700;
}

nav a.router-link-exact-active:hover {
  background-color: white;
  color: black;
}

nav a.router-link-exact-active:hover > svg {
  fill: black;
}

nav a.router-link-exact-active > svg {
  fill: rgb(255, 255, 255);
}

p {
  margin: 0;
}
</style>
