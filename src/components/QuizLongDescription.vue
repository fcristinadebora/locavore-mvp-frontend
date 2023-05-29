<script setup>
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useAccountStore, useAuthStore } from "../stores";
import FormSubmitButton from "./FormSubmitButton.vue";
import QuizStepCounter from "./QuizStepCounter.vue";

const router = useRouter();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;

function nextStep() {
  router.push("/quiz/address");
}

function prevStep() {
  router.push("/quiz/short-description");
}

const form = ref({
    loading: false,
    data: {
      long_description: ''
    }
})

onMounted(() => {
    fetchCurrentData();
})

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function fetchCurrentData() {
    const producer = await accountStore.getCurrentProducer({include: 'long_description'});
    
    form.value.data.long_description = producer.data?.long_description ?? authStore.loggedUser?.long_description;
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
    <section id="quiz-long-description">
      <section>
        <QuizStepCounter current-step="5" />
        <h1 class="color-primary fw-bold text-center">Descrição Longa</h1>
        <p class="text-lg text-center">
          Conte aos consumidores um pouco mais sobre seu negócio e sua produção
        </p>
      </section>
      <section id="quiz-long-description-form" class="my-3">
        <textarea
          v-model="form.data.long_description"
          id=""
          class="form-control w-100 resize-none"
          rows="10"
          placeholder="Digite aqui"
        ></textarea>
      </section>
      <FormSubmitButton class="button-primary mt-3 mb-5 w-100" :disabled="form.loading" label="Salvar e continuar" />
    </section>
    </form>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>
