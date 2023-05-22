<script setup>
import InputSearchLocation from "./InputSearchLocation.vue";
import FormSubmitButton from "./FormSubmitButton.vue";
import { ref, onMounted, watch } from "vue";
import { useAccountStore, useAuthStore, useCitiesStore } from "../stores";
import Map from "./Map.vue";

const emits = defineEmits(['success']);
const props = defineProps(['submitButtonText'])

const authStore = useAuthStore();
const accountStore = useAccountStore();
const citiesStore = useCitiesStore();
const selectedLocation = ref(null);
const selectedCoordinates = ref(null);

const form = ref({
    loading: false,
    errors: {},
    data: {
        city_id: null,
        lat: null,
        lng: null,
        address: null
    }
});

onMounted(() => {
    fetchCurrentData();
})

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function fetchCurrentData() {
    const producer = await accountStore.getCurrentProducer({ include: 'address' });

    if (producer.data?.address) {
        form.value.data.address = producer.data?.address?.address;
        form.value.data.city_id = producer.data?.address?.city_id;
        form.value.data.lat = producer.data?.address?.location?.coordinates[1];
        form.value.data.lng = producer.data?.address?.location?.coordinates[0];
        selectedLocation.value = await citiesStore.findCity(form.value.data.city_id)
        selectedCoordinates.value = {
            lat: form.value.data.lat,
            lng: form.value.data.lng
        }
    }
}

async function handleSubmit() {
    let hasError = false;
    if (!selectedCoordinates.value) {
        form.value.errors.location = true;
        hasError = true;
    }
    if (!selectedLocation.value) {
        form.value.errors.city = true;
        hasError = true;
    }
    if (!form.value.data.address) {
        form.value.errors.address = true;
        hasError = true;
    }

    if (hasError) {
        return;
    }

    form.value.loading = true;

    try {
        await accountStore.updateProducerAddress({ ...form.value.data });
        emits('success');
    } catch (e) {
        console.error(e)
    } finally {
        form.value.loading = false;
    }
}

function handleOnSelectLocation(location) {
    selectedLocation.value = location;
    selectedCoordinates.value = {
        lat: location.location.coordinates[1],
        lng: location.location.coordinates[0]
    }

    form.value.data.city_id = location.id;
    form.value.data.lat = selectedCoordinates.value.lat;
    form.value.data.lng = selectedCoordinates.value.lng;
}

function handleMainMarkerMoved(newPosition) {
    selectedCoordinates.value = { ...newPosition };
    form.value.data.lat = selectedCoordinates.value.lat;
    form.value.data.lng = selectedCoordinates.value.lng;
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <section id="quiz-long-description">
            <section>
                <p class="w-100 text-muted text-center mb-3">
                    Está na etapa 7 de 6
                </p>
                <h1 class="color-primary fw-bold text-center">Endereço</h1>
            </section>
            <section id="quiz-long-description-form" class="my-3">
                <div class="mb-2">
                    <label class="w-100 text-bold">Cidade:</label>
                    <InputSearchLocation @location-selected="handleOnSelectLocation"
                        :selected-location="selectedLocation" />
                    <label v-if="form.errors.location" class="text-danger">Preenchimento obrigatório</label>
                </div>
                <div class="mb-2">
                    <label class="w-100 text-bold">Endreço completo:</label>
                    <textarea v-model="form.data.address" id="short-description" class="form-control w-100 resize-none"
                        rows="3" maxlength="100" placeholder="Digite aqui"></textarea>
                    <label v-if="form.errors.address" class="text-danger">Preenchimento obrigatório</label>
                </div>
                <div class="form-group mb-2" v-if="selectedCoordinates">
                    <label class="w-100 text-bold">Confirmar localização: </label>
                    <p class="text-sm">Segure e arraste o marcador ou clique em um ponto para definir o ponto de referência
                        para as buscas</p>
                    <Map class="search-modal-map-container" :center="selectedCoordinates" :recenterable="true"
                        @main-marker-moved="handleMainMarkerMoved" />
                    <label v-if="form.errors.coordinates" class="text-danger">Preenchimento obrigatório</label>
                </div>
            </section>
            <FormSubmitButton class="button-primary mt-3 mb-5 w-100" :disabled="form.loading" :label="props.submitButtonText ?? 'Salvar'" />
        </section>
    </form>
</template>
