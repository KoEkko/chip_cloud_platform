<template>
	<TabsBar>
		<template #header><HeaderView @handler-clear="handlerClear" /></template>
		<template #footer>
			<TerminalView />
		</template>
		<template #content>
			<CanvasView ref="contentRef"></CanvasView>
		</template>
		<template #control>
			<ControlTools></ControlTools>
		</template>
	</TabsBar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TabsBar from "./tabs/TabsBar.vue";
import TerminalView from "./terminal/TerminalView.vue";
import HeaderView from "./header/HeaderView.vue";
import CanvasView from "./content/CanvasView.vue";
import ControlTools from "./content/ControlTools.vue";
const contentRef = ref<InstanceType<typeof CanvasView>>();
function handlerClear() {
	contentRef.value?.handleCanvasClear();
}
</script>
