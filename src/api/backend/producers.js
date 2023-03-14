import { sendGetRequest } from ".";

async function list(filters) {
  const ENDPOINT_PATH = "/producers";

  const result = await sendGetRequest(ENDPOINT_PATH, filters);

  return result;
}

async function findById(id, query) {
  const ENDPOINT_PATH = `/producers/${id}`;

  const result = await sendGetRequest(ENDPOINT_PATH, { ...query });

  return result;
}

export { list, findById };
