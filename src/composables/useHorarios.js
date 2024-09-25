import { storeToRefs } from 'pinia'
import { getHorarios } from '@/services/horariosService'
import { useHorarioStore } from '@/stores/horarioStore'

export const useHorarios = () => {
	const horarioStore = useHorarioStore()
	const { horarios } = storeToRefs(horarioStore)

	const cargarHorarios = async (fecha, idEvento) => {
		const response = await getHorarios(fecha, idEvento)
		horarios.value = response.data
	}

	return {
		horarios,

		cargarHorarios,
	}
}
