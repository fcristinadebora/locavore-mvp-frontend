<script setup>
import Autocomplete from "vue3-autocomplete";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCitiesStore } from '../stores';
import localStorageHelper from '../helpers/localStorage';

const maxCities = ref(10);
const router = useRouter();
const cities = ref([]);
const citiesStore = useCitiesStore();
const selectedCity = ref(null);

async function getCities(searchString) {
  if (searchString.length < 3) {
    return false;
  }

  cities.value = await citiesStore.searchCity(searchString, maxCities.value);
}

function handleSearchSubmit(event) {
  if (!selectedCity.value) {
    return;
  }

  localStorageHelper.setSearchSelectedCity(selectedCity.value);

  router.push({
    path: "/search/location",
    query: {
      locationId: selectedCity.value.id
    }
  });
}

function getCityName(city) {
  return city.name;
}

function selectCity(city) {
  selectedCity.value = city;
}
</script>
<template>
  <section
    id="search"
    class="d-flex flex-column justify-content-center text-center py-4"
  >
    <div class="container">
      <form @submit.prevent="handleSearchSubmit">
        <Autocomplete
          @input="getCities"
          @onSelect="selectCity"
          :results="cities"
          :debounce="150"
          :display-item="getCityName"
          :max="maxCities"
          input-class="form-control text-center mb-1"
          placeholder="Digite o local onde buscar"
          results-container-class="results-container border-radius w-100"
          results-item-class="result-item my-2"
        ></Autocomplete>
        <button class="btn button-primary w-100 mt-1">Buscar</button>
      </form>
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.results-container {
  background-color: white;
  position: absolute;
  z-index: 99;
  border: 1px solid $default-border-color;
  max-height: 70vh;
  overflow: auto;
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
}

.result-item {
  color: $color-brand-primary;
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
}
</style>