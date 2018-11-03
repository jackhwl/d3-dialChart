define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = wowify;
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
    exports.mehify = mehify;
});
