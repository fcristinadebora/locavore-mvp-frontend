<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function handleSearchSubmit(event) {
  event.preventDefault();

  router.push("/search/location");
}
</script>
<template>
  <section
    id="search"
    class="d-flex flex-column justify-content-center text-center py-4"
  >
    <div class="container">
      <form @submit="handleSearchSubmit">
        <input
          type="text"
          name="location"
          class="form-control mb-2 text-center"
          placeholder="Digite o local onde buscar"
        />
        <button class="btn button-primary col-12">Buscar</button>
      </form>
    </div>
  </section>
</template>
