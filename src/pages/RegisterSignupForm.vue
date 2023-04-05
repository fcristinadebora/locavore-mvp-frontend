<template>
  <TheLayout>
    <section id="register" class="py-3 container col-md-8 col-lg-6 col-xl-4 h-100">
      <SignupForm />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import SignupForm from "../components/SignupForm.vue";
</script>
