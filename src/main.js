import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import pinia from './stores'
import router from './router'

import './assets/main.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(ToastService)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			cssLayer: {
				name: 'primevue',
				order: 'tailwind-base, primevue, tailwind-utilities',
			},
			darkModeSelector: '.dark-mode',
		},
	},
})
app.mount('#app')
