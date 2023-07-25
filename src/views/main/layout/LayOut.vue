<template>
	<TabsBar>
		<template #header><HeaderView @handler-clear="handlerClear" /></template>
		<template #footer>
			<TerminalView />
		</template>
		<template #content>
			<ContentView ref="contentRef"></ContentView>
		</template>
	</TabsBar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TabsBar from "./tabs/TabsBar.vue";
import TerminalView from "./terminal/TerminalView.vue";
import HeaderView from "./header/HeaderView.vue";
import ContentView from "./content/ContentView.vue";
const contentRef = ref<InstanceType<typeof ContentView>>();
function handlerClear() {
	contentRef.value?.handleCanvasClear();
}
</script>

<style scoped></style>
