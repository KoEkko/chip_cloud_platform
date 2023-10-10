<template>
	<div class="control">
		<div class="title">Control</div>
		<div class="check-box">
			<div class="category">
				<div class="c1"></div>
				<div class="c2"></div>
				<div class="c3">V</div>
			</div>
			<div class="c_box">
				<template v-for="child in options" :key="child.id">
					<div class="item">
						<div class="i1"></div>
						<div :class="[{ i2: getStyle(child) }, { i22: !getStyle(child) }]">{{ child.layername }}</div>
						<div class="i3"><input type="checkbox" @click="onCheckBoxClick(child)" /></div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
type Toptions = {
	id: string;
	layername: string;
	pid?: string;
};

const emit = defineEmits(["onCheckBoxClick"]);

let checkedOptions: string[] = [];
const onCheckBoxClick = (child: Toptions) => {
	const option = child.layername;
	if (checkedOptions.includes(option)) {
		checkedOptions = checkedOptions.filter((o) => o !== option);
	} else {
		checkedOptions.push(option);
	}
	emit("onCheckBoxClick", checkedOptions);
};
const options = ref<Toptions[]>();

setTimeout(() => {
	fetch("/js/final_design.json")
		.then((res) => res.json())
		.then((data) => {
			options.value = data.layerInfo;
		});
}, 100);

const getStyle = function (value: Toptions) {
	return !!value.pid;
};
</script>

<style scoped>
.control {
	display: flex;
	flex-direction: column;
	.title {
		height: 32px;
		font-size: 16px;
		font-weight: 800;
		background-color: #fff;
		padding: 4px 0 4px 4px;
	}
	.check-box {
		min-width: 250px;
		width: 12vw;
		height: calc(100% - 32px);
		border: 1px solid gray;
		background-color: #fff;
		.category {
			height: 16px;
			display: flex;
			border-bottom: 1px solid;
			.c1 {
				flex: 2;
				background: #f1f1f1;
				border-right: 1px solid;
			}
			.c2 {
				flex: 2;
				background: #f3f3f3;
				border-right: 1px solid;
			}
			.c3 {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f5f5f5;
			}
		}
		.c_box {
			display: flex;
			flex-direction: column;
			.item {
				height: 20px;
				width: 100%;
				display: flex;
				.i1 {
					flex: 2;
				}
				.i2 {
					flex: 2;
					display: flex;
					align-items: center;
				}
				.i22 {
					flex: 2;
					display: flex;
					align-items: center;
					justify-content: end;
				}
				.i3 {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
}
</style>
