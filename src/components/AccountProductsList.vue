<script setup>
import * as bootstrap from "bootstrap";
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadingSm from "./LoadingSm.vue";
import Pagination from "./Pagination.vue";
import ProductCard from "./ProductCard.vue";
import { useAccountProductStore, useAuthStore, useAccountStore } from "../stores";
import ActionConfirmModal from "./ActionConfirmModal.vue";
import { closeModal, openModal } from "./helpers/modal";
import toaster from "../helpers/toaster";

const accountProductStore = useAccountProductStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();

const products = ref({
  loading: true,
  items: [],
  currentPage: 1,
  search: ''
});
const pagination = ref({});
const producerId = ref(null);
const productToDelete = ref(null);

async function getPageItems () {
  products.value.loading = true;

  const result = await accountProductStore.list({paginate: 1, page: products.value.currentPage, search: products.value.search } );
  
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

watch(() => authStore.loggedUser,
    () => fetchCurrentProducer()
)

onMounted(() => {
    if ( authStore.loggedUser) {
        fetchCurrentProducer();
    }
})

async function fetchCurrentProducer() {
    const producer = await accountStore.getCurrentProducer({include: 'contacts'});
    
    if (!producer.data.contacts) {
      return;
    }
    
    producerId.value = producer.data.id;

    getPageItems();
}

function submitSearchString () {
  resetItemsData();
}

function resetItemsData () {
    products.value.currentPage = 1;
    getPageItems();
}

function askDeleteProduct(productId) {
  productToDelete.value = productId;
  openModal('confirm-delete-product')
}

async function deleteProduct() {
  await accountProductStore.deleteProduct(productToDelete.value);
  closeModal('confirm-delete-product');
  toaster.success('Produto excluído');
  resetItemsData();
}
</script>

<template>
  <section id="profile-and-security" class="w-100">
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Gerenciar produtos</h1>
    </section>
    <section class="text-left mt-3">
        <div class="d-flex justify-content-between">
            <div class="input-group mb-3 me-3">
            <input
                type="text"
                class="form-control border-radius-important"
                placeholder="Buscar"
                v-on:keyup.enter="submitSearchString"
                v-model="products.search"
            />
            <button
                class="btn button-secondary border-radius-important m-l-1-important"
                type="button"
                @click="submitSearchString"
            >
                <i class="bi bi-search"></i>
            </button>
            </div>
            <router-link to="/account/products/new" class="btn button-primary">Novo <i class="bi bi-plus"></i></router-link>
        </div>
          <article class="bg-light border-radius px-3 py-2 mb-3 text-start w-100 d-flex justify-content-between align-items-center color-default" v-for="(product,index) in products.items" :key="index">
                  <span><strong class="me-2">#{{ product.id }}</strong> {{ product.name }}</span>
                  <span>
                    <router-link :to="`/account/products/${product.id}`" class="btn btn-sm button-primary">
                      <i class="bi bi-pencil-square"></i>
                    </router-link>
                    <button class="btn btn-sm btn-danger ms-2" @click="askDeleteProduct(product.id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </span>
          </article>
    </section>
    <section class="d-flex justify-content-center">
      <Pagination :current-page="pagination.currentPage" v-if="products.items != null" :total-pages="pagination.totalPages"
            @page-change="handlePageChange" />
    </section>
    <ActionConfirmModal modal-id="confirm-delete-product" title="Deseja excluir produto?" text="Tem certeza que deseja excluir o produto? Não será possível reverter essa ação" confirm-label="Sim, excluir" :on-confirm="deleteProduct"/>
  </section>
</template>
