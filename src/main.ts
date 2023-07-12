import { createApp } from "vue";
import App from "./App.vue";
import registerStore from "./store";
import router from "./router";

const app = createApp(App);
app.use(registerStore);
app.use(router);
app.mount("#app");
