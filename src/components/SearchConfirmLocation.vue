<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useSearchStore } from "../stores";

import Map from "./Map.vue";
import LoadingLg from "./LoadingLg.vue";

const searchStore = useSearchStore();
const route = useRoute();
const router = useRouter();

const locationId = ref('');
const mapCenter = ref(null);
const loadingLocation = ref(true);
const searchCenterCoordinates = ref(null);

locationId.value = route.query.locationId ?? 0;
if (!locationId.value) {
  console.error("todo handle not informed locationId");
}

onMounted(() => {
  loadLocation();
})

async function loadLocation() {
  loadingLocation.value = true;
  const searchLocation = await searchStore.getSearchLocation();
  setMapCenter(searchLocation.location.coordinates[1], searchLocation.location.coordinates[0]);
  loadingLocation.value = false;
}

function setMapCenter(lat, lng) {
  mapCenter.value = {
    lat, lng
  }
  searchCenterCoordinates.value = { ...mapCenter.value };
}

function handleMainMarkerMoved (newPosition) {
  searchCenterCoordinates.value = { ...newPosition };
}

function gotoNextStep () {
  router.push({ path: '/search/result', query: {
    lat: searchCenterCoordinates.value.lat,
    lng: searchCenterCoordinates.value.lng,
    locationId: locationId.value
  }});
}
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="search-map">
      <section>
        <h1 class="color-primary fw-bold text-center">Confirmar localização</h1>
        <p class="text-center">Segure e arraste o marcador para definir o ponto de referência para sua busca</p>
      </section>
      <section id="search-map-map" class="map-container d-flex justify-content-center align-items-center">
        <Map :center="mapCenter" v-if="!loadingLocation" @main-marker-moved="handleMainMarkerMoved" />

        <div class="loading justify-content-center d-flex flex-column align-items-center"  v-if="loadingLocation">
          <LoadingLg />
          Carregando localização...
        </div>
      </section>
      <button
        type="button"
        @click="gotoNextStep"
        class="btn button-primary mt-3 mb-5 w-100"
      >
        Continuar
      </button>
    </section>
  </section>
</template>
