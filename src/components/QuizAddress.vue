<script setup>
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";
import Map from "./Map.vue";
import AddressForm from "./AddressForm.vue";

const router = useRouter();
const props = defineProps(["currentStep"]);

function nextStep() {
  router.push("/quiz/contact");
}

function prevStep() {
  router.push("/quiz/long-description");
}

</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <AddressForm @success="nextStep" submit-button-text="Salvar e continuar" />
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>
