<template>
  <TheLayout>
    <section id="register" class="py-3 container col-md-8 col-lg-4 col-xl-3 h-100">
      <RegisterType />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import RegisterType from "../components/RegisterType.vue";
</script>
