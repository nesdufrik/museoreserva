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
		<ConfirmDialog>
			<template #message>
				<img v-if="src" :src="src" alt="Image" class="rounded-xl h-full w-64" />
			</template>
		</ConfirmDialog>
		<FileUpload
			mode="basic"
			name="demo"
			accept="image/*"
			:maxFileSize="350000"
			invalidFileSizeMessage="Tamaño de archivo excedido"
			invalidFileTypeMessage="Tipo de archivo no permitido"
			@select="onUpload"
			customUpload
			auto
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
			severity="success"
			:disabled="!pago.comprobante"
			:loading="loading"
		/>
	</div>
</template>
<script setup>
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useReserva } from '@/composables/useReserva'

const { pago, pagarReserva } = useReserva()

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const qrImage = ref(null)
const src = ref(null)
const loading = ref(false)

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

const onUpload = (event) => {
	const file = event.files[0]
	const reader = new FileReader()

	reader.onload = async (e) => {
		src.value = e.target.result
	}

	reader.readAsDataURL(file)

	confirm.require({
		message: 'Are you sure you want to proceed?',
		header: 'Comprobante de pago',
		icon: 'pi pi-exclamation-triangle',
		rejectProps: {
			label: 'Cancelar',
			severity: 'secondary',
			outlined: true,
		},
		acceptProps: {
			label: 'Correcto',
		},
		accept: () => {
			pago.value.comprobante = src.value

			toast.add({
				severity: 'info',
				summary: 'Confirmación',
				detail: 'Comprobante listo para ser enviado',
				life: 3000,
			})
		},
		reject: () => {
			toast.add({
				severity: 'error',
				summary: 'Rejected',
				detail: 'You have rejected',
				life: 3000,
			})
		},
	})
}

const registrarPago = async () => {
	loading.value = true
	await pagarReserva()
	loading.value = false
	// router.push({ name: 'PagoRealizado' })
}
</script>
