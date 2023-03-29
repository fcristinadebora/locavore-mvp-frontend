<script setup>
import * as bootstrap from "bootstrap";
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '../stores';
import { useRoute, useRouter } from 'vue-router';
import LoadingSm from "./LoadingSm.vue";
import { useReviewsStore } from '../stores';

const route = useRoute();
const router = useRouter();

const tempRating = ref(0);
const reviewsStore = useReviewsStore();
const props = defineProps(['itemId', 'type']);

const form = ref({
    loading: false,
    data: {
        rate: 0,
        comment: ''
    }
})

function getStarClass(starIndex) {
    if (!tempRating.value) {
        return form.value.data.rate >= starIndex ? 'bi-star-fill' : 'bi-star';
    }

    return tempRating.value >= starIndex ? 'bi-star-fill' : 'bi-star';
}

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    await reviewsStore.createReview(
        props.type,
        props.itemId,
        {
        rate: form.value.data.rate,
        comment: form.value.data.comment,
        }
    );

    router.go(0);
  } catch (e) {
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}
</script>

<template>
    <div
    class="modal my-modal"
    tabindex="-1"
    id="create-review-modal"
  >
    <div class="modal-dialog container">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            Enviar avaliação
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
            <div class="form-group mb-2">
                <label class="me-2">Nota: </label>
                <i @mouseover="tempRating = i"
                    @mouseout="tempRating = 0"
                    @click="form.data.rate = i"
                    class="bi cursor-pointer color-secondary"
                    v-for="i in 5"
                    :key="i"
                    :class="getStarClass(i)"
                    ></i>
            </div>
            <div class="form-group mb-2">
                <label for="comment">Comentários:</label>
                <textarea
                    name="comment"
                    id="comment"
                    class="form-control w-100 resize-none"
                    rows="4"
                    v-model="form.data.comment"
                    placeholder="Digite aqui"
                    ></textarea>
            </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="btn button-primary w-100" :disabled="form.loading">
            Enviar
            <LoadingSm v-if="form.loading" />
            </button>
        </div>
    </form>
    </div>
    </div>
  </div>
</template>