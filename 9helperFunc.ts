/*
## Helper関数の利用
*/
function reverse(str: string): string {
	// return str.split('').reverse().join('')
	let result = ''
	for (let char of str) {
		result = char + result
	}
	return result
}


function isPalindrome(str: string): boolean {
	let arr = str.split('')

	function helper(arr) {
		if (arr.length <= 1) return true

		let first = arr.shift()
		let last = arr.pop()
		console.log(arr, first, last)
		if (first === last) {
			return helper(arr)
		} else {
			return false
		}
	}

	return helper(arr)
}

console.table([
	isPalindrome('awesome'), // false
	isPalindrome('foobar'), // false
	isPalindrome('tacocat'), // true
	isPalindrome('amanaplanacanalpanama'), // true
	isPalindrome('amanaplanacanalpandemonium'), // false
])


function someRecursive(arr: number[], func: any) {
	// これで正解
	// return arr.some(func)

	// recursiveにかく
	if (arr.length === 0) return false

	return func(arr[0]) || someRecursive(arr.slice(1), func)
}

const isOdd = val => val % 2 !== 0;
console.table([
	someRecursive([1, 2, 3, 4], isOdd), // true
	someRecursive([4, 6, 8, 9], isOdd), // true
	someRecursive([4, 6, 8], isOdd), // false
	someRecursive([4, 6, 8], val => val > 10), // false
])

function flatten(arr: any[]): number[] {
	let result = []

	function helper(input) {
		if (input.length === 0) return
		let item = input.shift()

		if (item instanceof Array) {
			helper(item)
		} else {
			result.push(item)
		}
		helper(input)
	}
	helper(arr)

	return result
}
console.table([
	flatten([1, 2, 3, [4, 5]]), // [1, 2, 3, 4, 5]
	flatten([1, [2, [3, 4], [[5]]]]), // [1, 2, 3, 4, 5]
	flatten([[1], [2], [3]]), // [1,2,3]
	flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]),
])

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function capitalizeFirst(arr: string[]): string[] {
	if (arr.length !== 1) {
		return [capitalize(arr[0])].concat(capitalizeFirst(arr.slice(1)))
	} else {
		return [capitalize(arr[0])]
	}
}
console.table([
	capitalizeFirst(['car', 'taco', 'banana']) // ['Car','Taco','Banana']
])

function isNumber(item): item is Number {
	return (typeof item === 'number') || (typeof item === 'object' && item.constructor === Number)
}

function nestedEvenSum(obj) {
	let result = 0
	for (let key in obj) {
		let value = obj[key]
		if (isNumber(value) && value % 2 === 0) {
			result += value as number
		}
		else if (value instanceof Object) {
			result += nestedEvenSum(value)
		}
	}

	return result
}

var obj1 = {
	outer: 2,
	obj: {
		inner: 2,
		otherObj: {
			superInner: 2,
			notANumber: true,
			alsoNotANumber: "yup"
		}
	}
}

var obj2 = {
	a: 2,
	b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
	c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
	d: 1,
	e: { e: { e: 2 }, ee: 'car' }
};

console.table([
	nestedEvenSum(obj1),
	nestedEvenSum(obj2), // 10
])

function capitalizeWords(arr: string[]): string[] {
	// これでも正解
	// return arr.map(word => word.toUpperCase())

	// recursive
	if (arr.length === 1) {
		return [arr[0].toUpperCase()]
	} else {
		return [arr[0].toUpperCase()].concat(capitalizeWords(arr.slice(1)))
	}
}

function stringifyNumbers(obj) {
	let result = {}
	Object.keys(obj).forEach((key, idx) => {
		let value = obj[key]
		if (isNumber(value)) {
			result[key] = String(value)
		}
		else if (value !== undefined && value.toString() === '[object Object]') {
			result[key] = stringifyNumbers(obj[key])
		}
		else {
			result[key] = value
		}
	})

	return result
}

let obj2 = {
	num: 1,
	test: [],
	data: {
		val: 4,
		info: {
			isRight: true,
			random: 66
		}
	}
}
console.log(
	stringifyNumbers(obj2)
)


function collectStrings(obj) {
	let result = []

	function helper(input) {
		if (input.length === 0) return
		Object.values(input).forEach((val, idx) => {
			if (typeof val === 'string') {
				result.push(val)
			}
			else if (val !== undefined && val.toString() === '[object Object]') {
				helper(val)
			}
		})
	}
	helper(obj)
	return result
}