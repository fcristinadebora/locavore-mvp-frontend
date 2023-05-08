import { createApp } from "vue";
import { createPinia } from "pinia";
import * as Sentry from "@sentry/vue";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue3-carousel/dist/carousel.css";
import "./assets/scss/app.scss";
import sentry from "./providers/sentry";

const app = createApp(App);

sentry.init(app, router)

app.use(createPinia());
app.use(router);
app.mount("#app");
