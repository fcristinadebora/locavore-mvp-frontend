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
  let offcanvas = document.getElementById("account-menu");
  let bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
  bsOffcanvas.hide();
}

async function logout() {
  await authStore.executeLogout();
  router.go(0);
}
</script>

<template>
  <nav
    id="account-menu"
    class="offcanvas offcanvas-end bg-light sidebar-menu p-3"
    v-if="authStore.isLoggedIn"
  >
    <ul class="list-unstyled sidebar-menu_content">
      <li class="d-flex justify-content-between sidebar-menu_content_header">
        <a
          href=""
          data-bs-toggle="offcanvas"
          data-bs-target="#account-menu"
          aria-controls="account-menu"
          aria-expanded="false"
          aria-label="Close navigation"
        >
          <i class="bi bi-arrow-return-right"></i>Fechar menu</a
        >
        <img
          src="@/assets/img/icon-outline-white.png"
          alt="White outline icon"
          class="sidebar-menu_logo"
        />
      </li>
      <li>
        <router-link to="/account/profile"> <i class="bi bi-person-lock"></i>Conta e segurança</router-link>
      </li>
      <li>
        <router-link to="/account/favorites/products"><i class="bi bi-heart-fill"></i>Produtos Favoritos</router-link>
      </li>
      <li>
        <router-link to="/account/favorites/producers"><i class="bi bi-heart"></i>Produtores Favoritos</router-link>
      </li>
      <li>
        <hr>
        <strong class="color-primary">
            Produtor
        </strong>
      </li>
      <li>
        <router-link to="/under-construction"><i class="bi bi-basket"></i>Perfil</router-link>
      </li>
      <li>
        <router-link to="/account/producer-address"><i class="bi bi-geo"></i>Endereço</router-link>
      </li>      
      <li>
        <router-link to="/under-construction"><i class="bi bi-person-vcard"></i>Contatos</router-link>
      </li>      
      <li>
        <router-link to="/account/products"><i class="bi bi-tags"></i>Produtos</router-link>
      </li>
      <li>
        <router-link to="/account/quizes"><i class="bi bi-chat-text"></i>Questionários</router-link>
      </li>      
    </ul>
    <ul class="list-unstyled sidebar_menu_footer">
        <li>
            <a href="#" @click.prevent="logout"
            ><i class="bi bi-box-arrow-left"></i>Sair</a
            >
        </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables";

.sidebar-menu {
  li {
    margin-bottom: 0.25rem;
  }

  a {
    color: $color-brand-primary;
    text-decoration: none;

    &:hover {
      color: $color-brand-primary;
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
