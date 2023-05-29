<script setup>
import { PRODUCT } from "../enum/general";
import { toMoney } from "../helpers/locale";
import { fromMeterToKm } from "../helpers/measureUnits";
import FavoriteButton from "./FavoriteButton.vue";
const props = defineProps(['product']);

</script>
<template>
        <article class="w-100 search-product-item p-3 my-3 cursor-pointer d-flex flex-column flex-sm-row bg-light border-radius">
            <router-link class="card-link search-product-img mb-3 mb-sm-0 d-flex justify-content-center align-items-top search-item-image-placeholder" :to="`/product/${props.product.id}`">
                <img class="border-radius" :src="props.product.image" alt="Imagem do produto" v-if="props.product.image" />
                <i class="bi bi-image icon-lg" v-if="!props.product.image"></i>
            </router-link>
            <div class="search-product-data ps-3 color-default text-start flex-grow-1">
                <h3 class=" w-100 mb-0 d-flex justify-content-between align-items-center">
                    <router-link class="card-link text-normal color-primary text-bold flex-grow-1" :to="`/product/${props.product.id}`">
                        {{ props.product.name }}
                    </router-link>
                    <FavoriteButton :type="PRODUCT" :item-id="props.product.id" :is-favorite="props.product.isFavorite ?? false" />
                </h3>
                <router-link class="card-link" :to="`/product/${props.product.id}`">
                <p class="text-normal color-secondary mb-2" v-if="props.product.categories">
                    {{ props.product.categories.slice(0,3).map((category) => category.name).join(', ') }} {{ props.product.categories.length > 3 ? 'e mais' : '' }}
                </p>
                <p class="text-normal fw-bold mb-2">
                    {{ toMoney(props.product.price) }}<span class="text-normal"><span v-if="props.product.unit_of_price">/{{ props.product.unit_of_price }}</span></span>
                </p>
                <p class="color-secondary mb-0" v-if="props.product.address?.distance != null">
                    {{ fromMeterToKm(props.product.address?.distance) }} km de distância
                </p>
                <p class="mb-0">
                    <i class="bi bi-geo"></i>
                    {{ props.product.address?.address }}<br />
                </p>
                </router-link>
            </div>
        </article>
</template>