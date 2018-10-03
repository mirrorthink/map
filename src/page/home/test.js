(function(modules) {
    function __webpack_require__(moduleId) {
        var module = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );
        return module.exports;
    }

    return __webpack_require__(0);
})([
    function(module, __webpack_exports__, __webpack_require__) {
        // 引用 模块 1
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__c__ = __webpack_require__(1);
        /* harmony default export */
        __webpack_exports__["default"] = "a.js";
        console.log(__WEBPACK_IMPORTED_MODULE_0__c__["a" /* default */ ]);
    },
    function(module, __webpack_exports__, __webpack_require__) {
        // 输出本模块的数据
        "use strict";
        /* harmony default export */
        __webpack_exports__["a"] = 333;
    }
]);
var fun = function(line) {
    var lines = line.split(",");
    lines.map(item => {
        if (item.indexOf("-")) {
            return item.split("-");
        }
    });
    lines.sort((a, b) => {
        if (Array.isArray(a)) {
            a = a[0];
        }
        if (Array.isArray(b)) {
            b = b[0];
        }
        return a - b;
    });
    var pre1, pre2, next1, next2;
    if (Array.isArray(lines[0])) {
        pre1 = lines[0][0];
        pre2 = lines[0][1];
    } else {
        pre1 = lines[0];
        pre2 = lines[0];
    }

    for (let i = 1, len = lines.length; i++; i < len) {
        // if(lines[i])
        if (Array.isArray(lines[i])) {
            next1 = lines[i][0];
            next2 = lines[i][0];
        } else {
            next1 = lines[i];
            next1 = lines[i];
        }
        if (parseInt(pre1) >= parseIn(next1) - 1) {
            var big = parseInt(next2) >= parseInt(pre2) ? next2 : pre2;
            lines.splice(i - 1, 2, [pre1, big]);
        }
    }

    print(lines);
};