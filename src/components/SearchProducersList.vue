<script setup>
import { fromMeterToKm } from "../helpers/measureUnits";
import ProducerCard from "./ProducerCard.vue";

const props = defineProps(['items', 'loading']);
</script>

<template>
  <section id="search-producers-title" class="mt-3">
    <h1 class="text-center fw-bold color-primary">
      Resultados em <span class="color-secondary fw-bold">Produtores</span>
    </h1>
  </section>
  <section id="search-producers-items" class="row">
    <div
      class="search-item-wrapper col-lg-6"
      v-for="(producer, index) in props.items"
      :key="index"
    >
      <router-link
        class="card-link"
        :to="`/producer/${producer.id}`"
      >
        <ProducerCard :producer="producer"/>
      </router-link>
    </div>
  </section>
</template>