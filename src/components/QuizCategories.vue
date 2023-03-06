<script setup>
import { ref } from "vue";
import { useCategoriesStore } from "../stores";
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;
const showNewCategoryInput = ref(true);
const categories = ref([]);
const activeCategories = ref([]);

function nextStep() {
  router.push("/quiz/short-description");
}

function prevStep() {
  router.push("/quiz/profile-picture");
}

function isCategoryActive(index) {
  return activeCategories.value.includes(index);
}

function selectCategory(index) {
  activeCategories.value.push(index);
}

const { allCategories } = useCategoriesStore();
categories.value = [...allCategories, { id: null, name: "Outros" }];
</script>

<template>
  <section class="d-flex flex-column justify-content-between">
    <section id="quiz-production-categories">
      <section id="quiz-production-categories">
        <p class="w-100 text-muted text-center mb-3">
          Está na etapa {{ currentStep }} de 6
        </p>
        <h1 class="color-primary fw-bold text-center">Tipo de produção</h1>
        <p class="text-lg text-center">
          Clique para selecionar as categorias de produtos que você produz.<br />
          É possível selecionar mais de uma.
        </p>
      </section>
      <section class="my-5 text-center">
        <!-- todo centralizar as categorias  -->
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
      <section id="new-category-input" class="my-3" v-if="showNewCategoryInput">
        <p class="text-center">
          Você selecionou a categoria “Outros”, informe a categoria abaixo
        </p>
        <input
          type="text"
          class="form-control text-center"
          placeholder="Digite a categoria"
        />
      </section>
      <button class="btn button-primary mt-3 mb-5 w-100" @click="nextStep">
        Continuar
      </button>
    </section>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>
