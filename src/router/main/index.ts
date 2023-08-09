import layout from "./layout/index";
export default {
	path: "/main/layout",
	name: "Layout",
	component: layout.component,
	meta: {
		title: "权限管理", // 菜单的标题
		svgIcon: "lock", // 菜单的svgIcon
		roles: ["admin", "editor"], //可以根路由中设置角色
	},
	children: [], //根路由下的子路由
};
