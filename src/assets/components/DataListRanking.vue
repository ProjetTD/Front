<template>
  <table class="datalistranking" v-if="data.length > 0">
    <thead>
      <tr>
        <th
          v-for="(item, key) in assign"
          :key="key" @click="!item.cancelSort ? shortBy(item, key) : null">
          <div :class="{ 'cursor-pointer': !item.cancelSort }">
            <span>{{ item.name }}</span>
            <img v-if="short.item === key" src="@/assets/images/leaderboard/arrow_categorie.svg"
                 :class="{ 'rotate-180': short.order === 'desc' }"
                 class="w-4 h-4 transition-all ease-in-out"/>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in data" :key="'items'+key" :class="'orderList'+(iterate + key)">
        <th v-for="(datas, key2) in finalData[key]" :key="'items'+key2+key">
          <div>
            <span v-if="Array.isArray(datas) && assign[key2].lang">
              {{
                $lang.get(`${assign[key2].lang}.${datas.join('.')}`) ||
                assign[key2].lang + '.' + datas.join('.')
              }}
            </span>
            <span v-else-if="assign[key2].iterate">
              <a :class="{ 'colorRank': (iterate + key + 1 != 1 || 2 || 3)}">{{ iterate + key + 1 }}</a>{{ iterate + key + 1 === 1 ? 'ER' : 'EME' }}
            </span>
            <span class="flex items-center gap-2" v-else-if="assign[key2].percent">
              {{ 
                datas
              }}%
            </span>
            <span v-else-if="Array.isArray(datas)">
              {{$lang.get(`${datas.join('.')}`) || datas.join('.') }}
            </span>
            <span v-else-if="assign[key2].date">
              {{ new Date(datas).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) }}
            </span>
            <span :class="{ 'boldGrade' : datas === 10 }" v-else>
              {{ typeof datas === 'number' ? datas.toLocaleString() : datas }}
            </span>

            <img v-if="assign[key2].icon"
                 :src="getIconSrc(assign[key2].icon, item)"
                 class="w-6 h-6 transition-all ease-in-out"/>
          </div>
        </th>
      </tr>
      <tr v-for="(item, key) in staticData" :key="key">
        <th v-for="(datas, key2) in item" :key="key2">
          <div>
            <span>
                        {{datas.value}}
            </span>
            <img v-if="datas.icon" :src="datas.icon" class="w-6 h-6 transition-all ease-in-out"/>
          </div>
        </th>
      </tr>
    </tbody>
  </table>
  <div v-else>
    <div class="text-center">
      <p class="text-gray-500">{{ $lang.get('error.empty') }}</p>
    </div>
  </div>
</template>

<script>

Object.getPropertyPath = function (obj, path) {
  let _path = path;
  let _obj = obj;
  if (!_obj || !_path) {
    return;
  }

  _path.split('.').forEach(key => {
    if (!_obj) {
      return;
    }
    if (_obj && Array.isArray(_obj)) {
      _obj = _obj[0];
    }
    _obj = _obj[key];
  });
  return _obj;
};

export default {
  name: "DataListRanking",
  props: {
    data: {
      type: Array,
      required: true
    },
    assign: {
      type: Array,
      required: true
    },
    iterate: {
      type: Number,
      required: false,
      default: 0
    },
    staticData: {
      type: Array,
      required: false,
      name: 'static'
    },
  },
  data: () => ({
    finalData: [],
    short: {
      item: null,
      order: null
    }
  }),
  beforeMount() {
    this.orderData()
  },
  watch: {
    data() {
      this.orderData()
    },
  },
  methods: {
    shortBy(item, key) {
      // Détermination de l'ordre de tri
      let order = 'asc';
      if (this.short.item === key) {
        order = this.short.order === 'asc' ? 'desc' : 'asc';
      }

      // Mise à jour de l'état de tri
      this.short.item = key;
      this.short.order = order;

      // Tri des données
      this.finalData = this.finalData.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (order === 'asc') {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
          return 0;
        } else {
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
          return 0;
        }
      });
    },
    orderData() {
      this.data.forEach((item, index) => {
        this.finalData[index] = []
        this.assign.forEach((assign) => {
          if (Array.isArray(assign.value)) {
            this.finalData[index].push(assign.value.map((value) => {
              return Object.getPropertyPath(item, value)
            }))
          } else this.finalData[index].push(Object.getPropertyPath(item, assign.value))
        })
      })
    },
    getIconSrc(icon, item) {
      const match = icon.match(/{{.*}}/);
      return match ? icon.replace(/{{.*}}/,
        Object.getPropertyPath(item, icon.match(/{{.*}}/)[0].replace(/{{/, '').replace(/}}/, '')).toLowerCase()
      ) : icon
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/datalistranking.scss";
</style>
