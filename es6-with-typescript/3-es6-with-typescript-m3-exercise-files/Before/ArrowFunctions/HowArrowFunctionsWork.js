var HowArrowFunctionsWork;
(function (HowArrowFunctionsWork) {
    function greetRegular(name) {
        return "Hello, " + name;
    }
    greetRegular('Steve');
    var greetArrow = function (name) {
        return "Hello, " + name;
    };
    var greetMin = function (name) { return "Hello, " + name; };
    console.log(greetMin('Amy'));
})(HowArrowFunctionsWork || (HowArrowFunctionsWork = {}));
