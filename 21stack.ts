/*
## Stack
- LIFOの箱. insert/removeに特化している
- Big O
	- insert(edge): O(1)
	- remove(edge): O(1)
	- (search: O(N))
	- (access: O(N))
- ユースケース
	- 関数スタック, undo/redo, routing(ページ履歴)
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

class Stack {
	public length: number = 0
	public head: Item

	push<T>(val: T): Item {
		const item = new Item(val)
		if(!this.head) {
			this.head = item
		} else {
			item.next = this.head
			this.head = item
		}

		this.length++
		return item
	}

	pop(): Item {
		if(!this.head) return undefined
		const removed = this.head
		this.head = this.head.next
		this.length--
		return removed
	}
}