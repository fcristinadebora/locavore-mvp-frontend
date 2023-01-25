<template>
  <section id="categories-list" class="mb-5">
    <div class="container px-2">
      <carousel
        :breakpoints="breakpoints"
        :snap-align="'start'"
        id="categories-carousel"
      >
        <slide
          v-for="(category, index) in categories"
          :key="index"
          class="categories-carousel__slide px-1"
        >
          <button
            class="btn button-secondary button-secondary--light categories-carousel__category"
          >
            {{ category }}
          </button>
        </slide>

        <template #addons>
          <div
            class="d-flex mt-3 px-1 justify-content-center align-items-center"
          >
            <navigation />
            <pagination />
          </div>
        </template>
      </carousel>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { categoriesStore } from "../stores";

const categories = ref([]);
const breakpoints = ref([]);

const { allCategories } = categoriesStore();
categories.value = allCategories;

breakpoints.value = getBreakPoints();

function getBreakPoints() {
  var breakpoints = [];
  for (var i = 0; i < 3000; i += 20) {
    var itemsToShow = i / 250;
    breakpoints[i] = {
      itemsToShow: Math.floor(itemsToShow),
    };
  }

  return Object.assign({}, breakpoints);
}
</script>

<style lang="scss">
.categories-carousel__category {
  width: 100%;
}
</style>
