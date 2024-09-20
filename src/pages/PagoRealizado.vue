<template>
	<div class="text-center text-9xl my-16">🎉</div>
	<div>
		<h3 class="text-3xl text-center mb-7">Genial, ya tienes tu reserva</h3>
		<p class="text-center">
			Una vez confirmada tu reserva enviaremos un resumen de la reserva a tu
			correo electrónico <strong>{{ 'nombre@mail.com' }}</strong
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
import { useRouter } from 'vue-router'
const router = useRouter()

const volverAlInicio = () => {
	router.push({ name: 'Home' })
}
</script>
