<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
import TheMain from "../components/TheMain.vue";

export default {
  name: "TheLayout",
  components: {
    TheHeader,
    TheFooter,
    TheMain,
  },
};
</script>

<template>
  <TheHeader />
  <TheMain></TheMain>
  <TheFooter />
</template>
