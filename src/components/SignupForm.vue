<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import localStorage from "../helpers/localStorage";
import {
  TYPE_PRODUCER,
  TYPE_CONSUMER,
  TYPE_PRODUCER_AND_CONSUMER
} from '../enum/userType';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const showPassword = ref(false);
const loading = ref(false);
const errors = ref({});
const genericError = ref("");
const formData = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  type: ""
});

onMounted(() => {
  if (!route.query.type) {
    router.push('/register');
  }

  if (
    ![
      TYPE_PRODUCER,
      TYPE_CONSUMER,
      TYPE_PRODUCER_AND_CONSUMER
    ].includes(route.query.type)
  ) {
    router.push('/register');
  }

  formData.value.type = route.query.type;
})

async function handleSubmit() {
  loading.value = true;
  errors.value = {};
  genericError.value = "";

  try {
    const registered = await authStore.executeRegister({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      password_confirm: formData.value.passwordConfirm,
      type: formData.value.type
    });

    await authStore.setupAuth();

    if ([
      TYPE_PRODUCER,
      TYPE_PRODUCER_AND_CONSUMER
    ].includes(route.query.type)) {
      return router.push('/quiz');
    }

    const referrer = localStorage.getPageReferrer();
    if (referrer) {
      return router.push(referrer);
    }
    
    return router.push('/register/success')
  } catch (error) {
    if (error.errors) {
      errors.value = {...error.errors}
    } else {
      genericError.value = "Erro ao realizar cadastro"
    }
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <section id="login-header text-center" v-if="formData.type == TYPE_CONSUMER">
    <h1 class="color-primary fw-bold text-center">Está quase pronto!</h1>
    <p class="text-lg text-center mb-5">
      Para finalizar a criação do seu perfil de <strong>consumidor</strong>,
      informe os dados abaixo
    </p>
  </section>
  <section id="login-header text-center" v-if="[TYPE_PRODUCER,TYPE_PRODUCER_AND_CONSUMER].includes(formData.type)">
    <h1 class="color-primary fw-bold text-center">Bem-vindo, produtor!</h1>
    <p class="text-lg text-center mb-5">
      Para criar seu perfil de <strong v-if="formData.type == TYPE_PRODUCER">produtor</strong><strong v-if="formData.type == TYPE_PRODUCER_AND_CONSUMER">produtor e consumidor</strong>, informe os dados
      abaixo
    </p>
  </section>
  <section id="login-form text-center">
    <form @submit.prevent="handleSubmit">
      <label for="" class="text-danger w-100 mb-2" v-if="genericError">
        {{ genericError }}
      </label>
      <div class="mb-2 w-100">
        <label for="name">Seu nome</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-control"
          placeholder=""
          v-model="formData.name"
        />
      </div>
      <div class="mb-2 w-100">
        <label for="email">Seu e-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          v-model="formData.email"
        />
        <label class="text-danger" v-if="errors.email">E-mail inválido ou já está em uso</label>
      </div>
      <div class="mb-2 w-100">
        <label for="password">Senha</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          name="password"
          id="password"
          class="form-control"
          v-model="formData.password"
        />
        <label class="text-danger" v-if="errors.password">Senha inválida</label>
      </div>
      <div class="mb-2 w-100">
        <label for="passwordConfirm">Confirmar senha</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          name="passwordConfirm"
          id="passwordConfirm"
          class="form-control"
          v-model="formData.passwordConfirm"
        />
        <label class="text-danger" v-if="errors.password_confirm">As senhas não coincidem</label>
      </div>
      <label
        for="showPassword"
        class="w-100 ps-2 mt-2 cursor-pointer"
      >
        <input
          type="checkbox"
          name="showPassword"
          :value="true"
          id="showPassword"
          v-model="showPassword"
        />
        {{ showPassword ? "Esconder senha" : "Mostrar senha" }}
      </label>
      <button class="btn button-primary w-100 mt-3" :disabled="loading">
        Criar conta
        <LoadingSm v-if="loading" />
      </button>
    </form>
  </section>
</template>
