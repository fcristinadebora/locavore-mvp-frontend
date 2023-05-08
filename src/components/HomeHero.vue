<template>
  <section
    id="hero"
    class="hero d-flex flex-column justify-content-center text-center py-4"
  >
    <div class="container">
      <h1 class="text-xl">Bem-vindo ao Locavore</h1>
      <p>A plataforma para conexão de produtores e consumidores locais</p>
      <router-link to="/search/result?type=product" class="btn button-secondary hero_btn-start px-4">Começar</router-link>
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.hero {
  flex: 2;
  font-size: $size-text-lg;

  h1 {
    font-weight: bold;
    color: $color-brand-primary;
  }

  p {
    color: $color-brand-primary-light;
  }
}

.hero_btn-start {
  align-self: center;
}
</style>
