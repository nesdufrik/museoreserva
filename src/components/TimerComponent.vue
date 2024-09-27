<template>
	<div v-if="timerVisible" class="fixed left-4 md:left-10 top-12">
		<div
			class="w-20 h-20 rounded-full bg-[color:red] flex flex-col items-center justify-center"
		>
			<span class="text-white text-lg font-bold">{{ formattedTime }}</span>
			<small class="text-xs text-center">Tiempo restante</small>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
	timerVisible: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits(['timerFinished'])

const timeLeft = ref(1 * 60) // 5 minutos en segundos
const desactivar = ref(false)

const formattedTime = computed(() => {
	const minutes = Math.floor(timeLeft.value / 60)
	const seconds = timeLeft.value % 60
	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`
})

const startTimer = () => {
	const timer = setInterval(() => {
		if (timeLeft.value > 0) {
			timeLeft.value--
		} else {
			clearInterval(timer)
			desactivar.value = true
			emit('timerFinished')
		}
	}, 1000)
}

watch(
	() => props.timerVisible,
	(newValue) => {
		if (newValue) {
			startTimer()
		}
	}
)

onMounted(() => {
	if (props.timerVisible) {
		startTimer()
	}
})
</script>
