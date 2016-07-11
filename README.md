# logging-emitter
## Summary
This module logs events emitted by an EventEmitter.  
It also adds a function to emit an event asynchronously, using process.nextTick().

This module was written in TypeScript,
and has a type declaration file specified by the *typings* field in its package.json.
## Usage


To create a logging emitter:
```
var logging_emitter = require('logging-emitter');
var pino = require('pino')  // create a logger using pino or bunyan
var logger = pino()

var emitter = logging_emitter.createEventEmitterWLogging('sun', logger)
function riseHandler(data) {console.log(`riseHandler(${data})`)}
emitter.on('rise', riseHandler)
function setHandler(data) {console.log(`setHandler(${data})`)}
emitter.on('set', setHandler)
// emit the sunset event asynchronously during process.nextTick()
emitter.emitNextTick('set', Date.now())
// emit the sunrise event synchronously
emitter.emit('rise', Date.now())
```
The above code output these log entries in the order: *rise*, *set*  
because the *set* event was emitted during process.nextTick()
> {"pid":42688,"hostname":"server","level":30,"time":1468194491557,"emitter_name":"sun","fname":"emit","event":"rise","v":1}
> {"pid":42688,"hostname":"server","level":30,"time":1468194491562,"emitter_name":"sun","fname":"emitNextTick","event":"set","v":1}

and the handlers printed:
> riseHandler(1468194491557)  
> setHandler(1468194491556)

The call to emit *set* was called first, so its timestamp precedes that of the *rise* event.

## Setup for Build
```
npm install
```

## Build
Build the software:  
```
npm run build
```

Remove the generated files:
```
npm run clean
```

## Test
Run the tests:  
```
npm run test
```

## Problems?
Please report them as issues on the GitHub repo.
