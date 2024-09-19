import { storeToRefs } from 'pinia'
import { useReservaStore } from '@/stores/reservaStore'

export const useReserva = () => {
	const reservaStore = useReservaStore()
	const { visitante, reserva, pago } = storeToRefs(reservaStore)

	return {
		visitante,
		reserva,
		pago,
	}
}
