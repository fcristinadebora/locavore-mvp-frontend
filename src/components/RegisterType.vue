<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function selectRegisterType(type) {
  router.push(`/register/signup?type=${type}`);
}
</script>
<template>
  <section id="login-header" class="text-center w-100">
    <h1 class="color-primary fw-bold text-center mb-2">
      Obrigada por escolher o Locavore!
    </h1>
    <p class="text-lg text-center mb-5">
      As perguntas a seguir irão nos ajudar a adaptar o Locavore para você. Se
      já possui uma conta,
      <router-link to="/login" class="color-secondary">entre aqui</router-link>.
    </p>
  </section>
  <section id="login-form" class="text-center w-100">
    <button
      class="btn button-primary mb-2 w-100"
      @click="selectRegisterType('manufacturer')"
    >
      Sou produtor
    </button>
    <button
      class="btn button-primary mb-2 w-100"
      @click="selectRegisterType('grower')"
    >
      Sou consumidor de produtores locais
    </button>
    <button
      class="btn button-primary mb-2 w-100"
      @click="selectRegisterType('both')"
    >
      Produzo e consumo produtos locais
    </button>
  </section>
</template>
