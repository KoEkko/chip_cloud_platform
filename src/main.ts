import { createApp } from "vue";
import App from "./App.vue";
import registerStore from "./store";
// import { router } from "./router";
// import { loadDirective } from "./directives";

import "xterm/css/xterm.css";

const app = createApp(App);

// loadDirective(app);

app.use(registerStore);
// app.use(router);
app.mount("#app");
