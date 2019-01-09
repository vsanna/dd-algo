export class Item {
	public next: Item = null
	public prev: Item = null
	constructor(
		public val: any
	) {}
}


/*
## Doubly linked list
- singleLinkedListと比べて
	- ほぼ同じだが、より柔軟性を持つ。
		- edgeのremoveが完全にO(1)になる & searchが実際はN/2になる
	- 一方でメモリを取る。 
		- more memory === more flexibility
- implementation
	- push: O(1)
	- pop: O(1) ... SLLだとO(N)
	- shift: O(1)
	- unshift: O(1)
	- get: O(N)
	- set: O(N)
	- insert: O(N)
	- remove: O(N)
	- reverse: O(N)
- example
	- ブラウザの履歴
*/
export class DoublyLinkedList {
	
	public length: number = 0
	public head: Item = null
	public tail: Item = null

	constructor () {}

	push<T>(val: T): this {
		const item = new Item(val)
		if (this.length === 0) {
			this.head = item
			this.tail = item
		} {
			this.tail.next = item
			item.prev = this.tail
			this.tail = item
		}

		this.length++
		return this
	}

	pop(): Item {
		if (!this.tail) return undefined
		let removed = this.tail
		this.tail = this.tail.prev

		// 最後の1つを取り除く時
		if (this.length === 1) {
			this.head = null
		} else {
			this.tail.next = null
		}

		this.length--
		return removed
	}

	shift(): Item {
		if(!this.head) return undefined

		let removed = this.head
		this.head = this.head.next

		// 最後の1つを取り除く時
		if (this.length === 1) {
			this.tail = null
		} else {
			this.head.prev = null
		}
		this.length--
		return removed
	}

	unshift<T>(val: T): this {
		const item = new Item(val)

		if(!this.head) {
			this.head = item
			this.tail = item 
		} else {
			let oldHead = this.head
			this.head = item
			this.head.next = oldHead
			oldHead.prev = item
		}

		this.length++
		return this
	}

	get (idx:number): Item {
		if (idx < 0 || idx > this.length - 1) return null // ? null/undefinedで使い分けている?
		let current: Item
		if (idx < Math.floor(this.length / 2)) {
			current = this.head
			for (let i = 0; i < this.length; i++) {
				if (i === idx) return current
				current = current.next
			}
		} else {
			current = this.tail
			for (let i = this.length - 1; i >= 0; i--) {
				if (i === idx) return current
				current = current.prev
			}
		}

		return current
	}

	set<T>(val: T, index: number): boolean {
		const foundNode = this.get(index)
		if (foundNode) {
			foundNode.val = val
			return true
		}
		return false
	}

	insert<T>(val: T, index: number): boolean {
		if (index < 0 || index > this.length - 1) return false

		if (index === 0) {
			this.unshift(val)
			return true
		} 
		if (index === this.length - 1) {
			this.push(val)
			return true
		}
		const prevItem = this.get(index - 1)
		const nextItem = this.get(index)
		const newItem = new Item(val)
		prevItem.next = newItem 
		newItem.prev = prevItem
		nextItem.prev = newItem
		newItem.next = nextItem
		this.length++
		return true
	}

	remove(index: number): Item {
		if (index < 0 || index > this.length - 1) return undefined
		if (index === 0) {
			return this.shift()
		}	
		if (index === this.length - 1) {
			return this.pop()
		}
		const removed = this.get(index)
		removed.prev.next = removed.next
		removed.next.prev = removed.prev

		this.length--
		return removed
	}

	reverse(): this {
		let node = this.head
		this.head = this.tail
		this.tail = node
		let next: Item
		let prev: Item = null
		for (let i = 0; i < this.length; i++) {
			next = node.next
			node.next = prev
			prev = node
			node = next
		}
		return this
	}
}


let list = new DoublyLinkedList()
list.push('hello')
list.push('world')
list.push('hoge')
// console.log(list.pop())
// console.log(list.pop())
// console.log(list.pop())
console.log(list.shift())
console.log(list.shift())
console.log(list.shift())
console.log(list.head, list.tail)
console.log(list.unshift(123))
console.log(list.unshift(456))
console.log(list.unshift(789))
console.log(list.get(0))
console.log(list.get(1))
console.log(list.get(2))
console.log(list.get(3))