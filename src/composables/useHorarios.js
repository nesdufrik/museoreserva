import { storeToRefs } from 'pinia'
import { getHorarios } from '@/services/horariosService'
import { useHorarioStore } from '@/stores/horarioStore'

export const useHorarios = () => {
	const horarioStore = useHorarioStore()
	const { horarios } = storeToRefs(horarioStore)

	const cargarHorarios = async (fecha) => {
		const response = await getHorarios(fecha)
		horarios.value = response
	}

	return {
		horarios,

		cargarHorarios,
	}
}
