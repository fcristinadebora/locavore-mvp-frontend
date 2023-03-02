<script setup>
import * as bootstrap from "bootstrap";
import InputSearchLocation from './InputSearchLocation.vue';
import Map from './Map.vue';
import { ref, onMounted } from 'vue';
import { useSearchStore } from '../stores';
import { useRoute, useRouter } from 'vue-router';

const searchStore = useSearchStore();
const props = defineProps(['searchLocation']);
const route = useRoute();
const router = useRouter();
const emit = defineEmits(['applyLocation', 'applyCoordinates']);

const isModalOpen = ref(false);
const searchLocation = ref(null);
const loadingLocation = ref(true);
const searchCenterCoordinates = ref(null);
const searchLocationModal = ref(null);

searchLocation.value = props.searchLocation;

onMounted(() => {
  loadLocation();
  listenModalOpen();
});

function handleOnSelectLocation(event) {
  searchLocation.value = event;
  const location = { ...searchLocation.value.location.coordinates }
  searchCenterCoordinates.value = { lat: location[1], lng: location[0] }
}

function listenModalOpen () {
  searchLocationModal.value.addEventListener('shown.bs.modal', () => {
    isModalOpen.value = true;
  });

  searchLocationModal.value.addEventListener('hidden.bs.modal', () => {
    isModalOpen.value = false;
  });
}

async function loadLocation() {
  loadingLocation.value = true;
  searchLocation.value = await searchStore.getSearchLocation();
  searchCenterCoordinates.value = { lat: route.query.lat, lng: route.query.lng }
  console.log(searchCenterCoordinates.value);
  setMapCenter(searchCenterCoordinates.value.lat, searchCenterCoordinates.value.lng);
  loadingLocation.value = false;
}

function setMapCenter(lat, lng) {
  searchCenterCoordinates.value = {
    lat, lng
  };
}

function handleMainMarkerMoved (newPosition) {
  searchCenterCoordinates.value = { ...newPosition };
}

function applySearchLocation(event) {
  if (!searchLocation.value) {
    return;
  }

  const modal = document.getElementById("search-location-modal");
  const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
  bsModal.hide();
  emit("applyLocation", searchLocation.value);
  emit("applyCoordinates", searchCenterCoordinates.value);
}
</script>

<template>
    <div
    class="modal my-modal"
    ref="searchLocationModal"
    tabindex="-1"
    id="search-location-modal"
  >
    <div class="modal-dialog container">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            Alterar local de busca
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="closeModal"
            ></button>
          </h5>
        </div>
        <div class="modal-body">
          <div class="form-group mb-2">
            <label class="w-100"> Buscar em: </label>
            <InputSearchLocation  @location-selected="handleOnSelectLocation" :selected-location="searchLocation" />
          </div>

          <div class="form-group mb-2">
            <label class="w-100">Confirmar localização: </label>
            <p class="text-sm">Segure e arraste o marcador para definir o ponto de referência para sua busca</p>
            <Map class="search-modal-map-container" v-if="searchLocation && isModalOpen" :center="searchCenterCoordinates"  @main-marker-moved="handleMainMarkerMoved" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="applySearchLocation"
            type="button"
            class="btn button-primary w-100"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.search-modal-map-container {
  max-height: 50vh;
}
</style>