<template>
	<div class="content-box">
		<CanvasView ref="canvasView" :val="categoryValue" />
		<ControlTools @input-click="success" />
	</div>
	{{ categoryValue }}
</template>

<script setup lang="ts">
import { ref } from "vue";
import CanvasView from "./CanvasView.vue";
import ControlTools from "./ControlTools.vue";
const canvasView = ref<InstanceType<typeof CanvasView>>();
const categoryValue = ref("");
const success = (value: any) => {
	categoryValue.value = value;
};
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
