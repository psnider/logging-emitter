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
