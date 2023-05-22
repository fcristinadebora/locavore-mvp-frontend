<template>
  <TheLayout>
    <section id="register" class="py-3 container col-md-8 col-lg-6 col-xl-4 d-flex flex-grow-1 h-100">
      <AddressForm />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import AddressForm from "../components/AddressForm.vue";
</script>
