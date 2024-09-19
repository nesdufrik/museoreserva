import { getHorarios } from '@/services/horariosService'

export const useHorarios = () => {
	return {
		horarios: getHorarios(),
	}
}
