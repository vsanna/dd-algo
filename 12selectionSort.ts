/*
## Selection Sort
- 説明はnoteみる
*/

function swap<T>(arr: Array<T>, idx1: number, idx2: number) {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
	return
}

function selectionSort<T>(arr: Array<T>): Array<T> {
	for (let i = 0; i < arr.length; i++) {
		let minIdx = i
		for (let j = i+1; j < arr.length; j++) {
			if (arr[minIdx] > arr[j]) {
				minIdx = j
			}
		}
		if (minIdx !== i) swap(arr, minIdx, i)
	}
	return arr
}

console.log(selectionSort([3,5,1,5,7,4,2,5,67,8,5,3]))
console.log(selectionSort([30,5,1,50,7,-4,2,5,67,8,5,3]))