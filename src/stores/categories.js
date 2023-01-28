import { ref } from "vue";
import { defineStore } from "pinia";

export const categoriesStore = defineStore("categories", () => {
  var id = 0;
  const allCategories = ref([
    { id: id++, name: "Orgânicos" },
    { id: id++, name: "Caseiros" },
    { id: id++, name: "Artesanais" },
    { id: id++, name: "Vegetarianos" },
    { id: id++, name: "Veganos" },
    { id: id++, name: "Sem lactose" },
    { id: id++, name: "Sem glúten" },
    { id: id++, name: "Sem conservantes" },
    { id: id++, name: "Sem açúcar" },
  ]);

  return { allCategories };
});
