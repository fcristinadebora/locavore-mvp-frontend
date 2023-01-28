<script setup>
import { ref } from "vue";
import { manufacturersStore } from "../stores";
import Pagination from "./Pagination.vue";

const manufacturers = ref([]);

const { allManufacturers } = manufacturersStore();
manufacturers.value = allManufacturers;
</script>

<template>
  <section id="search-manufacturers-title" class="mt-3">
    <h1 class="text-center fw-bold color-primary">
      Resultados em <span class="color-secondary fw-bold">Produtores</span>
    </h1>
  </section>
  <section id="search-manufacturers-items" class="row">
    <div
      class="search-item-wrapper col-lg-6"
      v-for="(manufacturer, index) in manufacturers"
      :key="index"
    >
      <router-link
        class="search-manufacturer-item p-3 my-3 cursor-pointer d-flex flex-column flex-sm-row bg-custom-light border-radius"
        :to="`/manufacturer/${manufacturer.id}`"
      >
        <div class="search-manufacturer-img mb-3 mb-sm-0">
          <img class="border-radius" :src="manufacturer.img" alt="" />
        </div>
        <div class="search-manufacturer-data ps-3">
          <h3 class="text-normal color-primary text-bold w-100 mb-0">
            {{ manufacturer.name }}
          </h3>
          <p class="text-sm color-secondary mb-2">
            {{ manufacturer.category }}
          </p>
          <p class="">
            {{ manufacturer.shortDescription }}
          </p>
          <p class="color-secondary mb-0">
            {{ manufacturer.distance }} de distância
          </p>
          <p class="mb-0">
            <i class="bi bi-geo"></i>
            {{ manufacturer.address }}<br />
          </p>
        </div>
      </router-link>
    </div>
  </section>
  <section
    id="search-manufacturers-pagination"
    class="d-flex justify-content-center mt-3"
  >
    <Pagination />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.search-manufacturer-item {
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
