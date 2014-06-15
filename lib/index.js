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

    (function expose () {
        var can = new Can();

        // AMD
        if ('function' === typeof define &&
            'object' === typeof define.amd
            && define.amd) {
            define('can', function () {
                return can;
            });

        // Global
        } else {
            scope.can = can;
        }
    })();

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