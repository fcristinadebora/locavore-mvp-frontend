<script setup>
import { onMounted, ref, watch } from 'vue';
import Pagination from "./Pagination.vue";
import { useQuizesStore, useAuthStore, useAccountStore } from "../stores";
import ActionConfirmModal from "./ActionConfirmModal.vue";
import { closeModal, openModal } from "./helpers/modal";
import toaster from "../helpers/toaster";

const quizesStore = useQuizesStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();

const quizes = ref({
  loading: true,
  items: [],
  currentPage: 1,
  search: ''
});
const pagination = ref({});
const producerId = ref(null);
const itemToDelete = ref(null);
const hasWhatsapp = ref(false);

async function getPageItems () {
  quizes.value.loading = true;

  const result = await quizesStore.list({paginate: 1, page: quizes.value.currentPage, search: quizes.value.search } );
  
  setPaginationFromResult(result.data);
  quizes.value.items = result.data.data
  quizes.value.loading = false;
}

function setPaginationFromResult(resultData) {
  pagination.value = {
    currentPage: resultData.current_page,
    totalPages: resultData.last_page
  }
}

function handlePageChange(newPage) {
  quizes.value.currentPage = newPage;
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
    
    producerId.value = producer.data.id;
    hasWhatsapp.value = producer.data?.contacts?.some((contact) => contact.type == 'whatsapp' && contact.value.length >= 9)

    getPageItems();
}

function submitSearchString () {
  resetItemsData();
}

function resetItemsData () {
    quizes.value.currentPage = 1;
    getPageItems();
}

function askDeleteItem(id) {
  itemToDelete.value = id;
  openModal('confirm-delete-quiz')
}

async function deleteItem() {
  await quizesStore.deleteById(itemToDelete.value);
  closeModal('confirm-delete-quiz');
  toaster.success('Quiz excluído');
  resetItemsData();
}
</script>

<template>
  <section id="profile-and-security" class="w-100">
    <div class="alert alert-warning" v-if="!hasWhatsapp">
      <i class="bi bi-info-circle"></i> Necessário preencher o campo <strong>Whatsapp</strong> na área de <router-link to="/account/producer-contact">contatos</router-link> para ativar a funcionalidade copletamente.
    </div>
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Gerenciar Questionários</h1>
    </section>
    <section class="text-left mt-3">
        <div class="d-flex justify-content-between">
            <div class="input-group mb-3 me-3">
            <input
                type="text"
                class="form-control border-radius-important"
                placeholder="Buscar"
                v-on:keyup.enter="submitSearchString"
                v-model="quizes.search"
            />
            <button
                class="btn button-secondary border-radius-important m-l-1-important"
                type="button"
                @click="submitSearchString"
            >
                <i class="bi bi-search"></i>
            </button>
            </div>
            <router-link to="/account/quizes/new" class="btn button-primary">Novo <i class="bi bi-plus"></i></router-link>
        </div>
          <article class="bg-light border-radius px-3 py-2 mb-3 text-start w-100 d-flex justify-content-between align-items-center color-default" v-for="(item,index) in quizes.items" :key="index">
                <span :class="item.is_active ? '' : 'text-decoration-line-through'"><strong class="me-2">#{{ item.id }}</strong> {{ item.name }}</span>
                <span>
                  <router-link :to="`/account/quizes/${item.id}`" class="btn btn-sm button-primary">
                    <i class="bi bi-pencil-square"></i>
                  </router-link>
                  <button class="btn btn-sm btn-danger ms-2" @click="askDeleteItem(item.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </span>
          </article>
    </section>
    <section class="d-flex justify-content-center">
      <Pagination :current-page="pagination.currentPage" v-if="quizes.items != null" :total-pages="pagination.totalPages"
            @page-change="handlePageChange" />
    </section>
    <ActionConfirmModal modal-id="confirm-delete-quiz" title="Deseja excluir produto?" text="Tem certeza que deseja excluir o produto? Não será possível reverter essa ação" confirm-label="Sim, excluir" :on-confirm="deleteItem"/>
  </section>
</template>
