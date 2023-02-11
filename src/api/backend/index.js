import { METHOD_DELETE, METHOD_GET, METHOD_POST } from "../../enum/http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";
const API_KEY = import.meta.env.VITE_API_KEY ?? '';
const DEBUG_ENABLED = !!import.meta.env.VITE_APP_DEBUG ?? false;

async function sendRequest(method, endpoint, query = {}, body = {}) {
  const queryString = Object.keys(query).length
    ? `?${new URLSearchParams(query)}`
    : "";

  const requestUrl = `${API_BASE_URL}${endpoint}${queryString}`;
  const token = sessionStorage.getItem('userToken');

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": API_KEY,
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }


  if (method == METHOD_GET) {
    delete options.body;
  }

  const result = await fetch(requestUrl, options);

  const responseBody = await result.json();
  
  if (!result.ok) {
    if (DEBUG_ENABLED) {
      console.error("Request failed", result);
    }
    throw Error("Error performing request", result.statusText);
  }

  return responseBody;
}

async function sendPostRequest(endpoint, body = {}, query = {}) {
  return await sendRequest(METHOD_POST, endpoint, query, body);
}

async function sendGetRequest(endpoint, query = {}) {
  return await sendRequest(METHOD_GET, endpoint, query);
}

async function sendDeleteRequest(endpoint, query = {}) {
  return await sendRequest(METHOD_DELETE, endpoint, query);
}

export { sendPostRequest, sendGetRequest, sendDeleteRequest };
