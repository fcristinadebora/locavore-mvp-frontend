import { sendGetRequest } from ".";

async function list() {
  const ENDPOINT_PATH = "/categories";

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

export { list };
