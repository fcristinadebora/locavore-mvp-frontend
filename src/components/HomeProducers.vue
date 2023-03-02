<script setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref } from "vue";
import { useProducersStore } from "../stores";

const producers = ref([]);
const breakpoints = ref([]);

const { allproducers } = useProducersStore();
producers.value = allproducers;
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

<template>
  <section id="producers" class="py-5 bg-custom-secondary">
    <div class="container px-2">
      <h2
        class="text-center text-bold font-size-lg color-primary producers__title mb-3"
      >
        Produtores Populares
      </h2>

      <carousel
        :breakpoints="breakpoints"
        :snap-align="'start'"
        id="producers-carousel"
        class="pt-3"
      >
        <slide
          v-for="(producer, index) in producers"
          :key="index"
          class="producers__slide pb-3 px-1"
        >
          <article
            class="producers__item border-radius bg-white flex-column justify-content-start align-items-center p-2"
          >
            <img
              class="producers__item__img border-radius my-2"
              :src="producer.img"
              alt=""
            />
            <h3 class="text-normal text-center color-primary text-bold">
              {{ producer.name }}
            </h3>
            <p class="text-sm">{{ producer.category }}</p>
          </article>
        </slide>

        <template #addons>
          <div
            class="d-flex mt-3 justify-content-center align-items-center px-1"
          >
            <navigation />
            <pagination />
          </div>
        </template>
      </carousel>

      <div class="px-1 mt-3">
        <a href="#" class="btn button-primary col-12">Ver mais produtores</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.producers__slide {
  flex-shrink: 1;
  flex-direction: column;
}

.producers__item {
  width: 100%;
  flex: 1;

  &__img {
    height: 100px;
  }
}
</style>
