<script setup>
import { ref } from "vue";
import { useProductsStore } from "../stores";
import { toMoney } from "../helpers/locale";
import Pagination from "./Pagination.vue";

const products = ref([]);

const productsStore = useProductsStore();
products.value = productsStore.allProducts;
</script>

<template>
  <section id="search-products-title" class="mt-3">
    <h1 class="text-center fw-bold color-primary">
      Resultados em <span class="color-secondary fw-bold">Produtos</span>
    </h1>
  </section>
  <section id="search-products-items" class="row">
    <div
      class="search-item-wrapper col-lg-6"
      v-for="(product, index) in products"
      :key="index"
    >
      <router-link
        class="search-product-item p-3 my-3 cursor-pointer d-flex flex-column flex-sm-row bg-custom-light border-radius"
        :to="`/product/${product.id}`"
      >
        <div class="search-product-img mb-3 mb-sm-0">
          <img class="border-radius" :src="product.img" alt="" />
        </div>
        <div class="search-product-data ps-3">
          <h3 class="text-normal color-primary text-bold w-100 mb-0">
            {{ product.name }}
          </h3>
          <p class="text-sm color-secondary mb-2">{{ product.category }}</p>
          <p class="text-normal fw-bold mb-2">
            {{ toMoney(product.price)
            }}<span class="text-normal">/{{ product.priceUnit }}</span>
          </p>
          <p class="color-secondary mb-0">
            {{ product.distance }} de distância
          </p>
          <p class="mb-0">
            <i class="bi bi-geo"></i>
            {{ product.address }}<br />
          </p>
        </div>
      </router-link>
    </div>
  </section>
  <section
    id="search-products-pagination"
    class="d-flex justify-content-center mt-3"
  >
    <Pagination />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.search-product-item {
  text-decoration: none;
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
