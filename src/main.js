import { createApp } from "vue";
import App from "./App.vue";
// vue router
import router from "./router/index.js";
// vuetify
import { vuetify } from "./plugins/vuetify.js";

const app = createApp(App);

app.use(vuetify);
app.use(router).mount("#app");
