<template>
  <section id="testimonials" class="py-5 bg-custom-secondary-light">
    <div class="container px-2">
      <h2 class="text-center text-bold font-size-lg color-primary testimonials__title mb-3">
        Depoimentos
      </h2>
    
      <carousel
          :items-to-show="1"
          :snap-align="'start'"
          id="testimonials-carousel"
          class="pt-3">
          <slide v-for="testimonial,index in testimonials" :key="index"
            class="testimonials__slide pb-3 px-1">
            <article class="testimonials__item
                flex-column
                justify-content-start
                align-items-center
                p-2">
                <div class="testimonials__item__content bg-white border-radius pb-2">
                  <span class="testimonials__item__img border-radius mb-2 d-inline-block" :style="{ 'background-image': 'url(' + testimonial.img + ')' }" alt=""></span>
                  <h3 class="text-normal text-center color-primary text-bold">{{ testimonial.name }}</h3>
                  <p class="text-sm">{{ testimonial.category }}</p>
                  <p>{{ testimonial.testimonial }}</p>
                </div>
              </article>
          </slide>
    
          <template #addons>
            <div class="d-flex mt-3 justify-content-center align-items-center px-1">
              <navigation />
              <pagination />
            </div>
          </template>
        </carousel>
      </div>
  </section>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  data() {
    return {
      testimonials: [
        {
          name: 'João da Silva',
          img: 'img/testimonials/testimonials1.jpg',
          category: 'Produtor de Orgânicos',
          testimonial: 'Desde que entrei para o Locavore, o número de vendas mensais aumentou imenso! Não jogo fora mais nenhum produto pois consigo vender todos a tempo!'
        },
        {
          name: 'Lorem Almeida',
          img: 'img/testimonials/testimonial2.jpg',
          category: 'Cozinheira Artesanal',
          testimonial: 'Desde que entrei para o Locavore, o número de vendas mensais aumentou imenso! Não jogo fora mais nenhum produto pois consigo vender todos a tempo!'
        }
      ],
    }
  },
}
</script>

<style lang="scss">
.testimonials__slide {
  flex-shrink: 1;
  flex-direction: column;
}
.testimonials__item {
  width: 100%;
  flex: 1;

  &__img{
    height: 100px;
    width: 100px;
    margin-top: -50px;
    background-size: cover;
  }

  &__content {
    margin-top: 50px;
  }
}
</style>