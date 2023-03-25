<script setup>
import { ref, onMounted, computed } from "vue";
import { PRODUCT, PRODUCER } from "../enum/general";
import { useAuthStore } from "../stores";
import CategoriesCarousel from "./CategoriesCarousel.vue";

const emit = defineEmits(["applyFilters"]);
const props = defineProps(['filters']);
const authStore = useAuthStore();

const filters = ref({
  searchFor: PRODUCT,
  onlyFavorites: false,
  categories: [],
});

const filterModal = ref(null);
const closeModal = ref(null);

onMounted(() => {
  listenToModalShow();
});

const isLoggedIn = computed(
  () => {
    return authStore.isLoggedIn()
  }
);

const selectedCategories = computed(() => filters.value.categories);

function setSearchFor(type) {
  filters.value.searchFor = type;
}

function listenToModalShow() {
  filterModal.value.addEventListener("shown.bs.modal", function () {
    window.dispatchEvent(new Event("resize"));
    filters.value = {
      searchFor: props.filters.searchFor ?? filters.value.searchFor,
      categories: props.filters.categories ?? [],
    }
  });
}

function getBreakpoints() {
  var breakpoints = [];
  for (var i = 0; i < 3000; i += 20) {
    var itemsToShow = i / 260;
    breakpoints[i] = {
      itemsToShow: Math.floor(itemsToShow),
    };
  }

  return Object.assign({}, breakpoints);
}

function handleCategoryClicked(params) {
  const { category } = params;
  var index = filters.value.categories.indexOf(category.id);
  if (index > -1) {
    filters.value.categories.splice(index, 1);
    return;
  }

  filters.value.categories.push(category.id);
}

function applyFilters() {
  emit("applyFilters", { filters: filters.value });
  closeModal.value.click();
}
</script>
<template>
  <div
    class="modal my-modal"
    ref="filterModal"
    tabindex="-1"
    id="search-filter-modal"
  >
    <div class="modal-dialog container">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            Filtrar Resultados
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="closeModal"
            ></button>
          </h5>
        </div>
        <div class="modal-body">
          <div class="form-group mb-2">
            <label class="w-100"> Buscar entre: </label>
            <div
              class="btn-group button-switch button-switch--secondary"
              role="group"
            >
              <button
                type="button"
                class="btn"
                @click="setSearchFor(PRODUCT)"
                :class="filters.searchFor == PRODUCT ? 'active' : ''"
              >
                Produtos
              </button>
              <button
                type="button"
                class="btn"
                @click="setSearchFor(PRODUCER)"
                :class="filters.searchFor == PRODUCER ? 'active' : ''"
              >
                Produtores
              </button>
            </div>
          </div>

          <div class="form-group mb-2" v-if="isLoggedIn">
            <label for="onlyFavorites" class="w-100">
              <input type="checkbox" :value="true" v-model="filters.onlyFavorites" name="onlyFavorites" id="onlyFavorites">
              Mostrar apenas favoritos
            </label>
          </div>

          <div class="form-group mb-2">
            <label>Categorias</label>
            <div class="row px-2">
              <CategoriesCarousel
                item-class="button-secondary--light"
                class="px-0"
                @category-clicked="handleCategoryClicked"
                :breakpoints="getBreakpoints()"
                :active-items="selectedCategories"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn button-primary w-100"
            @click="applyFilters"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
