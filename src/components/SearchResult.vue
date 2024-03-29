<script setup>
import SearchProductsList from "./SearchProductsList.vue";
import SearchProducersList from "./SearchProducersList.vue";
import SearchFilterModal from "./SearchFilterModal.vue";
import SearchLocationModal from "./SearchLocationModal.vue";
import SearchHeader from "./SearchHeader.vue";
import Pagination from "./Pagination.vue";
import LoadingLg from "./LoadingLg.vue";
import SearchResultMap from "./SearchResultMap.vue";

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useSearchStore, useProductsStore, useProducersStore, useFavoritesStore } from "../stores";
import { PRODUCT, PRODUCER, VIEW_MAP, VIEW_LIST } from "../enum/general";

const ITEMS_PER_PAGE = 20;
const searchStore = useSearchStore();
const productsStore = useProductsStore();
const producersStore = useProducersStore();
const favoritesStore = useFavoritesStore();
const route = useRoute();
const router = useRouter();
const view = ref(VIEW_LIST);

const pagination = ref({});
const favoriteIds = ref([]);

const modalFilters = ref({
  searchFor: PRODUCT,
  categories: []
});

const loadingLocation = ref(true);
const loadingMapResult = ref(false);
const searchLocation = ref(null);
const searchCoordinates = ref(null);
const mapCenterCoordinates = ref(null);
const mapMaxDistance = ref(0);
const searchString = ref('');
const currentPage = ref(1);
const loadingResult = ref(true);
const resultItems = ref([]);
const mapResultItems = ref([]);
const mapKey = ref('');

onMounted(async () => {
  await loadFilters();
  getSearchResult();
})

function resetCurrentPage() {
  currentPage.value = 1;
}

function isFavorite(productId) {
  return favoriteIds.value.includes(productId);
}

function toggleView() {
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
  modalFilters.value.onlyFavorites = route.query.onlyFavorites ? true : false;
  if (route.query.categories) {
    modalFilters.value.categories = route.query.categories.split(',').map(category => parseInt(category));
  }
  loadingLocation.value = true;
  searchLocation.value = await searchStore.getSearchLocation(route.query.locationId);
  if (route.query.lat && route.query.lng) {
    await searchStore.setSearchCoordinates({
      lat: route.query.lat,
      lng: route.query.lng
    });
  }
  searchCoordinates.value = await searchStore.getSearchCoordinates();
  mapCenterCoordinates.value = {...searchCoordinates.value}

  loadingLocation.value = false;
}

const filters = computed(() => {
  const filters = {}

  if (searchLocation.value?.id) {
    filters.locationId = searchLocation.value?.id;
  }
    
  if (searchCoordinates.value?.lat) {
    filters.lat = searchCoordinates.value?.lat;
  }

  if (searchCoordinates.value?.lng) {
    filters.lng = searchCoordinates.value?.lng;
  }
    
  if (modalFilters.value.searchFor) {
    filters.type = modalFilters.value.searchFor;
  }
  
  if (modalFilters.value.categories) {
    filters.categories = modalFilters.value.categories.map(category => parseInt(category));
  }
  
  if (searchString.value) {
    filters.search = searchString.value;
  }
  
  if (currentPage.value) {
    filters.page = currentPage.value;
  }

  if (modalFilters.value.onlyFavorites) {
    filters.onlyFavorites = 1;
  }    
  
  filters.perPage = ITEMS_PER_PAGE;

  return filters;
})

function applyFilters() {
  mapKey.value = Math.random().toString(15);
  mapResultItems.value = [];
  mapCenterCoordinates.value = {...searchCoordinates.value}

  if (filters.value.lat && filters.value.lng) {
    searchStore.setSearchCoordinates({
      lat: filters.value.lat,
      lng: filters.value.lng
    });
  }
  
  if (filters.value.locationId) {
    searchStore.getSearchLocation(filters.value.locationId);
  }

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
  loadingResult.value = false;
  if (![PRODUCT, PRODUCER].includes(modalFilters.value.searchFor)) {
    return false;
  }

  loadingResult.value = true;
  if (view.value == VIEW_LIST) {
    await getListSearchResult()
  }
  loadingResult.value = false;

  if (view.value == VIEW_MAP) {
    await getMapSearchResult()
  }

  loadingResult.value = false;
}

