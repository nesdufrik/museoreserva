<template>
	<h1 class="text-center text-5xl mb-5">Reservas Museo</h1>
	<div class="flex justify-center mb-5">
		<DatePicker v-model="date" inline :disabledDays="[0, 6]" />
	</div>
	<div class="grid grid-cols-2 gap-4 justify-center">
		<template v-for="(elm, index) in horario.horarios" :key="index">
			<Button
				type="button"
				severity="secondary"
				class="flex flex-col items-center"
				:disabled="elm.capacidad === 0"
				@click="registrarDatosReserva(horario.fecha, elm.hora)"
			>
				<div class="text-center font-semibold text-xl">
					{{ elm.hora }}
				</div>
				<div class="text-center text-sm">{{ elm.capacidad }} disponibles</div>
			</Button>
		</template>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { format } from '@formkit/tempo'
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
