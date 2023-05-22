<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores";
import TheSidebarLink from "./TheSidebarLink.vue";

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
          <the-sidebar-link
            class="navbar-brand menu-logo p-0 ms-2 d-flex align-items-center"
            to="/"
          >
            <img src="@/assets/img/logo_green.png" alt="" />
          </the-sidebar-link>
        </div>
        <div class="menu-content-left justify-content-end">
          <the-sidebar-link
            to="/login"
            class="btn btn-md button-primary button-primary--light me-2"
            v-if="!loggedUser"
          >
            Entrar
          </the-sidebar-link>
          <the-sidebar-link to="/register" class="btn btn-md button-primary" v-if="!loggedUser">
            Cadastrar</the-sidebar-link
          >
          <button href="" class="btn btn-md button-primary--light" v-if="loggedUser"
            data-bs-toggle="offcanvas"
            data-bs-target="#account-menu"
            aria-controls="account-menu"
            aria-label="Toggle navigation">
            Conta</button
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
    width: 162px;
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
  padding-left: 0px;
  margin-left: -3px;

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
