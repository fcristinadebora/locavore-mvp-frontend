import { ref } from "vue";
import { defineStore } from "pinia";

export const categoriesStore = defineStore("categories", () => {
  const allCategories = ref([
    "Orgânicos",
    "Caseiros",
    "Artesanais",
    "Vegetarianos",
    "Veganos",
    "Sem lactose",
    "Sem glúten",
    "Sem conservantes",
    "Sem açúcar",
  ]);

  return { allCategories };
});
