<script setup>
import { PRODUCER } from '../enum/general';
import { fromMeterToKm } from '../helpers/measureUnits';
import FavoriteButton from './FavoriteButton.vue';

const props = defineProps(['producer'])
</script>
<template>
    <section v-if="props.producer" class="w-100 search-producer-item p-3 my-3 cursor-pointer d-flex flex-column flex-sm-row bg-light border-radius color-text-default">
      <router-link
        class="card-link mb-3 mb-sm-0 d-flex justify-content-center align-items-center search-item-image-placeholder"
        :to="`/producer/${props.producer.id}`"
      >
          <img class="border-radius" :src="props.producer.profile_picture" alt="Imagem do produtor" v-if="props.producer.profile_picture" />
          <i class="bi bi-image icon-lg" v-if="!props.producer.profile_picture"></i>
        </router-link>
          <div class="search-producer-data ps-3 color-default flex-grow-1">
          <h3 class="w-100 mb-0 d-flex justify-content-between align-items-center">
            <router-link class="card-link text-normal color-primary text-bold flex-grow-1" :to="`/producer/${props.producer.id}`">
                  {{ props.producer.name }}
              </router-link>
              <FavoriteButton :type="PRODUCER" :item-id="props.producer.id" :is-favorite="props.producer.isFavorite ?? false" />
          </h3>
          <router-link class="card-link" :to="`/producer/${props.producer.id}`">
          <p class="color-secondary mb-2" v-if="props.producer.categories">
            {{ props.producer.categories.slice(0,3).map((category) => category.name).join(', ') }} {{ props.producer.categories.length > 3 ? 'e mais' : '' }}
          </p>
          <p class="color-default">
            {{ props.producer.short_description }}
          </p>
          <p class="color-secondary mb-0" v-if="props.producer.address && props.producer.address.distance">
            {{ fromMeterToKm(props.producer.address.distance) }} km de distância
          </p>
          <p class="mb-0" v-if="props.producer.address">
            <i class="bi bi-geo"></i>
            {{ props.producer.address.address }}
          </p>
        </router-link>
        </div>
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
