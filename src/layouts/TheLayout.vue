<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import TheMain from "../components/TheMain.vue";
import TheSidebar from "../components/TheSidebar.vue";
</script>

<template>
  <TheHeader />
  <TheSidebar />
  <TheMain>
    <slot></slot>
  </TheMain>
  <TheFooter />
</template>
