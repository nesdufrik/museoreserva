<template>
	<h1 class="text-center text-5xl mb-5">Reservas Museo</h1>
	<div class="flex flex-col mb-10">
		<div class="text-center">{{ reserva.fecha }}</div>
		<div class="grid grid-flow-col gap-5">
			<div class="flex flex-col items-center w-full">
				<h3 class="text-3xl">Horario</h3>
				<span class="text-lg">{{ reserva.hora }}</span>
			</div>
			<div class="flex flex-col items-center w-full">
				<h3 class="text-3xl">Cupos</h3>
				<span class="text-lg">{{ diferencia }}</span>
			</div>
		</div>
	</div>
	<!--Formulario-->
	<div class="w-full">
		<form class="flex flex-col gap-4">
			<div class="flex gap-6">
				<div class="flex-auto w-1/2">
					<label for="cantidad-personas" class="block mb-2"> Personas </label>
					<InputNumber
						inputClass="w-full"
						inputId="cantidad-personas"
						v-model="reserva.cantidad"
						showButtons
						buttonLayout="horizontal"
						:min="1"
						:max="disponibles"
					>
						<template #incrementbuttonicon>
							<span class="pi pi-plus" />
						</template>
						<template #decrementbuttonicon>
							<span class="pi pi-minus" />
						</template>
					</InputNumber>
				</div>
				<div class="flex w-1/2 items-end justify-end text-2xl">
					{{ precioTotal }} BOB.
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label for="nombre-cliente">Nombre completo</label>
				<InputText
					class="uppercase"
					type="text"
					id="nombre-cliente"
					v-model="visitante.nombre"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="correo-cliente">Correo electrónico</label>
				<InputText
					class="lowercase"
					type="mail"
					id="correo-cliente"
					v-model="visitante.email"
				/>
			</div>
			<div class="flex-auto">
				<label for="numero-cliente" class="font-bold block mb-2"
					>Número de teléfono</label
				>
				<InputMask
					id="numero-cliente"
					v-model="visitante.telefono"
					mask="+999 99999999"
					placeholder="+000 12345678"
				/>
			</div>
			<Button
				label="Reserva ahora"
				icon="pi pi-check"
				size="large"
				@click="registrarReserva"
			/>
		</form>
	</div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useReserva } from '@/composables/useReserva'

const { reserva, visitante } = useReserva()
const router = useRouter()

const precioIngreso = 20
const disponibles = 10
const diferencia = computed(() => disponibles - reserva.value.cantidad)
const precioTotal = computed(() => reserva.value.cantidad * precioIngreso)
const registrarReserva = () => {
	console.log('Reserva registrada')
	router.push({ name: 'PagoVisitante' })
}
</script>
