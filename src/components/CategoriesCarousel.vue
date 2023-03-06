<script setup>
import { ref, computed } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useCategoriesStore } from "../stores";

const props = defineProps([
  "itemClass",
  "wrapperClass",
  "breakpoints",
  "activeItems",
]);
const breakpoints = ref([]);
const itemClass = ref("button-secondary--light");
const itemActiveClass = ref("button-secondary");

breakpoints.value = props.breakpoints ?? getBreakPoints();
itemClass.value = props.itemClass ?? itemClass.value;
itemActiveClass.value = props.itemActiveClass ?? itemActiveClass.value;

const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.allCategories);

const activeItems = computed(() => {
  return props.activeItems ?? [];
});

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

function isActive(categoryId) {
  return activeItems.value.includes(categoryId);
}
</script>

<template>
  <carousel
    :breakpoints="breakpoints"
    :snap-align="'start'"
    v-if="categories"
    id="categories-carousel"
  >
    <slide
      v-for="(category, index) in categories"
      :key="index"
      class="categories-carousel__slide px-1"
    >
      <button
        class="btn categories-carousel__category"
        @click="$emit('categoryClicked', { category })"
        :class="isActive(category.id) ? itemActiveClass : itemClass"
      >
        {{ category.name }}
      </button>
    </slide>

    <template #addons>
      <div class="d-flex mt-3 px-1 justify-content-center align-items-center">
        <navigation />
        <pagination />
      </div>
    </template>
  </carousel>
</template>

<style lang="scss">
.categories-carousel__category {
  width: 100%;
}
</style>
