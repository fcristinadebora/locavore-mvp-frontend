<script setup>
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function nextStep() {
  router.push("/");
}

function prevStep() {
  router.push("/quiz/contact");
}
</script>

<template>
  <section
    id="quiz-profile-picture"
    class="w-100 d-flex flex-column justify-content-between"
  >
    <section class="text-center">
      <i class="bi bi-check-circle-fill quiz-success-icon color-secondary"></i>
      <h1 class="color-primary fw-bold text-center">Login bem-sucedido</h1>
      <p class="text-center">
        Seu login foi bem-sucedido e agora você está conectado.
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
