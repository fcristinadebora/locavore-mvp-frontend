<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";
import LoadingSm from './LoadingSm.vue';

const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});
const error = ref("");
const loading = ref(false);
const showPassword = ref(false);

async function handleSubmit() {
  error.value = "";
  loading.value = true;
  
  try {
    const logged = await authStore.executeLogin({
      email: formData.value.email,
      password: formData.value.password,
    }); 
    await authStore.setupAuth();

    router.push('/login/success');
  } catch (e) {
    error.value = "Credenciais inválidas";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="mb-3" @submit.prevent="handleSubmit">
    <label for="" class="text-danger w-100 ps-2" v-if="error">{{
      error
    }}</label>
    <div class="mb-2 w-100">
      <label for="email">Seu e-mail</label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-control"
        v-model="formData.email"
        required
      />
    </div>
    <div class="mb-2 w-100">
      <label for="password">Sua senha</label>
      <input
        :type="showPassword ? 'text' : 'password'"
        name="password"
        id="password"
        class="form-control"
        v-model="formData.password"
        required
      />
    </div>
    <label for="show-password" class="w-100">
      <input type="checkbox" name="showPassword" id="show-password" :value="true" v-model="showPassword" />
      Mostrar senha
    </label>
    <button class="btn button-primary w-100 mt-3" :disabled="loading">
      Entrar
      <LoadingSm v-if="loading" />
    </button>
  </form>
</template>
