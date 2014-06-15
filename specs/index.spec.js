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

describe('The "can" feature detector', function () {

    var suite = {
        check : function () {
            return true;
        }
    };

    it('should be defined', function () {
        expect(window.can).toBeDefined();
    });
    
    it('should provide an API for defining detection tasks', function () {
        var can = window.can;
        
        can.define('svg', suite);
        
        expect(Object.keys(can.$suites).length).toBe(1);
    });
    
    it('should be able to execute a detection suite', function () {
        var can = window.can;
        
        can.define('svg', suite);
        
        expect(can.use('svg')).toBe(true);
    });

    it('should be able to execute all detection suite at once', function () {
        var can = window.can;
        var result;

        can.define('svg', suite);

        result = can.everything();        
        
        expect(typeof result).toBe('object');
        expect(result.svg).toBe(true);
    });
});