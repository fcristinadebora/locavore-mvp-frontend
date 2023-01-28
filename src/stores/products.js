import { ref } from "vue";
import { defineStore } from "pinia";

export const productsStore = defineStore("products", () => {
  var id = 1;
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
    },
  ]);

  return { allProducts };
});
