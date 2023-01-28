<script setup>
import { ref } from "vue";
import SearchProductsList from "./SearchProductsList.vue";
import SearchManufacturersList from "./SearchManufacturersList.vue";
import SearchFilterModal from "./SearchFilterModal.vue";
import { PRODUCT, MANUFACTURER } from "../enum/general";
import { areEqual } from "../helpers/object";

const filters = ref({
  searchFor: PRODUCT,
  categories: [],
});

function handleApplyFilters(eventData) {
  // Search filters didn't change
  if (areEqual(eventData.filters, filters.value)) {
    return;
  }

  filters.value = { ...eventData.filters };
}
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
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
    <SearchProductsList v-if="filters.searchFor == PRODUCT" />
    <SearchManufacturersList v-if="filters.searchFor == MANUFACTURER" />
    <SearchFilterModal @apply-filters="handleApplyFilters" :filters="filters" />
  </section>
</template>
