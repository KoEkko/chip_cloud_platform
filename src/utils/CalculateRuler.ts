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

export { getClosestVal, getStepByZoom };
