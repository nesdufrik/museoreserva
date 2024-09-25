import axios from 'axios'

export const postReserva = async (reserva) => {
	try {
		const response = await axios.post('/reservas', reserva)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
