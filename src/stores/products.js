import { ref } from "vue";
import { defineStore } from "pinia";
import { list, findById, getBestRated } from "../api/backend/products";
import { useSearchStore } from './search';

export const useProductsStore = defineStore("products", () => {
  
  const searchStore =  useSearchStore();

  var id = 0;
  const allProducts = ref([
    {
      id: id++,
      name: "Pão de Queijo",
      img: "/img/products/prod4.png",
      category: "Veganos, Sem glúten",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "UN",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
    {
      id: id++,
      name: "Alface americana",
      img: "/img/products/prod1.png",
      category: "Orgânicos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "UN",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
    {
      id: id++,
      name: "Pepino em conserva",
      img: "/img/products/prod2.png",
      category: "Caseiros, Artesanais",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "UN",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
    {
      id: id++,
      name: "Marmitas caseiras",
      img: "/img/products/prod3.png",
      category: "Caseiros, Artesanais",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "KG",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
    {
      id: id++,
      name: "Pão de Queijo",
      img: "/img/products/prod4.png",
      category: "Veganos, Sem glúten",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "100g",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
    {
      id: id++,
      name: "Alface americana",
      img: "/img/products/prod1.png",
      category: "Orgânicos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "UN",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
    {
      id: id++,
      name: "Pepino em conserva",
      img: "/img/products/prod2.png",
      category: "Caseiros, Artesanais",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "UN",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
    {
      id: id++,
      name: "Marmitas caseiras",
      img: "/img/products/prod3.png",
      category: "Caseiros, Artesanais",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
      price: 15.0,
      priceUnit: "UN",
      availability: "Sob encomenda",
      description:
        "Delicioso pão de queijo, macio e fresquinho. Temos as opções: Tradicional, Vegano e Sem glúten. Por apenas R$3,50 o Kg!",
    },
  ]);

  const findProduct = async (id) => {
    try {
      const includes = 'address,distance,availability,categories,producer.categories,producer.contacts,average_review';
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

  const listProducts = async (filters) => {
    try {
      const result = await list({...filters});

      //todo cache data

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const listProductsByProducer = async (producerId, filters) => {
    try {
      const result = await list({producer: producerId, ...filters });

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

  return { allProducts, findProduct, listProducts, listProductsByProducer, bestRated };
});
