<template>
	<h1 class="text-center text-5xl mb-5">Reservas Museo</h1>
	<img src="@/assets/qr-code.png" alt="QR Code" class="w-1/2 mx-auto" />
	<div class="flex justify-center gap-4">
		<Button label="Guardar QR" icon="pi pi-download" size="small" />
		<Button label="Compartir" icon="pi pi-share-alt" size="small" />
	</div>
	<div class="text-center text-xl font-semibold my-4">Total: {{ 40 }} BOB.</div>
	<div class="flex flex-col gap-3 mt-10">
		<Toast />
		<FileUpload
			mode="basic"
			name="demo[]"
			url="/api/upload"
			accept="image/*"
			:maxFileSize="1000000"
			invalidFileSizeMessage="Tamaño de archivo excedido"
			invalidFileTypeMessage="Tipo de archivo no permitido"
			@upload="onUpload"
			:auto="true"
			chooseLabel="Subir comprobante"
			chooseIcon="pi pi-upload"
			:chooseButtonProps="{ size: 'large', severity: 'secondary' }"
			class="w-full"
		/>
		<Button
			label="Ya pagué"
			icon="pi pi-check"
			size="large"
			@click="registrarPago"
		/>
	</div>
</template>
<script setup>
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
const toast = useToast()
const router = useRouter()

const onUpload = () => {
	toast.add({
		severity: 'info',
		summary: 'Success',
		detail: 'File Uploaded',
		life: 3000,
	})
}

const registrarPago = () => {
	console.log('Pago registrado')
	router.push({ name: 'PagoRealizado' })
}
</script>
