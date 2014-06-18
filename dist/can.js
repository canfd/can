/**
 * can - A modular feature detector for browser environments.
 * @version 2.0.1
 * @author André König (andre.koenig@konexmedia.com)
 * @license MIT
 *
 */
/*
 * can
 *
 * Copyright(c) 2014 André König <andre.koenig@konexmedia.com>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@konexmedia.com>
 *
 */

/* global console */
;(function init (knx, scope) {

    knx.can = scope.can = new CanJS();

    if (!scope.console) {
        scope.console = {error : function () {}};
    }
    
    function CanJS () {
        this.$detectors = {};

        this.name = 'can';
        this.description = 'A modular feature detector for browser environments.';
        this.version = '2.0.1';
        this.author = 'André König (andre.koenig@konexmedia.com)';
    }

    /**
     * @private
     *
     * A wrapper that moves a function call at the end of the event loop.
     *
     * @params {Function} fn The function that should be deferred.
     *
     */
    CanJS.prototype.$immediate = function $immediate (fn) {
        return window.setTimeout(fn, 0);
    };

    /**
     * @private
     * 
     * A wrapper that handles error outputs.
     *
     */
    CanJS.prototype.$error = function $error (message) {
        return console.error('%s (%s): ' + message, this.name, this.version);
    };

    /**
     * @private
     *
     * We want to provide a harmonic API when it comes to executing
     * a descriptors `check` function. Not every feature detection check is an
     * async operation, but using can.js should always happen in an async way.
     * Therefore this method overrides the check function that the author of the
     * detector has defined with one which consumes a callback.
     *
     * @param {Object} descriptor The descriptor which `check` should be _asynchronized_.
     *
     * @returns {Function} The _asynchronized_ `check` function.
     *
     */
    CanJS.prototype.$asynchronize = function $asynchronize (descriptor) {
        var self = this;
        var check = descriptor.check;

        return function (done) {

            function cached () {
                return self.$immediate(function () {
                    done(null, descriptor.cache);
                });
            }

            if (!descriptor.async) {
                if (descriptor.cache === undefined) {
                    descriptor.cache = check();
                }

                return cached();
            }

            if (descriptor.cache === undefined) {
                return check(function (err, can) {
                    descriptor.cache = can;

                    done(err, descriptor.cache);
                });
            }

            return cached();
        };
    };

    /**
     * Executes a feature detector.
     * 
     * @params {String} name The name of the check which should be performed.
     * @params {Function} callback _Error first_ style callback.
     * 
     */
    CanJS.prototype.use = function use (name, callback) {
        var error = this.$error;
        var detector;
        
        if ('function' === typeof name) {
            return error('Please define the name of the detector you want to use.');
        }
        
        callback = callback || function () {};
        
        detector = this.$detectors[name];
        
        if (!detector) {
            return error('Detector "' + name + '" not found.');
        }

        detector.check(callback);
    };
    
    /**
     * API for defining detectors.
     * 
     * Examples:
     * 
     *     A synchronous feature detection check:
     * 
     *     can.define('svg:image', {
     *         check : funcion check () {
     *             // Do something special and return a boolean.
     *             return true;
     *         }
     *     });
     *
     *     An asynchronous feature detection check:
     *
     *     can.define('data-uri', {
     *         async: true,
     *         check : function check (done) {
     *             // Do something special in an async way and execute `done`
     *             // when, well, done :)
     *             // Note that the `done` callback is _error first_ style and
     *             // the second argument should be a boolean which defines
     *             // if the browser supports the feature or not.
     * 
     *             done(null, true);
     *        }
     *     });
     * 
     * It doesn't matter which kind of check the author has defined, they are
     * all executable in the same way:
     * 
     *     can.use('svg', function (err, supports) {...});
     * 
     * OR
     * 
     *     can.use('data-uri', function (err, supports) {...});
     *
     */
    CanJS.prototype.define = function define (name, descriptor) {
        var error = this.$error;

        if ('string' !== typeof name) {
            return error('Please provide a valid name for the descriptor.');
        }

        descriptor = descriptor || {};
        
        if ('object' !== typeof descriptor) {
            return error('Please define a valid test suite descriptor.');
        }
        
        if (!descriptor.check) {
            return error('Invalid descriptor. Missing a `check` function.');
        }

        descriptor.name = name;
        descriptor.cache = undefined;

        descriptor.check = this.$asynchronize(descriptor);

        this.$detectors[name] = descriptor;
    };

})(window.konexmedia = window.konexmedia || {}, this);