import { ref } from "vue";
import { defineStore } from "pinia";
import { login, register } from "../api/backend/auth";

export const authStore = defineStore("auth", () => {
  const executeRegister = async ({ name, email, password, passwordConfirm }) => {
    try {
      const result = await register({ name, email, password, passwordConfirm });

      const { token } = result.data;
      saveToken(token);

      return true;
    } catch (error) {
      console.error('Register failed');
      return false;
    }
  };

  const executeLogin = async ({ email, password }) => {
    try {
      const result = await login({ email, password });
      const { token } = result.data;
      saveToken(token);

      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const saveToken = (token) => {
    try {
      window.sessionStorage.setItem('userToken', token); //pleaseeeee remove this and do it in a secure method
    } catch (error) {
      console.error('Failed storing token', error);
    }
  };

  const getToken = () => {
    return window.sessionStorage.getItem('userToken');
  };

  return { executeRegister, executeLogin };
});
