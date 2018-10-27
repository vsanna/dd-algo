"use strict";
exports.__esModule = true;
var perf_hooks_1 = require("perf_hooks");
var defaultOptions = {
    withRate: true
};
var measure = function (func, options) {
    if (options === void 0) { options = defaultOptions; }
    var _options = Object.assign({}, defaultOptions, options);
    var scales = _options.scales || [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var ns = scales.map(function (n) { return Math.pow(10, n); });
    var label = _options.label || func.name;
    var current = 0.0;
    ns.forEach(function (n, idx) {
        var t0 = perf_hooks_1.performance.now();
        func(n);
        var t1 = perf_hooks_1.performance.now();
        var score = t1 - t0;
        var rate = current === 0 ? '-' : 'x ' + (score / current).toFixed(3);
        console.log(buildMsg(label, n, score, options.withRate ? rate : null));
        current = score;
    });
};
var buildMsg = function (label, n, score, rate) {
    var msg = "label: " + label + ":" + ("          " + String(n)).slice(-10) + " ";
    if (score)
        msg += "time: " + ("000" + score.toFixed(5)).slice(-10) + " milliseconds ";
    if (rate)
        msg += "rate: " + rate;
    return msg;
};
exports["default"] = measure;
