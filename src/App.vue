<template>
  <nav class="relative px-6 z-[50] uppercase">
    <router-link to="/"><img class="w-[60px]" src="./assets/images/logo.png"></router-link>
    <router-link to="/">Accueil</router-link>
    <router-link to="/player">Jeux</router-link>
  </nav>
  <router-view/>
</template>

<script lang="js">
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
  background: rgb(255,96,96);
  background: linear-gradient(90deg, rgba(255,96,96,1) 0%, rgba(12,11,11,1) 16%, rgba(12,11,11,1) 50%, rgba(12,11,11,1) 84%, rgba(98,96,255,1) 100%);
  margin: 0;
  z-index: -1;
}

nav {
  height: 80px;
  z-index: 50;
  width: 100%;
  background-color: rgb(3, 3, 3);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  border-bottom: 1px solid rgb(59, 59, 59)
}

nav a {
  font-weight: 700;
  color: white;
  text-decoration: none;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

p {
  margin: 0;
}
</style>
