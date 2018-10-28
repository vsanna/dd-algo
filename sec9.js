function reverse(str) {
    // return str.split('').reverse().join('')
    var result = '';
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        result = char + result;
    }
    return result;
}
function isPalindrome(str) {
    var arr = str.split('');
    function helper(arr) {
        if (arr.length <= 1)
            return true;
        var first = arr.shift();
        var last = arr.pop();
        console.log(arr, first, last);
        if (first === last) {
            return helper(arr);
        }
        else {
            return false;
        }
    }
    return helper(arr);
}
console.table([
    isPalindrome('awesome'),
    isPalindrome('foobar'),
    isPalindrome('tacocat'),
    isPalindrome('amanaplanacanalpanama'),
    isPalindrome('amanaplanacanalpandemonium'),
]);
function someRecursive(arr, func) {
    // これで正解
    // return arr.some(func)
    // recursiveにかく
    if (arr.length === 0)
        return false;
    return func(arr[0]) || someRecursive(arr.slice(1), func);
}
var isOdd = function (val) { return val % 2 !== 0; };
console.table([
    someRecursive([1, 2, 3, 4], isOdd),
    someRecursive([4, 6, 8, 9], isOdd),
    someRecursive([4, 6, 8], isOdd),
    someRecursive([4, 6, 8], function (val) { return val > 10; }),
]);
function flatten(arr) {
    var result = [];
    function helper(input) {
        if (input.length === 0)
            return;
        var item = input.shift();
        if (item instanceof Array) {
            helper(item);
        }
        else {
            result.push(item);
        }
        helper(input);
    }
    helper(arr);
    return result;
}
console.table([
    flatten([1, 2, 3, [4, 5]]),
    flatten([1, [2, [3, 4], [[5]]]]),
    flatten([[1], [2], [3]]),
    flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]),
]);
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function capitalizeFirst(arr) {
    if (arr.length !== 1) {
        return [capitalize(arr[0])].concat(capitalizeFirst(arr.slice(1)));
    }
    else {
        return [capitalize(arr[0])];
    }
}
console.table([
    capitalizeFirst(['car', 'taco', 'banana']) // ['Car','Taco','Banana']
]);
function isNumber(item) {
    return (typeof item === 'number') || (typeof item === 'object' && item.constructor === Number);
}
function nestedEvenSum(obj) {
    var result = 0;
    for (var key in obj) {
        var value = obj[key];
        if (isNumber(value) && value % 2 === 0) {
            result += value;
        }
        else if (value instanceof Object) {
            result += nestedEvenSum(value);
        }
    }
    return result;
}
var obj1 = {
    outer: 2,
    obj: {
        inner: 2,
        otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: "yup"
        }
    }
};
var obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: 'car' }
};
console.table([
    nestedEvenSum(obj1),
    nestedEvenSum(obj2),
]);
function capitalizeWords(arr) {
    // これでも正解
    // return arr.map(word => word.toUpperCase())
    // recursive
    if (arr.length === 1) {
        return [arr[0].toUpperCase()];
    }
    else {
        return [arr[0].toUpperCase()].concat(capitalizeWords(arr.slice(1)));
    }
}
function stringifyNumbers(obj) {
    var result = {};
    Object.keys(obj).forEach(function (key, idx) {
        var value = obj[key];
        if (isNumber(value)) {
            result[key] = String(value);
        }
        else if (value !== undefined && value.toString() === '[object Object]') {
            result[key] = stringifyNumbers(obj[key]);
        }
        else {
            result[key] = value;
        }
    });
    return result;
}
var obj2 = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
};
console.log(stringifyNumbers(obj2));
function collectStrings(obj) {
    var result = [];
    function helper(input) {
        if (input.length === 0)
            return;
        Object.values(input).forEach(function (val, idx) {
            if (typeof val === 'string') {
                result.push(val);
            }
            else if (val !== undefined && val.toString() === '[object Object]') {
                helper(val);
            }
        });
    }
    helper(obj);
    return result;
}
