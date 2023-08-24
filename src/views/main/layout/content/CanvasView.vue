<template>
	<div class="container">
		<div ref="top" class="top"></div>
		<div ref="left" class="left"></div>
		<div ref="main" class="main"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch, type Ref, computed } from "vue";
import * as PIXI from "pixi.js";
import { throttle } from "lodash-es";
import { IGraphic } from "../../../../types";
import { useShapeStore } from "../../../../store/modules/shape";
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
let totalOffset = { x: 0, y: 0 };

watch(checkedOptions, () => {
	updateHiddenItems();
	renderShapes();
});
watch(zoom, (newZoom) => {
	updateRuler(newZoom, totalOffset);
});

// 初始化main、left、top & App
const mainApp = new PIXI.Application({
	background: "#000000",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
const container = new PIXI.Container();
const zoomRef = ref(zoom.value);
const emits = defineEmits(["onMouseWheel"]);
// 按照中心点来缩放
const scaleCenter = () => {
	const { width, height } = mainApp.screen;
	const { x, y } = container;
	const prevScale = zoomRef.value;
	zoomRef.value = zoom.value;
	const dx = (width - x) * (1 - zoom.value / prevScale);
	const dy = (height - y) * (1 - zoom.value / prevScale);
	container.scale.set(zoom.value);
	container.x += dx;
	container.y += dy;
	totalOffset.x -= dx;
	totalOffset.y -= dy;
};
defineExpose({ scaleCenter });
// 按照鼠标位置滚轮缩放
const onMouseWheel = (e: PIXI.FederatedWheelEvent) => {
	// 获取鼠标的位置
	const { x: gx, y: gy } = e.global;
	// 获取container的位置
	const { x: cx, y: cy } = container;
	// 最后一次的zoom值
	const prevScale = zoom.value;
	// 鼠标滚轮的方向
	const deltaY = e.deltaY;
	zoomRef.value += deltaY > 0 ? 0.1 : -0.1;
	// 最小的zoom值
	if (zoomRef.value < 0.2) {
		zoomRef.value = 0.2;
	}
	// 更新zoom的值
	emits("onMouseWheel", zoomRef.value);
	// 计算偏移值，根据变换矩阵来计算
	const dx = (gx - cx) * (1 - zoomRef.value / prevScale);
	const dy = (gy - cy) * (1 - zoomRef.value / prevScale);
	container.scale.set(zoomRef.value);
	// container做相对应的移动
	container.x += dx;
	container.y += dy;
	totalOffset.x -= dx;
	totalOffset.y -= dy;
};
const setupMainApp = () => {
	const width = main.value!.clientWidth;
	const height = main.value!.clientHeight;
	container.sortableChildren = true;
	// 设置舞台能够交互
	mainApp.stage.eventMode = "dynamic";
	// 确保舞台覆盖整个场景
	mainApp.stage.hitArea = mainApp.screen;
	mainApp.stage.on("wheel", onMouseWheel);
	mainApp.stage.on("pointerdown", onDragStart);
	mainApp.stage.on("pointermove", throttleOnDrag);
	mainApp.stage.on("pointerup", onDragEnd);
	mainApp.stage.on("pointerupoutside", onDragEnd);
	mainApp.renderer.resize(width, height);
	renderShapes();
	mainApp.stage.addChild(container);
	main.value?.appendChild(mainApp.view as any);
};

let isDragging = false;
let lastPosition = new PIXI.Point();
const onDragStart = (e: PIXI.FederatedPointerEvent) => {
	e.preventDefault();
	isDragging = true;
	// 设置起初坐标
	const { x, y } = e.global;
	lastPosition.set(x, y);
};
const onDrag = (e: PIXI.FederatedPointerEvent) => {
	if (isDragging) {
		const { x: globalX, y: globalY } = e.global;
		// 滑动的距离
		const dx = (globalX - lastPosition.x) / zoom.value;
		const dy = (globalY - lastPosition.y) / zoom.value;
		totalOffset.x += dx;
		totalOffset.y += dy;
		container.position.x -= dx;
		container.position.y -= dy;
		updateRuler(zoom.value, totalOffset);
		lastPosition.set(globalX, globalY);
	}
};
const throttleOnDrag = throttle(onDrag, 50);

const onDragEnd = () => {
	isDragging = false;
};

const rulerContainerX = new PIXI.Container();
const rulerGraphicsX = new PIXI.Graphics();
const rulerContainerY = new PIXI.Container();
const rulerGraphicsY = new PIXI.Graphics();
const topApp = new PIXI.Application({
	background: "#f5f5f5",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
const setupTopApp = () => {
	const width = top.value!.clientWidth;
	const height = top.value!.clientHeight;
	topApp.renderer.resize(width, height);
	topApp.stage.addChild(rulerContainerX);
	top.value?.appendChild(topApp.view as any);
};
const leftApp = new PIXI.Application({
	background: "#f5f5f5",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
const setupLeftApp = () => {
	const width = left.value!.clientWidth;
	const height = left.value!.clientHeight;
	leftApp.renderer.resize(width, height);
	leftApp.stage.addChild(rulerContainerY);
	left.value?.appendChild(leftApp.view as any);
};

/**
 * 根据放缩比计算出刻度间隔
 * @param zoom 放缩比
 * @returns step 刻度间隔
 */
const getStepByZoom = (zoom: number) => {
	const steps = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
	const step = 50 / zoom;
	for (let i = 0, len = steps.length; i < len; i++) {
		if (steps[i] >= step) return steps[i];
	}
	return steps[0];
};
/**
 *  计算出当前值最接近的值，是整数
 * @param value 刻度值
 * @param segment 当前zoom下的刻度间隔
 */
const getClosestVal = (value: number, segment: number) => {
	const n = Math.floor(value / segment);
	const left = segment * n;
	const right = segment * (n + 1);
	return value - left <= right - value ? left : right;
};
// 定义标尺的样式
const setting = {
	rulerMarkSize: 10,
	rulerMarkStroke: 0x000000,
};
// 刻度绘制的位置
const rulerX = 20;
const rulerY = 20;

type Positon = {
	x: number;
	y: number;
};

// 减少频繁计算 main 的client
const getMainRectBound = computed(() => {
	return {
		width: main.value?.clientWidth,
		height: main.value?.clientHeight,
	};
});
const viewport = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};
const getSceneCoords = (position: Positon = { x: 0, y: 0 }) => {
	const RectBound = getMainRectBound;
	const { width, height } = RectBound.value;
	viewport.x = position.x / zoom.value;
	viewport.y = position.y / zoom.value;
	viewport.width = width!;
	viewport.height = height!;
};
/**
 * 标尺更新
 * @param zoom 缩放比
 * @param position 画布所在的位置
 */
const updateRuler = (zoom: number, position: Positon = { x: 0, y: 0 }) => {
	getSceneCoords(position);
	// X 坐标的标尺
	rulerContainerX.removeChildren(); // 清空之前的文本元素
	rulerGraphicsX.clear();

	const newStep = getStepByZoom(zoom);
	const startMarkX = getClosestVal(viewport.x, newStep);
	const endMarkX = getClosestVal(viewport.x + viewport.width / zoom, newStep);
	rulerGraphicsX.lineStyle(1, setting.rulerMarkStroke);
	for (let x = startMarkX; x <= endMarkX; x += newStep) {
		// 刻度线,刻度线不能直接在场景中绘制，因为缩放变换会导致线的粗细变化
		const posX = (x - viewport.x) * zoom;
		rulerGraphicsX.moveTo(posX, rulerY + setting.rulerMarkSize);
		rulerGraphicsX.lineTo(posX, rulerY);
		rulerGraphicsX.endFill();
		// 刻度值
		const text = new PIXI.Text(String(x), { fontSize: 12, fill: setting.rulerMarkStroke });
		text.x = posX;
		text.y = 0;
		text.anchor.set(0.5, 0);
		rulerContainerX.addChild(text);
	}
	rulerContainerX.addChild(rulerGraphicsX);

	// Y 坐标的标尺
	rulerContainerY.removeChildren(); // 清空之前的文本元素
	rulerGraphicsY.clear();
	const startMarkY = getClosestVal(viewport.y, newStep);
	const endMarkY = getClosestVal(Math.ceil(viewport.y + viewport.height! / zoom), newStep);
	rulerGraphicsY.lineStyle(1, setting.rulerMarkStroke);
	for (let y = startMarkY; y <= endMarkY; y += newStep) {
		const posY = (y - viewport.y) * zoom;
		rulerGraphicsY.moveTo(rulerX, posY);
		rulerGraphicsY.lineTo(rulerX + setting.rulerMarkSize, posY);
		rulerGraphicsY.endFill();
		const text = new PIXI.Text(String(y), { fontSize: 12, fill: setting.rulerMarkStroke });
		text.x = rulerX - 20;
		text.y = posY;
		text.anchor.set(0.5, 0);
		text.rotation = -(Math.PI / 2);
		rulerContainerY.addChild(text);
	}
	rulerContainerY.addChild(rulerGraphicsY);
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
		graphics.pivot.set(0.5);
		container.addChild(graphics);
	});
	mainApp.renderer.render(container);
};

// 自适应
function resizeRender() {
	const width = main.value!.clientWidth;
	const height = main.value!.clientHeight;
	mainApp.renderer.resize(width, height);
	topApp.renderer.resize(width, 22);
	leftApp.renderer.resize(22, height);
}
const throttleResizeRender = throttle(resizeRender, 200);
window.addEventListener("resize", throttleResizeRender);

onMounted(() => {
	setupTopApp();
	setupMainApp();
	setupLeftApp();
	updateRuler(zoom.value);
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
