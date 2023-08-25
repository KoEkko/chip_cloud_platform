import * as PIXI from "pixi.js";
import { IShape } from "../store/modules/shape";
import { IGraphic } from "../types";

const getShapeGraphicsArr = (shapes: IShape[]): IGraphic[] => {
	const graphicsShapes = shapes.map(({ zIndex, position, color, id, category }) => {
		const graphics = new PIXI.Graphics();
		Object.defineProperty(graphics, "id", {
			value: id,
			writable: true,
			enumerable: true,
			configurable: true,
		});
		const [x, y, width, height] = position;
		const rect = new PIXI.Rectangle(x, y, width, height);
		graphics.beginFill(color);
		graphics.drawRect(rect.x, rect.y, width, height);
		graphics.zIndex = zIndex;
		return { graphics, id, x, y, width, height, color, zIndex, category };
	});
	return graphicsShapes;
};

function useCanvasView() {
	return {
		getShapeGraphicsArr,
	};
}

export default useCanvasView;
