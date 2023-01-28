<template>
  <section id="categories-list" class="mb-5">
    <div class="container px-2">
      <CategoriesCarousel :breakpoints="getBreakpoints()" />
    </div>
  </section>
</template>

<script setup>
import CategoriesCarousel from "./CategoriesCarousel.vue";

function getBreakpoints() {
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
