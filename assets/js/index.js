/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function (d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (!d.getElementById(id)) {
	        js = d.createElement(s);
	        js.id = id;
	        js.src = "//platform.twitter.com/widgets.js";
	        fjs.parentNode.insertBefore(js, fjs);
	    }
	}(document, "script", "twitter-wjs");
	
	if(location.href.indexOf("eightmedia.github.io") > -1) {
	    var _gaq = _gaq || [];
	    _gaq.push(['_setAccount', 'UA-30289566-1']);
	    _gaq.push(['_trackPageview']);
	    (function () {
	        var ga = document.createElement('script');
	        ga.type = 'text/javascript';
	        ga.async = true;
	        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
	        var s = document.getElementsByTagName('script')[0];
	        s.parentNode.insertBefore(ga, s);
	    })();
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Hammer = __webpack_require__(3);
	
	
	// polyfill
	var reqAnimationFrame = (function () {
	    return window[Hammer.prefixedName(window, 'requestAnimationFrame')] || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();
	
	var el = document.querySelector("#hitarea");
	
	var START_X = Math.round((el.parentNode.offsetWidth - el.offsetWidth) / 2);
	var START_Y = Math.round((el.parentNode.offsetHeight - el.offsetHeight) / 2);
	
	var ticking = false;
	var transform;
	
	var mc = new Hammer.Manager(el, {
	    touchAction: 'none'
	});
	
	mc.add(new Hammer.Pan({ threshold: 0, pointers: 2 }));
	mc.add(new Hammer.Rotation({ threshold: 0 })).join('pan');
	mc.add(new Hammer.Pinch({ threshold: 0 })).join('pan').join('rotate');
	
	mc.add(new Hammer.Swipe());
	mc.add(new Hammer.Pan({ threshold: 0 })).join('swipe');
	
	mc.add(new Hammer.Tap({ event: 'tripletap', taps: 3 }));
	mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
	mc.add(new Hammer.Tap());
	
	mc.on("pan", onPan);
	mc.on("swipe", onSwipe);
	mc.on("rotate", onRotate);
	mc.on("pinch", onPinch);
	mc.on("tap", onTap);
	mc.on("doubletap", onDoubleTap);
	mc.on("tripletap", onTripleTap);
	
	mc.on("panstart rotatestart pinchstart", resetElementStart);
	mc.on("panend rotateend pinchend pancancel rotatecancel pinchcancel", resetElementEnd);
	
	function resetElementStart() {
	    el.className = '';
	}
	
	function resetElementEnd() {
	    transform = {
	        translate: { x: START_X, y: START_Y },
	        scale: 1,
	        rotate: 0
	    };
	    el.className = 'animate';
	    requestElementUpdate();
	}
	
	function updateElementTransform() {
	    var value = [
	                'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
	                'scale(' + transform.scale + ', ' + transform.scale + ')',
	                'rotate(' + transform.rotate + 'deg)'];
	    el.style.webkitTransform = el.style.transform = value.join(" ");
	    ticking = false;
	}
	
	function requestElementUpdate() {
	    if(!ticking) {
	        ticking = true;
	        reqAnimationFrame(updateElementTransform);
	    }
	}
	
	// gesture handlers
	
	function onPan(ev) {
	    transform.translate = {
	        x: START_X + ev.deltaX,
	        y: START_Y + ev.deltaY
	    };
	    requestElementUpdate();
	}
	
	function onSwipe(ev) {
	    el.style.background = 'black';
	    setTimeout(function () {
	        el.style.background = 'white';
	        requestElementUpdate();
	    }, 200);
	    requestElementUpdate();
	}
	
	function onPinch(ev) {
	    transform.scale = ev.scale;
	    requestElementUpdate();
	}
	function onRotate(ev) {
	    transform.rotate = ev.rotation;
	    requestElementUpdate();
	}
	
	function onTap(ev) {
	    el.style.background = '#fd0';
	    setTimeout(function () {
	        el.style.background = 'white';
	        requestElementUpdate();
	    }, 200);
	}
	
	function onDoubleTap(ev) {
	    transform.scale = transform.scale === 1 ? 1.5 : 1;
	    requestElementUpdate();
	}
	
	function onTripleTap(ev) {
	    transform.rotate = !transform.rotate ? 360 : 0;
	    requestElementUpdate();
	}
	
	resetElementEnd();
	
	document.querySelector(".device .button").addEventListener("click", function(){
	    document.querySelector(".device").classList.toggle('hammertime');
	}, false);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function(window, undefined) {
	  'use strict';
	
	/**
	 * create an manager with a default set of recognizers
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    var manager = new Manager(element, options);
	
	    /**
	     * setup recognizers
	     * the defauls.recognizers contains an array like this;
	     * [ RecognizerClass, options, join ],
	     * [ .... ]
	     */
	    each(manager.options.recognizers, function(item) {
	        var recognizer = manager.add(new (item[0])(item[1]));
	        if(item[2]) {
	            recognizer.join(item[2]);
	        }
	    });
	
	    return manager;
	}
	
	// version is set on build
	Hammer.VERSION = '2.0.0-dev';
	
	var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
	
	var TYPE_FUNCTION = 'function';
	var TYPE_UNDEFINED = 'undefined';
	
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i, len;
	
	    if(obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if(typeof obj.length !== TYPE_UNDEFINED) {
	        for(i = 0, len = obj.length; i < len; i++) {
	            iterator.call(context, obj[i], i, obj);
	        }
	    } else {
	        for(i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	function merge(dest, src) {
	    for(var key in src) {
	        if(src.hasOwnProperty(key) && typeof dest[key] == TYPE_UNDEFINED) {
	            dest[key] = src[key];
	        }
	    }
	    return dest;
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	function extend(dest, src) {
	    for(var key in src) {
	        if(src.hasOwnProperty(key)) {
	            dest[key] = src[key];
	        }
	    }
	    return dest;
	}
	
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;
	
	    // object create is supported since IE9
	    if(Object.create) {
	        childP = child.prototype = Object.create(baseP);
	        childP.constructor = child;
	    } else {
	        extend(child, parent);
	        var Inherited = function() {
	            this.constructor = child;
	        };
	        Inherited.prototype = baseP;
	        childP = child.prototype = new Inherited();
	    }
	
	    if(properties) {
	        extend(childP, properties);
	    }
	
	    childP._super = baseP;
	}
	
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function() {
	        return fn.apply(context, arguments);
	    };
	}
	
	/**
	 * addEventListener with multiple events at once
	 * @param {HTMLElement} element
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(element, types, handler) {
	    each(splitStr(types), function(type) {
	        element.addEventListener(type, handler, false);
	    });
	}
	
	/**
	 * removeEventListener with multiple events at once
	 * @param {HTMLElement} element
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(element, types, handler) {
	    each(splitStr(types), function(type) {
	        element.removeEventListener(type, handler, false);
	    });
	}
	
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while(node) {
	        if(node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	
	/**
	 * simple wrapper around math.round
	 * @param {Number} number
	 * @returns {number}
	 */
	function round(number) {
	    return Math.round(number);
	}
	
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if(src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        for(var i = 0, len = src.length; i < len; i++) {
	            if((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	        }
	        return -1;
	    }
	}
	
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	
	/**
	 * unique array with objects based on a key (like 'id')
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} key
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key) {
	    var results = [];
	    var values = [];
	    for(var i = 0, len = src.length; i < len; i++) {
	        if(inArray(values, src[i][key]) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = src[i][key];
	    }
	    return results;
	}
	
	/**
	 * get/set (vendor prefixed) property value. allows css properties, properties and functions.
	 * if you want to call a function by this function, you should pass an array with arguments (see .apply())
	 * else, a bindFn function will be returned
	 *
	 * @param {Object} obj
	 * @param {String} property
	 * @param {*} [val]
	 * @returns {*|Undefined} val
	 */
	function prefixed(obj, property, val) {
	    var prop = prefixedName(obj, property);
	    if(!prop) {
	        return undefined;
	    } else if(typeof obj[prop] == TYPE_FUNCTION) {
	        if(typeof val == TYPE_UNDEFINED) {
	            return bindFn(obj[prop], obj);
	        }
	        return obj[prop].apply(obj, val);
	    } else if(val) {
	        obj[prop] = val;
	    }
	    return obj[prop];
	}
	
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixedName(obj, property) {
	    var prefix, prop, i;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	
	    for(i = 0; i < VENDOR_PREFIXES.length; i++) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	
	        if(prop in obj) {
	            return prop;
	        }
	    }
	    return undefined;
	}
	
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
	
	var SUPPORT_POINTER_EVENTS = typeof prefixedName(window, 'PointerEvent') != TYPE_UNDEFINED;
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	
	var COMPUTE_INTERVAL = 50;
	
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    this.manager = manager;
	    this.callback = callback;
	
	    // used for internal events
	    this._handler = bindFn(this.handler, this);
	
	    this.elEvents && addEventListeners(this.manager.element, this.elEvents, this._handler);
	    this.winEvents && addEventListeners(window, this.winEvents, this._handler);
	}
	
	Input.prototype = {
	    destroy: function() {
	        this.elEvents && removeEventListeners(this.manager.element, this.elEvents, this._handler);
	        this.winEvents && removeEventListeners(window, this.winEvents, this._handler);
	    }
	};
	
	/**
	 * create new input type manager
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    if(SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if(SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if(!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & INPUT_END && (pointersLen - changedPointersLen === 0));
	
	    input.isFirst = isFirst;
	    input.isFinal = isFinal;
	
	    if(isFirst) {
	        manager.session = {};
	    }
	    // source event is the normalized value of the events like 'touchstart, touchend, touchcancel, pointerdown'
	    input.eventType = eventType;
	
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	
	    manager.recognize(input);
	}
	
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	
	    // store the first input to calculate the distance and direction
	    if(!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	
	    // to compute scale and rotation we need to store the multiple touches
	    if(pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if(pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	    var center = getCenter(pointers);
	
	    input.timeStamp = input.srcEvent.timeStamp;
	
	    input.center = center;
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	    input.direction = getDirection(offsetCenter, center);
	
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	    input.deltaX = center.x - offsetCenter.x;
	    input.deltaY = center.y - offsetCenter.y;
	
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	    // find the correct target
	    var target = manager.element;
	    if(hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	
	    computeIntervalInputData(session, input);
	}
	
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval;
	    if(!last) {
	        last = session.lastInterval = simpleCloneInputData(input);
	    }
	
	    var deltaTime = input.timeStamp - last.timeStamp;
	
	    if(deltaTime > COMPUTE_INTERVAL || !last.velocity) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
	
	        last = session.lastInterval = simpleCloneInputData(input);
	        last.velocity = getVelocity(deltaTime, deltaX, deltaY);
	    }
	
	    var velocity = last.velocity;
	
	    input.velocity = Math.max(velocity.x, velocity.y);
	    input.velocityX = velocity.x;
	    input.velocityY = velocity.y;
	}
	
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    for(var i = 0; i < input.pointers.length; i++) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	    }
	
	    return {
	        timeStamp: input.srcEvent.timeStamp,
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	
	    // no need to loop when only one touch
	    if(pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	
	    var x = 0, y = 0;
	    for(var i = 0; i < pointersLength; i++) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	    }
	
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} deltaX
	 * @param {Number} deltaY
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, deltaX, deltaY) {
	    return {
	        x: Math.abs(deltaX / deltaTime) || 0,
	        y: Math.abs(deltaY / deltaTime) || 0
	    };
	}
	
	/**
	 * get the direction between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @return {String} direction matches `DIRECTION_NONE|LEFT|RIGHT|UP|DOWN`
	 */
	function getDirection(p1, p2) {
	    var x = p1.x - p2.x,
	        y = p1.y - p2.y;
	
	    // no direction because the positions are equal
	    if(x === y) {
	        return DIRECTION_NONE;
	    }
	
	    if(Math.abs(x) >= Math.abs(y)) {
	        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if(!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.sqrt((x * x) + (y * y));
	}
	
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if(!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END,
	    mouseout: INPUT_CANCEL
	};
	
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseout mouseup';
	
	/**
	 * Mouse events input
	 * @constructor
	 */
	function MouseInput() {
	    this.elEvents = MOUSE_ELEMENT_EVENTS;
	    this.winEvents = MOUSE_WINDOW_EVENTS;
	
	    this.allow = true; // used by Input.TouchMouse to disable mouse events
	    this.pressed = false; // mousedown state
	
	    Input.apply(this, arguments);
	}
	
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	
	        // on start we want to have the left mouse button down
	        if(eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	
	        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
	        if(!this.pressed || !this.allow) {
	            return;
	        }
	
	        var target = ev.relatedTarget || ev.toElement;
	        var mouseOut = (eventType & INPUT_CANCEL && (!target || target.nodeName == 'HTML'));
	
	        if(eventType & INPUT_END || mouseOut) {
	            this.pressed = false;
	        }
	
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    },
	});
	
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	
	var IE10_POINTER_TYPE_MAP = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE
	};
	
	var POINTER_ELEMENT_EVENTS = 'pointerdown pointermove pointerup pointercancel';
	var POINTER_WINDOW_EVENTS = 'pointerout';
	
	if(window.MSPointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown MSPointerMove MSPointerUp MSPointerCancel';
	    POINTER_WINDOW_EVENTS = 'MSPointerOut';
	}
	
	/**
	 * Pointer events input
	 * @constructor
	 */
	function PointerEventInput() {
	    this.elEvents = POINTER_ELEMENT_EVENTS;
	    this.winEvents = POINTER_WINDOW_EVENTS;
	
	    Input.apply(this, arguments);
	
	    this.store = (this.manager.session.pointerEvents = []);
	}
	
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function(ev) {
	        var store = this.store;
	        var element = this.manager.element;
	        var removePointer = false;
	
	        var eventType = POINTER_INPUT_MAP[ev.type.toLowerCase().replace('ms', '')];
	
	        // start and mouse must be down
	        if(eventType & INPUT_START && ev.button === 0) {
	            store.push(ev);
	            prefixed(element, 'setPointerCapture', [ev.pointerId]);
	        } else if(eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	
	        // get index of the event in the store
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	        if(storeIndex < 0) {
	            return;
	        }
	
	        // update the event in the store
	        store[storeIndex] = ev;
	
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: IE10_POINTER_TYPE_MAP[store[0].pointerType] || store[0].pointerType,
	            srcEvent: ev
	        });
	
	        if(removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	            prefixed(element, 'releasePointerCapture', [ev.pointerId]);
	        }
	    },
	});
	
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var TOUCH_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Touch events input
	 * @constructor
	 */
	function TouchInput() {
	    this.elEvents = TOUCH_EVENTS;
	
	    Input.apply(this, arguments);
	}
	
	inherit(TouchInput, Input, {
	    /**
	     * handle touch events
	     * @param {Object} ev
	     */
	    handler: function(ev) {
	        var touches = this.normalizeTouches(ev);
	        this.callback(this.manager, TOUCH_INPUT_MAP[ev.type], {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    },
	
	    /**
	     * make sure all browsers return the same touches
	     * @param {Object} ev
	     * @returns {Array} [all, changed]
	     */
	    normalizeTouches: function(ev) {
	        var changedTouches = toArray(ev.changedTouches);
	        var touches = toArray(ev.touches).concat(changedTouches);
	
	        return [
	            // should contain all the touches, touches + changedTouches
	            uniqueArray(touches, 'identifier'),
	            // should contain only the touches that have changed
	            changedTouches
	        ];
	    },
	});
	
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 */
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	
	    this.touch = new TouchInput(this.manager, this._handler);
	    this.mouse = new MouseInput(this.manager, this._handler);
	}
	
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	
	        // when we're in a touch event, so  block all upcoming mouse events
	        // most mobile browser also emit mouseevents, right after touchstart
	        if(isTouch) {
	            this.mouse.allow = false;
	        } else if(isMouse && !this.mouse.allow) {
	            return;
	        }
	
	        // reset the allowMouse when we're done
	        if(inputEvent & INPUT_END) {
	            this.mouse.allow = true;
	        }
	
	        this.callback(manager, inputEvent, inputData);
	    },
	
	    /**
	     * remove the event listeners
	     */
	    destroy: function() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	
	/**
	 * Event emitter
	 * @constructor
	 */
	function EventEmitter(element, domEvents) {
	    this.element = element;
	    this.domEvents = domEvents;
	
	    /**
	     * contains handlers, grouped by event name
	     * 'swipe': [Function, Function, ...],
	     * 'hold': [Function, Function, ...]
	     * @type {{}}
	     */
	    this.eventHandlers = {};
	}
	
	EventEmitter.prototype = {
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        var store = this.eventHandlers;
	        each(splitStr(events), function(event) {
	            store[event] = store[event] || [];
	            store[event].push(handler);
	        });
	        return this;
	    },
	
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        var store = this.eventHandlers;
	        each(splitStr(events), function(event) {
	            if(!handler) {
	                delete store[event];
	            } else {
	                store[event].splice(inArray(store[event], handler), 1);
	            }
	        });
	        return this;
	    },
	
	    /**
	     * removes all events handlers
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.eventHandlers = {};
	    },
	
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit : function(event, data) {
	        // we also want to trigger dom events
	        if(this.domEvents) {
	            triggerDomEvent(event, data);
	        }
	
	        // no handlers, so skip it all
	        var handlers = this.eventHandlers[event];
	        if(!handlers || !handlers.length) {
	            return;
	        }
	
	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };
	
	        for(var i = 0; i < handlers.length; i++) {
	            handlers[i](data);
	        }
	    }
	};
	
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	
	/**
	 * set and mimic the touch-action property
	 */
	
	var NATIVE_TOUCH_ACTION = typeof prefixed(document.body.style, 'touchAction') !== TYPE_UNDEFINED;
	
	function TouchAction(manager) {
	    this.manager = manager;
	}
	
	TouchAction.prototype = {
	    set: function(value) {
	        this.value = value.toLowerCase();
	
	        if(NATIVE_TOUCH_ACTION) {
	            prefixed(this.manager.element.style, 'touchAction', value);
	        }
	    },
	
	    update: function(input) {
	        var event = input.srcEvent;
	
	        // not needed for native and mouse input
	        if(NATIVE_TOUCH_ACTION ||
	            input.pointerType == INPUT_TYPE_MOUSE ||
	            input.eventType === INPUT_START) {
	            return;
	        }
	
	        // if the touch action did prevented once this session,
	        // prevent it everytime
	        if(this.manager.session.prevented) {
	            event.preventDefault();
	            return;
	        }
	
	        // split the value, and try to run a value-handler
	        var actions = splitStr(this.value);
	        var values = this.values;
	        for(var i = 0; i < actions.length; i++) {
	            if(values[actions[i]]) {
	                values[actions[i]].call(this, input, event);
	            }
	        }
	    },
	
	    /**
	     * touch-action value methods
	     */
	    values: {
	        none: function(input, event) {
	            this.prevent(event);
	        },
	        'pan-y': function(input, event) {
	            if(input.direction & DIRECTION_HORIZONTAL) {
	                this.prevent(event);
	            }
	        },
	        'pan-x': function(input, event) {
	            if(input.direction & DIRECTION_VERTICAL) {
	                this.prevent(event);
	            }
	        }
	    },
	
	    /**
	     * call preventDefault and save in the session
	     * @param {Object} event
	     */
	    prevent: function(event) {
	        this.manager.session.prevented = true;
	        event.preventDefault();
	    }
	};
	
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.enabled = true;
	
	    // try and set the touch-action value by getting it from the element
	    // this allows to let it be pre-configured it most cases.
	    options = options || {};
	    options.touchAction = options.touchAction || element.style.touchAction;
	
	    this.options = merge(options, Hammer.defaults);
	
	    EventEmitter.call(this, element, this.options.domEvents);
	
	    this.session = {};
	    this.recognizers = [];
	
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this);
	    this.touchAction.set(this.options.touchAction);
	}
	
	Hammer.defaults = {
	    // when set to true, dom events are being triggered.
	    // but this is slower, so disabled by default.
	    domEvents: false,
	    // default value is used when a touch-action isn't defined on the element style
	    touchAction: 'pan-y',
	    // default setup when calling Hammer()
	    recognizers: [
	        [RotationRecognizer],
	        [PinchRecognizer, null, 'rotate'],
	        [PanRecognizer],
	        [SwipeRecognizer, null, 'pan'],
	        [TapRecognizer, { event: 'doubletap', taps: 2 }],
	        [TapRecognizer],
	        [HoldRecognizer]
	    ]
	};
	
	inherit(Manager, EventEmitter, {
	    /**
	     * enable recognizing
	     */
	    enable: function() {
	        this.enabled = true;
	    },
	
	    /**
	     * disable recognizing
	     */
	    disable: function() {
	        this.enabled = false;
	    },
	
	    /**
	     * stop the current session
	     */
	    stop: function() {
	        this.session.stopped = true;
	    },
	
	    /**
	     * run the recognizers!
	     * this is called by the inputHandler function
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        if(!this.enabled || this.session.stopped) {
	            return;
	        }
	
	        this.touchAction.update(inputData);
	
	        var recognizer;
	        var session = this.session;
	        var curRecognizer = session.curRecognizer;
	
	        // reset when the last recognizer is done, or this is a new session
	        if(!curRecognizer || (curRecognizer && curRecognizer & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	
	        // we're in a active recognizer
	        for(var i = 0; i < this.recognizers.length; i++) {
	            recognizer = this.recognizers[i];
	
	            if(!curRecognizer || recognizer == curRecognizer || recognizer.joins(curRecognizer)) {
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }
	
	            if(!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	        }
	    },
	
	    /**
	     * get a recognizer by its event name.
	     * if you pass an Recognizer object it just will be returned
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if(recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	
	        var recognizers = this.recognizers;
	        for(var i = 0; i < recognizers.length; i++) {
	            if(recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	
	    /**
	     * add a recognizer to the manager
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer}
	     */
	    add: function(recognizer) {
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	        return recognizer;
	    },
	
	    /**
	     * remove a recognizer by name or manager
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    remove: function(recognizer) {
	        recognizer = this.get(recognizer);
	
	        var recognizers = this.recognizers;
	        for(var i = 0; i < recognizers.length; i++) {
	            if(recognizers[i] === recognizer) {
	                this.recognizers.splice(i, 1);
	                return recognizer;
	            }
	        }
	        return null;
	    },
	
	    /**
	     * destroy the manager
	     * unbinds all events
	     */
	    destroy: function() {
	        this._super.destroy.call(this);
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	});
	
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	
	function Recognizer(options) {
	    this.manager = null;
	    this.options = merge(options || {}, this.defaults);
	
	    this.state = STATE_POSSIBLE;
	    this.enabled = true;
	    this.simultaneous = [];
	}
	
	Recognizer.prototype = {
	    /**
	     * enable the recognizer
	     */
	    enable: function() {
	        this.enabled = true;
	    },
	
	    /**
	     * disable the recognizer
	     */
	    disable: function() {
	        this.enabled = false;
	    },
	
	    /**
	     * default emitter
	     * @param {Object} input
	     */
	    emit: function(input) {
	        this.manager.emit(this.options.event + this.stateStr(), input);
	    },
	
	    /**
	     * run together with an other recognizer
	     * it adds the current manager also to the other recognizer
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer} this
	     */
	    join: function(recognizer) {
	        recognizer = this.manager.get(recognizer);
	        if(!this.joins(recognizer)) {
	            this.simultaneous.push(recognizer);
	            recognizer.join(this);
	        }
	        return this;
	    },
	
	    /**
	     * split joined recognizers
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer} this
	     */
	    split: function(recognizer) {
	        recognizer = this.manager.get(recognizer);
	        var index = inArray(this.simultaneous, recognizer);
	        if(index > -1) {
	            this.simultaneous.splice(index, 1);
	            recognizer.split(this);
	        }
	        return this;
	    },
	
	    /**
	     * if this recognizer is joining the other
	     * @param {Recognizer} recognizer
	     * @returns {boolean}
	     */
	    joins: function(recognizer) {
	        return inArray(this.simultaneous, this.manager.get(recognizer)) > -1;
	    },
	
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	
	        if(!this.enabled) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	
	        if(this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	
	        // get detection state
	        this.state = this.test(inputData);
	
	        // call the emit for valid tests
	        if(this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.emit(inputData);
	        }
	    },
	
	    /**
	     * called when the gesture isn't being updated by the manager update cycle
	     * can be used by Recognizers that extend from this object
	     * @virtual
	     */
	    reset: function() { },
	
	    /**
	     * un-register the recognizer from the manager
	     */
	    remove: function() {
	        this.manager.remove(this);
	    },
	
	    /**
	     * get a usable string, used as event postfix
	     * @returns {String} state
	     */
	    stateStr: function() {
	        var state = this.state;
	        if(state & STATE_CANCELLED) {
	            return 'cancel';
	        } else if(state & STATE_ENDED) {
	            return 'end';
	        } else if(state & STATE_CHANGED) {
	            return '';
	        } else if(state & STATE_BEGAN) {
	            return 'start';
	        }
	        return '';
	    }
	};
	
	/**
	 * this recognizer is just used as a base for the simple
	 * pan, pinch, rotate and swipe recognizers
	 * @constructor
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	
	inherit(AttrRecognizer, Recognizer, {
	    defaults: {
	        pointers: 1
	    },
	
	    /**
	     * used to check if it the recognizer receives valid input, like input.distance > 10
	     * this should be overwritten
	     * @virtual
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        return input.pointers.length === this.options.pointers;
	    },
	
	    test: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if(isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if(isRecognized || isValid) {
	            if(eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if(!(state & STATE_BEGAN)) {
	                return state | STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	
	function HoldRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    this._timer = null;
	    this._input = null;
	}
	
	inherit(HoldRecognizer, Recognizer, {
	    defaults: {
	        event: 'hold',
	        pointers: 1,
	        time: 500, // minimal time of the pointer to be down (like finger on the screen)
	        movementWhile: 10 // a minimal movement is ok, but keep it low
	    },
	
	    test: function(input) {
	        var options = this.options;
	
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.movementWhile;
	        var validTime = input.deltaTime > options.time;
	
	        this._input = input;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if(!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if(input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeout(bindFn(this.emit, this), options.time);
	        }
	
	        // maybe next round
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function() {
	        this.manager.emit(this.options.event, this._input);
	    }
	});
	
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	
	    this._pX = null;
	    this._pY = null;
	}
	
	inherit(PanRecognizer, AttrRecognizer, {
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL
	    },
	
	    attrTest: function(input) {
	        var options = this.options;
	        var isNew = true;
	
	        // lock to axis
	        if(!(input.direction & options.direction)) {
	            var x = input.deltaX;
	            var y = input.deltaY;
	
	            if(options.direction & DIRECTION_HORIZONTAL) {
	                input.direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                isNew = x != this._pX;
	            } else {
	                input.direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                isNew = y != this._pY;
	            }
	        }
	
	        return this._super.attrTest.call(this, input) &&
	            input.direction & options.direction && isNew &&
	            (input.distance > options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        this._pX = input.deltaX;
	        this._pY = input.deltaY;
	
	        this._super.emit.call(this, input);
	        this.manager.emit(this.options.event + input.direction, input);
	    }
	});
	
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(PinchRecognizer, AttrRecognizer, {
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(1 - input.scale) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        this._super.emit.call(this, input);
	
	        var inOut = input.scale < 1 ? 'in' : 'out';
	        this.manager.emit(this.options.event + inOut, input);
	    }
	});
	
	function RotationRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(RotationRecognizer, AttrRecognizer, {
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(1 - input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(SwipeRecognizer, AttrRecognizer, {
	    defaults: {
	        event: 'swipe',
	        distance: 10,
	        velocity: 0.6,
	        pointers: 1
	    },
	
	    attrTest: function(input) {
	        return input.velocity > this.options.velocity &&
	            input.distance > this.options.distance &&
	            input.eventType & INPUT_END;
	    },
	
	    emit: function(input) {
	        this.manager.emit(this.options.event, input);
	        this.manager.emit(this.options.event + input.direction, input);
	    }
	});
	
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	
	    this.count = 0;
	}
	
	inherit(TapRecognizer, Recognizer, {
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        movementBetween: 10, // a multi-tap can be a bit off the initial position
	        movementWhile: 2 // a minimal movement is ok, but keep it low
	    },
	
	    test: function(input) {
	        var options = this.options;
	
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.movementWhile;
	        var validTouchTime = input.deltaTime < options.time;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if(input.eventType & INPUT_END && validMovement && validTouchTime && validPointers) {
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.movementBetween;
	
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	
	            if(!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }
	
	            var validTapCount = (this.count % options.taps === 0);
	            if(validTapCount) {
	                return STATE_RECOGNIZED;
	            }
	        }
	        return STATE_FAILED;
	    },
	
	    emit: function(input) {
	        input.tapCount = this.count;
	        this.manager.emit(this.options.event, input);
	    }
	});
	
	Hammer.EventEmitter = EventEmitter;
	Hammer.Manager = Manager;
	Hammer.Input = Input;
	Hammer.TouchAction = TouchAction;
	
	Hammer.Recognizer = Recognizer;
	Hammer.AttrRecognizer = AttrRecognizer;
	Hammer.Tap = TapRecognizer;
	Hammer.Pan = PanRecognizer;
	Hammer.Swipe = SwipeRecognizer;
	Hammer.Pinch = PinchRecognizer;
	Hammer.Rotation = RotationRecognizer;
	Hammer.Hold = HoldRecognizer;
	
	// constants
	Hammer.INPUT_START = INPUT_START;
	Hammer.INPUT_MOVE = INPUT_MOVE;
	Hammer.INPUT_END = INPUT_END;
	Hammer.INPUT_CANCEL = INPUT_CANCEL;
	
	Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
	Hammer.STATE_BEGAN = STATE_BEGAN;
	Hammer.STATE_CHANGED = STATE_CHANGED;
	Hammer.STATE_ENDED = STATE_ENDED;
	Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
	Hammer.STATE_CANCELLED = STATE_CANCELLED;
	Hammer.STATE_FAILED = STATE_FAILED;
	
	Hammer.DIRECTION_NONE = DIRECTION_NONE;
	Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
	Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
	Hammer.DIRECTION_UP = DIRECTION_UP;
	Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
	Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
	Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
	
	// expose some useful/over-writable methods
	Hammer.on = addEventListeners;
	Hammer.off = removeEventListeners;
	Hammer.each = each;
	Hammer.merge = merge;
	Hammer.extend = extend;
	Hammer.inherit = inherit;
	Hammer.bindFn = bindFn;
	Hammer.prefixed = prefixed;
	Hammer.prefixedName = prefixedName;
	
	// export to amd/module/window
	if('function' == TYPE_FUNCTION && __webpack_require__(4)) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
	        return Hammer;
	    }.call(exports, __webpack_require__, exports, module)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if(typeof module != TYPE_UNDEFINED && module.exports) {
	    module.exports = Hammer;
	} else {
	    window.Hammer = Hammer;
	}
	
	})(window);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
/******/ ])
//# sourceMappingURL=index.js.map