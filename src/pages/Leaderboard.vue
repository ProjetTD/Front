<template>
  <div class="flex flex-row items-center justify-center gap-2 mt-12 mb-6">
    <img class="h-12" src="@/assets/images/leaderboard/ranking.svg">
    <p class="uppercase font-extrabold text-[1.5rem] lg:text-[2.5rem] z-10">Classement général</p>
  </div>
  <div v-if="players.length > 0" class="w-full flex flex-col gap-3 px-8 mb-12">
    <div class="w-full overflow-x-auto px-2 rounded-lg">
      <DataListRanking class="w-full" :iterate="0" :assign="[
        {
          name: 'Rang',
          iterate: true,
          cancelSort: true,
        },
        {
          name: 'Pseudo',
          value: 'name',
          cancelSort: true,
        },
        {
          name: 'Score',
          value: 'score',
        },
        {
          name: 'Ressources',
          value: 'ressources',
        },
        {
          name: 'Victoires',
          value: 'win',
        },
        {
          name: 'Défaites',
          value: 'lose',
        },
        ]"
                :data="players" @short="short('players', $event)"/>
    </div>

  </div>
</template>

<script lang="js">
import store from '@/store';

import DataListRanking from '@/assets/components/DataListRanking.vue';

export default {
  name: 'Leaderboard',
  data() {
    return {
      players: {},
    }
  },
  components: {
    DataListRanking
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
    getPlayers() {
      this.$api.get('/players')
      .then((response) => {
        this.players = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    short(column, direction) {
      this.$refs.dataListRanking.shortBy(column, direction);
    },
  },
  mounted() {
    this.getPlayers();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/classement.scss";

div {
  animation: fade 1s;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
