<template>
	<div class="header">
		<a-space direction="vertical" class="left">
			<a-space warp>
				<a-button type="danger" :icon="h(FileAddOutlined)">JSON</a-button>
				<a-button type="primary" shape="circle" :icon="h(ArrowLeftOutlined)"></a-button>
				<a-button type="primary" shape="circle" :icon="h(ArrowRightOutlined)"></a-button>
				<a-button type="primary" :icon="h(ExpandOutlined)" @click="handlePreview">预览</a-button>
				<a-button type="primary" :icon="h(SaveOutlined)">保存</a-button>
				<a-button type="primary" :icon="h(RedoOutlined)" @click="handleClearCanvas">清空画布</a-button>
			</a-space>
		</a-space>
		<a-space direction="vertical" class="left">
			<a-space warp>
				<a-button type="primary" :icon="h(FileAddOutlined)">JSON</a-button>
			</a-space>
		</a-space>
	</div>
</template>
<script lang="ts" setup>
import { h, ref } from "vue";
import {
	FileAddOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	ExpandOutlined,
	SaveOutlined,
	RedoOutlined,
} from "@ant-design/icons-vue";

const isPreview = ref(false);
defineExpose({ isPreview });
function handlePreview() {
	isPreview.value = !isPreview.value;
}

const emit = defineEmits(["handlerClear"]);
function handleClearCanvas() {
	emit("handlerClear");
}
</script>
<style scoped>
.header {
	margin: 0 16px 0 16px;
	display: flex;
	justify-content: space-between;
}
</style>
