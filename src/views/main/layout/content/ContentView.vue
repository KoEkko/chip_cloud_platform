<template>
	<ToolsArea @scale-control="scaleHandler" />
	<div class="content-box">
		<CanvasView :checked-options="checkedOptions" :zoom="zoomValue" :flag="flag" @on-mouse-wheel="mouseWheelHandler" />
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
const scaleHandler = (scale: number) => {
	// 修改全局的zoom
	zoomValue.value = scale;
	flag.value = !flag.value;
};

const mouseWheelHandler = (newZoom: number) => {
	zoomValue.value = newZoom;
};
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
