import EVENTS = require('events')


interface LoggingEmitter extends EVENTS.EventEmitter {
    emitNextTick(event: string, ...args: any[]): void
}

export function createEventEmitterWLogging(emitter_name: string, log): LoggingEmitter
