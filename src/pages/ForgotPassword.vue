<template>
  <TheLayout>
    <section id="login" class="py-5 container">
      <section id="login-header text-center">
        <h1 class="color-primary fw-bold text-center">Esqueci minha senha</h1>
        <p class="text-lg text-center mb-5">
          Informe seu e-mail abaixo e lhe enviaremos um link para alterar sua senha
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
          <button class="btn button-primary w-100 mt-3">Enviar</button>
        </form>
        <div class="w-100 text-center mt-3">
          <router-link to="/login" class="color-secondary">Cancelar</router-link>
        </div>
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
