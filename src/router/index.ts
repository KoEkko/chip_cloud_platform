import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./config";

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

// 导航守卫
// router.beforeEach((to, path) => {
// 	// to.path === '/login'
// 	return true;
// });

export default router;
