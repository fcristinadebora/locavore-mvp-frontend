import { sendGetRequest } from ".";

async function search(searchString = "", maxResults = 100) {
  const ENDPOINT_PATH = "/cities/search";

  const result = await sendGetRequest(ENDPOINT_PATH, {
    search: searchString,
    max: maxResults,
  });

  return result;
}

async function findById(cityId) {
  const ENDPOINT_PATH = `/cities/${cityId}`;

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

export { search, findById };
