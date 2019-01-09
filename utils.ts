export function createArray(size: number): Array<number> {
	if (size < 0) return []
	return Array.apply(0, {length: size}).map(Function.call, Math.random)
}