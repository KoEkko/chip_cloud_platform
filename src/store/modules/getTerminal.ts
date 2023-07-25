import { ref } from "vue";
import { defineStore } from "pinia";
import { getCommandApi } from "../../service/main/fetchTerminal";
export const useTerminalStore = defineStore("terminalStore", () => {
	const result = ref();

	const getCommandRes = async (commandText: string) => {
		result.value = await getCommandApi(commandText);
	};

	const getResult = () => {
		return result;
	};
	return { result, getCommandRes, getResult };
});
