import type { Router } from "vue-router";
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

/* 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: "/page1",
		component: () => import("@/pages/page1/CIndex.vue"),
	},
	{
		path: "/page2",
		component: () => import("@/pages/page2/CIndex.vue"),
	},
	{
		path: "/page3",
		component: () => import("@/pages/page3/CIndex.vue"),
	},
];

/**
 * 动态路由
 * 用来放置有权限(Roles属性)的路由
 * 必须带有Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
	{
		path: "/permission",
		// component: Layouts,
		redirect: "/permission/page",
		name: "Permission",
		meta: {
			title: "权限管理", //菜单的标题
			svgIcon: "lock", // 菜单的svgIcon
			roles: ["admin", "editor"], // 可以在根路由中设置角色
			alwaysShow: true, // 将始终显示根菜单
		},
		children: [
			{
				path: "page",
				component: () => import("@/views/permission/page.vue"),
				name: "PagePermission",
				meta: {
					title: "页面权限",
					roles: ["admin"], // 或者在子导航中设置角色
				},
			},
			{
				path: "directive",
				component: () => import("@/views/permission/directive.vue"),
				name: "DirectivePermission",
				meta: {
					title: "指令权限", // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
				},
			},
		],
	},
	{
		path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
		redirect: "/404",
		name: "ErrorPage",
		meta: {
			hidden: true,
		},
	},
];

const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
});

export default router;
