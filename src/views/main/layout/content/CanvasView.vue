<template>
	<div ref="wrap" class="wrap">
		<div ref="container" class="container"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";
import * as PIXI from "pixi.js";
import { throttle } from "lodash-es";

// import { useTerminalStore } from "../../../../store/modules/getTerminal";
import { IGraphic } from "../../../../store/modules/shape";
const wrap = ref<HTMLBodyElement>();

// props
const props = defineProps<{
	shapes: IGraphic[];
	hiddenItems: string[];
}>();
const { hiddenItems, shapes } = toRefs(props);
watch(hiddenItems, () => {
	renderShapes();
});

const app = new PIXI.Application({
	background: "#000000",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
const container = new PIXI.Container();
container.sortableChildren = true;

const setupPixi = () => {
	const width = wrap.value!.clientWidth;
	const height = wrap.value!.clientHeight;
	app.renderer.resize(width, height);
	renderShapes();
	app.stage.addChild(container);
};

const renderShapes = () => {
	container.removeChildren();
	const visibleShapes = shapes.value.filter((shape) => !hiddenItems.value.includes(shape.id));
	visibleShapes.forEach((shape) => {
		const graphics = shape.graphics;
		container.addChild(graphics);
	});
	app.renderer.render(container);
};

// 自适应
function resizeRender() {
	const width = wrap.value!.clientWidth;
	const height = wrap.value!.clientHeight;
	app.renderer.resize(width, height);
}
const throttleResizeRender = throttle(resizeRender, 200);
window.addEventListener("resize", throttleResizeRender);

onMounted(() => {
	setupPixi();
	wrap.value?.appendChild(app.view as any);
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
