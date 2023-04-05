<script setup>
import LoadingSm from './LoadingSm.vue';

const props = defineProps([
    'label', 'loading', 'class'
])
</script>

<template>
    <button type="submit" :class="`btn ${props.class ?? 'button-primary'}`" :disabled="props.loading">
        {{ props.label ?? 'Enviar' }}
        <LoadingSm v-if="props.loading" />
    </button>
</template>