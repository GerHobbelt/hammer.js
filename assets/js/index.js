!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="/assets/js/",e(0)}([function(t,e,n){n(1),n(2)},function(){if(!function(t,e,n){var i,s=t.getElementsByTagName(e)[0];t.getElementById(n)||(i=t.createElement(e),i.id=n,i.src="//platform.twitter.com/widgets.js",s.parentNode.insertBefore(i,s))}(document,"script","twitter-wjs"),location.href.indexOf("eightmedia.github.io")>-1){var t=t||[];t.push(["_setAccount","UA-30289566-1"]),t.push(["_trackPageview"]),function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"==document.location.protocol?"https://":"http://")+"stats.g.doubleclick.net/dc.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}()}},function(t,e,n){function i(){v.className=""}function s(){f={translate:{x:g,y:y},scale:1,rotate:0},v.className="animate",r()}function o(){var t=["translate3d("+f.translate.x+"px, "+f.translate.y+"px, 0)","scale("+f.scale+", "+f.scale+")","rotate("+f.rotate+"deg)"];v.style.webkitTransform=v.style.transform=t.join(" "),T=!1}function r(){T||(T=!0,m(o))}function a(t){f.translate={x:g+t.deltaX,y:y+t.deltaY},r()}function c(){v.style.background="black",setTimeout(function(){v.style.background="white",r()},200),r()}function u(t){f.scale=t.scale,r()}function h(t){f.rotate=t.rotation,r()}function l(){v.style.background="#fd0",setTimeout(function(){v.style.background="white",r()},200)}function p(){f.rotate=f.rotate?0:360,r()}var f,d=n(3),m=function(){return window[d.prefixedName(window,"requestAnimationFrame")]||function(t){window.setTimeout(t,1e3/60)}}(),v=document.querySelector("#hitarea"),g=Math.round((v.parentNode.offsetWidth-v.offsetWidth)/2),y=Math.round((v.parentNode.offsetHeight-v.offsetHeight)/2),T=!1,E=new d(v,{touchAction:"none"});E.on("pan",a),E.on("swipe",c),E.on("rotate",h),E.on("pinch",u),E.on("tap",l),E.on("doubletap",p),E.on("panstart rotatestart pinchstart",i),E.on("panend rotateend pinchend pancancel rotatecancel pinchcancel",s),s(),document.querySelector(".device .button").addEventListener("click",function(){document.querySelector(".device").classList.toggle("hammertime")},!1)},function(t,e,n){var i;!function(s,o){"use strict";function r(t,e){e=e||{};var n=new B(t,e);return a(n.options.recognizers,function(t){var e=n.add(new t[0](t[1]));t[2]&&e.join(t[2])}),n}function a(t,e,n){var i,s;if(t.forEach)t.forEach(e,n);else if(typeof t.length!==$)for(i=0,s=t.length;s>i;i++)e.call(n,t[i],i,t);else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function c(t,e){for(var n in e)e.hasOwnProperty(n)&&typeof t[n]==$&&(t[n]=e[n]);return t}function u(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function h(t,e,n){var i,s=e.prototype;if(Object.create)i=t.prototype=Object.create(s),i.constructor=t;else{u(t,parent);var o=function(){this.constructor=t};o.prototype=s,i=t.prototype=new o}n&&u(i,n),i._super=s}function l(t,e){return function(){return t.apply(e,arguments)}}function p(t,e,n){a(v(e),function(e){t.addEventListener(e,n,!1)})}function f(t,e,n){a(v(e),function(e){t.removeEventListener(e,n,!1)})}function d(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t){return Math.round(t)}function v(t){return t.trim().split(/\s+/g)}function g(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0,s=t.length;s>i;i++)if(n&&t[i][n]==e||!n&&t[i]===e)return i;return-1}function y(t){return Array.prototype.slice.call(t,0)}function T(t,e){for(var n=[],i=[],s=0,o=t.length;o>s;s++)g(i,t[s][e])<0&&n.push(t[s]),i[s]=t[s][e];return n}function E(t,e,n){var i=w(t,e);return i?typeof t[i]==Q?typeof n==$?l(t[i],t):t[i].apply(t,n):(n&&(t[i]=n),t[i]):o}function w(t,e){var n,i,s,r=e[0].toUpperCase()+e.slice(1);for(s=0;s<K.length;s++)if(n=K[s],i=n?n+r:e,i in t)return i;return o}function _(t,e){this.manager=t,this.callback=e,this._handler=l(this.handler,this),this.elEvents&&p(this.manager.element,this.elEvents,this._handler),this.winEvents&&p(s,this.winEvents,this._handler)}function b(t){var e;return new(e=ee?X:ie?Y:ne?k:R)(t,N)}function N(t,e,n){var i=n.pointers.length,s=n.changedPointers.length,o=e&ce&&i-s===0,r=e&he&&i-s===0;n.isFirst=o,n.isFinal=r,o&&(t.session={}),n.eventType=e,I(t,n),t.recognize(n)}function I(t,e){var n=t.session,i=e.pointers,s=i.length;n.firstInput||(n.firstInput=S(e)),s>1&&!n.firstMultiple?n.firstMultiple=S(e):1===s&&(n.firstMultiple=!1);var o=n.firstInput,r=n.firstMultiple,a=r?r.center:o.center,c=A(i);e.timeStamp=e.srcEvent.timeStamp,e.center=c,e.angle=C(a,c),e.distance=P(a,c),e.direction=O(a,c),e.deltaTime=e.timeStamp-o.timeStamp,e.deltaX=c.x-a.x,e.deltaY=c.y-a.y,e.scale=r?D(r.pointers,i):1,e.rotation=r?z(r.pointers,i):0;var u=t.element;d(e.srcEvent.target,u)&&(u=e.srcEvent.target),e.target=u,x(n,e)}function x(t,e){var n=t.lastInterval;n||(n=t.lastInterval=S(e));var i=e.timeStamp-n.timeStamp;if(i>ae||!n.velocity){var s=e.deltaX-n.deltaX,o=e.deltaY-n.deltaY;n=t.lastInterval=S(e),n.velocity=M(i,s,o)}var r=n.velocity;e.velocity=Math.max(r.x,r.y),e.velocityX=r.x,e.velocityY=r.y}function S(t){for(var e=[],n=0;n<t.pointers.length;n++)e[n]={clientX:m(t.pointers[n].clientX),clientY:m(t.pointers[n].clientY)};return{timeStamp:t.srcEvent.timeStamp,pointers:e,center:A(e),deltaX:t.deltaX,deltaY:t.deltaY}}function A(t){var e=t.length;if(1===e)return{x:m(t[0].clientX),y:m(t[0].clientY)};for(var n=0,i=0,s=0;e>s;s++)n+=t[s].clientX,i+=t[s].clientY;return{x:m(n/e),y:m(i/e)}}function M(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}}function O(t,e){var n=t.x-e.x,i=t.y-e.y;return n===i?pe:Math.abs(n)>=Math.abs(i)?n>0?fe:de:i>0?me:ve}function P(t,e,n){n||(n=Te);var i=e[n[0]]-t[n[0]],s=e[n[1]]-t[n[1]];return Math.sqrt(i*i+s*s)}function C(t,e,n){n||(n=Te);var i=e[n[0]]-t[n[0]],s=e[n[1]]-t[n[1]];return 180*Math.atan2(s,i)/Math.PI}function z(t,e){return C(e[1],e[0],Ee)-C(t[1],t[0],Ee)}function D(t,e){return P(e[0],e[1],Ee)/P(t[0],t[1],Ee)}function R(){this.elEvents=_e,this.winEvents=be,this.allow=!0,this.pressed=!1,_.apply(this,arguments)}function X(){this.elEvents=xe,this.winEvents=Se,_.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function Y(){this.elEvents=Me,_.apply(this,arguments)}function k(){_.apply(this,arguments),this.touch=new Y(this.manager,this._handler),this.mouse=new R(this.manager,this._handler)}function L(t,e){this.element=t,this.domEvents=e,this.eventHandlers={}}function j(t,e){var n=document.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}function H(t){this.manager=t}function B(t,e){this.enabled=!0,e=e||{},e.touchAction=e.touchAction||t.style.touchAction,this.options=c(e,r.defaults),L.call(this,t,this.options.domEvents),this.session={},this.recognizers=[],this.input=b(this),this.touchAction=new H(this),this.touchAction.set(this.options.touchAction)}function U(t){this.manager=null,this.options=c(t||{},this.defaults),this.state=Pe,this.enabled=!0,this.simultaneous=[]}function W(){U.apply(this,arguments)}function F(){U.apply(this,arguments),this._timer=null,this._input=null}function q(){W.apply(this,arguments),this._pX=null,this._pY=null}function G(){W.apply(this,arguments)}function V(){W.apply(this,arguments)}function Z(){W.apply(this,arguments)}function J(){U.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this.count=0}r.VERSION="2.0.0dev";var K=["","webkit","moz","MS","ms","o"],Q="function",$="undefined",te=/mobile|tablet|ip(ad|hone|od)|android|silk/i,ee=typeof w(s,"PointerEvent")!=$,ne="ontouchstart"in s,ie=ne&&te.test(navigator.userAgent),se="touch",oe="pen",re="mouse",ae=50,ce=1,ue=2,he=4,le=8,pe=1,fe=2,de=4,me=8,ve=16,ge=fe|de,ye=me|ve,Te=["x","y"],Ee=["clientX","clientY"];_.prototype={destroy:function(){this.elEvents&&f(this.manager.element,this.elEvents,this._handler),this.winEvents&&f(s,this.winEvents,this._handler)}};var we={mousedown:ce,mousemove:ue,mouseup:he,mouseout:le},_e="mousedown",be="mousemove mouseout mouseup";h(R,_,{handler:function(t){var e=we[t.type];if(e&ce&&0===t.button&&(this.pressed=!0),this.pressed&&this.allow){var n=t.relatedTarget||t.toElement;console.log(n.nodeName),"mouseout"==t.type&&"HTML"!=n.nodeName&&(e=ue),e&(he|le)&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:re,srcEvent:t})}}});var Ne={pointerdown:ce,pointermove:ue,pointerup:he,pointercancel:le,pointerout:le},Ie={2:se,3:oe,4:re},xe="pointerdown pointermove pointerup pointercancel",Se="pointerout";s.MSPointerEvent&&(xe="MSPointerDown MSPointerMove MSPointerUp MSPointerCancel",Se="MSPointerOut"),h(X,_,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),s=Ne[i],o=t.relatedTarget||t.toElement||t.target;"pointerout"==i&&"HTML"!=o.nodeName&&(s=ue),s&ce&&0===t.button?e.push(t):s&(he|le)&&(n=!0);var r=g(e,t.pointerId,"pointerId");0>r||(e[r]=t,this.callback(this.manager,s,{pointers:e,changedPointers:[t],pointerType:Ie[e[0].pointerType]||e[0].pointerType,srcEvent:t}),n&&e.splice(r,1))}});var Ae={touchstart:ce,touchmove:ue,touchend:he,touchcancel:le},Me="touchstart touchmove touchend touchcancel";h(Y,_,{handler:function(t){var e=this.normalizeTouches(t);this.callback(this.manager,Ae[t.type],{pointers:e[0],changedPointers:e[1],pointerType:se,srcEvent:t})},normalizeTouches:function(t){var e=y(t.changedTouches),n=y(t.touches).concat(e);return[T(n,"identifier"),e]}}),h(k,_,{handler:function(t,e,n){var i=n.pointerType==se,s=n.pointerType==re;if(i)this.mouse.allow=!1;else if(s&&!this.mouse.allow)return;e&he&&(this.mouse.allow=!0),this.callback(t,e,n)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}}),L.prototype={on:function(t,e){var n=this.eventHandlers;return a(v(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this},off:function(t,e){var n=this.eventHandlers;return a(v(t),function(t){e?n[t].splice(g(n[t],e),1):delete n[t]}),this},destroy:function(){this.eventHandlers={}},emit:function(t,e){this.domEvents&&j(t,e);var n=this.eventHandlers[t];if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;i++)n[i](e)}}};var Oe=typeof E(document.body.style,"touchAction")!==$;H.prototype={set:function(t){this.value=t.toLowerCase(),Oe&&E(this.manager.element.style,"touchAction",t)},update:function(t){var e=t.srcEvent;if(!Oe&&t.pointerType!=re&&t.eventType!==ce){if(this.manager.session.prevented)return void e.preventDefault();for(var n=v(this.value),i=this.values,s=0;s<n.length;s++)i[n[s]]&&i[n[s]].call(this,t,e)}},values:{none:function(t,e){this.prevent(e)},"pan-y":function(t,e){t.direction&ge&&this.prevent(e)},"pan-x":function(t,e){t.direction&ye&&this.prevent(e)}},prevent:function(t){this.manager.session.prevented=!0,t.preventDefault()}},r.defaults={domEvents:!1,touchAction:"pan-y",recognizers:[[V],[G,null,"rotate"],[q],[Z,null,"pan"],[J,{event:"doubletap",taps:2}],[J],[F]]},h(B,L,{enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},stop:function(){this.session.stopped=!0},recognize:function(t){if(this.enabled&&!this.session.stopped){this.touchAction.update(t);var e,n=this.session,i=n.curRecognizer;(!i||i&&i&Re)&&(i=n.curRecognizer=null);for(var s=0;s<this.recognizers.length;s++)e=this.recognizers[s],!i||e==i||e.joins(i)?e.recognize(t):e.reset(),!i&&e.state&(Ce|ze|De)&&(i=n.curRecognizer=e)}},get:function(t){if(t instanceof U)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){return this.recognizers.push(t),t.manager=this,t},remove:function(t){t=this.get(t);for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n]===t)return this.recognizers.splice(n,1),t;return null},destroy:function(){this._super.destroy.call(this),this.session={},this.input.destroy(),this.element=null}});var Pe=1,Ce=2,ze=4,De=8,Re=De,Xe=16,Ye=32;U.prototype={enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},emit:function(t){this.manager.emit(this.options.event+this.stateStr(),t)},join:function(t){return t=this.manager.get(t),this.joins(t)||(this.simultaneous.push(t),t.join(this)),this},split:function(t){t=this.manager.get(t);var e=g(this.simultaneous,t);return e>-1&&(this.simultaneous.splice(e,1),t.split(this)),this},joins:function(t){return g(this.simultaneous,this.manager.get(t))>-1},recognize:function(t){return this.enabled?(this.state&(Re|Xe|Ye)&&(this.state=Pe),this.state=this.test(t),void(this.state&(Ce|ze|De|Xe)&&this.emit(t))):(this.reset(),void(this.state=Ye))},reset:function(){},remove:function(){this.manager.remove(this)},stateStr:function(){var t=this.state;return t&Xe?"cancel":t&De?"end":t&ze?"":t&Ce?"start":""}},h(W,U,{defaults:{pointers:1},attrTest:function(t){return t.pointers.length===this.options.pointers},test:function(t){var e=this.state,n=t.eventType,i=e&(Ce|ze),s=this.attrTest(t);return i&&(n&le||!s)?e|Xe:i||s?n&he?e|De:e&Ce?e|ze:e|Ce:Ye}}),h(F,U,{defaults:{event:"hold",pointers:1,time:500,movementWhile:10},test:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.movementWhile,s=t.deltaTime>e.time;return this._input=t,!i||!n||t.eventType&(he|le)&&!s?this.reset():t.eventType&ce&&(this.reset(),this._timer=setTimeout(l(this.emit,this),e.time)),Ye},reset:function(){clearTimeout(this._timer)},emit:function(){this.manager.emit(this.options.event,this._input)}}),h(q,W,{defaults:{event:"pan",threshold:10,pointers:1,direction:ge|ye},attrTest:function(t){var e=this.options,n=!0;if(!(t.direction&e.direction)){var i=t.deltaX,s=t.deltaY;e.direction&ge?(t.direction=0===i?pe:0>i?fe:de,n=i!=this._pX):(t.direction=0===s?pe:0>s?me:ve,n=s!=this._pY)}return this._super.attrTest.call(this,t)&&t.direction&e.direction&&n&&(t.distance>e.threshold||this.state&Ce)},emit:function(t){this._pX=t.deltaX,this._pY=t.deltaY,this._super.emit.call(this,t),this.manager.emit(this.options.event+t.direction,t)}}),h(G,W,{defaults:{event:"pinch",threshold:0,pointers:2},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(1-t.scale)>this.options.threshold||this.state&Ce)},emit:function(t){this._super.emit.call(this,t);var e=t.scale<1?"in":"out";this.manager.emit(this.options.event+e,t)}}),h(V,W,{defaults:{event:"rotate",threshold:0,pointers:2},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(1-t.rotation)>this.options.threshold||this.state&Ce)}}),h(Z,W,{defaults:{event:"swipe",distance:10,velocity:.6,pointers:1},attrTest:function(t){return t.velocity>this.options.velocity&&t.distance>this.options.distance&&t.eventType&he},emit:function(t){this.manager.emit(this.options.event,t),this.manager.emit(this.options.event+t.direction,t)}}),h(J,U,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,movementBetween:10,movementWhile:2},test:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.movementWhile,s=t.deltaTime<e.time;if(t.eventType&he&&i&&s&&n){var o=this.pTime?t.timeStamp-this.pTime<e.interval:!0,r=!this.pCenter||P(this.pCenter,t.center)<e.movementBetween;this.pTime=t.timeStamp,this.pCenter=t.center,r&&o?this.count+=1:this.count=1;var a=this.count%e.taps===0;if(a)return Re}return Ye},emit:function(t){t.tapCount=this.count,this.manager.emit(this.options.event,t)}}),r.EventEmitter=L,r.Manager=B,r.Input=_,r.TouchAction=H,r.Recognizer=U,r.AttrRecognizer=W,r.Tap=J,r.Pan=q,r.Swipe=Z,r.Pinch=G,r.Rotation=V,r.Hold=F,r.INPUT_START=ce,r.INPUT_MOVE=ue,r.INPUT_END=he,r.INPUT_CANCEL=le,r.STATE_POSSIBLE=Pe,r.STATE_BEGAN=Ce,r.STATE_CHANGED=ze,r.STATE_ENDED=De,r.STATE_RECOGNIZED=Re,r.STATE_CANCELLED=Xe,r.STATE_FAILED=Ye,r.DIRECTION_NONE=pe,r.DIRECTION_LEFT=fe,r.DIRECTION_RIGHT=de,r.DIRECTION_UP=me,r.DIRECTION_DOWN=ve,r.DIRECTION_HORIZONTAL=ge,r.DIRECTION_VERTICAL=ye,r.on=p,r.off=f,r.each=a,r.merge=c,r.extend=u,r.inherit=h,r.bindFn=l,r.prefixed=E,r.prefixedName=w,"function"==Q&&n(4)?(i=function(){return r}.call(e,n,e,t),!(i!==o&&(t.exports=i))):typeof t!=$&&t.exports?t.exports=r:s.Hammer=r}(window)},function(t,e){(function(e){t.exports=e}).call(e,{})}]);
//# sourceMappingURL=index.js.map