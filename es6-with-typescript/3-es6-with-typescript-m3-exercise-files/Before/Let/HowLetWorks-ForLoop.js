System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function printNumbers(max) {
        for (var i = 1; i <= max; i++) {
            console.log(i);
        }
    }
    return {
        setters: [],
        execute: function () {
            printNumbers(2);
            exports_1("default", "ForLoop");
        }
    };
});
