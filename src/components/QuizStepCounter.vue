<script setup>
import { ref } from "vue";
const props = defineProps(["currentStep"]);
</script>

<template>
  <p class="w-100 text-muted text-center mb-3">
    Está na etapa {{ props.currentStep }} de 6
  </p>
</template>
