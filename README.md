# can [![Build Status](https://travis-ci.org/canjs/can.svg?branch=master)](https://travis-ci.org/canjs/can)

A modular feature detector for browser environments.

## Why?

We know what you want to say and you're right! There are already two big players in the _feature detector_-land - [Modernizr](http://modernizr.com/) and [has.js](https://github.com/phiggins42/has.js/). Both are great! But let's say you only want to check if your browser supports two or three specific features. Both mentioned libraries provide a ton of feature detection checks. Wouldn't it be cool if you can decide which check do you need and which not? Another scenario that comes to mind: Let's assume that you do not agree with the detection performance in the libraries and you developed a more performant solution. A library should provide an interface that allows plugging in your own check logic.

If you think that a more modularized way would be a good solution then give `can` a spin.

## Installation

1. `bower install --save canjs/can`
2. Install a detector, like `bower install --save canjs/svg`
3. Add references to your HTML.

    <script src="<your-bower-components>/can/can.js"></script>
    <script src="<your-bower-components>/can.svg/can.svg.js"></script>

4. Use it

```javascript
can.use('svg:image', function (err, supports) {
    if (supports) {
        // Do something special.
    }
});
```

## Methods

#### can.use(name, callback);

Checks if the given feature is available in the current browser environment.

#### can.define(name, descriptor)

Defines an own detector (see below).

## Writing an own detector

Do you want to write an own detector? Cool. It is easy. Guaranteed.
You only have to provide a name and define a descriptor object which contains a `check` function. There are two types of possible detectors `synchronous` and `asynchronous` ones.

**Note:** It does not matter how the detector is written (async or sync), executing this thingy follows always the same (async) API:

```javascript
can.use('<detector-name>', function (err, supports) {
    if (supports) {...}
});
```

### Synchronous detectors

Sometimes you are in the comfy situation where you are able to check the existence of a feature in a synchronous manner. Wrapping it into a `can.js` detector is a no-brainer. You only have to define a check function which returns a boolean. That's all.

```javascript
can.define('<your-detector-name>', {

    check : function check () {
        // Check the browser environment.

        return true;
    }

});
```

### Asynchronous detectors

But ... There are also sometimes situations where you have to check a feature in an asynchronous way (loading images and check if the browser supports specific URIs for instance). Writing such feature detectors and integrate them into the `can.js` environment is an easy game too. An example:

```javascript
can.define('<your-detector-name>', {
    async: true,
    check : function check (done) {
        // Do an async operation and then execute the `done` callback, like:
        var image = new Image();
        image.addEventListener('load', function () {

            // Execute the `done` callback in _an error first_ way:
            //
            //     done([error], [test result as boolean]);
            //
            done(null, true);
        });
    }
});
```

# Available detectors

For a list of available detectors, check the [organization page](https://github.com/canjs) of `can.js`.

There are only a few currently. So we need **your** help. If you have written an own detector and want to share it [drop us a message](mailto:info@konexmedia.com). We will add you as a member so that you can transfer your detector to the organization then.

## Author

Copyright 2014, [konexmedia](http://konexmedia.com)
