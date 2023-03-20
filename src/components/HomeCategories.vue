<script setup>
import { useRouter } from "vue-router";
import CategoriesCarousel from "./CategoriesCarousel.vue";

const router = useRouter();

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

function handleCategoryClicked (data) {
  router.push(`/search/result?categories=${data.category.id}`)
}
</script>

<template>
  <section id="categories-list" class="mb-5">
    <div class="container px-2">
      <CategoriesCarousel :breakpoints="getBreakpoints()" @category-clicked="handleCategoryClicked" />
    </div>
  </section>
</template>

<style lang="scss">
.categories-carousel__category {
  width: 100%;
}
</style>