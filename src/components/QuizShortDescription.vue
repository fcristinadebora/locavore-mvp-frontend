<script setup>
import { ref, onMounted, watch } from "vue";
import FormSubmitButton from "./FormSubmitButton.vue";
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";
import { useAccountStore, useAuthStore } from "../stores";
import QuizStepCounter from "./QuizStepCounter.vue";

const router = useRouter();
const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;
const authStore = useAuthStore();
const accountStore = useAccountStore();

function nextStep() {
  router.push("/quiz/long-description");
}

function prevStep() {
  router.push("/quiz/categories");
}

const form = ref({
    loading: false,
    data: {
        short_description: ''
    }
})

onMounted(() => {
    fetchCurrentData();
})

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function fetchCurrentData() {
    const producer = await accountStore.getCurrentProducer();
    
    form.value.data.short_description = producer.data?.short_description ?? authStore.loggedUser?.short_description;
}

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    await accountStore.updateProducer({...form.value.data});
    nextStep();
  } catch (e) {
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <form @submit.prevent="handleSubmit">
    <section id="quiz-short-description">
      <section>
        <QuizStepCounter current-step="4" />
        <h1 class="color-primary fw-bold text-center">Descrição curta</h1>
        <p class="text-lg text-center">
          Apresente seu negócio de forma resumida
        </p>
      </section>
      <section id="quiz-short-description-form" class="my-3">
        <textarea
          v-model="form.data.short_description"
          id="short-description"
          class="form-control w-100 resize-none"
          rows="3"
          maxlength="100"
          placeholder="Digite aqui"
        ></textarea>
      </section>
      <FormSubmitButton class="button-primary mt-3 mb-5 w-100" :disabled="form.loading" label="Salvar e continuar" />
    </section>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </form>
  </section>
</template>
