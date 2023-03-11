<script setup>
import searchProductsList from "./searchProductsList.vue";
import SearchProducersList from "./SearchProducersList.vue";
import SearchFilterModal from "./SearchFilterModal.vue";
import SearchLocationModal from "./SearchLocationModal.vue";
import SearchHeader from "./SearchHeader.vue";
import Pagination from "./Pagination.vue";
import LoadingLg from "./LoadingLg.vue";
import SearchResultMap from "./SearchResultMap.vue";

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useSearchStore, useProductsStore, useProducersStore } from "../stores";
import { PRODUCT, PRODUCER, VIEW_MAP, VIEW_LIST } from "../enum/general";

const ITEMS_PER_PAGE = 20;
const searchStore = useSearchStore();
const productsStore = useProductsStore();
const producersStore = useProducersStore();
const route = useRoute();
const router = useRouter();
const view = ref(VIEW_LIST);

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

function resetCurrentPage() {
  currentPage.value = 1;
}

function toggleView() {
  console.log('toggleView')
  if (view.value == VIEW_LIST) {
    view.value = VIEW_MAP;
  } else if (view.value == VIEW_MAP) {
    view.value = VIEW_LIST;
  }

  resetCurrentPage();
  applyFilters();
}

function handleApplyModalFilters(eventData) {
  modalFilters.value = { ...eventData.filters };
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
  view.value = route.query.view ?? view.value;
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

function applyFilters() {
  router.push({
    path: route.path,
    query: {
      ...filters.value,
      view: view.value,
      categories: filters.value.categories.join(',')
    }
  });

  getSearchResult();
}

async function getSearchResult() {
  if (![PRODUCT, PRODUCER].includes(modalFilters.value.searchFor)) {
    return false;
  }

  loadingResult.value = true;

  var result = null;
  if (modalFilters.value.searchFor == PRODUCT) {
    result = await productsStore.listProducts({ ...filters.value, include: 'categories' });
  }
  if (modalFilters.value.searchFor == PRODUCER) {
    result = await producersStore.searchProducers(filters.value);
  }
  
  setPaginationFromResult(result.data)
  resultItems.value = result.data.data
  loadingResult.value = false;
}

function setPaginationFromResult(resultData) {
  pagination.value = {
    currentPage: resultData.current_page,
    totalPages: resultData.last_page
  }
}

function handlePageChange(newPage) {
  currentPage.value = newPage;
  applyFilters();
}

function handleMaxDistanceUpdated(eventData) {
  //todo call api
}

</script>

<template>
  <section class="w-100 d-flex flex-column">
    <SearchHeader :search-location="searchLocation" :search="searchString"
      @apply-search-string="handleApplySearchString" />
    <section id="search-products-title" class="mt-3">
      <h1 class="d-flex justify-content-between">
        <span class="fw-bold color-primary">Resultados em
          <span class="color-secondary fw-bold" v-if="modalFilters.searchFor == PRODUCT">Produtos</span>
          <span class="color-secondary fw-bold" v-if="modalFilters.searchFor == PRODUCER">Produtores</span>
        </span>
        <button class="btn button-secondary--light border-radius-important m-l-1-important" type="button"
          @click="toggleView">
          <span v-if="view == VIEW_LIST">
            Mapa <i class="bi bi-globe-americas"></i>
          </span>
          <span v-if="view == VIEW_MAP">
            Lista <i class="bi bi-view-list"></i>
          </span>
        </button>
      </h1>
    </section>
    <section class="d-flex flex-column align-items-center pt-3" v-if="loadingResult">
      <LoadingLg />
      Carregando resultados...
    </section>
    <section class="d-flex flex-column align-items-center pt-3" v-if="!loadingResult && !resultItems.length">
      <i class="bi bi-window icon-lg"></i>
      Nenhum resultado encontrado com esses filtros :(
    </section>
    <searchProductsList
      v-if="modalFilters.searchFor == PRODUCT && view == VIEW_LIST && !loadingResult && resultItems.length"
      :items="resultItems" />
    <SearchProducersList
      v-if="modalFilters.searchFor == PRODUCER && view == VIEW_LIST && !loadingResult && resultItems.length"
      :items="resultItems" />
    <section v-if="view == VIEW_LIST" id="search-pagination" class="d-flex justify-content-center mt-3">
      <Pagination :current-page="pagination.currentPage" :total-pages="pagination.totalPages"
        @page-change="handlePageChange" />
    </section>
    <SearchResultMap v-if="view == VIEW_MAP && !loadingResult && resultItems.length" :items="resultItems"
      :user-location="searchCoordinates" :item-type="modalFilters.searchFor" @max-distance-updated="handleMaxDistanceUpdated" />
    <SearchFilterModal @apply-filters="handleApplyModalFilters" :filters="modalFilters" />
    <SearchLocationModal @apply-location="handleApplyLocation" @apply-coordinates="handleApplyCoordinates" />
  </section>
</template>
