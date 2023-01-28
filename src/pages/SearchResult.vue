<template>
  <TheLayout>
    <section id="register" class="py-3 container d-flex flex-grow-1 h-100">
      <SearchResult />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import SearchResult from "../components/SearchResult.vue";
</script>

<style lang="scss">
@import "@/assets/scss/_variables";
</style>
