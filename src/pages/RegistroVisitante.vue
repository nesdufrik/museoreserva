<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useReserva } from '@/composables/useReserva'

const { reserva, visitante, pago } = useReserva()

const route = useRoute()
const fecha = reserva.fecha
const hora = reserva.hora

const precioIngreso = 20
const disponibles = 10
const diferencia = computed(() => disponibles - reserva.value.cantidad)
const precioTotal = computed(() => reserva.value.cantidad * precioIngreso)
</script>
<template>
	<div class="card flex justify-center">
		<p>Fecha: {{ reserva.fecha }}</p>
		<p>Hora: {{ reserva.hora }}</p>
		<p>Disponibles: {{ diferencia }}</p>
	</div>
	<!--Formulario-->
	<div class="card flex justify-center">
		<form @submit.prevent="registrarVisitante">
			<div class="flex-auto">
				<label for="cantidad-personas" class="font-bold block mb-2">
					Personas
				</label>
				<InputNumber
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
				<div>Total: {{ precioTotal }} BOB.</div>
			</div>
			<div class="flex flex-col gap-2">
				<label for="nombre-cliente">Nombre completo</label>
				<InputText
					type="text"
					id="nombre-cliente"
					v-model="visitante.nombre"
					fluid
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="correo-cliente">Correo electrónico</label>
				<InputText
					type="mail"
					id="correo-cliente"
					v-model="visitante.email"
					fluid
				/>
			</div>
			<div class="flex-auto">
				<label for="numero-cliente" class="font-bold block mb-2"
					>Número de teléfono</label
				>
				<InputMask
					id="numero-cliente"
					v-model="visitante.telefono"
					mask="(999) 999-99999"
					placeholder="(999) 999-99999"
					fluid
				/>
			</div>
			<Button label="Primary" />
		</form>
	</div>
</template>
