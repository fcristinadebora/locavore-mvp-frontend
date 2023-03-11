<script setup>
import ProductCard from "./ProductCard.vue";

const props = defineProps(['items']);
</script>

<template>
  <section id="search-products-items" class="row" v-if="props.items">
    <div
      class="search-item-wrapper col-lg-6"
      v-for="(product, index) in props.items"
      :key="index"
    >
      <ProductCard :product="product" />
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.search-product-item {
  text-decoration: none !important;
  color: $color-brand-primary-light;
  &:hover {
    color: $color-brand-primary-light;

    p,
    span {
      font-weight: bold;
    }
  }

  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    overflow: hidden;

    @media (max-width: 576px) {
      width: 100%;
      height: 250px;
      object-fit: cover;
      overflow: hidden;
    }

    @media (min-width: 576.1) and (max-width: 768px) {
      width: 200px;
      height: 200px;
      object-fit: cover;
      overflow: hidden;
    }
  }
}
</style>
