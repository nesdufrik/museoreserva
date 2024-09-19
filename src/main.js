import { createApp, markRaw } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'
import Nora from '@primevue/themes/nora'

import App from './App.vue'
import pinia from './stores'
import router from './router'

import './assets/main.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(PrimeVue, { theme: { preset: Nora } })
app.mount('#app')
