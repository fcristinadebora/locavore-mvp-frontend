<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores";
import LoadingSm from './LoadingSm.vue';
import localStorage from "../helpers/localStorage";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = ref({
  data: {
    email: "",
    password: "",
  },
  error: "",
  showPassword: false,
  loading: false
});

onMounted(() => {
  localStorage.setPageReferrer(route.query.referrer ?? null);
})

async function handleSubmit() {
  form.value.error = "";
  form.value.loading = true;
  
  try {
    await authStore.executeLogin({
      email: form.value.data.email,
      password: form.value.data.password,
    });
    await authStore.setupAuth();

    const referrer = localStorage.getPageReferrer();
    if (referrer) {
      return router.push(referrer)
    }
    
    router.push('/login/success');
  } catch (e) {
    form.value.error = "Credenciais inválidas";
  } finally {
    form.value.loading = false;
  }
}
</script>

<template>
  <form class="mb-3" @submit.prevent="handleSubmit">
    <label for="" class="text-danger w-100 ps-2" v-if="form.error">{{
      form.error
    }}</label>
    <div class="mb-2 w-100">
      <label for="email">Seu e-mail</label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-control"
        v-model="form.data.email"
        required
      />
    </div>
    <div class="mb-2 w-100">
      <label for="password">Sua senha</label>
      <input
        :type="form.showPassword ? 'text' : 'password'"
        name="password"
        id="password"
        class="form-control"
        v-model="form.data.password"
        required
      />
    </div>
    <label for="show-password" class="w-100">
      <input type="checkbox" name="showPassword" id="show-password" :value="true" v-model="form.showPassword" />
      Mostrar senha
    </label>
    <button class="btn button-primary w-100 mt-3" :disabled="form.loading">
      Entrar
      <LoadingSm v-if="form.loading" />
    </button>
  </form>
</template>
