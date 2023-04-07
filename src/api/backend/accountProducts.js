import { sendDeleteRequest, sendGetRequest, sendMultiPartFormRequest } from ".";

async function list(filters) {
  const ENDPOINT_PATH = "/account/producer/products";

  const result = await sendGetRequest(ENDPOINT_PATH, filters);

  return result.data;
}

async function findById(id, query) {
  const ENDPOINT_PATH = `/account/producer/products/${id}`;

  const result = await sendGetRequest(ENDPOINT_PATH, { ...query });

  return result.data;
}

async function create(data) {
    const ENDPOINT_PATH = `/account/producer/products`;

    const result = await sendMultiPartFormRequest(ENDPOINT_PATH, data);

    return result;
}

async function update(id, data) {
    const ENDPOINT_PATH = `/account/producer/products/${id}`;
    data.append('_method', 'PUT');

    const result = await sendMultiPartFormRequest(ENDPOINT_PATH, data);

    return result;
}

async function deleteProduct(id, data) {
    const ENDPOINT_PATH = `/account/producer/products/${id}`;

    const result = await sendDeleteRequest(ENDPOINT_PATH, data);

    return result;
}

export default { list, findById, create, update, deleteProduct };
