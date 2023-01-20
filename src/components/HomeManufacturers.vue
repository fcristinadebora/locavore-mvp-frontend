<template>
  <section id="manufacturers" class="py-5 bg-custom-secondary">
    <div class="container px-2">
      <h2
        class="text-center text-bold font-size-lg color-primary manufacturers__title mb-3"
      >
        Produtores Populares
      </h2>

      <carousel
        :breakpoints="breakpoints"
        :snap-align="'start'"
        id="manufacturers-carousel"
        class="pt-3"
      >
        <slide
          v-for="(manufacturer, index) in manufacturers"
          :key="index"
          class="manufacturers__slide pb-3 px-1"
        >
          <article
            class="manufacturers__item border-radius bg-white flex-column justify-content-start align-items-center p-2"
          >
            <img
              class="manufacturers__item__img border-radius my-2"
              :src="manufacturer.img"
              alt=""
            />
            <h3 class="text-normal text-center color-primary text-bold">
              {{ manufacturer.name }}
            </h3>
            <p class="text-sm">{{ manufacturer.category }}</p>
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

<script setup>
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref } from "vue";

const manufacturers = ref([]);
const breakpoints = ref([]);

manufacturers.value = [
  {
    name: "Mistureba Vegana",
    img: "img/manufacturers/mistureba.png",
    category: "Veganos",
  },
  {
    name: "Cauana Minusculi Confeiraria Gourmet",
    img: "img/manufacturers/cau.png",
    category: "Artesanais",
  },
  {
    name: "Sitio Pema",
    img: "img/manufacturers/pema.png",
    category: "Orgânicos",
  },
  {
    name: "Mistureba Vegana",
    img: "img/manufacturers/mistureba.png",
    category: "Veganos",
  },
  {
    name: "Cauana Minusculi Confeiraria Gourmet",
    img: "img/manufacturers/cau.png",
    category: "Artesanais",
  },
  {
    name: "Sitio Pema",
    img: "img/manufacturers/pema.png",
    category: "Orgânicos",
  },
  {
    name: "Cauana Minusculi Confeiraria Gourmet",
    img: "img/manufacturers/cau.png",
    category: "Artesanais",
  },
  {
    name: "Sitio Pema",
    img: "img/manufacturers/pema.png",
    category: "Orgânicos",
  },
];

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
};
</script>

<style lang="scss">
.manufacturers__slide {
  flex-shrink: 1;
  flex-direction: column;
}

.manufacturers__item {
  width: 100%;
  flex: 1;

  &__img {
    height: 100px;
  }
}
</style>
