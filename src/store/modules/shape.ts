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
}
interface IGraphic {
	graphics: PIXI.Graphics;
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	color: number;
	zIndex: number;
}
export const useShapeStore = defineStore("shapeStore", () => {
	const shapes = ref<IShape[]>([
		{
			id: uuidv4(),
			value: "Yellow",
			zIndex: 0,
			position: [300, 300, 200, 100],
			color: 0xfff000,
		},
		{
			id: uuidv4(),
			value: "White",
			zIndex: 4,
			position: [350, 300, 100, 100],
			color: 0xffffff,
		},
		{
			id: uuidv4(),
			value: "Red",
			zIndex: 2,
			position: [300, 350, 100, 100],
			color: 0xff1000,
		},
	]);
	let shapeGraphicArr: IGraphic[] = [];
	let container: any;
	const getResult: () => Ref<IShape[]> = () => {
		return shapes;
	};

	const useFillShapeGraphicArr = (arr: IGraphic[]) => {
		shapeGraphicArr.push(...arr);
	};
	const useContainer = (con: PIXI.Container) => {
		container = con;
	};
	const getShapeGraphicArr = () => {
		return shapeGraphicArr;
	};
	const getContainer = () => {
		return container;
	};
	return { shapes, getResult, useFillShapeGraphicArr, getShapeGraphicArr, useContainer, getContainer };
});
