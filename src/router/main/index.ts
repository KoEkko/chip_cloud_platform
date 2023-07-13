import CommPermission from "./children/CommPermission";
import PagePermission from "./children/PagePermission";

const mainvue = () => import("@/views/main/MainVue.vue");
export default {
	path: "/main/MainVue",
	name: "MainVue",
	component: mainvue,
	meta: {
		title: "权限管理", // 菜单的标题
		svgIcon: "lock", // 菜单的svgIcon
		roles: ["admin", "editor"], //可以根路由中设置角色
	},
	children: [CommPermission, PagePermission], //根路由下的子路由
};
