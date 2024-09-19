import { createWebHistory, createRouter } from 'vue-router'

import FechaHora from '@/pages/FechaHora.vue'
import RegistroVisitante from '@/pages/RegistroVisitante.vue'

const routes = [
	{ path: '/', name: 'Inicio', component: FechaHora },
	{
		path: '/registro',
		name: 'RegistroVisitante',
		component: RegistroVisitante,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
