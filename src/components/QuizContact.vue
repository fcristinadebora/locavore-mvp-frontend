<script setup>
import StepsNavigation from "./QuizStepsNavigation.vue";
import StepCounter from "./QuizStepCounter.vue";
import { useRouter } from "vue-router";
import localStorage from "../helpers/localStorage";
import { vMaska } from "maska"
import FormSubmitButton from "./FormSubmitButton.vue";
import { ref, onMounted, watch } from "vue";
import { useAccountStore, useAuthStore } from "../stores";

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
    <form @submit.prevent="handleSubmit">
    <section id="quiz-long-description">
      <section>
        <StepCounter current-step="8" />
        <h1 class="color-primary fw-bold text-center">
          Contato e redes sociais
        </h1>
      </section>
      <section id="quiz-long-description-form" class="my-3">
          <div class="form-group">
            <label for="whatsapp" class="text-bold">Whatsapp (preenchimento recomendado):</label>
            <input type="tel" id="whatsapp" v-model="form.data.whatsapp" v-maska data-maska="(##) #####-####" class="form-control my-2" placeholder="(xx) xxxxx-xxxx" />
          </div>
          <div class="form-group">
            <label for="phone" class="text-bold">Telefone:</label>
            <input type="tel"  id="phone" v-model="form.data.phone" v-maska data-maska="(##) #####-####" class="form-control my-2" placeholder="(xx) xxxxx-xxxx" />
          </div>
          <div class="form-group">
            <label for="instagram" class="text-bold">Usuário no Instagram:</label>
            <input type="text" id="instagram" v-model="form.data.instagram" class="form-control my-2" />
          </div>
          <div class="form-group">
            <label for="facebook" class="text-bold">Link para o Facebook:</label>
            <input type="text" id="facebook" v-model="form.data.facebook" class="form-control my-2" />
          </div>
          <div class="form-group">
            <label for="website" class="text-bold">Website:</label>
            <input type="text" id="website" v-model="form.data.website" class="form-control my-2" />
          </div>
      </section>
      <FormSubmitButton class="button-primary mt-3 mb-5 w-100" :disabled="form.loading" label="Salvar e continuar" />
    </section>
    </form>
    <StepsNavigation @next-step="nextStep" @prev-step="prevStep" />
  </section>
</template>
