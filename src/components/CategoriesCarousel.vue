<template>
  <section id="categories-list" class="mb-3">
    <div class="container px-2">
      <carousel
        :breakpoints="breakpoints"
        :snap-align="'start'"
        id="categories-carousel">
        <slide v-for="category,index in categories" :key="index" class="categories-carousel__slide px-1">
          <button class="btn button-secondary button-secondary--light categories-carousel__category">{{ category }}</button>
        </slide>

        <template #addons>
          <div class="d-flex mt-3 px-1 justify-content-center align-items-center">
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
      breakpoints: this.getBreakPoints(),
    }
  },

  methods: {
    getBreakPoints() {
      var breakpoints = []
      for(var i = 0; i < 3000; i += 20) {
        var itemsToShow = i/200
        breakpoints[i] = {
          itemsToShow: Math.floor(itemsToShow)
        }
      }

      return Object.assign({}, breakpoints)
    },
  }
}
</script>

<style lang="scss">
.categories-carousel__category {
  width: 100%;
}
</style>