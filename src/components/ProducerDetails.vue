<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProducersStore } from "../stores";
import FavoriteButton from "./FavoriteButton.vue";
import { toMoney } from "../helpers/locale";
import LoadingLg from "./LoadingLg.vue";
import { fromMeterToKm } from "../helpers/measureUnits";

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

        <section id="producer-details-producer" class="mt-3">
            <div class="producer-details-img ratio-1-1 border-radius bg-light float-start me-3 mb-3">
                <img v-if="producer.image" :src="producer.image" alt="Producer image" class="border-radius" />
            </div>

            <span class="w-100">{{ producer.short_description }}</span>

            <p class="color-secondary mb-0" v-if="producer.distance">{{ producer.distance }} de distância</p>

            <p class="w-100">{{ producer.description }}</p>

            <span class="color-secondary mb-0" v-if="producer.address">
                {{ fromMeterToKm(producer.address.distance) }} km de distância
            </span>

            <div class="d-flex justify-content-between">
                <span class="color-secondary overflow-dots" v-if="producer.categories">
                    {{ producer.categories.map((category) => category.name).join(', ') }}
                </span>
            </div>

            <p class="mb-0" v-if="producer.address && producer.address.length">
                <i class="bi bi-geo"></i>
                {{ producer.address.address }}<br />
            </p>
        </section>
    </section>
</template>

<style lang="scss">
.producer-details-img {
    width: 180px;
    height: 180px;
    overflow: hidden;
    object-fit: cover;

    img {
        object-fit: cover;
        overflow: hidden;
    }

    @media (max-width: 576px) {
        width: 50%;
    }

    @media (min-width: 576.1) and (max-width: 768px) {
        width: 200px;
        height: 200px;
    }
}
</style>