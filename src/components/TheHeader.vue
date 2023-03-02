<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores";

const authStore = useAuthStore();

const loggedUser = computed(() => authStore.loggedUser);

</script>
<template>
  <header>
    <nav class="navbar navbar-white fixed-top bg-white color-primary">
      <div class="container justify-content-between menu-content">
        <div
          class="menu-content-left d-flex justify-content-start align-content-center"
        >
          <button
            class="menu-toggler bg-transparent"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar_menu"
            aria-controls="sidebar_menu"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
          <router-link
            class="navbar-brand menu-logo p-0 ms-2 d-flex align-items-center"
            to="/"
          >
            <img src="@/assets/img/logo_green.png" alt="" />
          </router-link>
        </div>
        <div class="menu-content-left justify-content-end">
          <router-link
            to="/login"
            class="btn btn-md button-primary button-primary--light me-2"
            v-if="!loggedUser"
          >
            Entrar
          </router-link>
          <router-link to="/register" href="" class="btn btn-md button-primary" v-if="!loggedUser">
            Cadastrar</router-link
          >
          <router-link to="/register" href="" class="btn btn-md button-primary--light" v-if="loggedUser">
            Conta</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.menu-logo {
  img {
    width: 175px;
  }
}

.menu-content-left {
  display: flex;

  @media (max-width: 482px) {
    display: none !important;
  }
}

.menu-toggler {
  border: none;
  &:focus {
    background-color: transparent;
  }

  i {
    font-size: 36px;
    font-weight: bold;
    color: $color-brand-primary;
  }
}
</style>
