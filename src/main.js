window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './plugins/services/api.js'
import lang from '@/configs/lang'

createApp(App)
    .use(router)
    .use(api)
    .use(lang)
    .mount('#app')
