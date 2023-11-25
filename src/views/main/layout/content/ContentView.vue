<template>
	<ToolsArea @scale-control="scaleHandler" @toggle-cursor="toggleCursorHandler" />
	<div class="content-box">
		<CanvasView
			:checked-options="checkedOptions"
			:zoom="zoomValue"
			:flag="flag"
			:cursor-changed="cursorChanged"
			@on-mouse-wheel="mouseWheelHandler"
			@on-draw-graphics="drawGraphics"
		/>
		<ControlTools @on-check-box-click="onCheckBoxChange" />
	</div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import CanvasView from "./CanvasView.vue";
import ControlTools from "./ControlTools.vue";
import ToolsArea from "./ToolsArea.vue";

const checkedOptions: Ref<string[]> = ref([]);
const onCheckBoxChange = (options: string[]) => {
	checkedOptions.value = Array.from(options);
};

let zoomValue: Ref<number> = ref(1);
let flag: Ref<boolean> = ref(true);
const cursorChanged = ref(false);
const scaleHandler = (scale: number) => {
	// 修改全局的zoom
	zoomValue.value = scale;
	flag.value = !flag.value;
};
const drawGraphics = (cursor: boolean) => {
	cursorChanged.value = cursor;
};
const mouseWheelHandler = (newZoom: number) => {
	zoomValue.value = newZoom;
};
const toggleCursorHandler = (changed: boolean) => {
	cursorChanged.value = changed;
};
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
