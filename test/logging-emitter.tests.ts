import CHAI                             = require('chai')
const  expect                           = CHAI.expect

import logging_emitter                  = require('../logging-emitter');


describe('logging-emitter', function() {

    describe('emit', function() {

        it('should be synchronous', function() {
            var log = {
                info: (obj) => {}
            }
            var handler_called = false
            function handler() {
                handler_called = true
            }
            var emitter = logging_emitter.createEventEmitterWLogging('sun', log)
            emitter.on('rise', handler)
            emitter.emit('rise')
            expect(handler_called).to.be.true
        })


        it('should call log.info() with correct parameters', function() {
            var log_called = false
            var log = {
                info: (obj) => {
                    log_called = true
                    expect(obj.emitter_name).to.equal('moon')
                    expect(obj.fname).to.equal('emit')
                    expect(obj.event).to.equal('full')
                }
            }
            function handler() {}
            var emitter = logging_emitter.createEventEmitterWLogging('moon', log)
            emitter.on('full', handler)
            emitter.emit('full')
            expect(log_called).to.be.true
        })

    })


    describe('emitNextTick', function() {

        it('should be asynchronous', function(done) {
            var log = {
                info: (obj) => {}
            }
            var handler_called = false
            function handler() {
                handler_called = true
            }
            var emitter = logging_emitter.createEventEmitterWLogging('sun', log)
            emitter.on('rise', handler)
            emitter.emitNextTick('rise')
            expect(handler_called).to.be.false
            setTimeout(() => {
                expect(handler_called).to.be.true
                done()
            }, 0)
        })


        it('should call log.info() with correct parameters', function(done) {
            var log_called = false
            var log = {
                info: (obj) => {
                    log_called = true
                    expect(obj.emitter_name).to.equal('moon')
                    expect(obj.fname).to.equal('emitNextTick')
                    expect(obj.event).to.equal('full')
                }
            }
            function handler() {}
            var emitter = logging_emitter.createEventEmitterWLogging('moon', log)
            emitter.on('full', handler)
            emitter.emitNextTick('full')
            expect(log_called).to.be.false
            setTimeout(() => {
                expect(log_called).to.be.true
                done()
            }, 0)
        })


        it('should call log.info() only once', function(done) {
            var log_called_count = 0
            var log = {
                info: (obj) => {
                    log_called_count = 1
                }
            }
            function handler() {}
            var emitter = logging_emitter.createEventEmitterWLogging('moon', log)
            emitter.on('full', handler)
            emitter.emitNextTick('full')
            expect(log_called_count).to.equal(0)
            setTimeout(() => {
                expect(log_called_count).to.equal(1)
                done()
            }, 0)
        })

    })

})
