"use strict";
exports.__esModule = true;
var measure_1 = require("./measure");
/*
# SEC3 performance of array, object

## O of object: unordered list
- insertion = O(1)
- removal   = O(1)
- searching = O(n)
- access    = O(1)
    - なぜ? accessにsearchっていらないの？


## O of Object methods
- Object.keys			= O(n)
- Object.values  		= O(n)
- Object.entries		= O(n)
- Object#hasOwnProperty = O(1)
    - なぜ?
*/
var instructor = {
    firstName: 'tom',
    isInstructor: true,
    favoriteNums: [1, 2, 3, 4]
};
console.log(instructor.hasOwnProperty('firstName'));
/*
## O of array: ordered lists
- when
    - need order
    - fast access
- insertion = it depends on...
    - 先頭に追加すると、re-indexが必要. そのサイズ分操作が発生する
- removal   = it depends on...
- searching = O(n)
- access    = O(1)

- methods
    - push    = O(1)
    - pop	  = O(1)
    - shift   = O(n) ? re-index
    - unshift = O(n) ? re-index
    - concat  = O(n) ? re-index
    - slice   = O(n) ? search
    - splice  = O(n) ? search
    - sort    = O(n * log(n)) ?
    - foreach = O(n) ? for-loop
*/
var addLast = function (n) {
    var arr = new Array(n);
    arr.push(10);
};
var addHead = function (n) {
    var arr = new Array(n);
    arr.unshift(10);
};
var options = {}; //{ scales: [8, 9] }
measure_1["default"](addLast, options);
measure_1["default"](addHead, options);
