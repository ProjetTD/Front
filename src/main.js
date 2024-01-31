import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './plugins/services/api.js'

createApp(App)
    .use(router)
    .use(api)
    .mount('#app')
