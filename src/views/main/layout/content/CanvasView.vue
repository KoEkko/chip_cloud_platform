<template>
	<div ref="wrap" class="wrap">
		<div ref="container" class="container"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as PIXI from "pixi.js";
import { throttle } from "lodash-es";
import { useTerminalStore } from "../../../../store/modules/getTerminal";

const wrap = ref<HTMLBodyElement>();
const container = ref<HTMLBodyElement>();

// function handleCanvasClear() {
// 	// 清空画布
// 	app.stage.removeChildren();
// }

// defineExpose({ handleCanvasClear });
const terminalStore = useTerminalStore();
const commandData = terminalStore.getResult();
console.log(commandData);
onMounted(() => {
	const app = new PIXI.Application({
		background: "#000000",
		autoDensity: true,
		resolution: window.devicePixelRatio,
		width: wrap.value?.clientWidth,
		height: wrap.value?.clientHeight,
	});

	const url = ref("../../../../../public/vite.svg");
	setTimeout(() => {
		url.value = "../../../../../public/kxy.png";
	}, 2000);
	wrap.value?.appendChild(app.view as any);
	let texturePromise = PIXI.Assets.load(url.value);
	watch(
		url,
		(newValue) => {
			texturePromise = PIXI.Assets.load(newValue);
			texturePromise.then((resolveTexture) => {
				const bunny = PIXI.Sprite.from(resolveTexture);
				bunny.anchor.set(0.5);
				bunny.x = app.screen.width / 2;
				bunny.y = app.screen.height / 2;
				function resizeHandler() {
					app.renderer.resize(wrap.value!.clientWidth, wrap.value!.clientHeight);
					bunny.x = app.screen.width / 2;
					bunny.y = app.screen.height / 2;
				}
				const throttle_Resize = throttle(resizeHandler, 200);
				window.addEventListener("resize", throttle_Resize);
				app.stage.addChild(bunny);
			});
		},
		{ immediate: true }
	);
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
