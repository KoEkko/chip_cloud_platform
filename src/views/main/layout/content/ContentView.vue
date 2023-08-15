<template>
	<div class="content-box">
		<CanvasView ref="canvasView" :shapes="shapeGrahpicArr" :hidden-items="hiddenItems" />
		<ControlTools @on-check-box-click="onCheckBoxChange" />
	</div>
</template>

<script setup lang="ts">
import CanvasView from "./CanvasView.vue";
import ControlTools from "./ControlTools.vue";
import { ref, type Ref } from "vue";
import * as PIXI from "pixi.js";
import { useShapeStore, IGraphic } from "../../../../store/modules/shape";

const { getResult } = useShapeStore();
const shapes = getResult();
const shapeGrahpicArr: IGraphic[] = shapes.value.map(({ zIndex, position, color, id, category }) => {
	const graphics = new PIXI.Graphics();
	Object.defineProperty(graphics, "id", {
		value: id,
		writable: true,
		enumerable: true,
		configurable: true,
	});
	const [x, y, width, height] = position;
	const rect = new PIXI.Rectangle(x, y, width, height);
	graphics.beginFill(color);
	graphics.drawRect(rect.x, rect.y, width, height);
	graphics.zIndex = zIndex;
	return { graphics, id, x, y, width, height, color, zIndex, category };
});

let checkdOptions: string[];
let hiddenItems: Ref<string[]> = ref([]);
const onCheckBoxChange = (options: string[]) => {
	checkdOptions = options;
	updateHiddenItems();
};
const updateHiddenItems = () => {
	hiddenItems.value = shapeGrahpicArr
		.filter((shape) => checkdOptions.some((option) => shape.category.includes(option)))
		.map((shape) => shape.id);
};
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
