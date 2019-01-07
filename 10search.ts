export function measureSearch(func) {
  console.log(`start==========`);
  let t0 = Number(new Date());
  console.log(`result: ${func()}`);
  let t1 = Number(new Date());

  console.log(t0, t1);

  let score = t1 - t0;

  let result: string = `${func.name} score: ${score}`;
  console.log(result);
}

/*
# SEC10 Search
- objective
	- descrive what a searching algorithm
	- implement linear search on array
	- implement binary search on sorted array
	- implement native strinng searching algorithm
	- implement the KMP string searching algorithm
*/

let usernames = [
  "tommy",
  "monkeygurl",
  "dinesh123",
  "dinesh1234",
  "patrick33",
  "cats4hoge",
  "i_hate_cats",
  "timothy",
  "tom",
  "tommy1"
];
// どう探しているのか
console.log(usernames.indexOf("i_hate_cats"));

/*
## Linear Search
- 先頭から1コずつ取り出して確認する
- js builtin関数
	- linear search系
		- indexOf
		- includes
		- find
		- findIndex
- 計算量
	- Avg: O(N/2 = N)
	- Best: O(1) ... たまたま先頭にいた
	- Worst: O(N) ... 最後だった
*/

/*
## Binary search
- ソート済み配列に対して半々に見ていく
- component
	- sorted array
	- value
	- min_pointer
	- max_pointer
	- current_pointer
- 計算量O(logN) - O(N)
- current_pointerの値が小さい場合はmin_pointerをcurrent_pointerに更新し、current_pointerをminとmaxの中央に更新する
- valueが見つかるまで繰り返す
- bigO
	- worst, average: O(logN) ... これはBinaryTreeでいう枝の深さ
	- best: O(1)
*/

let sorted_arr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23
];

function indexOf(arr, val) {
  const initial_current_pointer =
    arr.length % 2 === 0 ? arr.length / 2 : (arr.length - 1) / 2;

  function helper(current_pointer, min_pointer, max_pointer) {
    console.log(current_pointer, min_pointer, max_pointer);
    let current_val = arr[current_pointer];
    if (current_val === val) return current_pointer;

    if (current_val < val) {
      min_pointer = current_pointer;
    } else {
      max_pointer = current_pointer;
    }

    if (min_pointer === max_pointer) return -1;
    current_pointer = Math.floor((max_pointer + min_pointer) / 2);
    // if (min_pointer === current_pointer) return -1;

    helper(current_pointer, min_pointer, max_pointer);
  }

  return helper(initial_current_pointer, 0, arr.length - 1);
}

console.table(
  indexOf(sorted_arr, 0),
  indexOf(sorted_arr, 1),
  indexOf(sorted_arr, 10),
  indexOf(sorted_arr, 11),
  indexOf(sorted_arr, 13),
  indexOf(sorted_arr, 23),
  indexOf(sorted_arr, 24)
);

measureSearch(() => sorted_arr.indexOf(23));
measureSearch(() => indexOf(sorted_arr, 23));

/*
## Naive String Search

*/
