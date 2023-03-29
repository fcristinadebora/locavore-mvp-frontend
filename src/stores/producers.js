import { ref } from "vue";
import { defineStore } from "pinia";
import { list, findById, getBestRated } from "../api/backend/producers";
import { useSearchStore } from "./search";

export const useProducersStore = defineStore("producers", () => {
  var id = 1;
  const searchStore = useSearchStore();
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

  const findProducer = async (id) => {
    try {
      const includes = 'address,distance,categories,longDescription,contacts,average_review';
      const query = { include: includes }
      const searchCoordinates = await searchStore.getSearchCoordinates();
      if (searchCoordinates) {
        query.lat = searchCoordinates.lat;
        query.lng = searchCoordinates.lng;
      }
      
      const result = await findById(id, query);

      return result.data;
    } catch (error) {
      console.error(error);
      return false;
    }
    
  };

  const listProducers = async (filters) => {
    try {
      const result = await list({
        ...filters,
        include: [
          'address',
          'categories'
        ]
      });

      //todo cache data

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const bestRated = async (filters) => {
    try {
      const result = await getBestRated({
        ...filters,
        include: 'average_review',
        limit: 10
      });

      //todo cache data

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return { allproducers, listProducers, findProducer, bestRated };
});
