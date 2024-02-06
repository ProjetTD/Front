<template>
  <div v-if="user.name !== undefined && user.name" class="h-screen w-full flex items-center justify-center flex-col gap-6 mt-2 mb-2">
    <div class="flex flex-col items-center justify-center h-full w-full gap-6"> <!--MAIN-->
      <div class="flex flex-col lg:flex-row items-center justify-center gap-3 mt-10 lg:mt-0">
        <!-- Informations sur le joueur -->
        <div class="flex flex-row items-center justify-center gap-2 border-white border-[1px] bg-black/90 rounded-xl px-3 py-2">
          <img title="Pseudo" class="h-6 w-6" src="@/assets/images/player/account.svg">
          <p title="Pseudo" class="font-normal">{{ user.name }}</p>
          <img title="Ressources" class="h-6" src="@/assets/images/player/ressources.svg">
          <p title="Ressources" class="font-normal duration-300" :class="{ 'text-green-500': user.ressources > previousRessources, 'text-red-500': user.ressources < previousRessources }">{{ user.ressources }}</p>
          <img title="Score" class="h-6" src="@/assets/images/player/score.svg">
          <p title="Score" class="font-normal">{{ user.score }}</p>
        </div>
        <!-- Informations sur la partie -->
        <div class="flex flex-row items-center justify-center gap-2 border-white border-[1px] bg-black/90 rounded-xl px-3 py-2">
          <img title="Status de la partie" class="h-6" src="@/assets/images/player/clock.svg">
          <p title="Status de la partie" class="font-normal">{{ this.$lang.get(game.status) }}</p>
          <img :title="'Level ' + game.id_level" class="h-6" src="@/assets/images/player/game.svg">
          <p :title="'Level ' + game.id_level" class="font-normal">Level {{ game.id_level }}</p>
          <img title="Score de la partie" class="h-6" src="@/assets/images/player/score_game.svg">
          <p title="Score de la partie" class="font-normal">{{ game.score }}</p>
        </div>
        <!-- Informations sur le niveau -->
        <div class="flex flex-row items-center justify-center gap-2 border-white border-[1px] bg-black/90 rounded-xl px-3 py-2">
          <img title="Nombre d'aliens" class="h-6" src="@/assets/images/player/mobs.svg">
          <p title="Nombre d'aliens" class="font-normal">{{ level.number_of_alien }}</p>
          <img title="Récompense" class="h-6" src="@/assets/images/player/reward.svg">
          <p title="Récompense" class="font-normal">{{ level.reward }}</p>
        </div>
      </div>
      <div v-if="robots.length > 0" class="flex flex-col items-center justify-center gap-2 border-white border-[1px] bg-black/90 rounded-xl px-3 py-2">
        <div>
          <h1 class="text-2xl font-bold uppercase">Boutique</h1>
        </div>
        <div class="flex flex-row items-center justify-center gap-2">
          <button v-on:click="shop(robots[0].name, robots[0].power, robots[0].health)" class="flex flex-row items-center justify-center gap-2">
            <img title="Coût" class="h-6" src="@/assets/images/player/ressources.svg">
            <p class="font-semibold opacity-80">-{{ robots[0].cost }}</p>
            <img title="Coût" class="h-6" src="@/assets/images/player/robot_Normal.png">
          </button>
          <p>|</p>
          <button v-on:click="shop(robots[1].name, robots[1].power, robots[1].health)" class="flex flex-row items-center justify-center gap-2">
            <img title="Coût" class="h-6" src="@/assets/images/player/ressources.svg">
            <p class="font-semibold opacity-80">-{{ robots[1].cost }}</p>
            <img title="Coût" class="h-6" src="@/assets/images/player/robot_Gunner.png">
          </button>
          <p>|</p>
          <button v-on:click="shop(robots[2].name, robots[2].power, robots[2].health)" class="flex flex-row items-center justify-center gap-2">
            <img title="Coût" class="h-6" src="@/assets/images/player/ressources.svg">
            <p class="font-semibold opacity-80">-{{ robots[2].cost }}</p>
            <img title="Coût" class="h-6" src="@/assets/images/player/robot_Bigbro.png">
          </button>
        </div>
      </div>
      <div v-if="game.status === 'not_started'">
        <h1 class="text-2xl font-black uppercase">Veuillez placer un robot pour commencer la partie</h1>
      </div>
      <div class="flex flex-row items-center justify-center">
        <div class="flex flex-col justify-center gap-2">
          <div v-for="row in 5" :key="row" class="bg-theme-main flex border-white border-[1px] rounded-xl">
            <div v-for="col in 10" :key="col" class="flex items-center justify-center w-20 h-20">
              <div v-if="col === aliensColumn && row === aliensRow" class="w-16 h-16 flex items-center justify-center">
                <img v-if="aliens.length > 0" :src="getAlienImage(aliens[0].name)" class="-scale-x-[1] w-16 h-16" />
                {{ aliens.length > 0 ? aliens[0].health : '' }}
              </div>
              <div v-on:click="placeRobot(row)" v-if="col === robotsColumn" :class="'background-' + selectedRobot.name"></div>
              <div v-for="robot in placedRobot" :key="robot.column">
                <div class="flex items-center justify-center" v-if="robot.row === row && robot.column === col">
                  <img :src="getRobotImage(robot.type)" class="w-16 h-16" :class="{ '-scale-x-[1]': robot.type === 'Gunner' }">
                  {{ robot.health }}
                </div>
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
import NormalAlien from '@/assets/images/player/alien_Normal.png';
import RunnerAlien from '@/assets/images/player/alien_Runner.png';
import TankAlien from '@/assets/images/player/alien_Tank.png';

