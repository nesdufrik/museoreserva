import { storeToRefs } from 'pinia'
import { postReserva } from '@/services/reservasService'
import { useReservaStore } from '@/stores/reservaStore'

export const useReserva = () => {
	const reservaStore = useReservaStore()
	const { visitante, reserva, pago, horario } = storeToRefs(reservaStore)

	const pagarReserva = async () => {
		const payload = {
			identificador: reserva.value.identificador,
			idProg: horario.value.identificador,
			cliente: visitante.value,
			cantidad: reserva.value.cantidad,
			cantidadTotal: reserva.value.cantidadTotal,
			pago: pago.value,
		}

		const response = await postReserva(payload)
		return response
	}

	return {
		visitante,
		reserva,
		pago,
		horario,

		pagarReserva,
	}
}
