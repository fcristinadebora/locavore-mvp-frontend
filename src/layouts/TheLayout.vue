<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import TheMain from "../components/TheMain.vue";
import TheSidebar from '../components/TheSidebar.vue'

export default {
  name: "TheLayout",
  components: {
    TheHeader,
    TheFooter,
    TheMain,
    TheSidebar,
  },
};
</script>

<template>
  <TheHeader />
  <TheSidebar />
  <TheMain>
    <slot></slot>
  </TheMain>
  <TheFooter />
</template>
