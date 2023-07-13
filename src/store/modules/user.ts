import { defineStore } from "pinia";
import { ref } from "vue";
import { store } from "..";
import { localCache } from "../../utils/CacheType";

export const useUserStore = defineStore("user", () => {
	const token = ref<string>("");
	const roles = ref<string[]>([]);

	// 设置角色数组
	const setRoles = (values: string[]) => {
		roles.value = values;
	};

	/**
	 * 模拟登录
	 */
	const MockLoginApi = (userName: string, passWord: string): Promise<any> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						userName,
						passWord,
						token: "0x12345",
					},
				});
			}, 1000);
		});
	};
	// 登录
	const login = async (userName: string, passWord: string) => {
		const { data } = await MockLoginApi(userName, passWord);
		localCache.setCache("token", data.token);
		token.value = data.token;
	};

	// 模拟获取用户详情
	const MockGetInfo = (): any => {
		return new Promise((resolve) => {
			resolve({
				data: {
					roles: ["admin"],
				},
			});
		});
	};
	// 获取用户详情
	const getInfo = async () => {
		const { data } = await MockGetInfo();
		console.log(data);
		// 验证用户详情中的roles是否为一个空数组，否则塞入一个默认角色
		roles.value = data.roles?.length > 0 ? data.roles : ["DEFAULT_ROLE"];
	};
	return { token, roles, setRoles, login, getInfo };
});

export function useUserStoreHook() {
	return useUserStore(store);
}
