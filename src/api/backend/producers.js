import { sendGetRequest } from ".";

async function search({lat, lng, search, page}) {
  const ENDPOINT_PATH = "/producers/search";

  const result = await sendGetRequest(ENDPOINT_PATH, {
    search: search ?? '',
    lat,
    lng,
    page: page ?? 1
  });

  return result;
}

async function findById(id) {
  const ENDPOINT_PATH = `/producers/${id}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

export { search, findById };
