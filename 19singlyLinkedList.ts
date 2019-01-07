export class Item {
	public next: Item = null
	constructor(
		public val: any
	) {}
}


/*
## singly linked list
- Arrayとの比較
	- indexなし。randam accessできないので、アクセスは遅い
	- insert/deleteが早いしコスト低い。arrayは作り直すので高コスト
- implementation
	- push: O(1)
	- pop: O(N)
		- tailから取得する
		- tailの一つ手前にアクセスする必要がある
	- shift: O(1)
		- head から1個取得する(shift計算のイメージ)
	- unshift: O(1)
		- headに1個入れる
	- get: O(N)
		- (引数としての)indexに位置するnodeを返す		
	- set: O(N)
	- insert: O(N)
	- remove: O(N)
	- reverse: O(N)
- Array
	- insertion / removal ... O(N)
	- access: O(1)
	- search: O(N)
*/
export class SinglyLinkedList {
	
	public length: number = 0
	public head: Item = null
	public tail: Item = null

	constructor () {}

	push<T>(val: T): this {
		const item = new Item(val)
		if (!this.head) {
			this.head = item
		} else {
			this.tail.next = item
		}
		this.tail = item
		this.length++

		return this
	}

	pop(): Item {
		if (!this.tail) return undefined
		let current = this.head
		let newTail: Item
		while(current.next) {
			newTail = current
			current = current.next
		}
		this.length--
		if (this.length === 0) {
			this.head = null
			this.tail = null
		} else {
			this.tail = newTail
			this.tail.next = null
		}
		return current
	}

	traverse() {
		var current = this.head
		while(current) {
			// do something
			console.log(current.val)
			current = current.next
		}
	}

	shift(): Item {
		if(!this.head) return undefined

		let current = this.head
		this.head = current.next
		this.length--
		if (this.length === 0) {
			this.tail = null
		}
		return current
	}

	unshift<T>(val: T): this {
		const item = new Item(val)

		if(!this.head) {
			this.head = item
			this.tail = this.head
		} else {
			const current = this.head
			this.head = item
			this.head.next = current
		}

		this.length++
		return this
	}

	get (idx:number): Item {
		if (idx < 0 || idx > this.length - 1) return null // ? null/undefinedで使い分けている?
		let current = this.head
		for(let i = 0; i < this.length; i++) {
			if (i === idx) return current
			current = current.next
		}
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
		const prevItem = this.get(index - 1)
		prevItem.next = removed.next 

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
