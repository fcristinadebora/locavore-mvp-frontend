import { sendPostRequest, sendGetRequest, sendDeleteRequest } from ".";

async function register({ name, email, password, passwordConfirm }) {
  const ENDPOINT_PATH = "/register";

  const result = await sendPostRequest(ENDPOINT_PATH, {
    name,
    email,
    password,
    password_confirm: passwordConfirm,
  });

  return result;
}

async function login({ email, password }) {
  const ENDPOINT_PATH = "/login";

  const result = await sendPostRequest(ENDPOINT_PATH, {
    email,
    password,
  });

  return result;
}

async function logout() {
  const ENDPOINT_PATH = "/logout";

  const result = await sendDeleteRequest(ENDPOINT_PATH);

  return result;
}

async function getUser() {
  const ENDPOINT_PATH = "/user";

  const result = await sendGetRequest(ENDPOINT_PATH);

  return result;
}

export { register, login, getUser, logout };
