import { defineStore } from "pinia";
import quizes from "../api/backend/quizes";


export const useQuizesStore = defineStore("quizes", () => {

  const list = async (filters) => {
    return await quizes.list(filters)
  }

  const findById = async (id, filters) => {
    return await quizes.findById(id, filters)
  }

  const create = async (data) => {
    return await quizes.create(data)
  }

  const update = async (id, data) => {
    return await quizes.update(id, data)
  }

  const deleteById = async (id, data) => {
    return await quizes.deleteById(id, data)
  }

  return {
    list,
    findById,
    create,
    update,
    deleteById
  };
});
