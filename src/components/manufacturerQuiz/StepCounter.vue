<script setup>
import { defineProps, ref } from "vue";
const props = defineProps(["currentStep"]);

const currentStep = ref(props.current);
</script>

<template>
  <p class="w-100 text-muted text-center mb-3">
    Está na etapa {{ currentStep }} de 6
  </p>
</template>
