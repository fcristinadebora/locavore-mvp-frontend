import { ref } from "vue";
import { defineStore } from "pinia";
import { login, register, getUser, logout } from "../api/backend/auth";

export const useAuthStore = defineStore("auth", () => {
  const loggedUser = ref(null);
  const loading = ref(false);

  const setupAuth = async () => {
    if (isLoggedIn()) {
      return;
    }

    if (!getToken()) {
      return;
    }

    fetchUser();
  };

  const isLoggedIn = () => {
    const token = getToken();
    if (!token || !loggedUser.value) {
      return false;
    }
  };

  const executeRegister = async (formData) => {
    const result = await register({...formData});

    const { token } = result.data;
    saveToken(token);

    return true;
  };

  const executeLogin = async ({ email, password }) => {
    const result = await login({ email, password });
    const { token } = result.data;
    saveToken(token);
  };

  const fetchUser = async () => {
    try {
      if (loading.value) {
        return;
      }

      loading.value = true;
      const result = await getUser();

      loggedUser.value = result.data;
      return loggedUser;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const executeLogout = async () => {
    try {
      if (loading.value) {
        return;
      }

      loading.value = true;
      await logout();

      loggedUser.value = null;
      sessionStorage.clear("userToken");
      return loggedUser;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const saveToken = (token) => {
    try {
      window.sessionStorage.setItem("userToken", token); //pleaseeeee remove this and do it in a secure method
    } catch (error) {
      console.error("Failed storing token", error);
    }
  };

  const getToken = () => {
    return window.sessionStorage.getItem("userToken");
  };

  return {
    loggedUser,
    isLoggedIn,
    executeRegister,
    executeLogin,
    executeLogout,
    fetchUser,
    setupAuth,
  };
});
