<template>
  <section
    id="search"
    class="d-flex flex-column justify-content-center text-center py-4"
  >
    <div class="container">
      <form action="/search/location">
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
