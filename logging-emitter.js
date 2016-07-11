"use strict";
var EVENTS = require('events');
function createEventEmitterWLogging(emitter_name, log) {
    var emitter = Object.create(new EVENTS.EventEmitter());
    emitter['original_emit'] = emitter.emit;
    emitter.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        log.info({ emitter_name: emitter_name, fname: 'emit', event: event });
        return this.original_emit.apply(this, [event].concat(args));
    };
    emitter.emitNextTick = function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        process.nextTick(function () {
            log.info({ emitter_name: emitter_name, fname: 'emitNextTick', event: event });
            _this.original_emit.apply(_this, [event].concat(args));
        });
    };
    return emitter;
}
exports.createEventEmitterWLogging = createEventEmitterWLogging;
