import { defineStore } from "pinia";
import accountProducts from "../api/backend/accountProducts";


export const useAccountProductStore = defineStore("accountProduct", () => {

  const list = async (filters) => {
    return await accountProducts.list(filters)
  }

  const findById = async (id, filters) => {
    return await accountProducts.findById(id, filters)
  }

  const create = async (data) => {
    return await accountProducts.create(data)
  }

  const update = async (id, data) => {
    return await accountProducts.update(id, data)
  }

  const deleteProduct = async (id, data) => {
    return await accountProducts.deleteProduct(id, data)
  }

  return {
    list,
    findById,
    create,
    update,
    deleteProduct
  };
});
