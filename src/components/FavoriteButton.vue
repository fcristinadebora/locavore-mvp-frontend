<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore, useFavoritesStore } from "../stores";
import MustLoginModal from "./MustLoginModal.vue";
import { openMustLoginModal } from './helpers/mustLoginModal';
import { PRODUCT, PRODUCER } from '../enum/general';
import LoadingSm from "./LoadingSm.vue";

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();

const isLoggedIn = computed(
  () => {
    return authStore.isLoggedIn()
  }
);

watch(
  () => isLoggedIn.value,
  () => fetchIsFavorite()
)

const isFavorite = ref(false);
const isLoading = ref(true);
const props = defineProps(['type', 'itemId']);

const hover = ref(false);

onMounted(() => {
  if (![PRODUCT, PRODUCER].includes(props.type)) {
    throw new Error('Invalid value for type prop');
  }

  fetchIsFavorite();
})

async function fetchIsFavorite() {
  if (!isLoggedIn.value) {
    isLoading.value = false;
    return false;
  }

  isFavorite.value = await favoritesStore.isFavorite(props.type, props.itemId);
  isLoading.value = false;
}

function toggleFavorite() {
  if (!isLoggedIn.value) {
    openMustLoginModal();
    return;
  }
  
  favoritesStore.toggleFavorite(props.type, props.itemId);
  isFavorite.value = !isFavorite.value;
}

const isHeartFilled = computed(() => isFavorite.value || hover.value);
</script>
<template>
  <LoadingSm v-if="isLoading" class="color-secondary" />
  <button class="no-border bg-transparent text-lg color-secondary" v-if="!isLoading" @click="toggleFavorite">
    <i
      class="bi favorite-icon"
      :class="isHeartFilled ? 'bi-heart-fill' : 'bi-heart'"
      @mouseover="hover = true"
      @mouseout="hover = false"
    ></i>
  </button>
  <MustLoginModal></MustLoginModal>
</template>
