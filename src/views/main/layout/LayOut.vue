<template>
	<a-layout style="max-height: 100vh">
		<!-- <TabsBar /> -->
		<a-layout>
			<div class="header">
				<DropDown />
			</div>
			<a-layout-content>
				<div class="title">Layout</div>
				<div class="bar">
					<div class="color">
						<a-input class="input"></a-input>
					</div>
				</div>
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
// import TabsBar from "./tabs/TabsBar.vue";
import TerminalView from "./terminal/TerminalView.vue";
// import HeaderView from "./header/HeaderView.vue";
import ContentView from "./content/ContentView.vue";
// function handlerClear() {
// 	contentRef.value?.handleCanvasClear();
// }
</script>

<style lang="scss" scoped>
.header {
	background-color: #fff;
	display: flex;
	align-items: center;
	gap: 20px;
}
.title {
	display: inline-block;
	border: 1px solid gray;
	background-color: #fff;
	font-size: 16px;
	font-weight: 800;
	padding: 4px;
}
.bar {
	display: flex;
	align-items: center;
	justify-content: end;
	border-top: none;
	border: 1px solid gray;
	background: #fff;
	height: 40px;
	.color {
		position: relative;
		.input {
			width: 180px;
			height: 25px;
			margin-right: 10px;
		}
	}
}
.ant-layout-footer {
	margin-top: 10px;
	height: 32vh;
	padding: 0;
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
