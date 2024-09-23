<template>
	<h2 class="text-center text-2xl font-bold mb-3">FECHAS Y HORARIOS</h2>
	<div class="flex justify-center mb-5">
		<DatePicker v-model="date" inline :disabledDays="[0, 6]" />
	</div>
	<div class="grid grid-cols-2 gap-4 justify-center">
		<template v-for="(horario, index) in horarios" :key="index">
			<Button
				severity="secondary"
				class="flex flex-col items-center"
				@click="registrarDatosReserva(horario._id)"
				:disabled="!horario.activo"
			>
				<div class="text-center font-semibold text-xl">
					{{ `${horario.inicioEvento} - ${horario.finEvento}` }}
				</div>
				<div class="text-center text-sm">{{ horario.spots }} disponibles</div>
			</Button>
		</template>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useEvento } from '@/composables/useEvento'
import { useHorarios } from '@/composables/useHorarios'
import { useReserva } from '@/composables/useReserva'

const { cargarEvento, evento } = useEvento()
const { horarios, cargarHorarios } = useHorarios()
const { reserva, horario } = useReserva()

const date = ref(new Date())
const router = useRouter()

const registrarDatosReserva = (idProg) => {
	const tipoVisitas = evento.value.precios.map((pago) => ({
		tipo: pago.tipo,
		cantidad: 0,
	}))

	reserva.value = {
		...reserva.value,
		cantidad: tipoVisitas,
		idEvento: 'even-01',
	}
	const horarioSeleccionado = horarios.value.find((h) => h._id === idProg)
	horario.value = horarioSeleccionado

	router.push({ name: 'RegistroVisitante' })
}

watch(date, cargarHorarios)

cargarEvento('even-01')
cargarHorarios(date.value)
</script>
