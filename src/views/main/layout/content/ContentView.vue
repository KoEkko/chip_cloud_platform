<template>
	<ToolsArea @scale-control="scaleHandler" />
	<div class="content-box">
		<CanvasView
			ref="canvasView"
			:checked-options="checkedOptions"
			:zoom="zoomValue"
			@on-mouse-wheel="mouseWheelHandler"
		/>
		<ControlTools @on-check-box-click="onCheckBoxChange" />
	</div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import CanvasView from "./CanvasView.vue";
import ControlTools from "./ControlTools.vue";
import ToolsArea from "./ToolsArea.vue";

const canvasView = ref<InstanceType<typeof CanvasView>>();
const checkedOptions: Ref<string[]> = ref([]);
const onCheckBoxChange = (options: string[]) => {
	checkedOptions.value = Array.from(options);
};

let zoomValue: Ref<number> = ref(1);

const scaleHandler = (scale: number) => {
	// 修改全局的zoom
	zoomValue.value = scale;
	canvasView.value?.scaleCenter();
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
