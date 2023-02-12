<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useCitiesStore } from "../stores";

import localStorageHelper from '../helpers/localStorage'; 

import Map from "./Map.vue";

const citiesStore = useCitiesStore();
const route = useRoute();
const locationId = ref('');
const mapCenter = ref(null);
const loadingLocation = ref(true);

locationId.value = route.query.locationId ?? 0;
if (!locationId.value) {
  console.error("todo handle not informed locationId");
}

onMounted(() => {
  loadLocation();
})

async function loadLocation() {
  const locationFromStorage = localStorageHelper.getSearchSelectedCity();
  if (locationFromStorage) {
    console.log('found on local storage', locationFromStorage);
    setMapCenter(locationFromStorage.location.coordinates[1], locationFromStorage.location.coordinates[0]);
    loadingLocation.value = false;
    return;
  }

  const locationFromStore = await citiesStore.findCity(locationId.value);
  if (locationFromStore) {
    setMapCenter(locationFromStore.location.coordinates[1], locationFromStore.location.coordinates[0]);
    loadingLocation.value = false;
  }
}

function setMapCenter(lat, lng) {
  mapCenter.value = {
    lat, lng
  }
}

</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="search-map">
      <section>
        <h1 class="color-primary fw-bold text-center">Confirmar localização</h1>
      </section>
      <section id="search-map-map" class="map-container d-flex justify-content-center align-items-center">
        <Map :center="mapCenter" v-if="!loadingLocation"/>

        <div class="loading text-center"  v-if="loadingLocation">
          <div class="spinner-border color-secondary mb-2 loading-lg" role="status"></div>
          <div class="">Carregando localização...</div>
        </div>
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