import NormalRobot from '@/assets/images/player/robot_Normal.png';
import GunnerRobot from '@/assets/images/player/robot_Gunner.png';
import BigbroRobot from '@/assets/images/player/robot_Bigbro.png';

export default {
  name: 'Player',
  data() {
    return {
      aliens: [],
      robots: [],
      aliensColumn: 10,
      aliensRow: 1,
      robotsColumn: 1,
      selectedRobot: {},
      selectedRobotCost: 0,
      placedRobot: [],
      previousRessources: 0,
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
    shop(robotType, power, health) {
      this.selectedRobot = { 
        name: robotType,
        power: power,
        health: health,
      };
      switch (robotType) {
        case 'Normal':
          this.selectedRobotCost = this.robots[0].cost;
          break;
        case 'Gunner':
          this.selectedRobotCost = this.robots[1].cost;
          break;
        case 'Bigbro':
          this.selectedRobotCost = this.robots[2].cost;
          break;
        default:
          this.selectedRobotCost = 0;
      }
    },
    placeRobot(row) {
      const alreadyOccupied = this.placedRobot.some(robot => robot.row === row && robot.column === this.robotsColumn);
      if (!alreadyOccupied) {
        if (this.user.ressources >= this.selectedRobotCost) {
          this.user.ressources -= this.selectedRobotCost;
          this.$api.patch(`/players/${this.user.id_player}`, {
            ressources: this.user.ressources,
          });
          this.placedRobot.push({
            type: this.selectedRobot.name,
            power: this.selectedRobot.power,
            health: this.selectedRobot.health,
            row: row,
            column: this.robotsColumn,
          });
          this.selectedRobot = {};
        } else {
          alert('Vous n\'avez pas assez de ressources pour acheter ce robot !');
          this.selectedRobot = {};
        }
      } else {
        alert('La case est déjà occupée par un robot !');
      }
    },
    getAlienImage(alienName) {
      switch (alienName) {
        case 'Normal':
          return NormalAlien;
        case 'Runner':
          return RunnerAlien;
        case 'Tank':
          return TankAlien;
        default:
          return "";
      }
    },
    getRobotImage(robotName) {
      switch (robotName) {
        case 'Normal':
          return NormalRobot;
        case 'Gunner':
          return GunnerRobot;
        case 'Bigbro':
          return BigbroRobot;
        default:
          return "";
      }
    },
    getRandomRow() {
      this.aliensRow = Math.floor(Math.random() * 5) + 1;
      return this.aliensRow;
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
    async getRobots() {
      try {
        const response = await this.$api.get('/robots');
        this.robots = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des robots:', error);
      }
    },
    async spawnAliens() {
      try {
        if (this.placedRobot.length === 0) {
          setTimeout(this.spawnAliens, 1000);
          return;
        }

        this.$api.patch(`/games/${this.getCookie('gid')}`, {
          status: 'in_progress',
        })

        this.game.status = 'in_progress';

        const response = await this.$api.get('/aliens');
        const alienTypes = response.data;
        for (const alienType of alienTypes) {
          const aliensToSpawn = alienType.probability * this.level.number_of_alien / 100;
          for (let i = 0; i < aliensToSpawn; i++) {
            const alienCopy = { ...alienType };
            this.aliens.push(alienCopy);
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
            if (this.aliensColumn <= 1) {
              this.placedRobot.forEach(robot => {
                if (robot.row === this.aliensRow) {
                  robot.health -= this.aliens[0].power;
                  if (robot.health <= 0) {
                    this.placedRobot.splice(this.placedRobot.indexOf(robot), 1);
                  }
                }
              });
              if (this.user.ressources !== this.previousRessources) {
                this.previousRessources = this.user.ressources;
              }
              this.aliensRow = this.getRandomRow();
              this.aliensColumn = 10;
            }
            if (this.aliensColumn <= 10) {
              this.placedRobot.forEach(robot => {
                if (robot.row === this.aliensRow) {
                  this.shootAlien(robot);
                }
              });
            }
          } else {
            alert('La partie est terminée ! Vous avez gagné !');
            this.$api.patch(`/games/${this.getCookie('gid')}`, {
              status: 'finished',
            })
            this.game.status = 'finished';
            this.$api.patch(`/players/${this.user.id_player}`, {
              score: this.user.ressources + this.level.reward,
            })
            this.user.ressources += this.level.reward;
            clearInterval(interval);
          }
        }, 100);
      } catch (error) {
        console.error('Erreur lors de la récupération des aliens:', error);
      }
    },
    shootAlien(robot) {
      if (this.aliensRow === robot.row) {
        this.aliens[0].health -= robot.power;
        this.$api.patch(`/players/${this.user.id_player}`, {
          score: this.user.score + robot.power,
        })
        this.user.score += robot.power;
        this.$api.patch(`/games/${this.getCookie('gid')}`, {
          score: this.user.score + robot.power,
        })
        this.game.score += robot.power;
        if (this.aliens[0].health <= 0) {
          this.user.ressources += this.aliens[0].drop;
          this.getRandomRow();
          this.aliensColumn = 10;
          this.aliens.splice(0, 1);
          this.level.number_of_alien = this.aliens.length;
        }
      }
    }
  },
  mounted() {
    if(!this.getCookie('uid')) {
      this.$router.push('/');
    }
    if(this.level && this.game) {
      this.$api.patch(`/games/${this.getCookie('gid')}`, {
        status: 'not_started',
      })
      this.game.status = 'not_started';
      this.getRobots();
      this.spawnAliens();
    }
  }
}
</script>

<style scoped>

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

.background-Normal {
  content: '';
  background-image: url(@/assets/images/player/robot_Normal.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 4rem;
  height: 4rem;
  opacity: 0;
  position: absolute;
  z-index: 1;
}

.background-Normal:hover {
  opacity: 1;
}

.background-Gunner {
  content: '';
  transform: scaleX(-1);
  background-image: url(@/assets/images/player/robot_Gunner.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 4rem;
  height: 4rem;
  opacity: 0;
  position: absolute;
  z-index: 1;
}

.background-Gunner:hover {
  opacity: 1;
}

.background-Bigbro {
  content: '';
  background-image: url(@/assets/images/player/robot_Bigbro.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 4rem;
  height: 4rem;
  opacity: 0;
  position: absolute;
  z-index: 1;
}

.background-Bigbro:hover {
  opacity: 1;
}
</style>
