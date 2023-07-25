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
let app = new PIXI.Application({
	backgroundColor: 0xffffff,
	resolution: window.devicePixelRatio,
	autoDensity: true,
});

function handleCanvasClear() {
	// 清空画布
	app.stage.removeChildren();
}
defineExpose({ handleCanvasClear });
const terminalStore = useTerminalStore();
const commandData = terminalStore.getResult();
watch(commandData, (newValue) => {
	const text = new PIXI.Text(newValue.data);
	// 根据url绘制图片
	// const texture = PIXI.Texture.from(newValue.data);
	// const spirte = new PIXI.Sprite(texture);
	app.stage.addChild(text);
});
onMounted(() => {
	container.value?.appendChild(app.view as any);
	app.resizeTo = container.value as HTMLBodyElement;
});
</script>

<style scoped>
.wrap {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
}
.wrap .container {
	width: 100%;
	height: 100%;
}
.wrap canvas {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
