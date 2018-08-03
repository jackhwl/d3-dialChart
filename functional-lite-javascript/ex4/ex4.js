// code here! :)
// function foo(){
//     return 42;
// }

// function bar() {
//     return 10;
// }

function foo(x) {
    return function() {
        return x;
    }
}

function add(x, y) {
    return x + y;
}

function add2(fn1, fn2) {
    return add(fn1(), fn2());
}

function addn(arr) {
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
        sum = add2(foo(arr[i]), foo(sum));
    }
    return sum;
}

function addn(arr) {
	if (vals.length > 2) {
		return addn(
			[
				function() {
					return add2(vals[0],vals[1]);
				}
			]
			.concat(vals.slice(2))
		);
	}
    return add2(vals[0],vals[1]);
}

//add(foo(), bar())