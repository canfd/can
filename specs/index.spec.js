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

'use strict';

/* global expect,describe,it */
describe('The "can" feature detector', function () {

    var sync = {
        check : function check () {
            return true;
        }
    };

    var async = {
        async: true,
        check : function check (callback) {
            setTimeout(function () {
                callback(null, true);
            }, 500);
        }
    };

    it('should be defined as a global variable', function () {
        expect(window.can).toBeDefined();
    });
    
    it('should provide an API for defining synchronous detector tests', function (done) {
        var can = window.can;
        
        can.define('svg', sync);
        
        expect(Object.keys(can.$detectors).length).toBe(1);
        
        can.use('svg', function (err, supports) {
            expect(err).toBeNull();
            expect(supports).toBe(true);
            
            done();
        });
    });
    
    it('should provide an API for defining asynchronous detector tests', function (done) {
        var can = window.can;
        
        can.define('svg', async);
        
        expect(Object.keys(can.$detectors).length).toBe(1);
        
        can.use('svg', function (err, supports) {
            expect(err).toBeNull();
            expect(supports).toBe(true);
            
            done();
        });
    });
});