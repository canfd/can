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

    if (!console) {
        console = {error : function () {}};
    }
    
    function CanJS () {
        this.$detectors = {};
        
        // TODO: Replace with data from package.json
        this.name = '{{name}}';
        this.version = '{{version}}';
    }
    
    CanJS.prototype.$immediate = function $immediate (fn) {
        return window.setTimeout(fn, 0);
    };
    
    CanJS.prototype.$error = function $error (message) {
        return console.error('%s (%s): ' + message, this.name, this.version);
    };

    CanJS.prototype.$async = function async (detector, yes, no) {
        function next (can) {
            can? yes() : no();
        }

        if (detector.cache) {
            return this.$immediate(detector.cache? yes : no);
        }

        detector.check(next);
    };

    CanJS.prototype.$sync = function $sync (detector, yes, no) {
        var self = this;

        function resolve (can) {
            return self.$immediate(can? yes : no);
        }

        if (!detector.cache) {
            detector.cache = detector.check();
        }
    
        return resolve(detector.cache);
    };
    
    CanJS.prototype.use = function use (name, options) {
        var detector = this.$detectors[name];

        options = options || {};

        if (!detector) {
            return this.$error('No detector found with name "' + name + '".');
        }
        
        if (detector.async) {
            return this.$async(detector, options.yes, options.no);
        }
        
        return this.$sync(detector, options.yes, options.no);
    };
    
    /**
     * 
     * {async: true, check : function check (done) {}}
     * 
    CanJS.prototype.define = function define (name, descriptor) {
        var error = this.$error;

        if ('object' === typeof name) {
            return error('Please provide a valid name for the descriptor.');
        }

        descriptor = descriptor || {};
        
        if ('object' !== typeof descriptor) {
            return error('Please define a valid test suite descriptor.');
        }
        
        if (!descriptor.check) {
            return error('Invalid descriptor. Please define a `check` function.');
        }

        descriptor.cache = false;

        this.$descriptors[name] = descriptor;
    };
})(window.konexmedia = window.konexmedia || {}, this);