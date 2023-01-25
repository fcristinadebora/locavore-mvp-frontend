<template>
  <TheLayout>
    <section id="login" class="py-5 container">
      <section id="login-header text-center">
        <h1 class="color-primary fw-bold text-center">Bem-vindo de volta!</h1>
        <p class="text-lg text-center mb-5">
          Entre na sua conta ou
          <router-link class="color-secondary" to="/register"
            >cadastre-se</router-link
          >
        </p>
      </section>
      <section id="login-form text-center">
        <form action="">
          <input
            type="text"
            name="username"
            id="username"
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
          <button class="btn button-primary w-100 mt-3">Entrar</button>
        </form>
      </section>
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
//todo add show password feature
</script>

<style lang="scss">
@import "@/assets/scss/_variables";
</style>
