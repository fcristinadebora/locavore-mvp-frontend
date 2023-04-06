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

  const getCurrentProducer = async (query) => {
    return await account.getCurrentProducer(query)
  }

  const updateProfilePicture = async (data) => {
    return await account.updateProducerProfilePicture(data)
  }

  const updateProducer = async (data) => {
    return await account.updateProducerProfile(data)
  }

  const updateProducerAddress = async (data) => {
    return await account.updateProducerAddress(data)
  }

  return { updateProfile, updatePassword, deleteAccount, getCurrentProducer, updateProfilePicture, updateProducer, updateProducerAddress };
});
