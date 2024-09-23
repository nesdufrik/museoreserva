<template>
	<main class="container mx-auto px-4 py-0">
		<Menubar class="mb-5 sticky top-0 py-0 px-2">
			<template #start>
				<h1 class="text-lg font-bold text-primary">MUSEO DEL CHOCOLATE</h1>
			</template>
			<template #end>
				<Button
					icon="pi pi-moon"
					iconPos="right"
					@click="toggleTheme"
					size="small"
					class="p-button-rounded p-button-text"
				/>
			</template>
		</Menubar>
		<RouterView />
	</main>
</template>

<script setup>
const toggleTheme = () => {
	const theme = document.querySelector('html')
	theme.classList.toggle('dark-mode')
	// Cambiar icono de boton
	const icon = document.querySelector('.pi')
	icon.classList.toggle('pi-moon')
	icon.classList.toggle('pi-sun')
}
</script>
<style scoped></style>
