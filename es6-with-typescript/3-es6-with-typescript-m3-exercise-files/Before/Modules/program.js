(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./wowify", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wowify_1 = require("./wowify");
    var $ = require("jquery");
    var interestingThings = ['The Sun', 'The Moon', 'The Stars'];
    var result = wowify_1.default.apply(void 0, interestingThings);
    $('#result').html(result.join(' <br/>'));
});
