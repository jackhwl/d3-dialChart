var x = 2, fns = [];

(function(){
	var x = 5;

	for (let i=0; i<x; i++) {
		fns[i]=function(){return i;};
	}
})();

console.log(
	(x * 2) === fns[x*2]()
);
// true
// var x = 1;
// function foo( x=2, f = function(){return x;}){
// 	var x=5;
// 	console.log(f());
// }
// foo();