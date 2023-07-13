<template>
	<Login />
	<br />
	<span>--------------------------------------未登录</span>
	<RouterView />
</template>

<script setup lang="ts">
import Login from "@/views/login/LoginVue.vue";
</script>

<style lang="sass" scoped></style>
