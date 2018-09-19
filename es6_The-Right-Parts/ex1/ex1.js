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
