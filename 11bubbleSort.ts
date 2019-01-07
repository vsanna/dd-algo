/*
## Bubble Sort
- 説明はnoteみる

*/

function swap<T>(arr: Array<T>, idx1: number, idx2: number) {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
	return
}


function bubbleSort<T>(arr: Array<T>): Array<T> {
	for (let i = 0; i < arr.length; i++) {
		let swapped = false
		for (let j = arr.length-1; j > i; j--) {
			if (arr[j] < arr[j-1]) {
				swap(arr, j, j-1)
				swapped = true
			}
		}
		if (!swapped) return arr
	}
	return arr
}

console.log(
	bubbleSort([3,5,1,5,7,4,2,5,67,8,5,3])
)