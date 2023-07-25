<template>
	<a-layout-sider v-model:collapsed="collapsed" collapsible width="350px" collapsed-width="110px" theme="dark">
		<div class="logo">
			<img src="@/assets/kxy.png" style="height: 64px" />
		</div>
		<a-tabs
			v-model:activeKey="activeKey"
			:tab-position="tabPosition"
			:tab-bar-style="tabBarStyle"
			@tab-click="tabClick"
		>
			<template v-for="item in tabPanes" :key="item.key">
				<a-tab-pane>
					<template #tab>
						<span>
							<component :is="item.icon"></component>
							{{ item.tab }}
						</span>
					</template>
					<!-- <component :is="item.tabPane"></component> -->
				</a-tab-pane>
			</template>
		</a-tabs>
	</a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProjectTree from "./tabPanes/ProjectTree.vue";
import { FolderOpenOutlined, ApiOutlined, CalendarOutlined } from "@ant-design/icons-vue";
import { TabsProps } from "ant-design-vue/es/tabs";

// TabBar样式
const tabBarStyle = ref({
	color: "#fff",
});

const collapsed = ref<boolean>(true);
const tabPosition = ref<TabsProps["tabPosition"]>("left");
const activeKey = ref("1");

const tabClick = () => {
	if (collapsed.value) {
		collapsed.value = !collapsed.value;
	}
};

// tabPanes结构
const tabPanes = [
	{
		key: "1",
		tab: "工程",
		icon: FolderOpenOutlined,
		tabPane: ProjectTree,
	},
	{
		key: "2",
		tab: "元件库",
		icon: ApiOutlined,
		tabPane: ProjectTree,
	},
	{
		key: "3",
		tab: "常用库",
		icon: CalendarOutlined,
		tabPane: ProjectTree,
	},
];
</script>

<style lang="scss" scoped>
.logo {
	display: flex;
	justify-content: center;
}
.ant-tabs {
	color: #fff;
}
.ant-tabs-content-holder {
	width: 500px;
}
.site-layout .site-layout-background {
	background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
	background: #141414;
}

.ant-tree {
	color: #fff;
	background-color: black;
}
</style>
