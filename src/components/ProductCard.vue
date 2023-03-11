<script setup>
import { toMoney } from "../helpers/locale";
import { fromMeterToKm } from "../helpers/measureUnits";
const props = defineProps(['product'])

</script>
<template>
    <router-link class="card-link" :to="`/product/${props.product.id}`">
        <article class="search-product-item p-3 my-3 cursor-pointer d-flex flex-column flex-sm-row bg-light border-radius">
            <div class="search-product-img mb-3 mb-sm-0 d-flex justify-content-center align-items-center search-item-image-placeholder">
                <img class="border-radius" :src="props.product.image" alt="Imagem do produto" v-if="props.product.image" />
                <i class="bi bi-image icon-lg" v-if="!props.product.image"></i>
            </div>
            <div class="search-product-data ps-3 color-default text-start">
                <h3 class="text-normal color-primary text-bold w-100 mb-0">
                {{ props.product.name }}
                </h3>
                <p class="text-normal color-secondary mb-2" v-if="props.product.categories">
                    {{ props.product.categories.slice(0,3).map((category) => category.name).join(', ') }} {{ props.product.categories.length > 3 ? 'e mais' : '' }}
                </p>
                <p class="text-normal fw-bold mb-2">
                {{ toMoney(props.product.price) }}<span class="text-normal"><span v-if="props.product.priceUnit">/{{ props.product.priceUnit }}</span></span>
                </p>
                <p class="color-secondary mb-0" v-if="props.product.address.distance != null">
                {{ fromMeterToKm(props.product.address.distance) }} km de distância
                </p>
                <p class="mb-0">
                <i class="bi bi-geo"></i>
                {{ props.product.address.address }}<br />
                </p>
            </div>
        </article>
    </router-link>
</template>