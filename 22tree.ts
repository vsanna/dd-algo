/*
## Tree
- parent/child で構成するデータ構造
	- Root: 頂点のnode
	- Parent: 直上のnode
	- Children: 直下のnode
	- Sibling: 同じ親のnode
	- Leaf: 子のいないnode
	- Edge: node間の線のこと
- listとの比較
	- list: Linear
		- SLLは特殊なtreeのケースとも言える
	- tree: nonlinear
		- その分たどり方が独特になる
- いろいろな種類がある
	- binary tree
		- binary searc tree

		
## Binary Search Tree
- 用途
	- 挿入と検索に強い. 
- binary: childrenの数が0, 1, 2 のどれか
- binary search: かつ常に left < parent < right の関係が保たれている
- method
	- insert: O(logN) 
	- find: O(logN)
		- contains: O(logN)
	- BFS(breadth first search): 
	- DFS(depth first search):
- ただし、treeの形がいびつである枝がひたすら伸びている場合はO(N)になる
	- (再掲)Arrayはtreeのいち特殊例

## Tree Traversal
- treeに存在する全てのnodeを探索したい。その方法を考える
- 用途
	- BFS: 
		- 深さ > 幅 のとき、無駄なnodeを辿らずに済む
		- ex. ほぼarrayのようなツリー
	- DFS: 
		- 深さ < 幅 のとき、無駄なnodeを辿らずに済む
		- ex. きれいなbinaryツリー, trinary, quaternary, quinary, senary...
		- InOrder
			- BSTと併用されることが多い
		- PreOrder
			- この順にtreeに入れ直せば同じtreeを再現できるのでexportによく使われる
		- PostOrder
			- ??? いつ使うねん
- 方法
	1. Breadth First Search
		- 横に見ていく。 -> 後のHeap to Arrayはこの流れ
	2. Depth First Search: 実装はほぼ同じ。
		- InOrder
			- 小さい順(大きい順)に見ていく
			- treeをsort済みarrayにする際に使うのかな
		- PreOrder
			- 上から見ていく
		- PostOrder
			- 下から見ていく
- Breadth First Search
	- iterativeに書く: **Queue** を使う
		- push / shiftのarray
	- recursiveに書く: queueなくてもいい
- Depth First Search: PreOrder
	- 上から入れていく
- Depth First Search: PostOrder
- Depth First Search: InOrder
*/

class Item {
	public left: Item
	public right: Item
	constructor(
		public value: any
	){}
}

class BinarySearchTree {
	public root: Item
	constructor() {}

	insert<T>(val: T): this {
		const newItem = new Item(val)
		if (!this.root) {
			this.root = newItem
			return this 
		}

		let current = this.root
		while(true) {
			if (current.value > newItem.value) {
				if (!current.left) {
					current.left = newItem
					return this 
				} else {
					current = current.left
				}
			} else if (current.value < newItem.value) {
				if (!current.right) {
					current.right = newItem
					return this 
				} else {
					current = current.right
				}
			} else {
				return undefined
			}
		}
	}

	find<T>(value: T): Item {
		if (!this.root) return undefined
		let current = this.root
		while(current) {
			if (current.value < value) {
				current = current.right
			} else if (current.value > value) {
				current = current.left
			} else {
				return current
			}
		}

		return undefined
	}

	contains<T>(value: T): boolean {
		return !!this.find(value)
	}

	BFS(): Array<number> {
		if (!this.root) return []

		let queue = [] 
		queue.push(this.root)
		let result = []

		while(queue.length > 0) {
			let current = queue.shift()
			result.push(current.value)
			if (current.left) queue.push(current.left)
			if (current.right) queue.push(current.right)
		}

		return result
	}

	preOrderDFS(): Array<number> {
		if (!this.root) return []
		let result = []
		// depthはdebug用
		function preOrder(item: Item, depth: number) {
			result.push(item.value)
			if (item.left) {
				preOrder(item.left, depth + 1)
			}
			if (item.right) {
				preOrder(item.right, depth + 1)
			}
		}
		preOrder(this.root, 0)

		return result
	}

	postOrderDFS(): Array<number> {
		if (!this.root) return []
		let result = []
		// depthはdebug用
		function porstOrder(item: Item, depth: number) {
			if (item.left) {
				porstOrder(item.left, depth + 1)
			}
			if (item.right) {
				porstOrder(item.right, depth + 1)
			}
			result.push(item.value)
		}
		porstOrder(this.root, 0)

		return result
	}

	inOrderDFS(): Array<number> {
		if (!this.root) return []
		let result = []
		// depthはdebug用
		function inOrder(item: Item, depth: number) {
			if (item.left) {
				inOrder(item.left, depth + 1)
			}
			result.push(item.value)
			if (item.right) {
				inOrder(item.right, depth + 1)
			}
		}
		inOrder(this.root, 0)

		return result
	}
}

let tree = new BinarySearchTree()
tree.root = new Item(10)
tree.root.right = new Item(15)
tree.root.left = new Item(7)
tree.root.right.right = new Item(18)
tree.root.right.left = new Item(12)


tree.insert(11)
tree.insert(13)
tree.insert(21)
tree.insert(3)
console.log(tree)

/*
		 10
	 7         15
  3	        12       18
		 11    13       21
		 			
*/

console.log('BFS', tree.BFS())
console.log('preOrderDFS', tree.preOrderDFS())
console.log('postOrderDFS', tree.postOrderDFS())
console.log('inOrderDFS', tree.inOrderDFS())