<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../stores";
import FavoriteButton from "./FavoriteButton.vue";
import { toMoney } from "../helpers/locale";
import ProducerCard from "./ProducerCard.vue";
import { fromMeterToKm } from "../helpers/measureUnits";
import LoadingLg from "./LoadingLg.vue";
import ContactProducerButton from "./ContactProducerButton.vue";

const product = ref(null);
const route = useRoute();
const productId = route.params.id;

const productsStore = useProductsStore();

onMounted(async () => {
  product.value = await productsStore.findProduct(productId);
})
</script>
<template>
  <section v-if="!product" class="d-flex justify-content-center flex-column align-items-center mt-5">
    <LoadingLg />
    Carregando produto...
  </section>
  <section
    v-if="product" 
    id="product-details"
    class="py-3 container d-flex flex-column flex-grow-1 h-100"
  >
    <section
      id="product-details-header"
      class="d-flex w-100 justify-content-between align-items-center"
    >
      <span></span>
      <h1 class="justify-self-center">{{ product.name }}</h1>
      <FavoriteButton />
    </section>

    <section id="product-details-product">
      <p class="color-secondary overflow-dots text-center" v-if="product.categories">
        {{ product.categories.map((category) => category.name).join(', ') }}
      </p>
      <div class="product-details-img mb-sm-0 d-flex justify-content-center bg-light border-radius align-items-center w-100 ratio-16-9 overflow-hidden">
        <img class="w-100 img-fit border-radius" :src="product.image" alt="Imagem do produto" v-if="product.image" />
        <i class="bi bi-image icon-lg" v-if="!product.image"></i>
      </div>

      <p class="w-100 mb-3 mt-3 color-default">{{ product.description }}</p>

      <p class="color-primary w-100">
        {{ toMoney(product.price) || '' }}<span v-if="product.unit_of_price">/{{ product.unit_of_price }}</span>
      </p>
      
      <div class="border-radius bg-light p-3">
        <p class="mb-3 color-default d-flex" v-if="product.address">
          <i class="bi bi-geo"></i>
          <span class="ps-2">
            <span class="color-secondary mb-0" v-if="product.address && product.address.distance != null">
              {{ fromMeterToKm(product.address.distance) }} km de distância<br />
            </span>
            {{ product.address.address }}
          </span>
        </p>
        
        <p class="mb-0 color-default" v-if="product.availability && product.availability.length">
          <i class="bi bi-clock-history"></i>
          {{ product.availability.map((availability) => availability.label).join(', ') }}
        </p>
      </div>
    </section>

    <section id="product-producer" class="mt-3" v-if="product.producer">
      <h4 class="text-normal">Produzido por</h4>
      <router-link
        class="card-link"
        :to="`/producer/${product.producer.id}`"
      >
        <ProducerCard :producer="product.producer" />
      </router-link>
      <ContactProducerButton />
    </section>
  </section>
</template>