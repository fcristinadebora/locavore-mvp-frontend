<script setup>
import StepsNavigation from "./StepsNavigation.vue";
</script>

<template>
  <section
    id="quiz-profile-picture"
    class="w-100 d-flex flex-column justify-content-between"
  >
    <section class="text-center">
      <i class="bi bi-check-circle-fill quiz-success-icon color-secondary"></i>
      <h1 class="color-primary fw-bold text-center">Cadastro finalizado</h1>
      <p class="text-center">
        Seu cadastro foi concluído, obrigada por escolher o Locavore!
      </p>
    </section>
    <section class="mb-5">
      <router-link to="/" class="btn w-100 button-primary">
        Continuar navegando
      </router-link>
    </section>
    <StepsNavigation
      @next-step="$emit('nextStep')"
      @prev-step="$emit('prevStep')"
      :disable-next="true"
    />
  </section>
</template>

<style lang="scss">
.quiz-success-icon {
  font-size: 100px;
}
</style>
