<script setup>
import { ref } from "vue";
import SearchProductsList from "./SearchProductsList.vue";
import SearchManufacturersList from "./SearchManufacturersList.vue";
import SearchFilterModal from "./SearchFilterModal.vue";
import SearchHeader from "./SearchFilterModal.vue";
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
    <SearchHeader />
    <SearchProductsList v-if="filters.searchFor == PRODUCT" />
    <SearchManufacturersList v-if="filters.searchFor == MANUFACTURER" />
    <SearchFilterModal @apply-filters="handleApplyFilters" :filters="filters" />
  </section>
</template>
