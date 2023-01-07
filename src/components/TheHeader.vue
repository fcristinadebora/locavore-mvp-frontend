<script>
export default {
  name: "TheHeader",
};
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
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
          <a
            class="navbar-brand menu-logo p-0 ms-2 d-flex align-items-center"
            href="#"
          >
            <img src="public/img/logo_green.png" alt="" />
          </a>
        </div>
        <div class="menu-content-left justify-content-end">
          <a
            href=""
            class="btn btn-md button-primary button-primary--light me-2"
            >Entrar</a
          >
          <a href="" class="btn btn-md button-primary">Cadastrar</a>
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
