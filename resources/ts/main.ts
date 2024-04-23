import * as Sentry from "@sentry/vue";
import { createApp } from "vue";
import App from "./components/App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { Model } from "vue-api-query";
import router from "./router";
import api from "./services/api";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN_PUBLIC,
});

Model.$http = api;

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
