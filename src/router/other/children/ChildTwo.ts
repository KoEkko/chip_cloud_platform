const ChildTwo = () => import("@/views/other/children/ChildTwo.vue");
export default {
	path: "other/children/ChildTwo",
	name: "ChildTwo",
	component: ChildTwo,
	meta: {
		title: "其他2",
		roles: ["admin", "editor"],
	},
	children: [],
};
