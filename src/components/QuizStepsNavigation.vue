<script setup>
import { ref } from "vue";
const props = defineProps(["disableNext", "disablePrev", "prevLabel", "nextLabel"]);

const disableNext = ref(props.disableNext ?? false);
</script>

<template>
  <section id="quiz-steps-navigation" class="d-flex justify-content-between w-100">
    <span v-if="disablePrev"></span>
    <button class="btn button-secondary--light" @click="$emit('prevStep')" v-if="!disablePrev">
      {{ props.prevLabel ?? 'Voltar etapa' }}
    </button>
    <button
      class="btn button-secondary--light"
      @click="$emit('nextStep')"
      v-if="!disableNext"
    >
      {{ props.nextLabel ?? 'Pular' }}
    </button>
  </section>
</template>
