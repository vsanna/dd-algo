/*
## Binary Heap
- HeapはTreeの一つ。parent/childの構成で、parent/childrenの関係が特殊
	- BSTとの違いは、
		- parent > childrenであること (MaxBinaryHeapの場合)
		- leaf以外は常に必ずchildrenをもつ。つまり枝が部分刈り込まれて歪むことはない
	- BSTは left < parent < right
	- MaxBinaryHeapとMinBinaryHeapはほぼ実装同じ
	- right, left間の関係は特にない
	- **Treeではなく、Arrayを使う**
		- [x] これだけの話なのか質問中 -> これだけのはなし。treeは部分枝が切れることを許容するが、heapは許容しない。許容しないゆえにarrayが詰まって使えるので有効的にメモリを使える
		- parent: nとしたとき、childrenは2n+1と2n+2に位置する
	- [x] 同じ値は持てない？
		- valueをqueueにしておけばいいと気づいた
- methods
	- insert: O(logN)
		- push + bubbleUp
	- remove(rootのみ): O(logN)
		- shift + pop + sinkDown
	- search: O(N)
		- searchは得意ではない
- 用途
	- 最大値/最小値の取得, sortに特化している
	- PriorityQueueに使われる
	- Graph Traversalに使われる
- methods
	- get(min/max): O(1)
	- insert: O(logN)
		- = push + bubbleUp
		- bubbleUp: O(logN)
	- remove: O(logN) 

*/

class MaxBinaryHeap {
	public data: Array<number> = []

	insert(val: number) {
		this.data.push(val)
		this.bubbleUp()
	}

	bubbleUp() {
		if (this.data.length === 1) return 
		let idx = this.data.length - 1
		let element = this.data[idx]
		while (idx > 0) {
			let parentIdx = Math.floor((idx - 1) / 2)
			let parent = this.data[parentIdx]
			if (element <= parent) break

			this.data[parentIdx] = element
			this.data[idx] = parent
			idx = parentIdx
		}
	}

	extractMax(): number {
		if (this.data.length === 0) return undefined
		const root = this.data.shift()
		const tail = this.data.pop()
		this.data.unshift(tail)
		this.sinkDown()
		return root
	}

	sinkDown() {
		// if (this.data.length < 2) return
		let idx = 0
		while(true) {
			let leftIdx = 2 * idx + 1
			let rightIdx = 2 * idx + 2
			let left, right
			let swap = null
			let element = this.data[idx]

			if (leftIdx < this.data.length) {
				left = this.data[leftIdx]
				if (left > element) {
					swap = leftIdx
				}
			}
			if (rightIdx < this.data.length) {
				right = this.data[rightIdx]
				if ((swap === null && right > element) || (swap !== null && right > left)) {
					swap = rightIdx
				}
			}

			// console.log(leftIdx, rightIdx, left, right, swap)

			if (swap === null) break
			this.data[idx] = this.data[swap]
			this.data[swap] = element
			idx = swap
		}
	}
}


let heap = new MaxBinaryHeap()
heap.insert(10)
heap.insert(2)
heap.insert(13)
heap.insert(14)
heap.insert(21)
heap.insert(143)
heap.insert(7)
console.log(heap.data)
console.log(heap.extractMax())
console.log(heap.extractMax())
console.log(heap.extractMax())
console.log(heap.extractMax())
console.log(heap.extractMax())



