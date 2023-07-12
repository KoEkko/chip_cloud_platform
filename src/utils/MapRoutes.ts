import type { RouteRecordRaw } from "vue-router";

// 获取所有的路由对象
function loadLocalRoutes() {
	const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", { eager: true });
	const localRoutes: RouteRecordRaw[] = [];
	for (const key in files) {
		const module = files[key];
		localRoutes.push(module.default);
	}
	return localRoutes;
}

/**
 * 根据菜单匹配路由
 * @param userMenus 后端返回的字段中该用户拥有的路由权限
 */
export function mapMenusToRoutes(userMenus: any[]) {
	// 加载本地路由
	const localRoutes = loadLocalRoutes();
	// 根据菜单去匹配正确的路由
	const routes: RouteRecordRaw[] = [];
	for (const menu of userMenus) {
		for (const subitem of menu.children) {
			const route = localRoutes.find((item) => item.path === subitem.url);
			if (route) {
				routes.push(route);
			}
		}
	}
	return routes;
}
