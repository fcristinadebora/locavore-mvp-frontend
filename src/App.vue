<script setup>
import { watch } from "vue";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
import { closeBackdrops } from "./components/helpers/modal";

const route = useRoute();

watch(
  () => route.path,
  () => closeBackdrops()
);

</script>

<template>
  <RouterView />
</template>
