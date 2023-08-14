<template>
	<div ref="wrap" class="wrap">
		<div ref="container" class="container"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
import { throttle } from "lodash-es";

// import { useTerminalStore } from "../../../../store/modules/getTerminal";
import { useShapeStore } from "../../../../store/modules/shape";
const wrap = ref<HTMLBodyElement>();
const { getResult, initContainer, initShapeGraphicArr } = useShapeStore();
const shapes = getResult();

const app = new PIXI.Application({
	background: "#000000",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
// 自适应
function resizeRender() {
	const width = wrap.value!.clientWidth;
	const height = wrap.value!.clientHeight;
	app.renderer.resize(width, height);
}
const throttleResizeRender = throttle(resizeRender, 200);
window.addEventListener("resize", throttleResizeRender);

const container = new PIXI.Container();
initContainer(container);
container.sortableChildren = true;
const shapeGrahpicArr = shapes.value.map(({ zIndex, position, color, id, category }) => {
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
initShapeGraphicArr(shapeGrahpicArr);
onMounted(() => {
	const width = wrap.value!.clientWidth;
	const height = wrap.value!.clientHeight;
	app.renderer.resize(width, height);
	wrap.value?.appendChild(app.view as any);
	const shapes = shapeGrahpicArr.map((item) => {
		return item.graphics;
	});
	container.addChild(...shapes);
	app.stage.addChild(container);
});
</script>

<style scoped>
.wrap {
	z-index: 99;
	flex: 1;
	height: 60vh;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
}
</style>
