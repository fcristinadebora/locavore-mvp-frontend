<script setup>
import MustLoginModal from './MustLoginModal.vue';
import CreateReviewModal from './CreateReviewModal.vue';
import { openModal } from './helpers/modal';
import { useAuthStore, useReviewsStore } from '../stores';
import { ref, onMounted } from 'vue';
import FiveStars from './FiveStars.vue';
import ReviewsListModal from './ReviewsListModal.vue';
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import ReviewCard from './ReviewCard.vue';

const props = defineProps(['averageRate', 'itemId', 'type']);
const authStore = useAuthStore();
const reviewsStore = useReviewsStore();

const reviews = ref({
    loading: true,
    items: []
});
const alreadyReviewed = ref(false);

onMounted(() => {
    getRecentReviews();
    getPersonReview();
})

function openReviewModal() {
  if (!authStore.isLoggedIn()) {
    openModal('must-login-modal');
    return;
  }
  
  openModal('create-review-modal');
}

function opneListModal() {
    openModal('reviews-list-modal');
}

async function getRecentReviews() {
    reviews.value.loading = true;

    try {
        const filters = {
            limit: 5
        }

        const data = await reviewsStore.getReviews(props.type, props.itemId, filters)
        reviews.value.items = data;
    } catch (error) {
        console.error(error)        
    } finally {
        reviews.value.loading = false;
    }
}

async function getPersonReview () {
    try {
        const user = authStore.loggedUser;
        
        if (!user) {
            alreadyReviewed.value = false;
            return;
        }
        
        const filters = {
            limit: 5,
            personId: user.person.id
        }

        const data = await reviewsStore.getReviews(props.type, props.itemId, filters);

        alreadyReviewed.value = data.length > 0;
    } catch (error) {
        console.error(error)        
        alreadyReviewed.value = false;
    } finally {
    }
}
</script>

<template>
    <h4 class="mt-5 d-flex justify-content-between mb-3">
        <span>
            <div class="w-100 text-bold">
                Avaliações
            </div>
            <span class="text-normal" v-if="props.averageRate != undefined">
                <FiveStars :rate="props.averageRate" /> {{ props.averageRate ? props.averageRate.toFixed(1) : '' }}
            </span>
            <span class="text-normal" v-if="props.averageRate == undefined">
                Nenhuma avaliação registrada, seja o primeiro(a)!
            </span>
        </span>

        <button class="btn button-primary" @click="openReviewModal" :disabled="alreadyReviewed">
            {{ alreadyReviewed ? 'Já avaliado' : 'Avaliar' }}
        </button>
    </h4>
    
    <carousel
    :snap-align="'start'"
    v-if="reviews.items.length"
    id="products-carousel"
  >
    <slide
     v-for="(review, index) in reviews.items"
      class="p-0"
      :key="index"
    >
        <ReviewCard :review="review" />
    </slide>

    <template #addons>
      <div class="d-flex mt-2 px-1 justify-content-center align-items-center">
        <navigation />
        <pagination />
      </div>
    </template>
  </carousel>

    <button v-if="reviews.items.length" @click="opneListModal()" class="btn button-secondary--light w-100 mt-3">Ver todas</button>
    <MustLoginModal />
    <CreateReviewModal :type="props.type" :item-id="props.itemId" />
    <ReviewsListModal  :type="props.type" :item-id="props.itemId" />
</template>