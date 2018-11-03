var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Elvis', 'Fran', 'George', 'Hope'];
var names2 = ['Isaac', 'Jane'];
var names3 = names.concat(["Kyle"], names2);
var firstTraditional = names[0];
var _a = names || [], _b = _a[0], firstDestructure = _b === void 0 ? 'Steve' : _b, secondDestructure = _a[1], more = _a.slice(2);
multiGreet.apply(void 0, names);
multiGreet();
function multiGreet() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    items.forEach(function (item) {
        console.log(friend(__makeTemplateObject(["Hello, ", "."], ["Hello, ", "."]), item));
    });
}
function friend(strings) {
    var substitutions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        substitutions[_i - 1] = arguments[_i];
    }
    if (!substitutions[0]) {
        substitutions[0] = 'Friend';
    }
    return processTaggedTemplate(strings, substitutions);
}
var doLogging = true;
function log(strings) {
    var substitutions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        substitutions[_i - 1] = arguments[_i];
    }
    if (doLogging) {
        substitutions.forEach(function (sub) {
            console.log("Logging: " + sub);
        });
    }
    processTaggedTemplate(strings, substitutions);
}
function throwOnSteve(strings) {
    var substitutions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        substitutions[_i - 1] = arguments[_i];
    }
    if (substitutions[0] === 'Steve') {
        throw new Error('Not that guy!!!');
    }
    processTaggedTemplate(strings, substitutions);
}
function processTaggedTemplate(strings, substitutions) {
    var result = [];
    substitutions.forEach(function (sub, index) {
        result.push(strings[index], sub);
    });
    result.push(strings[strings.length - 1]);
    return result.join('');
}
