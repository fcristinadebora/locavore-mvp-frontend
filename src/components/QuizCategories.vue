<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useAccountStore, useAuthStore, useCategoriesStore } from "../stores";
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";
import FormSubmitButton from "./FormSubmitButton.vue";
import QuizStepCounter from "./QuizStepCounter.vue";

const router = useRouter();
const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;
const showNewCategoryInput = ref(true);
const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.allCategories ?? []);
const activeCategories = ref([]);
const authStore = useAuthStore();
const accountStore = useAccountStore();

function nextStep() {
  router.push("/quiz/short-description");
}

function prevStep() {
  router.push("/quiz/profile-picture");
}

function isCategoryActive(index) {
  return activeCategories.value.includes(index);
}

function selectCategory(id) {
  const selectedIndex = activeCategories.value.indexOf(id)
  if (selectedIndex !== -1) {
    activeCategories.value.splice(selectedIndex, 1);
    return;
  }

  activeCategories.value.push(id);
}

const form = ref({
  loading: false,
  data: {
    categories: []
  }
})

onMounted(() => {
    fetchCurrentData();
})

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function fetchCurrentData() {
    const producer = await accountStore.getCurrentProducer({include: 'categories'});
    
    producer.data?.categories?.forEach(category => {
      activeCategories.value.push(category.id)
    });
}

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    form.value.data.categories = activeCategories.value;
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
  <section class="d-flex flex-column justify-content-between">
    <section id="quiz-production-categories">
      <section id="quiz-production-categories">
        <QuizStepCounter current-step="3" />
        <h1 class="color-primary fw-bold text-center">Tipo de produção</h1>
        <p class="text-lg text-center">
          Clique para selecionar as categorias de produtos que você produz.<br />
          É possível selecionar mais de uma.
        </p>
      </section>
      <section class="my-5 text-center">
        <button
          class="btn mx-1 my-2"
          v-for="(category, index) in categories"
          :class="
            isCategoryActive(category.id)
              ? 'button-primary'
              : 'button-primary--light'
          "
          :key="index"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </section>
      <form @submit.prevent="handleSubmit">
        <FormSubmitButton class="button-primary mt-3 mb-5 w-100" :disabled="form.loading" label="Salvar e continuar" />
      </form>
    </section>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>
