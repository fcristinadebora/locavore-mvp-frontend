import { sendGetRequest } from ".";

async function search({lat, lng, search, page, include}) {
  const ENDPOINT_PATH = "/producers/search";

  const result = await sendGetRequest(ENDPOINT_PATH, {
    search: search ?? '',
    lat,
    lng,
    page: page ?? 1,
    include: Array.isArray(include) ? include.join(',') : include,
    perPage: 20
  });

  return result;
}

async function findById(id, include) {
  const ENDPOINT_PATH = `/producers/${id}`;

  const result = await sendGetRequest(ENDPOINT_PATH, { include: include });

  return result;
}

export { search, findById };
