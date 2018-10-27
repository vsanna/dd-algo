"use strict";
exports.__esModule = true;
/*
# SEC4 Algorithm
- algoritym = process or set of steps **to accomplish a task**
- how to improvee?
    1. devise a plan for solving problems
    2. master common problem solving
- **problem solving**
    1. understand               = explain other words
    2. explore concrete example = list examples from variaus views
    3. break it down            = explain steps by natural language
    4. solve/simplify			= write code
    5. look back and refactor   = write test & rafactor

## understand problem
- way
    1. can i restate the problem in my own words?
    2. what are the inputs that go into the problem?
    3. what are the outputs that should come from the solution to the problem?
    4. can the outputs be determined from the inputs?
        - in other words, do I have enough info to solve the problem?
        -
    5. how should i label the important pieces of data that are a part of the problems?
- example
    1. implement addition
    2. ints? floats? string for large numbers?
        - jsでは大きすぎるintを扱えない
    3. int ? float? string?
    4.
    5. num1, num2, result

## explore concrete examples
- way
    1. start with simple examples
    2. pregress to more complex examples
    3. explore examples with empty inputs
    4. explore examples with invalid inputs
- example: write a func which takes in a string and returns counts of char in the string

*/
charCount("aaaa"); // {a: 4}
charCount("my phone number is 123"); // spaceをかぞえなきゃ
charCount("Hello hi"); // Hとhは分けて考えなきゃ
charCount(""); // emptyなら error or {}(blank) ?
charCount(123); // numberが渡ってきたら?
/*
## break it down
- 手順を自然言語でステップごとに表現する
- example: 同じもの
*/
function charCount(str) {
    // make object to return at end
    // loop over string, for each charcter...
    // if the char is a number/letter AND a key in object, add 1 to count
    // if the char is a number/letter AND not in object, ....
    // if char is something else(space, period, etc) don't do anything
    // returns an object with keys that are ....
    return charCountImpl(str);
}
/*
## Solve the problem (or Solve a simpler problem)
- simplify: way
    1. find the core difficulty
    2. temporarily ignore that difficulty
    3. write a simplified solution
    4. then incorporate(盛り込む) that difficulty back in
*/
function charCountImpl(str) {
    // make object to return at end
    var result = {};
    // loop over string, for each charcter...
    for (var i = 0; i < str.length; i++) {
        var char = str[i].toLowerCase();
        // if the char is a number/letter AND a key in object, add 1 to count
        if (result[char] > 0) {
            result[char]++;
        }
        // if the char is a number/letter AND not in object, ....
        else {
            result[char] = 1;
        }
        // if char is something else(space, period, etc) don't do anything
    }
    // returns an object with keys that are ....
    return result;
}
/*
## Look back & Refactor
- way
    - can you check the result?
    - can you derive the result differently?
    - can you understand it at a glance?
    - can you use the result or method for some other problem?
    - can you improve the performance of your solution?
    - can you think of other ways to refactor?
    - how have other people solved this problem?
*/
function charCountImpl2(str) {
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var char = str[i].toLowerCase();
        if (/[a-z0-9]/.test(char)) {
            if (result[char] > 0) {
                result[char]++;
            }
            else {
                result[char] = 1;
            }
        }
    }
    return result;
}
function charCountImpl3(str) {
    var result = {};
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        char = char.toLowerCase();
        if (/[a-z0-9]/.test(char)) {
            result[char] = ++result[char] || 1;
        }
    }
    return result;
}
console.log(charCountImpl3('hello Hi hogehoge 123123123'));
function isAlphaNumeric(char) {
    var code = char.charCodeAt(0);
    if (!(code > 47 && code < 58) && // numeric
        !(code > 64 && code < 91) && // upper alpha
        !(code > 96 && code < 123)) { // lower alpha
        return false;
    }
    return true;
}
function charCountImpl4(str) {
    var result = {};
    for (var _i = 0, str_2 = str; _i < str_2.length; _i++) {
        var char = str_2[_i];
        if (isAlphaNumeric(char)) {
            result[char] = ++result[char] || 1;
        }
    }
    return result;
}
console.log(charCountImpl4('hello Hi hogehoge 123123123'));
