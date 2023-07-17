<template>
	<div class="wrap">
		<div id="terminal-container" class="c-webTerminal_container"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

// 创建 WebSoctket 并指定一个地址
let ws = new WebSocket("ws://localhost:8080");

// 是否连接成功
ws.onopen = () => {
	console.log("连接成功");
};

// 监听服务端发送过来的消息
ws.onmessage = (messObj) => {
	console.log("发送过来的消息", messObj);
};

// 连接失败
ws.onerror = () => {
	console.log("连接失败");
};

let terminal = ref(
	new Terminal({
		rows: 40,
		cols: 100,
		convertEol: true,
		disableStdin: false,
		cursorBlink: true,
		theme: {
			foreground: "#ECECEC",
			background: "#000000",
			cursor: "help",
		},
	})
);
const fitAddon = new FitAddon();
let inputText = ref<string>("");
// 换行并输入起始符 $
const prompt = () => {
	terminal.value.write("\r\n\x1b[33m$\x1b[0m ");
};

const runFakeTerminal = () => {
	terminal.value.writeln("Welcome to \x1b[1;32mWeb Terminal\x1b[0m.");
	terminal.value.writeln("This is Web Terminal of Chip_cloud_platform; We can do it !.");
	prompt();
	// 添加事件监听器，支持输入方法
	terminal.value.onKey((e) => {
		// 能够输入的按键
		const printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
		// 获取键盘信息
		let keyDown = e.domEvent.key;
		// 特殊按键的处理
		if (keyDown === "Enter") {
			// 清空上一次的命令
			ws.send(inputText.value);
			inputText.value = "";
			// 发送信息到服务端
			prompt();
		} else if (keyDown === "Backspace") {
			// back 删除的情况
			console.log(terminal.value.buffer.active.cursorX);
			if (terminal.value.buffer.active.cursorX > 2) {
				terminal.value.write("\b \b");
			}
		} else if (printable) {
			inputText.value += keyDown;
			// 不是回车和删除就是输入，写入 terminal
			terminal.value.write(e.key);
		}
	});
	terminal.value.onData((key) => {
		// 粘贴的情况
		if (key.length > 1) terminal.value.write(key);
	});
};

const resizeScreen = () => {
	try {
		fitAddon.fit();
	} catch (e: any) {
		console.log(e.message);
	}
};

// 输入字符
const initTerminal = () => {
	// 创建terminal实例
	terminal.value.open(document.querySelector("#terminal-container") as HTMLElement);
	prompt();
	terminal.value.loadAddon(fitAddon);
	fitAddon.fit();
	window.addEventListener("resize", resizeScreen);
	runFakeTerminal();
};

onMounted(() => {
	initTerminal();
});
</script>

<style scoped>
.wrap {
	display: flex;
	flex-direction: column-reverse;
}
.c-webTerminal_container {
	width: calc(100vw - 20%);
	height: 350px;
}
</style>
