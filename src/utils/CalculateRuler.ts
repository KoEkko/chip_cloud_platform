// 视口坐标转化为场景坐标
const viewportCoordsToSceneCoords = (x: number, y: number, scrollX: number, scrollY: number, zoom: number) => {
	return {
		x: scrollX + x / zoom,
		y: scrollY + y / zoom,
	};
};
// 场景坐标转化为视口坐标
const sceneCoordsToViewportCoords = (x: number, y: number, scrollX: number, scrollY: number, zoom: number) => {
	return {
		x: (x - scrollX) * zoom,
		y: (y - scrollY) * zoom,
	};
};
// 根据光标缩放调整视口的位置
const calScrollVal = (cx: number, cy: number, prevZoom: number, zoom: number, scrollX: number, scrollY: number) => {
	const { x: sceneX, y: sceneY } = viewportCoordsToSceneCoords(cx, cy, prevZoom, scrollX, scrollY);
	const newScrollX = sceneX - cx / zoom;
	const newScrollY = sceneY - cy / zoom;
	return {
		x: newScrollX,
		y: newScrollY,
	};
};
/**
 * 根据放缩比计算出刻度间隔
 * @param zoom 放缩比
 * @returns step 刻度间隔
 */
const getStepByZoom = (zoom: number) => {
	const steps = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
	const step = 50 / zoom;
	for (let i = 0, len = steps.length; i < len; i++) {
		if (steps[i] >= step) return steps[i];
	}
	return steps[0];
};
/**
 *  计算出当前值最接近的值，是整数
 * @param value 刻度值
 * @param segment 当前zoom下的刻度间隔
 */
const getClosestVal = (value: number, segment: number) => {
	const n = Math.floor(value / segment);
	const left = segment * n;
	const right = segment * (n + 1);
	return value - left <= right - value ? left : right;
};

export { getClosestVal, getStepByZoom, viewportCoordsToSceneCoords, sceneCoordsToViewportCoords, calScrollVal };
