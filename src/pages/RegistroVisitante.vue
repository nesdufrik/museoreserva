<template>
	<h2 class="text-center text-2xl font-bold mb-3">DATOS DEL VISITANTE</h2>
	<div class="card flex flex-col mb-10">
		<div class="text-center">{{ format(horario.fecha, 'long', 'es') }}</div>
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
				<div class="flex w-1/2 items-end justify-between text-xl flex-col">
					<div class="flex flex-col items-end">
						<span class="font-bold">HORARIO</span>
						<span>{{ `${horario.inicioEvento} - ${horario.finEvento}` }}</span>
					</div>
					<div class="flex flex-col items-end">
						<span class="font-bold">CUPOS</span>
						<span>{{ cuposRestantes }}</span>
					</div>
					<div class="flex flex-col items-end">
						<span class="font-bold">TOTAL</span>
						<span>{{ precioTotal }} BOB</span>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label for="nombre-cliente">Nombre completo</label>
				<InputText
					class="uppercase"
					type="text"
					id="nombre-cliente"
					v-model="visitante.nombre"
					:invalid="visitante.nombre === '' && invalid"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="correo-cliente">Correo electrónico</label>
				<InputText
					class="lowercase"
					type="email"
					id="correo-cliente"
					v-model="visitante.email"
					:invalid="visitante.email === '' && invalid"
				/>
			</div>
			<div clas="flex-auto">
				<label for="lugar-cliente" class="font-bold block mb-2"
					>Desde donde nos visitas</label
				>
				<InputGroup>
					<Select
						v-model="searchCountry.country"
						:options="countries"
						optionLabel="country"
						placeholder="🌎"
						class="w-2/5"
						v-on:update:model-value="loadStates(searchCountry.country.code)"
					>
						<template #value="slotProps">
							<div v-if="slotProps.value" class="flex items-center">
								<div>
									{{ `${slotProps.value.country}` }}
								</div>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
						<template #option="slotProps">
							<div class="flex items-center">
								<div>
									{{ slotProps.option.country }}
								</div>
							</div>
						</template>
					</Select>
					<Select
						v-model="searchCountry.state"
						:disabled="searchCountry.country === null || states.length === 0"
						:loading="loadingState"
						:options="states"
						optionLabel="country"
						placeholder="Seleccione..."
						class="w-2/5"
						v-on:update:model-value="loadCities(searchCountry.state.id)"
					>
						<template #value="slotProps">
							<div v-if="slotProps.value" class="flex items-center">
								<div>
									{{ `${slotProps.value.name}` }}
								</div>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
						<template #option="slotProps">
							<div class="flex items-center">
								<div>
									{{ slotProps.option.name }}
								</div>
							</div>
						</template>
					</Select>
					<Select
						v-model="searchCountry.cytie"
						:disabled="searchCountry.state === null || cities.length === 0"
						:options="cities"
						:loading="loadingCity"
						optionLabel="country"
						placeholder="Seleccione..."
						class="w-2/5"
					>
						<template #value="slotProps">
							<div v-if="slotProps.value" class="flex items-center">
								<div>
									{{ `${slotProps.value.name}` }}
								</div>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
						<template #option="slotProps">
							<div class="flex items-center">
								<div>
									{{ slotProps.option.name }}
								</div>
							</div>
						</template>
					</Select>
				</InputGroup>
			</div>
			<div class="flex-auto">
				<label for="numero-cliente" class="font-bold block mb-2"
					>Número de teléfono</label
				>
				<InputGroup>
					<Select
						v-model="selectedCountry"
						:options="countries"
						optionLabel="country"
						placeholder="🌎"
						class="w-2/5"
					>
						<template #value="slotProps">
							<div v-if="slotProps.value" class="flex items-center">
								<img
									:alt="slotProps.value.country"
									:src="slotProps.value.flag"
									:class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
									style="width: 18px"
								/>
								<div>
									{{ `(+${slotProps.value.countryCode})` }}
								</div>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
						<template #option="slotProps">
							<div class="flex items-center">
								<img
									:alt="slotProps.option.label"
									:src="slotProps.option.flag"
									:class="`mr-2`"
									style="width: 18px"
								/>
								<div>
									{{ slotProps.option.country }} (+
									{{ slotProps.option.countryCode }})
								</div>
							</div>
						</template>
					</Select>
					<InputNumber
						v-model="numero"
						:invalid="numero === null && invalid"
						inputId="numero-cliente"
						:useGrouping="false"
						class="w-auto"
					/>
				</InputGroup>
			</div>
			<Button
				label="Registrar"
				icon="pi pi-calendar"
				size="large"
				:loading="loading"
				:disabled="loading"
				@click="registrarReserva"
			/>
		</form>
	</div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { format } from '@formkit/tempo'
import { useReserva } from '@/composables/useReserva'
import { useEvento } from '@/composables/useEvento'
import countries from '@/data/countries.json'
import { useToast } from 'primevue/usetoast'

const {
	visitante,
	pago,
	horario,
	reserva,
	prereservar,
	getEstados,
	getCiudades,
} = useReserva()
const { evento } = useEvento()

const router = useRouter()
const toast = useToast()

const selectedCountry = ref({
	country: 'Bolivia',
	countryCode: 591,
	code: 'BO',
	flag: 'https://flagcdn.com/bo.svg',
	emoji: '🇧🇴',
	latinAmerica: true,
	phoneLength: 9,
})

const searchCountry = reactive({
	country: null,
	state: null,
	cytie: null,
})

const states = ref([])
const cities = ref([])
const numero = ref(null)
const loading = ref(false)
const invalid = ref(false)
const loadingState = ref(false)
const loadingCity = ref(false)

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

const registrarReserva = async () => {
	if (
		visitante.value.nombre === '' ||
		visitante.value.email === '' ||
		numero.value === null
	) {
		invalid.value = true
		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: 'Por favor, llene todos los campos',
			life: 3000,
		})
		return
	}

	invalid.value = false
	loading.value = true
	visitante.value.telefono = `${selectedCountry.value.countryCode}${numero.value}`
	reserva.value.cantidadTotal = reserva.value.cantidad.reduce(
		(acc, curr) => acc + curr.cantidad,
		0
	)
	pago.value.total = precioTotal.value
	const exito = await prereservar()
	loading.value = false
	if (exito.success) {
		router.push({ name: 'PagoVisitante' })
		return
	}
	toast.add({
		severity: 'error',
		summary: 'Error',
		detail: exito.message,
		life: 3000,
	})
}
const loadStates = async (country) => {
	cities.value = []
	states.value = []
	searchCountry.state = null
	searchCountry.cytie = null
	loadingState.value = true
	states.value = await getEstados(country)
	loadingState.value = false
}
const loadCities = async (state) => {
	cities.value = []
	searchCountry.cytie = null
	loadingCity.value = true
	cities.value = await getCiudades(state)
	loadingCity.value = false
}
</script>
