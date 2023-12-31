import type { Router } from "vue-router";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

// import { usePermissonStoreHook } from "../store/modules/permission";
// import { useUserStoreHook } from "../store/modules/user";
// import { localCache } from "../utils/CacheType";
import mainVue from "./main/index";
/* 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: "/",
		component: mainVue.component,
	},
];

// 菜单动态路由
const modules: Record<string, any> = import.meta.glob("../router/*/index.ts", { eager: true });
const GetAsyncRoutes = (): RouteRecordRaw[] => {
	return Object.keys(modules).map((item) => {
		const Module = modules[item];
		return Module.default;
	});
};

/**
 * 动态路由
 * 用来放置有权限(Roles属性)的路由
 */
export const asyncRoutes: RouteRecordRaw[] = GetAsyncRoutes();

export const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
});

// router.beforeEach(async (to, from, next) => {
// 	console.log("router beforeEach");
// 	console.log(from);
// 	const userStore = useUserStoreHook();
// 	const permissionStore = usePermissonStoreHook();
// 	const token = localCache.getCache("token");
// 	// 如果还没登录并且进入的不是登录页面，重定向为login页面
// 	to.path !== "/login" && !token && next({ path: "/login" });
// 	// 如果已经登录，并准备进入 Login 页面， 则重定向到主页
// 	token && to.path === "/login" && next({ path: "/" });
// 	// 登录了，进入其他页面，先检查用户是否已经获得其权限角色
// 	// 检查用户是否已获得其权限角色
// 	if (userStore.roles.length === 0) {
// 		try {
// 			// 角色是一个数组：["admin", "developer"]
// 			await userStore.getInfo();
// 			const roles = userStore.roles;
// 			// 根据角色生成可访问的 Routes (可访问路由 = 常驻路由 + 有访问权限的动态路由)
// 			permissionStore.setRoutes(roles);
// 			// 将有权限的动态路由添加到Router中
// 			permissionStore.dynamicRoutes.forEach((route) => {
// 				router.addRoute(route);
// 			});
// 			// console.log(permissionStore.routes);
// 			// 所有路由加载完毕后
// 			// 设置 replace 让链接在跳转的时候不会留下历史记录
// 			next({ ...to, replace: true });
// 		} catch {
// 			(err: Error) => {
// 				console.log(err);
// 				next("/login");
// 			};
// 		}
// 	} else {
// 		next();
// 	}
// });
