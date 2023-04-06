<script setup>
import { useRouter } from "vue-router";
import localStorage from "../helpers/localStorage";

const router = useRouter();

function nextStep() {
  router.push("/quiz/name");
}
function skip() {
  const referrer = localStorage.getPageReferrer();
  if (referrer) {
    return router.push(referrer);
  }

  router.push("/register/success");
}
</script>
<template>
  <section id="quiz-start" class="w-100">
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Completar perfil</h1>
      <p class="text-lg text-center mb-5">
        Para finalizar a criação do seu perfil, responda as etapas a seguir*.<br />
        São apenas 6 etapas para deixar seu perfil mais atrativo para os
        consumidores!<br /><br />

        *O preenchimento é opcional, você pode pular as etapas e editar seu
        perfil quando quiser.
      </p>
    </section>
    <section id="login-form text-center">
      <button class="btn button-primary mb-2 w-100" @click="nextStep">
        Vamos lá
      </button>
      <button class="btn button-primary--light mb-2 w-100" @click="skip">
        Vou responder depois
      </button>
    </section>
  </section>
</template>
