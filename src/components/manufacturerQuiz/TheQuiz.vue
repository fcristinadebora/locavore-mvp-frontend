<script setup>
import { ref, onMounted, watch } from "vue";
import StartStep from "./StartStep.vue";
import ProfilePictureStep from "./ProfilePictureStep.vue";
import ProductionCategoriesStep from "./ProductionCategoriesStep.vue";
import ShortDescriptionStep from "./ShortDescriptionStep.vue";
import LongDescriptionStep from "./LongDescriptionStep.vue";
import AddressStep from "./AddressStep.vue";
import LocationStep from "./LocationStep.vue";
import ContactStep from "./ContactStep.vue";
import SuccessStep from "./SuccessStep.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const totalSteps = ref(6);
const currentStep = ref(1);

onMounted(() => {
  setCurrentStep();
});

watch(
  () => route.params.step,
  () => setCurrentStep()
);

function goToNextStep() {
  currentStep.value++;
  router.push(`/register/${currentStep.value}`);
}

function goToPrevStep() {
  currentStep.value--;
  router.push(`/register/${currentStep.value}`);
}

function getCurrentStep() {
  return route.params.step && route.params.step.length > 0
    ? route.params.step
    : 1;
}

function setCurrentStep() {
  currentStep.value = getCurrentStep();
}
</script>

<template>
  <StartStep
    v-if="currentStep == 1"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
  />
  <ProfilePictureStep
    v-if="currentStep == 2"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
    :total-steps="totalSteps"
  ></ProfilePictureStep>
  <ProductionCategoriesStep
    v-if="currentStep == 3"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
  />
  <ShortDescriptionStep
    v-if="currentStep == 4"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
  />
  <LongDescriptionStep
    v-if="currentStep == 5"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
  />
  <AddressStep
    v-if="currentStep == 6"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
  />
  <LocationStep
    v-if="currentStep == 7"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
  />
  <ContactStep
    v-if="currentStep == 8"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
  />
  <SuccessStep
    v-if="currentStep == 9"
    @next-step="goToNextStep"
    @prev-step="goToPrevStep"
    :current-step="currentStep"
  />
</template>
