<template>
  <section id="manufacturers" class="py-5 my-5 bg-custom-secondary">
    <div class="container">
      <h2 class="text-center text-bold font-size-lg color-primary manufacturers__title mb-3">Produtores Populares</h2>
    
    
        <carousel
          :breakpoints="breakpoints"
          :snap-align="'start'"
          @slide-start="handleSlideStart"
          @slide-end="handleSlideEnd"
          id="manufacturers-carousel"
          class="pt-3">
          <slide v-for="manufacturer,index in manufacturers" :key="index"
            class="manufacturers__slide pb-3"
            style="padding-right: 0.5rem">
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
            <div class="d-flex mt-3 justify-content-center align-items-center">
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

  mounted () {
    this.listenWindowResize()
  },

  methods: {
    getBreakPoints() {
      var breakpoints = []
      for(var i = 0; i < 3000; i += 20) {
        var itemsToShow = i/250
        breakpoints[i] = {
          itemsToShow: Math.floor(itemsToShow)
        }
      }

      return Object.assign({}, breakpoints)
    },

    listenWindowResize() {
      window.addEventListener('resize', this.manageSlideSpacing)
    },

    handleSlideEnd () {
      this.manageSlideSpacing('remove')
    },

    handleSlideStart () {
      this.manageSlideSpacing('add')
    },

    // Todo create abstraction for slide component
    manageSlideSpacing (paddingApply = 'both') {
      const carouselWrapper = document.getElementById('manufacturers-carousel')
      const visibleSlides = carouselWrapper.querySelectorAll('.carousel__slide--visible')
      if (visibleSlides.length == 0) {
        return
      }

      var isLastElement = false
      var element = null
      for (let i = 0; i < visibleSlides.length; i++) {
        element = visibleSlides[i]
        isLastElement = (i == visibleSlides.length - 1)
        if (!isLastElement && paddingApply != 'remove') {
          element.style.paddingRight = '0.5rem'
          continue
        }
        
        if (paddingApply != 'add') {
          element.style.paddingRight = '0'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.manufacturers__slide {
  flex-shrink: 1;
  flex-direction: column;
}
.manufacturers__item {
  width: 100%;
  flex: 1;

  &__img{
    height: 100px;
  }
}
</style>