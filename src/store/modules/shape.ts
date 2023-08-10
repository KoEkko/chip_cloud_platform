import { ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

interface IShape {
	id: number;
	value: string;
	visible: boolean;
	zIndex: number;
	position: number[];
	color: number;
}

export const useShapeStore = defineStore("shapeStore", () => {
	const shapes = ref<IShape[]>([
		{
			id: uuidv4(),
			value: "shape1",
			visible: true,
			zIndex: 0,
			position: [300, 300, 200, 100],
			color: 0xfff000,
		},
		{
			id: uuidv4(),
			value: "shape2",
			visible: true,
			zIndex: 4,
			position: [350, 300, 100, 100],
			color: 0xffffff,
		},
		{
			id: uuidv4(),
			visible: true,
			value: "shape3",
			zIndex: 2,
			position: [300, 350, 100, 100],
			color: 0xff1000,
		},
	]);

	const getResult = () => {
		return shapes;
	};
	const ChangeVisible = (id: number) => {
		const item = shapes.value.find((child) => {
			return child.id === id;
		});
		item && (item.visible = !item.visible);
	};
	return { shapes, getResult, ChangeVisible };
});
