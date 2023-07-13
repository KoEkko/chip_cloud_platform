const ChildOne = () => import("@/views/other/children/ChildOne.vue");
export default {
	path: "other/children/ChildOne",
	name: "ChildOne",
	component: ChildOne,
	meta: {
		title: "其他1",
		roles: ["admin", "editor"],
	},
	children: [],
};
