<script setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import ProductCard from "./ProductCard.vue";

const props = defineProps(['products']);

</script>

<template>
    <carousel
    :snap-align="'start'"
    v-if="props.products"
    id="products-carousel"
  >
    <slide
      v-for="(product, index) in props.products"
      class="p-0"
      :key="index"
    >
      <ProductCard class="w-100" :product="product" />
    </slide>

    <template #addons>
      <div class="d-flex mt-2 px-1 justify-content-center align-items-center">
        <navigation />
        <pagination />
      </div>
    </template>
  </carousel>
</template>