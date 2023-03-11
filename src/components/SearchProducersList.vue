<script setup>
import ProducerCard from "./ProducerCard.vue";

const props = defineProps(['items', 'loading']);
</script>

<template>
  <section id="search-producers-items" class="row" v-if="props.items">
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