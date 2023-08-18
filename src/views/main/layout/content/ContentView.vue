<template>
	<ToolsArea @scale-control="scaleHandler" />
	<div class="content-box">
		<CanvasView ref="canvasView" :checked-options="checkedOptions" :zoom="zoomValue" />
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
const scaleHandler = (scale: number) => {
	zoomValue.value = scale;
};
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
