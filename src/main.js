import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import pinia from './stores'
import router from './router'

import '@/config/axios'
import './assets/main.css'
import customTheme from '@/config/custom-theme'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(ToastService)
app.use(ConfirmationService)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
	theme: {
		preset: customTheme,
		options: {
			prefix: 'p',
			darkModeSelector: '.p-dark',
			cssLayer: false,
		},
	},
})
app.mount('#app')
