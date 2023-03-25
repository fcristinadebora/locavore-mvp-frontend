<script setup>
import * as bootstrap from "bootstrap";
import { computed, onMounted } from 'vue';
import { useSearchStore } from '../stores';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const referrer = computed(() => {
    let query = '';
    if (route.query) {
        query = '?';
        const params = [];
        for (let entry of Object.entries(route.query)) {
            params.push(`${entry[0]}=${entry[1]}`);
        }
        query += params.join('&');
    }
    return `${route.path}${query}`;
});

</script>

<template>
    <div
    class="modal my-modal"
    tabindex="-1"
    id="must-login-modal"
  >
    <div class="modal-dialog container">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title w-100 text-center">
            Entre ou cadastre-se
            <button
              type="button"
              class="close-my-modal btn-close btn-sm float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref="closeModal"
            ></button>
          </h5>
        </div>
        <div class="modal-body text-center">
          <p>Oops! Essa operação é exclusiva para usuários cadastrados, entre ou cadastre-se para continuar.</p>
        </div>
        <div class="modal-footer">
          <router-link
            :to="`/login?referrer=${referrer}`"
            type="button"
            class="btn button-primary w-100"
          >
            Já tenho uma conta
          </router-link>
          <router-link
            :to="`/register?referrer=${referrer}`"
            type="button"
            class="btn button-primary--light w-100"
          >
            Ainda não tenho uma conta
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>