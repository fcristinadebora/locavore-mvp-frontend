<script setup>
import Autocomplete from "vue3-autocomplete";
import InputSearchLocation from "./InputSearchLocation.vue";
import { useSearchStore } from "../stores";

import { ref } from "vue";
import { useRouter } from "vue-router";

const searchStore = useSearchStore();

const router = useRouter();
const selectedLocation = ref(null);

function handleOnSelectLocation(event) {
  selectedLocation.value = event;
}

function handleSearchSubmit(event) {
  if (!selectedLocation.value) {
    return;
  }

  searchStore.setSearchLocation(selectedLocation.value);

  router.push({
    path: "/search/location",
    query: {
      locationId: selectedLocation.value.id
    }
  });
}
</script>
<template>
  <section
    id="search"
    class="d-flex flex-column justify-content-center text-center py-4"
  >
    <div class="container">
      <form @submit.prevent="handleSearchSubmit">
        <InputSearchLocation @location-selected="handleOnSelectLocation" />
        <button class="btn button-primary w-100 mt-1">Buscar</button>
      </form>
    </div>
  </section>
</template>