<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useAccountStore, useAuthStore } from "../stores";
import FormSubmitButton from "./FormSubmitButton.vue";
import toaster from "../helpers/toaster";

const emits = defineEmits(['success']);
const props = defineProps(['submitButtonText'])

const authStore = useAuthStore();
const accountStore = useAccountStore();

const router = useRouter();
const form = ref({
    loading: false,
    error: null,
    errors: [],
    originalData: {
        is_enabled: false,
        name: null,
        profile_picture: {
            current: null,
            selected: null,
            deleteCurrent: false,
        },
        short_description: null,
        long_description: null
    },
    data: {}
})

onMounted(() => {
    resetForm();
    fetchCurrentData();
})

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function fetchCurrentData() {
    form.value.loading = true;

    try {
        const producer = await accountStore.getCurrentProducer({ include: 'long_description' });

        if (producer.data) {
            const profilePicture = {
                ...form.value.originalData?.profile_picture,
                current: producer.data.profile_picture
            };

            form.value.originalData = {
                ...producer.data,
                is_enabled: producer.data.is_enabled == 1,
                profile_picture: { ...profilePicture }
            }
        }

        resetForm();
    } finally {
        form.value.loading = false;
    }
}

function resetForm () {
    form.value.data = {
        ...form.value.originalData
    }
}

async function handleSubmit() {
    form.value.loading = true;

    try {
        await updateProfilePicture();

        const data = { ...form.value.data };
        delete data.profile_picture;

        await accountStore.updateProducer({ ...data });

        form.value.data.profile_picture.selected = null;
        form.value.originalData = {
            ...form.value.data
        };

        toaster.success('Dados atualizados com sucesso');
        fetchCurrentData();
    } catch (e) {
        console.error(e)
    } finally {
        form.value.loading = false;
    }
}

async function updateProfilePicture() {
    const shouldDeleteCurrent = form.value.data.profile_picture?.deleteCurrent ?? false;
    const selectedFile = form.value.data?.profile_picture?.selected;
    if (!selectedFile && !shouldDeleteCurrent) {
        return false;
    }

    const formData = new FormData();
    if (selectedFile) {
        formData.append('files', form.value.data.profile_picture.selected);
    }
    if (shouldDeleteCurrent) {
        formData.append('delete_current', 1);
    }
  
    try {
        await accountStore.updateProfilePicture(formData);
    } catch (e) {
        console.error(e)
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];

    form.value.data.profile_picture.selected = file;
}
</script>
<template>
  <section id="profile-and-security" class="w-100">
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Perfil de Produtor</h1>
    </section>
    <section class="text-left mt-3">
        <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" name="enableProducerProfile" role="switch" @click="form.data.is_enabled = !form.data.is_enabled" :checked="form.data.is_enabled" id="enableProducerProfile">
                <label class="form-check-label" for="enableProducerProfile">
                    Ativar perfil de produtor
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" name="name" v-model="form.data.name" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="name" class="w-100">Foto:</label>

            <div class="w-100 d-flex justify-content-start">
                <div class="producer-profile-img ratio-1-1 border-radius bg-light float-start me-2 mb-3 text-center">
                    <img v-if="form.data.profile_picture?.current" :src="form.data.profile_picture?.current" alt="Producer image" class="border-radius ratio-1-1 w-100" />
                    <i class="bi bi-image icon-lg" v-if="!form.data.profile_picture?.current"></i>
                </div>
                <div class="d-flex flex-column justify-content-start flex-grow-1">
                    <label for="profile_picture" class="mb-2 w-100">
                        Selecionar outra imagem
                        <input type="file" class="form-control w-100 mb-2" :disabled="!form.data.profile_picture" name="profile_picture" id="profile_picture" accept="image/*" @change="handleFileSelect">
                    </label>
                    <label for="delete_current_profile_picture">
                        <input type="checkbox" name="delete_current_profile_picture" v-if="form.data.profile_picture" v-model="form.data.profile_picture.deleteCurrent" id="delete_current_profile_picture">
                        Apagar foto atual</label>
                </div>
            </div>
        </div>
        <div class="form-group mt-2 mb-2">
            <label for="short_description">Descrição curta:</label>
            <textarea
                name="short_description" v-model="form.data.short_description" id="short_description"
                class="form-control w-100 resize-none"
                rows="3"
                maxlength="100"
                placeholder="Digite aqui"
                ></textarea>
        </div>
        <div class="form-group mt-2 mb-2">
            <label for="name">Descrição longa:</label>
            <textarea
                name="long_description" v-model="form.data.long_description" id="long_description"
                class="form-control w-100 resize-none"
                rows="10"
                placeholder="Digite aqui"
                ></textarea>
        </div>

        <div class="form-group">
            <FormSubmitButton :class="`w-100 button-primary mb-3`" :disabled="form.loading" label="Salvar" />
            <button type="button" class="btn button-primary--light w-100" :disabled="form.loading" @click="resetForm">Cancelar</button>
        </div>
      </form>
    </section>
  </section>
</template>

<style lang="scss">
.producer-profile-img{
    width: 100px;
}
</style>