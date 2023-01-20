<template>
  <TheLayout>
    <section id="login" class="py-5">
      <section id="login-header text-center">
        <h1 class="color-primary fw-bold text-center">Bem-vindo de volta!</h1>
        <p class="text-lg text-center">
          Entre na sua conta ou
          <router-link class="color-secondary">cadastre-se</router-link>
        </p>
      </section>
      <section id="login-form text-center">
        <form action="">
          <div class="form-group">
            <label for="username">Usuário</label>
            <input
              type="text"
              name="username"
              id="username"
              class="form-control"
            />
          </div>
        </form>
      </section>
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
</script>
