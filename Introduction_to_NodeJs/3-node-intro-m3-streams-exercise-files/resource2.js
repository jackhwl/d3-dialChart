var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Resource(m){
    process.nextTick(()=>{
        var count = 0;
        this.emit('start');
        var t = setInterval(()=>{
            this.emit('data', ++count);
            if (count === m) {
                this.emit('end', count);
                clearInterval(t);
            }
        }, 10);
    });
}

util.inherits(Resource, EventEmitter);
module.exports = Resource;