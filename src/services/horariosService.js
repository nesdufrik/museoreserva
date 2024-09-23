import horarios from '@/data/horarios.json'
import { format } from '@formkit/tempo'

export const getHorarios = (fecha) => {
	const fechaFormateada = format(fecha, 'YYYY-MM-DD')
	const res = horarios.filter((horario) => horario.fecha === fechaFormateada)
	return res
}
