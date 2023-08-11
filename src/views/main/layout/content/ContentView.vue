<template>
	<div class="content-box">
		<CanvasView class="canvas" />
		<ControlTools />
	</div>
</template>

<script setup lang="ts">
import CanvasView from "./CanvasView.vue";
import ControlTools from "./ControlTools.vue";
</script>

<style lang="scss" scoped>
.content-box {
	display: flex;
}
</style>
