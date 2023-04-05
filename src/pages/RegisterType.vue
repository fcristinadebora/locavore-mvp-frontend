<template>
  <TheLayout>
    <section id="register" class="py-3 container col-md-8 col-lg-6 col-xl-4 h-100">
      <RegisterType />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import RegisterType from "../components/RegisterType.vue";
</script>
