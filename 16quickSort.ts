/*
## Quick Sort
- 説明はnoteみる
*/

function pivot<T>(arr: Array<T>, start: number = 0, end: number = arr.length - 1): number {
	if (start === end) return start

	let pivotValue = arr[start]
	let swapIdx = 0
	if (let i = start + 1; i < end; i++) {
		if (pivotValue > arr[i]) {
			swapIdx++
			
		}
	}
	let pivotIdx = start


}

function quickSort<T>(arr: Array<T>): Array<T> {
	if (arr.length < 2) return arr

	return arr
}

console.log(quickSort([3, 5, 1, 5, 7, 4, 2, 5, 67, 8, 5, 3]))
console.log(quickSort([30, 5, 1, 50, 7, -4, 2, 5, 67, 8, 5, 3]))


let data = Array.apply(0, { length: 1000 }).map(Function.call, Math.random)
console.time()
quickSort(data)
console.timeEnd()