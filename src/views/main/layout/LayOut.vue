<template>
	<a-layout style="min-height: 100vh">
		<!-- <TabsBar /> -->
		<a-layout>
			<!-- <a-layout-header style="background: #fff; padding: 0; color: black">
				<HeaderView />
			</a-layout-header> -->
			<a-layout-content style="margin: 0 16px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>工程1</a-breadcrumb-item>
				</a-breadcrumb>
				<ContentView />
			</a-layout-content>
			<a-layout-footer style="margin: 0 16px">
				<TerminalView class="terminal" />
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts">
// import TabsBar from "./tabs/TabsBar.vue";
import TerminalView from "./terminal/TerminalView.vue";
// import HeaderView from "./header/HeaderView.vue";
import ContentView from "./content/ContentView.vue";
// function handlerClear() {
// 	contentRef.value?.handleCanvasClear();
// }
</script>

<style lang="scss" scoped>
.ant-layout-footer {
	padding: 0;
}
</style>
