<template>
	<div class="bg">
		<div class="preview">
			<div class="canvas">preview</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bg {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background: rgb(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: auto;
	padding: 20px;
	.preview {
		width: calc(100% - 40px);
		height: calc(100% - 120px);
		overflow: auto;
		.canvas {
			background-color: #fff;
			position: relative;
			margin: auto;
		}
	}
	.close {
		position: absolute;
		right: 20px;
		top: 20px;
	}
}
</style>
