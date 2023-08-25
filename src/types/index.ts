import * as PIXI from "pixi.js";

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

export type Positon = {
	x: number;
	y: number;
};

export type offset = {
	gx: number;
	gy: number;
	cx: number;
	cy: number;
};
