/*
## Priority Queue
- Queueとあるが、別にQueueではない。Heapの構造をそのままつかう
- 用途
	- 優先度順につねに並ぶデータ構造
	- 他のデータ構造を作る
- methods
	- insert: O(logN)
		- = push + bubbleUp
		- bubbleUp: O(logN)
	- remove: O(logN) 

*/

class Item {
	constructor(
		public priority: number,
		public value: any
	) {}
}


/*
# 疲れているときのPriorityQueue
# max/minがO(1)でとれさえすればいいと考えたときのそれ。

class PriorityQueue {
	public data = []
	enqueue(value, priority) {
		this.data.push({value, priority})
		this.sort()
	}
	dequeue() {
		return this.data.shift()
	}
	sort(){
		// logNではなく、NlogNでbubbleUp, sinkDownしちゃう
		this.values.sort((a, b) => a.priority - b.priority)
	}
}
*/

class PriorityQueue {
	public data: Array<Item> = []

	insert(priority: number, val: any) {
		this.data.push(new Item(priority, val))
		this.bubbleUp()
	}

	bubbleUp() {
		if (this.data.length === 1) return 
		let idx = this.data.length - 1
		let element = this.data[idx]
		while (idx > 0) {
			let parentIdx = Math.floor((idx - 1) / 2)
			let parent = this.data[parentIdx]
			if (element.priority <= parent.priority) break

			this.data[parentIdx] = element
			this.data[idx] = parent
			idx = parentIdx
		}
	}

	extractMax(): Item {
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
				if (left.priority > element.priority) {
					swap = leftIdx
				}
			}
			if (rightIdx < this.data.length) {
				right = this.data[rightIdx]
				if ((swap === null && right.priority > element.priority) || (swap !== null && right.priority > left.priority)) {
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


let pq = new PriorityQueue()
pq.insert(10, 'hoge10')
pq.insert(1, 'hoge1')
pq.insert(100, 'hoge100')
pq.insert(0, 'hoge0')
pq.insert(1000, 'hoge1000')
console.log(pq.data)
console.log(pq.extractMax())
console.log(pq.extractMax())
console.log(pq.extractMax())
console.log(pq.extractMax())
console.log(pq.extractMax())



