/*
# SEC7 Recursion
- objective
    - understand recursion
    - understand tow essential components of recursive function
    - visualize call stack
    - use helper method recursion

## what is recursion
- a process that calls itself
- where
    - JSON.parse, JSON.stringify
    - document.getElementById, DOM traversal algorithms

## call stack
- it's a stack data structure
- anytime a func is invoked it is placed(push)
- when js sees the return, the compiler will remove(pop)
- recursiveだとcallstackにfuncを積み続けることになる. その点に注意
 
*/
function takeShower() {
    return 'shower';
}
function eatBreakfast() {
    var meal = cookFood();
    return "eatinng " + meal;
}
function cookFood() {
    var items = ['hoge', 'geho', 'ga'];
    return items[Math.floor(Math.random() * items.length)];
}
function wakeUp() {
    takeShower();
    eatBreakfast();
    console.log('ok ready to go to work');
}
wakeUp();
/*
- Basee Case
    - the condition when the recursion end
- two essential parts of recursive func
    1. Base Case
    2. Different Input
*/
function countDown(num) {
    // Base case
    if (num <= 0) {
        console.log('done!');
        return;
    }
    console.log(num);
    // Different Input
    num--;
    countDown(num);
}
countDown(5);
// sumRange
// callstackをみるとべらぼうにstackが積まれる
function sumRange(num) {
    if (num === 1)
        return 1;
    return num + sumRange(num - 1);
}
console.log(sumRange(100));
// function sumRange(num: number): number {
// 	return (num + 1) * num / 2
// }
// fractorial
function fractorial(num) {
    var total = 1;
    for (var i = num; i > 0; i--) {
        total *= i;
    }
    return total;
}
console.log(fractorial(5));
function fractorialRecursive(num) {
    if (num === 1)
        return 1;
    return num * fractorialRecursive(num - 1);
}
console.log(fractorialRecursive(10));
/*
- wrong case
    1. No base case
    2. forget to return or returnn the wrong thing
    2. too many stacks over Maximum call stack size
        - Chrome: 10402
*/
/*
- helper method recursion
    - outerがmemo変数(この場合result)を持ち、ロジックをhelperに寄せる
    - 別にmemo変数をパスして回せばいいんじゃと思ったりもするけど黙っておく
 */
function collectOddValues(arr) {
    var result = [];
    function helper(helperInput) {
        if (helperInput.length === 0)
            return;
        if (helperInput[0] % 2 === 0) {
            result.push(helperInput[0]);
        }
        helper(helperInput.slice(1));
    }
    helper(arr);
    return result;
}
console.log(collectOddValues([2, 3, 4, 5, 6, 7]));
