/*
## Merge Sort
- 説明はnoteみる
*/

function merge<T>(left: Array<T>, right: Array<T>): Array<T> {
	let result: Array<T> = []

	let i = 0
	let j = 0

	while(i < left.length && j < right.length) {
		if(left[i] < right[j]) {
			result.push(left[i])
			i++
		} else {
			result.push(right[j])
			j++
		}
	}

	while(i < left.length) {
		result.push(left[i])
		i++
	}
	
	while(j < right.length) {
		result.push(right[j])
		j++
	}

	return result
}

function mergeSort<T>(arr: Array<T>): Array<T> {
	if (arr.length < 2) return arr
	let mid = Math.floor(arr.length / 2)
	let left = mergeSort(arr.slice(0, mid))
	let right = mergeSort(arr.slice(mid))
	return merge(left, right)
}

console.log(mergeSort([3,5,1,5,7,4,2,5,67,8,5,3]))
console.log(mergeSort([30,5,1,50,7,-4,2,5,67,8,5,3]))


let data = Array.apply(0, {length: 1000}).map(Function.call, Math.random)
console.time()
mergeSort(data)
console.timeEnd()