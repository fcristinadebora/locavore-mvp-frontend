<script setup>
import { toMoney } from "../helpers/locale";
import { fromMeterToKm } from "../helpers/measureUnits";
import LoadingLg from "./LoadingLg.vue";

const props = defineProps(['items', 'loading']);
</script>

<template>
  <section id="search-products-title" class="mt-3">
    <h1 class="text-center fw-bold color-primary">
      Resultados em <span class="color-secondary fw-bold">Produtos</span>
    </h1>
  </section>
  <section class="d-flex flex-column align-items-center pt-3" v-if="props.loading">
    <LoadingLg />
    Carregando resultados...
  </section>
  <section class="d-flex flex-column align-items-center pt-3" v-if="!props.loading && !props.items.length">
    <i class="bi bi-window icon-lg"></i>
    Nenhum resultado encontrado com esses filtros :(
  </section>
  <section id="search-products-items" class="row" v-if="!props.loading && props.items.length">
    <div
      class="search-item-wrapper col-lg-6"
      v-for="(product, index) in props.items"
      :key="index"
    >
      <router-link
        class="card-link"
        :to="`/product/${product.id}`"
      >
      <article class="search-product-item p-3 my-3 cursor-pointer d-flex flex-column flex-sm-row bg-light border-radius">
        <div class="search-product-img mb-3 mb-sm-0 d-flex justify-content-center align-items-center search-item-image-placeholder">
          <img class="border-radius" :src="product.image" alt="Imagem do produto" v-if="product.image" />
          <i class="bi bi-image icon-lg" v-if="!product.image"></i>
        </div>
        <div class="search-product-data ps-3 color-default">
          <h3 class="text-normal color-primary text-bold w-100 mb-0">
            {{ product.name }}
          </h3>
          <p class="text-sm color-secondary mb-2">{{ product.category }}</p>
          <p class="text-normal fw-bold mb-2">
            {{ toMoney(product.price) }}<span class="text-normal"><span v-if="product.priceUnit">/{{ product.priceUnit }}</span></span>
          </p>
          <p class="color-secondary mb-0">
            {{ fromMeterToKm(product.address.distance) }} km de distância
          </p>
          <p class="mb-0">
            <i class="bi bi-geo"></i>
            {{ product.address.address }}<br />
          </p>
        </div>
      </article>
      </router-link>
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
