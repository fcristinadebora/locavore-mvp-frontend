<template>
  <section id="categories-carousel" class="mb-3">
    <div class="container">
      <carousel :breakpoints="breakpoints" :snap-align="'start'">
        <slide v-for="category,index in categories" :key="index" >
          <button class="btn button-secondary button-secondary--light categories-carousel__category">{{ category }}</button>
        </slide>
  
        <template #addons>
          <navigation />
          <pagination />
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
  
  data () {
    return {
      categories: [
        'Orgânicos',
        'Caseiros',
        'Artesanais',
        'Sem gluten',
        'Sem lactose',
        'Coloniais',
        'Orgânicos',
        'Caseiros',
        'Artesanais',
        'Sem gluten',
        'Sem lactose',
        'Coloniais'
      ],
      breakpoints: {
        100: {
          itemsToShow: 2.1
        },
        500: {
          itemsToShow: 3
        },
        650: {
          itemsToShow: 3.2
        },
        800: {
          itemsToShow: 4.5
        },
        950: {
          itemsToShow: 5
        },
        1024: {
          itemsToShow: 5.5
        },
        1200: {
          itemsToShow: 6
        },
        1300: {
          itemsToShow: 6.5
        },
      },
    }
  }
}
</script>

<style lang="scss">
.categories-carousel__category {
  width: 150px;
}
</style>