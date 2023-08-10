<template>
	<div class="content-box">
		<CanvasView :id="_id" class="canvas" />
		<ControlTools ref="controlTools" />
	</div>
</template>

<script setup lang="ts">
import CanvasView from "./CanvasView.vue";
import ControlTools from "./ControlTools.vue";

import { ref, watch } from "vue";
const controlTools = ref<InstanceType<typeof ControlTools>>();
const _id = ref<number>();
watch(
	() => controlTools.value?._id,
	(newValue) => {
		_id.value = newValue ?? 0;
	}
);
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
