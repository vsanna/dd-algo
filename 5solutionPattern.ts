import measure from './measure'

/*
# SEC5 Problem Solutation Pattern
- how to improve
	1. devise a plan for solving
		- 前段までの問題解決の手順
	2. master common solution
		- frequency counter
		- multiple pointer
		- sliding window
		- divide and conquer
		- dynamic programming
		- greedy algorithms
		- backtracking
		- many more!

## frequency counters: 頻度カウンター
- nested loopを回避できる
*/

// ex: write same func.
// 二乗の数を後ろが持っていればOK. なお登場回数も同じでなければならない
// same([1, 2, 3], [4, 1, 9]) // true
// same([1, 2, 3], [1, 9])    // false
// same([1, 2, 1], [4, 4, 1]) // false

// naive solution O(n^2)
function same(arr1, arr2) {
	if (arr1.length !== arr2.length) return false

	for (let i = 0; i < arr1.length; i++) {
		let correctIndex = arr2.indexOf(arr1[i] ** 2)
		if (correctIndex === -1) return false
		arr2.splice(correctIndex, 1)
	}

	return true
}
console.log(same([1, 2, 3, 2], [9, 1, 4, 4]))

// refactore: O(2N) = O(N) になった
function same2(arr1, arr2) {
	if (arr1.length !== arr2.length) return false

	let frequencyConter1 = {}
	let frequencyConter2 = {}

	for (let val of arr1) {
		frequencyConter1[val] = (frequencyConter1[val] || 0) + 1
	}

	for (let val of arr2) {
		frequencyConter2[val] = (frequencyConter2[val] || 0) + 1
	}

	console.log(frequencyConter1)
	console.log(frequencyConter2)

	for (let key in frequencyConter1) {
		key = Number(key)
		if (!(key ** 2 in frequencyConter2)) return false
		if (frequencyConter2[key ** 2] !== frequencyConter1[key]) return false
	}

	return true
}
console.log(same2([-1, 2, 3, 2], [9, 1, 4, 4]))


// anagram
validAnagram('', '')       // true
validAnagram('aaz', 'zaa') // true
validAnagram('rat', 'car') // false

function validAnagram(str1: string, str2: string): boolean {
	if (str1.length !== str2.length) return false

	let freq1 = {}
	for (let char of str1) {
		freq1[char] = (freq1[char] || 0) + 1
	}

	let freq2 = {}
	for (let char of str2) {
		freq2[char] = (freq2[char] || 0) + 1
	}

	console.log(freq1, freq1)

	for (let key in freq1) {
		if (freq1[key] !== freq2[key]) return false
	}
	return true
}
console.log(validAnagram('aaz', 'aza'))


/*
## multiple pointer
- ソート済み配列を左右から狭めていくタイプ。
- very efficient for minimal space complexity
*/

// sumzero
// sumが0になるpairを見つける. なければundefined
// inputはsortedとする
sumzero([-3, -2, -1, 0, 1, 2, 3]) // [-3, 3]
sumzero([-2, 0, 1, 3]) // undefined

// naive
function sumzero(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] + arr[j] === 0) {
				return [arr[i], arr[j]]
			}
		}
	}
}
console.log(sumzero([-4, -3, -2, -1, 0, 1, 2, 5]))
measure(() => {
	sumzero([-4, -3, -2, -1, 0, 1, 2, 5])
}, { label: 'sumzero' })

// refactor
// 「ソート済み」という性質を使う
function sumzero2(arr) {
	let left = 0
	let right = arr.length - 1
	while (left < right) {
		let sum = arr[left] + arr[right]
		if (sum === 0) {
			return [arr[left], arr[right]]
		} else if (sum > 0) {
			right--
		} else {
			left++
		}
	}
}
measure(() => {
	sumzero2([-4, -3, -2, -1, 0, 1, 2, 5])
}, { label: 'sumzero2' })


/*
## countUniqueValue
*/
// inputはsortedとする
// time complexity:  O(n)
// space complexity: O(1)
countUniqueValues([1, 1, 1, 1, 1, 2]) // 2
countUniqueValues([1, 2, 3, 4, 4, 4, 7, 12]) // 6

function countUniqueValues(arr: number[]): number {
	let numOfUniqueness = 0
	let currentnum
	arr.forEach((num, idx) => {
		if (currentnum !== num) numOfUniqueness++
		currentnum = num
	})

	return numOfUniqueness
}
console.log(countUniqueValues([1, 1, 1, 1, 3]))


/*
## Sliding Window
- useful for keeping track of a subset of data in an array/string
- windowの前後の要素をみている
*/

// maxSubarraySum(arr, size) 
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) // 10
maxSubarraySum([], 4) // null
maxSubarraySum([4, 2, 1, 6, 2], 4) // 13

function maxSubarraySum(arr, size) {
	if (size > arr.length) return null

	let max = -Infinity
	for (let i = 0; i < arr.length - size + 1; i++) {
		let tmp = 0
		for (let j = 0; j < size; j++) {
			tmp += arr[i + j]
		}

		if (tmp > max) {
			max = tmp
		}
	}
	return max
}
console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3))

// refactor
function maxSubarraySum2(arr, size) {
	let maxsum = 0
	let tmpsum = 0
	if (arr.length < size) return null

	for (let i = 0; i < size; i++) {
		maxsum += arr[i]
	}

	tmpsum = maxsum

	for (let i = size; i < arr.length; i++) {
		tmpsum = tmpsum - arr[i - size] + arr[i]
		maxsum = Math.max(maxsum, tmpsum)
	}

	return maxsum
}
console.log(maxSubarraySum2([2, 6, 9, 2, 1, 8, 5, 6, 3], 3))


/*
## Divide and Conquer
- divide a data set into smaller chunks and then repeating a process with a subset of data
- ex: binary search
- sorted前提
- logNが出てくるのはたいていこのパターン
*/

search([1, 2, 3, 4, 5, 6], 4)  // 3
search([1, 2, 3, 4, 5, 6], 14) // -1
// naive
// O(n)で頭から見ていく(linear search)

// refactor
// binary search
function search(arr, target) {
	let min = 0
	let max = arr.length - 1

	while (min <= max) {
		let middle = Math.floor((min + max) / 2)
		let currentElement = arr[middle]

		if (arr[middle] < target) {
			min = middle + 1
		} else if (arr[middle] > target) {
			max = middle - 1
		} else {
			return middle
		}
	}

	return -1
}
console.log(search([1, 2, 3, 4, 5, 6], 4))
console.log(search([1, 2, 3, 4, 5, 6], 14))