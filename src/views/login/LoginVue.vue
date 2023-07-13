<template>
	<button class="login" @click="handleLogin">login</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/modules/user.ts";
const router = useRouter();
const handleLogin = () => {
	useUserStore()
		.login("Ekko", "123456")
		.then(() => {
			console.log("登录成功");
			router.push({ path: "/page1" });
		});
};
</script>

<style lang="sass" scoped></style>
