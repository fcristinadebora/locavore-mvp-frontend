import { defineStore } from "pinia";
import {
    createProductReview,
    createProducerReview,
    getProductReviews,
    getProducerReviews
} from "../api/backend/reviews";
import { PRODUCT, PRODUCER } from '../enum/general';


export const useReviewsStore = defineStore("reviews", () => {

  const createReview = async (type, itemId, data) => {
    if (![PRODUCT, PRODUCER].includes(type)) {
        throw new Error('Invalid value for type param');
    }

    if (type == PRODUCT) {
        await createProductReview(itemId, data);
    }
    if (type == PRODUCER) {
      console.log(itemId, data)
        await createProducerReview(itemId, data);
    }

    return true;
  };

  const getReviews = async (type, itemId, filters) => {
    if (![PRODUCT, PRODUCER].includes(type)) {
        throw new Error('Invalid value for type param');
    }

    try {
        let result = null;
        if (type == PRODUCT) {
            result = await getProductReviews(itemId, {...filters});
            return result.data;
        }
        if (type == PRODUCER) {
            result = await getProducerReviews(itemId, {...filters});
            return result.data;
        }

        return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return { createReview, getReviews };
});
