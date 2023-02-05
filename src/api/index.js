import { METHOD_GET, METHOD_POST } from "../enum/http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";
const API_KEY = import.meta.env.VITE_API_KEY ?? '';

async function sendRequest(method, endpoint, query = {}, body = {}) {
  const queryString = Object.keys(query).length
    ? `?${new URLSearchParams(query)}`
    : "";

  const requestUrl = `${API_BASE_URL}${endpoint}${queryString}`;

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
    },
    body: body,
  };

  if (method == METHOD_GET) {
    delete options.body;
  }

  const response = await fetch(requestUrl, options);
  return response;
}

async function sendPostRequest(endpoint, body = {}, query = {}) {
  return await sendRequest(METHOD_POST, endpoint, query, body);
}

async function sendGetRequest(endpoint, query = {}) {
  return await sendRequest(METHOD_GET, endpoint, query);
}

export { sendPostRequest, sendGetRequest };
