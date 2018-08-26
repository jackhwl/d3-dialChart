function bar(x, y) {
	var z;
	foo(x);
	return [y, z]

	function foo(x) {
		y++;
		z = x * y;
	}
}

bar(20, 5);  // [6, 120]
bar(20, 5);  // [6, 120]

bar(25, 6);  // [7, 175]
var y = 5, z;

foo(20);
z;		// 120

foo(25);
z;		// 175
