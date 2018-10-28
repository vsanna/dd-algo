// sameFrequency
function sameFrequency(a, b) {
    var a_str = String(a);
    var b_str = String(b);
    if (a_str.length !== b_str.length)
        return false;
    var freq_a = {};
    for (var _i = 0, a_str_1 = a_str; _i < a_str_1.length; _i++) {
        var char = a_str_1[_i];
        freq_a[char] = (freq_a[char] || 0) + 1;
    }
    for (var _a = 0, b_str_1 = b_str; _a < b_str_1.length; _a++) {
        var char = b_str_1[_a];
        if (!freq_a[char])
            return false;
        freq_a[char]--;
    }
    return true;
}
// areThereDuplicates
areThereDuplicates(1, 2, 3); // false
areThereDuplicates(1, 2, 2); // true 
areThereDuplicates('a', 'b', 'c', 'a'); // true
function areThereDuplicates() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 0)
        return;
    var freq = {};
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var val = args_1[_a];
        console.log(val, freq[val]);
        if (freq[val])
            return true;
        freq[val] = 1;
    }
    console.log(freq);
    return false;
}
console.table([
    areThereDuplicates(1, 2, 3),
    areThereDuplicates(1, 2, 2),
    areThereDuplicates('a', 'b', 'c', 'a'),
    areThereDuplicates(1, 2, 3, '1', '2', '3'),
]);
