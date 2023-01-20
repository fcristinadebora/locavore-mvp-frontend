<template>
  <footer class="footer mt-auto col-12">
    <div class="w-100 pt-5 pb-3">
      <div
        class="col-12 col-md-6 d-inline-flex flex-column align-items-center text-center align-middle"
      >
        <img
          src="@/assets/img/logo_blue.png"
          class="footer_detail_logo mb-2"
          alt="Logo"
        />
        <span class="text mb-2"
          >Conectando produtores e consumidores locais</span
        >
        <nav class="social-icons mb-2">
          <ul class="navbar-nav flex-row footer_detail_nav text-lg">
            <li class="me-2">
              <a href=""><i class="bi bi-instagram"></i></a>
            </li>
            <li>
              <a href=""><i class="bi bi-twitter"></i></a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        class="col-12 col-md-6 d-inline-flex flex-column align-items-center text-center align-middle"
      >
        <nav>
          <ul
            class="color-secondary footer_detail_nav justify-content-between p-0"
          >
            <li class="d-inline-flex d-md-block px-3">
              <a href="">Sobre nós</a>
            </li>
            <li class="d-inline-flex d-md-block px-3">
              <a href="">Contato</a>
            </li>
            <li class="d-inline-flex d-md-block px-3">
              <a href="">Perguntas frequentes</a>
            </li>
            <li class="d-inline-flex d-md-block px-3">
              <a href="">Política de privacidade</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="footer_copyright bg-custom-secondary py-2">
      <div class="container text-center">
        <span class="color-primary">
          Ⓒ {{ currentYear }} - Locavore - Todos os direitos reservados
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>

<style lang="scss">
@import "@/assets/scss/_variables";

.footer {
  font-size: $size-text-secondary;
}

.footer_detail {
  text-align: center;
}

.footer_detail_logo {
  width: 150px;
}

.footer_detail_nav {
  li {
    margin-bottom: 0.2rem;
  }

  a {
    color: $color-brand-secondary;
    text-decoration: none;

    &:hover {
      color: $color-brand-secondary;
    }
  }
}
</style>
