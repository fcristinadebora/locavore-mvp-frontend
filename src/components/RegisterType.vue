<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import localStorage from "../helpers/localStorage";
import {
  TYPE_PRODUCER,
  TYPE_CONSUMER,
  TYPE_PRODUCER_AND_CONSUMER
} from '../enum/userType';

const router = useRouter();
const route = useRoute();

onMounted(() => {
  localStorage.setPageReferrer(route.query.referrer ?? null);
})

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
      @click="selectRegisterType(TYPE_PRODUCER)"
    >
      Sou produtor
    </button>
    <button
      class="btn button-primary mb-2 w-100"
      @click="selectRegisterType(TYPE_CONSUMER)"
    >
      Sou consumidor de produtos locais
    </button>
    <button
      class="btn button-primary mb-2 w-100"
      @click="selectRegisterType(TYPE_PRODUCER_AND_CONSUMER)"
    >
      Produzo e consumo produtos locais
    </button>
  </section>
</template>
