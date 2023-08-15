import { Ref, ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import * as PIXI from "pixi.js";
interface IShape {
	id: string;
	value: string;
	zIndex: number;
	position: number[];
	color: number;
	category: string[];
}
export interface IGraphic {
	graphics: PIXI.Graphics;
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	color: number;
	zIndex: number;
	category: string[];
}

export const useShapeStore = defineStore("shapeStore", () => {
	const shapes = ref<IShape[]>([
		{
			id: uuidv4(),
			value: "Yellow",
			zIndex: 0,
			position: [300, 300, 200, 100],
			color: 0xfff000,
			category: ["Clock", "Pad", "Block"],
		},
		{
			id: uuidv4(),
			value: "White",
			zIndex: 4,
			position: [350, 300, 100, 100],
			color: 0xffffff,
			category: ["Clock", "IO Cell"],
		},
		{
			id: uuidv4(),
			value: "Red",
			zIndex: 2,
			position: [300, 350, 100, 100],
			color: 0xff1000,
			category: ["Clock", "IO Cell", "Block"],
		},
	]);

	const getResult: () => Ref<IShape[]> = () => {
		return shapes;
	};

	return { shapes, getResult };
});
