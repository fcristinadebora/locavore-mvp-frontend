<script setup>
import { computed } from 'vue';
import Map from './Map.vue';
import { PRODUCT, PRODUCER } from "../enum/general";
import { fromMeterToKm } from "../helpers/measureUnits";
import { debounce } from "../helpers/debounce";

const props = defineProps(
    ['userLocation', 'items', 'itemType']
);

const emits = defineEmits(['maxDistanceUpdated'])

function handleMaxDistanceUpdated(eventData) {
    emits('maxDistanceUpdated', eventData);
}

const markers = computed(() => {
    if (!(props.items && props.items.length)) {
        return [];
    }
    
    return props.items.map(item => {
        const url = props.itemType == PRODUCER
            ? `/producer/${item.id}`
            : `/product/${item.id}`;
        
        const imgUrl =  props.itemType == PRODUCER ? item.profile_picture : item.image;

        const imgSrc = imgUrl ? `<img style="width:120px" class="border-radius ratio-16-9" src="${imgUrl}" />
            <br>` : '';
        const popup = `
            ${imgSrc}
            <br>
            <center><strong>${item.name}</strong><br>
                Distância: {distanceWildcard}<br><br>
                <a href='${url}' style='text-center'>Ver Detalhes</a>
            </center>`;
        
        return {
            id: item.id,
            popup,
            lat: item.address.location.coordinates[1],
            lng: item.address.location.coordinates[0],
        }
    });
})
</script>

<template>
    <Map :center="props.userLocation" :markers="markers" @max-distance-updated="handleMaxDistanceUpdated" />
</template>

<style lang="scss">
.leaflet-popup-content {
    max-width: 120px;
}
</style>