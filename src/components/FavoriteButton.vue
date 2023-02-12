<script setup>
import { ref, computed } from "vue";

const props = defineProps("isFavorite");

const isFavorite = ref(props.isFavorite ?? false);
const hover = ref(false);

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}

const isHeartFilled = computed(() => isFavorite.value || hover.value);
</script>
<template>
  <button class="no-border text-lg color-secondary" @click="toggleFavorite">
    <i
      class="bi favorite-icon"
      :class="isHeartFilled ? 'bi-heart-fill' : 'bi-heart'"
      @mouseover="hover = true"
      @mouseout="hover = false"
    ></i>
  </button>
</template>
