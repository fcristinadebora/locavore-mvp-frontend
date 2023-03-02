<script setup>
const props = defineProps(['items', 'loading']);
</script>

<template>
  <section id="search-producers-title" class="mt-3">
    <h1 class="text-center fw-bold color-primary">
      Resultados em <span class="color-secondary fw-bold">Produtores</span>
    </h1>
  </section>
  <section id="search-producers-items" class="row">
    {{ props.items }}
    <div
      class="search-item-wrapper col-lg-6"
      v-for="(producer, index) in props.items"
      :key="index"
    >
      <router-link
        class="search-producer-item p-3 my-3 cursor-pointer d-flex flex-column flex-sm-row bg-custom-light border-radius color-text-default"
        :to="`/producer/${producer.id}`"
      >
        <div class="search-producer-img mb-3 mb-sm-0">
          <img class="border-radius" :src="producer.img" alt="" />
        </div>
        <div class="search-producer-data ps-3">
          <h3 class="text-normal color-primary text-bold w-100 mb-0">
            {{ producer.name }}
          </h3>
          <p class="text-sm color-secondary mb-2">
            {{ producer.category }}
          </p>
          <p class="">
            {{ producer.shortDescription }}
          </p>
          <p class="color-secondary mb-0">
            {{ producer.distance }} de distância
          </p>
          <p class="mb-0">
            <i class="bi bi-geo"></i>
            {{ producer.address }}<br />
          </p>
        </div>
      </router-link>
    </div>
  </section>
  <section
    id="search-producers-pagination"
    class="d-flex justify-content-center mt-3"
  >
    <Pagination />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_variables";

.search-producer-item {
  text-decoration: none;
  color: $color-brand-primary-light;
  &:hover {
    color: $color-brand-primary-light;

    p,
    span {
      font-weight: bold;
    }
  }

  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    overflow: hidden;

    @media (max-width: 576px) {
      width: 100%;
      height: 250px;
      object-fit: cover;
      overflow: hidden;
    }

    @media (min-width: 576.1) and (max-width: 768px) {
      width: 200px;
      height: 200px;
      object-fit: cover;
      overflow: hidden;
    }
  }
}
</style>
