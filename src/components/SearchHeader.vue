<template>
  <section id="search-result-header">
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
        data-bs-toggle="modal"
        data-bs-target="#search-filter-modal"
      >
        <i class="bi bi-funnel"></i>
      </button>
    </div>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control border-radius-important"
        placeholder="Próximo de Rua de Alexandre Braga, 56"
      />
      <button
        class="btn button-secondary--light border-radius-important m-l-1-important"
        type="button"
      >
        Alterar <i class="bi bi-geo"></i>
      </button>
    </div>
  </section>
</template>
