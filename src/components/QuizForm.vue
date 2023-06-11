<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import localStorage from "../helpers/localStorage";
import { useAccountProductStore, useCategoriesStore, useQuizesStore } from "../stores";
import { vMaska } from "maska"
import FormSubmitButton from "./FormSubmitButton.vue";
import toaster from "../helpers/toaster";

const router = useRouter();
const route = useRoute();
const quizesStore = useQuizesStore();
const emptyQuestion = {
    question: null,
    type: null,
    order: 0,
    options: [
        ''
    ],
};
const form = ref({
    loading: false,
    error: null,
    errors: [],
    data: {
        is_active: true,
        name: null,
        type: null,
        questions: [
            {...emptyQuestion}
        ],
    }
})

const formData = ref(new FormData());
const typeOptions = ref([
    {
        value: 'shortText',
        label: "Texto curto"
    },
    {
        value: 'longText',
        label: "Texto Longo"
    },
    {
        value: 'options',
        label: "Opções"
    },
]);

const categoriesStore = useCategoriesStore();

onMounted(() => {
    if (route.params.id) {
        fetchCurrentData();
    }
})

async function fetchCurrentData() {
    const result = await quizesStore.findById(route.params.id);

    form.value.data = {...result.quiz}
}

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    form.value.data.is_active = form.value.data.is_active ? 1 : 0;
    form.value.data.questions = form.value.data.questions
        .filter(question => {
            return question.question && question.type
        })
        .map((question, index) => {
            question.order = index;
            question.options = question.options.filter(option => option)
            return question;
        })
    
    if (!route.params.id) {

        await quizesStore.create({...form.value.data});
        toaster.success('Questionário criado com sucesso');
    } else {
        await quizesStore.update(route.params.id, {...form.value.data});
        toaster.success('Questionário atualizado com sucesso');
    }
    router.push('/account/quizes');
  } catch (e) {
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}

function addOption(questionI) {
    const isLastOptionEmpty = !form.value.data.questions[questionI].options[
        form.value.data.questions[questionI].options.length - 1
    ];

    if (isLastOptionEmpty) {
        return;
    }

    form.value.data.questions[questionI].options.push('');
}

function addQuestion() {
    form.value.data.questions[
        form.value.data.questions.length
    ] = {...emptyQuestion};
}

function removeQuestion(questionIndex) {
    form.value.data.questions.splice(questionIndex, 1);
}

function sendPrev(currentIndex) {
    const question = {...form.value.data.questions[currentIndex]}

    form.value.data.questions.splice(currentIndex, 1);
    form.value.data.questions.splice(currentIndex - 1, 0, question);
}

function sendNext(currentIndex) {
    const question = {...form.value.data.questions[currentIndex]}

    form.value.data.questions.splice(currentIndex, 1);
    form.value.data.questions.splice(currentIndex + 1, 0, question);
}

</script>
<template>
  <section id="profile-and-security" class="w-100">
    <section id="login-header" class="text-center">
      <h1 class="color-primary fw-bold text-center">Novo questionário</h1>
    </section>
    <section class="text-left mt-5">
      <form @submit.prevent="handleSubmit" class="color-default">
        <div class="form-group mb-3">
            <div class="form-check form-switch">
                <input class="form-check-input" :disabled="form.loading" type="checkbox" role="switch" @click="form.data.is_active = !form.data.is_active" id="enableProducerProfile" :checked="form.data.is_active">
                <label class="form-check-label" for="enableProducerProfile">
                    <span v-if="!form.data.is_active">
                        Desativado
                    </span>
                    <span v-if="form.data.is_active">
                        Ativo
                    </span>
                </label>
            </div>
        </div>
        <div class="form-group mb-3">
            <label for="title">Nome (apenas para identificação):</label>
            <input type="text" id="title" class="form-control" v-model="form.data.name" placeholder="Digite aqui" required>
        </div>

        <div class="w-100 mb-3">
            <div class="w-100 d-flex justify-content-between">
                <label class="mb-3">Perguntas:</label>
                
            </div>
            
            <div class="d-flex flex-column align-items-start" v-for="(question,index) in form.data.questions" :key="index">
                <header class="mb-3">
                    <h4 class="text-lg text-bold">
                        Pergunta #{{ index + 1 }}
                    </h4>
                </header>
                <div class="d-flex flex-row justify-content-between w-100 mb-3">
                    <div id="order-controls" class="d-flex flex-column justify-content-start align-items-center  pe-2">
                        <div class="btn-group--vertical mb-3">
                            <button class="btn button-primary" title="Enviar para cima" @click="sendPrev(index)"  type="button" v-if="index > 0">
                                <i class="bi bi-chevron-up"></i>
                            </button>
                            <button class="btn button-primary--light" title="Enviar para baixo" @click="sendNext(index)" type="button" v-if="index < form.data.questions.length - 1">
                                <i class="bi bi-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                    <article class="bg-light border-radius flex-grow-1 mx-2 px-3 py-2 mb-3 text-start w-100">
                        <div class="form-group w-100  mb-2">
                            <label for="question">Pergunta:</label>
                            <input type="text" id="question" class="form-control" placeholder="Digite aqui" v-model="form.data.questions[index].question">
                        </div>
                        <div class="form-group w-100  mb-2">
                            <label for="question">Tipo:</label>
                            <select v-model="form.data.questions[index].type" id="type" class="form-control" :required="`${(index < (form.data.questions.length) - 1) ? 'true' : 'false'}`">
                                <option :value="null">Selecione uma opção</option>
                                <option v-for="(type, index) in typeOptions" :key="index" :value="type.value">{{ type.label }}</option>
                            </select>
                        </div>
                        <div class="form-group w-100  mb-2" v-if="form.data.questions[index].type == 'options'">
                            <label for="question">Opções:</label>
                            
                            <input type="text" :placeholder="`Digite a opção #${indexO + 1}`" @keyup="addOption(index)" class="form-control mb-2" v-for="(options, indexO) in form.data.questions[index].options" v-model="form.data.questions[index].options[indexO]">
                        </div>
                    </article>
                    <div class="d-flex flex-column justify-content-between align-items-center  pe-2">
                        <div class="btn-group--vertical mb-2">
                            <button class="btn button-primary" type="button" v-if="index == form.data.questions.length - 1" title="Adicionar pergunta" @click="addQuestion()">
                                <i class="bi bi-plus"></i>
                            </button>
                            <button class="btn button-primary--light" v-if="form.data.questions.length > 1" type="button" title="Excluir" @click="removeQuestion(index)">
                                <i class="bi bi-dash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="form-group mt-5">
            <FormSubmitButton class="button-primary w-100 mb-2" :loading="form.loading" label="Salvar" />
            <router-link to="/account/quizes" class="btn button-primary--light w-100">Cancelar</router-link>
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