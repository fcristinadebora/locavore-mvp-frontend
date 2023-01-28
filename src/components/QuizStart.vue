<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function nextStep() {
  router.push("/quiz/profile-picture");
}
function skip() {
  router.push("/");
}
</script>
<template>
  <section id="quiz-start">
    <section id="login-header text-center">
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
