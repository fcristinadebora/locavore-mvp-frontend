import { ref } from "vue";
import { defineStore } from "pinia";
import { list } from '../api/backend/categories';

export const useCategoriesStore = defineStore("categories", () => {
  fetchAllCategories();
  
  var id = 0;
  const allCategories = ref([]);

  async function fetchAllCategories () {
    try {
      const result = await list();
      allCategories.value = result.data
    } catch (error) {
      console.error('error fetching categories');
    }
  }

  return { allCategories };
});
