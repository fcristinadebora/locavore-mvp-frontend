<script setup>
import { useAccountStore } from '../stores';
import FormSubmitButton from "./FormSubmitButton.vue";
import toaster from '../helpers/toaster';
import { ref } from 'vue';
import { closeModal } from './helpers/modal';

const accountStore = useAccountStore();
const props = defineProps(['id']);

const form = ref({
    showPassword: false,
    loading: false,
    data: {
        current_password: '',
        password: '',
        password_confirm: ''
    },
    errors: {}
})

async function handleSubmit() {
  form.value.loading = true;
  form.value.errors = {};
  try {
    await accountStore.updatePassword({...form.value.data});
    toaster.success('Senha alterada com sucesso');
    
    closeModal(props.id);
    
  } catch (e) {
    form.value.errors = {...e.errors}
    form.value.errors.current_password = e.message
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
            Alterar senha
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </h5>
        </div>
        <div class="modal-body text-left color-default">
            <div class="form-group mb-2">
                <label class="me-2" for="current_password">Senha atual:</label>
                <input :type="form.showPassword ? 'text' : 'password'" class="form-control" v-model="form.data.current_password">
                <label class="text-danger" v-if="form.errors.current_password">Senha incorreta</label>
            </div>
            <div class="form-group mb-2">
                <label class="me-2" for="password">Nova senha:</label>
                <input :type="form.showPassword ? 'text' : 'password'" class="form-control" v-model="form.data.password" required>
                <label class="text-danger" v-if="form.errors.password">Obrigatório</label>
            </div>
            <div class="form-group mb-2">
                <label class="me-2" for="password_confirm">Confirmar nova senha:</label>
                <input :type="form.showPassword ? 'text' : 'password'" class="form-control" v-model="form.data.password_confirm">
                <label class="text-danger" v-if="form.errors.password_confirm">As senhas não coincidem</label>
            </div>
            <label for="showPassword" class="w-100">
                <input type="checkbox" name="showPassword" id="showPassword" :value="true" v-model="form.showPassword" />
                Mostrar senhas
            </label>
        </div>
        <div class="modal-footer">
            <FormSubmitButton :loading="form.loading" label="Salvar" class="button-primary w-100" />
        </div>
    </form>
    </div>
    </div>
  </div>
</template>