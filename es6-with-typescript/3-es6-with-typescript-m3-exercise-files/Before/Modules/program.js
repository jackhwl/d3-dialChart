define(["require", "exports", "./wowify"], function (require, exports, wowify_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var interestingThings = ['The Sun', 'The Moon', 'The Stars'];
    var result = wowify_1.default.apply(void 0, interestingThings);
    document.getElementById('result').innerHTML = result.join('<br/>');
});
