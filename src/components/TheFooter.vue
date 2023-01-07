<template>
  <footer class="footer mt-auto w-100">
    <div class="container footer_detail d-flex flex-row flex-sm-row justify-content-between py-3">
      <div class="d-flex flex-column align-items-center col-5 col-sm-auto" id="footer-left">
        <img
          src="public/img/logo_blue.png"
          class="footer_detail_logo mb-2"
          alt="Logo"
        />
        <span class="text mb-2">Conectando produtores e consumidores locais</span>
        <nav class="social-icons">
            <ul class="navbar-nav flex-row footer_detail_nav">
              <li class="me-2"><a href=""><i class="bi bi-instagram"></i></a></li>
              <li><a href=""><i class="bi bi-twitter"></i></a></li>
            </ul>
        </nav>
      </div>
      <nav id="footer_right" class="col-8 col-sm-auto">
        <ul class="navbar-nav color-secondary footer_detail_nav justify-content-between">
          <li>
            <a href="">Sobre nós</a>
          </li>
          <li>
            <a href="">Contato</a>
          </li>
          <li>
            <a href="">Perguntas frequentes</a>
          </li>
          <li>
            <a href="">Política de privacidade</a>
          </li>
        </ul>

      </nav>
    </div>
    <div class="footer_copyright bg-custom-secondary py-2">
      <div class="container text-center">
        <span class="color-white"
          >Ⓒ 2022 - Locavore - Todos os direitos reservados</span
        >
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@import "@/assets/scss/_colors";
.footer_detail{
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
