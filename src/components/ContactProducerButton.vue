
<script setup>
import { computed, onMounted, ref } from 'vue';
import FloatingFooterButton from './FloatingFooterButton.vue';
import { useQuizesStore } from '../stores';
import ContactProducerQuizModal from './ContactProducerQuizModal.vue';
import { openModal } from './helpers/modal';

const quizesStore = useQuizesStore();
const props = defineProps(['producer', 'quizId', 'previousMessage']);

const quiz = ref(null);

onMounted(() => {
    fetchQuiz();
})

const whatsappReadyNumber = computed(() => {
    if (!props.producer) {
        return '';
    }
    if (!props.producer.contacts) {
        return '';
    }

    const whatsapp = props.producer.contacts.find(contact => contact.type == 'whatsapp');
    if (!whatsapp) {
        return '';
    }

    const searchRegExp = /\D/g;
    const replaceWith = '';
    const result = whatsapp.value.replace(searchRegExp, replaceWith);
    return result.toString();
})

const whatsappUrl = computed(() => {
    const previousMessage = props.previousMessage ? encodeURI(props.previousMessage) : '';

    // return whatsappReadyNumber ? `https://wa.me/55${whatsappReadyNumber.value}?text=${previousMessage}` : ''
    return whatsappReadyNumber ? `https://wa.me/351915320497?text=${previousMessage}` : ''
});

async function contactProducer() {
    if (!whatsappReadyNumber.value) {
        return;
    }

    const itemQuiz = await fetchQuiz();
    if (!itemQuiz) {
        return window.open(whatsappUrl.value, '_blank');
    }

    if (quiz.value && !quiz.value.is_active) {
        return window.open(whatsappUrl.value, '_blank');
    }

    openModal('contact-quiz');
}

async function fetchQuiz () {
    if (!props.quizId) {
        return null;
    }

    console.log('aaaa');
    const result = await quizesStore.findById(props.quizId);
    console.log(result.quiz);
    return result.quiz;
}

</script>

<template>
    <FloatingFooterButton v-if="whatsappReadyNumber">
        <button class="btn button-primary w-100 mt-2" type="button" @click="contactProducer()">Falar com produtor</button>
    </FloatingFooterButton>
    <ContactProducerQuizModal modal-id="contact-quiz" :quiz="quiz" :whatsapp-url="whatsappUrl" />
</template>