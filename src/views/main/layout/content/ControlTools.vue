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
						<div class="i3"><input type="checkbox" @click="inputClick(child.value)" /></div>
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
import * as PIXI from "pixi.js";

const { getShapeGraphicArr, getContainer } = useShapeStore();
const shapeGrahpicArr = getShapeGraphicArr();
let hiddenItems: string[] = [];
const container: PIXI.Container = getContainer();
const inputClick = (value: string) => {
	const filterArray = shapeGrahpicArr.filter((item) => item.category.includes(value));
	if (filterArray) {
		filterArray.forEach((item) => {
			const id = item.id;
			const graphics = item.graphics;
			if (hiddenItems.includes(id)) {
				container.addChild(graphics);
				hiddenItems = hiddenItems.filter((i) => i !== id);
			} else {
				container.removeChild(graphics);
				hiddenItems.push(id);
			}
		});
	}
};

const options = ref([
	{ id: uuidv4(), value: "Shape", pid: "1" },
	{ id: uuidv4(), value: "Instance Pin" },
	{ id: uuidv4(), value: "Instance Obs" },
	{ id: uuidv4(), value: "Instance Pdn" },
	{ id: uuidv4(), value: "IO Pin" },
	{ id: uuidv4(), value: "Instance", pid: "2" },
	{ id: uuidv4(), value: "Standard Cell" },
	{ id: uuidv4(), value: "IO Cell" },
	{ id: uuidv4(), value: "Block" },
	{ id: uuidv4(), value: "Pad" },
	{ id: uuidv4(), value: "Net", pid: "3" },
	{ id: uuidv4(), value: "Signal" },
	{ id: uuidv4(), value: "Clock" },
	{ id: uuidv4(), value: "Power" },
]);
const getStyle = function (value: any) {
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
