System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function favoriteFood(name) {
        if (name === "Amy") {
            var fav = "pizza";
        }
        else {
            var fav = "uncertain";
        }
        return fav;
    }
    return {
        setters: [],
        execute: function () {
            exports_1("default", "BlockScope");
        }
    };
});
