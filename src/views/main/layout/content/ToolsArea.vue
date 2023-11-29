<template>
	<div class="title">Layout</div>
	<div class="bar">
		<div class="tools-area">
			<div><zoom-in-outlined :style="iconStyle" @click="scaleControl(true)" /></div>
			<div><zoom-out-outlined :style="iconStyle" @click="scaleControl(false)" /></div>
			<div @click="addMacroHandler">
				<BorderOutlined :style="iconStyle" class="macro" />
				<LineOutlined :style="iconStyle" class="macro" />
			</div>
		</div>
		<a-input class="input"></a-input>
	</div>
</template>

<script setup lang="ts">
import { watch, toRefs } from "vue";
import { ZoomInOutlined, ZoomOutOutlined, BorderOutlined, LineOutlined } from "@ant-design/icons-vue";
const props = defineProps<{
	hasFinishedAddMacro: boolean;
}>();
const { hasFinishedAddMacro } = toRefs(props);
watch(hasFinishedAddMacro, (newValue) => {
	if (newValue) {
		isAdding = false;
	}
});
const iconStyle = {
	fontSize: "20px",
	cursor: "pointer",
};

let zoomValue = 1; // 缩放
const emits = defineEmits(["scaleControl", "addMacro"]);
const scaleControl = (flag: boolean) => {
	if (flag) {
		if (zoomValue > 2.5) return;
		zoomValue += 0.1;
	} else {
		if (zoomValue < 0.2) return;
		zoomValue -= 0.1;
	}
	emits("scaleControl", zoomValue);
};
let isAdding = false;
const addMacroHandler = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	if (target.dataset.icon === undefined) return;
	const type = target.dataset.icon;
	isAdding = true;
	emits("addMacro", [isAdding, type]);
};
</script>

<style lang="scss" scoped>
.title {
	display: inline-block;
	border: 1px solid gray;
	background-color: #fff;
	font-size: 16px;
	font-weight: 800;
	padding: 4px;
}
.bar {
	display: flex;
	align-items: center;
	border-top: none;
	border: 1px solid gray;
	background: #fff;
	height: 40px;
	.tools-area {
		margin-left: 20px;
		display: flex;
		gap: 20px;
		flex: 1;
	}
	.input {
		width: 180px;
		height: 25px;
		margin-right: 10px;
	}
}

.ant-layout-content {
	min-height: fit-content;
}

.macro {
	margin-right: 20px;
}
</style>
