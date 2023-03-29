import { sendGetRequest, sendPostRequest } from ".";

async function createProductReview(productId, review) {
  const ENDPOINT_PATH = `/products/${productId}/reviews`;

  const result = await sendPostRequest(ENDPOINT_PATH, review);

  return result;
}

async function createProducerReview(productId, review) {
  const ENDPOINT_PATH = `/producers/${productId}/reviews`;

  const result = await sendPostRequest(ENDPOINT_PATH, review);

  return result;
}

async function getProductReviews(productId, filters) {
  const ENDPOINT_PATH = `/products/${productId}/reviews`;

  const result = await sendGetRequest(ENDPOINT_PATH, {...filters});

  return result;
}

async function getProducerReviews(producerId, filters) {
  const ENDPOINT_PATH = `/producers/${producerId}/reviews`;

  const result = await sendGetRequest(ENDPOINT_PATH, {...filters});

  return result;
}

export {
    createProductReview,
    createProducerReview,
    getProductReviews,
    getProducerReviews
};
