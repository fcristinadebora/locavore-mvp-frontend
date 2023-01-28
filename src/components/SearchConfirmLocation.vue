<script setup>
import Map from "./Map.vue";

//Todo receive parameters from queryString or ?(TBD) and centralize map
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="search-map">
      <section>
        <h1 class="color-primary fw-bold text-center">Confirmar localização</h1>
      </section>
      <section id="search-map-map" class="map-container">
        <Map />
      </section>
      <router-link
        to="/search/result?carried-querystring"
        class="btn button-primary mt-3 mb-5 w-100"
      >
        Continuar
      </router-link>
    </section>
  </section>
</template>
