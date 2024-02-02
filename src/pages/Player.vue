<template>
  <div v-if="pseudo !== undefined && pseudo">
    <p>Bienvenue {{ pseudo }} !</p>
    <board></board>
  </div>
</template>

<script>
import Board from '@/components/player/Board.vue'
import store from '@/store';

export default {
  name: 'Player',
  components: {
    Board
  },
  data() {
    return {}
  },
  computed: {
    uid() {
      return this.getCookie('uid') || store.state.uid;
    },
    pseudo() {
      return store.state.pseudo;
    },
  },
  methods: {
    getPlayer() {
      this.$api.get(`/players/${store.state.uid}`)
      .then((response) => {
        store.commit('setPseudo', response.data.name);
      })
      .catch((error) => {
        console.log(error.response.data.detail.code)
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
  },
  mounted() {
    setInterval(() => {
      store.commit('setScore', store.state.score + 10000);
    }, 600);
    if(store.state.uid !== null) {
      this.getPlayer()
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
