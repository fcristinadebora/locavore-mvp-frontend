<template>
  <TheLayout>
    <section id="register" class="py-3 container col-md-8 col-lg-8 d-flex flex-grow-1 h-100">
      <QuizForm />
    </section>
  </TheLayout>
</template>

<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import QuizForm from "../components/QuizForm.vue";
</script>
