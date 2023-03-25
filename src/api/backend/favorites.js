import { sendGetRequest, sendPostRequest } from ".";

async function toggleFavoriteProduct(productId) {
  const ENDPOINT_PATH = `/favorites/products/${productId}`;

  const result = await sendPostRequest(ENDPOINT_PATH);

  return result;
}

async function isFavoriteProduct(productId) {
  const ENDPOINT_PATH = `/favorites/products/${productId}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

async function getFavoriteProducts(productIds) {
  if (Array.isArray(productIds)) {
    productIds = productIds.join(',');
  }
  const ENDPOINT_PATH = `/favorites/products/?ids=${productIds}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

async function toggleFavoriteProducer(producerId) {
  const ENDPOINT_PATH = `/favorites/producers/${producerId}`;

  const result = await sendPostRequest(ENDPOINT_PATH);

  return result;
}

async function isFavoriteProducer(producerId) {
  const ENDPOINT_PATH = `/favorites/producers/${producerId}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

async function getFavoriteProducers(producerIds) {
  if (Array.isArray(producerIds)) {
    producerIds = producerIds.join(',');
  }
  const ENDPOINT_PATH = `/favorites/producers/?ids=${producerIds}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

export {
    toggleFavoriteProduct,
    isFavoriteProduct,
    toggleFavoriteProducer,
    isFavoriteProducer,
    getFavoriteProducers,
    getFavoriteProducts
};
