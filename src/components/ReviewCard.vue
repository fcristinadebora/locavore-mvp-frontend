<script setup>
import { toDate } from '../helpers/locale';
import FiveStars from './FiveStars.vue';

const props = defineProps(['review']);
</script>

<template>
    <article class="bg-light border-radius p-3 text-start w-100">
        <p class="color-primary text-bold d-flex justify-content-between">
            {{ props.review.person.name }}
            <span>{{ toDate(props.review.created_at) }}</span>
        </p>

        <strong class="color-default me-2">Avaliação:</strong>
        <FiveStars :rate="props.review.rate" />
        <p class="color-default" v-if="props.review.comment">
            <strong>Comentários:</strong>
            {{ props.review.comment }}
        </p>
    </article>
</template>