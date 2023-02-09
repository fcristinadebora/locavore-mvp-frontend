import { sendPostRequest } from ".";

async function register({ name, email, password, passwordConfirm }) {
  const ENDPOINT_PATH = "/register";

  const result = sendPostRequest(ENDPOINT_PATH, {
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

async function getUser({ email, password }) {
  const ENDPOINT_PATH = "/login";

  const result = await sendPostRequest(ENDPOINT_PATH, {
    email,
    password,
  });

  return result;
}

export { register, login };
