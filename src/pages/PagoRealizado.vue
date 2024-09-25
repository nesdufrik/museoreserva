<template>
	<div class="text-center text-9xl my-16">🎉</div>
	<div class="card">
		<h3 class="text-3xl text-center mb-7">Genial, ya tienes tu reserva</h3>
		<p class="text-center">
			Una vez confirmada tu reserva enviaremos un resumen de la reserva a tu
			correo electrónico
			<span class="text-xl font-bold italic">{{ visitante.email }}</span
			>. Si no recibes el correo electrónico, revisa tu carpeta de correo no
			deseado.
		</p>
	</div>
	<div class="flex justify-center gap-4 mt-10">
		<Button
			label="Volver al inicio"
			icon="pi pi-home"
			size="large"
			@click="volverAlInicio"
		/>
	</div>
</template>
<script setup>
import { useReserva } from '@/composables/useReserva'

const { visitante } = useReserva()

const volverAlInicio = () => {
	window.location.href = '/'
}
</script>
