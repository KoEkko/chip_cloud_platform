<template>
	<div ref="wrap" class="wrap">
		<div ref="container" class="container"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import * as PIXI from "pixi.js";
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

onMounted(() => {
	let app = new PIXI.Application({
		autoDensity: true,
		resizeTo: wrap.value,
		backgroundColor: 0x00000,
	});

	watch(commandData, (newValue) => {
		const resData = JSON.parse(newValue);
		const CanvasRes = resData?.data;
		if (resData.type === "image") {
			app.stage.removeChildren();
			const texture = PIXI.Texture.from(CanvasRes);
			const spirte = new PIXI.Sprite(texture);
			spirte.width = 591;
			spirte.height = 591;
			spirte.position.x = (app.screen.width - spirte.width) / 2;
			spirte.position.y = (app.screen.height - spirte.height) / 2;
			app.stage.addChild(spirte);
		} else {
			const text = new PIXI.Text(newValue);
			app.stage.addChild(text);
		}
	});
	container.value?.appendChild(app.view as any);
});
</script>

<style scoped>
.wrap {
	height: 60vh;
	flex: 1;
	overflow-y: hidden;
	overflow-x: hidden;
}
.wrap canvas {
	object-fit: cover;
}
</style>
