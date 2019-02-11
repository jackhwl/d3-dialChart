var foo = require('foo');
var Bar = require('bar');
var justOne = require('largeModule').justOne;

var f = 2 + foo.alpha;
var b = foo.beta() * 3;

var bar = new Bar();

console.log(justOne());

built-in modules include:

fs
http
crypto
os

each file is require()'d with file system-like semantics:
    var data = require('./data');
    var foo = require('./other/foo');
    var bar = require('../lib/bar');

    var justOne = require('./data').justOne;

Variables are marked for export via "module.exports"

one.js                                          two.js

var count = 2;                                  var one = require('./one');
var doIt = function(i, callback) {              one.doIt(23, function(err, result){
    // do something, invoke callback                console.log(result);
}                                               });

module.exports.doIt = doIt;                     console.log(one.foo);
module.exports.foo = 'bar';                     console.log(one.count);  <---XXXXXXX>
