import measure from './measure'
/*
# SEC3 performance of array, object

## O of object: unordered list
- insertion = O(1)
- removal   = O(1)
- searching = O(n)
- access    = O(1)
	- なぜ? accessにsearchっていらないの？


## O of Object methods
- Object.keys			= O(n)
- Object.values  		= O(n)
- Object.entries		= O(n)
- Object#hasOwnProperty = O(1)
	- なぜ?
*/

let instructor = {
	firstName: 'tom',
	isInstructor: true,
	favoriteNums: [1, 2, 3, 4]
}

console.log(instructor.hasOwnProperty('firstName'))


/*
## O of array: ordered lists
- when
	- need order
	- fast access
- insertion = it depends on...
	- 先頭に追加すると、re-indexが必要. そのサイズ分操作が発生する
- removal   = it depends on...
- searching = O(n)
- access    = O(1)

- methods
	- push    = O(1)
	- pop	  = O(1)
	- shift   = O(n) ? re-index
	- unshift = O(n) ? re-index
	- concat  = O(n) ? re-index
	- slice   = O(n) ? search
	- splice  = O(n) ? search
	- sort    = O(n * log(n)) ?
	- foreach = O(n) ? for-loop
*/

const addLast = n => {
	let arr = new Array(n)
	arr.push(10)
}
const addHead = n => {
	let arr = new Array(n)
	arr.unshift(10)
}
let options = {} //{ scales: [8, 9] }
measure(addLast, options)
measure(addHead, options)
