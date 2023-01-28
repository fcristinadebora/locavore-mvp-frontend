import { ref } from "vue";
import { defineStore } from "pinia";

export const manufacturersStore = defineStore("manufacturers", () => {
  var id = 1;
  const allManufacturers = ref([
    {
      id: id++,
      name: "Mistureba Vegana",
      img: "/img/manufacturers/mistureba.png",
      category: "Veganos",
      shortDescription: "Culinária vegana e artesanal",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Cauana Minusculi Confeiraria Gourmet",
      img: "/img/manufacturers/cau.png",
      category: "Artesanais",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Sitio Pema",
      img: "/img/manufacturers/pema.png",
      category: "Orgânicos",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Mistureba Vegana",
      img: "/img/manufacturers/mistureba.png",
      category: "Veganos",
      shortDescription: "Culinária vegana e artesanal",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Cauana Minusculi Confeiraria Gourmet",
      img: "/img/manufacturers/cau.png",
      category: "Artesanais",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Sitio Pema",
      img: "/img/manufacturers/pema.png",
      category: "Orgânicos",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Cauana Minusculi Confeiraria Gourmet",
      img: "/img/manufacturers/cau.png",
      category: "Artesanais",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
    {
      id: id++,
      name: "Sitio Pema",
      img: "/img/manufacturers/pema.png",
      category: "Orgânicos",
      shortDescription: "O sabor para doces momentos",
      address: "Rua Jabuticabal, 347, Bairro Petrópolis",
      distance: "3km",
    },
  ]);

  return { allManufacturers };
});
