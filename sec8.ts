function power(base: number, exp: number): number {
	if (base < 0 || exp < 0) throw new Error('invalid argument')
	if (exp === 0) return 1
	return base * power(base, exp - 1)
}
console.table([
	power(3, 1)
])


function factorial(num: number): number {
	if (num === 1 || num === 0) return 1
	return num * factorial(num - 1)
}
console.table([
	factorial(3)
])


function productOfArray(arr: number[]): number {
	let result = 1

	function helper(input) {
		if (input.length === 0) return
		result = result * input[0]
		helper(input.slice(1))
	}
	helper(arr)

	return result
}
console.table([
	productOfArray([1, 2, 3, 10, 20])
])

function recursiveRange(num: number): number {
	if (num === 0) return 0
	return num + recursiveRange(num - 1)
}
console.table([
	recursiveRange(20)
])

function fib(num: number): number {
	if (num === 1 || num === 2) return 1
	return fib(num - 1) + fib(num - 2)
}
