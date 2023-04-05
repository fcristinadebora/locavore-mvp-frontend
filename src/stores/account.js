import { defineStore } from "pinia";
import account from "../api/backend/account";


export const useAccountStore = defineStore("account", () => {

  const updateProfile = async (data) => {
    return await account.updateProfile(data)
  }

  const updatePassword = async (data) => {
    return await account.updatePassword(data)
  }

  const deleteAccount = async (data) => {
    return await account.deleteAccount(data)
  }

  return { updateProfile, updatePassword, deleteAccount };
});
