<script setup>
import * as bootstrap from "bootstrap";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";
import { hideSidebar } from "./helpers/sidebar";
import TheSidebarLink from "./TheSidebarLink.vue";

const authStore = useAuthStore();

const router = useRouter();
const loggedUser = computed(() => authStore.loggedUser);

onMounted(() => {
  hideSidebar("sidebar_menu");
});

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
        <TheSidebarLink to="/"> <i class="bi bi-house"></i>Home </TheSidebarLink>
      </li>
      <li>
        <TheSidebarLink to="/search/result?type=product"><i class="bi bi-search"></i>Buscar</TheSidebarLink>
      </li>
      <li v-if="!loggedUser">
        <TheSidebarLink to="/login">
          <i class="bi bi-box-arrow-in-left"></i>Entrar
        </TheSidebarLink>
      </li>
      <li v-if="!loggedUser">
        <TheSidebarLink to="/register">
          <i class="bi bi-person"></i>Cadastrar
        </TheSidebarLink>
      </li>
      <span v-if="loggedUser">
        <li>
          <hr>
          <strong class="color-white">
              Conta
          </strong>
        </li>
        <li>
          <TheSidebarLink to="/account/profile"> <i class="bi bi-person-lock"></i>Conta e segurança</TheSidebarLink>
        </li>
        <li>
          <TheSidebarLink to="/account/favorites/products"><i class="bi bi-heart-fill"></i>Produtos Favoritos</TheSidebarLink>
        </li>
        <li>
          <TheSidebarLink to="/account/favorites/producers"><i class="bi bi-heart"></i>Produtores Favoritos</TheSidebarLink>
        </li>
        <li v-if="loggedUser">
          <a href="#" @click.prevent="logout"
            ><i class="bi bi-box-arrow-left"></i>Sair</a
          >
        </li>
        <li>
          <hr>
          <strong class="color-white">
              Produtor
          </strong>
        </li>
        <li>
          <TheSidebarLink  to="/under-construction"><i class="bi bi-basket"></i>Perfil</TheSidebarLink>
        </li>
        <li>
          <TheSidebarLink to="/account/producer-address"><i class="bi bi-geo"></i>Endereço</TheSidebarLink>
        </li>      
        <li>
          <TheSidebarLink to="/under-construction"><i class="bi bi-person-vcard"></i>Contatos</TheSidebarLink>
        </li>      
        <li>
          <TheSidebarLink to="/account/products"><i class="bi bi-tags"></i>Produtos</TheSidebarLink>
        </li>
        <li>
          <TheSidebarLink to="/account/quizes"><i class="bi bi-chat-text"></i>Questionários</TheSidebarLink>
        </li>   
      </span>
    </ul>
    <ul class="list-unstyled sidebar_menu_footer mt-5">
      <li>
        <TheSidebarLink to="/under-construction">Sobre nós</TheSidebarLink>
      </li>
      <li>
        <TheSidebarLink to="/under-construction">Contato/Feedback</TheSidebarLink>
      </li>
      <li>
        <TheSidebarLink to="/under-construction">Perguntas Frequentes</TheSidebarLink>
      </li>
      <li>
        <TheSidebarLink to="/under-construction">Política de privacidade</TheSidebarLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.sidebar-menu {
  overflow-y: auto;

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
