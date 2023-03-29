<script setup>
import * as bootstrap from "bootstrap";
import { computed, onMounted, ref } from 'vue';
import { useReviewsStore } from '../stores';
import { useRoute, useRouter } from 'vue-router';
import LoadingSm from "./LoadingSm.vue";
import Pagination from "./Pagination.vue";
import ReviewCard from "./ReviewCard.vue";

const route = useRoute();
const router = useRouter();

const tempRating = ref(0);
const reviewsStore = useReviewsStore();
const props = defineProps(['itemId', 'type']);
const reviews = ref({
  loading: true,
  items: null,
  currentPage: 1
});
const pagination = ref({});

onMounted(() => {
  getPageItems();
})

async function getPageItems () {
  reviews.value.loading = true;

  const result = await reviewsStore.getReviews(props.type, props.itemId, { paginate: 1, page: reviews.value.currentPage, include: 'categories' });
  
  setPaginationFromResult(result);
  reviews.value.items = result.data
  reviews.value.loading = false;
}

function setPaginationFromResult(resultData) {
  pagination.value = {
    currentPage: resultData.current_page,
    totalPages: resultData.last_page
  }
}

function handlePageChange(newPage) {
  reviews.value.currentPage = newPage;
  getPageItems();
}

</script>

<template>
    <div
    class="modal my-modal"
    tabindex="-1"
    id="reviews-list-modal"
  >
    <div class="modal-dialog d-flex container">
      <div class="modal-content d-flex flex-grow-1">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            Avaliações
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="closeModal"
            ></button>
          </h5>
        </div>
        <div class="modal-body text-left color-default">
          <ReviewCard v-for="(review, index) in reviews.items" :key="index" :review="review" class="my-2" />
        </div>
        <div class="modal-footer justify-content-center">
          <Pagination :current-page="pagination.currentPage" v-if="reviews.items != null" :total-pages="pagination.totalPages"
            @page-change="handlePageChange" />
        </div>
    </div>
    </div>
  </div>
</template>