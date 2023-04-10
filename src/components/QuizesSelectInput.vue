<script setup>
import { onMounted, watch, ref } from 'vue';
import { useQuizesStore, useAccountStore, useAuthStore } from '../stores';

const quizesStore = useQuizesStore();
const accountStore = useAccountStore();
const authStore = useAuthStore();

defineEmits(['update:modelValue'])
const props = defineProps(['modelValue']);

const quizes = ref([]);
onMounted(() => {
    if (authStore.loggedUser) {
        fetchCurrentData();
    }
})

watch(() => authStore.loggedUser,
    () => fetchCurrentData()
)

async function fetchCurrentData() {
    const producer = await accountStore.getCurrentProducer({include: 'address'});
    
    if (!producer.data) {
        return;
    }

    const result = await quizesStore.list({paginate: 0});
    quizes.value = result.data;
}
</script>

<template>
    <select id="" class="form-control" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <option :value="null">Selecione uma opção</option>
        <option :value="parseInt(quiz.id)" v-for="(quiz, index) in quizes" :key="index">
            {{ quiz.name }} {{ quiz.is_active ? '' : '(desativado)' }}
        </option>
    </select>
</template>