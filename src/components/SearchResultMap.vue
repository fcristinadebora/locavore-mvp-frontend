<script setup>
import { computed } from 'vue';
import Map from './Map.vue';
import { PRODUCT, PRODUCER } from "../enum/general";
import { fromMeterToKm } from "../helpers/measureUnits";

const props = defineProps(
    ['userLocation', 'items', 'itemType']
);

const emits = defineEmits(['maxDistanceUpdated'])

function handleMaxDistanceUpdated(eventData) {
    emits('maxDistanceUpdated', eventData);
}

const markers = computed(() => {
    if (!props.items) {
        return [];
    }
    
    return props.items.map(item => {
        const url = props.itemType == PRODUCER
            ? `/producer/${item.id}`
            : `/product/${item.id}`;
        
        const popup = `
            <img style="width:100%" class="border-radius" src="${item.image}" />
            <br>
            <br>
            <center><strong>${item.name}</strong><br>
                Distância: ${fromMeterToKm(item.address.distance)}km<br><br>
                <a href='${url}' style='text-center'>Ver Detalhes</a>
            </center>`;
        
        return {
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