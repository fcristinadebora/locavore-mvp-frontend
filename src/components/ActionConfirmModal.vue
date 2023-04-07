<script setup>
import { useAccountStore } from '../stores';
import FormSubmitButton from "./FormSubmitButton.vue";
import toaster from '../helpers/toaster';
import { ref } from 'vue';
import { closeModal } from './helpers/modal';

const accountStore = useAccountStore();
const props = defineProps(['modalId', 'onConfirm', 'title', 'text', 'confirmLabel', 'cancelLabel', 'onConfirm']);

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
    :id="props.modalId"
  >
    <div class="modal-dialog container">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            {{ props.title }}
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </h5>
        </div>
        <div class="modal-body text-left color-default">
            {{ props.text }}
        </div>
        <div class="modal-footer">
          <button class="btn button-primary w-100 mb-2" type="button" @click="props.onConfirm">{{ props.confirmLabel ?? 'Confirmar' }}</button>
          <button class="btn button-primary--light w-100 mb-2" type="button" data-bs-dismiss="modal">{{ props.cancelLabel ?? 'Cancelar' }}</button>
        </div>
    </form>
    </div>
    </div>
  </div>
</template>