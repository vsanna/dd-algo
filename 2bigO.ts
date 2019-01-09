/*
# SEC2 Big O notation
同じ結果を生む実装は何通りもある
どれが一番いいのか。その評価を語る指標が必要

## 「性能の良さ」とは？
- faster ... こちらを基本的にみる
- less memory ... ここも見るけど第二優先。(省メモリスペース)
- readable ... 別次元の評価軸

## fasterを図るには
1. 時間を計測 -> 大変. 環境によってタイムが変わる。
2. counting operations で評価する。演算の数
	- ex
  		- assign
  		- calculate
  		- comparison
	- この計算もそこそこ大変  

```
n * (n + 1) / 2
# count: 3
# => Nがいくつであっても演算回数は定数の3. 時間は変わらない。
# n + 1 (=xとする)
# n * x (=yとする)
# y / 2
```

```
# count: 3N + 2
# 代入: 2
# 加算: 2N
# 比較: N
# => Nが大きくなるほど演算回数が増える = 時間がかかる
let total = 0
for (let i = 1; i <= n; i++) {
  total += i
}
```
*/

import measure from './measure'

// 遅い
// time: 
// 	 10000 -> 0.078125ms
// 	100000 -> 0.5888671875ms
// 1000000 -> 4.320068359375ms
const addUpTo1 = (n) => {
	let total = 0
	for (let i = 0; i <= n; i++) {
		total += i
	}
	return total
}
measure(addUpTo1)


// 早い
// time: 
// 	 10000 -> 0.0048828125ms
// 	100000 -> 0.0068359375ms
// 1000000 -> 0.006103515625ms
const addUpTo2 = (n) => {
	return n * (n + 1) / 2
}
measure(addUpTo2)

/*
## O notation
ざっくり計算の回数を計算する

- example
	- addUpto2 => always 3 operations => O(1)
		- 3opsだろうがO(1)
	- addUpTo1 => always multiple of n => O(n)
		- nのfor loopが直列に100個あっても O(n). not O(100n)
- 表記 
	- O(500)           => O(1)
	- O(10n)           => O(n)
	- O(n + 10)        => O(n)
	- O(10000n + 40)   => O(n)
	- O(n^2 + 5n + 10) => O(n^2)
- shorthand
	- 算数計算 -> constant
	- 代入 -> constant
	- 要素取得(by idx, by key) => constant
	- loop -> loop入れ子の数


*/

const oConst = n => n + 1
const oLinear = n => {
	let result = 0
	for (let i = 0; i < n; i++) {
		result += i
	}
	return result
}

const oSquare = n => {
	let result = 0
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			result += i + j
		}
	}
	return result
}

let measureOptions = { scales: [0, 1, 2, 3, 4] }
measure(oConst, measureOptions)
measure(oLinear, measureOptions)
measure(oSquare, measureOptions)


// これは => O(n)
const logAtLeast5 = (n) => {
	for (let i = 1; i < Math.max(n, 5); i++) {
	}
}
measure(logAtLeast5)

// これは => O(1)
const logAtMost5 = (n) => {
	for (let i = 1; i < Math.min(n, 5); i++) {
	}
}
measure(logAtMost5)


/*
## space complexity
- これまでがtime complexityであるならば、メモリの容量を分析する上でもO-notationは使える
- auxiliary space: 補助空間
	- inputsではなく、アルゴリズムが必要とする空間
	- space complexityの話をするとき、前提としてauxiliary spaceのことを話している
- most primitive -> constant space
	- string is different. O(n) (by string length)
	- array is O(n) by array length
*/

/*
- auxiliary space
  - total one number
  - i one number

arrの大きさによらず変数の数 ≒ メモリのサイズ固定 O(1)  
 */
const sum = (arr) => {
	let total = 0
	for (let i = 0; i < arr.length; i++) {
		total += arr[i]
	}
	return total
}

/*
arrの長さにによってnewArrの長さが変わる
つまり、O(n)
*/
const double = (arr) => {
	let newArr = []
	for (let i = 0; i < arr.length; i++) {
		newArr.push(2 * arr[i])
	}
	return newArr
}

/*
## Logarithms:log(n)のこと
- log2(8) == 3
	- log2(value) == exponent -> 2^exponent == value
- log(2n) == log(2) + log(n) == 1 + log(n)
- log(10n) == log(10) + log(n) == 3 + log(n)
- log(n*n) == 2 * log(n)
- baseを2としたとき、log(n)は以下のように考えることができる
	- 「nが二乗になってようやく計算量が2倍になる」
	- 「nが10倍になっても計算量は」
*/