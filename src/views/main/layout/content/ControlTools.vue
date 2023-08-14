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
						<div :class="[{ i2: getStyle(child) }, { i22: !getStyle(child) }]">{{ child.value }}</div>
						<div class="i3"><input type="checkbox" @click="inputClick(child)" /></div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useShapeStore } from "../../../../store/modules/shape";
// import { IGraphic } from "../../../../store/modules/shape";
const { getShapeGraphicArr, getContainer } = useShapeStore();
const shapeGrahpicArr = getShapeGraphicArr();
type Toptions = {
	id: string;
	value: string;
	pid?: string;
	checked: boolean;
};

const container = getContainer();
let hiddenItems: string[] = [];
const inputClick = (child: Toptions) => {
	const state = child.checked;
	const filterArray = shapeGrahpicArr.filter((item) => item.category.includes(child.value));
	if (!state) {
		// 未勾选状态
		// false -> true
		child.checked = !child.checked;
		const needHidden = filterArray.filter((item) => !hiddenItems.includes(item.id));
		needHidden.forEach((item) => {
			const id = item.id;
			const graphics = item.graphics;
			container.removeChild(graphics);
			hiddenItems.push(id);
		});
	} else {
		// 勾选状态
		// true -> false
		child.checked = !child.checked;
		const needDisplay = filterArray.filter((item) => hiddenItems.includes(item.id));
		// 获取所有选择了的复选框
		const checkdOptions = Array.from(
			options.value.filter((item) => item.checked === true),
			(input) => input.value
		);
		needDisplay.forEach((item) => {
			// 只有当这个item不在任何一个被选择的复选框的category中时，才显示它
			if (!item.category.some((cat) => checkdOptions.includes(cat))) {
				const id = item.id;
				const graphics = item.graphics;
				container.addChild(graphics);
				hiddenItems = hiddenItems.filter((i) => i !== id);
			}
		});
	}
};

const options = ref<Toptions[]>([
	{ id: uuidv4(), value: "Shape", pid: "1", checked: false },
	{ id: uuidv4(), value: "Instance Pin", checked: false },
	{ id: uuidv4(), value: "Instance Obs", checked: false },
	{ id: uuidv4(), value: "Instance Pdn", checked: false },
	{ id: uuidv4(), value: "IO Pin", checked: false },
	{ id: uuidv4(), value: "Instance", pid: "2", checked: false },
	{ id: uuidv4(), value: "Standard Cell", checked: false },
	{ id: uuidv4(), value: "IO Cell", checked: false },
	{ id: uuidv4(), value: "Block", checked: false },
	{ id: uuidv4(), value: "Pad", checked: false },
	{ id: uuidv4(), value: "Net", pid: "3", checked: false },
	{ id: uuidv4(), value: "Signal", checked: false },
	{ id: uuidv4(), value: "Clock", checked: false },
	{ id: uuidv4(), value: "Power", checked: false },
]);

const getStyle = function (value: Toptions) {
	return !!value.pid;
};
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
