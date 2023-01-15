<template>
  <section id="products" class="py-5">
    <div class="container px-2">
      <h2 class="text-center text-bold font-size-lg color-primary products__title mb-3">
        Produtos Populares
      </h2>
    
      <carousel
          :breakpoints="breakpoints"
          :snap-align="'start'"
          id="products-carousel"
          class="pt-3">
          <slide v-for="product,index in products" :key="index"
            class="products__slide pb-3 px-1">
            <article class="products__item
                border-radius
                flex-column
                justify-content-start
                align-items-center
                p-2">
                <img class="products__item__img border-radius my-2" :src="product.img" alt="">
                <h3 class="text-normal text-center color-primary text-bold">{{ product.name }}</h3>
                <p class="text-sm">{{ product.category }}</p>
              </article>
          </slide>
    
          <template #addons>
            <div class="d-flex mt-3 justify-content-center align-items-center px-1">
              <navigation />
              <pagination />
            </div>
          </template>
        </carousel>

        <div class="px-1 mt-3">
          <a href="#" class="btn button-secondary col-12">Ver mais produtos</a>
        </div>
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
      products: [
        {
          name: 'Pão de Queijo',
          img: 'img/products/prod4.png',
          category: 'Veganos, Sem glúten'
        },
        {
          name: 'Alface americana',
          img: 'img/products/prod1.png',
          category: 'Orgânicos'
        },
        {
          name: 'Pepino em conserva',
          img: 'img/products/prod2.png',
          category: 'Caseiros, Artesanais'
        },
        {
          name: 'Marmitas caseiras',
          img: 'img/products/prod3.png',
          category: 'Caseiros, Artesanais'
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
      for(var i = 0; i < 3000; i += 20) {
        var itemsToShow = i/250
        breakpoints[i] = {
          itemsToShow: Math.floor(itemsToShow)
        }
      }

      return Object.assign({}, breakpoints)
    }
  }
}
</script>

<style lang="scss">
.products__slide {
  flex-shrink: 1;
  flex-direction: column;
}
.products__item {
  width: 100%;
  flex: 1;

  &__img{
    height: 100px;
  }
}
</style>