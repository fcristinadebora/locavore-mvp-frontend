<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="search-map">
      <section>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control border-radius-important"
            placeholder="Buscar por"
          />
          <button
            class="btn button-secondary border-radius-important m-l-1-important"
            type="button"
          >
            <i class="bi bi-search"></i>
          </button>
          <button
            class="btn button-secondary--light border-radius-important m-l-1-important"
            type="button"
          >
            <i class="bi bi-filter"></i>
          </button>
        </div>

        <p class="text-left">Próximo de Rua de Alexandre Braga, 56</p>
      </section>
      <section id="search-map-map" class="map-container">
        <Map />
      </section>
      <button
        class="btn button-primary mt-3 mb-5 w-100"
        @click="$emit('nextStep')"
      >
        Continuar
      </button>
    </section>
  </section>
</template>
