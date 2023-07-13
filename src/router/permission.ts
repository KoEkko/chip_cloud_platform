import router from ".";
import { usePermissonStoreHook } from "../store/modules/permission";
import { useUserStoreHook } from "../store/modules/user";
import { localCache } from "../utils/CacheType";

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStoreHook();
	const permissionStore = usePermissonStoreHook();

	// 判断该用户是否登录
	if (localCache.getCache("token")) {
		if (to.path === "/login") {
			// 如果已经登录，并准备进入 Login 页面， 则重定向到主页
			next({ path: "/" });
		} else {
			// 检查用户是否已获得其权限角色
			if (userStore.roles.length === 0) {
				try {
					// 角色是一个数组：["admin", "developer"]
					await userStore.getInfo();
					const roles = userStore.roles;
					// 根据角色生成可访问的 Routes (可访问路由 = 常驻路由 + 有访问权限的动态路由)
					permissionStore.setRoutes(roles);
					// 将有权限的动态路由添加到Router中
					permissionStore.dynamicRoutes.forEach((route) => {
						router.addRoute(route);
					});
					// 所有路由加载完毕后
					// 设置 replace
					next({ ...to, replace: true });
				} catch {
					(err: Error) => {
						console.log(err);
						next("/login");
					};
				}
			} else {
				next();
			}
		}
	} else {
		// 没有登录
	}
});
