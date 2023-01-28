<script setup>
import { defineProps } from "vue";
import StepsNavigation from "./QuizStepsNavigation.vue";
import StepCounter from "./QuizStepCounter.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps(["currentStep"]);
const currentStep = props.currentStep ?? 0;

function nextStep() {
  router.push("/quiz/success");
}

function prevStep() {
  router.push("/quiz/location");
}
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="quiz-long-description">
      <section>
        <StepCounter :current="currentStep" />
        <h1 class="color-primary fw-bold text-center">
          Contato e redes sociais
        </h1>
      </section>
      <section id="quiz-long-description-form" class="my-3">
        <div class="row">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control my-2"
              placeholder="Whatsapp"
            />
            <!-- todo validate format -->
            <label class="text-muted text-sm">Formato: blablablabal</label>
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control my-2"
              placeholder="Telefone"
            />
          </div>
          <div class="col-md-8">
            <input
              type="url"
              class="form-control my-2"
              placeholder="Instagram"
            />
          </div>
          <div class="col-md-4">
            <input
              type="url"
              class="form-control my-2"
              placeholder="Facebook"
            />
          </div>
          <div class="col-md-6">
            <input type="url" class="form-control my-2" placeholder="Website" />
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
