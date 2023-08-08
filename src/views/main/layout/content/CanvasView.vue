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
	const cols = Math.ceil(Math.floor(width / 5));
	const rows = Math.ceil(Math.floor(height / 5));
	const gapArr = [];
	for (let i = 0; i < 5; i++) {
		const start = performance.now();
		for (let i = 0; i < 100000; i++) {
			graphics.drawRect((i % cols) * 5, Math.floor(i / rows) * 5, i % 5, i % 5);
		}
		const end = performance.now();
		const gap = Number((end - start).toFixed(5));
		gapArr.push(gap);

		graphics.clear();
	}
	const total = gapArr.reduce((prev, curr) => {
		return prev + curr;
	}, 0);
	console.log(total / 5);
	// const sheet = await PIXI.Assets.load("");
	// const bunny = new PIXI.Sprite(sheet);
	// bunny.anchor.set(0.5);
	// bunny.x = app.screen.width / 2;
	// bunny.y = app.screen.height / 2;
	// function resizeHandler() {
	// 	app.renderer.resize(wrap.value!.clientWidth, wrap.value!.clientHeight);
	// 	bunny.x = app.screen.width / 2;
	// 	bunny.y = app.screen.height / 2;
	// }
	// const throttle_Resize = throttle(resizeHandler, 200);
	// window.addEventListener("resize", throttle_Resize);
	app.stage.addChild(graphics);
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
