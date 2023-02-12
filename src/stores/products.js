import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
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

  const findProduct = (id) => {
    return allProducts.value.find((product) => product.id == id);
  };

  return { allProducts, findProduct };
});
