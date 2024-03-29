<script setup>
import StepsNavigation from "./QuizStepsNavigation.vue";
import StepCounter from "./QuizStepCounter.vue";
import { useRouter } from "vue-router";
import localStorage from "../helpers/localStorage";
import { vMaska } from "maska"
import FormSubmitButton from "./FormSubmitButton.vue";
import { ref, onMounted, watch } from "vue";
import { useAccountStore, useAuthStore } from "../stores";
import ContactForm from "./ContactForm.vue";

const router = useRouter();

const props = defineProps(["currentStep"]);
const authStore = useAuthStore();
const accountStore = useAccountStore();

function nextStep() {
  const referrer = localStorage.getPageReferrer();
  if (referrer) {
    return router.push(referrer);
  }

  router.push("/quiz/success");
}

function prevStep() {
  router.push("/quiz/address");
}

const form = ref({
  loading: false,
  errors: {},
  data: {
    whatsapp: '',
    phone: '',
    email: '',
    instagram: '',
    facebook: '',
    website: ''
  }
});


onMounted(() => {
    fetchCurrentData();
})

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function fetchCurrentData() {
    const producer = await accountStore.getCurrentProducer({include: 'contacts'});
    
    if (!producer.data.contacts) {
      return;
    }
    
    producer.data.contacts?.forEach(contact => {
      form.value.data[contact.type] = contact.value
    });
}

async function handleSubmit() {
  form.value.loading = true;
  
  try {
    const contacts = [
      {
        type: 'whatsapp',
        value: form.value.data.whatsapp
      },
      {
        type: 'phone',
        value: form.value.data.phone
      },
      {
        type: 'instagram',
        value: form.value.data.instagram
      },
      {
        type: 'facebook',
        value: form.value.data.facebook
      },
      {
        type: 'website',
        value: form.value.data.website
      },
    ];

    await accountStore.replaceProducerContacts({'contacts': contacts.filter((contact) => !!contact.value)});
    await accountStore.updateProducer({is_enabled: true});
    nextStep();
  } catch (e) {
    console.error(e)
  } finally {
    form.value.loading = false;
  }
}
</script>

<template>
  <section class="w-100 d-flex flex-column justify-content-between">
    <section id="quiz-long-description">
      <StepCounter current-step="7" />
      <ContactForm @success="nextStep" submit-button-text="Salvar e continuar" />
    </section>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>
