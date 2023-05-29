<script setup>
import { onMounted, ref, watchEffect } from "vue";
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";
import { useAccountStore, useAuthStore } from "../stores";
import FormSubmitButton from './FormSubmitButton.vue';
import { computed } from "@vue/reactivity";
import { watch } from "vue";
import { getCurrentProducer } from "../api/backend/account";
import QuizStepCounter from "./QuizStepCounter.vue";

const router = useRouter();
const props = defineProps(["currentStep"]);
const accountStore = useAccountStore();
const authStore = useAuthStore();

function nextStep() {
  router.push("/quiz/profile-picture");
}
function prevStep() {
  router.push("/quiz");
}

const form = ref({
    loading: false,
    data: {
      name: ''
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
    
    form.value.data.name = producer.data?.name ?? authStore.loggedUser?.name;
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
  <section
    id="quiz-profile-picture"
    class="w-100 d-flex flex-column justify-content-between"
  >
    <section>
      <QuizStepCounter current-step="1" />
      <h1 class="color-primary fw-bold text-center">Nome</h1>
    </section>
    <section>
      <form @submit.prevent="handleSubmit">
        <label class="mb-2" for="">Nome para exibir no perfil de produtor:</label>
        <input type="text" class="form-control mb-2" v-model="form.data.name" placeholder="Digite aqui">
        <FormSubmitButton :class="`w-100 button-primary mb-3`" :disabled="form.loading"  label="Salvar e continuar" />
      </form>
    </section>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>

<style lang="scss">
.quiz__uploaded-picture {
  i.bi-image {
    font-size: 100px;
  }
}
</style>
