<template>
	<div class="title">Layout</div>
	<div class="bar">
		<div class="tools-area">
			<div><zoom-in-outlined :style="iconStyle" @click="scaleControl(true)" /></div>
			<div><zoom-out-outlined :style="iconStyle" @click="scaleControl(false)" /></div>
		</div>
		<a-input class="input"></a-input>
	</div>
</template>

<script setup lang="ts">
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons-vue";

const iconStyle = {
	fontSize: "20px",
	cursor: "pointer",
};

let zoomValue = 1; // 缩放
const emits = defineEmits(["scaleControl"]);
const scaleControl = (flag: boolean) => {
	if (flag) {
		if (zoomValue === 2.5) return;
		zoomValue = Number((zoomValue + 0.1).toFixed(2));
	} else {
		if (zoomValue === 0.6) return;
		zoomValue = Number((zoomValue - 0.1).toFixed(2));
	}
	emits("scaleControl", zoomValue);
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
</style>
