<template>
  <TheLayout>
    <section id="register" class="py-3 container d-flex flex-grow-1 h-100">
      <QuizCategories />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import QuizCategories from "../components/QuizCategories.vue";
</script>
