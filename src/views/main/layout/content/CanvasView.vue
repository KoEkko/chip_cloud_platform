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
	const contianerClientWidth = ref(container.value?.clientWidth);

	console.log(contianerClientWidth.value);
	let app = new PIXI.Application({
		width: contianerClientWidth.value,
		height: 800,
		backgroundColor: 0xfffff,
		autoDensity: true,
		resolution: window.devicePixelRatio,
	});
	// const resizeRenderer = () => {
	// 	const width = contianerClientWidth.value;
	// 	console.log(width);
	// 	app.renderer.resize(width, 720);
	// };
	// window.addEventListener("resize", resizeRenderer);
	// resizeRenderer();

	watch(commandData, (newValue) => {
		const text = new PIXI.Text(newValue.data);
		// 根据url绘制图片
		// const texture = PIXI.Texture.from(newValue.data);
		// const spirte = new PIXI.Sprite(texture);
		app.stage.addChild(text);
	});
	container.value?.appendChild(app.view as any);
	const text = new PIXI.Text("hello world");
	app.stage.addChild(text);
});
</script>

<style scoped>
.wrap {
	flex: 1;
	overflow-y: auto;
	overflow-x: auto;
}
</style>
