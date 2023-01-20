import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue3-carousel/dist/carousel.css";
import "./assets/scss/app.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
