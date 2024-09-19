<template>
	<div class="card flex justify-center">
		<DatePicker v-model="date" inline showWeek />
	</div>
	<div class="card flex justify-center">
		<template v-for="elm in horario.horarios">
			<Button
				type="button"
				style="width: 100%; display: flex; flex-direction: column"
				:disabled="elm.capacidad === 0"
				@click="registrarDatosReserva(horario.fecha, elm.hora)"
			>
				<div style="font-weight: bold; font-size: 1rem">{{ elm.hora }}</div>
				<div style="font-style: italic; font-size: 0.8rem">
					{{ elm.capacidad }} disponibles
				</div>
			</Button>
		</template>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { format, parse } from '@formkit/tempo'
import { useRouter } from 'vue-router'

import { useHorarios } from '@/composables/useHorarios'
import { useReserva } from '@/composables/useReserva'

const { horarios } = useHorarios()
const { reserva } = useReserva()

const date = ref(new Date())
const horario = ref()
const router = useRouter()

const buscarHorarios = () => {
	const fecha = format(date.value, 'DD-MM-YYYY')
	const horariosDisponibles = horarios.find(
		(horario) => horario.fecha === fecha
	)
	if (horariosDisponibles) {
		horario.value = horariosDisponibles
	} else {
		horario.value = []
	}
}

const registrarDatosReserva = (fecha, hora) => {
	reserva.value.fecha = fecha
	reserva.value.hora = hora
	reserva.value.cantidad = 2

	router.push({ name: 'RegistroVisitante' })
}

buscarHorarios()
watch(date, buscarHorarios)
</script>
