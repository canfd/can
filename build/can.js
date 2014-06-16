/**
 * can - A modular feature detector for browser environments.
 * @version v1.0.0
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

;(function init (scope) {

    'use strict';

    (function expose (g) {
        var can = new Can();

        if ('object' === typeof exports) {
            module.exports = can;
        } else {
            g.can = can;
      }
    })(scope);

    if (!console && !console.error) {
        scope.console = {error: function error () {}};
    }

    /**
     * The detector "class".
     * Responsible for exposing the feature detection API.
     * 
     */
    function Can () {
        this.$suites = {};
    }

    /**
     * Executes a defined feature detection check.
     * 
     * Example:
     * 
     *     can.do('svg'); => Boolean
     * 
     * @params {String} name Name of the detection test that should be executed.
     * @returns {Boolean}
     * 
     */
    Can.prototype.use = function use (name) {
        var suite = this.$suites[name];

        if (!suite) {
            return console.error('The test "%s" does not exist.', name);
        }

        return suite.check();
    };

    /**
     * The API for adding tests to the `can` environment.
     * 
     * Example:
     * 
     * 
     * @param {String} name The name of the detection test.
     * 
     */
    Can.prototype.define = function define (name, suite) {
        if ('object' === typeof name) {
            return console.error('Please provide a valid name for the test suite.');
        }

        suite = suite || {};
        
        if ('object' !== typeof suite) {
            return console.error('Please define a valid test suite descriptor.');
        }
        
        if (!suite.check) {
            return console.error('Invalid test suite. Please define a `check` function.');
        }
        
        this.$suites[name] = suite;
    };

    /**
     * Executes all defined detection suites and returns a detailed report.
     * 
     * @returns {Object} A detailed report.
     *
     */
    Can.prototype.everything = function everything () {
        var result = {};
        var prop;

        for (prop in this.$suites) {
            if (this.$suites.hasOwnProperty(prop)) {
                result[prop] = this.$suites[prop].check();
            }
        }

        return result;
    };
})(this);