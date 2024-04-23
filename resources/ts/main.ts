import * as Sentry from "@sentry/vue";
import { createApp } from "vue";
import App from "./components/App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { Model } from "vue-api-query";
import router from "./router";
import api from "./services/api";

Model.$http = api;

const app = createApp(App).use(router).use(VueQueryPlugin);

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN_PUBLIC,
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
  ],
});

app.mount("#app");
