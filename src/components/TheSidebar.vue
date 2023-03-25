<script setup>
import * as bootstrap from "bootstrap";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";

const authStore = useAuthStore();

const router = useRouter();
const loggedUser = computed(() => authStore.loggedUser);

onMounted(() => {
  hideSidebar();
});

function hideSidebar() {
  let offcanvas = document.getElementById("sidebar_menu");
  let backdrops = document.getElementsByClassName("offcanvas-backdrop");
  let bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
  let body = document.querySelector("body");

  bsOffcanvas.hide();
  // todo this was transfered for ./components/helpers/mustLoginModal.js, improve this organization later 
  // body.removeAttribute("style");
  // if (backdrops.length > 0) {
  //   for (const backdropItem of backdrops) {
  //     backdropItem.remove();
  //   }
  // }
}

async function logout() {
  await authStore.executeLogout();
  router.go(0);
}
</script>

<template>
  <nav
    id="sidebar_menu"
    ref="offCanvas"
    class="offcanvas offcanvas-start bg-custom-primary sidebar-menu p-3"
  >
    <ul class="list-unstyled sidebar-menu_content">
      <li class="d-flex justify-content-between sidebar-menu_content_header">
        <a
          href=""
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar_menu"
          aria-controls="sidebar_menu"
          aria-expanded="false"
          aria-label="Close navigation"
        >
          <i class="bi bi-arrow-return-left"></i>Fechar menu</a
        >
        <img
          src="@/assets/img/icon-outline-white.png"
          alt="White outline icon"
          class="sidebar-menu_logo"
        />
      </li>
      <li>
        <router-link to="/"> <i class="bi bi-house"></i>Home </router-link>
      </li>
      <li>
        <a href="#"><i class="bi bi-search"></i>Buscar</a>
      </li>
      <li v-if="!loggedUser">
        <router-link to="/login">
          <i class="bi bi-box-arrow-in-left"></i>Entrar
        </router-link>
      </li>
      <li v-if="!loggedUser">
        <router-link to="/register">
          <i class="bi bi-person"></i>Cadastrar
        </router-link>
      </li>
      <li v-if="loggedUser">
        <a href="#" @click.prevent="logout"
          ><i class="bi bi-box-arrow-left"></i>Sair</a
        >
      </li>
    </ul>
    <ul class="list-unstyled sidebar_menu_footer">
      <li>
        <a href="">Sobre nós</a>
      </li>
      <li>
        <a href="">Contato/Feedback</a>
      </li>
      <li>
        <a href="">Perguntas Frequentes</a>
      </li>
      <li>
        <a href="">Política de privacidade</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.sidebar-menu {
  li {
    margin-bottom: 0.25rem;
  }

  a {
    color: $color-white;
    text-decoration: none;

    &:hover {
      color: $color-white;
    }
  }

  i {
    margin-right: 0.75rem;
  }

  &_content {
    margin-bottom: auto;

    &_header {
      padding-bottom: 1.25rem;
    }
  }

  &_logo {
    width: 30px;
  }
}
</style>
