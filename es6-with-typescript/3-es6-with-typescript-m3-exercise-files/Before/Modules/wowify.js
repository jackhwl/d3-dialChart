function wowify() {
    var thatWhichShouldBeWowed = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        thatWhichShouldBeWowed[_i - 0] = arguments[_i];
    }
    thatWhichShouldBeWowed.forEach(function (item, index) {
        thatWhichShouldBeWowed[index] = item + " WOW!!!!";
    });
    return thatWhichShouldBeWowed;
}
function mehify() {
    var thatWhichShouldBeMeh = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        thatWhichShouldBeMeh[_i - 0] = arguments[_i];
    }
    thatWhichShouldBeMeh.forEach(function (item, index) {
        thatWhichShouldBeMeh[index] = item + " meh...";
    });
    return thatWhichShouldBeMeh;
}
