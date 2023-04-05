<template>
  <TheLayout>
    <section id="login" class="py-5 container col-md-8 col-lg-6 col-xl-4">
      <section id="login-header text-center">
        <h1 class="color-primary fw-bold text-center">Bem-vindo de volta!</h1>
        <p class="text-lg text-center mb-5">
          Entre na sua conta ou
          <router-link class="color-secondary" to="/register"
            >cadastre-se</router-link
          >
        </p>
      </section>
      <section id="login-form">
        <LoginForm />

        <div class="w-100 text-center">
          <router-link to="/forgot-password" class="color-secondary"
            >Esqueceu sua senha?</router-link
          >
        </div>
      </section>
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import LoginForm from "../components/LoginForm.vue";
//todo add show password feature
</script>

<style lang="scss">
@import "@/assets/scss/_variables";
</style>
