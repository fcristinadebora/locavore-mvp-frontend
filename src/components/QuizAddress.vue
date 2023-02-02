<script setup>
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;

function nextStep() {
  router.push("/quiz/location");
}

function prevStep() {
  router.push("/quiz/long-description");
}
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="quiz-long-description">
      <section>
        <p class="w-100 text-muted text-center mb-3">
          Está na etapa {{ currentStep }} de 6
        </p>
        <h1 class="color-primary fw-bold text-center">Endereço</h1>
      </section>
      <section id="quiz-long-description-form" class="my-3">
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control my-2" placeholder="CEP" />
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control my-2" placeholder="Cidade" />
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control my-2" placeholder="Rua" />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control my-2" placeholder="Número" />
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control my-2" placeholder="Bairro" />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control my-2"
              placeholder="Complemento"
            />
          </div>
        </div>
      </section>
      <button class="btn button-primary mt-3 mb-5 w-100" @click="nextStep">
        Continuar
      </button>
    </section>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>
