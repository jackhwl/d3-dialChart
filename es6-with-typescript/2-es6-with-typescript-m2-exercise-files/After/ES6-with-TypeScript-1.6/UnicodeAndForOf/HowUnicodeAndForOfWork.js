var HowUnicodeAndForOfWork;
(function (HowUnicodeAndForOfWork) {
    var names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Elvis', 'Fran', 'George', 'Hope'];
    names.forEach(function (item) {
        console.log(item);
    });
    for (var item in names) {
        console.log(names[item]);
    }
    for (var _i = 0; _i < names.length; _i++) {
        var item = names[_i];
        console.log(item);
    }
    var instrument = "🎸";
    for (var i = 0; i < instrument.length; i += 1) {
        console.log(instrument[i]);
    }
    for (var _a = 0; _a < instrument.length; _a++) {
        var item = instrument[_a];
        console.log(item);
    }
})(HowUnicodeAndForOfWork || (HowUnicodeAndForOfWork = {}));
