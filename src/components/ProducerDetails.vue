<script setup>
import { ref, onMounted } from "vue";
import {
    CONTACT_TYPE_WHATSAPP,
    CONTACT_TYPE_PHONE,
    CONTACT_TYPE_EMAIL,
    CONTACT_TYPE_INSTAGRAM,
    getContactHref
} from '../helpers/contacts.js';
import { PRODUCER } from "../enum/general";
import { useRoute } from "vue-router";
import { useProducersStore, useProductsStore } from "../stores";
import FavoriteButton from "./FavoriteButton.vue";
import LoadingLg from "./LoadingLg.vue";
import { fromMeterToKm } from "../helpers/measureUnits";
import ContactProducerButton from "./ContactProducerButton.vue";
import ProductCardsCarousel from "./ProductCardsCarousel.vue";
import ItemReviews from "./ItemReviews.vue";

const producer = ref(null);
const products = ref(null);
const route = useRoute();
const producerId = route.params.id;

const producersStore = useProducersStore();
const productsStore = useProductsStore();

onMounted(() => {
    fetchProducer();
    fetchProducts();
})

async function fetchProducer () {
    producer.value = await producersStore.findProducer(producerId);
}

async function fetchProducts () {
    const result = await productsStore.listProductsByProducer(producerId, 10, 0)
    products.value = result.data;
}
</script>

<template>
    <section v-if="!producer" class="d-flex justify-content-center flex-column align-items-center mt-5">
        <LoadingLg />
        Carregando produtor...
    </section>
    <section v-if="producer" id="producer-details" class="py-3 container d-flex flex-column flex-grow-1 h-100">
        <section id="producer-details-header" class="d-flex w-100 justify-content-between align-items-top">
            <span></span>
            <h1 class="justify-self-center text-center">{{ producer.name }}</h1>
            <FavoriteButton :type="PRODUCER" :item-id="producer.id" />
        </section>

        <section id="producer-details-header" class="mt-0">
            <p class="color-secondary text-center mb-3" v-if="producer.categories">
                {{ producer.categories.map((category) => category.name).join(', ') }}
            </p>
            <div class="producer-details-img ratio-1-1 border-radius bg-light float-start me-3 mb-3">
                <img v-if="producer.profile_picture" :src="producer.profile_picture" alt="Producer image" class="border-radius" />
            </div>

            <p class="w-100 color-default">{{ producer.short_description }}</p>
            
            <p class="mb-3 color-primary text-bold" v-if="producer.address && producer.address.distance != undefined">
                <i class="bi bi-geo me-2"></i>
                {{ fromMeterToKm(producer.address.distance) }} km de distância
            </p>

            <span v-if="producer.longDescription">
                <h4 class="text-normal">Sobre o produtor</h4>
                <p class="w-100 color-default mb-3">{{ producer.longDescription }}</p>
            </span>
        </section>

        <section id="producer-details-contacts">
            <h4 class="text-normal">Endereço e contatos</h4>
            <div class="border-radius bg-light p-3 mt-3">
                <p class="mb-3 color-default" v-if="producer.address">
                    <i class="bi bi-geo"></i>
                    {{ producer.address.address }}
                </p>
                <p class="mb-3 color-default" v-for="(contact, index) in producer.contacts" :key="index">
                    <i class="bi bi-instagram" v-if="contact.type == CONTACT_TYPE_INSTAGRAM"></i>
                    <i class="bi bi-whatsapp" v-if="contact.type == CONTACT_TYPE_WHATSAPP"></i>
                    <i class="bi bi-telephone" v-if="contact.type == CONTACT_TYPE_PHONE"></i>
                    <i class="bi bi-envelope-at" v-if="contact.type == CONTACT_TYPE_EMAIL"></i>
                    <a :href="getContactHref(contact.type, contact.value)" target="_blank" class="color-secondary ms-2">{{ contact.value }}</a>
                </p>
            </div>

            <ContactProducerButton />
        </section>
        <section id="producer-details-products" v-if="products">
            <h4 class="mt-5">Produtos</h4>
            <ProductCardsCarousel :products="products" />
            <router-link to="/" class="btn button-secondary w-100 mt-3">Ver mais produtos</router-link>
        </section>
        <section id="producer-ratings">
            <ItemReviews :average-rate="producer.average_review" :type="PRODUCER" :item-id="producer.id" />
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
        width: 180px;
        height: 180px;
    }

    @media (max-width: 576px) {
        max-width: 180px;
        width: 50%;
    }

    @media (min-width: 576.1) and (max-width: 768px) {
        width: 200px;
        height: 200px;
    }
}
</style>