<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "../stores/auth";

const router = useRouter();
const { executeRegister } = authStore();
const userType = ref("consumer");
const showPassword = ref(false);
const formData = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

function handleSubmit() {
  const registered = executeRegister({
    name: formData.value.name,
    email: formData.value.email,
    password: formData.value.password,
    passwordConfirm: formData.value.passwordConfirm,
  });

  if (registered) {
    alert('deu boa rapaziada');
    router.push("/quiz");
  }

  
}
</script>
<template>
  <section id="login-header text-center" v-if="userType == 'consumer'">
    <h1 class="color-primary fw-bold text-center">Está quase pronto!</h1>
    <p class="text-lg text-center mb-5">
      Para finalizar a criação do seu perfil de <strong>consumidor</strong>,
      informe os dados abaixo
    </p>
  </section>
  <section id="login-header text-center" v-if="userType == 'manufacturer'">
    <h1 class="color-primary fw-bold text-center">Bem-vindo, produtor!</h1>
    <p class="text-lg text-center mb-5">
      Para criar seu perfil de <strong>produtor</strong>, informe os dados
      abaixo
    </p>
  </section>
  <section id="login-form text-center">
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        name="name"
        id="name"
        class="form-control mb-2"
        placeholder="Seu nome"
        v-model="formData.name"
      />
      <input
        type="email"
        name="email"
        id="email"
        class="form-control mb-2"
        placeholder="Seu e-mail"
        v-model="formData.email"
      />
      <input
        :type="showPassword ? 'text' : 'password'"
        name="password"
        id="password"
        class="form-control mb-2"
        placeholder="Sua senha"
        v-model="formData.password"
      />
      <input
        :type="showPassword ? 'text' : 'password'"
        name="password"
        id="password"
        class="form-control mb-2"
        placeholder="Confirmar senha"
        v-model="formData.passwordConfirm"
      />
      <label
        for="show-password"
        class="w-100 ps-2 color-secondary cursor-pointer"
      >
        <input
          type="checkbox"
          name="showPassword"
          value="1"
          id="show-password"
          v-model="showPassword"
        />
        {{ showPassword ? "Esconder senha" : "Mostrar senha" }}
      </label>
      <button class="btn button-primary w-100 mt-3">Criar conta</button>
    </form>
  </section>
</template>
