/*
## Insertion Sort
- 説明はnoteみる
*/

function swap<T>(arr: Array<T>, idx1: number, idx2: number) {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
	return
}

function insertionSort<T>(arr: Array<T>): Array<T> {
	if (arr.length <= 1) return arr

	for (let i = 1; i < arr.length; i++) {
		for(let j = i-1; j >= 0; j--) {
			if(arr[j+1] < arr[j]) {
				swap(arr, j+1, j)
			} else {
				continue
			}
		}
	}

	return arr
}

console.log(insertionSort([3,5,1,5,7,4,2,5,67,8,5,3]))
console.log(insertionSort([30,5,1,50,7,-4,2,5,67,8,5,3]))

let data = Array.apply(0, {length: 1000}).map(Function.call, Math.random)
console.time()
insertionSort(data)
console.timeEnd()