<template>
	<a-dropdown :trigger="['click']">
		<a class="ant-dropdown-link" @click.prevent>
			File
			<DownOutlined />
		</a>
		<template #overlay>
			<a-menu>
				<a-menu-item key="0">
					<a href="">1st</a>
				</a-menu-item>
				<a-menu-item key="1">
					<a href="">2nd</a>
				</a-menu-item>
				<a-menu-divider />
				<a-menu-item key="3">3rd</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
	<a-dropdown :trigger="['click']">
		<a class="ant-dropdown-link" @click.prevent> Floorplan </a>
	</a-dropdown>
	<a-dropdown :trigger="['click']">
		<a class="ant-dropdown-link" @click.prevent> PDN </a>
	</a-dropdown>
	<a-dropdown :trigger="['click']">
		<a class="ant-dropdown-link" @click.prevent> CTS </a>
	</a-dropdown>
	<a-dropdown :trigger="['click']">
		<a class="ant-dropdown-link" @click.prevent> Routing </a>
	</a-dropdown>
	<a-dropdown :trigger="['click']">
		<a class="ant-dropdown-link" @click.prevent> DRC </a>
	</a-dropdown>
</template>
<script lang="ts" setup>
import { DownOutlined } from "@ant-design/icons-vue";
</script>
