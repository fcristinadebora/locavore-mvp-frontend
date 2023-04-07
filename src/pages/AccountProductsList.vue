<template>
  <TheLayout>
    <section id="register" class="py-3 container col-md-12 d-flex flex-grow-1 h-100">
      <AccountProductsList />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import AccountProductsList from "../components/AccountProductsList.vue";
</script>
