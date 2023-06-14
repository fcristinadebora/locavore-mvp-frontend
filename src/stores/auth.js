import { ref } from "vue";
import { defineStore } from "pinia";
import { login, register, getUser, logout } from "../api/backend/auth";
import Cookies from 'js-cookie';

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

    await fetchUser();
  };

  const isLoggedIn = () => {
    const token = getToken();
    if (!token || !loggedUser.value) {
      return false;
    }

    return true;
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
      if (!getToken()) {
        return;
      }

      if (loading.value) {
        return;
      }

      loading.value = true;

      const result = await getUser();

      
      loggedUser.value = result.data;
      return loggedUser.value;
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

  const afterDeleteAccount = async () => {
    loggedUser.value = null;
    unsetToken();
  }

  const saveToken = (token) => {
    try {
      Cookies.set('userToken', token, { expires: 30, domain: window.location.hostname, secure: true });
    } catch (error) {
      console.error("Failed storing token", error);
    }
  };

  const unsetToken = (token) => {
    try {
      Cookies.remove('userToken');
    } catch (error) {
      console.error("Failed unseting token", error);
    }
  };

  const getToken = () => {
    return Cookies.get('userToken');
  };

  return {
    loggedUser,
    isLoggedIn,
    executeRegister,
    executeLogin,
    executeLogout,
    fetchUser,
    setupAuth,
    afterDeleteAccount
  };
});
