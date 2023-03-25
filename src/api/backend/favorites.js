import { sendGetRequest, sendPostRequest } from ".";

async function toggleFavoriteProduct(productId) {
  const ENDPOINT_PATH = `/favorites/product/${productId}`;

  const result = await sendPostRequest(ENDPOINT_PATH);

  return result;
}

async function isFavoriteProduct(productId) {
  const ENDPOINT_PATH = `/favorites/product/${productId}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

async function toggleFavoriteProducer(producerId) {
  const ENDPOINT_PATH = `/favorites/producer/${producerId}`;

  const result = await sendPostRequest(ENDPOINT_PATH);

  return result;
}

async function isFavoriteProducer(producerId) {
  const ENDPOINT_PATH = `/favorites/producer/${producerId}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

export {
    toggleFavoriteProduct,
    isFavoriteProduct,
    toggleFavoriteProducer,
    isFavoriteProducer,
};
