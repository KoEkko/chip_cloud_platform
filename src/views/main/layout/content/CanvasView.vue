<template>
	<div ref="wrap" class="wrap">
		<div ref="container" class="container"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as PIXI from "pixi.js";
import { throttle } from "lodash-es";
const props = defineProps<{
	id: number | undefined;
}>();

// import { useTerminalStore } from "../../../../store/modules/getTerminal";
import { useShapeStore } from "../../../../store/modules/shape";

const wrap = ref<HTMLBodyElement>();
const { getResult, ChangeVisible } = useShapeStore();
const shapes = getResult();
interface _Graphics extends PIXI.Graphics {
	id: number;
	visible: boolean;
}
const app = new PIXI.Application({
	background: "#000000",
	autoDensity: true,
	resolution: window.devicePixelRatio,
	antialias: true,
});
// 自适应
function resizeRender() {
	const width = wrap.value!.clientWidth;
	const height = wrap.value!.clientHeight;
	app.renderer.resize(width, height);
}
const throttleResizeRender = throttle(resizeRender, 200);
window.addEventListener("resize", throttleResizeRender);
const container = new PIXI.Container();
container.sortableChildren = true;
const shapeGrahpicArr = shapes.value.map(({ zIndex, position, color, id, visible }) => {
	const graphics = new PIXI.Graphics() as _Graphics;
	const [x, y, width, height] = position;
	graphics.beginFill(color);
	graphics.drawRect(x, y, width, height);
	graphics.zIndex = zIndex;
	Object.defineProperties(graphics, {
		id: {
			value: id,
			writable: true,
			enumerable: true,
			configurable: true,
		},
		visible: {
			value: visible,
			writable: true,
			enumerable: true,
			configurable: true,
		},
	});
	return graphics;
});

watch(
	() => props.id,
	(newValue) => {
		if (newValue) {
			const item = shapeGrahpicArr.find((child) => {
				return child?.id === newValue;
			});
			if (item) {
				if (item?.visible) {
					ChangeVisible(newValue);
					console.log(item.visible);
					item.clear();
				} else {
					ChangeVisible(newValue);
					console.log(item.visible);
					const { x, y, width, height } = item;
					item.drawRect(x, y, width, height);
				}
			}
		}
	}
);
watch(
	shapes.value,
	(newValue) => {
		console.log(newValue);
	},
	{
		deep: true,
	}
);
onMounted(async () => {
	const width = wrap.value!.clientWidth;
	const height = wrap.value!.clientHeight;
	app.renderer.resize(width, height);
	wrap.value?.appendChild(app.view as any);

	container.addChild(...shapeGrahpicArr);
	app.stage.addChild(container);
});
</script>

<style scoped>
.wrap {
	z-index: 99;
	flex: 1;
	height: 60vh;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
}
</style>
