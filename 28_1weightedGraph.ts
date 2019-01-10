/*
## WeightedGraph
- 重み付きグラフ. このあと使うのかな？
- Graphのvertexにweightがついただけ
*/

class WeightedGraph {
	public adjacencyList: { [s: string]: Array<{name: string, weight: number}> } = {}

	addVertex(vertex: string){
		if (!this.adjacencyList[vertex]){
			this.adjacencyList[vertex] = []
		}
	}

	// error handlingは一旦考えない
	addEdge(vertex1: string, vertex2: string, weight: number) {
		this.adjacencyList[vertex1].push({ name: vertex2, weight: weight })
		this.adjacencyList[vertex2].push({ name: vertex1, weight: weight })
	}
	
	removeEdge(vertex1: string, vertex2: string){
		this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => (v.name !== vertex2))
		this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => (v.name !== vertex1))
	}

	removeVertex(vertex: string){
		let connected = this.adjacencyList[vertex]
		connected.forEach((v) => {
			this.removeEdge(v.name, vertex)
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
			    if (!visited[v.name]) search(v.name)
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
					if (!visited[v.name]) stack.push(v.name)
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
				if (!visited[v.name]) queue.push(v.name)
			})
		}

		return result
	}
}


let g = new WeightedGraph()
g.addVertex('Tokyo')
g.addVertex('Dallas')
g.addVertex('Aspen')
g.addEdge('Tokyo', 'Dallas', 10)
g.addEdge('Aspen', 'Dallas', 2)
g.addEdge('Aspen', 'Tokyo', 7)
console.log(g.adjacencyList)
g.removeVertex('Tokyo')
console.log(g.adjacencyList)
g.addVertex('HongKong')
g.addEdge('HongKong', 'Dallas', 32)
console.log(g.recursiveDFS('Aspen'))
console.log(g.iterativeDFS('Aspen'))
console.log(g.BFS('Aspen'))