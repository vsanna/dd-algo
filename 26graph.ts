/*
## Graph
- vertex(node)とedgeをもつ
	- treeはgraphのいち特殊系
	- 一つもedgeを持たないvertexは別グラフとして数えるので、vertexが1個の時を覗いて存在しない
- バリエーションがある
	1. direccted / undirected
	2. weighted / unweighted
- 表現の仕方もいくつかあるが、今回はAdjancecyListを使う
	- adjancency    list   / map
		- list: array
			- + メモリ少なくて済む
				- { 'A': ['B', 'C'], 'B': ['C', 'F'] }
			- + 全てのedgeを回るのが早い
			- - 特定のedgeを探すのは遅い		
		- map: dict
			- - メモリをかなり食う
				- { 'A': { 'A': 0, 'B': 1, 'C': 0 }, 'B': ... }
			- - 全てのedgeを回るのが遅い
			- + 特定のedgeを探す音がはやい
	- addVertex:    O(1)   / O(V^2)
	- addEdge:      O(1)   / O(1) 
	- removeVertex: O(V+E) / O(V^2)
	- removeEdge:   O(E)   / O(1)
	- query:        O(V+E) / O(1)
	- Storage:      O(V+E) / O(V^2)
- 探索
	1. DFS
		- recursive
			- **visitedをhashで持つ**. これにより高速に訪問済みチェックが行える
		- iterative
			- **stackを使う**
			- visitedも使う
	2. BFS
		- **queue** を使う
		- visitedも使う 

*/

class Graph {
	public adjacencyList: { [s: string]: Array<string> } = {}

	addVertex(vertex: string){
		if (!this.adjacencyList[vertex]){
			this.adjacencyList[vertex] = []
		}
	}

	// error handlingは一旦考えない
	addEdge(vertex1: string, vertex2: string) {
		this.adjacencyList[vertex1].push(vertex2)
		this.adjacencyList[vertex2].push(vertex1)
	}
	
	removeEdge(vertex1: string, vertex2: string){
		this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => (v !== vertex2))
		this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => (v !== vertex1))
	}

	removeVertex(vertex: string){
		let connected = this.adjacencyList[vertex]
		connected.forEach((v) => {
			this.removeEdge(v, vertex)
		})
		delete this.adjacencyList[vertex]
	}


	recursiveDFS(start: string){
		let result: Array<string> = []
		let visited: { [s: string]: boolean } = {}

		const search = (vertex: string) => {
			visited[vertex] = true
			result.push(vertex)
			this.adjacencyList[vertex].forEach((v) => {
			    if (!visited[v]) search(v)
			})
		}
		search(start)

		return result
	}

	iterativeDFS(start: string){
		let result: Array<string> = []
		let stack: Array<string> = []
		let visited: { [s: string]: boolean } = {}
		stack.push(start)
		while(stack.length > 0) {
			let current = stack.pop()
			if (!visited[current]) {
				visited[current] = true
				result.push(current)
				this.adjacencyList[current].forEach((v) => {
					if (!visited[v]) stack.push(v)
				})
			}
		}

		return result
	}

	BFS(start: string){
		let queue: Array<string> = [start]
		let result: Array<string> = []
		let visited: { [s: string]: boolean } = {}

		while(queue.length > 0) {
			let current = queue.shift()
			result.push(current)
			visited[current] = true
			this.adjacencyList[current].forEach((v) => {
				if (!visited[v]) queue.push(v)
			})
		}

		return result
	}
}


let g = new Graph()
g.addVertex('Tokyo')
g.addVertex('Dallas')
g.addVertex('Aspen')
g.addEdge('Tokyo', 'Dallas')
g.addEdge('Aspen', 'Dallas')
g.addEdge('Aspen', 'Tokyo')
console.log(g.adjacencyList)
g.removeVertex('Tokyo')
console.log(g.adjacencyList)
g.addVertex('HongKong')
g.addEdge('HongKong', 'Dallas')
console.log(g.recursiveDFS('Aspen'))
console.log(g.iterativeDFS('Aspen'))
console.log(g.BFS('Aspen'))