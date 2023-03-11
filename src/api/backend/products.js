import { sendGetRequest } from ".";

async function list(filters) {
  const ENDPOINT_PATH = "/products";

  const result = await sendGetRequest(ENDPOINT_PATH, filters);

  return result;
}

async function findById(id, query) {
  const ENDPOINT_PATH = `/products/${id}`;

  const result = await sendGetRequest(ENDPOINT_PATH, { ...query });

  return result;
}

export { list, findById };
