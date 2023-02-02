<script setup>
import { ref } from "vue";
import StepsNavigation from "./QuizStepsNavigation.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["currentStep"]);
const currentStep = ref(props.currentStep);
const profilePicture = ref("");

profilePicture.value = "/img/manufacturers/cau.png";

function nextStep() {
  router.push("/quiz/categories");
}
function prevStep() {
  router.push("/quiz");
}
</script>

<template>
  <section
    id="quiz-profile-picture"
    class="w-100 d-flex flex-column justify-content-between"
  >
    <section>
      <p class="w-100 text-muted text-center mb-3">
        Está na etapa {{ currentStep }} de 6
      </p>
      <h1 class="color-primary fw-bold text-center">Foto de perfil</h1>
    </section>
    <section>
      <div class="quiz__uploaded-picture text-center">
        <i class="bi bi-image" v-if="!profilePicture.length"></i>
        <img
          class="border-radius my-4"
          v-if="!!profilePicture.length"
          :src="profilePicture"
        />
      </div>
      <button
        class="btn button-primary mb-2 w-100"
        v-if="!profilePicture.length"
        @click="profilePicture = '/img/manufacturers/cau.png'"
      >
        Selecionar foto
      </button>
      <button
        class="btn button-primary--light mb-2 w-100"
        v-if="!!profilePicture.length"
        @click="profilePicture = ''"
      >
        Selecionar outra foto
      </button>
      <button
        class="btn mb-2 w-100"
        :class="[
          !!profilePicture.length ? 'button-primary' : 'button-primary--light',
        ]"
        :disabled="!profilePicture.length"
        @click="nextStep"
      >
        Continuar
      </button>
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
