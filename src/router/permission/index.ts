const DirectiveVue = () => import("@/views/permission/DirectiveVue.vue");
export default {
	path: "/permission/DirectiveVue",
	name: "OtherVue",
	component: DirectiveVue,
	meta: {
		title: "其他",
		svgIcon: "Directive",
		roles: ["admin"],
	},
	children: [],
};
