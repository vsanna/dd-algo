/*
## Queue
- FIFOの箱. insert/removeに特化している
- ユースケース
	- job queueなど、処理の待ち合わせに使う
- Big O
	- insert(edge): O(1)
	- remove(edge): O(1)
	- (search: O(N))
	- (access: O(N))
- 実際はArrayをそのまま使えばいい。
	- Arrayにある使わないメソッドの存在を気にするくらいキチキチにパフォーマンスを上げるのであれば自作してもいいけど、という感じ
	- push/popがあるSLLでOK
*/

class Item {
	public next: Item

	constructor(
		public val: any
	) {}
}

class Queue {
	public length: number = 0
	public head: Item
	public tail: Item

	queue<T>(val: T): Item {
		const item = new Item(val)
		if (!this.tail) {
			this.head = item
			this.tail = item
		} else {
			this.tail.next = item
			this.tail = item
		}

		this.length++
		return item
	}

	dequeue(): Item {
		if(!this.head) return undefined
		const removed = this.head
		this.head = this.head.next
		this.length--
		return removed
	}
}