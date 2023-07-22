<template>
	<div id="terminal-container" class="c-webTerminal_container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import _request from "../../../../service";

// const WebSocketURL = "ws://118.24.150.38:84";

// // 创建 WebSoctket 并指定一个地址
// let ws = new WebSocket(WebSocketURL);

// // 是否连接成功
// ws.onopen = () => {
// 	console.log("连接成功");
// };

// // 监听服务端发送过来的消息
// ws.onmessage = (messObj) => {
// 	console.log("发送过来的消息", messObj);
// };

// // 连接失败
// ws.onerror = () => {
// 	console.log("连接失败");
// };

let terminal = ref(
	new Terminal({
		convertEol: true,
		disableStdin: false,
		cursorBlink: true,
		theme: {
			background: "#000000",
			foreground: "#FFFFFF",
			cursor: "#00FF00",
			selectionForeground: "#FFFFFF",
		},
	})
);
const fitAddon = new FitAddon();
let inputText = ref<string>("");
// 换行并输入起始符 $
const prompt = () => {
	terminal.value.write("\r\n\x1b[33m$\x1b[0m ");
};
const writeln = (str: string) => {
	terminal.value.writeln(str);
};

const runFakeTerminal = () => {
	writeln("Welcome to \x1b[1;32mWeb Terminal\x1b[0m.");
	writeln("This is Web Terminal of Chip_cloud_platform; We can do it !.");
	prompt();
	// 添加事件监听器，支持输入方法
	terminal.value.onKey(async (e) => {
		// 能够输入的按键
		const printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
		// 获取键盘信息
		let keyDown = e.domEvent.key;
		// 特殊按键的处理
		if (keyDown === "Enter") {
			// 清空上一次的命令
			// ws.send(JSON.stringify(inputText.value));
			const data = JSON.stringify({ code: inputText.value });
			inputText.value = "";
			prompt();
			const res = await _request.post({
				headers: {
					"Content-Type": "application/json",
				},
				url: "code",
				data,
			});
			// 判断是否请求成功，成功的话就把log打印到terminal上
			// 否则log错误信息
			console.log(res);
			// 发送信息到服务端
		} else if (keyDown === "Backspace") {
			// back 删除的情况
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
.c-webTerminal_container {
	width: 100%;
	overflow: hidden;
}
</style>
