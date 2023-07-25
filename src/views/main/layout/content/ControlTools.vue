<template>
	<a-checkbox-group v-model:value="state" :options="options" class="checkbox"> </a-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from "vue";
const state = ref([]);
const options = [
	{ label: "A", value: "A" },
	{ label: "B", value: "B" },
	{ label: "C", value: "C" },
];
</script>

<style scoped>
.checkbox {
	width: 300px;
	height: 100%;
	padding: 10px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	margin-left: 30px;
}
</style>
