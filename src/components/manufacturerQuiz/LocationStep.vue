<script setup>
import { defineProps } from "vue";
import StepsNavigation from "./StepsNavigation.vue";
import Map from "../Map.vue";

const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="quiz-long-description">
      <section>
        <p class="w-100 text-muted text-center mb-2">
          Está na etapa {{ currentStep }} de 6
        </p>
        <h1 class="color-primary fw-bold text-center">Endereço</h1>
      </section>
      <section id="quiz-long-description-form" class="map-container">
        <Map />
      </section>
      <button
        class="btn button-primary mt-3 mb-5 w-100"
        @click="$emit('nextStep')"
      >
        Continuar
      </button>
    </section>
    <StepsNavigation
      @next-step="$emit('nextStep')"
      @prev-step="$emit('prevStep')"
    />
  </section>
</template>

<style lang="scss">
.map-container {
  min-height: 70vh;
}
</style>
