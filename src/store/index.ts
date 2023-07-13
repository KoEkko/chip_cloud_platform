import { createPinia } from "pinia";
import type { App } from "vue";

export const store = createPinia();
function registerStore(app: App) {
	app.use(store);
}

export default registerStore;
