<script setup>
import Autocomplete from "./lib/autocomplete/Autocomplete.vue";

import { ref, computed } from "vue";
import { useCitiesStore, useSearchStore } from '../stores';

const emit = defineEmits(['locationSelected']);
const props = defineProps(['selected-location'])
const maxCities = ref(10);
const cities = ref([]);
const citiesStore = useCitiesStore();
const searchStore = useSearchStore();
const selectedLocation = ref(null);

selectedLocation.value = props.selectedLocation ?? null;

const selectedLocationText = computed(() => {
  return props.selectedLocation ? props.selectedLocation.name : ''
});

async function getCities(searchString) {
  if (searchString.length < 3) {
    return false;
  }

  cities.value = await citiesStore.searchCity(searchString, maxCities.value);
}

function getCityName(city) {
  return city.name;
}

function selectLocation(city) {
  selectedLocation.value = city;
  emit('locationSelected', selectedLocation.value);
}
</script>

<template>
    <Autocomplete
        @input="getCities"
        @onSelect="selectLocation"
        :results="cities"
        :debounce="150"
        :display-item="getCityName"
        :max="maxCities"
        :input-class="['form-control','text-center','mb-1']"
        placeholder="Digite o local onde buscar"
        :results-container-class="['results-container', 'border-radius', 'w-100']"
        :results-item-class="['result-item','my-2']"
        :current-value="selectedLocationText"
     />
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.results-container {
  background-color: white;
  position: absolute;
  z-index: 99;
  border: 1px solid $default-border-color;
  max-height: 70vh;
  top: 40px;
  overflow: auto;
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
}

.result-item {
  color: $color-brand-primary;
  text-align: center;
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
}
</style>