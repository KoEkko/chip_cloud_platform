const PagePermission = () => import("@/views/main/children/PagePermission.vue");
export default {
	path: "main/children/PagePermission",
	name: "PagePermission",
	component: PagePermission,
	meta: {
		title: "页面权限",
		roles: ["admin", "editor"],
	},
	children: [],
};
