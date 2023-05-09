<script setup>
import TheLayout from "../layouts/TheLayout.vue";

</script>

<template>
  <TheLayout>
    <div class="d-flex flex-column align-items-center justify-content-start">
      <div class="col-md-5 col-lg-2 text-center">
          <img src="/img/building.gif" alt="A cat building Locavore" class="mb-4 mt-3 w-100 border-radius">
      </div>
      <div class="w-100 text-center">
          <h1 class="mb-3 text-brand-primary">Em construção</h1>
          <p class="mb-3">A página que você acessou ainda sendo construída por nosso time de especialistas e estará disponível em breve. <br />Experimente voltar aqui em alguns dias.</p>
          <router-link to="/" class="btn button-primary">Clique aqui para continuar navegando</router-link>
      </div>
    </div>
  </TheLayout>
</template>
