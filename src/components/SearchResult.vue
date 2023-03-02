<script setup>
import SearchProductsList from "./SearchProductsList.vue";
import SearchProducersList from "./SearchProducersList.vue";
import SearchFilterModal from "./SearchFilterModal.vue";
import SearchLocationModal from "./SearchLocationModal.vue";
import SearchHeader from "./SearchHeader.vue";
import Pagination from "./Pagination.vue";

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useSearchStore, useProductsStore, useProducersStore } from "../stores";
import { PRODUCT, PRODUCER } from "../enum/general";

const ITEMS_PER_PAGE = 20;
const searchStore = useSearchStore();
const productsStore = useProductsStore();
const producersStore = useProducersStore();
const route = useRoute();
const router = useRouter();

const pagination = ref({});

const modalFilters = ref({
  searchFor: PRODUCT,
  categories: []
});

const loadingLocation = ref(true);
const searchLocation = ref(null);
const searchCoordinates = ref(null);
const searchString = ref('');
const currentPage = ref(1);
const loadingResult = ref(true);
const resultItems = ref(null);

onMounted(async () => {
  await loadFilters();
  getSearchResult();
})

function resetCurrentPage () {
  currentPage.value = 1;
}

function handleApplyModalFilters(eventData) {
  modalFilters.value = {...eventData.filters};
  resetCurrentPage();
  applyFilters();
}

function handleApplyLocation(eventData) {
  searchLocation.value = eventData;
  searchStore.setSearchLocation(searchLocation.value);
  resetCurrentPage();
  applyFilters();
}

function handleApplyCoordinates(eventData) {
  searchCoordinates.value = eventData;
  resetCurrentPage();
  applyFilters();
}

function handleApplySearchString(eventData) {
  searchString.value = eventData;
  resetCurrentPage();
  applyFilters();
}

async function loadFilters() {
  currentPage.value = route.query.page ?? 1;
  searchString.value = route.query.search ?? '';
  modalFilters.value.searchFor = route.query.type ?? modalFilters.value.searchFor; 
  modalFilters.value.categories = modalFilters.value.categories;
  if (route.query.categories) {
    modalFilters.value.categories = route.query.categories.split(',').map(category => parseInt(category));
  }
  loadingLocation.value = true;
  searchLocation.value = await searchStore.getSearchLocation(route.query.locationId);
  searchCoordinates.value = {
    lat: route.query.lat ?? searchLocation.value.location.coordinates[1],
    lng: route.query.lng ?? searchLocation.value.location.coordinates[0]
  }
  
  loadingLocation.value = false;
}

const filters = computed(() => {
  const filters = {
    locationId: searchLocation.value?.id,
    lat: searchCoordinates.value?.lat,
    lng: searchCoordinates.value?.lng,
    type: modalFilters.value.searchFor,
    categories: modalFilters.value.categories.map(category => parseInt(category)),
    search: searchString.value ?? null,
    page: currentPage.value,
    perPage: ITEMS_PER_PAGE,
  };

  return filters;
})

function applyFilters () {
  router.push({
    path: route.path,
    query: {
      ...filters.value,
      categories: filters.value.categories.join(',')
    }
  });

  getSearchResult();
}

async function getSearchResult () {
  if (![PRODUCT, PRODUCER].includes(modalFilters.value.searchFor)) {
    return false;
  }

  loadingResult.value = true;
  
  var result = null;
  if (modalFilters.value.searchFor == PRODUCT) {
    result = await productsStore.searchProducts(filters.value);
  }
  if (modalFilters.value.searchFor == PRODUCER) {
    result = await producersStore.searchProducers(filters.value);
  }
  console.log('aaa', result);
  setPaginationFromResult(result.data)
  resultItems.value = result.data.data
  loadingResult.value = false;
}

function setPaginationFromResult (resultData) {
  pagination.value = {
    currentPage: resultData.current_page,
    totalPages: resultData.last_page
  }
}

function handlePageChange (newPage) {
  currentPage.value = newPage;
  applyFilters();
}

</script>

<template>
  <section class="w-100 d-flex flex-column">
    <SearchHeader :search-location="searchLocation" :search="searchString" @apply-search-string="handleApplySearchString" />
    <SearchProductsList v-if="modalFilters.searchFor == PRODUCT" :items="resultItems" :loading="loadingResult" />
    <SearchProducersList v-if="modalFilters.searchFor == PRODUCER" :items="resultItems" :loading="loadingResult" />
    <section
      id="search-pagination"
      class="d-flex justify-content-center mt-3"
    >
      <Pagination :current-page="pagination.currentPage" :total-pages="pagination.totalPages" @page-change="handlePageChange" />
    </section>
    <SearchFilterModal @apply-filters="handleApplyModalFilters" :filters="modalFilters" />
    <SearchLocationModal @apply-location="handleApplyLocation" @apply-coordinates="handleApplyCoordinates" />
  </section>
</template>
