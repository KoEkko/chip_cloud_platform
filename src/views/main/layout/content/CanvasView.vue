<template>
	<div class="container">
		<div ref="top" class="top"></div>
		<div ref="left" class="left"></div>
		<div ref="main" class="main"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch, type Ref } from "vue";
import * as PIXI from "pixi.js";
import { throttle } from "lodash-es";
import { IGraphic } from "../../../../types";
import { useShapeStore } from "../../../../store/modules/shape";

// import { useTerminalStore } from "../../../../store/modules/getTerminal";
const top = ref<HTMLElement>();
const main = ref<HTMLElement>();
const left = ref<HTMLElement>();
// props
const props = defineProps<{
	checkedOptions: string[];
	zoom: number;
}>();
// zoom 是放缩比， zoom 越大 step越大
const { checkedOptions, zoom } = toRefs(props);
watch(checkedOptions, () => {
	updateHiddenItems();
	renderShapes();
});
watch(zoom, (newZoom) => {
	updateRuler(newZoom);
});

// 初始化pixi
const mainApp = new PIXI.Application({
	background: "#000000",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
const container = new PIXI.Container();
const setupMainApp = () => {
	const width = main.value!.clientWidth;
	const height = main.value!.clientHeight;
	container.pivot.set(0.5);
	container.sortableChildren = true;
	mainApp.renderer.resize(width, height);
	renderShapes();
	mainApp.stage.addChild(container);
	main.value?.appendChild(mainApp.view as any);
};
const topApp = new PIXI.Application({
	background: "#fff000",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
const rulerContainer = new PIXI.Container();
const rulerGraphics = new PIXI.Graphics();

const setupTopApp = () => {
	const width = top.value!.clientWidth;
	const height = top.value!.clientHeight;
	topApp.renderer.resize(width, height);
	rulerContainer.addChild(rulerGraphics);
	topApp.stage.addChild(rulerContainer);
	top.value?.appendChild(topApp.view as any);
};

const viewport = {
	x: 22,
	y: 119,
	width: 844,
};
const setting = {
	rulerMarkSize: 10,
	rulerMarkStroke: 0x000000,
};
const getStepByZoom = (zoom: number) => {
	console.log(zoom);
	const steps = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
	const step = 50 / zoom;
	for (let i = 0, len = steps.length; i < len; i++) {
		if (steps[i] >= step) return steps[i];
	}
	return steps[0];
};
const getClosestVal = (value: number, segment: number) => {
	const n = Math.floor(value / segment);
	const left = segment * n;
	const right = segment * (n + 1);
	return value - left <= right - value ? left : right;
};

const rulerY = 20;
const updateRuler = (zoom: number) => {
	rulerContainer.removeChildren(); // 清空之前的文本元素
	rulerGraphics.clear();
	const newStep = getStepByZoom(zoom);
	const startMarkX = getClosestVal(viewport.x, newStep);
	const endMarkX = getClosestVal(Math.ceil((viewport.x + viewport.width) * zoom), newStep);
	for (let x = startMarkX; x <= endMarkX; x += newStep) {
		const posX = (x - viewport.x) * zoom;
		rulerGraphics.lineStyle(1, setting.rulerMarkStroke);
		rulerGraphics.moveTo(posX, rulerY);
		rulerGraphics.lineTo(posX, rulerY + setting.rulerMarkSize);

		const text = new PIXI.Text(String(x), { fontSize: 12, fill: setting.rulerMarkStroke });
		text.x = posX;
		text.y = rulerY - 20;
		text.anchor.set(0.5, 0);
		rulerContainer.addChild(text);
	}
	rulerGraphics.lineStyle(1, setting.rulerMarkStroke);
	container.scale.set(zoom);
};

updateRuler(zoom.value);
// ==================================================================================
const leftApp = new PIXI.Application({
	background: "#000fff",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
const setupLeftApp = () => {
	const width = left.value!.clientWidth;
	const height = left.value!.clientHeight;
	leftApp.renderer.resize(width, height);
	left.value?.appendChild(leftApp.view as any);
};
// 获取数据
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
// 更新hiddenItems的数据
let hiddenItems: Ref<string[]> = ref([]);
const updateHiddenItems = () => {
	hiddenItems.value = shapeGrahpicArr
		.filter((shape) => checkedOptions.value.some((option) => shape.category.includes(option)))
		.map((shape) => shape.id);
};
// 渲染匹配的图形
const renderShapes = () => {
	container.removeChildren();
	const visibleShapes = shapeGrahpicArr.filter((shape) => !hiddenItems.value.includes(shape.id));
	visibleShapes.forEach((shape) => {
		const graphics = shape.graphics;
		container.addChild(graphics);
	});
	mainApp.renderer.render(container);
};

// 自适应
function resizeRender() {
	const width = main.value!.clientWidth;
	const height = main.value!.clientHeight;
	mainApp.renderer.resize(width, height);
}
const throttleResizeRender = throttle(resizeRender, 200);
window.addEventListener("resize", throttleResizeRender);

onMounted(() => {
	setupTopApp();
	setupMainApp();
	setupLeftApp();
});
</script>

<style scoped>
.container {
	height: 60vh;
	width: 100%;
	position: relative;
	overflow: hidden;
}
.top {
	position: absolute;
	left: 22px;
	width: calc(100% - 23px);
	height: 22px;
	overflow: hidden;
}
.left {
	position: absolute;
	top: 22px;
	width: 22px;
	height: calc(100% - 23px);
	overflow: hidden;
}
.main {
	position: absolute;
	top: 22px;
	left: 22px;
	z-index: 99;
	width: calc(100% - 23px);
	height: calc(100% - 23px);
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
