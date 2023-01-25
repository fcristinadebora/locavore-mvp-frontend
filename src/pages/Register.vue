<template>
  <TheLayout>
    <section id="register" class="py-5 container d-flex flex-grow-1 h-100">
      <UserTypeStep v-if="currentStep == 0" />
      <SignupStep v-if="currentStep == 1" />
      <ManufacturerQuiz v-if="currentStep == 2" />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import UserTypeStep from "../components/register/UserTypeStep.vue";
import SignupStep from "../components/register/SignupStep.vue";
import ManufacturerQuiz from "../components/manufacturerQuiz/TheQuiz.vue";
import { ref } from "vue";

const currentStep = ref(2);
</script>

<style lang="scss">
@import "@/assets/scss/_variables";
</style>
