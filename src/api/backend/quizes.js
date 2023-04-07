import { sendDeleteRequest, sendGetRequest, sendMultiPartFormRequest } from ".";

async function list(filters) {
  const ENDPOINT_PATH = "/account/producer/quizes";

  const result = await sendGetRequest(ENDPOINT_PATH, filters);

  return result.data;
}

async function findById(id, query) {
  const ENDPOINT_PATH = `/account/producer/quizes/${id}`;

  const result = await sendGetRequest(ENDPOINT_PATH, { ...query });

  return result.data;
}

async function create(data) {
    const ENDPOINT_PATH = `/account/producer/quizes`;

    const result = await sendPostRequest(ENDPOINT_PATH, data);

    return result;

    return result;
}

async function update(id, data) {
    const ENDPOINT_PATH = `/account/producer/quizes/${id}`;

    const result = await sendPutRequest(ENDPOINT_PATH, data);

    return result;

    return result;
}

async function deleteById(id, data) {
    const ENDPOINT_PATH = `/account/producer/quizes/${id}`;

    const result = await sendDeleteRequest(ENDPOINT_PATH, data);

    return result;
}

export default { list, findById, create, update, deleteById };
