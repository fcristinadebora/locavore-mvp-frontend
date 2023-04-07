<template>
  <TheLayout>
    <section id="register" class="py-3 container col-md-8 col-lg-8 d-flex flex-grow-1 h-100">
      <AccountProductForm />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import AccountProductForm from "../components/AccountProductForm.vue";
</script>
