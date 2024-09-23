import { defineStore } from 'pinia'

export const useReservaStore = defineStore('reserva', {
	state: () => {
		return {
			visitante: {
				nombre: '',
				email: '',
				telefono: '',
			},
			reserva: {
				idEvento: null,
				cantidad: [],
				cantidadTotal: 0,
			},
			pago: {
				total: 0,
				comprobante: null,
			},
			horario: {
				fecha: null,
				inicioEvento: null,
				finEvento: null,
				spots: 0,
			},
		}
	},
})
