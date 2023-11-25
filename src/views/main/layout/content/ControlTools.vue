<template>
	<div class="control">
		<div class="title">Control</div>
		<div class="check-box">
			<div class="category">
				<div class="c1"></div>
				<div class="c2"></div>
				<div class="c3">V</div>
			</div>
			<div class="c_box">
				<template v-for="child in options" :key="child.id">
					<div class="item">
						<div class="i1"></div>
						<div :class="[{ i2: getStyle(child) }, { i22: !getStyle(child) }]">{{ child.layername }}</div>
						<div ref="i3" class="i3"><input ref="InputBox" type="checkbox" @click="onCheckBoxClick(child)" /></div>
					</div>
				</template>
			</div>
			<div class="unit_box">
				<a-tree v-model:checkedKeys="checkedKeys" checkable :height="233" :tree-data="treeData">
					<template #title="{ title, key }">
						<span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
						<template v-else>{{ title }}</template>
					</template>
				</a-tree>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, nextTick, Ref, watch } from "vue";
import type { TreeProps } from "ant-design-vue";
import bus from "../../../../utils/EventBus";
type Toptions = {
	id: string;
	layername: string;
	pid?: string;
};
type UnitOption = {
	type: string;
	["struct name"]: string;
	title: string;
	children: any[];
	key?: string;
};
const emit = defineEmits(["onCheckBoxClick"]);

let checkedOptions: string[] = [];
const onCheckBoxClick = (child: Toptions) => {
	const option = child.layername;
	if (checkedOptions.includes(option)) {
		checkedOptions = checkedOptions.filter((o) => o !== option);
	} else {
		checkedOptions.push(option);
	}
	emit("onCheckBoxClick", checkedOptions);
};
const options = ref<Toptions[]>();
const InputBox = ref() as Ref<HTMLInputElement[]>;
let unitOptions: UnitOption[] = [];
setTimeout(() => {
	fetch("/js/final_design.json")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			options.value = data.layerInfo;
			unitOptions = data.data.filter((o: any) => {
				return o.type !== "sref";
			});
			treeData.value = dig(unitOptions);
			options.value?.forEach((item) => {
				checkedOptions.push(item.layername);
			});
			nextTick(() => {
				InputBox.value.forEach((i) => {
					i.checked = true;
				});
			});
		});
}, 100);

bus.on("jsonLoaded", (data: any) => {
	data = JSON.parse(data);
	options.value = data.layerInfo;
	options.value?.forEach((item) => {
		checkedOptions.push(item.layername);
	});
	nextTick(() => {
		InputBox.value.forEach((i) => {
			i.checked = true;
		});
	});
});

const getStyle = function (value: Toptions) {
	return !!value.pid;
};
const treeData: Ref<TreeProps["treeData"]> = ref([]);

function dig(data: UnitOption[], level: number = 0, isChild: boolean = false, index: number = 0) {
	const list: TreeProps["treeData"] = [];
	for (let i = 0; i < data.length; i++) {
		let key: string;
		key = !isChild ? `${level}-${i}` : `${level}-${i}-${index}`;
		const title = data[i]["struct name"] || `${data[i].type}-${i}`;
		const treeNode: TreeProps["treeData"][number] = {
			title,
			key,
		};
		if (data[i].children) {
			treeNode.children = dig(data[i].children, 1, true, i);
		}
		list.push(treeNode);
	}
	return list;
}

const checkedKeys: Ref<string[]> = ref([]);
watch(checkedKeys, (newValue, oldValue) => {
	bus.emit("unitOptionChange", { newValue, oldValue });
});
</script>

<style scoped>
.control {
	display: flex;
	flex-direction: column;
	.title {
		height: 32px;
		font-size: 16px;
		font-weight: 800;
		background-color: #fff;
		padding: 4px 0 4px 4px;
	}
	.check-box {
		min-width: 250px;
		width: 12vw;
		height: calc(100% - 32px);
		border: 1px solid gray;
		background-color: #fff;
		.category {
			height: 16px;
			display: flex;
			border-bottom: 1px solid;
			.c1 {
				flex: 2;
				background: #f1f1f1;
				border-right: 1px solid;
			}
			.c2 {
				flex: 2;
				background: #f3f3f3;
				border-right: 1px solid;
			}
			.c3 {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f5f5f5;
			}
		}
		.c_box {
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #f2f2f2;
			.item {
				height: 20px;
				width: 100%;
				display: flex;
				.i1 {
					flex: 2;
				}
				.i2 {
					flex: 2;
					display: flex;
					align-items: center;
				}
				.i22 {
					flex: 2;
					display: flex;
					align-items: center;
					justify-content: end;
				}
				.i3 {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
}
</style>
