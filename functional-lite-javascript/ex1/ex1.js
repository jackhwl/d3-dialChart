function bar(x, y) {
	var z;
	foo(x);
	return [y,z];
	function foo(x) {
		y++;
		z = x * y;
	}	
}

bar(20, 5);  //[6, 120]
bar(20, 5);  //[6, 120]
//z;		// 120

bar(25, 6);  //[7, 175]
//z;		// 175
