import { storeToRefs } from 'pinia'
import { postReserva, postPreReserva } from '@/services/reservasService'
import { useReservaStore } from '@/stores/reservaStore'

export const useReserva = () => {
	const reservaStore = useReservaStore()
	const { visitante, reserva, pago, horario } = storeToRefs(reservaStore)

	const pagarReserva = async () => {
		visitante.value.nombre = visitante.value.nombre.toUpperCase()
		visitante.value.email = visitante.value.email.toLowerCase()

		const payload = {
			identificador: reserva.value.identificador,
			idProg: horario.value.identificador,
			cliente: visitante.value,
			cantidad: reserva.value.cantidad,
			cantidadTotal: reserva.value.cantidadTotal,
			pago: pago.value,
			fechaRegistro: new Date().toISOString(),
		}

		const response = await postReserva(payload)
		return response
	}

	const prereservar = async () => {
		visitante.value.nombre = visitante.value.nombre.toUpperCase()
		visitante.value.email = visitante.value.email.toLowerCase()

		const payload = {
			identificador: reserva.value.identificador,
			idProg: horario.value.identificador,
			cliente: visitante.value,
			cantidad: reserva.value.cantidad,
			cantidadTotal: reserva.value.cantidadTotal,
			pago: pago.value,
			fechaRegistro: new Date().toISOString(),
		}

		const response = await postPreReserva(payload)
		return response
	}

	return {
		visitante,
		reserva,
		pago,
		horario,

		pagarReserva,
		prereservar,
	}
}
