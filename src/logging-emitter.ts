import EVENTS = require('events')
import logging_emitter = require('../logging-emitter.d.ts');


export function createEventEmitterWLogging(emitter_name: string, log): logging_emitter.LoggingEmitter {
    var emitter = Object.create(new EVENTS.EventEmitter())
    emitter['original_emit'] = emitter.emit
    emitter.emit = function(event, ...args) {
        log.info({emitter_name, fname: 'emit', event})
        return this.original_emit(event, ...args)
    }
    emitter.emitNextTick = function(event, ...args) {
        process.nextTick(() => {
            log.info({emitter_name, fname: 'emitNextTick', event})
            this.original_emit(event, ...args)
        })
    }
    return emitter
}
