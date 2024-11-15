<template>
	<div class="flex flex-row gap-4">
		<Card
			style="width: 25rem; overflow: hidden"
			v-for="(evento, index) in eventos"
			:key="index"
		>
			<template #title>{{ evento.nombre }}</template>
			<template #content>
				<p class="m-0">
					{{ evento.descripcion }}
				</p>
			</template>
			<template #footer>
				<div class="flex gap-4 mt-1">
					<Button
						label="Reservar"
						class="w-full"
						as="router-link"
						:to="`/${evento.identificador}`"
					/>
				</div>
			</template>
		</Card>
	</div>
</template>
<script setup>
import { useEvento } from '@/composables/useEvento'

const { eventos, cargarEventos } = useEvento()

cargarEventos()
</script>
