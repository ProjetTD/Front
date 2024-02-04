<template>
  <div v-if="user.name !== undefined && user.name" class="h-screen w-full flex items-center justify-center flex-col gap-6">
    <p>Bienvenue {{ user.name }} !</p>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'Player',
  components: {},
  data() {
    return {}
  },
  computed: {
    user() {
      return store.state.user;
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
