<script setup>
import { ref } from "vue";
const props = defineProps(["disableNext"]);

const disableNext = ref(props.disableNext ?? false);
</script>

<template>
  <section id="quiz-steps-navigation" class="d-flex justify-content-between">
    <button class="btn button-secondary--light" @click="$emit('prevStep')">
      Voltar etapa
    </button>
    <button
      class="btn button-secondary--light"
      @click="$emit('nextStep')"
      v-if="!disableNext"
    >
      Pular
    </button>
  </section>
</template>
