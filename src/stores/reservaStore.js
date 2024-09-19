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
				fecha: '',
				hora: '',
				cantidad: 1,
			},
			pago: {
				precioUnitario: 20,
				total: 20,
				comprobante: null,
			},
		}
	},
})
