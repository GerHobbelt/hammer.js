var Hammer = require('hammerjs');


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

var mc = new Hammer(el, {
    touchAction: 'none'
});

mc.on("pan", onPan);
mc.on("swipe", onSwipe);
mc.on("rotate", onRotate);
mc.on("pinch", onPinch);
mc.on("tap", onTap);
mc.on("doubletap", onDoubleTap);

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
    transform.rotate = !transform.rotate ? 360 : 0;
    requestElementUpdate();
}

resetElementEnd();

document.querySelector(".device .button").addEventListener("click", function(){
    document.querySelector(".device").classList.toggle('hammertime');
}, false);
