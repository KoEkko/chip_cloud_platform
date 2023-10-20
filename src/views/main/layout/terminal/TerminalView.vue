<template>
	<div id="terminal-container" class="c-webTerminal_container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { useTerminalStore } from "../../../../store/modules/getTerminal";
import bus from "../../../../utils/EventBus";

const WebSocketURL = "ws://118.24.150.38:84/ws/console";

// 创建 WebSoctket 并指定一个地址
let ws = new WebSocket(WebSocketURL);

// 是否连接成功
ws.onopen = () => {
	console.log("连接成功");
};

// 连接失败
ws.onerror = () => {
	console.log("连接失败");
};

const terminalStore = useTerminalStore();
let terminal = ref(
	new Terminal({
		convertEol: true,
		disableStdin: false,
		cursorBlink: false,
		theme: {
			background: "#000000",
			foreground: "#FFFFFF",
			cursor: "#00000",
			selectionForeground: "#FFFFFF",
		},
	})
);
let inputText = ref<string>("");

const fitAddon = new FitAddon();
// 换行并输入起始符 $
const prompt = () => {
	terminal.value.write("\r\n\x1b[33m$\x1b[0m ");
};
const writeln = (str: string) => {
	terminal.value.write(str);
	prompt();
};

// 记录命令行最大长度，为了清空ArrowUp 或者 ArrowDown的内容
let maxLength = 0;
// 清空当前命令行的内容
const clearCurrentRow = () => {
	terminal.value.write(`${"\b \b".repeat(maxLength)}`);
	terminal.value.write("\r\x1b[33m$\x1b[0m ");
};

// 命令行消息队列
const commandQueue: string[] = [];
// 当前命令索引
let commandIndex = -1;
// 不显示的Key
const disabledKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
// 运行终端
const runFakeTerminal = async () => {
	writeln("This is Web Terminal of Chip_Cloud_Platform!");
	// 添加事件监听器，支持输入方法
	terminal.value.onKey(async (e) => {
		// 能够输入的按键
		const printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
		// 获取键盘信息
		let keyDown = e.domEvent.key;
		if (keyDown === "Enter") {
			// 保存这次的指令
			commandQueue.push(inputText.value);
			commandIndex = commandQueue.length;
			// 数组中最长的命令
			maxLength = Math.max(maxLength, inputText.value.length);
			if (inputText.value === "clear") {
				terminal.value.clear();
				terminal.value.write(`${"\r"}\x1b[33m$\x1b[0m `);
				writeln("This is Web Terminal of Chip_Cloud_Platform!");
				inputText.value = "";
				return;
			}
			const commandData = {
				type: "msg",
				data: inputText.value,
			};
			ws.send(JSON.stringify(commandData));
			// 清空上一次的命令
			inputText.value = "";
			prompt();
			// 监听服务端发送过来的消息
			ws.onmessage = function (messageObj) {
				terminalStore.shape = messageObj.data;
				const resData = JSON.parse(terminalStore.shape);
				if (resData.type === "msg") {
					// 将log打印到terminal上
					writeln(resData.data);
				} else if (resData.type === "json") {
					bus.emit("jsonLoaded", resData.data);
				}
			};
			// ! http请求的代码
			// await terminalStore.getCommandRes(inputText.value);
			// const commandData = terminalStore.getResult();
		} else if (keyDown === "Backspace") {
			// back 删除的情况
			if (terminal.value.buffer.active.cursorX > 2) {
				inputText.value = inputText.value.slice(0, -1);
				terminal.value.write("\b \b");
			}
		} else if (keyDown === "ArrowUp" || keyDown === "ArrowDown") {
			if (keyDown === "ArrowUp" && commandQueue.length > 0) {
				clearCurrentRow();
				commandIndex = Math.max(commandIndex - 1, 0);
				let cmd = commandQueue[commandIndex];
				terminal.value.write(cmd);
				inputText.value = cmd;
			} else if (keyDown === "ArrowDown" && commandQueue.length > 0) {
				clearCurrentRow();
				commandIndex = Math.min(commandIndex + 1, commandQueue.length - 1);
				let cmd = commandQueue[commandIndex];
				terminal.value.write(cmd);
				inputText.value = cmd;
			}
		} else if (printable) {
			if (!disabledKey.includes(keyDown)) {
				inputText.value += keyDown;
				terminal.value.write(keyDown);
			}
		}
	});
	terminal.value.onData((key) => {
		if (key.length) {
			return;
		}
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

<style scoped></style>
