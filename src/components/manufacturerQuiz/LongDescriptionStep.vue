<script setup>
import { defineProps } from "vue";
import StepsNavigation from "./StepsNavigation.vue";

const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="quiz-long-description">
      <section>
        <p class="w-100 text-muted text-center mb-3">
          Está na etapa {{ currentStep }} de 6
        </p>
        <h1 class="color-primary fw-bold text-center">Descrição Longa</h1>
        <p class="text-lg text-center">
          Conte aos consumidores um pouco mais sobre seu negócio e sua produção
        </p>
      </section>
      <section id="quiz-long-description-form" class="my-3">
        <textarea name="" id="" class="form-control w-100 resize-none" rows="10" placeholder="Digite aqui"></textarea>
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
