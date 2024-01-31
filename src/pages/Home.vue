<template>
  <div class="home">
    <div class="flex flex-col items-center justify-center">
      <img class="absolute z-0 opacity-40 w-[300px]" src="@/assets/images/logo.png">
      <p class="font-black text-[1.5rem] lg:text-[3rem] z-10">RoboDefense: Invasion Extraterrestre</p>
    </div>
    <div class="scaleAnim flex flex-col lg:flex-row items-center justify-center m-10 p-10 gap-4 w-4/5 h-full border-white/20 border-[1px] rounded-lg bg-black/100">
      <div class="w-full flex h-full flex-col gap-3 items-center justify-center">
        <h1 class="font-black text-lg uppercase">Principe du jeu</h1>
        <p class="font-medium text-center">
          Bienvenue dans "RoboDefense: Invasion Extraterrestre", un jeu captivant où l'avenir de la planète dépend de votre habileté à défendre la terre contre une horde d'aliens hostiles ! Inspiré du concept de "Plants vs. Zombies", ce jeu combine stratégie, action et une pointe d'humour dans une bataille épique entre des robots de haute technologie et des envahisseurs extraterrestres. Votre mission est simple mais cruciale : en tant que commandant de l'unité de défense robotique de la Terre, vous devez placer judicieusement vos robots le long du champ de bataille pour repousser les vagues incessantes d'aliens.
        </p>
      </div>
      <div class="flex w-full h-full items-center justify-center">
        <button class="button w-[230px] font-bold uppercase p-4 border-white border-[1px] rounded-md" v-on:click="popup = !popup">Jouer</button>
      </div>
    </div>
    <transition name="fadeTransition">
      <div v-show="popup"
           class="z-[99] justify-center h-full gap-14 flex-col absolute lg:fixed w-full bg-black text-white top-0 left-0 flex items-center text-center">
        <div class="relative w-4/5 lg:w-1/3 flex items-center justify-center gap-4">
          <img class="mt-6 w-10 h-10" src="@/assets/images/player/more.svg" />
          <h1 class="mt-6 font-black text-[1rem] lg:text-[1.5rem] z-10 uppercase">Création de la partie</h1>
          <button
            class="absolute top-0 left-0 p-2 w-8 border border-gray-500 h-8 bg-black/70"
            v-on:click="popup = false">
            <img src="@/assets/images/player/cross.svg" />
          </button>
        </div>
        <div class="flex items-center flex-col w-4/5 lg:w-1/3 gap-7">
          <span>
            Avant de commencer une partie, merci de renseigner votre pseudonyme.
            <br>
            <br>
            <i class="opacity-60">(Si vous rechargez la page, votre session sera perdue ainsi que toutes les données reliées au compte)</i>
          </span>
          <div class="input-container !w-full flex flex-col gap-4">
            <div class="content !rounded-lg">
              <img class="opacity-70 h-14" src="@/assets/images/player/account.svg">
              <input class="!w-full" id="title"
                placeholder="Ecrivez votre pseudo..." type="text" v-model="pseudo" />
            </div>
          </div>
          <div class="w-full flex flex-col gap-4 justify-center items-center">
            <button class="button w-[230px] h-[50px] font-bold uppercase border-white border-[1px] rounded-md" v-on:click="createPlayer(pseudo)">Commencer</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="js">

export default {
  name: 'HomeView',
  data() {
    return {
      popup: false,
      pseudo: null,
      id: localStorage.getItem('userIdSession') || ''
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

      localStorage.setItem('userPseudo', pseudo);

      this.$api.post('/players', {
        name: pseudo,
        score: 0,
        level: 0,
        ressources: 100,
      })
      .then((response) => {
        localStorage.setItem('userIdSession', response.data.id);
        this.$router.push('/player')
      })
      .catch((error) => {
        console.log(error.response.data.detail.code)
      })
    }
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
  transition: all 0.2s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
  background-color: white;
  color: black;
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