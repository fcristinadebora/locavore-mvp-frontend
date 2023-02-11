<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import TheMain from "../components/TheMain.vue";
import TheSidebar from "../components/TheSidebar.vue";
import TheAuth from '../components/TheAuth.vue';
</script>

<template>
  <TheAuth />
  <TheHeader />
  <TheSidebar />
  <TheMain>
    <slot></slot>
  </TheMain>
  <TheFooter />
</template>
