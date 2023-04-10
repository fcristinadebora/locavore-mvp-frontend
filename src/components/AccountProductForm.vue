<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import localStorage from "../helpers/localStorage";
import { useAccountProductStore, useCategoriesStore } from "../stores";
import { vMaska } from "maska"
import FormSubmitButton from "./FormSubmitButton.vue";
import toaster from "../helpers/toaster";
import QuizesSelectInput from "./QuizesSelectInput.vue";

const router = useRouter();
const route = useRoute();
const accountProductStore = useAccountProductStore();
const form = ref({
    loading: false,
    error: null,
    errors: [],
    data: {
        delete_image: false,
        is_active: true,
        name: null,
        description: null,
        price: null,
        unit_of_price: null,
        image: null,
        quiz_id: null,
        categories: [],
    }
})
const formData = ref(new FormData());

const categoriesStore = useCategoriesStore();

onMounted(() => {
    if (route.params.id) {
        fetchCurrentData();
    }
})

async function fetchCurrentData() {
    const product = await accountProductStore.findById(route.params.id);

    form.value.data.is_active = product.data?.is_active ?? null;
    form.value.data.name = product.data?.name ?? null;
    form.value.data.description = product.data?.description ?? null;
    form.value.data.price = product.data?.price?.replace('.', ',') ?? null;
    form.value.data.unit_of_price = product.data?.unit_of_price ?? null;
    form.value.data.image = product.data?.imageUrl ?? null;
    form.value.data.quiz_id = product.data?.quiz_id ?? null;
    form.value.data.categories = product.data?.categories ? product.data?.categories.map(category => parseInt(category.id)) : [];
}

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    formData.value.append('delete_image', form.value.data.delete_image ? 1 : 0);
    formData.value.append('is_active', form.value.data.is_active ? 1 : 0);
    form.value.data.name && formData.value.append('name', form.value.data.name);
    form.value.data.description && formData.value.append('description', form.value.data.description);
    form.value.data.price && formData.value.append('price', form.value.data.price?.replace(',', '.'));
    form.value.data.quiz_id && formData.value.append('quiz_id', form.value.data.quiz_id);
    form.value.data.unit_of_price && formData.value.append('unit_of_price', form.value.data.unit_of_price);
    form.value.data.categories.forEach(category => {
        formData.value.append('categories[]', parseInt(category));
    })

    if (!route.params.id) {
        await accountProductStore.create(formData.value);
        toaster.success('Produto criado com sucesso');
    } else {
        await accountProductStore.update(route.params.id, formData.value);
        toaster.success('Produto atualizado com sucesso');
    }
    router.push('/account/products');
  } catch (e) {
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  formData.value.append('image', file);
}

</script>
<template>
  <section id="profile-and-security" class="w-100">
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Novo produto</h1>
    </section>
    <section class="text-left mt-5">
      <form @submit.prevent="handleSubmit" class="color-default">
        <div class="form-group mb-3">
            <div class="form-check form-switch">
                <input class="form-check-input" :disabled="form.loading" type="checkbox" role="switch" @click="form.data.is_active = !form.data.is_active" id="enableProducerProfile" :checked="form.data.is_active">
                <label class="form-check-label" for="enableProducerProfile">
                    <span v-if="!form.data.is_active">
                        Oculto
                    </span>
                    <span v-if="form.data.is_active">
                        Visível
                    </span>
                </label>
            </div>
        </div>
        <div class="form-group mb-3">
            <label for="name">Nome:</label>
            <input type="text" class="form-control" v-model="form.data.name">
        </div>
        <div class="form-group mb-3">
            <label for="name" class="w-100">Foto:</label>

            <div class="w-100 d-flex justify-content-start">
                <div class="producer-profile-img ratio-1-1 border-radius bg-light float-start me-2 mb-3 text-center">
                    <img v-if="form.data.image" :src="form.data.image" alt="Imagem" class="border-radius ratio-1-1 w-100" />
                    <i class="bi bi-image icon-lg" v-if="!form.data.image"></i>
                </div>
                <div class="d-flex flex-column justify-content-start flex-grow-1">
                    <label for="" class="mb-2 w-100">
                        Selecionar imagem
                        <input type="file" accept="image/*" name="" class="form-control w-100" @change="handleFileSelect" id="">
                    </label>
                    <label for="delete-image" v-if="form.data.image">
                        <input type="checkbox" id="delete-image" v-model="form.data.delete_image" :value="true">
                        Apagar foto atual</label>
                </div>
            </div>
        </div>
        <div class="w-100 d-block d-md-flex justify-content-between">
            <div class="col-md-6 col-12 pe-2 mb-3 form-group">
                <label for="name">Preço (R$):</label>
                <input type="text" v-maska data-maska="0,99" data-maska-tokens="0:\d:multiple|9:\d:optional" class="form-control" v-model="form.data.price">
            </div>
            <div class="col-md-6 col-12 p-0 mb-3 form-group">
                <label for="name">Unidade de preço:</label>
                <input type="text" class="form-control" v-model="form.data.unit_of_price">
                <label for="">Ex: unidade, kg, litro, etc</label>
            </div>
        </div>
        <div class="form-group mb-3">
            <label for="name">Descrição curta:</label>
            <textarea
                v-model="form.data.description"
                class="form-control w-100 resize-none"
                rows="3"
                maxlength="100"
                placeholder="Digite aqui"
                ></textarea>
        </div>

        <div class="form-group mb-3">
            <label for="">Categoria(s)</label>
            <div class="checklist-scroll py-2 px-3 border-radius">
                <label v-for="(category, index) in categoriesStore.allCategories" :key="index" class="w-100">
                    <input type="checkbox" v-model="form.data.categories" :value="parseInt(category.id)"> {{ category.name }}
                </label>
            </div>
        </div>

        <div class="form-group mb-3">
            <label for="">Questionário</label>
            <QuizesSelectInput v-model="form.data.quiz_id" />
        </div>

        <div class="form-group mt-5">
            <FormSubmitButton class="button-primary w-100 mb-2" :loading="form.loading" label="Salvar" />
            <router-link to="/account/products" class="btn button-primary--light w-100">Cancelar</router-link>
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