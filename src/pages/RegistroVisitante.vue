<template>
	<h2 class="text-center text-2xl font-bold mb-3">DATOS DEL VISITANTE</h2>
	<div class="card flex flex-col mb-10">
		<div class="text-center">{{ format(horario.fecha, 'medium', 'es') }}</div>
		<div class="grid grid-flow-col gap-5">
			<div class="flex flex-col items-center w-full">
				<h3 class="text-3xl">Horario</h3>
				<span class="text-lg">{{
					`${horario.inicioEvento} - ${horario.finEvento}`
				}}</span>
			</div>
			<div class="flex flex-col items-center w-full">
				<h3 class="text-3xl">Cupos</h3>
				<span class="text-lg">{{ cuposRestantes }}</span>
			</div>
		</div>
	</div>
	<!--Formulario-->
	<div class="w-full">
		<form class="flex flex-col gap-4">
			<div class="flex gap-6">
				<div class="w-1/2">
					<div
						class="flex-auto mb-2"
						v-for="(pago, index) in evento.precios"
						:key="index"
					>
						<label :for="`cantidad-personas${index}`" class="block mb-2">
							{{ pago.tipo }}
						</label>
						<InputNumber
							inputClass="w-full"
							:inputId="`cantidad-personas${index}`"
							v-model="reserva.cantidad[index].cantidad"
							showButtons
							buttonLayout="horizontal"
							:min="0"
							:max="
								cuposRestantes <= 0
									? reserva.cantidad[index].cantidad
									: horario.spots
							"
						>
							<template #incrementbuttonicon>
								<span class="pi pi-plus" />
							</template>
							<template #decrementbuttonicon>
								<span class="pi pi-minus" />
							</template>
						</InputNumber>
					</div>
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
				icon="pi pi-calendar"
				size="large"
				@click="registrarReserva"
			/>
		</form>
	</div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { format } from '@formkit/tempo'
import { useReserva } from '@/composables/useReserva'
import { useEvento } from '@/composables/useEvento'

const { visitante, pago, horario, reserva } = useReserva()
const { evento } = useEvento()

const router = useRouter()

const cuposRestantes = computed(
	() =>
		horario.value.spots -
		reserva.value.cantidad.reduce((acc, curr) => acc + curr.cantidad, 0)
)
const precioTotal = computed(() =>
	reserva.value.cantidad.reduce(
		(acc, curr) =>
			acc +
			evento.value.precios.find((p) => p.tipo === curr.tipo).precio *
				curr.cantidad,
		0
	)
)

const registrarReserva = () => {
	reserva.value.cantidadTotal = reserva.value.cantidad.reduce(
		(acc, curr) => acc + curr.cantidad,
		0
	)
	pago.value.total = precioTotal.value
	router.push({ name: 'PagoVisitante' })
}
</script>
