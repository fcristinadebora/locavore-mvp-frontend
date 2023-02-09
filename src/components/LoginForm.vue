<script setup>
import { ref } from 'vue';
import { authStore } from '../stores';

const { executeLogin } = authStore();

const formData = ref({
  email: "",
  password: "",
});
const error = ref('');
const loading = ref(false);

async function handleSubmit() {
  error.value = '';
  loading.value = true;

  const logged = await executeLogin({
    email: formData.value.email,
    password: formData.value.password,
  });

  if (!logged) {
    error.value = "Invalid credentials";
  }

  loading.value = false;
}
</script>

<template>
  <form class="mb-3" @submit.prevent="handleSubmit">
    <label for="" class="text-danger w-100 ps-2" v-if="error">{{ error }}</label>
    <input
      type="text"
      name="username"
      id="username"
      class="form-control mb-2"
      placeholder="Seu e-mail"
      v-model="formData.email"
      required
    />
    <input
      type="password"
      name="password"
      id="password"
      class="form-control mb-2"
      placeholder="Sua senha"
      v-model="formData.password"
      required
    />
    <label for="show-password w-100">
      <input type="checkbox" name="showPassword" id="show-password" />
      Mostrar senha
    </label>
    <button class="btn button-primary w-100 mt-3" :disabled="loading">
      Entrar
      <div class="spinner-border spinner-border-sm ml-1" v-if="loading"></div>
    </button>
  </form>
</template>