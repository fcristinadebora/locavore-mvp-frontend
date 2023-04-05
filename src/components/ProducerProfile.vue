<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import localStorage from "../helpers/localStorage";

const router = useRouter();
const form = ref({
    loading: false,
    error: null,
    errors: [],
    data: {
        isEnabled: false
    }
})

</script>
<template>
  <section id="profile-and-security" class="w-100">
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Perfil de Produtor</h1>
    </section>
    <section class="text-left mt-3">
      <form action="">
        <div class="form-group">
            <div class="form-check form-switch">
                <input class="form-check-input" :disabled="form.loading" type="checkbox" role="switch" @click="form.data.isEnabled = !form.data.isEnabled" id="enableProducerProfile">
                <label class="form-check-label" for="enableProducerProfile">
                    <span v-if="!form.data.isEnabled">
                        Ativar perfil de produtor
                    </span>
                    <span v-if="form.data.isEnabled">
                        Desativar perfil de produtor
                    </span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" :disabled="form.loading || !form.data.isEnabled" class="form-control">
        </div>
        <div class="form-group">
            <label for="name" class="w-100">Foto:</label>

            <div class="w-100 d-flex justify-content-start">
                <div class="producer-profile-img ratio-1-1 border-radius bg-light float-start me-2 mb-3 text-center">
                    <img v-if="false" :src="producer.profile_picture" alt="Producer image" class="border-radius" />
                    <i class="bi bi-image icon-lg" v-if="true"></i>
                </div>
                <div class="d-flex flex-column justify-content-start flex-grow-1">
                    <label for="" class="mb-2 w-100">
                        Selecionar outra imagem
                        <input type="file" accept="image" name="" class="form-control w-100" id="">
                    </label>
                    <label for="">
                        <input type="checkbox" name="" id="">
                        Apagar foto atual</label>
                </div>
            </div>
        </div>
        <div class="form-group mt-2 mb-2">
            <label for="name">Descrição curta:</label>
            <textarea
                name=""
                id=""
                class="form-control w-100 resize-none"
                rows="3"
                maxlength="100"
                placeholder="Digite aqui"
                ></textarea>
        </div>
        <div class="form-group mt-2 mb-2">
            <label for="name">Descrição longa:</label>
            <textarea
                name=""
                id=""
                class="form-control w-100 resize-none"
                rows="10"
                placeholder="Digite aqui"
                ></textarea>
        </div>

        <div class="form-group">
            <button class="btn button-primary w-100 mb-2">Salvar</button>
            <button class="btn button-primary--light w-100">Cancelar</button>
        </div>
        <hr class="my-5">

        <button class="btn button-primary--light w-100 mb-2">
            <i class="bi bi-lock"></i>
            Alterar senha
        </button>
        <button class="btn button-primary--light w-100 mb-2">
            <i class="bi bi-person-x-fill"></i>
            Excluir minha conta
        </button>
      </form>
    </section>
  </section>
</template>

<style lang="scss">
.producer-profile-img{
    width: 100px;
}
</style>