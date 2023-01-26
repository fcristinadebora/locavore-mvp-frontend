<script setup>
import { ref } from "vue";

const userType = ref("consumer");
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
    <form action="">
      <input
        type="text"
        name="name"
        id="name"
        class="form-control mb-2"
        placeholder="Seu nome"
      />
      <input
        type="email"
        name="email"
        id="email"
        class="form-control mb-2"
        placeholder="Seu e-mail"
      />
      <input
        type="password"
        name="password"
        id="password"
        class="form-control mb-2"
        placeholder="Sua senha"
      />
      <label for="show-password w-100">
        <input type="checkbox" name="showPassword" id="show-password" />
        Mostrar senha
      </label>
      <button class="btn button-primary w-100 mt-3">Criar conta</button>
    </form>
  </section>
</template>
