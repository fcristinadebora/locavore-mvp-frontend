<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { productsStore } from "../stores";
import FavoriteButton from "./FavoriteButton.vue";
import { toMoney } from "../helpers/locale";

const product = ref({});
const route = useRoute();
const productId = route.params.id;

const { findProduct } = productsStore();
product.value = findProduct(productId);
</script>
<template>
  <section
    id="product-details"
    class="py-3 container d-flex flex-column flex-grow-1 h-100"
  >
    <section
      id="product-details-header"
      class="d-flex w-100 justify-content-between align-items-center"
    >
      <a href="">
        <i class="bi bi-arrow-return-left"></i>
      </a>
      <h1>{{ product.name }}</h1>
      <FavoriteButton />
    </section>

    <section id="product-details-product">
      <img :src="product.img" alt="Product image" class="w-100 border-radius" />

      <div class="w-100 d-flex justify-content-between">
        <span class="color-secondary">
          {{ product.category }}
        </span>

        <span class="color-primary">
          {{ toMoney(product.price) }}
        </span>
      </div>

      <p class="w-100">{{ product.description }}</p>

      <p class="color-secondary mb-0">{{ product.distance }} de distância</p>

      <p class="mb-0">
        <i class="bi bi-geo"></i>
        {{ product.address }}<br />
      </p>

      <p class="mb-0">
        <i class="bi bi-clock-history"></i>
        {{ product.availability }}<br />
      </p>
    </section>
  </section>
</template>
