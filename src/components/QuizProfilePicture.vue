<script setup>
import { onMounted, ref } from "vue";
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";
import { useAccountStore } from "../stores";
import FormSubmitButton from './FormSubmitButton.vue';

const router = useRouter();
const props = defineProps(["currentStep"]);
const accountStore = useAccountStore();
const profilePicture = ref("");

onMounted(() => {
  fetchCurrentData();
})

function nextStep() {
  router.push("/quiz/categories");
}
function prevStep() {
  router.push("/quiz/name");
}

const form = ref({
    loading: false,
    data: new FormData()
})

async function fetchCurrentData() {
  try {
    const result = await accountStore.getCurrentProducer();
    
    profilePicture.value = result.data.profile_picture ?? '';
  } catch (error) {
    console.error(error);
  }
}

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    await accountStore.updateProfilePicture(form.value.data);
    nextStep();
  } catch (e) {
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  form.value.data.append('files', file);
}
</script>

<template>
  <section
    id="quiz-profile-picture"
    class="w-100 d-flex flex-column justify-content-between"
  >
    <section>
      <p class="w-100 text-muted text-center mb-3">
        Está na etapa 2 de 6
      </p>
      <h1 class="color-primary fw-bold text-center">Foto de perfil</h1>
    </section>
    <section>
      <div class="quiz__uploaded-picture text-center">
        <i class="bi bi-image" v-if="!profilePicture"></i>
        <img
          class="border-radius my-4 w-100"
          v-if="profilePicture"
          :src="profilePicture"
        />
      </div>
      <form @submit.prevent="handleSubmit">
        <input type="file" required class="form-control w-100 mb-2" accept="image/*" @change="handleFileSelect">
        <FormSubmitButton :class="`w-100 button-primary mb-3`" :disabled="!form.data"  label="Salvar e continuar" />
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
