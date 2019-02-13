process.nextTick(function(){

});

Passing arguments and `this` to listeners#
The eventEmitter.emit() method allows an arbitrary set of arguments to be passed to the listener functions. It is important to keep in mind that when an ordinary listener function is called, the standard this keyword is intentionally set to reference the EventEmitter instance to which the listener is attached.

const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined } true
});
myEmitter.emit('event', 'a', 'b');
It is possible to use ES6 Arrow Functions as listeners, however, when doing so, the this keyword will no longer reference the EventEmitter instance:

const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');

Events

Passing arguments and this to listeners
Asynchronous vs. Synchronous
Handling events only once
Error events
Class: EventEmitter

Event: 'newListener'
Event: 'removeListener'
EventEmitter.listenerCount(emitter, eventName)
EventEmitter.defaultMaxListeners
emitter.addListener(eventName, listener)
emitter.emit(eventName[, ...args])
emitter.eventNames()
emitter.getMaxListeners()
emitter.listenerCount(eventName)
emitter.listeners(eventName)
emitter.off(eventName, listener)
emitter.on(eventName, listener)
emitter.once(eventName, listener)
emitter.prependListener(eventName, listener)
emitter.prependOnceListener(eventName, listener)
emitter.removeAllListeners([eventName])
emitter.removeListener(eventName, listener)
emitter.setMaxListeners(n)
emitter.rawListeners(eventName)

