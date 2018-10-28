// sameFrequency

function sameFrequency(a, b) {
	let a_str = String(a)
	let b_str = String(b)
	if (a_str.length !== b_str.length) return false

	let freq_a = {}
	for (let char of a_str) {
		freq_a[char] = (freq_a[char] || 0) + 1
	}

	for (let char of b_str) {
		if (!freq_a[char]) return false
		freq_a[char]--
	}

	return true
}


// areThereDuplicates
areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true 
areThereDuplicates('a', 'b', 'c', 'a') // true

function areThereDuplicates(...args: any[]): boolean {
	if (args.length === 0) return

	let freq = {}

	for (let val of args) {
		console.log(val, freq[val])
		if (freq[val]) return true
		freq[val] = 1
	}

	console.log(freq)

	return false
}
console.table([
	areThereDuplicates(1, 2, 3), // false
	areThereDuplicates(1, 2, 2), // true 
	areThereDuplicates('a', 'b', 'c', 'a'), // true
	areThereDuplicates(1, 2, 3, '1', '2', '3'), // true
])