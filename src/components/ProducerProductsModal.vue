<script setup>
import * as bootstrap from "bootstrap";
import { computed, onMounted, ref } from 'vue';
import { useProductsStore } from '../stores';
import { useRoute, useRouter } from 'vue-router';
import LoadingSm from "./LoadingSm.vue";
import Pagination from "./Pagination.vue";
import ProductCard from "./ProductCard.vue";

const productsStore = useProductsStore();
const props = defineProps(['producerId']);
const products = ref({
  loading: true,
  items: [],
  currentPage: 1
});
const pagination = ref({});

onMounted(() => {
  getPageItems();
})

async function getPageItems () {
  products.value.loading = true;

  const result = await productsStore.listProductsByProducer(props.producerId, {paginate: 1, page: products.value.currentPage, include: 'categories,address'} );
  
  setPaginationFromResult(result.data);
  products.value.items = result.data.data
  products.value.loading = false;
}

function setPaginationFromResult(resultData) {
  pagination.value = {
    currentPage: resultData.current_page,
    totalPages: resultData.last_page
  }
}

function handlePageChange(newPage) {
  products.value.currentPage = newPage;
  getPageItems();
}

</script>

<template>
    <div
    class="modal my-modal"
    tabindex="-1"
    id="producer-products-modal"
  >
    <div class="modal-dialog d-flex container">
      <div class="modal-content d-flex flex-grow-1">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            Todos os Produtos
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
          <ProductCard v-for="(product, index) in products.items" :key="index" :product="product" class="my-2" /> 
        </div>
        <div class="modal-footer justify-content-center">
          <Pagination :current-page="pagination.currentPage" v-if="products.items != null" :total-pages="pagination.totalPages"
            @page-change="handlePageChange" />
        </div>
    </div>
    </div>
  </div>
</template>