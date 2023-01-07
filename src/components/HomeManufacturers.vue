<template>
  <section id="manufacturers" class="py-5 my-5 bg-custom-secondary">
    <h2 class="text-center text-bold font-size-lg color-primary manufacturers__title">Produtores Populares</h2>

    <div class="row">
      <article class="manufacturers__item" v-for="manufacturer,index in manufacturers" :key="index">
        <img :src="manufacturer.img" alt="">
        <h3>{{ manufacturer.name }}</h3>
        <p>{{ manufacturer.category }}</p>
      </article>
    </div>
  </section>
</template>

<script>
export default {
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
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>