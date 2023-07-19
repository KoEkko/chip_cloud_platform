<template>
	<TabsBar>
		<template #footer>
			<TerminalView />
		</template>
	</TabsBar>
</template>

<script setup lang="ts">
import TabsBar from "./tabs/TabsBar.vue";
import TerminalView from "./terminal/TerminalView.vue";
</script>

<style scoped></style>
