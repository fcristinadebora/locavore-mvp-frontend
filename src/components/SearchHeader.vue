<script setup>
import { ref, watch } from 'vue';

const emits = defineEmits(['applySearchString']);
const props = defineProps(['search-location', 'search']);
const searchString = ref('');

watch(
  () => props.search,
  search => {
    searchString.value = search ?? ''
  }
)

function submitSearchString() {
  emits('applySearchString', searchString.value)
}
</script>
<template>
  <section id="search-result-header">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control border-radius-important"
        placeholder="Buscar por"
        v-on:keyup.enter="submitSearchString"
        v-model="searchString"
      />
      <button
        class="btn button-secondary border-radius-important m-l-1-important"
        type="button"
        @click="submitSearchString"
      >
        <i class="bi bi-search"></i>
      </button>
      <button
        class="btn button-secondary--light border-radius-important m-l-1-important"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#search-filter-modal"
      >
        <i class="bi bi-funnel"></i>
      </button>
    </div>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control border-radius-important"
        :placeholder="props.searchLocation ? `Próximo de ${props.searchLocation.name}` : 'Carregando...'"
      />
      <button
        class="btn button-secondary--light border-radius-important m-l-1-important"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#search-location-modal"
      >
        Alterar <i class="bi bi-geo"></i>
      </button>
    </div>
  </section>
</template>
