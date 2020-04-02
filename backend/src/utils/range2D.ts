export const range2D = (
	from: number,
	to: number,
	every: (x: number, y: number) => void,
	everyX?: (x: number) => void
): void => {
	for (let x = from; x < to; x++) {
		everyX?.(x);
		for (let y = from; y < to; y++) {
			every(x, y);
		}
	}
};
