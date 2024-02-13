<template>
  <div :class="{'finishHimParent': game.status === 'finished'}">
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
        <div v-if="aliens.length > 0 || game.status === 'finished'" class="flex flex-row items-center justify-center gap-2">
          <div class="flex flex-col justify-center gap-2">
            <div v-for="row in 5" :key="row" class="bg-theme-main flex border-white border-[1px] rounded-xl">
              <div v-for="col in 10" :key="col" class="flex items-center justify-center w-20 h-20">
                <div v-if="aliens.length > 0 && col === aliensColumn && row === aliens[0].row && game.status !== 'not_started'" class="w-16 h-16 flex flex-col items-center justify-center">
                  <img v-if="aliens.length > 0" :src="getAlienImage(aliens[0].name)" class="-scale-x-[1] w-16 h-16" :class="{ 'filterRedAlien' : filterRedAlien}"/>
                  <div v-if="aliens.length > 0" class="!animate-none flex items-center w-full h-[5px] border-white/30 border-[1px] rounded-3xl">
                    <div class="health-bar !animate-none" :style="{ width: getAlienHealthWidth(aliens[0]) }"></div>
                  </div>
                </div>
                <div v-on:click="placeRobot(row, col)" v-if="aliens.length > 0 && game.status !== 'finished' && col <= robotsColumn && (row !== aliens[0].row || col !== aliensColumn) && !this.placedRobot.some(robot => robot.row === row && robot.column === col)" class="border-[1px] border-white/0 rounded-xl" :class="'background-' + selectedRobot.name"></div>
                <div v-for="robot in placedRobot" :key="robot.column">
                  <div class="flex flex-col items-center justify-center" v-if="aliens.length > 0 && game.status !== 'finished' && robot.row === row && robot.column === col">
                    <img :src="getRobotImage(robot.type)" class="w-16 h-16" :class="{ '-scale-x-[1]': robot.type === 'Gunner', 'filterRedRobot' : robot.isHit }">
                    <div class="flex items-center w-full h-[5px] border-white/30 border-[1px] rounded-3xl">
                      <div class="health-bar" :style="{ width: getHealthWidth(robot) }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="aliens.length > 0 || game.status === 'finished'" class="flex items-center justify-center flex-col gap-2">
            <div v-for="row in 5" :key="row" class="bg-theme-main flex border-white border-[1px] rounded-xl">
              <div v-for="col in 1" :key="col" class="flex items-center justify-center w-20 h-20">
                <div v-if="aliens.length > 0 && col === 1 && row === aliens[0].row && placedRobot.length <= 0" class="w-16 h-16 flex flex-col items-center justify-center">
                  <img v-if="aliens.length > 0" :src="getAlienImage(aliens[0].name)" class="-scale-x-[1] w-16 h-16" />
                </div>
                <div v-if="aliens.length > 1 && col === 1 && row === aliens[1].row && placedRobot.length > 0" class="w-16 h-16 flex flex-col items-center justify-center">
                  <img v-if="aliens.length > 0" :src="getAlienImage(aliens[1].name)" class="animate-alien -scale-x-[1] opacity-30 w-16 h-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="aliens.length <= 0 && game.status !== 'finished'" class="flex items-center justify-center w-full h-1/3 flex-col gap-4">
          <i>Une erreur est survenue lors de la récupération des aliens...</i>
          <button v-on:click="reloadPage" class="button-revert font-normal flex items-center justify-center gap-2 hover:border-white border-[1px] rounded-xl px-2 py-2 text-black hover:text-white bg-white hover:bg-black/0 duration-200">
            <svg class="h-6" fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-rotate-counterclockwise">
              <path d="M0 11V12H1V13H2V14H3V15H5V14H6V13H7V12H8V11H5V9H6V7H7V6H9V5H13V6H15V7H16V9H17V13H16V15H15V16H13V17H9V16H6V18H8V19H14V18H16V17H17V16H18V14H19V8H18V6H17V5H16V4H14V3H8V4H6V5H5V6H4V8H3V11H0Z" />
            </svg>
            <p class="hidden lg:block">Recharger les données</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <transition name="fadeTransition">
    <div v-show="gameResult === 'lose' || gameResult === 'win'"
          class="z-[99] justify-center h-full gap-8 flex-col absolute lg:fixed w-full bg-black/90 text-white top-0 left-0 flex items-center text-center">
      <div class="w-4/5 lg:w-2/5 flex flex-col items-center justify-center border-[1px] border-white/30 rounded-lg p-8 bg-black/70 gap-10">
        <div class="relative w-full flex items-center justify-center gap-4">
          <img class="mt-12 w-10 h-10" src="@/assets/images/player/game_finished.svg" />
          <h1 class="mt-12 font-black text-[1rem] lg:text-[1.5rem] z-10 uppercase">La partie est terminée !</h1>
          <button
            class="absolute top-0 left-0 w-8 rounded-md border border-gray-500 h-8 bg-black/70 hover:border-white duration-200"
            v-on:click="reloadPage">
            <img src="@/assets/images/player/cross.svg" />
          </button>
        </div>
        <div class="flex items-center flex-col w-full gap-7">
          <span>
            <i v-if="gameResult === 'win'" class="opacity-80">Vous avez réussi à vaincre tous les aliens ! Grâce à ça, vous avez gagné <b>{{ level.reward }}</b> ressources.</i>
            <i v-else-if="gameResult === 'lose'" class="opacity-80">Vous avez perdu la partie, les aliens ont réussi à atteindre votre base. Essayez de nouveau pour gagner des ressources !</i>
            <div class="relative w-full flex items-center justify-center gap-2">
              <img class="mt-12 w-7 h-7" src="@/assets/images/player/stats.svg" />
              <h1 class="mt-12 font-black text-[0.6rem] lg:text-[1.2rem] z-10 uppercase">Statistiques globales</h1>
            </div>
            <br>
            <p class="font-medium opacity-60">Votre score est de <b>{{ user.score }}</b> points.</p>
            <p class="font-medium opacity-60">Vous avez gagné <b>{{ user.win }}</b> {{ user.win > 1 ? 'parties' : 'partie' }}.</p>
            <p class="font-medium opacity-60">Vous avez perdu <b>{{ user.lose }}</b> {{ user.lose > 1 ? 'parties' : 'partie' }}.</p>
            <p class="font-medium opacity-60">Vous avez <b>{{ user.ressources }}</b> {{ user.ressources > 1 ? 'ressources' : 'ressource' }}.</p>
          </span>
        </div>
      </div>
    </div>
  </transition>
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
      robotsColumn: 3,
      selectedRobot: {},
      selectedRobotCost: 0,
      placedRobot: [],
      previousRessources: 0,
      filterRedAlien: false,
      gameResult: null,
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
    async reloadPage() {
      window.location.reload();
      this.game.status = 'not_started';
      this.gameResult = null;
      if(this.game) {
        await this.$api.patch(`/games/${this.getCookie('gid')}`, {
          status: 'not_started',
        })
      }
      await this.getAliens();
      await this.getRobots();
    },
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
    async getAliens() {
      try {
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
        for (const element of this.aliens) {
          element.row = Math.floor(Math.random() * 5) + 1; // AJOUTE UNE LIGNE ALEATOIRE A CHAQUE ALIEN
        }
        for (let i = 10; i < this.aliens.length; i++) { // RANDOMIZE LES ALIENS SAUF LES 10 PREMIERS CE SONT DES ALIENS NORMAUX
          const randomIndex = Math.floor(Math.random() * (this.aliens.length - 10)) + 10;
          const temp = this.aliens[i];
          this.aliens[i] = this.aliens[randomIndex];
          this.aliens[randomIndex] = temp;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des aliens:', error);
      }
    },
    async spawnAliens() {
      if (this.placedRobot.length === 0) {
        setTimeout(this.spawnAliens, 1000);
        return;
      }

      this.$api.patch(`/games/${this.getCookie('gid')}`, {
        status: 'in_progress',
      })

      this.game.status = 'in_progress';

      let speed = this.aliens[0].speed*500;

      const intervalAlienSpeed = setInterval(() => {
        if (this.aliens.length > 0) {
          const robotOnSameRow = this.placedRobot.find(robot => robot.row === this.aliens[0].row && robot.row <= this.robotsColumn + 1);
          const robotOnSameColumn = this.placedRobot.find(robot => robot.row === this.aliens[0].row && robot.column + 1 === this.aliensColumn);
          if (!robotOnSameRow || this.aliensColumn > 1 && !robotOnSameColumn) {
            this.aliensColumn--;
          }
          this.placedRobot.forEach(robot => { // SI L'ALIEN EST SUR LA MEME LIGNE ET COLONNE +1 QUE LE ROBOT, LE ROBOT PERD DE LA VIE
            // if (!robotOnSameRow && !robotOnSameColumn && this.aliensColumn <= 1) {
            //   this.aliensColumn = 10;
            // }
            if (robot.row === this.aliens[0].row && robot.column + 1 === this.aliensColumn) {
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
            console.log(this.user.lose);
              this.$api.patch(`/players/${this.user.id_player}`, {
                lose: this.user.lose + 1,
              })
              this.user.lose++;
              this.$api.patch(`/games/${this.getCookie('gid')}`, {
                status: 'finished',
              })
              this.game.status = 'finished';
              clearInterval(interval);
              clearInterval(intervalAlienSpeed);
              setTimeout(() => {
                this.gameResult = 'lose';
              }, 3000);
            }
          } else {
            this.$api.patch(`/players/${this.user.id_player}`, {
              win: this.user.win + 1,
            })
            this.user.win++;
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
            setTimeout(() => {
              this.gameResult = 'win';
            }, 3000);
          }
        }
      }, speed);

      const interval = setInterval(() => {
        if (this.aliensColumn <= 10) { // SI L'ALIEN EST SUR LA LIGNE DU ROBOT, LE ROBOT TIRE SUR L'ALIEN
          this.placedRobot.forEach(robot => {
            if (this.aliens.length > 0 && robot.row === this.aliens[0].row) {
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
          this.$api.patch(`/players/${this.user.id_player}`, {
            win: this.user.win + 1,
          })
          this.user.win++;
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
          setTimeout(() => {
            this.gameResult = 'win';
          }, 3000);
        }
      }, 500);
    },
    async shootAlien(robot) {
      if (this.aliens.length > 0 && this.aliens[0].row === robot.row) { // L'ALIEN ATTQUE LE ROBOT S'ILS SONT ADJACENTS
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
      if(this.game.id_level === null || this.game.id_level === undefined) {
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
    this.getGame();
    if(this.game) {
      this.game.status = 'not_started';
      this.getAliens();
      this.getRobots();
      this.spawnAliens();
    }
  }
}
</script>

<style scoped lang="scss">
.animate-alien {
  animation: fade-alien 0.8s alternate infinite;
}

@keyframes fade-alien {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.7;
  }
}

.finishHim {
  animation: shake 0.2s infinite, teleportation 1s 1.5s forwards;
  overflow: hidden;
}

.finishHimParent::after {
  content: '';
  overflow: hidden;
  background-image: url(@/assets/images/player/finishHim.gif);
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  animation: enter 4s forwards;
}

@keyframes enter {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5px, 5px); }
  50% { transform: translate(-5px, -5px); }
  75% { transform: translate(-5px, 5px); }
  100% { transform: translate(0, 0); }
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