async function getListSearchResult () {
  loadingResult.value = true;

  var result = null;
  if (modalFilters.value.searchFor == PRODUCT) {
    result = await productsStore.listProducts({ ...filters.value, include: 'categories' });
  }
  if (modalFilters.value.searchFor == PRODUCER) {
    result = await producersStore.listProducers(filters.value);
  }
  
  setPaginationFromResult(result.data);
  resultItems.value = result.data.data
  loadingResult.value = false;
  getFavorites();
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
  mapCenterCoordinates.value = {
    lat: eventData.from.lat,
    lng: eventData.from.lng
  }
  mapMaxDistance.value = eventData.maxDistance;
  getMapSearchResult();
}

async function getMapSearchResult () {
  if (loadingMapResult.value) {
    //todo improve performance here :)
    return;
  }

  loadingMapResult.value = true;
  const mapFilters = {
    ...filters.value,
    paginate: 0,
    limit: 30000, //very high limit to ensure all items in the range will be fetch
    maxDistance: mapMaxDistance.value ? (mapMaxDistance.value + 500) : 5000,
    lat: mapCenterCoordinates.value.lat,
    lng: mapCenterCoordinates.value.lng,
    excludeIds: mapResultItems.value.map(item => item.id)
  }
  delete mapFilters.perPage;
  delete mapFilters.page;

  if (Math.abs(mapFilters.lat) > 180) {
    return;
  }
  if (Math.abs(mapFilters.lng) > 90) {
    return;
  }
  
  var result = null;
  if (modalFilters.value.searchFor == PRODUCT) {
    result = await productsStore.listProducts({ ...mapFilters, include: 'categories' });
  }
  if (modalFilters.value.searchFor == PRODUCER) {
    result = await producersStore.listProducers(mapFilters);
  }

  result.data.forEach(item => {
    mapResultItems.value.push(item)
  })

  getFavorites();
  loadingMapResult.value = false;
}

async function getFavorites() {
  const itemIds = [];
  if (view.value == VIEW_LIST) {
    resultItems.value.forEach(item => {
      itemIds.push(item.id)
    });
  }
  
  if (view.value == VIEW_MAP) {
    mapResultItems.value.forEach(item => {
      mapResultItems.value.push(item.id)
    });
  }

  const result = await favoritesStore.getFavorites(modalFilters.value.searchFor, itemIds);
  
  favoriteIds.value = result.map((item) => {
    return modalFilters.value.searchFor == PRODUCER ? item.producer_id : item.product_id;
  });

  if (view.value == VIEW_LIST) {
    resultItems.value = resultItems.value.map(item => {
      return {
        ...item,
        isFavorite: isFavorite(item.id)
      }
    });
  }
  
  if (view.value == VIEW_MAP) {
    mapResultItems.value = resultItems.value.map(item => {
      return {
        ...item,
        isFavorite: isFavorite(item.id)
      }
    });
  }
}

</script>

<template>
  <section class="w-100 d-flex flex-column">
    <SearchHeader :search-location="searchLocation" :loading-location="loadingLocation" :search="searchString"
      @apply-search-string="handleApplySearchString" />
    <SearchFilterModal @apply-filters="handleApplyModalFilters" :filters="modalFilters" />
    <SearchLocationModal @apply-location="handleApplyLocation" @apply-coordinates="handleApplyCoordinates" />
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
    <section class="d-flex flex-column align-items-center pt-3" v-if="!loadingResult && !resultItems.length && view == VIEW_LIST">
      <i class="bi bi-window icon-lg"></i>
      Nenhum resultado encontrado com esses filtros :(
    </section>
    <SearchProductsList
      v-if="modalFilters.searchFor == PRODUCT && view == VIEW_LIST && !loadingResult && resultItems.length"
      :items="resultItems" />
    <SearchProducersList
      v-if="modalFilters.searchFor == PRODUCER && view == VIEW_LIST && !loadingResult && resultItems.length"
      :items="resultItems" />
    <section v-if="view == VIEW_LIST" id="search-pagination" class="d-flex justify-content-center mt-3">
      <Pagination :current-page="pagination.currentPage" :total-pages="pagination.totalPages"
        @page-change="handlePageChange" />
    </section>
    <SearchResultMap v-if="view == VIEW_MAP && !loadingResult" :key="mapKey" :items="mapResultItems"
      :user-location="searchCoordinates" :item-type="modalFilters.searchFor" @max-distance-updated="handleMaxDistanceUpdated" />
  </section>
</template>
