import { ref } from "vue";
import { defineStore } from "pinia";
import { getCommandApi } from "../../service/main/fetchTerminal";
export const useTerminalStore = defineStore("terminalStore", () => {
	const shape = ref();

	const getCommandRes = async (commandText: string) => {
		shape.value = await getCommandApi(commandText);
	};

	const getResult = () => {
		return shape;
	};

	return { shape, getCommandRes, getResult };
});
