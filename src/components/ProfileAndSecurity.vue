<script setup>
import { useRouter } from "vue-router";
import localStorage from "../helpers/localStorage";
import { useAccountStore, useAuthStore } from "../stores";
import FormSubmitButton from "./FormSubmitButton.vue";
import { ref, watch } from "vue";
import toaster from '../helpers/toaster';
import UpdatePasswordModal from "./UpdatePasswordModal.vue";
import { openModal } from "./helpers/modal";
import DeleteAccountModal from "./DeleteAccountModal.vue";

const accountStore = useAccountStore();
const authStore = useAuthStore();

const router = useRouter();

const form = ref({
    loading: false,
    data: {
        name: '',
        email: ''
    }
})
const originalData = ref({});

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    await accountStore.updateProfile({...form.value.data});
    toaster.success('Dados atualizados com sucesso');
  } catch (e) {
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}

async function fetchCurrentData() {
  try {
    const currentUser = await authStore.fetchUser();
    
    if (currentUser) {
      originalData.value = currentUser;
      resetForm();
    }
  } catch (error) {
    console.error(error);
  }
}

function resetForm () {
  form.value.data.name = originalData.value.name;
  form.value.data.email = originalData.value.email;
}

</script>
<template>
  <section id="profile-and-security" class="w-100">
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Perfil e Segurança</h1>
    </section>
    <section class="text-left mt-3">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" v-model="form.data.name" class="form-control">
        </div>
        <div class="form-group mt-2 mb-2">
            <label for="name">E-mail:</label>
            <input type="mail" v-model="form.data.email"  class="form-control">
        </div>

        <div class="form-group">
            <FormSubmitButton :loading="form.loading" label="Salvar" class="btn button-primary w-100 mb-2" />
            <button type="button" class="btn button-primary--light w-100" @click="resetForm">Cancelar</button>
        </div>
      </form>

      <hr class="my-5">

      <button class="btn button-primary--light w-100 mb-2" type="button" @click="openModal('update-password-modal')">
          <i class="bi bi-lock"></i>
          Alterar senha
      </button>
      <button class="btn button-primary--light w-100 mb-2" type="button" @click="openModal('delete-account-modal')">
          <i class="bi bi-person-x-fill"></i>
          Excluir minha conta
      </button>
      
      <UpdatePasswordModal id="update-password-modal" />
      <DeleteAccountModal id="delete-account-modal" />
    </section>
  </section>
</template>
