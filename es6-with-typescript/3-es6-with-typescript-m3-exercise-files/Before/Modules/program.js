define(["require", "exports", "./wowify", "jquery"], function (require, exports, wowify_1, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var interestingThings = ['The Sun', 'The Moon', 'The Stars'];
    var result = wowify_1.default.apply(void 0, interestingThings);
    $('#result').html(result.join('<br/>'));
});
