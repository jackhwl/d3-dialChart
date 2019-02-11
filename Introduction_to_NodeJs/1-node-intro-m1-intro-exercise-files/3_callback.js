var maxTime = 1000;
// If input is even, double it
// If input is odd, error
// (call takes random amount of time > 1s)
var evenDouble = function(v, callback){
    var time = Math.floor(Math.random()*1000);
    if(v % 2 === 0) {
        setTimeout(function(){callback(null, v*2, time);}, time);
        //callback(null, v*2, time);
    } else {
        setTimeout(function(){callback(new Error("v is odd"), null, time);}, time);
        //setTimeout(callback.bind(null, new Error("v is odd"),time), time);
        //callback(new Error("v is odd"));
    }
}

var handleResults = function(err, results, time) {
    if (err){
        console.log('ERROR: ' + err.message + " after " + time + " ms");
    } else {
        console.log("The results are: " + results + " (" + time + " ms)");
    }
};

for (var i=0; i<10; i++){
    console.log("Calling evenDouble for value: " + i);
    evenDouble(i, handleResults);
}
// evenDouble(2, handleResults);
// evenDouble(3, handleResults);
// evenDouble(10, handleResults);

console.log("-----");