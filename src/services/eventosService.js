import eventos from '@/data/eventos.json'

export const getEventos = (idEvento) => {
	const res = eventos.find((evento) => evento._id === idEvento)
	return res
}
