import type { Directive } from "vue";
import { useUserStoreHook } from "../../store/modules/user";

/** 权限指令：permission */
export const permission: Directive = {
	mounted(el, binding) {
		// binding：["admin", "developer"]
		const { value: permissionRoles } = binding;
		const { roles } = useUserStoreHook();
		if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
			const hasPermission = roles.some((role) => permissionRoles.includes(role));
			hasPermission || el.parentNode?.removeChild(el); // 没有权限的话销毁
		} else {
			throw new Error("need roles!");
		}
	},
};
