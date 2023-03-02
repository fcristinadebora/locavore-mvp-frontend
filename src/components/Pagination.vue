<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import { computed } from 'vue';

const props = defineProps(['totalPages', 'currentPage'])
const emits = defineEmits(['pageChange']);

const currentPage = computed(() => props.currentPage ?? 1)

function updateHandler(newPage) {
  emits('pageChange', newPage)
}
</script>

<template>
  <VPagination
    v-if="props.totalPages"
    v-model="currentPage"
    :pages="props.totalPages"
    :range-size="1"
    active-color="#DCEDFF"
    @update:modelValue="updateHandler"
  />
</template>
