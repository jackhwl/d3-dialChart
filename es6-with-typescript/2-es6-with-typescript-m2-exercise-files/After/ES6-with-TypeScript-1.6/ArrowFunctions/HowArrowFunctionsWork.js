var HowArrowFunctionsWork;
(function (HowArrowFunctionsWork) {
    function greetRegular(name) {
        return "Hello, " + name;
    }
    greetRegular('Steve');
    const greetArrow = (name) => {
        return "Hello, " + name;
    };
    const greetMin = (name) => "Hello, " + name;
    console.log(greetMin('Amy'));
})(HowArrowFunctionsWork || (HowArrowFunctionsWork = {}));
