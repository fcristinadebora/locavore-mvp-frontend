<script setup>
import TheLayout from "../layouts/TheLayout.vue";
import HomeHero from "../components/HomeHero.vue";
import HomeSearch from "../components/HomeSearch.vue";
import HomeCategories from "../components/HomeCategories.vue";
import HomeManufacturers from "../components/HomeManufacturers.vue";
import HomeProducts from "../components/HomeProducts.vue";
import HomeTestimonials from "../components/HomeTestimonials.vue";
import HomeNewsletter from "../components/HomeNewsletter.vue";
</script>

<template>
  <TheLayout>
    <HomeHero />
    <HomeSearch />
    <HomeCategories />
    <HomeManufacturers />
    <HomeProducts />
    <HomeTestimonials />
    <HomeNewsletter />
  </TheLayout>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.hero {
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
