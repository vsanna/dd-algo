"use strict";
/*
# SEC2 Big O notation
同じ結果を生む実装は何通りもある
どれが一番いいのか。その評価を語る指標が必要

## 良さ
- [ここを見る] faster
- less memory
- readable

## fasterを図るには
1. 時間を計測 -> 大変
2. counting operations
  - assign
  - calculate
  - comparison
- この計算もそこそこ大変

```
# count: 3
n * (n + 1) / 2
```

```
# count:
# n addition
# n comparison
# n calcu...
for (let i = 1; i <= n; i++) {
  total += i
}
```


*/
exports.__esModule = true;
var measure_1 = require("./measure");
var addUpTo1 = function (n) {
    var total = 0;
    for (var i = 0; i <= n; i++) {
        total += i;
    }
    return total;
};
measure_1["default"](addUpTo1);
var addUpTo2 = function (n) {
    return n * (n + 1) / 2;
};
measure_1["default"](addUpTo2);
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
var oConst = function (n) { return n + 1; };
var oLinear = function (n) {
    var result = 0;
    for (var i = 0; i < n; i++) {
        result += i;
    }
    return result;
};
var oSquare = function (n) {
    var result = 0;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            result += i + j;
        }
    }
    return result;
};
var measureOptions = { scales: [0, 1, 2, 3, 4] };
measure_1["default"](oConst, measureOptions);
measure_1["default"](oLinear, measureOptions);
measure_1["default"](oSquare, measureOptions);
// これは => O(n)
var logAtLeast5 = function (n) {
    for (var i = 1; i < Math.max(n, 5); i++) {
    }
};
measure_1["default"](logAtLeast5);
// これは => O(1)
var logAtMost5 = function (n) {
    for (var i = 1; i < Math.min(n, 5); i++) {
    }
};
measure_1["default"](logAtMost5);
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
var sum = function (arr) {
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
};
/*
arrの長さにによってnewArrの長さが変わる
つまり、O(n)
*/
var double = function (arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(2 * arr[i]);
    }
    return newArr;
};
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
