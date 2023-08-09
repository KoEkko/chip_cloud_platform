<template>
	<div ref="wrap" class="wrap">
		<div ref="container" class="container"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
// import { throttle } from "lodash-es";
// import { useTerminalStore } from "../../../../store/modules/getTerminal";

const wrap = ref<HTMLBodyElement>();
const container = ref<HTMLBodyElement>();

// function handleCanvasClear() {
// 	// 清空画布
// 	app.stage.removeChildren();
// }

// defineExpose({ handleCanvasClear });
// const terminalStore = useTerminalStore();
// const commandData = terminalStore.getResult();
onMounted(async () => {
	const app = new PIXI.Application({
		background: "#000000",
		autoDensity: true,
		resolution: window.devicePixelRatio,
		width: wrap.value?.clientWidth,
		height: wrap.value?.clientHeight,
		antialias: true,
	});
	wrap.value?.appendChild(app.view as any);
	const graphics = new PIXI.Graphics();
	graphics.lineStyle(1, 0xffffff, 1);
	const width = app.screen.width;
	const height = app.screen.height;
	const start = performance.now();
	for (let i = 0; i < 100; i++) {
		const x = Math.random() * width;
		const y = Math.random() * height;
		const w = Math.random() * 50 + 10;
		const h = Math.random() * 50 + 10;
		const color = Math.random() * 0xffffff;
		graphics.beginFill(color);
		graphics.drawRect(x, y, w, h);
		graphics.endFill();
	}
	const end = performance.now();
	app.stage.addChild(graphics);
	const gap = Number((end - start).toFixed(5));
	console.log(gap);
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
