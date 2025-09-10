// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import Vuetify plugin
import vuetify from "./plugines/vuetify";

createApp(App).use(router).use(vuetify).mount("#app");
