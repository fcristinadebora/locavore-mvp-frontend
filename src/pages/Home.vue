<template>
  <TheLayout>
    <HomeHero />
    <HomeSearch />
    <CategoriesCarousel />
    <HomeManufacturersVue />
  </TheLayout>
</template>

<script>
import TheLayout from "../layouts/TheLayout.vue";
import HomeHero from "../components/HomeHero.vue";
import HomeSearch from "../components/HomeSearch.vue";
import CategoriesCarousel from "../components/CategoriesCarousel.vue"
import HomeManufacturersVue from "../components/HomeManufacturers.vue";

export default {
  components: {
    TheLayout,
    HomeHero,
    HomeSearch,
    CategoriesCarousel,
    HomeManufacturersVue
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables";

.hero{
  flex: 2;
  font-size: $size-text-lg;
  
  h1 {
    font-weight: bold;
    color: $color-brand-primary;
  }

  p {
    color: $color-brand-primary-light;
  }
}

.hero_btn-start {
  align-self: center;
}
</style>