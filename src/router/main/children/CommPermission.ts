const CommPermission = () => import("@/views/main/children/CommPermission.vue");
export default {
	path: "main/children/CommPermission",
	name: "CommPermisson",
	component: CommPermission,
	meta: {
		title: "指令权限",
		roles: ["admin"],
	},
	children: [],
};
