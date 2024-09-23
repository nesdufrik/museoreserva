<template>
	<h1 class="text-center text-2xl font-bold">PAGO DE RESERVA</h1>
	<img
		ref="qrImage"
		src="@/assets/qr-code.jpg"
		alt="QR Code"
		class="w-3/4 md:w-1/2 mx-auto my-3"
	/>
	<div class="flex justify-center gap-4">
		<Button
			label="Guardar QR"
			icon="pi pi-download"
			size="small"
			@click="guardarQr"
			severity="secondary"
		/>
		<Button
			label="Compartir"
			icon="pi pi-share-alt"
			size="small"
			@click="compartirQr"
			severity="secondary"
		/>
	</div>
	<div class="text-center text-xl font-semibold my-4">
		Total: {{ pago.total }} BOB.
	</div>
	<div class="flex flex-col gap-3 mt-10">
		<Toast position="top-center" :pt="{ root: 'w-11/12' }" />
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
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useReserva } from '@/composables/useReserva'

const { pago } = useReserva()
const toast = useToast()
const router = useRouter()
const qrImage = ref(null)

const guardarQr = async () => {
	try {
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		canvas.width = qrImage.value.width
		canvas.height = qrImage.value.height
		ctx.drawImage(qrImage.value, 0, 0, canvas.width, canvas.height)

		const dataUrl = canvas.toDataURL('image/jpg')
		const link = document.createElement('a')
		link.href = dataUrl
		link.download = 'qr-code.jpg'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		toast.add({
			severity: 'success',
			summary: 'Éxito',
			detail: 'Imagen QR guardada en descargas',
			life: 3000,
		})
	} catch (error) {
		console.error('Error al guardar la imagen:', error)
		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: 'No se pudo guardar la imagen QR',
			life: 3000,
		})
	}
}

const compartirQr = async () => {
	if (navigator.share) {
		try {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			canvas.width = qrImage.value.width
			canvas.height = qrImage.value.height
			ctx.drawImage(qrImage.value, 0, 0, canvas.width, canvas.height)

			const blob = await new Promise((resolve) =>
				canvas.toBlob(resolve, 'image/png')
			)
			const file = new File([blob], 'qr-code.png', { type: 'image/png' })

			await navigator.share({
				files: [file],
			})

			toast.add({
				severity: 'success',
				summary: 'Éxito',
				detail: 'Imagen QR compartida',
				life: 3000,
			})
		} catch (error) {
			console.error('Error al compartir:', error)
			if (error.name === 'AbortError') {
				toast.add({
					severity: 'info',
					summary: 'Información',
					detail: 'Compartir cancelado',
					life: 3000,
				})
			} else {
				toast.add({
					severity: 'error',
					summary: 'Error',
					detail: 'No se pudo compartir la imagen QR',
					life: 3000,
				})
			}
		}
	} else {
		toast.add({
			severity: 'warn',
			summary: 'Aviso',
			detail: 'No se pudo compartir. Por favor, guarda la imagen manualmente.',
			life: 3000,
		})
	}
}

const onUpload = () => {
	toast.add({
		severity: 'info',
		summary: 'Success',
		detail: 'File Uploaded',
		life: 3000,
	})
}

const registrarPago = () => {
	router.push({ name: 'PagoRealizado' })
}
</script>
