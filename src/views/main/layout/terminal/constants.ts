import { xtermHandleMap } from ".";
export const KEY_CODE_MAP = {
	moveUp: "ArrowUp",
	moveDown: "ArrowDown",
	shiftLeft: "ArrowLeft",
	shiftRight: "ArrowRight",
	backspace: "Backspace",
	c: "c",
	v: "v",
	x: "x",
	space: " ",
	enter: "Enter",
};

export const XTERM_KEY_MAP: xtermHandleMap = {
	xtermMoveUp: "\x1B[A",
	xtermMoveDown: "\x1B[B",
	xtermShiftLeft: "\x1B[D",
	xtermBackspace: "\b \b",
	xtermShiftRight: "\x1B[C",
	xtermSpace: " ",
};
