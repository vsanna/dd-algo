/*
## Hash table
- 人間のreadabilityとコンピューターのreadabilityを兼ね備えるべく、辞書型として作られた
	- 通常は言語組込のを使えばいい
- デメリット
	- メモリスペースをかなり取る
		- スペースを余分にとっていいArrayであればinsert/removeもO(1)になるのでなんだか公平な比較ではない気がする...
	- arrayがいっぱいになって作り直すときにO(N)かかる
- methods
	- get: O(1)
		- access/insert/removeがO(1)
		- [x] なぜarrayよりも高い?
			- hash関数が優秀であれば、基本的に衝突がない前提で考えてよい。その場合Arrayのアクセスと等価になるので、アクセスはO(1)
			- arrayのinsert/removeはO(N). なぜならば空きを詰めるべくAraryのshiftが起こるから。空きを詰める作業にO(N)かかる
			- hashのinsert/removeはshiftがおこるが、arrayの長さが1と想定されるのでO(1)
	- set: O(1)
	- keys: O(N)
	- values: O(N)

## hash関数
- 備える性質
	1. fast(定数速度)
	2. 同じinputに対しては常に同じoutput
	3. randam...衝突が極力起こりにくい
		- 数学的に説明が高度になるが、素数を配列のサイズや値の算出に用いると衝突が起こりにくくなるとのこと
- 衝突した場合の対処(collision handling) ... たくさんある
	1. separate chaining
		- 配列の各要素を更に配列の入れ子にする
		- [x] その後はO(N)でkeyを線形に探すのか？ => Yes
	2. linear probing
		- 衝突したらその一個隣のセルをみて、空ならそこにいれる。からでなければさらに隣をみる
		- [ ] 配列の末尾に達したらどうする？ => これで実装しなかった
*/

// 一旦keyは文字列だけにするが、本質的に他でも変わらない
function hashString(key: string, arrLength: number): number {
	let total = 0;
	// 素数を使うとなぜか分散度合いがたかまるとのこと
	let WEIRD_PRIME = 31;
	for (let i = 0; i < Math.min(key.length, 100); i++) {
	  let char = key[i];
	  let value = char.charCodeAt(0) - 96
	  total = (total * WEIRD_PRIME + value) % arrLength;
	}
	return total;
}

class Hash {
	// arrayの長さも素数にする
	public data: Array<any> = new Array(5)

	private hash(key: string): number {
		return hashString(key, this.data.length)
	} 

	set(key: string, value: any) {
		const idx = this.hash(key)
		if (!this.data[idx]) {
			this.data[idx] = [[key, value]]
			return
		} else {
			for(let i = 0; i < this.data[idx].length; i++) {
				if (this.data[idx][i][0] === key) {
					this.data[idx][i][1] = value
					return
				}
			}
			this.data[idx].push([key, value])
		}
	}

	get(key: string): any {
		const idx = this.hash(key)
		if (!this.data[idx]) return undefined
		
		for(let i = 0; i < this.data[idx].length; i++) {
			if (this.data[idx][i][0] === key) return this.data[idx][i][1]
		}
	}

	keys(): Array<string> {
		const arr = []
		for(let i = 0; i < this.data.length; i++) {
			if (this.data[i]) {
				for(let j = 0; j < this.data[i].length; j++) {
					arr.push(this.data[i][j][0])
				}
			}
		}
		return arr
	}

	values(): Array<any> {
		const arr = []
		for(let i = 0; i < this.data.length; i++) {
			if (!!this.data[i]) {
				for(let j = 0; j < this.data[i].length; j++) {
					arr.push(this.data[i][j][1])
				}
			}
		}
		return arr
	}
}

let hash = new Hash()
hash.set('hoge', 100)
hash.set('geho', 101)
hash.set('gaho', 102)
hash.set('ggga', 103)
hash.set('gfga', 104)
hash.set('gfda', 105)
hash.set('gdfa', 106)
console.log(hash.data)
// console.log(hash.get('ggga'))
// console.log(hash.get('gfga'))
// console.log(hash.get('gfda'))
// console.log(hash.get('gdfa'))
console.log(hash.keys())
console.log(hash.values())