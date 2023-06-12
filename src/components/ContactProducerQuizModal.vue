<script setup>
import { useAccountStore } from '../stores';
import toaster from '../helpers/toaster';
import { ref, computed } from 'vue';
import { closeModal } from './helpers/modal';
import QuizStepsNavigation from './QuizStepsNavigation.vue';

const accountStore = useAccountStore();
const props = defineProps(['modalId', 'quiz', 'whatsappUrl']);
const currentQuestionIndex = ref(0);

function getMessageText () {
  const answers = props.quiz.questions.map(question => encodeURI(`*${question.question}* ${question.answer ?? ''}`));

  return `%0A%0A${encodeURI('Resposta do questionário: ')}%0A${answers.join('%0A')}`;  
}

function openWhatsapp () {
  const url = `${props.whatsappUrl}${getMessageText()}`;
  window.open(url, '_blank');
}

function nextStep () {
  if (currentQuestionIndex.value == props.quiz.questions.length - 1) {
    openWhatsapp();
    return;
  }

  currentQuestionIndex.value++;
}

function prevStep() {
  if (currentQuestionIndex.value == 0) {
    return;
  }
  
  currentQuestionIndex.value--;
}

const currentQuestion = computed(() => {
  if (!props.quiz) {
    return null
  }

  return props.quiz.questions[currentQuestionIndex.value] ?? null;
})
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
            Falar com produtor
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </h5>
        </div>
        <div class="modal-body text-left color-default">
          <p class="text-center">
            Responda as perguntas a seguir para otimizar o seu contato com o produtor
          </p>
          <div class="bg-light border-radius px-3 py-2" v-if="props.quiz && currentQuestion">
            <p class="w-100 color-secondary text-bold text-center mb-3">Pergunta {{ currentQuestionIndex + 1 }} de {{ props.quiz.questions.length }}</p>
            
            <p>{{ currentQuestion.question }}</p>

            <input type="text" class="form-control" placeholder="Digite aqui" v-if="currentQuestion.type == 'shortText'" v-model="props.quiz.questions[currentQuestionIndex].answer">
            <textarea
              v-if="currentQuestion.type == 'longText'"
              v-model="props.quiz.questions[currentQuestionIndex].answer"
              id="short-description"
              class="form-control w-100 resize-none"
              rows="3"
              maxlength="100"
              placeholder="Digite aqui"
            ></textarea>
            <select class="form-control" v-if="currentQuestion.type == 'options'" v-model="props.quiz.questions[currentQuestionIndex].answer">
              <option :value="undefined" :selected="!props.quiz.questions[currentQuestionIndex].answer ? 'true' : 'false'">Selecione uma opção</option>
              <option v-for="(option, index) in currentQuestion.options" :key="index" :value="option">{{ option }}</option>
            </select>

            <button class="btn button-primary mt-3 w-100" type="button" @click="nextStep">Continuar</button>
          </div>
        </div>

        <div class="modal-footer">
            <QuizStepsNavigation @next-step="nextStep" @prev-step="prevStep" :disable-prev="currentQuestionIndex == 0" prev-label="Voltar" />
        </div>
    </form>
    </div>
    </div>
  </div>
</template>