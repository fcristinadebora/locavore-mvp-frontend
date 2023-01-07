<template>
  <nav id="sidebar_menu" class="offcanvas offcanvas-start bg-custom-primary sidebar-menu p-3">
      <ul class="list-unstyled sidebar-menu_content">
          <li class="d-flex justify-content-between sidebar-menu_content_header">
              <a href=""
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebar_menu"
                aria-controls="sidebar_menu"
                aria-expanded="false"
                aria-label="Close navigation">
                <i class="bi bi-arrow-return-left"></i>Fechar menu</a>
                <img src="img/icon-outline-white.png" alt="White outline icon" class="sidebar-menu_logo">
          </li>
          <li>
              <a href="#"><i class="bi bi-house"></i>Home</a>
          </li>
          <li>
              <a href="#"><i class="bi bi-search"></i>Buscar</a>
          </li>
          <li>
              <a href="#"><i class="bi bi-box-arrow-in-left"></i>Entrar</a>
          </li>
          <li>
              <a href="#"><i class="bi bi-person"></i>Cadastrar</a>
          </li>
          <li>
              <a href="#"><i class="bi bi-chat"></i>Feedback</a>
          </li>
      </ul>
      <ul class="list-unstyled sidebar_menu_footer">
        <li>
          <a href="">Sobre nós</a>
        </li>
        <li>
          <a href="">Contato</a>
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
    margin-bottom: .25rem;
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