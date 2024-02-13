<template>
  <div v-if="user.name !== undefined && user.name" class="h-screen w-full flex items-center justify-center flex-col gap-6 mt-2 mb-2" :class="{'finishHim' : game.status === 'finished'}">
    <div class="flex flex-col items-center justify-center h-full w-full gap-6"> <!--MAIN-->
      <div class="border-white border-[1px] bg-black/90 rounded-xl px-3 py-2" :class="{ 'animate-start-main': game.status === 'not_started' }">
        <h1 v-if="game.status === 'not_started'" class="text-2xl font-black uppercase">Achetez un robot dans la boutique puis placez-le pour commencer la partie</h1>
        <h1 v-if="game.status === 'in_progress'" class="text-2xl font-black uppercase">Tuez les aliens afin qu'ils n'atteignent pas votre base !</h1>
        <h1 v-if="game.status === 'finished'" class="text-2xl font-black uppercase">La partie est terminée !</h1>
      </div>
      <div class="flex flex-col lg:flex-row items-center justify-center gap-3 mt-10 lg:mt-0">
        <!-- Informations sur le joueur -->
        <div class="flex flex-row items-center justify-center gap-2 border-white border-[1px] bg-black/90 rounded-xl px-3 py-2">
          <img title="Pseudo" class="h-6 w-6" src="@/assets/images/player/account.svg">
          <p title="Pseudo" class="font-normal">{{ user.name }}</p>
          <img title="Ressources" class="h-6 w-6" src="@/assets/images/player/ressources.svg">
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
          <button v-on:click="shop(robots[0].name, robots[0].power, robots[0].health, robots[0].reload_time)" class="p-2 flex flex-row items-center justify-center border-white/50 hover:border-white/100 border-[1px] rounded-xl gap-2 duration-200" :class="{ '!border-white !bg-white !text-black': selectedRobot.name === 'Normal', 'animate-start-shop': game.status === 'not_started' }">
            <img title="Coût" class="h-6 w-6" src="@/assets/images/player/ressources.svg">
            <p class="font-semibold opacity-80">-{{ robots[0].cost }}</p>
            <img title="Coût" class="h-6" src="@/assets/images/player/robot_Normal.png">
          </button>
          <p>|</p>
          <button v-on:click="shop(robots[1].name, robots[1].power, robots[1].health, robots[1].reload_time)" class="p-2 flex flex-row items-center justify-center border-white/50 hover:border-white/100 border-[1px] rounded-xl gap-2 duration-200" :class="{ '!border-white !bg-white !text-black': selectedRobot.name === 'Gunner', 'animate-start-shop': game.status === 'not_started' }">
            <img title="Coût" class="h-6 w-6" src="@/assets/images/player/ressources.svg">
            <p class="font-semibold opacity-80">-{{ robots[1].cost }}</p>
            <img title="Coût" class="h-6" src="@/assets/images/player/robot_Gunner.png">
          </button>
          <p>|</p>
          <button v-on:click="shop(robots[2].name, robots[2].power, robots[2].health, robots[2].reload_time)" class="p-2 flex flex-row items-center justify-center border-white/50 hover:border-white/100 border-[1px] rounded-xl gap-2 duration-200" :class="{ '!border-white !bg-white !text-black': selectedRobot.name === 'Bigbro', 'animate-start-shop': game.status === 'not_started' }">
            <img title="Coût" class="h-6 w-6" src="@/assets/images/player/ressources.svg">
            <p class="font-semibold opacity-80">-{{ robots[2].cost }}</p>
            <img title="Coût" class="h-6" src="@/assets/images/player/robot_Bigbro.png">
          </button>
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <div class="flex flex-col justify-center gap-2">
          <div v-for="row in 5" :key="row" class="bg-theme-main flex border-white border-[1px] rounded-xl">
            <div v-for="col in 10" :key="col" class="flex items-center justify-center w-20 h-20">
              <div v-if="col === aliensColumn && row === aliensRow && game.status !== 'not_started'" class="w-16 h-16 flex flex-col items-center justify-center">
                <img v-if="aliens.length > 0" :src="getAlienImage(aliens[0].name)" class="-scale-x-[1] w-16 h-16" :class="{ 'filterRedAlien' : filterRedAlien}"/>
                <div v-if="aliens.length > 0" class="!animate-none flex items-center w-full h-[5px] border-white/30 border-[1px] rounded-3xl">
                  <div class="health-bar !animate-none" :style="{ width: getAlienHealthWidth(aliens[0]) }"></div>
                </div>
              </div>
              <!-- REGLER QU'ON NE PUISSE PAS METTRE DE ROBOT EN CAS D'ALIENS SUR LA ROW / COLUMN -->
              <div v-on:click="placeRobot(row, col)" v-if="game.status !== 'finished' && col <= robotsColumn && (row !== aliensRow || col !== aliensColumn) && !this.placedRobot.some(robot => robot.row === row && robot.column === col)" class="border-[1px] border-white/0 rounded-xl" :class="'background-' + selectedRobot.name"></div>
              <div v-for="robot in placedRobot" :key="robot.column">
                <div class="flex flex-col items-center justify-center" v-if="game.status !== 'finished' && robot.row === row && robot.column === col">
                  <img :src="getRobotImage(robot.type)" class="w-16 h-16" :class="{ '-scale-x-[1]': robot.type === 'Gunner', 'filterRedRobot' : robot.isHit }">
                  <div class="flex items-center w-full h-[5px] border-white/30 border-[1px] rounded-3xl">
                    <div class="health-bar" :style="{ width: getHealthWidth(robot) }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
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
      defaultAliens: [],
      robots: [],
      aliensColumn: 10,
      aliensRow: 1,
      robotsColumn: 4,
      selectedRobot: {},
      selectedRobotCost: 0,
      placedRobot: [],
      previousRessources: 0,
      filterRedAlien: false,
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
    getAlienHealthWidth(alien) {
      const maxHealth = this.getMaxHealthByAlienType(alien.name);
      return (alien.health / maxHealth) * 100 + '%';
    },
    getMaxHealthByAlienType(alienType) {
      switch (alienType) {
        case 'Normal':
          return this.defaultAliens[0].health;
        case 'Runner':
          return this.defaultAliens[1].health;
        case 'Tank':
          return this.defaultAliens[2].health;
        default:
          return 100;
      }
    },
    getHealthWidth(robot) {
      const maxHealth = this.getMaxHealthByType(robot.type);
      return (robot.health / maxHealth) * 100 + '%';
    },
    getMaxHealthByType(robotType) {
      switch (robotType) {
        case 'Normal':
          return this.robots[0].health;
        case 'Gunner':
          return this.robots[1].health;
        case 'Bigbro':
          return this.robots[2].health;
        default:
          return 100;
      }
    },
    shop(robotType, power, health, reload_time) {
      this.selectedRobot = { 
        name: robotType,
        power: power,
        health: health,
        reload_time: reload_time
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
    placeRobot(row, column) {
      const alreadyOccupied = this.placedRobot.some(robot => robot.row === row && robot.column === column);
      if (!alreadyOccupied) {
        console.log(this.selectedRobot);
        if (this.user.ressources >= this.selectedRobotCost) {
          if (this.robotsColumn >= 1 && this.robotsColumn <= 4) {
            this.user.ressources -= this.selectedRobotCost;
            this.$api.patch(`/players/${this.user.id_player}`, {
              ressources: this.user.ressources,
            });
            this.placedRobot.push({
              type: this.selectedRobot.name,
              power: this.selectedRobot.power,
              health: this.selectedRobot.health,
              reload_time: this.selectedRobot.reload_time,
              row: row,
              column: column,
              isHit: false,
            });
          }
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
        this.defaultAliens = response.data;
        const alienTypes = response.data;
        for (const alienType of alienTypes) {
          const aliensToSpawn = alienType.probability * this.level.number_of_alien / 100;
          for (let i = 0; i < aliensToSpawn; i++) {
            const alienCopy = { ...alienType };
            this.aliens.push(alienCopy);
          }
        }
        for (let i = 10; i < this.aliens.length; i++) { // RANDOMIZE LES ALIENS SAUF LES 10 PREMIERS CE SONT DES ALIENS NORMAUX
          const randomIndex = Math.floor(Math.random() * (this.aliens.length - 10)) + 10;
          const temp = this.aliens[i];
          this.aliens[i] = this.aliens[randomIndex];
          this.aliens[randomIndex] = temp;
        }

        let speed = this.aliens[0].speed*500;

        const intervalAlienSpeed = setInterval(() => {
          const robotOnSameRow = this.placedRobot.find(robot => robot.row === this.aliensRow && robot.row <= this.robotsColumn + 1);
          const robotOnSameColumn = this.placedRobot.find(robot => robot.row === this.aliensRow && robot.column + 1 === this.aliensColumn);
          if (!robotOnSameRow || this.aliensColumn > 1 && !robotOnSameColumn) {
            this.aliensColumn--;
          }
          this.placedRobot.forEach(robot => { // SI L'ALIEN EST SUR LA MEME LIGNE ET COLONNE +1 QUE LE ROBOT, LE ROBOT PERD DE LA VIE
            // if (!robotOnSameRow && !robotOnSameColumn && this.aliensColumn <= 1) {
            //   this.aliensColumn = 10;
            // }
            if (robot.row === this.aliensRow && robot.column + 1 === this.aliensColumn) {
              robot.isHit = true;
              robot.health -= this.aliens[0].power;
              setTimeout(() => {
                robot.isHit = false;
              }, 100);
              setTimeout(() => {
                if (robot.health <= 0 && this.placedRobot.indexOf(robot) !== -1) {
                  this.placedRobot.splice(this.placedRobot.indexOf(robot), 1); // SI LE ROBOT EST MORT, ON LE SUPPRIME
                }
              }, speed);
            }
          });
          if (this.aliens.length > 0) {
            if (this.user.ressources !== this.previousRessources) { // SYSTEME POUR METTRE EN ROUGE OU VERT LE NOMBRE DE RESSOURCES QUAND ON EN GAGNE OU PERD
              this.previousRessources = this.user.ressources;
            }
            if(this.aliensColumn <= 1) { // SI L'ALIEN EST SUR LA COLONNE 1 LA PARTIE EST PERDUE
              this.$api.patch(`/games/${this.getCookie('gid')}`, {
                status: 'finished',
              })
              this.game.status = 'finished';
              clearInterval(interval);
              clearInterval(intervalAlienSpeed);
            }
          } else {
            this.$api.patch(`/games/${this.getCookie('gid')}`, { // SI TOUS LES ALIENS SONT MORTS LA PARTIE EST GAGNÉE
              status: 'finished',
            })
            this.game.status = 'finished';
            this.$api.patch(`/players/${this.user.id_player}`, {
              ressources: this.user.ressources + this.level.reward,
            })
            this.user.ressources += this.level.reward;
            clearInterval(interval);
            clearInterval(intervalAlienSpeed);
          }
        }, speed);

        const interval = setInterval(() => {
          if (this.aliensColumn <= 10) { // SI L'ALIEN EST SUR LA LIGNE DU ROBOT, LE ROBOT TIRE SUR L'ALIEN
            this.placedRobot.forEach(robot => {
              if (robot.row === this.aliensRow) {
                for (let i = 0; i < robot.reload_time; i++) {
                  this.filterRedAlien = true;
                  this.shootAlien(robot);
                }
                setTimeout(() => {
                  this.filterRedAlien = false;
                }, 100);
              }
            });
          }
          if (this.aliens.length > 0) {
            if (this.user.ressources !== this.previousRessources) { // SYSTEME POUR METTRE EN ROUGE OU VERT LE NOMBRE DE RESSOURCES QUAND ON EN GAGNE OU PERD
              this.previousRessources = this.user.ressources;
            }
            if(this.aliensColumn <= 1) { // SI L'ALIEN EST SUR LA COLONNE 1 LA PARTIE EST PERDUE
              this.$api.patch(`/games/${this.getCookie('gid')}`, {
                status: 'finished',
              })
              this.game.status = 'finished';
              clearInterval(interval);
              clearInterval(intervalAlienSpeed);
            }
          } else {
            this.$api.patch(`/games/${this.getCookie('gid')}`, { // SI TOUS LES ALIENS SONT MORTS LA PARTIE EST GAGNÉE
              status: 'finished',
            })
            this.game.status = 'finished';
            this.$api.patch(`/players/${this.user.id_player}`, {
              ressources: this.user.ressources + this.level.reward,
            })
            this.user.ressources += this.level.reward;
            clearInterval(interval);
            clearInterval(intervalAlienSpeed);
          }
        }, 500);
      } catch (error) {
        console.error('Erreur lors de la récupération des aliens:', error);
      }
    },
    async shootAlien(robot) {
      if (this.aliensRow === robot.row && this.aliens.length > 0) {
        // L'alien attaque le robot s'ils sont adjacents
        this.aliens[0].health -= robot.power;
        this.$api.patch(`/players/${this.user.id_player}`, {
          score: this.user.score + robot.power,
        })
        this.$api.patch(`/games/${this.getCookie('gid')}`, {
          score: this.user.score + robot.power,
        })
        this.user.score += robot.power;
        this.game.score += robot.power;
        if (this.aliens[0].health <= 0) {
          this.user.ressources += this.aliens[0].drop;
          this.getRandomRow();
          this.aliensColumn = 10;
          this.aliens.splice(0, 1);
          this.level.number_of_alien = this.aliens.length;
        }
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
  },
  mounted() {
    if(!this.getCookie('uid')) {
      this.$router.push('/');
    }
    this.$api.patch(`/games/${this.getCookie('gid')}`, {
      status: 'not_started',
    })
    this.game.status = 'not_started';
    if(this.game) {
      this.getLevel();
      this.getRobots();
      this.spawnAliens();
    }
  }
}
</script>

<style scoped lang="scss">

// FINISH ANIMATION


.finishHim {
  animation: teleportation 1s forwards;
  overflow: hidden;
}

.finishHim::after {
  content: '';
  background-image: url(@/assets/images/player/finishHim.gif);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

@keyframes teleportation {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

.health-bar {
  position: relative;
  width: 100%;
  height: 3px;
  background-color: rgb(0, 192, 0);
  border-radius: 1.5rem;
  z-index: 1;
}

.filterRedAlien {
  filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
}

.filterRedRobot {
  filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
}

.animate-start {
  &-shop {
    animation: start-shop 1s infinite cubic-bezier(0.55, 0.15, 0.45, 0.25);
  }
  &-main {
    animation: start-main 3s infinite linear;
  }
}

@keyframes start-shop {
  0% {
    border: 1px solid transparent;
  }
  50% {
    border: 1px solid #D4AF37;
  }
  100% {
    border: 1px solid transparent;
  }
}

@keyframes start-main {
  0% {
    color: #ffffff70;
  }
  50% {
    color: #ffffff;
  }
  100% {
    color: #ffffff70;
  }
}

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
  cursor: pointer;
  display: flex;
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  position: absolute;
  z-index: 1;
  transition: border 0.5s;
  &:after {
    cursor: pointer;
    content: '';
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-image: url(@/assets/images/player/robot_Normal.png);
  }
  &:hover {
    cursor: pointer;
    content: '';
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(@/assets/images/player/robot_Normal.png);
  }
}

.background-Gunner {
  cursor: pointer;
  display: flex;
  width: 4rem;
  height: 4rem;
  transform: scaleX(-1);
  border-radius: 0.75rem;
  position: absolute;
  z-index: 1;
  transition: border 0.5s;
  &:after {
    cursor: pointer;
    content: '';
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-image: url(@/assets/images/player/robot_Gunner.png);
  }
  &:hover {
    cursor: pointer;
    content: '';
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(@/assets/images/player/robot_Gunner.png);
  }
}

.background-Bigbro {
  cursor: pointer;
  display: flex;
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  position: absolute;
  z-index: 1;
  transition: border 0.5s;
  &:after {
    cursor: pointer;
    content: '';
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-image: url(@/assets/images/player/robot_Bigbro.png);
  }
  &:hover {
    cursor: pointer;
    content: '';
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(@/assets/images/player/robot_Bigbro.png);
  }
}
</style>
