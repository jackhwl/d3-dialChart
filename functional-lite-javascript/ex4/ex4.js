// code here! :)
// 1. Write two functions, each which return a different number value when called.

// function foo() {
//     return 42;
// }

// function bar() {
//     return 10;
// }


// 2. Write an `add(..)` function that takes two numbers and adds them and returns the result. 
//  Call `add(..)` with the results of your two functions from (1) and print the result to the console.

function add(x, y) {
    return x + y;
}

//add(foo(), bar())  //52 

// 3. Write an `add2(..)` that takes two functions instead of two numbers, 
//  and it calls those two functions and then sends those values to `add(..)`, just like you did in (2) above.

function add2(fn1, fn2) {
    return add(fn1(), fn2());
}

//add2(foo, bar);  // 52 verified

// 4. Replace your two functions from (1) with a single function that takes a value and returns a function back, 
//      where the returned function will return the value when it's called.

function foo(x) {
    return function() {
        return x;
    }
}

add2(foo(10), foo(42));  // 52 verified

// 5. Write an `addn(..)` that can take an array of 2 or more functions, and using only `add2(..)`, adds them together. 
//  Try it with a loop. Try it without a loop (recursion). Try it with built-in array functional helpers (map/reduce).

// function addn(arr) {
//     var sum = 0;
//     for(var i = 0; i< arr.length; i++) {
//         sum = add2(foo(sum), foo(arr[i]));
//     }
//     return sum;
// }

// addn([1,2,3,4,5]);   // 15 verified



// function addn(arr) {
//     if (arr.length <= 2) {
//         return add2(arr[0], arr[1]);
//     }
//     return addn([
//         function() {
//             return add2(arr[0], arr[1])
//         }]
//         .concat(arr.slice(2))
//     );
//     //return add2(arr[0], foo(addn(arr.slice(1))));
    
// }

//addn([foo(10), foo(42), foo(56), foo(73)]);

function addn(...arr) {
    return arr.slice(1)
        .reduce(function(prev, cur) {
            return function() {
                return add2(prev, cur);
            };
        }, arr[0])();
}

addn(foo(10), foo(42), foo(56), foo(73));


// 6. Start with an array of odd and even numbers (with some duplicates), 
// and trim it down to only have unique values.
// 7. Filter your array to only have even numbers in it.

// 8. Map your values to functions, using (4), and pass the new list of functions to the `addn(..)` from (5).


var arr = [10,42,56,73,15,2,98,7];
function isEven(x) { return x % 2 == 0; }
arr = arr.filter(isEven).map(foo);

addn(
    ...arr
)
