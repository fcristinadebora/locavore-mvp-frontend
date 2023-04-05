<script setup>
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";
</script>

<template>
  <section
    id="quiz-profile-picture"
    class="w-100 d-flex flex-column justify-content-between"
  >
    <section class="text-center">
      <i class="bi bi-check-circle-fill quiz-success-icon color-primary"></i>
      <h1 class="color-primary fw-bold text-center">Até a próxima</h1>
      <p class="text-center">
        Sua conta e todos os dados relacionados a ela foram excluídos. Você ainda pode utilizar as demais funcionalidades do Locavore e criar uma nova conta sempre que quiser.
      </p>
    </section>
    <section class="mb-5">
      <router-link to="/" class="btn w-100 button-primary">
        Continuar navegando
      </router-link>
    </section>
  </section>
</template>

<style lang="scss">
.quiz-success-icon {
  font-size: 100px;
}
</style>
