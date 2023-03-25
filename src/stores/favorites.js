import { ref } from "vue";
import { defineStore } from "pinia";
import {
    toggleFavoriteProduct,
    isFavoriteProduct,
    toggleFavoriteProducer,
    isFavoriteProducer
} from "../api/backend/favorites";
import { PRODUCT, PRODUCER } from '../enum/general';


export const useFavoritesStore = defineStore("favorites", () => {

  const toggleFavorite = async (type, itemId) => {
    if (![PRODUCT, PRODUCER].includes(type)) {
        throw new Error('Invalid value for type param');
    }

    try {
        if (type == PRODUCT) {
            await toggleFavoriteProduct(itemId);
        }
        if (type == PRODUCER) {
            await toggleFavoriteProducer(itemId);
        }

        return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const isFavorite = async (type, itemId) => {
    if (![PRODUCT, PRODUCER].includes(type)) {
        throw new Error('Invalid value for type param');
    }

    try {
        let result = null;
        if (type == PRODUCT) {
            result = await isFavoriteProduct(itemId);
            return result.data.is_favorite;
        }
        if (type == PRODUCER) {
            result = await isFavoriteProducer(itemId);
            return result.data.is_favorite;
        }

        return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { toggleFavorite, isFavorite };
});
