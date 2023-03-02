import { ref } from "vue";
import { defineStore } from "pinia";
import { search, findById } from "../api/backend/producers";

export const useProducersStore = defineStore("producers", () => {
  var id = 1;
  const allproducers = ref([
    {
      id: id++,
      name: "Mistureba Vegana",
      img: "/img/producers/mistureba.png",
      category: "Veganos",
      shortDescription: "Culinária vegana e artesanal",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Cauana Minusculi Confeiraria Gourmet",
      img: "/img/producers/cau.png",
      category: "Artesanais",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Sitio Pema",
      img: "/img/producers/pema.png",
      category: "Orgânicos",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Mistureba Vegana",
      img: "/img/producers/mistureba.png",
      category: "Veganos",
      shortDescription: "Culinária vegana e artesanal",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Cauana Minusculi Confeiraria Gourmet",
      img: "/img/producers/cau.png",
      category: "Artesanais",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Sitio Pema",
      img: "/img/producers/pema.png",
      category: "Orgânicos",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Cauana Minusculi Confeiraria Gourmet",
      img: "/img/producers/cau.png",
      category: "Artesanais",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Sitio Pema",
      img: "/img/producers/pema.png",
      category: "Orgânicos",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
  ]);

  const searchProducers = async (filters) => {
    try {
      const result = await search({...filters});

      //todo cache data

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { allproducers, searchProducers };
});
