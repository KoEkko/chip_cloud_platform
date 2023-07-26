import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteEslint from "vite-plugin-eslint";

// Ant Design Vue 按需导入
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			sass: {
				javascriptEnabled: true,
			},
		},
	},
	resolve: {
		alias: {
			// 配置路径别名
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://118.24.150.38:84/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	plugins: [
		vue(),
		Components({
			resolvers: [AntDesignVueResolver()],
		}),
		viteEslint(),
	],
});
