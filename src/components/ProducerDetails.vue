<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProducersStore } from "../stores";
import FavoriteButton from "./FavoriteButton.vue";
import { toMoney } from "../helpers/locale";
import LoadingLg from "./LoadingLg.vue";

const producer = ref({});
const route = useRoute();
const producerId = route.params.id;

const producersStore = useProducersStore();

onMounted(async () => {
    producer.value = await producersStore.findProducer(producerId);
})
</script>

<template>
    <section v-if="!producer" class="d-flex justify-content-center flex-column align-items-center mt-5">
        <LoadingLg />
        Carregando produtor...
    </section>
    <section v-if="producer" id="producer-details" class="py-3 container d-flex flex-column flex-grow-1 h-100">
        <section id="producer-details-header" class="d-flex w-100 justify-content-between align-items-center">
            <span></span>
            <h1 class="justify-self-center">{{ producer.name }}</h1>
            <FavoriteButton />
        </section>

        <section id="producer-details-producer">
            <img v-if="producer.image" :src="producer.image" alt="Producer image" class="w-100 border-radius" />

            <div class="w-100 d-flex justify-content-between">
                <span class="color-secondary overflow-dots" v-if="producer.categories">
                    {{ producer.categories.map((category) => category.name).join(', ') }}
                </span>
            </div>

            <p class="w-100">{{ producer.description }}</p>

            <p class="color-secondary mb-0" v-if="producer.distance">{{ producer.distance }} de distância</p>

            <p class="mb-0" v-if="producer.address && producer.address.length">
                <i class="bi bi-geo"></i>
                {{ producer.address.address }}<br />
            </p>
        </section>
    </section>
</template>
