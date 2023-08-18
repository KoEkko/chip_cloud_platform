<template>
	<a-layout style="height: 100vh">
		<!-- <TabsBar /> -->
		<a-layout>
			<div class="header">
				<DropDown />
			</div>
			<a-layout-content>
				<ContentView />
			</a-layout-content>
			<a-layout-footer>
				<TerminalView class="terminal" />
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts">
import DropDown from "./header/DropDown.vue";
import TerminalView from "./terminal/TerminalView.vue";
import ContentView from "./content/ContentView.vue";
</script>

<style lang="scss" scoped>
.header {
	background-color: #fff;
	display: flex;
	align-items: center;
	gap: 20px;
}

.ant-layout-footer {
	margin-top: 10px;
	height: 25vh;
	padding: 0px;
}
.terminal {
	height: 100%;
}
div#terminal-container {
	height: 100%;
	width: 100%;
	.terminal.xterm.xterm-dom-renderer-owner-1 {
		height: 100%;
	}
	.xterm-screen {
		height: 100%;
	}
}
</style>
