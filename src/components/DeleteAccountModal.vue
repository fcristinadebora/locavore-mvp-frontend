<script setup>
import { useAccountStore, useAuthStore } from '../stores';
import FormSubmitButton from "./FormSubmitButton.vue";
import toaster from '../helpers/toaster';
import { ref } from 'vue';
import { closeModal } from './helpers/modal';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore();
const authStore = useAuthStore();
const props = defineProps(['id']);
const router = useRouter();

const form = ref({
    showPassword: false,
    loading: false,
    data: {
        password: ''
    },
    errors: {}
})

async function handleSubmit() {
  form.value.loading = true;
  form.value.errors = {};
  try {
    await accountStore.deleteAccount({...form.value.data});
    toaster.success('Conta excluída');
    authStore.afterDeleteAccount();
    router.push('/goodbye');
  } catch (e) {
    form.value.errors = {...e.errors}
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}
</script>

<template>
    <div
    class="modal my-modal"
    tabindex="-1"
    :id="props.id"
  >
    <div class="modal-dialog container">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            Excluir conta
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </h5>
        </div>
        <div class="modal-body text-left color-default">
            <div class="alert alert-danger">
                <i class="bi bi-warning"></i> <strong>Atenção:</strong> ao excluir sua conta, todos seus dados serão apagados de forma irreversível
            </div>
            <div class="form-group mb-2">
                <label class="me-2" for="password">Digite sua senha:</label>
                <input :type="form.showPassword ? 'text' : 'password'" class="form-control" v-model="form.data.password">
                <label class="text-danger" v-if="form.errors.password">Senha incorreta</label>
            </div>
            <label for="showPassword2" class="w-100">
                <input type="checkbox" id="showPassword2" :value="true" v-model="form.showPassword" />
                Mostrar senha
            </label>
        </div>
        <div class="modal-footer">
            <FormSubmitButton :loading="form.loading" label="Excluir" class="btn-danger w-100" />
        </div>
    </form>
    </div>
    </div>
  </div>
</template>