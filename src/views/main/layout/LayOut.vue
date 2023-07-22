<template>
	<TabsBar>
		<template #header><HeaderV /></template>
		<template #footer>
			<TerminalView />
		</template>
		<template #content>
			<img src="../../../assets/LOGO.png" alt="" />
		</template>
	</TabsBar>
</template>

<script setup lang="ts">
import TabsBar from "./tabs/TabsBar.vue";
import TerminalView from "./terminal/TerminalView.vue";
import HeaderV from "./header/HeaderV.vue";
</script>

<style scoped></style>
