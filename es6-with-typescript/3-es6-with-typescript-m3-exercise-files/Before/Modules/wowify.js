System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function wowify() {
        var thatWhichShouldBeWowed = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            thatWhichShouldBeWowed[_i] = arguments[_i];
        }
        thatWhichShouldBeWowed.forEach(function (item, index) {
            thatWhichShouldBeWowed[index] = item + " WOW!!!!";
        });
        return thatWhichShouldBeWowed;
    }
    exports_1("default", wowify);
    function mehify() {
        var thatWhichShouldBeMeh = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            thatWhichShouldBeMeh[_i] = arguments[_i];
        }
        thatWhichShouldBeMeh.forEach(function (item, index) {
            thatWhichShouldBeMeh[index] = item + " meh...";
        });
        return thatWhichShouldBeMeh;
    }
    exports_1("mehify", mehify);
    return {
        setters: [],
        execute: function () {
        }
    };
});
