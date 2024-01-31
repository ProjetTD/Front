import {createRouter, createWebHashHistory} from "vue-router"
import Home from "../pages/Home.vue"
import Player from "../pages/Player.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
  ]
});