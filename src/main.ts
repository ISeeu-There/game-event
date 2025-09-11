// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";

import router from "./router";

// Import Vuetify plugin
import vuetify from "./plugines/vuetify";

createApp(App).use(router).use(vuetify).mount("#app");
