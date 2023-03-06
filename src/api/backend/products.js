import { sendGetRequest } from ".";

async function search({lat, lng, search, page}) {
  const ENDPOINT_PATH = "/products/search";

  const result = await sendGetRequest(ENDPOINT_PATH, {
    search: search ?? '',
    lat,
    lng,
    page: page ?? 1
  });

  return result;
}

async function findById(id, query) {
  const ENDPOINT_PATH = `/products/${id}`;

  const result = await sendGetRequest(ENDPOINT_PATH, { ...query });

  return result;
}

export { search, findById };
