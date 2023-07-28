<template>
	<div>
		<a-tree :show-line="showLine" :default-expanded-keys="['0-0-0']" :tree-data="treeData" @right-click="onRightClick">
			<template #icon><carry-out-outlined /></template>
			<template #title="{ dataRef }">
				<template v-if="dataRef.key === '0-0-0-1'">
					<div>multiple line title</div>
				</template>
				<template v-else>
					<a-dropdown :trigger="['contextmenu']">
						<div>
							{{ dataRef.title }}
						</div>
						<!-- Overlay图层 -->
						<template #overlay>
							<a-menu>
								<a-menu-item key="1" @click="menuItemClick">新建工程</a-menu-item>
								<a-menu-item key="2">删除工程</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</template>
			</template>
			<template #switcherIcon="{ defaultIcon }">
				<component :is="defaultIcon" />
			</template>
		</a-tree>
	</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { CarryOutOutlined } from "@ant-design/icons-vue";
import type { TreeProps } from "ant-design-vue";
import { EventDataNode } from "ant-design-vue/lib/tree";
const showLine = ref<boolean>(true);

/**
 * treeData:通过 http请求获取数据
 */
const treeData = ref<TreeProps["treeData"]>([
	{
		title: "parent 1",
		key: "0-0",
		children: [
			{
				title: "parent 1-0",
				key: "0-0-0",
				children: [
					{ title: "leaf", key: "0-0-0-0" },
					{
						key: "0-0-0-1",
					},
					{ title: "leaf", key: "0-0-0-2" },
				],
			},
			{
				title: "parent 1-1",
				key: "0-0-1",
				children: [
					{ title: "leaf 1", key: "0-0-2-0" },
					{
						title: "leaf 2",
						key: "0-0-2-1",
					},
				],
			},
		],
	},
	{
		title: "parent 2",
		key: "0-1",
	},
]);

// 保存节点信息
let child: any;
let nodeDraft: EventDataNode;
const onRightClick: TreeProps["onRightClick"] = ({ node }) => {
	console.log(treeData.value);
	treeData.value?.forEach((item) => {
		if (item.key === node.key) {
			!item.children && (item.children = []);
			child = item.children;
			nodeDraft = node;
		}
	});
};

// TODO: 点击新增的时候，弹出Input表单，确定之后新建一个工程
// title: 是表单的内容
// key：是自动生成的
const menuItemClick = () => {
	child.push({ title: "parent 1-2", key: `${nodeDraft.key}-${child.length - 1}` });
	console.log(child);
};
// const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
// 	console.log("selected", selectedKeys, info);
// };
</script>
<style scoped>
.ant-tabs-content-holder {
	margin-top: 64px;
}
</style>
