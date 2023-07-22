<template>
	<a-layout style="min-height: 100vh">
		<a-layout-sider v-model:collapsed="collapsed" collapsible width="350px" collapsed-width="110px" theme="dark">
			<div class="logo" />
			<a-tabs
				v-model:activeKey="activeKey"
				:tab-position="tabPosition"
				:tab-bar-style="tabBarStyle"
				@tab-click="tabClick"
			>
				<template v-for="item in tabPanes" :key="item.key">
					<a-tab-pane style="margin-top: 64px">
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
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0; color: black">
				<slot name="header"></slot>
			</a-layout-header>
			<a-layout-content style="margin: 0 16px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>User</a-breadcrumb-item>
					<a-breadcrumb-item>Bill</a-breadcrumb-item>
				</a-breadcrumb>
				<div :style="{ background: '#fff', minHeight: '720px' }">
					<slot name="content"></slot>
				</div>
			</a-layout-content>
			<a-layout-footer style="margin: 0 16px">
				<slot name="footer"></slot>
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProjectTree from "./tabPanes/ProjectTree.vue";
import { FolderOpenOutlined, ApiOutlined, CalendarOutlined } from "@ant-design/icons-vue";
import { TabsProps } from "ant-design-vue/es/tabs";

// TabBar样式
const tabBarStyle = ref({
	color: "#fff",
	margin: "64px 0 0 0",
});

const collapsed = ref<boolean>(false);
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

<style scoped>
#components-layout-demo-side .logo {
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
}

.ant-tabs {
	color: #fff;
}
.ant-tabs-content-holder {
	margin-top: 64px;
	width: 500px;
}
.site-layout .site-layout-background {
	background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
	background: #141414;
}
.ant-tabs {
	height: 100%;
}
.ant-layout-footer {
	padding: 0;
}
.ant-tree {
	color: #fff;
	background-color: black;
}
</style>
