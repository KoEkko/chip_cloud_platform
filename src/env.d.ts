declare module "*.vue" {
	import type { DefineComponent } from "vue";

	const vueComponent: DefineComponent<{}, {}, any>;
	export default vueComponent;
}

declare module "lodash-es";

declare module "uuid";

declare module "vue-sketch-ruler";
