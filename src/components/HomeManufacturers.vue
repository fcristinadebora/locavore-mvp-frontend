<template>
  <section id="manufacturers" class="py-5 my-5 bg-custom-secondary">
    <div class="container">
      <h2 class="text-center text-bold font-size-lg color-primary manufacturers__title mb-3">Produtores Populares</h2>
    
        <carousel :breakpoints="breakpoints" :snap-align="'start'" class="col-12 pt-3">
          <slide v-for="manufacturer,index in manufacturers" :key="index" class="manufacturers__slide pb-3">
            <article class="manufacturers__item
                border-radius
                bg-white
                flex-column
                justify-content-start
                align-items-center
                p-2">
                <img class="manufacturers__item__img border-radius my-2" :src="manufacturer.img" alt="">
                <h3 class="text-normal text-center color-primary text-bold">{{ manufacturer.name }}</h3>
                <p class="text-sm">{{ manufacturer.category }}</p>
              </article>
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

  data() {
    return {
      manufacturers: [
        {
          name: 'Mistureba Vegana',
          img: 'img/manufacturers/mistureba.png',
          category: 'Veganos'
        },
        {
          name: 'Cauana Minusculi Confeiraria Gourmet',
          img: 'img/manufacturers/cau.png',
          category: 'Artesanais'
        },
        {
          name: 'Sitio Pema',
          img: 'img/manufacturers/pema.png',
          category: 'Orgânicos'
        },
        {
          name: 'Mistureba Vegana',
          img: 'img/manufacturers/mistureba.png',
          category: 'Veganos'
        },
        {
          name: 'Cauana Minusculi Confeiraria Gourmet',
          img: 'img/manufacturers/cau.png',
          category: 'Artesanais'
        },
        {
          name: 'Sitio Pema',
          img: 'img/manufacturers/pema.png',
          category: 'Orgânicos'
        },
        {
          name: 'Cauana Minusculi Confeiraria Gourmet',
          img: 'img/manufacturers/cau.png',
          category: 'Artesanais'
        },
        {
          name: 'Sitio Pema',
          img: 'img/manufacturers/pema.png',
          category: 'Orgânicos'
        }
      ],
    }
  },

  computed: {
    breakpoints () {
      return this.getBreakPoints()
    }
  },

  methods: {
    getBreakPoints() {
      var breakpoints = []
      for(var i = 100; i < 3000; i += 50) {
        breakpoints[i] = {
          itemsToShow: Math.floor((i - 100)/200)
        }
      }

      return Object.assign({}, breakpoints)
    }
  }
}
</script>

<style lang="scss">
.manufacturers__slide {
  flex-shrink: 1;
  flex-direction: column;
  margin-left: 1rem !important;
}
.manufacturers__item {
  width: 180px;
  flex: 1;

  &__img{
    height: 100px;
  }
}
</style>