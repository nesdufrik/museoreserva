<template>
	<h2 class="text-center text-2xl font-bold mb-3">FECHAS Y HORARIOS</h2>
	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="flex justify-center mb-5">
			<DatePicker
				v-model="dateCalendario"
				inline
				:disabledDays="evento?.diasNoActivo"
				:minDate="new Date()"
				@update:modelValue="
					cargarHorarios(dateCalendario, 'd999971a-613f-4093-9361-9213f819d011')
				"
			/>
		</div>
		<div class="grid grid-cols-2 gap-4 justify-center" v-if="action">
			<Skeleton
				width="100%"
				height="5rem"
				v-for="index in 6"
				:key="index"
			></Skeleton>
		</div>
		<div class="grid grid-cols-2 gap-4 justify-center" v-else>
			<template v-for="horario in horarios" :key="horario.identificador">
				<Button
					severity="secondary"
					class="flex flex-col items-center"
					@click="registrarDatosReserva(horario.identificador)"
					:disabled="botonDesactivado(horario.inicioEvento, horario.activo)"
				>
					<div class="text-center font-semibold text-xl">
						{{ `${horario.inicioEvento} - ${horario.finEvento}` }}
					</div>
					<div class="text-center text-sm">{{ horario.spots }} disponibles</div>
				</Button>
			</template>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useEvento } from '@/composables/useEvento'
import { useHorarios } from '@/composables/useHorarios'
import { useReserva } from '@/composables/useReserva'

const { cargarEvento, evento } = useEvento()
const { horarios, cargarHorarios, action } = useHorarios()
const { reserva, horario } = useReserva()

const dateCalendario = ref(new Date())
const router = useRouter()

const registrarDatosReserva = (idProg) => {
	const tipoVisitas = evento.value.precios.map((pago) => ({
		tipo: pago.tipo,
		cantidad: 0,
	}))

	reserva.value = {
		...reserva.value,
		cantidad: tipoVisitas,
		idEvento: evento.value.identificador,
	}
	const horarioSeleccionado = horarios.value.find(
		(h) => h.identificador === idProg
	)
	horario.value = horarioSeleccionado

	router.push({ name: 'RegistroVisitante' })
}

const botonDesactivado = (hora, activo) => {
	const actual = new Date()
	const horario = new Date(dateCalendario.value)
	horario.setHours(hora.split(':')[0], hora.split(':')[1])

	if (actual > horario) return true
	return !activo
}

cargarEvento('d999971a-613f-4093-9361-9213f819d011')
cargarHorarios(dateCalendario.value, 'd999971a-613f-4093-9361-9213f819d011')
</script>
