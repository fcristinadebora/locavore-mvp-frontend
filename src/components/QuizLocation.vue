<script setup>
import { defineProps } from "vue";
import StepsNavigation from "./QuizStepsNavigation.vue";
import Map from "./Map.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;

function nextStep() {
  router.push("/quiz/contact");
}

function prevStep() {
  router.push("/quiz/address");
}
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="quiz-long-description">
      <section>
        <p class="w-100 text-muted text-center mb-2">
          Está na etapa {{ currentStep }} de 6
        </p>
        <h1 class="color-primary fw-bold text-center">
          Confirme sua localização
        </h1>
        <p class="text-center">Sem ela, você não aparecerá no mapa</p>
      </section>
      <section id="quiz-long-description-form" class="map-container">
        <Map />
      </section>
      <button class="btn button-primary mt-3 mb-5 w-100" @click="nextStep">
        Continuar
      </button>
    </section>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>

<style lang="scss">
.map-container {
  min-height: 70vh;
}
</style>
