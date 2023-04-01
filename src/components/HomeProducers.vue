<script setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref, onMounted } from "vue";
import { useProducersStore } from "../stores";
import FiveStars from "./FiveStars.vue";

const producers = ref([]);
const breakpoints = ref([]);

const producersStore = useProducersStore();
breakpoints.value = getBreakPoints();

onMounted(() => {
  fetchItems();
})

async function fetchItems () {
  const data = await producersStore.bestRated();
  
  producers.value = data.data;
}

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
          <router-link :to="`/producer/${producer.id}`" class="card-link d-flex flex-grow-1 w-100">
          <article
            class="producers__item border-radius bg-white d-flex flex-column justify-content-between align-items-center py-2 px-3"
          >
            <div class="d-flex justify-content-start flex-column">
              <img
                class="producers__item__img border-radius my-2  ratio-16-9 max-w-100"
                :src="producer.profile_picture"
                v-if="producer.profile_picture"
                alt=""
              />
              <div class="ratio-16-9 bg-light w-100 border-radius" v-if="!producer.profile_picture">
                <i class="bi bi-image icon-lg"></i>
              </div>
              <h3 class="text-normal text-center color-primary text-bold">
                {{ producer.name }}
              </h3>
            </div>
            
            <p class="color-primary d-flex">
              <FiveStars :rate="producer.average_review ?? 0" /> {{ producer.average_review ? producer.average_review.toFixed(1) : '' }}
            </p>
          </article>
        </router-link>
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
        <router-link to="/search/result?type=producer" href="#" class="btn button-primary col-12">Encontrar produtores</router-link>
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
