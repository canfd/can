# can

A modular feature detector for browser environments.

## Why?

We know what you want to say and you're right! There are already two big players in the _feature detector_-land - [Modernizr](http://modernizr.com/) and [has.js](https://github.com/phiggins42/has.js/). Both are great! But let's say you only want to check if your browser supports two or three specific features. Both mentioned libraries provides a ton of feature detection checks. Wouldn't it be cool if you can decide which check do you need and which not? Another scenario which comes to mind: Let's assume that you do not agree with the detection performance in the libraries and you developed a more performant solution. Wouldn't it be cool as well if you could plug in your own check logic easily?

If you think that a more modularized way would be a good solution then give `can` a spin.

## Installation

1. `bower install --save canjs/can`
2. Install a detector, like `bower install --save canjs/svg`
3. Add references to your HTML.

    <script src="<your-bower-components>/can/can.js"></script>
    <script src="<your-bower-components>/can-svg/can-svg.js"></script>

4. Use it

```javascript
if (can.use('svg')) {
    // Do something special
}
```

## Methods

#### can.use(name);

Checks if the given feature is available in the current browser environment.

#### can.define(name, descriptor)

Defines an own detector (see below).

## Writing an own detector

Do you want to write an own detector? Cool. It is easy. Guaranteed.
You only have to provide a name and define a descriptor object which contains a `check` function. This check function has to return a boolean value. That's all.

```javascript
can.define('<your-name>', {
    check : function check () {
        // Check the browser environment.

        return true;
    }
});
```

Done? Okay, cool. It is possible to use this check function with the help of `can` now:

```javascript
    if (can.use('<your-name>')) {
        // The browser supports it.
    }
```

# Available detectors

For a list of available detectors, check the [organization page](https://github.com/canjs) of `canjs`.

There are only a few currently. So we need **your** help. If you have written an own detector and want to share it [drop us a message](info@konexmedia.com). We will add you as a member so that you can transfer your plugin to the organization then.

## Author

Copyright 2014, [konexmedia](http://konexmedia.com)