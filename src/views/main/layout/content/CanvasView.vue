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
		resizeTo: wrap.value,
		backgroundColor: 0x00000,
	});

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
	height: 60vh;
	flex: 1;
	overflow-y: hidden;
	overflow-x: hidden;
}
</style>
