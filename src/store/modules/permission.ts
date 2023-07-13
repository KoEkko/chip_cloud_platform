import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { asyncRoutes, constantRoutes } from "../../router";
import { store } from "..";

// 判断是否有权限
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
	const routeRoles: string[] | undefined = route.meta?.roles as string[] | undefined;
	return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true; // 为空的话设置默认的角色
};

// 根据角色筛选路由
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
	const res: RouteRecordRaw[] = [];
	routes.forEach((route) => {
		const tempRoute = { ...route };
		if (hasPermission(roles, tempRoute)) {
			if (tempRoute.children) {
				tempRoute.children = filterAsyncRoutes(tempRoute.children, roles);
			}
			res.push(tempRoute);
		}
	});
	return res;
};

// permission store
export const usePermissonStore = defineStore("permission", () => {
	const routes = ref<RouteRecordRaw[]>([]); // 所有路由信息
	const dynamicRoutes = ref<RouteRecordRaw[]>([]); // 动态路由信息

	const setRoutes = (roles: string[]) => {
		const accessdRoutes: RouteRecordRaw[] = filterAsyncRoutes(asyncRoutes, roles);
		routes.value = constantRoutes.concat(accessdRoutes);
		dynamicRoutes.value = accessdRoutes;
	};
	return { routes, dynamicRoutes, setRoutes };
});

export function usePermissonStoreHook() {
	return usePermissonStore(store);
}
