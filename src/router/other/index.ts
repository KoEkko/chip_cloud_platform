const Other = () => import("@/views/other/OtherVue.vue");
export default {
	path: "/other/OtherVue",
	name: "OtherVue",
	component: Other,
	meta: {
		title: "其他",
		svgIcon: "other",
		roles: ["admin"],
	},
	children: [],
};
