<script setup>
import { hideSidebar } from './helpers/sidebar';

const props = defineProps(['to']);

</script>
<template>
    <router-link :to="to" @click="hideSidebar('sidebar_menu')"><slot></slot></router-link>
</template>