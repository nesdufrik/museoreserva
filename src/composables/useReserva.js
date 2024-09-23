import { storeToRefs } from 'pinia'
import { useReservaStore } from '@/stores/reservaStore'

export const useReserva = () => {
	const reservaStore = useReservaStore()
	const { visitante, reserva, pago, horario } = storeToRefs(reservaStore)

	const pagarReserva = async () => {
		const url =
			'https://n8n.friktek.com/webhook/0156e664-898b-478f-878e-260cc3bf4fbd'

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(pago.value),
		})

		const data = await response.json()
		console.log(data)
	}

	return {
		visitante,
		reserva,
		pago,
		horario,

		pagarReserva,
	}
}
