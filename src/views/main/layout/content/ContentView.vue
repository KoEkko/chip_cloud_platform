<template>
	<ToolsArea :has-finished-add-macro="hasFinishedAddMacro" @scale-control="scaleHandler" @add-macro="addMacroHandler" />
	<div class="content-box">
		<CanvasView
			:checked-options="checkedOptions"
			:zoom="zoomValue"
			:flag="flag"
			:is-adding="isAdding"
			:macro-type="MacroType"
			@on-mouse-wheel="mouseWheelHandler"
			@has-finished-add-macro="finishedAddMacroHandler"
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
const isAdding = ref(false);
const MacroType = ref("");
const scaleHandler = (scale: number) => {
	// 修改全局的zoom
	zoomValue.value = scale;
	flag.value = !flag.value;
};

const mouseWheelHandler = (newZoom: number) => {
	zoomValue.value = newZoom;
};

const addMacroHandler = (args: [boolean, string]) => {
	const [isAdd, type] = args;
	isAdding.value = isAdd;
	MacroType.value = type;
};
const hasFinishedAddMacro = ref(false);
const finishedAddMacroHandler = (isAdd: boolean) => {
	isAdding.value = isAdd;
	if (!isAdding.value) hasFinishedAddMacro.value = true;
};
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
