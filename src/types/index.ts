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
