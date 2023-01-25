<template>
  <section
    id="quiz-steps-navigation"
    class="d-flex justify-content-between"
  >
    <button class="btn button-secondary--light" @click="$emit('prevStep')">
      Voltar etapa
    </button>
    <button class="btn button-secondary--light" @click="$emit('nextStep')">
      Pular
    </button>
  </section>
</template>
