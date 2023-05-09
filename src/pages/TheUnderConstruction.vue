<script setup>
import TheLayout from "../layouts/TheLayout.vue";

</script>

<template>
  <TheLayout>
    <div class="d-flex flex-column align-items-center justify-content-start">
      <div class="col-md-5 col-lg-2 text-center">
          <img src="/img/building.gif" alt="A cat building Locavore" class="mb-4 mt-3 border-radius" id="building-gif">
      </div>
      <div class="w-100 text-center">
          <h1 class="mb-3 text-brand-primary">Em construção</h1>
          <p class="mb-3">A página que você acessou ainda sendo construída por nosso time de especialistas e estará disponível em breve. <br />Experimente voltar aqui em alguns dias.</p>
          <router-link to="/" class="btn button-primary">Continuar navegando</router-link>
      </div>
    </div>
  </TheLayout>
</template>

<style lang="scss">
#building-gif {
  max-height: 40vh;
  aspect-ratio: 1;
}
</style>