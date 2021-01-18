/* #vfic now: 18 Sep 2019 03:09:22 on web250 */ 
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=t("vertx");return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?j(t,it.error):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),P(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(P,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(P,t)}function P(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function T(){this.error=null}function M(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=M(r,o),s===st?(a=!0,u=s.error,s=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"==typeof require?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new T,st=new T,ut=0;return Y.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===nt&&n<t;n++)this._eachEntry(e[n],n)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U}),ES6Promise.polyfill();
!function(e) {
function t(i) {
if (n[i]) return n[i].exports;
var o = n[i] = {
i:i,
l:!1,
exports:{}
};
return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
}
var n = {};
return t.m = e, t.c = n, t.d = function(e, n, i) {
t.o(e, n) || Object.defineProperty(e, n, {
enumerable:!0,
get:i
});
}, t.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value:"Module"
}), Object.defineProperty(e, "__esModule", {
value:!0
});
}, t.t = function(e, n) {
if (1 & n && (e = t(e)), 8 & n) return e;
if (4 & n && "object" == typeof e && e && e.__esModule) return e;
var i = Object.create(null);
if (t.r(i), Object.defineProperty(i, "default", {
enumerable:!0,
value:e
}), 2 & n && "string" != typeof e) for (var o in e) t.d(i, o, function(t) {
return e[t];
}.bind(null, o));
return i;
}, t.n = function(e) {
var n = e && e.__esModule ? function() {
return e["default"];
} :function() {
return e;
};
return t.d(n, "a", n), n;
}, t.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, t.p = "/FP/Assets/Cache/output/", t(t.s = "32180e3b922d5c235ea5");
}({
"32180e3b922d5c235ea5":function(e, t, n) {
"use strict";
function i(e) {
return e && e.__esModule ? e :{
"default":e
};
}
n("5aef2a6e3fd48bb06a74");
var o = i(n("40321bd36a95181f2464")), r = n("8fb900bc16f27fcc5612");
"undefined" != typeof jQuery && jQuery(function() {
var e = new r.NavigationSkipper(jQuery("body"), o["default"].partial(writeActivityIndicator, o["default"], void 0, !0));
e.setMainContentSelector("#main_content_container"), e.isEnabled() && (e.createSkipElement("button"), 
e.setSkipText("Skip navigation"), e.setSelectorsToNotFocus([ "mh-input-container", "g" ]), 
e.setSkipAttribute("class", "css_button css_button_big css_button_inverse"), e.setSkipAttribute("id", "skip_to_main"), 
e.setSkipAttribute("tabindex", 1), e.attachEventsToElement(), e.insertSkipElementToBody());
});
},
"40321bd36a95181f2464":function(e, t) {
e.exports = _;
},
"5aef2a6e3fd48bb06a74":function(e, t, n) {
"use strict";
n.p = window.AssetManager ? window.AssetManager.R_JS("/FP/Assets/Cache/output/") :"";
},
"8fb900bc16f27fcc5612":function(e, t, n) {
"use strict";
function i(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(e, i.key, i);
}
}
function r(e, t, n) {
return t && o(e.prototype, t), n && o(e, n), e;
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t.NavigationSkipper = void 0;
var u = 9, a = 13, c = 32, s = "Accessibility.SkipNavigationUsages", f = function() {
function e(t, n) {
i(this, e), this.$body = t, this.usageLogger = n;
}
return r(e, [ {
key:"attachEventsToElement",
value:function() {
var e = this, t = function() {
e.$skip.blur();
var t = jQuery("".concat(e.mainContentSelector, " :tabbable").concat(e.selectorsToNotFocus || "")).first();
1 === t.length && (t[0].focus(), e.$body.trigger(jQuery.Event("keyup", {
which:u
}))), e.usageLogger(s);
};
this.$skip.keyup(function(e) {
(e.which === a || e.which === c) && t();
}).mouseup(t);
}
}, {
key:"createSkipElement",
value:function(e) {
this.$skip = jQuery("<".concat(e, "></").concat(e, ">"));
}
}, {
key:"insertSkipElementToBody",
value:function() {
this.$body.prepend(this.$skip);
}
}, {
key:"setSkipAttribute",
value:function(e, t) {
this.$skip.attr(e, t);
}
}, {
key:"setSkipText",
value:function(e) {
this.$skip.text(e);
}
}, {
key:"setMainContentSelector",
value:function(e) {
this.mainContentSelector = e;
}
}, {
key:"setSelectorsToNotFocus",
value:function(e) {
e.length > 0 && (this.selectorsToNotFocus = ":not(".concat(e.join("):not("), ")"));
}
}, {
key:"isEnabled",
value:function() {
return 1 === jQuery(this.mainContentSelector).length;
}
} ]), e;
}();
t.NavigationSkipper = f;
}
});
!function(e) {
function t(r) {
if (n[r]) return n[r].exports;
var o = n[r] = {
i:r,
l:!1,
exports:{}
};
return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
}
var n = {};
return t.m = e, t.c = n, t.d = function(e, n, r) {
t.o(e, n) || Object.defineProperty(e, n, {
enumerable:!0,
get:r
});
}, t.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value:"Module"
}), Object.defineProperty(e, "__esModule", {
value:!0
});
}, t.t = function(e, n) {
if (1 & n && (e = t(e)), 8 & n) return e;
if (4 & n && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (t.r(r), Object.defineProperty(r, "default", {
enumerable:!0,
value:e
}), 2 & n && "string" != typeof e) for (var o in e) t.d(r, o, function(t) {
return e[t];
}.bind(null, o));
return r;
}, t.n = function(e) {
var n = e && e.__esModule ? function() {
return e["default"];
} :function() {
return e;
};
return t.d(n, "a", n), n;
}, t.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, t.p = "/FP/Assets/Cache/output/", t(t.s = "06a9388f0fc8300874b6");
}({
"06a9388f0fc8300874b6":function(e, t, n) {
"use strict";
function r(e) {
return e && e.__esModule ? e :{
"default":e
};
}
n("5aef2a6e3fd48bb06a74");
var o = r(n("7b3a0df1871481a8dfa7"));
n("138aabf72feace629f41"), window.lazyAssetLoad = o["default"];
},
"138aabf72feace629f41":function(e, t) {},
"31de81aa928a3cd8dcb7":function(e, t, n) {
"use strict";
function r(e) {
return e && e.__esModule ? e :{
"default":e
};
}
function o(e, t) {
return a || (a = new u["default"](e, t), a.js = _.memoize(a.js).bind(a), a.css = _.memoize(a.css).bind(a)), 
a;
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t["default"] = o;
var a, u = r(n("731dba97d21e75928556"));
},
"40321bd36a95181f2464":function(e, t) {
e.exports = _;
},
"5aef2a6e3fd48bb06a74":function(e, t, n) {
"use strict";
n.p = window.AssetManager ? window.AssetManager.R_JS("/FP/Assets/Cache/output/") :"";
},
"67a8124183eed213b6b0":function(e, t, n) {
"use strict";
function r(e) {
return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} :function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :typeof e;
})(e);
}
function o(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :function() {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :new XMLHttpRequest(), r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] :f.WARNING_SEVERITY;
return n.open("POST", g, !0), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), 
n.onerror = t, n.send("errorMsg=".concat(e, "&severity=").concat(r)), n;
}
function a() {
for (var e = arguments.length, t = new Array(e), n = 0; e > n; n++) t[n] = arguments[n];
var o;
return o = 1 === arguments.length ? "object" === r(arguments[0]) && arguments[0] instanceof Object && !(arguments[0] instanceof Error) ? arguments[0] :{} :"object" === r(arguments[1]) && arguments[1] instanceof Object && !(arguments[1] instanceof Error) ? arguments[1] :{}, 
"string" == typeof arguments[0] || arguments[0] instanceof String ? o.message = arguments[0] :"object" === r(arguments[0]) && arguments[0] instanceof Error && (o.error = arguments[0], 
o.logSeverity = o.logSeverity || f.INFO_SEVERITY), arguments.length > 1 && ("string" == typeof arguments[1] || arguments[1] instanceof String ? o.logSeverity = arguments[1] :"object" === r(arguments[1]) && arguments[1] instanceof Error && (o.error = arguments[1], 
o.logSeverity = o.logSeverity || f.INFO_SEVERITY)), o.logSeverity = o.logSeverity || f.DEBUG_SEVERITY, 
o;
}
function u(e) {
var t = e.logSeverity, n = e.featureFlag, r = d.getWindow(), o = r[E];
return !o || !o.enabled || (o.logMessageCount = o.logMessageCount || 0, n && !r[n] || (o.logLevel = o.logLevel || f.getLogLevel(o.logSeverity), 
f.getLogLevel(t) < o.logLevel || o.logMessageCount > o.maxLogMessages)) ? void 0 :(o.logMessageCount++, 
!0);
}
function i(e) {
var t;
if (e) if (e.stack) t = e.stack; else try {
throw e;
} catch (n) {
t = n.stack || y;
}
return t;
}
function c(e, t) {
var n = t && "".concat(v, "= ").concat(t.message || b);
return e && n ? "".concat(e, " ").concat(n) :e || n || "";
}
function s(e, t) {
var n = d.getWindow(), r = n[p];
return e = r ? "".concat(m, " clientRequestId= ").concat(r, ", ").concat(e) :"".concat(m, " ").concat(e), 
t && (e = "".concat(e, "&trace=").concat(t)), e;
}
function l(e, t) {
t = a.apply(void 0, arguments), u(t) && (e = c(t.message, t.error), t.logSeverity === f.DEBUG_SEVERITY && console.log(e, t.error), 
o(s(e, i(t.error)), t.onerror, t.xhr, t.logSeverity));
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t.logError = o, t.quickLog = l, t.JS_ERROR_LOG_API = void 0;
var f = n("cd3e9067639bd712e883"), d = n("c27cdd1b7c76313bdfab"), g = "/FP/API/ErrorLog/js_error_log.php";
t.JS_ERROR_LOG_API = g;
var m = "CLIENT-LOG", v = "ERROR", b = "GENERAL ERROR", y = "cant determine stack", p = "mhRequestId", E = "mhQuickLogConfiguration";
},
"698d75b157f24ae829cc":function(e, t) {
var n;
n = function() {
return this;
}();
try {
n = n || new Function("return this")();
} catch (r) {
"object" == typeof window && (n = window);
}
e.exports = n;
},
"731dba97d21e75928556":function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
function a(e, t, n) {
return t && o(e.prototype, t), n && o(e, n), e;
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t["default"] = void 0;
var u = /loaded|complete/, i = function() {
function e(t, n) {
r(this, e), this._document = t, this._Promise = n;
}
return a(e, [ {
key:"js",
value:function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :{}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :null;
return t = _.extend({
src:e,
async:1,
crossOrigin:"anonymous"
}, t), this.loadFile("script", t, n);
}
}, {
key:"css",
value:function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :{}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :null;
return t = _.extend({
href:e,
type:"text/css",
rel:"stylesheet",
crossOrigin:"anonymous"
}, t), this.loadFile("link", t, n);
}
}, {
key:"loadFile",
value:function(e) {
var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :{}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :null;
return new this._Promise(function(o, a) {
function i(t, n) {
(n || !l.readyState || u.test(l.readyState)) && (s(), n ? a("aborted loading file for tag ".concat(e)) :o(l));
}
function c(e) {
s(), a(e);
}
function s() {
l.onload = l.onreadystatechange = l.onerror = null;
}
var l = t._document.createElement(e), f = r;
null === f && (f = t._document.getElementsByTagName(e)[0]), f && f.parentNode && f.parentNode.insertBefore(l, f), 
l.onload = l.onreadystatechange = i, l.onerror = c;
for (var d in n) l[d] = n[d];
});
}
} ]), e;
}();
t["default"] = i;
},
"7b3a0df1871481a8dfa7":function(e, t, n) {
"use strict";
function r(e) {
return e && e.__esModule ? e :{
"default":e
};
}
function o(e, t) {
var n = e.js, r = e.css, o = void 0 === r ? [] :r, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :window, l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] :{}, f = l.attributes, d = s.document, g = void 0 === d ? {} :d, m = s.Promise, v = void 0 === m ? {} :m, b = s.writeActivityIndicator, y = void 0 === b ? c["default"].noop :b, p = i["default"](g, v), E = o.map(function(e) {
return p.css(e);
}), _ = n.reduce(function(e, t) {
return e.then(function() {
return v.all(t.filter(function(e) {
return !a(e);
}).map(function(e) {
return p.js(e, f);
}));
});
}, v.resolve());
return E.push(_), v.all(E)["catch"](function(e) {
y(t), u.logError("Could not lazy load script: " + e);
});
}
function a(e) {
return c["default"].isElement(document.querySelector('[src="'.concat(e, '"]')));
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t["default"] = o;
var u = n("67a8124183eed213b6b0"), i = r(n("31de81aa928a3cd8dcb7")), c = r(n("40321bd36a95181f2464"));
},
c27cdd1b7c76313bdfab:function(e, t, n) {
"use strict";
(function(e) {
function n() {
var t = null;
return "undefined" != typeof window && "Window" === window.constructor.name ? t = window :"undefined" != typeof e && (t = e), 
t;
}
function r() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :window;
return e;
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t.getGlobal = n, t.getWindow = r;
}).call(this, n("698d75b157f24ae829cc"));
},
cd3e9067639bd712e883:function(e, t, n) {
"use strict";
function r(e, t, n) {
return t in e ? Object.defineProperty(e, t, {
value:n,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[t] = n, e;
}
function o() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :u;
return d[e];
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t.getLogLevel = o, t.CRITICAL_SEVERITY = t.NOTICE_SEVERITY = t.WARNING_SEVERITY = t.ERROR_SEVERITY = t.INFO_SEVERITY = t.DEBUG_SEVERITY = void 0;
var a, u = "debug";
t.DEBUG_SEVERITY = u;
var i = "info";
t.INFO_SEVERITY = i;
var c = "error";
t.ERROR_SEVERITY = c;
var s = "warning";
t.WARNING_SEVERITY = s;
var l = "notice";
t.NOTICE_SEVERITY = l;
var f = "critical";
t.CRITICAL_SEVERITY = f;
var d = (a = {}, r(a, u, 0), r(a, i, 1), r(a, l, 2), r(a, s, 3), r(a, c, 4), r(a, f, 5), 
a);
}
});
!function(e) {
function t(n) {
if (r[n]) return r[n].exports;
var o = r[n] = {
i:n,
l:!1,
exports:{}
};
return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
}
var r = {};
return t.m = e, t.c = r, t.d = function(e, r, n) {
t.o(e, r) || Object.defineProperty(e, r, {
enumerable:!0,
get:n
});
}, t.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value:"Module"
}), Object.defineProperty(e, "__esModule", {
value:!0
});
}, t.t = function(e, r) {
if (1 & r && (e = t(e)), 8 & r) return e;
if (4 & r && "object" == typeof e && e && e.__esModule) return e;
var n = Object.create(null);
if (t.r(n), Object.defineProperty(n, "default", {
enumerable:!0,
value:e
}), 2 & r && "string" != typeof e) for (var o in e) t.d(n, o, function(t) {
return e[t];
}.bind(null, o));
return n;
}, t.n = function(e) {
var r = e && e.__esModule ? function() {
return e["default"];
} :function() {
return e;
};
return t.d(r, "a", r), r;
}, t.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, t.p = "/FP/Assets/Cache/output/", t(t.s = "5f8a61fc136fe3d936f3");
}({
"5aef2a6e3fd48bb06a74":function(e, t, r) {
"use strict";
r.p = window.AssetManager ? window.AssetManager.R_JS("/FP/Assets/Cache/output/") :"";
},
"5f8a61fc136fe3d936f3":function(e, t, r) {
"use strict";
r("5aef2a6e3fd48bb06a74");
var n = r("67a8124183eed213b6b0"), o = r("c27cdd1b7c76313bdfab");
o.getWindow().logError = n.logError, o.getWindow().quickLog = n.quickLog;
},
"67a8124183eed213b6b0":function(e, t, r) {
"use strict";
function n(e) {
return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} :function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :typeof e;
})(e);
}
function o(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :function() {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :new XMLHttpRequest(), n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] :f.WARNING_SEVERITY;
return r.open("POST", d, !0), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), 
r.onerror = t, r.send("errorMsg=".concat(e, "&severity=").concat(n)), r;
}
function a() {
for (var e = arguments.length, t = new Array(e), r = 0; e > r; r++) t[r] = arguments[r];
var o;
return o = 1 === arguments.length ? "object" === n(arguments[0]) && arguments[0] instanceof Object && !(arguments[0] instanceof Error) ? arguments[0] :{} :"object" === n(arguments[1]) && arguments[1] instanceof Object && !(arguments[1] instanceof Error) ? arguments[1] :{}, 
"string" == typeof arguments[0] || arguments[0] instanceof String ? o.message = arguments[0] :"object" === n(arguments[0]) && arguments[0] instanceof Error && (o.error = arguments[0], 
o.logSeverity = o.logSeverity || f.INFO_SEVERITY), arguments.length > 1 && ("string" == typeof arguments[1] || arguments[1] instanceof String ? o.logSeverity = arguments[1] :"object" === n(arguments[1]) && arguments[1] instanceof Error && (o.error = arguments[1], 
o.logSeverity = o.logSeverity || f.INFO_SEVERITY)), o.logSeverity = o.logSeverity || f.DEBUG_SEVERITY, 
o;
}
function u(e) {
var t = e.logSeverity, r = e.featureFlag, n = l.getWindow(), o = n[R];
return !o || !o.enabled || (o.logMessageCount = o.logMessageCount || 0, r && !n[r] || (o.logLevel = o.logLevel || f.getLogLevel(o.logSeverity), 
f.getLogLevel(t) < o.logLevel || o.logMessageCount > o.maxLogMessages)) ? void 0 :(o.logMessageCount++, 
!0);
}
function c(e) {
var t;
if (e) if (e.stack) t = e.stack; else try {
throw e;
} catch (r) {
t = r.stack || E;
}
return t;
}
function i(e, t) {
var r = t && "".concat(v, "= ").concat(t.message || b);
return e && r ? "".concat(e, " ").concat(r) :e || r || "";
}
function s(e, t) {
var r = l.getWindow(), n = r[y];
return e = n ? "".concat(m, " clientRequestId= ").concat(n, ", ").concat(e) :"".concat(m, " ").concat(e), 
t && (e = "".concat(e, "&trace=").concat(t)), e;
}
function g(e, t) {
t = a.apply(void 0, arguments), u(t) && (e = i(t.message, t.error), t.logSeverity === f.DEBUG_SEVERITY && console.log(e, t.error), 
o(s(e, c(t.error)), t.onerror, t.xhr, t.logSeverity));
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t.logError = o, t.quickLog = g, t.JS_ERROR_LOG_API = void 0;
var f = r("cd3e9067639bd712e883"), l = r("c27cdd1b7c76313bdfab"), d = "/FP/API/ErrorLog/js_error_log.php";
t.JS_ERROR_LOG_API = d;
var m = "CLIENT-LOG", v = "ERROR", b = "GENERAL ERROR", E = "cant determine stack", y = "mhRequestId", R = "mhQuickLogConfiguration";
},
"698d75b157f24ae829cc":function(e, t) {
var r;
r = function() {
return this;
}();
try {
r = r || new Function("return this")();
} catch (n) {
"object" == typeof window && (r = window);
}
e.exports = r;
},
c27cdd1b7c76313bdfab:function(e, t, r) {
"use strict";
(function(e) {
function r() {
var t = null;
return "undefined" != typeof window && "Window" === window.constructor.name ? t = window :"undefined" != typeof e && (t = e), 
t;
}
function n() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :window;
return e;
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t.getGlobal = r, t.getWindow = n;
}).call(this, r("698d75b157f24ae829cc"));
},
cd3e9067639bd712e883:function(e, t, r) {
"use strict";
function n(e, t, r) {
return t in e ? Object.defineProperty(e, t, {
value:r,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[t] = r, e;
}
function o() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :u;
return l[e];
}
Object.defineProperty(t, "__esModule", {
value:!0
}), t.getLogLevel = o, t.CRITICAL_SEVERITY = t.NOTICE_SEVERITY = t.WARNING_SEVERITY = t.ERROR_SEVERITY = t.INFO_SEVERITY = t.DEBUG_SEVERITY = void 0;
var a, u = "debug";
t.DEBUG_SEVERITY = u;
var c = "info";
t.INFO_SEVERITY = c;
var i = "error";
t.ERROR_SEVERITY = i;
var s = "warning";
t.WARNING_SEVERITY = s;
var g = "notice";
t.NOTICE_SEVERITY = g;
var f = "critical";
t.CRITICAL_SEVERITY = f;
var l = (a = {}, n(a, u, 0), n(a, c, 1), n(a, g, 2), n(a, s, 3), n(a, i, 4), n(a, f, 5), 
a);
}
});
function trim(e) {
return e.replace(/^\s*|\s*$/g, "");
}

setCookie("userTimezone", new Date().getTimezoneOffset());
function htmlStrip(e) {
return e.replace(htmlStripRE, "");
}

function replaceParameter(e, t, n) {
var a, r = e.indexOf("&" + t + "=");
if (-1 == r && (r = e.indexOf("?" + t + "=")), -1 == r) {
var o = e.indexOf("?");
a = e += -1 != o ? "&" + t + "=" + n :"?" + t + "=" + n;
} else {
parameterStartsHere = r + t.length + 2;
var i = e.indexOf("&", parameterStartsHere);
a = -1 == i ? e.substr(0, parameterStartsHere) + n :e.substr(0, parameterStartsHere) + n + e.substr(i, e.length);
}
return a;
}

function replaceSessionParameter(e, t) {
return replaceParameter(e, "u", t);
}

function extractParameterValueFromURL(e, t) {
var n = null, a = e.indexOf("&" + t + "=");
if (-1 == a && (a = e.indexOf("?" + t + "=")), -1 != a) {
parameterStartsHere = a + 2 + t.length;
var r = e.indexOf("&", parameterStartsHere);
-1 == r && (r = e.length), n = e.substring(parameterStartsHere, r);
}
return n;
}

function invokeFlashURL(e, t) {
if ("" == t) return void (document.location.href = e);
var n = t.split(","), a = e, r = "?";
for (i = 0; i < n.length; i++) a += r, a += n[i], r = "&";
document.location.href = a;
}

function toggleAdvancedSearch() {
var e = document.getElementById("advanced");
"on" == e.className ? (setInnerText("simpleAdvancedLink", ShowAdvancedSearch), e.className = "off") :(setInnerText("simpleAdvancedLink", HideAdvancedSearch), 
e.className = "on"), "function" == typeof toggleAdvanceSearchCallBack && toggleAdvanceSearchCallBack();
}

function getBoundedDimensions(e, t, n, a) {
var r = new Array(2);
if (n >= e && a >= t) return r.width = e, r.height = t, r;
var o = e / n, i = t / a;
return o > i ? (r.width = Math.round(e / o), r.height = Math.round(t / o)) :(r.width = Math.round(e / i), 
r.height = Math.round(t / i)), r;
}

function grabFieldFocus(e) {
var t = document.getElementById(e);
t && t.focus();
}

function selectFieldContent(e) {
var t = document.getElementById(e);
t && t.select();
}

function getEventCode(e) {
if (!e) var e = window.event;
var t;
if (e.keyCode) t = e.keyCode; else {
if (!e.which) return 0;
t = e.which;
}
return t;
}

function isEmpty(e) {
return "undefined" == typeof e || null == e ? !0 :"" == trim(e) ? !0 :!1;
}

function normalizeGenoogleString2(e) {
for (var t, n = "", a = "0123456789", r = 0; r < e.length; r++) t = e.charAt(r), 
"'" != t && '"' != t && -1 == a.indexOf(t) && (n += t);
return n;
}

function soundex(e) {
var t = / v | v\. | vel | aka | f | f. | r | r. | false | recte | on zhe /gi;
e = e.replace(t, "/");
var n = "", a = e.split(/[\s|,]+/);
for (var r in a) a[r].length > 0 && 0 != r && (n += GROUPSEPARATOR);
}

function getPositionAndDimension(e) {
for (var t = e.offsetLeft, n = e.offsetTop, a = e.offsetWidth, r = e.offsetHeight; null != e.offsetParent; ) elementParent = e.offsetParent, 
t += elementParent.offsetLeft, n += elementParent.offsetTop, e = elementParent;
var o = new Array(4);
return o.left = t, o.top = n, o.width = a, o.height = r, o;
}

function handleSuperSearchKeyUp(e, t, n, a) {
var r = trim(t.query.value), o = getEventCode(e);
13 == o ? r.length >= a && performSuperSearch(t, n) :r.length < a ? disableButton(n) :enableButton(n);
}

function performSuperSearch(e, t) {
return e.query.value = trim(e.query.value), "" != t && disableButton(t), e.submit(), 
!1;
}

function fl_performSuperSearch(e, t, n) {
return e.query.value = trim(e.query.value), "" == e.query.value ? !1 :e.query.value.length < t ? (alert(n), 
!1) :!0;
}

function openCenteredPopup2(e, t, n, a, r, o, i, l) {
var s = "no", u = r.indexOf("scroll");
if (-1 != u) {
var c = r.indexOf(";", u);
s = -1 == c ? r.substring(u + 7, r.length) :r.substring(u + 7, c), ("yes" == s || "1" == s || "on" == s) && (s = "auto");
}
internalDoNotCallThisPopup(e, t, n, s, o, !1, i, l);
}

function isDateLegal(e, t, n) {
var a = parseInt(e, 10), a = parseInt(e, 10);
if (a > 30 && (4 == t || 6 == t || 9 == t || 11 == t)) return !1;
if (2 == t) {
var r = n % 4 == 0 && n % 100 != 0 || n % 400 == 0 ? !0 :!1;
if (!r && a > 28) return !1;
if (r && a > 29) return !1;
}
return !0;
}

function getFormGroup(e) {
return document.getElementsByName(e);
}

function getRadio(e) {
var t = getFormGroup(e);
if (t) for (i = 0; i < t.length; i++) if (t[i].checked) return t[i];
return null;
}

function getRadioValue(e) {
var t = getRadio(e);
return t ? t.value :"";
}

function generateRandomString(e) {
for (var t = "", n = 0; e > n; n++) {
var a = Math.random();
a = parseInt(1e3 * a), a = a % 25 + 65, t += String.fromCharCode(a);
}
return t;
}

function setInnerText(e, t) {
var n = document.getElementById(e);
setObjInnerText(n, t);
}

function setObjInnerText(e, t) {
e && (document.all ? e.innerText = t :e.textContent = t);
}

function getObjInnerText(e) {
return e ? document.all ? e.innerText :e.textContent :void 0;
}

function prepareTextForJavascript(e) {
if ("string" == typeof e) {
var t = "";
if (0 == e.length) return "!";
var n = encodeURIComponent(e);
n = n.replace(/%/g, "!");
for (var a = 33, r = 0; r < n.length; r++) {
var o = n.charCodeAt(r);
o == a ? (t += n.substr(r, 3), r += 2) :t += "!" + tohex(o);
}
return t;
}
return "!" + e;
}

function tohex(e) {
var t = "", n = hexQuot(e), a = e - 16 * n;
for (t = itohex(a) + t; n >= 16; ) {
var r = hexQuot(n);
a = n - 16 * r, t = itohex(a) + t, n = r;
}
var o = itohex(n);
return o + t;
}

function hexQuot(e) {
return Math.floor(e / 16);
}

function itohex(e) {
return 0 == e ? aa = "0" :1 == e ? aa = "1" :2 == e ? aa = "2" :3 == e ? aa = "3" :4 == e ? aa = "4" :5 == e ? aa = "5" :6 == e ? aa = "6" :7 == e ? aa = "7" :8 == e ? aa = "8" :9 == e ? aa = "9" :10 == e ? aa = "A" :11 == e ? aa = "B" :12 == e ? aa = "C" :13 == e ? aa = "D" :14 == e ? aa = "E" :15 == e && (aa = "F"), 
aa;
}

function replace(e, t, n) {
var a = e.indexOf(t), r = "", o = -1 != a;
return o || ("&" == t.charAt(0) && 0 == n.indexOf(t) && (t = "?" + t.substring(1), 
n = "?" + n.substring(1), a = e.indexOf(t), o = -1 != a), o) ? (r += e.substring(0, a) + n, 
a + t.length < e.length && (r += replace(e.substring(a + t.length, e.length), t, n)), 
r) :e;
}

function getExtension(e) {
var t = e.lastIndexOf(".");
return -1 == t ? "" :t == e.length - 1 ? "" :e.substring(t + 1, e.length);
}

function getRandomNumber(e) {
var t = e, n = new Date(), a = n.getSeconds(), r = Math.floor(Math.random(a) * t);
return r;
}

function renderHeader(e, t, n, a, r) {
if (1 == issetFlash && 1 != oldOpera) {
var o = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
o += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" ', 
o += 'WIDTH="' + r + '" HEIGHT="30" id="text_b"><PARAM NAME=movie VALUE="/FP/Flash/text_b.swf">', 
o += '<PARAM NAME=FlashVars VALUE="tf_text=' + e + "&&lang=0&&tf_align=left&&tf_color=0x2C506A", 
o += "&&tf_size=" + t + "&&tf_bold=1&&tf_x=0&&tf_y=" + n + "&&tf_w=" + r + "&&tf_h=30", 
o += '&&tf_sc=0x000000&&tf_sa=0&&tf_so=0&"><PARAM NAME=quality VALUE=high><PARAM NAME="WMode" ', 
o += ' VALUE="Transparent"><PARAM NAME=scale VALUE=noscale><PARAM NAME=salign VALUE=LT> ', 
o += '<PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src="/FP/Flash/text_b.swf" ', o += 'FlashVars="tf_text=' + e + "&&lang=0&&tf_align=left&&tf_color=0x2C506A&&tf_size=" + t, 
o += "&&tf_bold=1&&tf_x=0&&tf_y=" + n + "&&tf_w=" + r + "&&tf_h=30&&tf_sc=0x000000&&tf_sa=0", 
o += '&&tf_so=0&" quality=high scale=noscale salign=LT bgcolor=#FFFFFF  wmode="transparent" ', 
o += 'WIDTH="' + r + '" HEIGHT="30" NAME="text_b" TYPE="application/x-shockwave-flash" ', 
o += 'PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>', 
document.write(o);
}
}

function renderLMenu(e, t, a, r) {
if ("LTR" == r) var o = "img", l = "left", s = "right"; else var o = "img_rtl", l = "right", s = "left";
var u = "";
for (i = 0; i < e.length; i++) {
for (u += '<table width="174" border="0" cellspacing="0" cellpadding="0" style="display:none;', 
u += 'border-top:1px solid #F0F1EE; border-bottom:1px solid #F0F1EE;" id="mh' + i + '_norm">', 
u += '<tr><td height="20" align="' + l + '" valign="middle" ', u += 'background="/FP/Company/' + o + '/left_menu/line_bg.png" ', 
u += 'style="background-position:' + l + ";background-repeat:repeat-y;padding-" + l + ':14px;">', 
u += '<span class="leftMenuTitle">' + e[i] + "</span></td></tr></table>\n", u += '<table width="174" border="0" cellspacing="0" cellpadding="0" id="mh' + i + '_act" style="display:none;">', 
u += '<tr><td width="11" height="20" align="center" valign="middle" bgcolor="#7DAB40">', 
u += '<img src="/FP/Company/' + o + '/left_menu/wh_arrow.gif" width="9" height="7" ', 
u += 'hspace="1" style="margin-top:1px;"></td><td background="/FP/Company/' + o + '/left_menu/green_grad.png" ', 
u += 'bgcolor="#7DAB40" style="background-position:' + s + ';background-repeat:no-repeat;">', 
u += '<span style="font-size:14px;color:#FFFFFF;margin-' + l + ':3px;"><b>' + e[i] + "</b></span>", 
u += '</td></tr><tr><td height="1" colspan="2" bgcolor="#FFFFFF"><img width="1" height="1"></td></tr></table>\n', 
u += '<table width="174" border="0" cellspacing="0" cellpadding="0" id="mh' + i + '_menu" style="display:none;">\n', 
n = 0; n < t[i].length; n++) 0 != n && (u += '<tr><td colspan="2"><img src="/FP/Company/' + o + '/left_menu/line_sep.png" width="174" height="1"></td></tr>\n'), 
LMactive == i && LMsubactive == n ? attributes1 = ' align="' + s + '" valign="middle" style="border-' + l + ":1px solid #C3CDE1;" :attributes1 = ' background="/FP/Company/' + o + '/left_menu/line_bg.png" style="border-' + l + ":1px solid #B2C0DA;", 
0 == n && i == LMactive ? (attributes1 += 'border-top:1px solid #CACBC6;"', attributes2 = ' style="border-top:1px solid #CACBC6;"') :(attributes1 += '"', 
attributes2 = ""), u += '<tr><td width="30" height="20"' + attributes1 + ">\n", 
u += LMactive == i && LMsubactive == n ? '<img src="/FP/Company/' + o + '/left_menu/green_arrow.gif" width="9" height="7" hspace="1">\n' :"&nbsp;", 
u += "</td><td" + attributes2 + ' width="144">\n', LMactive == i && LMsubactive == n ? u += '<span class="leftMenuActive">' :(u += '<a href="' + a[i][n] + '" onMouseOver="window.status=\'', 
u + replace(t[i][n], "'", "\\'") + "'; return true\" "), u += t[i][n], u += LMactive == i && LMsubactive == n ? "</span>\n" :"</a>\n", 
u += "</td></tr>\n";
u += "</table>\n";
}
document.write(u), leftMenu(LMactive);
}

function leftMenu(e) {
for (i = 0; i < Lmenu.length; i++) i != e && (document.getElementById("mh" + i + "_norm").style.display = "", 
document.getElementById("mh" + i + "_act").style.display = "none", document.getElementById("mh" + i + "_menu").style.display = "");
document.getElementById("mh" + e + "_norm").style.display = "none", document.getElementById("mh" + e + "_act").style.display = "", 
document.getElementById("mh" + e + "_menu").style.display = "", LMactive = e;
}

function closePopup() {
parent.hidePopWin(!0);
}

function getPopupParent() {
return parent.doNotCallThisFunctionGetPopupParent();
}

function convertArrayToParameterList(e) {
var t = "";
for (i = 0; i < e.length; i++) t += "'" + replace("" + e[i], "'", "\\'") + "'", 
i < e.length - 1 && (t += ", ");
return t;
}

function in_array(e, t) {
var n, a;
for (a = !1, n = 0; n < t.length; n++) if (e == t[n]) return !0;
return a;
}

function isNaturalNumber(e) {
var t, n = "0123456789";
for (i = 0; i < e.length; i++) if (t = e.charAt(i), -1 == n.indexOf(t)) return !1;
return !0;
}

function isDigit(e) {
var t = "0123456789";
return -1 == t.indexOf(e) ? !1 :!0;
}

function includeProfanity(e) {
for (var t = [ "fuck", "cunt" ], n = [ "shit", "test" ], a = 0; a < t.length; a++) if (-1 != e.indexOf(t[a])) return !0;
for (var a = 0; a < n.length; a++) if (e.toLowerCase() == n[a]) return !0;
return !1;
}

function doesStartWithForbiddenCharacter(e) {
for (var t = [ "!", "'", ",", "." ], n = e.charAt(0), a = 0; a < t.length; a++) if (n == t[a]) return !0;
return !1;
}

function finishedContactMember(e) {
restoreButton("buttonSend", !0), resetComposeForm(), toggleWindowPopup(popupLoaded);
}

function cancelMessageClicked() {
resetComposeForm(), toggleWindowPopup(popupLoaded);
}

function collapseExpandWidget(e, t, n) {
var a = "", r = jQuery("#" + e), o = jQuery("#" + e + "_minimize img"), i = jQuery("#" + e + "_Links");
r.is(":visible") ? (o.removeClass("ClickableCollapse").addClass("ClickableExpand").attr("title", EXPAND_TITLE), 
i.hide(), r.slideUp("slow"), a = "c") :(o.removeClass("ClickableExpand").addClass("ClickableCollapse").attr("title", COLLAPSE_TITLE), 
i.show(), r.slideDown("slow"), a = "e"), t && t(a);
}

function toggleDiv(e, t) {
obj = document.getElementById(t), "none" == obj.style.display ? (0 != e && (document.all ? (y = e.clientY + 10 + (document.documentElement.scrollTop ? document.documentElement.scrollTop :document.body.scrollTop), 
x = e.clientX + 10 + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft :document.body.scrollLeft)) :(y = e.pageY + 10, 
x = e.pageX + 10), x += 20, obj.style.position = "absolute", obj.style.top = y + "px", 
obj.style.left = x + "px"), obj.style.display = "block") :obj.style.display = "none";
}

function toggleButton(e, t) {
"on" != t && "off" != t && (t = "off"), othermode = "on" == t ? "off" :"on", document.getElementById(e + "_" + t).style.display = "block", 
document.getElementById(e + "_" + othermode).style.display = "none";
}

function setCursorPosition(e, t) {
if (e.createTextRange) {
var n = e.createTextRange();
n.move("character", t), n.select();
} else e.selectionStart && (e.focus(), e.setSelectionRange(t, t));
}

function highlightImage(e, t) {
var n = "NewsFeedOuterFrame";
t && (n = "NewsFeedOuterFrameHighlighted"), obj = document.getElementById("Frame_" + e), 
obj.className = n;
}

function tabsPos() {
1 == issetFlash && ("left" == displayLanguageDirection ? document.getElementById("tabs").style.left = Math.ceil((document.body.clientWidth - 755) / 2) + 203 :document.getElementById("tabs").style.right = Math.ceil((document.body.clientWidth - 755) / 2) + 203);
}

function disableRadioControl(e) {
var t = document.getElementById(e);
t && (t.disabled = !0);
var n = document.getElementById(e + "Label");
n && (n.style.cursor = "default;");
}

function enableRadioControl(e) {
var t = document.getElementById(e);
t && (t.disabled = !1);
var n = document.getElementById(e + "Label");
n && (n.style.cursor = "cursor:pointer;");
}

function disableCheckboxControl(e) {
var t = document.getElementById(e);
t && (t.disabled = !0);
var n = document.getElementById(e + "Label");
n && (n.style.cursor = "default");
var a = document.getElementById(e + "Inner");
a && (a.className = "FL_LabelDimmed");
}

function enableCheckboxControl(e) {
var t = document.getElementById(e);
t && (t.disabled = !1);
var n = document.getElementById(e + "Label");
n && (n.style.cursor = "pointer");
var a = document.getElementById(e + "Inner");
a && (a.className = "Checkbox");
}

function changeButtonCaption(e, t) {
var n = document.getElementById("buttonCenter" + e);
n.innerHTML = t;
}

function changeAccountCenterButtonCaption(e, t) {
var n = document.getElementById("acountCenterButtonCaption" + e);
n.innerHTML = t;
}

function changeAccountCenterButtonSubcaption(e, t) {
var n = document.getElementById("acountCenterButtonSubCaption" + e);
n.innerHTML = t;
}

function getDateEntryValidationObj(e) {
var t = new Object();
t.daySelect = document.getElementById("day" + e), t.monthSelect = document.getElementById("month" + e), 
t.yearInput = document.getElementById("year" + e), t.selectedDay = t.daySelect.value, 
t.selectedMonth = t.monthSelect.value, t.selectedYear = t.yearInput.value, t.daySelect.selectedIndex < 0 || "0" == t.daySelect.value ? t.isDayMissing = !0 :t.isDayMissing = !1, 
t.monthSelect.selectedIndex < 0 || "0" == t.monthSelect.value ? t.isMonthMissing = !0 :t.isMonthMissing = !1, 
"" == t.yearInput.value ? t.isYearMissing = !0 :t.isYearMissing = !1, isNaN(parseInt(t.yearInput.value)) || parseInt(t.yearInput.value) != t.yearInput.value ? t.isYearValid = !1 :t.isYearValid = !0;
var n = parseInt(t.daySelect.value, 10), a = parseInt(t.monthSelect.value, 10), r = parseInt(t.yearInput.value, 10), o = new Date(), i = o.getFullYear() + 1;
return o.setDate(1), o.setFullYear(r), o.setMonth(a - 1), o.setDate(n), (1e3 > r || r > i) && (t.isYearValid = !1), 
1e3 > r || r > i || o.getFullYear() != r || o.getMonth() != a - 1 || o.getDate() != n ? t.isDateValid = !1 :t.isDateValid = !0, 
t;
}

function linkWithIconRoll(e, t, n, a) {
var r = document.getElementById(e), o = document.getElementById(e + "Icon");
r && o && (o.className = t, r.className = n);
}

function displayGeneralTooltip(e, t, n, a, r, o) {
hideAllBalloons(!0), updateBalloonLocation(e, BALLOON_TYPE_TOOLTIP, n), updateBalloonData(balloonVerticalPosition, t, BALLOON_TYPE_TOOLTIP), 
toggleBalloonCloseButton(a, BALLOON_TYPE_TOOLTIP), r ? requestToShowBalloon("", BALLOON_TYPE_TOOLTIP, r, o) :delayedOpenBalloonId = setTimeout(function() {
requestToShowBalloon("", BALLOON_TYPE_TOOLTIP, r, o);
}, 500), a && setBalloonWriteMode(!0);
}

function isSubdomainValueLegal(e) {
var t = e.toLowerCase(), n = t.indexOf("ww");
if (0 == n) return !1;
var a = e.split("");
if (e.charCodeAt(0) < 65 || e.charCodeAt(0) > 90 && e.charCodeAt(0) < 97 || e.charCodeAt(0) > 122) return !1;
for (var r = 1; r < a.length; r++) if (!(e.charCodeAt(r) >= 48 && e.charCodeAt(r) <= 57 || "-" == a[r] || e.charCodeAt(r) >= 65 && e.charCodeAt(r) <= 90 || e.charCodeAt(r) >= 97 && e.charCodeAt(r) <= 122)) return !1;
return !0;
}

function addClass(e, t) {
var n = t.split(/\s+/);
if (e.className || 1 !== n.length) {
setClass = " " + e.className + " ";
for (var a = 0, r = n.length; r > a; a++) ~setClass.indexOf(" " + n[a] + " ") || (setClass += n[a] + " ");
e.className = setClass;
} else e.className = t;
}

function removeClass(e, t) {
if (t) {
for (var n = t.split(/\s+/), a = (" " + e.className + " ").replace(/\s+/, " "), r = 0, o = n.length; o > r; r++) a = a.replace(" " + n[r] + " ", " ");
e.className = a;
} else e.className = "";
}

function reportStatAndRedirect(e, t, n) {
("undefined" != typeof t || "undefined" != typeof n) && writeActivityIndicator(t, n), 
top.location.href = e;
}

function deepCopy(e) {
var t = {};
for (var n in e) {
var a = e[n];
t[n] = null !== a && (typeof a).match(/^(array|object)$/) ? deepCopy(a) :a;
}
return t;
}

function escapeSearchReservedCharacters(e) {
if ("undefined" == typeof queryParamConsts) return "undefined" != typeof console && console.error("queryParamConsts is undefined. You may need to use SearchFormComponentsConverter->printQueryParamsObjectScript()"), 
e;
var t = e;
return _.each(queryParamConsts, function(e) {
t = t.replace(new RegExp("\\" + e.value, "g"), "/" + e.index);
}), t;
}

function varExists(e) {
return null != self[e];
}

function getCurrentPageCanonicalId() {
return "undefined" != typeof currentPageCanonicalId ? currentPageCanonicalId :"";
}

var htmlStripRE = /<\/?[^>]+>/gi, GROUPSEPARATOR = " ";

String.prototype.endsWith = function(e) {
return this.substr(this.length - e.length) == e;
}, "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
});
function saveDefaultReferer() {
var e = document.referrer.toLowerCase();
if ("" == e) {
var o = getCookie("httpReferer");
null != o && (e = o);
}
var a = "";
for (socialNetworkName in supportedReferersForDefaultSaveCookieIsManipulation) if (e.indexOf(socialNetworkName) > -1) {
a = supportedReferersForDefaultSaveCookieIsManipulation[socialNetworkName];
break;
}
"" != a && setCookie("DefaultSave", a);
}

var supportedReferersForDefaultSaveCookieIsManipulation = new Array();

supportedReferersForDefaultSaveCookieIsManipulation.facebook = "facebook", supportedReferersForDefaultSaveCookieIsManipulation.xanga = "xanga", 
supportedReferersForDefaultSaveCookieIsManipulation.blogger = "blogger", supportedReferersForDefaultSaveCookieIsManipulation.typepad = "typepad", 
supportedReferersForDefaultSaveCookieIsManipulation.multiply = "multiply", supportedReferersForDefaultSaveCookieIsManipulation.flickr = "flickr", 
supportedReferersForDefaultSaveCookieIsManipulation.yahoo360 = "yahoo360", supportedReferersForDefaultSaveCookieIsManipulation.facebox = "facebox", 
supportedReferersForDefaultSaveCookieIsManipulation.piczo = "piczo", supportedReferersForDefaultSaveCookieIsManipulation.blackplanet = "blackplanet", 
supportedReferersForDefaultSaveCookieIsManipulation.tagged = "tagged", supportedReferersForDefaultSaveCookieIsManipulation.myyearbook = "myyearbook", 
supportedReferersForDefaultSaveCookieIsManipulation.wordpress = "wordpress", supportedReferersForDefaultSaveCookieIsManipulation.igoogle = "igoogle", 
supportedReferersForDefaultSaveCookieIsManipulation.netvibes = "netvibes", supportedReferersForDefaultSaveCookieIsManipulation.pageflakes = "pageflakes", 
supportedReferersForDefaultSaveCookieIsManipulation.comment = "comment", supportedReferersForDefaultSaveCookieIsManipulation.vox = "vox", 
supportedReferersForDefaultSaveCookieIsManipulation.migente = "migente", saveDefaultReferer();
!function(i, n) {
"use strict";
function r(i) {
for (var n, r, o = 0; o < t.length; o++) if (n = t[o][0], r = t[o][1], r > i) return n;
return null;
}
function o(i, r, o) {
return _.isBoolean(o) || (o = !0), this.shouldPrintErrors = o, i ? (this.activityId = i, 
this.windowObj = r || n, this.windowObj.performance && this.windowObj.performance.timing ? void (this.performanceTiming = this.windowObj.performance.timing) :void (this.hasError = !0)) :(this.shouldPrintErrors && console.error("ClientSideLoadTimeReporter constructor: incorrect parameters."), 
void (this.hasError = !0));
}
var t = [ [ "0-1 seconds", 1e3 ], [ "1-2 seconds", 2e3 ], [ "2-4 seconds", 4e3 ], [ "4-7 seconds", 7e3 ], [ "7-10 seconds", 1e4 ], [ "10-13 seconds", 13e3 ], [ "13-20 seconds", 2e4 ], [ ">20 seconds", 99999 ] ];
o.prototype.init = function() {
if (!this.hasError) {
var i = this;
jQuery(this.windowObj).on("load", function() {
setTimeout(function() {
var n = i.performanceTiming;
if (!n.loadEventEnd || !n.navigationStart) return void (i.shouldPrintErrors && console.error("ClientSideLoadTimeReporter: performanceTiming.loadEventEnd or performanceTiming.navigationStart are not defined or are 0. loadEventEnd:", n.loadEventEnd, ". navigationStart:", n.navigationStart));
var o = n.loadEventEnd - n.navigationStart, t = r(o);
i.windowObj.writeActivityIndicator(i.activityId, t, !0);
}, 0);
});
}
}, i.ClientSideLoadTimeReporter = o;
}(window, window);
!function(r) {
"use strict";
function e(r) {
var e = [];
try {
var t = jQuery(r), n = t.find("data");
_.each(n.children(), function(r) {
e.push(jQuery(r).text());
});
} catch (o) {}
return e;
}
r.getProfilePropertyResponseTransformer = {
transformPropertyApiXmlResponseToArray:e
};
}(window);
!function(o, e) {
"use strict";
function i(o, i, s, n) {
return this.hasError = !1, _.isBoolean(n) || (n = !0), this.shouldPrintErrors = n, 
o && i ? (this.windowObj = s || e, _.isFunction(this.windowObj.openNewPopup) ? (this.siteId = o, 
void (this.lang = i)) :(this.shouldPrintErrors && console.error("NewPasswordPopupOpener constructor: could not find the openNewPopup function."), 
void (this.hasError = !0))) :(this.shouldPrintErrors && console.error("NewPasswordPopupOpener constructor: incorrect parameters."), 
void (this.hasError = !0));
}
var s = [ "mhPopupReady", "OnBeforeClose" ];
i.prototype.open = function(o) {
if (!this.hasError && !this._popupIsOpen) {
this._popupIsOpen = !0;
var e = [ "", "FP", "Library", "Members", "NewPassword", "change-initial-password.php" ].join("/"), i = "s=" + this.siteId + "&lang=" + this.lang, s = this._createSimpleModalOptions(o);
this.windowObj.openNewPopup(e, i, s);
}
}, i.prototype._createSimpleModalOptions = function(o) {
o = o || {};
var i = e.familyHomeData && e.familyHomeData.isMobilePhone || e.newTree && e.newTree.canvas.getIsMobilePhone(), s = {
opacity:60,
isInMobile:i
};
return o = _.extend(s, o), this._addSimpleModalListeners(o), o.modal = !0, o;
}, i.prototype._addSimpleModalListeners = function(o) {
var e = this;
_.each(s, function(i) {
if (_.isFunction(o[i])) {
var s = o[i];
o[i] = function() {
e[i].apply(e, arguments), s.apply(null, arguments);
};
} else o[i] = _.bind(e[i], e);
});
}, i.prototype.mhPopupReady = function() {
this.windowObj.NewPasswordPopup.NewPasswordPopupReady(this.siteId, this.lang);
}, i.prototype.OnBeforeClose = function() {
this._popupIsOpen = !1;
}, o.NewPasswordPopupOpener = i;
}(window, window);
function ControlVersion() {
var r, e;
try {
e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), r = e.GetVariable("$version");
} catch (a) {}
if (!r) try {
e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), r = "WIN 6,0,21,0", e.AllowScriptAccess = "always", 
r = e.GetVariable("$version");
} catch (a) {}
if (!r) try {
e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), r = e.GetVariable("$version");
} catch (a) {}
if (!r) try {
e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"), r = "WIN 3,0,18,0";
} catch (a) {}
if (!r) try {
e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), r = "WIN 2,0,0,11";
} catch (a) {
r = -1;
}
return r;
}

function GetSwfVer() {
var r = -1;
if (null != navigator.plugins && navigator.plugins.length > 0) {
if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
var e = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" :"", a = navigator.plugins["Shockwave Flash" + e].description, t = a.split(" "), i = t[2].split("."), n = i[0], s = i[1];
"" != t[3] ? tempArrayMinor = t[3].split("r") :tempArrayMinor = t[4].split("r");
var o = tempArrayMinor[1] > 0 ? tempArrayMinor[1] :0, r = n + "." + s + "." + o;
}
} else -1 != navigator.userAgent.toLowerCase().indexOf("webtv/2.6") ? r = 4 :-1 != navigator.userAgent.toLowerCase().indexOf("webtv/2.5") ? r = 3 :-1 != navigator.userAgent.toLowerCase().indexOf("webtv") ? r = 2 :isIE && isWin && !isOpera && (r = ControlVersion());
return r;
}

function DetectFlashVer(r, e, a) {
if (versionStr = GetSwfVer(), -1 == versionStr) return !1;
if (0 != versionStr) {
isIE && isWin && !isOpera ? (tempArray = versionStr.split(" "), tempString = tempArray[1], 
versionArray = tempString.split(",")) :versionArray = versionStr.split(".");
var t = versionArray[0], i = versionArray[1], n = versionArray[2];
if (t > parseFloat(r)) return !0;
if (t == parseFloat(r)) {
if (i > parseFloat(e)) return !0;
if (i == parseFloat(e) && n >= parseFloat(a)) return !0;
}
return !1;
}
}
function AC_AddExtension(e, a) {
return -1 != e.indexOf("?") ? e.replace(/\?/, a + "?") :e + a;
}

function AC_Generateobj(e, a, s) {
var c = "";
if (isIE && isWin && !isOpera) {
c += "<object ";
for (var o in e) c += o + '="' + e[o] + '" ';
for (var o in a) c += '><param name="' + o + '" value="' + a[o] + '" /> ';
c += "></object>";
} else {
c += "<embed ";
for (var o in s) c += o + '="' + s[o] + '" ';
c += "> </embed>";
}
document.write(c);
}

function AC_FL_RunContent() {
var e = AC_GetArgs(arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
AC_Generateobj(e.objAttrs, e.params, e.embedAttrs);
}

function AC_GetArgs(e, a, s, c, o) {
var n = new Object();
n.embedAttrs = new Object(), n.params = new Object(), n.objAttrs = new Object();
for (var t = 0; t < e.length; t += 2) {
var r = e[t].toLowerCase();
switch (r) {
case "classid":
break;

case "pluginspage":
n.embedAttrs[e[t]] = e[t + 1];
break;

case "src":
case "movie":
e[t + 1] = AC_AddExtension(e[t + 1], a), n.embedAttrs.src = e[t + 1], n.params[s] = e[t + 1];
break;

case "onafterupdate":
case "onbeforeupdate":
case "onblur":
case "oncellchange":
case "onclick":
case "ondblClick":
case "ondrag":
case "ondragend":
case "ondragenter":
case "ondragleave":
case "ondragover":
case "ondrop":
case "onfinish":
case "onfocus":
case "onhelp":
case "onmousedown":
case "onmouseup":
case "onmouseover":
case "onmousemove":
case "onmouseout":
case "onkeypress":
case "onkeydown":
case "onkeyup":
case "onload":
case "onlosecapture":
case "onpropertychange":
case "onreadystatechange":
case "onrowsdelete":
case "onrowenter":
case "onrowexit":
case "onrowsinserted":
case "onstart":
case "onscroll":
case "onbeforeeditfocus":
case "onactivate":
case "onbeforedeactivate":
case "ondeactivate":
case "type":
case "codebase":
case "id":
n.objAttrs[e[t]] = e[t + 1];
break;

case "width":
case "height":
case "align":
case "vspace":
case "hspace":
case "class":
case "title":
case "accesskey":
case "name":
case "tabindex":
n.embedAttrs[e[t]] = n.objAttrs[e[t]] = e[t + 1];
break;

default:
n.embedAttrs[e[t]] = n.params[e[t]] = e[t + 1];
}
}
return n.objAttrs.classid = c, o && (n.embedAttrs.type = o), n;
}
function numberedNavigationMenuOver(e, n, t, i) {
if (!t) {
var a = document.getElementById("numberedNavigationMenuEntryLeft" + e), u = document.getElementById("numberedNavigationMenuEntryNumber" + e), r = document.getElementById("numberedNavigationMenuEntryCenter" + e), c = document.getElementById("numberedNavigationMenuEntryRight" + e);
a.className = n + (t ? "Active" :"Inactive") + "MenuEntryLeft" + (i ? "Roll" :""), 
u.className = n + (t ? "Active" :"Inactive") + "MenuEntryNumber" + (i ? "Roll" :"") + (e + 1), 
r.className = n + (t ? "Active" :"Inactive") + "MenuEntryCenter" + (i ? "Roll" :""), 
c.className = n + (t ? "Active" :"Inactive") + "MenuEntryRight" + (i ? "Roll" :"");
}
}

function numberedNavigationMenuClick(e) {
window.location.href = e;
}
function isMessageBoxNeeded(e) {
var t, o = "mb_sbd", i = 5, n = getCookie(o);
t = null == n ? [] :n.split(",");
for (var p = 0; p < t.length; p++) if (e == t[p]) return !1;
return t.length > i - 1 && (t = t.slice(t.length - i + 1, t.length)), t[t.length] = e, 
n = t.join(","), setCookie(o, n, COOKIE_EXPIRATION_SESSION), !0;
}

function getViewportHeight() {
return window.innerHeight != window.undefined ? window.innerHeight :"CSS1Compat" == document.compatMode ? document.documentElement.clientHeight :document.body ? document.body.clientHeight :window.undefined;
}

function getViewportWidth() {
return window.innerWidth != window.undefined ? window.innerWidth :"CSS1Compat" == document.compatMode ? document.documentElement.clientWidth :document.body ? document.body.clientWidth :window.undefined;
}

function setPopupTitle(e, t) {
var o = document.getElementById("popupTitle" + e);
o && setInnerText("popupTitle" + e, t);
}

function initPopUp() {
gInitPopUpCalled = !1;
var e = document.getElementById("dragCover");
if ("undefeind" != typeof e) {
if (!gInitPopUpCalled) {
var t = parseInt(window.navigator.appVersion.charAt(0), 10);
6 >= t && window.navigator.userAgent.indexOf("MSIE") > -1 && (gHideSelects = !0);
}
gInitPopUpCalled = !0;
}
}

function createPopup() {
var e = gPopupsCreated + 1, t = document.createElement("DIV");
t.id = "popupMask" + e, t.className = "popupMask", t.style.zIndex = 2e3 + 10 * e, 
t.innerHTML = "&nbsp;", document.body.appendChild(t), gPopupMask[e] = t;
var o = document.createElement("DIV");
o.id = "popupContainer" + e, o.className = "popupContainer", o.style.position = "absolute", 
o.style.zIndex = 2001 + 10 * e, popupContainerInnerHTML = '<div id="popupInner' + e + '" class="popupInner popupShadowBox">	<div class="popupShadowBoxContent">		<div id="popupTitleBar' + e + '" class="popupTitleBar" style="z-index:' + (2003 + 10 * e) + '">			<div id="popupTitle' + e + '" class="popupTitle" style="float:' + displayLanguageDirection + ';"></div>			<div id="popupControls' + e + '" class="popupControls" style="float:' + displayLanguageOppositeDirection + ';">				<div id="PopupClose' + e + '" class="PopupClose"></div>			</div>		</div>		<div class="popupTitleShadow" style="z-index:' + (2003 + 10 * e) + '">&nbsp;</div>		<div id="popupPreloaderContianer' + e + '" style="position:relative;z-index:' + (2004 + 10 * e) + ';text-align:left;">			<div id="popupPreloader' + e + '" style="position:absolute;top:0px;left:0px;text-align:left;width:100%;height:100%;background-color:white;z-index:' + (2004 + 10 * e) + '">				<table cellspacing="0" cellpadding="0" border="0" width="100%" height="100%">					<tr>						<td align="center" valign="middle" style="text-align: center; vertical-align: middle;">							<img src="' + AssetManager.R_IMG("/FP/Assets/Images/Misc/Loading-4.gif") + '"></img>						</td>					</tr>				</table>			</div>		</div>		<iframe class="popupFrame" src="about:blank" style="width:100%;height:100%;background-color:transparent;z-index:' + (2002 + 10 * e) + '" scrolling="no" frameborder="0" allowtransparency="true" id="popupFrame' + e + '" name="popupFrame' + e + '" width="100%" height="100%"></iframe>	</div></div>', 
o.innerHTML = popupContainerInnerHTML, document.body.appendChild(o), gPopupContainer[e] = o;
var i = document.getElementById("PopupClose" + e);
i && (i.addEventListener("mouseover", function(e) {
this.className = "PopupCloseRoll";
}), i.addEventListener("mouseout", function(e) {
this.className = "PopupClose";
}), i.addEventListener("click", function(e) {
window.closePopup();
})), gPopFrame[e] = document.getElementById("popupFrame" + e), gPopupsCreated++;
}

function checkForjQuery(e) {
if ("undefined" != typeof jQuery) return !0;
var t = new LazyScriptDownloader(e);
return t.addFullPathScript(AssetManager.getJqueryPath()), t.addFullPathScript(AssetManager.getJqueryUiPath()), 
t.startDownload(), !1;
}

function showPopWin(e, t, o, i, n, p, a) {
for (;parent != window && "unknown" != typeof parent.showPopWin && "undefined" != typeof parent.showPopWin; ) return void parent.showPopWin(e, t, o, i, n, p, a);
if (-2 == gTopmostPopup) return window != window.parent ? void window.parent.showPopWin(e, t, o, i, n, p, a) :void 0;
if (checkForjQuery(function() {
showPopWin(e, t, o, i, n, p, a);
}) && (gInitPopUpCalled || (initPopUp(), gInitPopUpCalled))) {
if (gTopmostPopup++, gTopmostPopup > gPopupsCreated && createPopup(), a ? (gPopupContainer[gTopmostPopup].className = "FL_popupContainer", 
isIE && (t -= 10)) :gPopupContainer[gTopmostPopup].className = "popupContainer", 
isOpera && gTopmostPopup >= 1) {
var s = document.getElementById("popupContainer" + (gTopmostPopup - 1));
s.style.display = "none";
}
var l = gPopFrame[gTopmostPopup];
l && (l.scrolling = n, l.src = "about:blank"), gPopupIsShown = !0, disableTabIndexes(), 
gPopupContainer[gTopmostPopup].style.width = "1px", gPopupContainer[gTopmostPopup].style.height = "1px", 
gPopFrame[gTopmostPopup].style.width = "1px", gPopFrame[gTopmostPopup].style.height = "1px", 
gPopupMask[gTopmostPopup].style.display = "block", gPopupContainer[gTopmostPopup].style.display = "block", 
updateMask(t, o, !0), centerPopup(t, o), gPopupContainer[gTopmostPopup].style.width = "20px";
var u = document.getElementById("popupTitleBar" + gTopmostPopup);
u.style.display = "";
var r = parseInt(u.offsetHeight, 10);
gPopupParams.url = e, gPopupParams.width = t, gPopupParams.height = o, gPopupParams.returnFunc = i, 
gPopupParams.scrolling = n, gPopupParams.title = p, gPopupParams.isFaceLifted = a, 
setInnerText("popupTitle" + gTopmostPopup, "");
var d = document.getElementById("popupTitle" + gTopmostPopup);
d.style.width = "", gPopupContainer[gTopmostPopup].style.width = t + "px", gPopupContainer[gTopmostPopup].style.height = o + r + "px", 
gPopFrame[gTopmostPopup].style.width = parseInt(u.offsetWidth, 10) + "px", gPopFrame[gTopmostPopup].style.height = o + "px", 
showPopWinB(e, t, o, i, n, p, a);
}
}

function showPopWinB(e, t, o, i, n, p, a) {
gPopFrame[gTopmostPopup].style.width = parseInt(document.getElementById("popupTitleBar" + gTopmostPopup).offsetWidth, 10) + "px";
var s = document.getElementById("popupPreloader" + gTopmostPopup);
s && (s.style.width = gPopFrame[gTopmostPopup].style.width, s.style.height = gPopFrame[gTopmostPopup].style.height, 
s.style.display = "block");
var l = document.getElementById("popupPreloaderContianer" + gTopmostPopup);
l && (l.style.display = "block"), e += -1 == e.indexOf("?") ? "?" :"&", e += "popupHeight=" + o, 
gPopFrame[gTopmostPopup].onreadystatechange = function() {
if ("undefined" != typeof gPopFrame[gTopmostPopup] && ("loaded" == gPopFrame[gTopmostPopup].readyState || "complete" == gPopFrame[gTopmostPopup].readyState)) {
var e = document.getElementById("popupPreloader" + gTopmostPopup);
e && (e.style.display = "none");
var t = document.getElementById("popupPreloaderContianer" + gTopmostPopup);
t && (t.style.display = "none");
}
}, gPopFrame[gTopmostPopup].onload = function() {
var e = document.getElementById("popupPreloader" + gTopmostPopup);
e && (e.style.display = "none");
var t = document.getElementById("popupPreloaderContianer" + gTopmostPopup);
t && (t.style.display = "none");
}, gPopFrame[gTopmostPopup].src = e;
gReturnFunc[gTopmostPopup] = i, 1 == gHideSelects && hideSelectBoxes(), hideTopmostFlashes();
var u = document.getElementById("popupTitle" + gTopmostPopup);
u.style.width = "95%", "undefined" != typeof p ? setInnerText("popupTitle" + gTopmostPopup, p) :setInnerText("popupTitle" + gTopmostPopup, "");
}

function hideCurrentPopupTitleBar() {
var e = document.getElementById("popupTitleBar" + gTopmostPopup);
null != e && (e.style.display = "none");
}

function animatePopup(e, t, o) {
var i = parseInt(gPopupContainer[gTopmostPopup].style.width), n = parseInt(gPopFrame[gTopmostPopup].style.height);
return e > i || t > n ? (e - o >= i ? gPopupContainer[gTopmostPopup].style.width = i + o + "px" :gPopupContainer[gTopmostPopup].style.width = e + "px", 
t - o >= n ? gPopFrame[gTopmostPopup].style.height = n + o + "px" :gPopFrame[gTopmostPopup].style.height = t + "px", 
animatePopupTimeoutId = setTimeout(function() {
animatePopup(e, t, o);
}, 10)) :(clearTimeout(animatePopupTimeoutId), showPopWinB(gPopupParams.url, gPopupParams.width, gPopupParams.height, gPopupParams.returnFunc, gPopupParams.scrolling, gPopupParams.title, gPopupParams.isFaceLifted)), 
!1;
}

function updateContainerHeight(e) {
if (window != window.parent) return void parent.updateContainerHeight(e);
if (!(0 > gTopmostPopup)) {
originalContainerHeight = parseInt(gPopupContainer[gTopmostPopup].style.height), 
originalFrameHeight = parseInt(gPopFrame[gTopmostPopup].style.height);
var t = e - originalContainerHeight;
0 != t && (gPopupContainer[gTopmostPopup].style.height = originalContainerHeight + t + "px", 
gPopFrame[gTopmostPopup].style.height = originalContainerHeight + t + "px");
}
}

function updateMask(e, t, o) {
if ((gInitPopUpCalled || (initPopUp(), gInitPopUpCalled)) && 1 == gPopupIsShown) {
(null == e || isNaN(e)) && (e = gPopupContainer[gTopmostPopup].offsetWidth), null == t && (t = gPopupContainer[gTopmostPopup].offsetHeight);
var n = getViewportHeight(), p = getViewportWidth();
if (isIE && "BackCompat" == document.compatMode) a = document.body.scrollTop, s = document.body.scrollLeft; else var a = jQuery(window).scrollTop(), s = jQuery(window).scrollLeft();
gPopupMask[gTopmostPopup].style.height = n + "px", !document.all && document.body.scrollHeight > document.body.clientHeight && (p -= 21);
var l = parseInt(gPopupMask[gTopmostPopup].style.top);
if (gPopupMask[gTopmostPopup].style.top = a + "px", gPopupMask[gTopmostPopup].style.left = s + "px", 
!o && "undefined" != typeof isMobile && !isMobile) {
var u = a - l;
for (i = 0; i <= gTopmostPopup; i++) {
var r = parseInt(gPopupContainer[i].style.top);
"undefined" != typeof gPopupAccelimation[i] && null != gPopupAccelimation[i] && (gPopupAccelimation[i].stop(), 
gPopupAccelimation[i] = null, r = gPopupAccelimationTarget[i]);
var d = r + u, c = parseInt(gPopupContainer[i].style.height);
!isNaN(d) && d >= 0 && !isNaN(c) && n > c + 40 && (gPopupAccelimation[i] = new Accelimation(gPopupContainer[i].style, "top", d, 1e3, .5, "px"), 
gPopupAccelimation[i].onend = function() {
gPopupAccelimation[i] = null;
}, gPopupAccelimationTarget[i] = d, gPopupAccelimation[i].start());
}
}
}
}

function centerPopup(e, t) {
if (1 == gPopupIsShown) {
var o = getViewportHeight(), i = getViewportWidth();
if (isIE && "BackCompat" == document.compatMode) n = document.body.scrollTop, p = document.body.scrollLeft; else var n = jQuery(window).scrollTop(), p = jQuery(window).scrollLeft();
var a = parseInt(document.getElementById("popupTitleBar" + gTopmostPopup).offsetHeight, 10);
gPopupContainer[gTopmostPopup].style.top = n + (o - (t + a)) / 2 + "px", gPopupContainer[gTopmostPopup].style.left = p + (i - e) / 2 + "px";
}
}

function hidePopWin(e) {
if (null != gPopupMask[gTopmostPopup]) {
if ("undefined" != typeof gPopupAccelimation[gTopmostPopup] && null != gPopupAccelimation[gTopmostPopup] && (gPopupAccelimation[gTopmostPopup].stop(), 
gPopupAccelimation[gTopmostPopup] = null), gPopupMask[gTopmostPopup].style.display = "none", 
gPopupContainer[gTopmostPopup].style.display = "none", isOpera && gTopmostPopup >= 1) {
var t = document.getElementById("popupContainer" + (gTopmostPopup - 1));
t.style.display = "inline";
}
if (gTopmostPopup--, -1 == gTopmostPopup && (restoreTabIndexes(), gPopupIsShown = !1), 
1 == gHideSelects && showSelectBoxes(), showTopmostFlashes(), 1 == e && null != gReturnFunc[gTopmostPopup + 1]) {
var o = gPopFrame[gTopmostPopup + 1].contentWindow.returnVal;
if (-1 == gTopmostPopup) {
var i = gReturnFunc[gTopmostPopup + 1];
i && i(o);
} else {
var n = gPopFrame[gTopmostPopup].contentWindow;
if (n) {
var p = gReturnFunc[gTopmostPopup + 1].name;
_.isFunction(n[p]) && n[p](o);
}
}
}
var a = gPopFrame[gTopmostPopup + 1];
a && (a.scrolling = "no", a.src = "about:blank"), gReturnFunc[gTopmostPopup + 1] = null;
}
}

function doNotCallThisFunctionGetPopupParent() {
return -1 == gTopmostPopup ? null :0 == gTopmostPopup ? window :window.frames[gTopmostPopup - 1];
}

function setPopTitle() {}

function keyDownHandler(e) {
return gPopupIsShown && 9 == e.keyCode ? !1 :void 0;
}

function disableTabIndexes() {
if (document.all) for (var e = 0, t = 0; t < gTabbableTags.length; t++) for (var o = document.getElementsByTagName(gTabbableTags[t]), i = 0; i < o.length; i++) gTabIndexes[e] = o[i].tabIndex, 
o[i].tabIndex = -1, e++;
}

function restoreTabIndexes() {
if (document.all) for (var e = 0, t = 0; t < gTabbableTags.length; t++) for (var o = document.getElementsByTagName(gTabbableTags[t]), i = 0; i < o.length; i++) o[i].tabIndex = gTabIndexes[e], 
o[i].tabEnabled = !0, e++;
}

function changeSelectVisibilty(e, t) {
if (isIE && ieBrowserVersion <= 6) for (var o = e.document.getElementsByTagName("select"), i = 0; i < o.length; i++) o[i].style.visibility = t;
}

function hideSelectBoxes() {
0 == gTopmostPopup ? changeSelectVisibilty(window, "hidden") :gTopmostPopup > 0 && changeSelectVisibilty(document.frames[gTopmostPopup - 1], "hidden");
}

function showSelectBoxes() {
-1 == gTopmostPopup ? changeSelectVisibilty(window, "visible") :gTopmostPopup > -1 && changeSelectVisibilty(document.frames[gTopmostPopup], "visible");
}

function changeFlashVisibilty(e, t) {
for (var o = e.document.getElementsByTagName("object"), i = 0; i < o.length; i++) o[i].style.visibility = t;
for (o = e.document.getElementsByTagName("EMBED"), i = 0; i < o.length; i++) o[i].style.visibility = t;
for (iframesOjects = e.document.getElementsByTagName("iframe"), i = 0; i < iframesOjects.length; i++) 0 != iframesOjects[i].id.indexOf("popupFrame") && (iframesOjects[i].style.visibility = t);
}

function hideTopmostFlashes() {
0 == gTopmostPopup && changeFlashVisibilty(window, "hidden");
}

function showTopmostFlashes() {
-1 == gTopmostPopup && changeFlashVisibilty(window, "visible");
}

function dontShowAgain(e, t, o, i, n, p) {
if ("undefined" != typeof e && "undefined" != typeof t && "undefined" != typeof o) {
"undefined" == typeof i && (i = ""), "undefined" == typeof n && (n = 0), "undefined" == typeof p && (p = !0);
var a = [ "siteID=" + t, "memberID=" + o, "messageID=" + e, "expiration=" + n ].join("&"), s = "/FP/API/dont-show-again.php", l = getAjaxObject();
sendAjaxRequest(l, s, a, "", "GET", i, "", "", null, null, p);
}
}

function dontShowAgainInSession(e, t, o, i, n) {
if ("undefined" != typeof e && "undefined" != typeof t && "undefined" != typeof o) {
"undefined" == typeof i && (i = ""), "undefined" == typeof n && (n = !0);
var p = [ "siteID=" + t, "memberID=" + o, "messageID=" + e ].join("&"), a = "/FP/API/dont-show-again-in-session.php", s = getAjaxObject();
sendAjaxRequest(s, a, p, "", "GET", i, "", "", null, null, n);
}
}

function chooseDefaultText(e, t, o) {
var i = jQuery("#" + e + "_Text");
if (1 == i.length) {
var n = jQuery(o).text();
n.length > 0 && (n = n.substr(0, n.length - 1));
var i = jQuery("#" + e + "_Text");
i.val(n + " ").removeClass("DropDownTextArea"), toggleDropdown(e);
var p = n.length + 1;
setCursorPosition(i[0], p), i.focus(), null == lastDropDownSelectedId && (lastDropDownSelectedId = new Array()), 
lastDropDownSelectedId[e] = t;
}
}

function toggleDropdown(e) {
var t = jQuery("#" + e + "_dropdown"), o = jQuery("#" + e + "_dropdown_inner"), i = jQuery("#" + e + "_Text");
t.is(":visible") ? t.hide() :(o.css("width", i.outerWidth() + "px"), t.css("display", "inline"));
}

function getLastSelectedDropdownOption(e) {
return null == lastDropDownSelectedId || "undefined" == typeof lastDropDownSelectedId[e] ? null :lastDropDownSelectedId[e];
}

function DynamicComboBox(e) {
this.id = e, this.container = document.getElementById(e + "_container"), this.input = document.getElementById(e), 
this.valueListTable = document.getElementById(e + "_value_list_table"), this.valueList = document.getElementById(e + "_value_list"), 
this.values = new Array(), this.isValueListComplete = !1, this.lastSearchQuery = null, 
this.selectedValueText = null, this.selectedValueIndex = -1, this.numberOfDisplayedValues = 0, 
this.isValueListOpen = !1, this.isValueListOpenedUp = !1, this.isInSearchMode = !1, 
this.maxValuesBeforeScroll = 10, this.valuesApiUrl = null, this.gettingValuesFromApiInProgress = !1, 
this.onValueChange = function() {}, "undefined" == typeof dynamicComboBoxIdToObjectLookup && (dynamicComboBoxIdToObjectLookup = new Array()), 
dynamicComboBoxIdToObjectLookup[e] = this;
}

function dcb_getDynamicComboBoxById(e) {
return "undefined" != typeof dynamicComboBoxIdToObjectLookup && "undefined" != typeof dynamicComboBoxIdToObjectLookup[e] ? dynamicComboBoxIdToObjectLookup[e] :null;
}

function dcb_turnOnDynamicComboBoxAutoHide(e) {
null != dcb_currentDynamicComboBox && (document.body.onclick = function() {
dcb_currentDynamicComboBox.closeValueList();
});
}

function dcb_turnOffDynamicComboBoxAutoHide() {
document.body.onclick = null;
}

function messageBox2(e, t, o, i, n, p, a, s, l) {
gSection = e, gTitle = t, gBody = o, gIcon = i, gButtons = n, gDefaultButton = p, 
gCallback = a, gMessageboxURL = messageBox2URL, gType = "undefined" == typeof s ? "Info" :s;
var l = "undefined" == typeof l ? defaultPopupHeight :l;
handleMessageBoxPopup(l);
}

function cmessageBox2(e, t, o, i, n, p, a, s, l) {
gSection = e, gTitle = t, gBody = o, gIcon = i, gButtons = n, gDefaultButton = p, 
gCallback = a, gMessageboxURL = cmessageBox2URL, gType = "undefined" == typeof s ? "Info" :s;
var l = "undefined" == typeof l ? defaultPopupHeight :l;
handleMessageBoxPopup(l);
}

function handleMessageBoxPopup(e) {
var e = "undefined" == typeof e ? defaultPopupHeight :e;
if (gButtons != MB_OK && gButtons != MB_CLOSE || -1 != gTopmostPopup || -1 != document.location.href.indexOf("createSiteRegistration.php") || -1 != document.location.href.indexOf("member-sign-up.php")) invokePopupMessagebox(e); else {
var t = notificationPanelURL;
t = replace(t, "&title=", "&title=" + gTitle), t = replace(t, "&body=", "&body=" + gBody), 
t = replace(t, "&icon=", "&icon=" + gIcon), t = replace(t, "&type=", "&type=" + gType), 
t += "&randomParam=" + generateRandomString(5), gMessageboxURL.indexOf("&company=") > -1 && (t += "&company=");
var o = document.getElementById("notificationPanelIFrame");
o || (o = top.document.getElementById("notificationPanelIFrame")), o ? (gNotificationPanelDisplayed = !0, 
o.src = t) :invokePopupMessagebox();
}
}

function notificationPanelCallback() {
null != gCallback && gCallback(gButtons);
}

function invokePopupMessagebox(e) {
var e = "undefined" == typeof e ? defaultPopupHeight :e, t = gMessageboxURL;
t = replace(t, "&section=", "&section=" + gSection), t = replace(t, "&title=", "&title=" + gTitle), 
t = replace(t, "&body=", "&body=" + gBody), t = replace(t, "&icon=", "&icon=" + gIcon), 
t = replace(t, "&buttons=", "&buttons=" + gButtons), t = replace(t, "&defButton=", "&defButton=" + gDefaultButton), 
internalDoNotCallThisPopup(t, 563, e, "no", gCallback, !0, "", !0);
}

function internalDoNotCallThisPopup(e, t, o, i, n, p, a, s) {
"undefined" == typeof isNewCompanySkin && (isNewCompanySkin = !0), !isNewCompanySkin || p || s || (t = Math.max(t, 563)), 
e = encodeURI(e), showPopWin(e, t, o, n, i, a, s);
}

function hideLastNotification() {
var e = document.getElementById("notificationPanelIFrame");
null != e && (e.style.display = "none");
var t = document.getElementById("notificationPanel");
null != t && (t.style.display = "none");
}

var gTopmostPopup = -1, gPopupsCreated = -1, gPopupMask = new Array(), gPopupContainer = new Array(), gPopFrame = new Array(), gReturnFunc = new Array(), gPopupIsShown = !1, gPopupAccelimation = new Array(), gPopupAccelimationTarget = new Array(), gHideSelects = !1, gInitPopUpCalled = !1, gTabIndexes = new Array(), gTabbableTags = new Array("A", "BUTTON", "TEXTAREA", "INPUT", "IFRAME");

document.all || (document.onkeypress = keyDownHandler), gPopupParams = new Object();

var gi = 0;

window.mhInitialize && window.mhInitialize.addEvent(window, "resize", updateMask), 
window.onscroll = updateMask;

var lastDropDownSelectedId = null, dcb_currentDynamicComboBox = null;

DynamicComboBox.prototype.setValues = function(e, t) {
("undefined" == typeof e || "undefined" == typeof e.length || 0 == e.length) && (e = [ "" ]), 
this.values = e, void 0 != t && (this.maxValuesBeforeScroll = t);
}, DynamicComboBox.prototype.getValuesFromApi = function() {
if (!(this.gettingValuesFromApiInProgress || null == this.valuesApiUrl || this.isValueListComplete && 0 == this.input.value.indexOf(this.lastSearchQuery))) {
this.gettingValuesFromApiInProgress = !0;
var e = this.valuesApiUrl;
if (null == this.lastSearchQuery) this.lastSearchQuery = ""; else if ("" != this.lastSearchQuery) {
if (this.input.value == this.lastSearchQuery) return;
0 == this.input.value.indexOf(this.lastSearchQuery) ? this.isValueListComplete || (this.lastSearchQuery = this.input.value, 
e += "&query=" + encodeURIComponent(this.lastSearchQuery)) :(this.lastSearchQuery = this.input.value.substr(0, 2), 
e += "&query=" + encodeURIComponent(this.lastSearchQuery));
} else this.isValueListComplete || (this.lastSearchQuery = this.input.value.substr(0, 2), 
e += "&query=" + encodeURIComponent(this.lastSearchQuery));
var t = this;
jQuery.ajax({
url:e,
type:"GET",
dataType:"xml",
success:function(e) {
t.getValuesFromApiCallback(e);
}
});
}
}, DynamicComboBox.prototype.getValuesFromApiCallback = function(e) {
if (null != e) {
var t = getXmlNode(e, "data"), o = !1;
1 == getXmlNodeAttributeValue(t, "allResults") && (o = !0);
var i = getXmlNodes(e, "element");
if (null != i && "undefined" != typeof i.length) {
for (var n = new Array(), p = 0; p < i.length; p++) n[n.length] = getXmlNodeValue(i[p]);
this.setValues(n), jQuery(this.input).is(":focus") && this.drawValueList(), this.isValueListComplete = o;
}
}
this.gettingValuesFromApiInProgress = !1;
}, DynamicComboBox.prototype.calculateValueListTop = function() {
var e = 0;
if (this.valueList.style.top = "0px", window.innerHeight) var t = window.innerHeight + window.pageYOffset; else var t = document.body.clientHeight + document.body.scrollTop;
var o = getRelTop(this.valueList), i = this.valueList.offsetHeight;
return (this.isValueListOpenedUp || o + i > t) && (e = 0 - i - 20, this.isValueListOpenedUp = !0), 
e;
}, DynamicComboBox.prototype.drawValueList = function() {
if (0 == this.values.length) return !1;
var e = this.values;
if (this.isInSearchMode) {
var t = this.input.value;
t = t.replace(/(\W)/gi, "\\$1");
for (var o = new RegExp('(^|[\\s\\.\\,\\"\\?\\!\\;\\:\\#\\$\\%\\&\\(\\)\\*\\+\\-\\/\\<\\>\\=\\@\\[\\]\\\\\\^\\_\\{\\}\\|\\~]+)(' + t + ")", "ig"), i = new Array(), n = 0; n < e.length; n++) if (o.test(e[n])) {
var p = htmlStrip(e[n]);
i[i.length] = p.replace(o, "$1<b>$2</b>"), o.lastIndex = 0;
}
e = i;
}
if (e.length > this.maxValuesBeforeScroll ? (isIE ? this.valueList.style.height = 21 * this.maxValuesBeforeScroll + 8 + "px" :this.valueList.style.height = 21 * this.maxValuesBeforeScroll + "px", 
this.valueList.className = "DynamicComboBoxValueListInner DynamicComboBoxValueListInnerLimited") :(this.valueList.style.height = "", 
this.valueList.className = "DynamicComboBoxValueListInner"), 0 == e.length) return !1;
this.numberOfDisplayedValues = e.length;
var a = 0, s = document.createElement("TABLE");
s.cellSpacing = 0, s.cellPadding = 0, s.border = 0;
var l = jQuery(this.valueList).find("table");
l.attr("width") ? s.width = this.valueListTable.width :s.width = jQuery(this.container).width() - 2, 
isOpera || (s.className = "DynamicComboBoxValueListTable");
for (var u = document.createElement("TBODY"), n = 0; n < e.length; n++) {
var r = document.createElement("TR"), d = document.createElement("TD");
d.className = "DynamicComboBoxValueListCell FL_Label", e[n] == this.selectedValueText && (a = n), 
d.onclick = function(e) {
return function() {
e.onValueSelect();
};
}(this), d.onmouseover = function(e, t) {
return function() {
e.highlightValue(t, !0);
};
}(this, n), d.setAttribute("id", this.id + "_value_" + n), this.isInSearchMode ? d.innerHTML = e[n] :setObjInnerText(d, e[n]), 
d.setAttribute("title", getObjInnerText(d)), r.appendChild(d), u.appendChild(r);
}
return s.appendChild(u), this.valueList.innerHTML = "", this.valueList.appendChild(s), 
this.highlightValue(a), this.detachFromPopup(), this.valueList.style.top = this.calculateValueListTop() + "px", 
this.attachToPopup(), hideAllSelectComponentsOnIE6UnderElement(this.valueList.id), 
!0;
}, DynamicComboBox.prototype.openValueList = function() {
if (null != dcb_currentDynamicComboBox && dcb_currentDynamicComboBox.id == this.id) return void this.closeValueList();
null != dcb_currentDynamicComboBox && dcb_currentDynamicComboBox.closeValueList(), 
this.getValuesFromApi();
var e = !this.drawValueList();
if (e && this.isInSearchMode) return void this.closeValueList();
var t = jQuery(this.valueList).find("table");
t.attr("width") || t.attr("width", jQuery(this.container).width() - 2), this.valueList.style.display = "block", 
this.detachFromPopup(), this.valueList.style.top = this.calculateValueListTop() + "px", 
this.attachToPopup(), this.isValueListOpen = !0, this.input.focus(), dcb_currentDynamicComboBox = this, 
hideAllSelectComponentsOnIE6UnderElement(this.valueList.id), dcb_turnOffDynamicComboBoxAutoHide();
var o = this.id;
setTimeout(function() {
dcb_turnOnDynamicComboBoxAutoHide(o);
}, 10);
}, DynamicComboBox.prototype.closeValueList = function() {
dcb_turnOffDynamicComboBoxAutoHide(), this.valueList.style.display = "none", this.isValueListOpen = !1, 
this.isValueListOpenedUp = !1, this.isInSearchMode = !1, this.detachFromPopup(), 
dcb_currentDynamicComboBox = null, showAllSelectComponentsOnIE6();
}, DynamicComboBox.prototype.highlightValue = function(e, t) {
var o = this.id + "_value_" + this.selectedValueIndex, i = this.id + "_value_" + e, n = document.getElementById(o), p = document.getElementById(i);
t ? p && p.offsetTop + p.offsetHeight + 10 <= this.valueList.offsetHeight + this.valueList.scrollTop && p.offsetTop >= this.valueList.scrollTop && (n && (n.className = "DynamicComboBoxValueListCell FL_Label"), 
p.className = "DynamicComboBoxValueListCellHightlight FL_Label", this.selectedValueText = getObjInnerText(p), 
this.selectedValueIndex = e) :p && (n && (n.className = "DynamicComboBoxValueListCell FL_Label"), 
p.className = "DynamicComboBoxValueListCellHightlight FL_Label", p.offsetTop + p.offsetHeight + 10 > this.valueList.offsetHeight + this.valueList.scrollTop ? this.valueList.scrollTop = p.offsetTop + p.offsetHeight - this.valueList.offsetHeight + 10 :p.offsetTop < this.valueList.scrollTop && (this.valueList.scrollTop = p.offsetTop), 
this.selectedValueText = getObjInnerText(p), this.selectedValueIndex = e);
}, DynamicComboBox.prototype.moveUp = function() {
this.selectedValueIndex > 0 && this.highlightValue(this.selectedValueIndex - 1);
}, DynamicComboBox.prototype.moveDown = function() {
this.selectedValueIndex < this.numberOfDisplayedValues - 1 && this.highlightValue(this.selectedValueIndex + 1);
}, DynamicComboBox.prototype.onClick = function() {
("" == this.input.value || this.isValueListOpen) && this.openValueList();
}, DynamicComboBox.prototype.onKeyDown = function(e) {
var t = getEventCode(e);
return 13 == t ? !1 :(9 == t ? this.closeValueList() :8 == t || 46 == t ? (this.isInSearchMode = !0, 
this.isValueListOpen ? this.drawValueList() || this.closeValueList() :this.openValueList()) :38 == t ? this.isValueListOpen && this.moveUp() :40 == t && (this.isValueListOpen ? this.moveDown() :this.openValueList()), 
!0);
}, DynamicComboBox.prototype.onKeyUp = function(e) {
var t = getEventCode(e);
if (8 == t || 46 == t) ; else {
if (13 == t) return void (this.isValueListOpen && this.onValueSelect());
if (27 == t) return void this.closeValueList();
if (48 > t || t > 90 && 186 > t) return;
}
this.isInSearchMode = !0, this.getValuesFromApi(), this.isValueListOpen ? this.drawValueList() || this.closeValueList() :this.openValueList();
}, DynamicComboBox.prototype.onValueSelect = function() {
var e = this.id + "_value_" + this.selectedValueIndex, t = document.getElementById(e);
t && (this.input.value = getObjInnerText(t), this.onValueChange(this.id)), this.closeValueList();
}, DynamicComboBox.prototype.show = function() {
this.container.style.display = "";
}, DynamicComboBox.prototype.hide = function() {
this.container.style.display = "none";
}, DynamicComboBox.prototype.getValue = function() {
return this.input.value;
}, DynamicComboBox.prototype.setValue = function(e) {
this.input.value = e;
}, DynamicComboBox.prototype.attachToPopup = function() {
if (0 != jQuery("#newPopupDragContainer").length) {
var e = jQuery(this.valueList);
if (null == e.data("dyncombo-original-parent")) {
e.show();
var t = e.offset();
e.data("dyncombo-original-parent", e.parent()), e.data("dyncombo-original-top-left", {
top:e.css("top"),
left:e.css("left")
}), e.detach().appendTo("#newPopupDragContainer"), e.offset(t);
}
}
}, DynamicComboBox.prototype.detachFromPopup = function() {
var e = jQuery(this.valueList);
e.data("dyncombo-original-parent") && (e.detach().appendTo(e.data("dyncombo-original-parent")), 
e.css(e.data("dyncombo-original-top-left")), e.data("dyncombo-original-parent", null), 
e.data("dyncombo-original-top-left", null));
};

var gSection, gTitle, gBody, gIcon, gButtons, gDefaultButton, gCallback, gMessageboxURL, defaultPopupHeight = 161;

gNotificationPanelDisplayed = !1;
function mouseMovement(e, t, n, a) {
var o = enabledButtons[e];
if (0 != o) {
var l = "buttonLeft" + e, r = "buttonCenter" + e, s = "buttonRight" + e;
t = AssetManager.R_IMG(t), n = AssetManager.R_IMG(n), a = AssetManager.R_IMG(a);
var u = document.getElementById(l);
u.src = t;
var u = document.getElementById(r);
u.style.backgroundImage = "url(" + n + ")";
var u = document.getElementById(s);
u.src = a;
}
}

function disableButton(e) {
if ("undefined" != typeof enabledButtons[e] && 0 != enabledButtons[e]) {
changeButtonMode(e, !1);
var t = document.getElementById(e);
t.className = "normalHand";
var n = document.getElementById("buttonCenter" + e);
n.className = "ButtonDisabled";
}
}

function enableButton(e) {
if (1 != enabledButtons[e]) {
changeButtonMode(e, !0);
var t = document.getElementById(e);
null != t && (t.className = "cursorHand");
var n = document.getElementById("buttonCenter" + e);
null != n && (n.className = "Button");
}
}

function changeButtonMode(e, t) {
var n = "buttonLeft" + e, a = "buttonCenter" + e, o = "buttonRight" + e;
if ("undefined" != typeof buttonImagePath) {
var l = "" + buttonImagePath;
if (t) var r = AssetManager.R_IMG(l + "buttonLeft.png"), s = AssetManager.R_IMG(l + "buttonCenter.png"), u = AssetManager.R_IMG(l + "buttonRight.png"); else var r = AssetManager.R_IMG(l + "buttonLeftDisabled.png"), s = AssetManager.R_IMG(l + "buttonCenterDisabled.png"), u = AssetManager.R_IMG(l + "buttonRightDisabled.png");
var d = document.getElementById(n);
if (null != d) if (isIE) {
d.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src='" + r + "', sizingMethod=scale)";
var d = document.getElementById(a);
d.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src='" + s + "', sizingMethod=scale)";
var d = document.getElementById(o);
d.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src='" + u + "', sizingMethod=scale)";
} else {
d.src = r;
var d = document.getElementById(a);
d.style.backgroundImage = "url(" + s + ")";
var d = document.getElementById(o);
d.src = u;
}
enabledButtons[e] = t;
}
}

function categoryOnMouseOver(e) {
var t = document.getElementById("cateogyBtnRoll" + e), n = document.getElementById("cateogyBtnNormal" + e);
null != t && null != n && (n.style.display = "none", t.style.display = "inline");
}

function categoryOnMouseOut(e) {
var t = document.getElementById("cateogyBtnRoll" + e), n = document.getElementById("cateogyBtnNormal" + e);
null != t && null != n && (t.style.display = "none", n.style.display = "inline");
}
function getPreRegURL(e) {
var g = e;
if ("undefined" == typeof g || -1 == g) return "";
var n = gPreRegTargetURLOnceLoggedIn.indexOf("&u=");
if (-1 == n && (n = gPreRegTargetURLOnceLoggedIn.indexOf("?u=")), -1 == n) return gPreRegTargetURLOnceLoggedIn;
var r = n, R = gPreRegTargetURLOnceLoggedIn.indexOf("&", r + 3);
return -1 == R ? newURL = gPreRegTargetURLOnceLoggedIn.substring(0, r) + e :newURL = gPreRegTargetURLOnceLoggedIn.substring(0, r) + e + gPreRegTargetURLOnceLoggedIn.substring(R), 
newURL;
}

function preReg(e, g, n) {
gPreRegTargetURLOnceLoggedIn = g, openCenteredPopup2(e, 746, 490, "", "scroll:no;", n);
}

var gPreRegTargetURLOnceLoggedIn;
function logIn() {
var n = {
popupType:"loginOnly"
};
window.userStripSocialSignupPosition && (n.socialSignupPosition = window.userStripSocialSignupPosition), 
openSignupPopup(languageCode, n);
}

function joinNow() {
"undefined" != typeof signUpURL && (document.location.href = signUpURL);
}

function signupFromCompanyHome() {
document.location.href = "/#signup_section";
}
function postEventClicked(e, n) {
var t = postEventURL;
"undefined" != typeof e && (t += "&scenario=" + e), "undefined" != typeof n && (t += "&defaultDate=" + n, 
"undefined" != typeof BALLOON_TYPE_EVENTS && hideBalloon(!0, BALLOON_TYPE_EVENTS)), 
openCenteredPopup2(t, 530, 371, "", "scroll:no;", null, postEventTitle, !0);
}

function postEventSuccess(e) {
reloadEventsList(), e && (closePopup(), showPostEventSuccessMessageBox());
}

function saveGiftStats(e) {
var n = getAjaxObject(), t = "productID=" + e;
"undefined" != typeof giftScenario && (t += "&scenario=" + encodeURIComponent(giftScenario)), 
isAsync = !1, n.open("GET", "/FP/API/gift-stats.php?" + t, isAsync), n.send(null);
}
function fl_tabMouseMovement(e, t, a, n) {
var c = "tabLeft" + e, l = "tabCenter" + e, m = "tabRight" + e, o = document.getElementById(c);
o.className = t;
var o = document.getElementById(l);
o.className = a;
var o = document.getElementById(m);
o.className = n;
}

function fl_tabClicked(e) {
window.location.href = e;
}
function launchCreateSiteWizard(e) {
triggerCreateSiteWizard(e);
}

function triggerCreateSiteWizard(e) {
var t = "width=746,height=567,left=" + (screen.width - 745) / 2 + ",top=" + ((screen.height - 570) / 2 - 50);
t += ",location=no,toolbar=no,menubar=no,status=no,resizable=no", window.open(e, "_blank", t);
}

function createSiteCallback(e) {
if ("undefined" != typeof e && -1 != e) {
if (0 != e.indexOf("&u=")) {
var t = e.indexOf("u=");
if (0 != t) return void (window.location.href = e);
}
var n = extractParameterValueFromURL(contactMemberPopupURL, "u");
null != n && refreshUnderlyingPage(n);
}
}

function refreshUnderlyingPage(e) {
if ("undefined" != typeof targetURLOnceLoggedIn) {
var t = document.getElementById("autoRefresh");
if (t) t.submit(); else {
var n = targetURLOnceLoggedIn;
location.href = n;
}
}
}

function createSitePreRegCallback(e) {
var t = getPreRegURL(e);
if ("" != t) {
var n = "width=746,height=567,left=" + (screen.width - 745) / 2 + ",top=" + ((screen.height - 570) / 2 - 50);
n += ",location=no,toolbar=no,menubar=no,status=no,resizable=no", window.open(t, "_blank", n);
}
}

function createSite() {
launchCreateSiteWizard(createSiteURL);
}
function repositionWindowPopup(o) {
popupObj = document.getElementById("popup_" + o), popupShadowObj = document.getElementById("popupShadow_" + o);
var p = popupObj.clientWidth, e = popupObj.clientHeight, t = parseInt(document.body.scrollTop, 10), n = parseInt(document.body.scrollLeft, 10), d = getWindowViewWidth(), u = getWindowViewHeight(), l = n + (d - p) / 2, c = t + (u - e) / 2, i = l + 10, m = c + 10;
popupObj.style.left = l + "px", popupObj.style.top = c + "px", popupShadowObj.style.left = i + "px", 
popupShadowObj.style.top = m + "px";
}

function getWindowViewHeight() {
return window.innerHeight != window.undefined ? window.innerHeight :"CSS1Compat" == document.compatMode ? document.documentElement.clientHeight :document.body ? document.body.clientHeight :window.undefined;
}

function getWindowViewWidth() {
return window.innerWidth != window.undefined ? window.innerWidth :"CSS1Compat" == document.compatMode ? document.documentElement.clientWidth :document.body ? document.body.clientWidth :window.undefined;
}

function toggleWindowPopup(o) {
"" != o && (popupObj = document.getElementById("popup_" + o), popupShadowObj = document.getElementById("popupShadow_" + o), 
"" != popupLoaded ? (hideWindowPopup(o), popupLoaded = "") :(popupLoaded = o, repositionWindowPopup(o), 
showWindowPopup(o)));
}

function hideWindowPopup(o) {
popupObj = document.getElementById("popup_" + o), popupShadowObj = document.getElementById("popupShadow_" + o), 
popupObj.style.display = "block", popupShadowObj.style.display = "block", popupObj.style.top = "-2000px", 
popupShadowObj.style.top = "-2000px";
}

function showWindowPopup(o) {
popupObj = document.getElementById("popup_" + o), popupShadowObj = document.getElementById("popupShadow_" + o), 
popupObj.style.display = "block", popupShadowObj.style.display = "block";
}

function resizeWindowMask(o) {
"" != o && (screenMaskObj = document.getElementById("screenMask_" + o), screenMaskObj.style.top = document.body.scrollTop + "px", 
screenMaskObj.style.width = getWindowViewWidth() + "px", screenMaskObj.style.height = getWindowViewHeight() + "px");
}

function startPopupDrag(o, p) {
var e, t;
document.all ? (e = o.clientX + 10 + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft :document.body.scrollLeft), 
t = o.clientY + 10 + (document.documentElement.scrollTop ? document.documentElement.scrollTop :document.body.scrollTop)) :(e = o.pageX + 10, 
t = o.pageY + 10), popupLeftLocation = e, popupTopLocation = t, popupDrag = !0;
}

function movePopup(o, p) {
if (popupDrag) {
popupObj = document.getElementById("popup_" + p), popupShadowObj = document.getElementById("popupShadow_" + p);
var e, t;
document.all ? (e = o.clientX + 10 + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft :document.body.scrollLeft), 
t = o.clientY + 10 + (document.documentElement.scrollTop ? document.documentElement.scrollTop :document.body.scrollTop)) :(e = o.pageX + 10, 
t = o.pageY + 10);
var n = e, d = t, u = n - popupLeftLocation, l = d - popupTopLocation;
popupLeftLocation = n, popupTopLocation = d;
var c = parseInt(popupObj.style.left) + u, i = parseInt(popupObj.style.top) + l, m = parseInt(popupObj.style.left) + u + 10, a = parseInt(popupObj.style.top) + l + 10;
popupObj.style.left = c + "px", popupObj.style.top = i + "px", popupShadowObj.style.left = m + "px", 
popupShadowObj.style.top = a + "px";
}
}

function endPopupDrag(o, p) {
popupDrag = !1;
}

var popupLoaded = "", popupLeftLocation = 0, popupTopLocation = 0, popupDrag = !1;
function isEmail(a, i, l) {
"undefined" == typeof i && (i = !0), gWasEmailLegal = a.match(/^[_a-z0-9-]+((\.|\+)[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.(?:[a-z]{2,4}|email))$/i) ? !0 :!1;
var e = "spam|fake|bugme|fuck|mailinator|junk|crap@|trashmail|trash-mail|pookmail";
l || (e += "|myheritage.com");
var n = new RegExp(e, "i");
return 1 == i && gWasEmailLegal && a.match(n) ? a.match(/junkie/i) || a.match(/junker/i) ? !0 :!1 :gWasEmailLegal;
}

function initValidUrlRE() {
"undefined" == typeof validUrlRE && (validUrlRE = /^((https?|ftp):\/\/)?[a-z0-9_-]+(\.[a-z0-9_-]+)+(:\d+)?(\/[a-z0-9\-._~%!$&'()*+,;=:@]+)*\/?(\?[a-z0-9\-._~%!$&'()*+,;=:@\/?]*)?(#[a-z0-9\-._~%!$&'()*+,;=:@\/?]*)?$/i);
}

function isValidUrl(a, i) {
if ("undefined" == typeof i && (i = !0), "undefined" == typeof a || null == a || "" == a) return !1;
initValidUrlRE();
var l = a.match(validUrlRE);
return l && "undefined" != typeof l.length && l.length > 1 ? null == l[1] && i ? !1 :!0 :!1;
}

function getUrlForBrowser(a) {
initValidUrlRE();
var i = a.match(validUrlRE);
return i && "undefined" != typeof i.length && i.length > 1 ? (null == i[1] && (a = "http://" + a), 
a) :null;
}

var gWasEmailLegal = !1;
function displayPreview(e, n, t, o) {
if (isValidFile(e)) {
"edit" == o && null != document.getElementById(t) && (document.getElementById(t).style.display = "none"), 
preloadImages(e.value);
var i = new Image();
i.src = e.value, document.getElementById(n).src = i.src;
}
}

function setImageDimensions(e) {
var n = new Image();
n.src = e.src;
var t = n.width, o = n.height;
originalImageWidth = t, originalImageHeight = o;
var i, s;
128 / t >= 1 && 128 / o >= 1 ? (i = t, s = o) :128 / o > 128 / t ? (i = 128, s = Math.floor(i * o / t)) :(s = 128, 
i = Math.floor(s * t / o)), e.width = i, e.height = s;
}

function checkSourceFileExtension(e) {
function n(e) {
return dotIndex = e.lastIndexOf("."), -1 == dotIndex || dotIndex == e.length - 1 ? "" :(extension = e.substring(dotIndex + 1), 
extension);
}
supportedExtensions = new Array("jpeg", "jpg", "png", "gif", "bmp", "jpe"), extension = n(e);
for (var t = 0, o = 0; o < supportedExtensions.length; o++) if (extension.toLowerCase() == supportedExtensions[o].toLowerCase()) {
t = 1;
break;
}
return t ? !0 :!1;
}

function checkSourceFileExtensionFor2CanonicalImg(e) {
function n(e) {
return dotIndex = e.lastIndexOf("."), -1 == dotIndex || dotIndex == e.length - 1 ? "" :(extension = e.substring(dotIndex + 1), 
extension);
}
supportedExtensions = new Array("apm", "bmp", "clp", "cur", "cut", "dcx", "dib", "dxf", "emf", "fpx", "gem", "gif", "ico", "iff", "img", "j2c", "j2k", "jng", "jp2", "jpc", "jpe", "jpeg", "jpg", "jpx", "mng", "pbm", "pcd", "pct", "pcx", "pgm", "pic", "pict", "png", "ppm", "psd", "psp", "ras", "rle", "sgi", "tga", "tif", "tiff", "wbm", "wbmp", "wmf", "wpg", "xbm", "xpm"), 
extension = n(e);
for (var t = 0, o = 0; o < supportedExtensions.length; o++) if (extension.toLowerCase() == supportedExtensions[o].toLowerCase()) {
t = 1;
break;
}
return t ? !0 :!1;
}
function recalcPictureSize(e, t) {
var i = document.body.clientWidth, n = document.body.clientHeight;
minDocumentWidth > i && (i = minDocumentWidth), minDocumentHeight > n && (n = minDocumentHeight);
var o, a, l = document.getElementById("sidebar");
null != l && "on" != l.className ? (o = 110, a = 110) :(o = pictureLeftMargin, a = pictureRightMargin);
var d = 445, r = n;
null != l && "on" == l.className && r > 530 && (r = 530), d / e >= 1 && r / t >= 1 ? (displayPictureWidth = e, 
displayPictureHeight = t) :r / t > d / e ? (displayPictureWidth = d, displayPictureHeight = Math.floor(displayPictureWidth * t / e)) :(displayPictureHeight = r, 
displayPictureWidth = Math.floor(displayPictureHeight * e / t)), (minDocumentWidth > displayPictureWidth || minDocumentHeight > displayPictureHeight) && (d = minDocumentWidth, 
r = minDocumentHeight, r / t > d / e ? (displayPictureWidth = d, displayPictureHeight = Math.floor(displayPictureWidth * t / e)) :(displayPictureHeight = r, 
displayPictureWidth = Math.floor(displayPictureHeight * e / t)));
}

function pictureResize(e, t, n) {
void 0 != document.getElementById("mainPicture") && "null" != document.getElementById("mainPicture") && (document.getElementById("mainPicture").width = displayPictureWidth, 
document.getElementById("mainPicture").height = displayPictureHeight);
var o = displayPictureWidth / e;
for (i = 0; i < n.length; i++) {
var a = document.getElementById("person_" + n[i][0]);
null != a && (a.style.width = n[i][1] * o, a.style.height = n[i][2] * o, a.style.left = n[i][3] * o + 2, 
a.style.top = n[i][4] * o + 2);
var l = document.getElementById("innerFrame1_" + n[i][0]);
null != l && (l.style.width = parseInt(a.style.width) + 4, l.style.height = parseInt(a.style.height) + 4, 
l.style.left = parseInt(a.style.left) - 1, l.style.top = parseInt(a.style.top) - 1);
var d = document.getElementById("innerFrame2_" + n[i][0]);
null != d && (d.style.width = parseInt(a.style.width) + 6, d.style.height = parseInt(a.style.height) + 6, 
d.style.left = parseInt(a.style.left) - 2, d.style.top = parseInt(a.style.top) - 2);
}
}

function mouseOnFace(e) {
mouseOnName(e);
var t = document.getElementById("person_" + e);
t && (t.style.cursor = "pointer");
var i = document.getElementById("name_" + e);
if (i) {
var n = document.getElementById("peopleInPhotoCheckBox");
n ? 0 == n.checked && (i.style.fontWeight = "bold") :i.style.fontWeight = "bold";
}
}

function mouseOutOfFace(e) {
mouseOutOfName(e);
var t = document.getElementById("name_" + e);
t && (t.style.fontWeight = "normal");
}

function mouseOnName(e) {
var t = document.getElementById("person_" + e);
t && (t.className = "FaceDetectionOuterFrame");
var i = document.getElementById("innerFrame1_" + e);
i && (i.className = "FaceDetectionInnerFrame");
var n = document.getElementById("innerFrame2_" + e);
n && (n.className = "FaceDetectionOuterFrame");
var o = document.getElementById("showNameFrame_" + e);
o && (o.className = "FaceDetectionNameFrame", o.style.display = "inline");
}

function mouseOutOfName(e) {
var t = document.getElementById("peopleInPhotoCheckBox");
if (t && t.checked) return !1;
var i = document.getElementById("person_" + e);
i && (i.className = "");
var n = document.getElementById("innerFrame1_" + e);
n && (n.className = "");
var o = document.getElementById("innerFrame2_" + e);
o && (o.className = "");
var a = document.getElementById("showNameFrame_" + e);
a && (a.style.display = "none");
}

function showPicture(e, t, n) {
document.getElementById("mainPicture").width, document.getElementById("mainPicture").height;
for (document.getElementById("photoContainer").style.display = "inline", i = 0; i < n.length; i++) ;
}

function doTooltip(e, t, i) {
return "undefined" != typeof Tooltip && Tooltip.ready ? void Tooltip.show(e, t, i) :void ("undefined" == typeof Tooltip ? window.status = "undefined" :Tooltip.ready || (window.status = "not redy"));
}

function hideTip() {
window.status = "", "undefined" != typeof Tooltip && Tooltip.ready && Tooltip.hide();
}

function showFullSizePhoto(e, t, i, n, o, a, l) {
var d, r, c, s, m = 5, u = 8, h = 8, y = 5, p = "fullSizePhoto.php?" + e, g = 17, f = 35, I = 26, P = t + n + o + u + m, v = i + a + l + I + f + h + y;
P > screen.availWidth ? (c = screen.availWidth, d = 0) :(d = screen.availWidth / 2 - P / 2, 
0 > d && (d = 0), c = P), v > screen.availHeight ? (s = screen.availHeight, c += g, 
d > 0 && (d -= g / 2), r = 0, v = screen.availHeight) :(r = screen.availHeight / 2 - v / 2, 
0 > r && (r = 0), s = v), parameters = "dialogHeight:" + s + "px;dialogWidth:" + c + "px;dialogLeft:" + d + "px;dialogTop:" + r + "px", 
openCenteredPopup2(p, c, s, "", "status:no;help:no;resizable:no;center:yes;scroll:yes;left:" + d + "px; top:" + r + "px;", null);
}

var displayPictureWidth, displayPictureHeight, minDocumentWidth = 200, minDocumentHeight = 200, pictureLeftMargin = 203, pictureRightMargin = 203, pictureTopMargin = 0, pageBackgroundWidth = 627;
function showFullPhoto(e, t, o, a) {
if (isNaturalNumber(e) && isNaturalNumber(t) && 0 != t && isNaturalNumber(o) && 0 != o) {
var i = document.getElementById("photoDimensionsIFrame");
if (i || (i = document.createElement("iframe"), i.setAttribute("style", "display:none;"), 
i.setAttribute("id", "photoDimensionsIFrame"), i.setAttribute("width", "0"), i.setAttribute("height", "0"), 
i.setAttribute("src", ""), document.body.appendChild(i)), i = document.getElementById("photoDimensionsIFrame"), 
!i) return void alert("Failed to create the photoDimensionsIFrame iframe");
var r = originalPhotoDimensionsURL;
r = replace(r, "&photoID=", "&photoID=" + t), r = replace(r, "&siteID=", "&siteID=" + e), 
r = replace(r, "&frameID=", "&frameID=" + o), r += "&randomParam=" + generateRandomString(7), 
r += a;
var n = a.indexOf("&file=");
if (-1 != n) {
var l = n + 6, s = a.indexOf("&", l);
if (-1 == s) var h = a.substr(l, a.length); else var h = a.substr(l, s);
var u = new Image();
u.src = h, r += "&localWidth=" + u.width, r += "&localHeight=" + u.height;
}
gAdditionalParams = a, i.src = r;
}
}

function showCelebrityPhoto(e) {
showFullPhoto(CompanySiteID, e, defaultFrameID, "&celeb=");
}

function photoDimensionsCallback(e, t, o, a, i, r) {
handleFullPhotoError(a) && internalDoNotCallThisLaunchFullPhotoPopoup(e, t, o, i, r, gAdditionalParams);
}

function handleFullPhotoError(e) {
return e == GET_FULL_PHOTO_POPUP_DIMENSIONS_SUCCESS ? !0 :(e == GET_FULL_PHOTO_POPUP_DIMENSIONS_MISSING_PHOTO && messageBox2(sectionID, popupTitle, popupBody, popupIcon, popupButtons, popupDefaultButtons, null), 
!1);
}

function internalDoNotCallThisLaunchFullPhotoPopoup(e, t, o, a, i, r) {
var n = 200, l = 200, s = !1;
a > screen.availWidth - n && (s = !0);
var h = Math.min(a, screen.availWidth - n), u = !1;
i > screen.availHeight - l && (u = !0);
var p = Math.min(i, screen.availHeight - l);
u && (h += 25);
var m = originalViewFullPhotoURL;
m = replace(m, "&photoID=", "&photoID=" + t), m = replace(m, "&theme=", "&theme=" + o), 
m += "&siteID=" + e, m += "&popupHeight=" + p, m += "&randomParam=" + generateRandomString(7), 
m += r, IsScrollbarNeeded = u || s ? "yes" :"no", window.open(m, "_blank", "width=" + h + ",height=" + p + ",left=" + (screen.width - h) / 2 + ",top=" + ((screen.height - p) / 2 - 50) + ",location=no,toolbar=no,menubar=no,status=no,resizable=no, scrollbars=" + IsScrollbarNeeded);
}

var gFullPhotoPopupDimensions = new Array(), gAdditionalParams;
function hideAllSelectComponentsOnIE6(o, l, t, e, n) {
if ("undefined" == typeof o || "undefined" == typeof l || "undefined" == typeof t || "undefined" == typeof e) {
if (n) return;
} else {
o = parseInt(o), l = parseInt(l);
l + parseInt(t), o + parseInt(e);
}
}

function hideAllSelectComponentsOnIE6UnderElement(o) {}

function showAllSelectComponentsOnIE6() {}

function getPreloadingAnimationString() {
return '<img src="' + AssetManager.R_IMG("/FP/Icons/AjaxIcons/loading.gif") + '">';
}

function updateBalloonData(o, l, t, e) {
var n = jQuery("#balloon_box" + t), i = jQuery("#balloon_box_data" + t);
if (i.empty().append(l), null != n.attr("class") && n.attr("class").indexOf("PK_") >= 0) {
e = e || {
width:0,
height:0
};
var a = i.outerWidth(), r = i.outerHeight();
a > e.width && (e.width = a), r > e.height && (e.height = r), n.css({
height:e.height + "px",
width:e.width + "px"
});
}
}

function toggleBalloonCloseButton(o, l) {
var t = document.getElementById("closeButtonDiv" + l);
t && (o ? t.style.display = "block" :t.style.display = "none");
}

function attachBalloonToBody(o) {
var l = o.parentNode;
l != document.body && (l.removeChild(o), document.body.appendChild(o));
}

function displayBalloon(o, l) {
function t(o) {
var l, t, e = balloonWidth, n = balloonHeight, i = 10 + o, a = o / 4 + .5, r = "h" + (e - 40), s = "a" + i + " " + i + " 0 0 1 " + i + " " + i, u = "v" + (n - 48), b = "a" + i + " " + i + " 0 0 1 " + -i + " " + i, p = "h" + -(e - 40), f = "a" + i + " " + i + " 0 0 1 " + -i + " " + -i, h = "v" + -(n - 48), g = "a" + i + " " + i + " 0 0 1 " + i + " " + -i + "z";
l = "right" == balloonHorizontalPosition ? balloonCalloutOffsetToTailRatio :1 - balloonCalloutOffsetToTailRatio;
var y = l * (e - 20) - 30 - a, m = e - 80 - y - 2 * a;
return "up" == balloonVerticalPosition ? (t = "M20 " + (10 - o), p = "h" + -m + "a20 15 0 0 0 -20 15 a" + a + " " + a + " 0 0 1 " + -(2 * a) + " 0 a20 15 0 0 0 -20 -15h" + -y, 
d = -5) :"down" == balloonVerticalPosition ? (t = "M20 " + (25 - o), r = "h" + y + "a20 15 0 0 0 20 -15 a" + a + " " + a + " 0 0 1 " + 2 * a + " 0 a20 15 0 0 0 20 15h" + m, 
d = 0) :(l = (parseInt(balloonTailTop, 10) + 25) / (n - 48), 0 > (n - 48) * (1 - l) - 25 && (l = .5), 
"right" == balloonHorizontalPosition ? (t = "M20 " + (10 - o), u = "v" + ((n - 48) * l - 20 - a) + "a15 20 0 0 0 15 20 a" + a + " " + a + " 0 0 1 0 " + 2 * a + "a15 20 0 0 0 -15 20v" + ((n - 48) * (1 - l) - 20 - a), 
c = 0) :(l = 1 - l, t = "M35 " + (10 - o), h = "v" + -((n - 48) * l - 20 - a) + "a15 20 0 0 0 -15 -20 a" + a + " " + a + " 0 0 1 0 " + -(2 * a) + "a15 20 0 0 0 15 -20v" + -((n - 48) * (1 - l) - 20 - a), 
c = -15)), t + r + s + u + b + p + f + h + g;
}
function e(o) {
var l = 100 * balloonWidth, t = 100 * balloonHeight, e = 100 * (10 + o), n = 100 * (o / 4 + .5), i = 2e3, a = 1500, r = .5, s = 2e3, u = 2e3, b = u + (l - 4e3), p = s + (t - 4800), f = "", h = "", g = "", y = "";
if ("up" == balloonVerticalPosition) {
r = "right" == balloonHorizontalPosition ? .75 :.25;
var m = b - (l * r - 2 * i - n), B = m - i - n, T = B - i - n, v = p + e + a;
g = "at" + (m - i) + "," + (v - a) + "," + (m + i) + "," + (v + a) + "," + m + "," + (v - a) + "," + (m - i) + "," + v + " ", 
g += "wa" + (B - n) + "," + (v - n) + "," + (B + n) + "," + (v + n) + "," + (B + n) + "," + v + "," + (B - n) + "," + v + " ", 
g += "at" + (T - i) + "," + (v - a) + "," + (T + i) + "," + (v + a) + "," + (T + i) + "," + v + "," + T + "," + (v - a) + " ", 
d = -5;
} else if ("down" == balloonVerticalPosition) {
s += 1500, p += 1500, r = "right" == balloonHorizontalPosition ? .25 :.75;
var m = u + (l * r - 2 * i - n), B = m + i + n, T = B + i + n, v = s - e - a;
f = "at" + (m - i) + "," + (v - a) + "," + (m + i) + "," + (v + a) + "," + m + "," + (v + a) + "," + (m + i) + "," + v + " ", 
f += "wa" + (B - n) + "," + (v - n) + "," + (B + n) + "," + (v + n) + "," + (B - n) + "," + v + "," + (B + n) + "," + v + " ", 
f += "at" + (T - i) + "," + (v - a) + "," + (T + i) + "," + (v + a) + "," + (T - i) + "," + v + "," + T + "," + (v + a) + " ", 
d = 0;
} else if (r = (parseInt(balloonTailTop, 10) + 25) / (balloonHeight - 48), 0 > (t - 48) * (1 - r) - 25 && (r = .5), 
"right" == balloonHorizontalPosition) {
var H = s + ((t - 4800) * r - i - n), P = H + i + n, w = P + i + n, O = b + e + a;
h = "at" + (O - a) + "," + (H - i) + "," + (O + a) + "," + (H + i) + "," + (O - a) + "," + H + "," + O + "," + (H + i) + " ", 
h += "wa" + (O - n) + "," + (P - n) + "," + (O + n) + "," + (P + n) + "," + O + "," + (P - n) + "," + O + "," + (P + n) + " ", 
h += "at" + (O - a) + "," + (w - i) + "," + (O + a) + "," + (w + i) + "," + O + "," + (w - i) + "," + (O - a) + "," + w + " ", 
c = 0;
} else {
u += 1500, b += 1500;
var w = s + ((t - 4800) * r - i - n), P = w + i + n, H = P + i + n, O = u - e - a;
y = "at" + (O - a) + "," + (H - i) + "," + (O + a) + "," + (H + i) + "," + (O + a) + "," + H + "," + O + "," + (H - i) + " ", 
y += "wa" + (O - n) + "," + (P - n) + "," + (O + n) + "," + (P + n) + "," + O + "," + (P + n) + "," + O + "," + (P - n) + " ", 
y += "at" + (O - a) + "," + (w - i) + "," + (O + a) + "," + (w + i) + "," + O + "," + (w + i) + "," + (O + a) + "," + w + " ", 
c = -15;
}
var x = "m" + u + "," + (s - e) + " ", W = "wa" + (b - e) + "," + (s - e) + "," + (b + e) + "," + (s + e) + "," + b + "," + (s - e) + "," + (b + e) + "," + s + " ", _ = "wa" + (b - e) + "," + (p - e) + "," + (b + e) + "," + (p + e) + "," + (b + e) + "," + p + "," + b + "," + (p + e) + " ", L = "wa" + (u - e) + "," + (p - e) + "," + (u + e) + "," + (p + e) + "," + u + "," + (p + e) + "," + (u - e) + "," + p + " ", I = "wa" + (u - e) + "," + (s - e) + "," + (u + e) + "," + (s + e) + "," + (u - e) + "," + s + "," + u + "," + (s - e) + " ", D = x + f + W + h + _ + g + L + y + I;
return D = D.replace(/\.[0-9]+/g, "");
}
function n(o) {
var l = balloonWidth, e = balloonHeight;
"" != balloonVerticalPosition || (l += 15), u.hasChildNodes() && (u.innerHTML = "");
var n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
u.appendChild(n), n.setAttribute("width", l), n.setAttribute("height", e), n.setAttribute("viewBox", "0 0 " + l + " " + e);
var i = document.createElementNS("http://www.w3.org/2000/svg", "g");
n.appendChild(i);
var a, r, s = f.length;
for (a = 0; s > a; a++) r = document.createElementNS("http://www.w3.org/2000/svg", "path"), 
n.appendChild(r), r.setAttribute("fill", f[a].fill), r.setAttribute("stroke", "#000000"), 
r.setAttribute("stroke-opacity", f[a]["stroke-opacity"]), r.setAttribute("d", t(a));
u.style.top = d + "px", u.style.left = c + "px";
}
function i(o) {
null == balloonDojoSurface ? balloonDojoSurface = dojox.gfx.createSurface(u, balloonWidth + 20, balloonHeight) :(balloonDojoSurface.clear(), 
balloonDojoSurface.setDimensions(balloonWidth + 20, balloonHeight));
var l, e, n = f.length;
for (l = 0; n > l; l++) e = balloonDojoSurface.createPath(t(l)).setStroke([ 0, 0, 0, f[l]["stroke-opacity"] ]), 
"none" != f[l].fill && e.setFill(f[l].fill);
u.style.top = d + "px", u.style.left = c + "px";
}
function a(o) {
var l = balloonWidth, t = balloonHeight;
"" != balloonVerticalPosition ? t += 15 :l += 15;
var n, i = '<v:group style="display:inline-block;WIDTH:' + l + "px;HEIGHT:" + t + 'px;" coordsize="' + l + "," + t + '" >', a = f.length;
for (n = 0; a > n; n++) i += '<v:shape style="WIDTH:' + l + "px;HEIGHT:" + t + 'px;" coordsize="' + 100 * l + "," + 100 * t + '" ' + ("none" != f[n].fill ? 'fillcolor="' + f[n].fill + '"' :'filled="false"') + ' path="' + e(n) + '"><v:stroke weight="1px" color="#000000" opacity="' + 100 * f[n]["stroke-opacity"] + '%" /></v:shape>';
i += "</v:group>", document.namespaces.v || document.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), 
u.innerHTML = i, u.style.top = d + "px", u.style.left = c + "px";
}
updateBalloonLocation(o, l);
var r = document.getElementById("balloon_box" + l), s = document.getElementById(balloonVerticalPosition + "_" + balloonHorizontalPosition + "_balloon_tail" + l);
if (attachBalloonToBody(r), hideAllSelectComponentsOnIE6(balloonTop, balloonLeft, r.offsetWidth, r.offsetHeight, !0), 
r.style.position = "absolute", r.style.display = "block", r.style.top = balloonTop + "px", 
r.style.left = balloonLeft + "px", r.className.indexOf("PK_") >= 0) {
var d = 0, c = 0, u = document.getElementById("balloon_box_vector" + l), b = document.getElementById("balloon_box_data" + l), p = document.getElementById("closeButtonDiv" + l), f = [ {
fill:"#FFFFFF",
"stroke-opacity":.2
}, {
fill:"none",
"stroke-opacity":.13
}, {
fill:"none",
"stroke-opacity":.1
}, {
fill:"none",
"stroke-opacity":.05
}, {
fill:"none",
"stroke-opacity":.03
} ];
"undefined" != typeof Modernizr && Modernizr.svg ? n(l) :"undefined" != typeof dojox && void 0 != dojox.gfx && void 0 != dojox.gfx.vml ? i(l) :window.isIE ? a(l) :(r.style.border = "5px solid #3295e6", 
r.style.backgroundColor = "#FFFFFF");
var h = "_tooltip" == l ? 5 :23;
"down" == balloonVerticalPosition ? (b.style.top = "18px", p.style.top = h + 18 + "px") :"up" == balloonVerticalPosition ? (b.style.top = "0", 
p.style.top = h + "px") :(b.style.top = "5px", p.style.top = h + 5 + "px");
} else s.style.display = "block", "" == balloonVerticalPosition && (s.style.top = balloonTailTop);
openRequestInProgress = !1, showBalloon = !0, isBalloonVisible = !0;
}

function moveBalloon(o) {}

function hideBalloon(o, l) {
if (o || "" == callingObjectID) {
var t = document.getElementById("balloon_box" + l), e = document.getElementById(balloonVerticalPosition + "_" + balloonHorizontalPosition + "_balloon_tail" + l);
null != t && (showAllSelectComponentsOnIE6(), "block" == t.style.display && "-1000px" != t.style.top && void 0 != window["balloonCloseButtonCallback" + l] && window["balloonCloseButtonCallback" + l](), 
t.style.position = "absolute", t.style.top = "-1000px", t.style.left = "300px", 
t.style.display = "block", null != e && (e.style.display = "none"), hideBalloonTails(l), 
balloonWriteMode = !1, isBalloonVisible = !1);
}
}

function hideAllBalloons(o) {
for (var l = 0; l < ALL_BALLOON_TYPES.length; l++) hideBalloon(o, ALL_BALLOON_TYPES[l]);
}

function hideBalloonTails(o) {
var l = document.getElementById("up_right_balloon_tail" + o);
l && (l.style.display = "none"), l = document.getElementById("up_left_balloon_tail" + o), 
l && (l.style.display = "none"), l = document.getElementById("down_right_balloon_tail" + o), 
l && (l.style.display = "none"), l = document.getElementById("down_left_balloon_tail" + o), 
l && (l.style.display = "none"), l = document.getElementById("_left_balloon_tail" + o), 
l && (l.style.display = "none"), l = document.getElementById("_right_balloon_tail" + o), 
l && (l.style.display = "none");
}

function updateMouseCoordinates(o, l) {
var t, e, n, i;
void 0 != l ? (t = Math.round(l.left + l.width / 2), e = Math.round(l.top + l.height / 2), 
n = Math.round(l.width / 2), i = Math.round(l.height / 2)) :null != o && (window.isIE ? (t = "LTR" == languageDirection ? o.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft :document.body.scrollLeft) :o.clientX - (document.body.scrollWidth - document.body.clientWidth - document.body.scrollLeft), 
e = o.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop :document.body.scrollTop)) :(t = o.pageX, 
e = o.pageY), n = 10, i = 10), curMouseX = t, curMouseY = e, balloonRefernceObjectHalfWidth = n, 
balloonRefernceObjectHalfHeight = i;
}

function requestToShowBalloon(o, l, t, e) {
openRequestInProgress = !0, callingObjectID = o, updateBalloonVerticalDirection(l, e), 
t ? displayBalloon(0, l) :setTimeout(function() {
displayBalloon(0, l);
}, openingBalloonTimeout);
}

function requestToHideBalloon(o) {
window.clearTimeout(delayedOpenBalloonId), callingObjectID = "", balloonWriteMode || (hideBalloonTimeout = setTimeout(function() {
hideBalloon(!1, o);
}, closingBalloonTimeout));
}

function updateCallingID(o) {
callingObjectID = o, hideBalloonTimeout && window.clearTimeout(hideBalloonTimeout);
}

function toggleBalloon(o, l) {
isBalloonVisible ? hideBalloon(!0, l) :(hideBalloon(!0, l), callingObjectID = "TextBalloon", 
updateBalloonVerticalDirection(l), displayBalloon(o, l));
}

function toggleTextBalloon(o, l, t) {
updateBalloonData(balloonVerticalPosition, l, t), toggleBalloon(o, t);
}

function getBalloonData(o) {
var l = document.getElementById("balloon_box_data" + o), t = "";
return "" != l.innerHTML && (t = l.innerHTML), t;
}

function updateBalloonExactLocation(o) {
var l = document.getElementById("balloon_box" + o);
if (l) {
balloonHeight = l.offsetHeight, balloonWidth = l.offsetWidth, balloonCalloutOffsetToTailRatio = 120 > balloonWidth ? .5 :PK_CalloutOffsetToTailRatio;
var t = 27, e = leftTailWidth, n = rightTailWidth;
l.className.indexOf("PK_") >= 0 && (t = 10 + (balloonWidth - 20) * balloonCalloutOffsetToTailRatio, 
e = PK_leftTailWidth, n = PK_rightTailWidth);
var i, a;
if ("down" == balloonVerticalPosition || "up" == balloonVerticalPosition) a = "down" == balloonVerticalPosition ? curMouseY + balloonRefernceObjectHalfHeight :curMouseY - balloonHeight - balloonRefernceObjectHalfHeight, 
i = "RTL" == languageDirection ? curMouseX - (balloonWidth - t) :curMouseX - t; else if ("" == balloonVerticalPosition && ("left" == balloonHorizontalPosition || "right" == balloonHorizontalPosition)) {
90 > balloonHeight && (balloonHeight = 90);
var r = balloonHeight - 52;
i = "left" == balloonHorizontalPosition ? curMouseX + e + balloonRefernceObjectHalfWidth :curMouseX - balloonWidth - n - balloonRefernceObjectHalfWidth, 
a = Math.max(curMouseY - Math.round(.381966 * r) - 25, document.body.scrollTop), 
balloonTailTop = Math.max(curMouseY - (a + 30) - 15, 10) + "px";
var s = document.body.scrollTop + document.body.clientHeight;
a + balloonHeight > s && (a = s - balloonHeight, balloonTailTop = Math.min(curMouseY - (a + 30) - 15, r - 45) + "px");
}
balloonTop = a, balloonLeft = i;
}
}

function getBestDirection(o) {
var l = o.visiblePixels, t = "up", e = -1;
for (var n in l) l[n] > e && (t = n, e = l[n]);
"up" == t ? (o.direction = "up", o.balloonHorizontalPosition = displayLanguageOppositeDirection) :"down" == t ? (o.direction = "down", 
o.balloonHorizontalPosition = displayLanguageOppositeDirection) :"right" == t ? (o.direction = "", 
o.balloonHorizontalPosition = "left") :"left" == t && (o.direction = "", o.balloonHorizontalPosition = "right");
}

function getBalloonVerticalDirection(o, l) {
var t = document.getElementById("balloon_box" + o), e = t.className.indexOf("PK_") >= 0;
balloonTop = t.offsetTop, balloonHeight = t.offsetHeight, balloonWidth = t.offsetWidth;
var n = curMouseX, i = curMouseY - 14;
if (document.all) var a = 0, r = document.body.scrollWidth - document.body.clientWidth - document.body.scrollLeft, s = "LTR" == languageDirection ? document.body.scrollLeft + document.body.clientWidth :document.body.clientWidth + r; else var a = document.body.scrollLeft, s = document.body.scrollLeft + document.body.clientWidth;
var d = document.body.scrollTop, c = document.body.scrollTop + document.body.clientHeight, u = {
firstX:a,
lastX:s,
firstY:d,
lastY:c
}, b = {};
b.direction = l ? "down" :"up", b.balloonHorizontalPosition = displayLanguageOppositeDirection, 
b.visiblePixels = new Array();
var p, f;
return "LTR" == languageDirection ? (p = canBalloonBeOpenedUpLTR(n, i, u, b, e), 
f = canBalloonBeOpenedDownLTR(n, i, u, b, e), l && f && (p = !1), p ? (b.direction = "up", 
b.balloonHorizontalPosition = displayLanguageOppositeDirection) :f ? (b.direction = "down", 
b.balloonHorizontalPosition = displayLanguageOppositeDirection) :canBalloonBeOpenedRight(n, i, u, b, e) ? (b.direction = "", 
b.balloonHorizontalPosition = "left") :canBalloonBeOpenedLeft(n, i, u, b, e) ? (b.direction = "", 
b.balloonHorizontalPosition = "right") :getBestDirection(b)) :(p = canBalloonBeOpenedUpRTL(n, i, u, b, e), 
f = canBalloonBeOpenedDownRTL(n, i, u, b, e), l && f && (p = !1), p ? (b.direction = "up", 
b.balloonHorizontalPosition = displayLanguageOppositeDirection) :f ? (b.direction = "down", 
b.balloonHorizontalPosition = displayLanguageOppositeDirection) :canBalloonBeOpenedLeft(n, i, u, b, e) ? (b.direction = "", 
b.balloonHorizontalPosition = "right") :canBalloonBeOpenedRight(n, i, u, b, e) ? (b.direction = "", 
b.balloonHorizontalPosition = "left") :getBestDirection(b)), b;
}

function canBalloonBeOpenedUpLTR(o, l, t, e, n) {
var i = 0, a = balloonWidth;
return n && (i = balloonWidth * balloonCalloutOffsetToTailRatio, a = balloonWidth * (1 - balloonCalloutOffsetToTailRatio)), 
l - balloonHeight > t.firstY && o - i > t.firstX && o + a < t.lastX ? !0 :(e.visiblePixels.up = l - t.firstY + (t.lastX - o), 
!1);
}

function canBalloonBeOpenedDownLTR(o, l, t, e, n) {
var i = 0, a = balloonWidth;
return n && (i = balloonWidth * balloonCalloutOffsetToTailRatio, a = balloonWidth * (1 - balloonCalloutOffsetToTailRatio)), 
l + balloonHeight < t.lastY && o - i > t.firstX && o + a < t.lastX ? !0 :(e.visiblePixels.down = t.lastY - l + (t.lastX - o), 
!1);
}

function canBalloonBeOpenedUpRTL(o, l, t, e, n) {
var i = balloonWidth, a = 0;
return n && (i = balloonWidth * (1 - balloonCalloutOffsetToTailRatio), a = balloonWidth * balloonCalloutOffsetToTailRatio), 
l - balloonHeight > t.firstY && o - i > t.firstX && o + a < t.lastX ? !0 :(e.visiblePixels.up = l - t.firstY + (o - t.firstX), 
!1);
}

function canBalloonBeOpenedDownRTL(o, l, t, e, n) {
var i = balloonWidth, a = 0;
return n && (i = balloonWidth * (1 - balloonCalloutOffsetToTailRatio), a = balloonWidth * balloonCalloutOffsetToTailRatio), 
l + balloonHeight < t.lastY && o - i > t.firstX && o + a < t.lastX ? !0 :(e.visiblePixels.down = t.lastY - l + (o - t.firstX), 
!1);
}

function canBalloonBeOpenedRight(o, l, t, e, n) {
return o + balloonWidth + rightTailWidth < t.lastX ? !0 :(e.visiblePixels.right = t.lastX - o + balloonHeight, 
!1);
}

function canBalloonBeOpenedLeft(o, l, t, e, n) {
return o - balloonWidth - leftTailWidth > t.firstX ? !0 :(e.visiblePixels.left = o - t.firstX + balloonHeight, 
!1);
}

function removeBalloonData(o, l) {
var t = document.getElementById("balloon_box_data" + l);
t.innerHTML = "";
}

function updateBalloonVerticalDirection(o, l) {
var t = getBalloonVerticalDirection(o, l);
if (balloonVerticalPosition != t.direction || balloonHorizontalPosition != t.balloonHorizontalPosition) {
var e = getBalloonData(o);
removeBalloonData(balloonVerticalPosition, o), hideBalloon(!0, o), updateBalloonData(t, e, o), 
balloonVerticalPosition = t.direction, balloonHorizontalPosition = t.balloonHorizontalPosition;
}
}

function updateBalloonLocation(o, l, t) {
0 != o && updateMouseCoordinates(o, t), updateBalloonExactLocation(l);
}

function setBalloonWriteMode(o) {
balloonWriteMode = 1 != o ? !1 :!0;
}

var curMouseX = 0, curMouseY = 0, balloonRefernceObjectHalfWidth = 0, balloonRefernceObjectHalfHeight = 0, balloonTop = 0, balloonLeft = 0, balloonWidth = 0, balloonHeight = 0, balloonTailTop = 0, balloonCalloutOffsetToTailRatio = 0, balloonVerticalPosition = "up", balloonHorizontalPosition = "right", showBalloon = !1, balloonWriteMode = !1, hideBalloonTimeout = null, openRequestInProgress = !1, isBalloonVisible = !1, balloonDojoSurface = null, callingObjectID = "", openingBalloonTimeout = 300, closingBalloonTimeout = 700, bottomTailHeight = 27, topTailHeight = 27, leftTailWidth = 33, rightTailWidth = 33, PK_CalloutOffsetToTailRatio = .22348, PK_leftTailWidth = 12, PK_rightTailWidth = 12, ieBrowserVersion = parseFloat(window.navigator.appVersion.substr(navigator.appVersion.indexOf("MSIE ") + 5, 10), 10);
var Base64 = {
_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode:function(r) {
var t, e, o, a, h, n, c, d = "", C = 0;
for (r = Base64._utf8_encode(r); C < r.length; ) t = r.charCodeAt(C++), e = r.charCodeAt(C++), 
o = r.charCodeAt(C++), a = t >> 2, h = (3 & t) << 4 | e >> 4, n = (15 & e) << 2 | o >> 6, 
c = 63 & o, isNaN(e) ? n = c = 64 :isNaN(o) && (c = 64), d = d + this._keyStr.charAt(a) + this._keyStr.charAt(h) + this._keyStr.charAt(n) + this._keyStr.charAt(c);
return d;
},
decode:function(r) {
var t, e, o, a, h, n, c, d = "", C = 0;
for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); C < r.length; ) a = this._keyStr.indexOf(r.charAt(C++)), 
h = this._keyStr.indexOf(r.charAt(C++)), n = this._keyStr.indexOf(r.charAt(C++)), 
c = this._keyStr.indexOf(r.charAt(C++)), t = a << 2 | h >> 4, e = (15 & h) << 4 | n >> 2, 
o = (3 & n) << 6 | c, d += String.fromCharCode(t), 64 != n && (d += String.fromCharCode(e)), 
64 != c && (d += String.fromCharCode(o));
return d = Base64._utf8_decode(d);
},
_utf8_encode:function(r) {
r = r.replace(/\r\n/g, "\n");
for (var t = "", e = 0; e < r.length; e++) {
var o = r.charCodeAt(e);
128 > o ? t += String.fromCharCode(o) :o > 127 && 2048 > o ? (t += String.fromCharCode(o >> 6 | 192), 
t += String.fromCharCode(63 & o | 128)) :(t += String.fromCharCode(o >> 12 | 224), 
t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
}
return t;
},
_utf8_decode:function(r) {
for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length; ) o = r.charCodeAt(e), 128 > o ? (t += String.fromCharCode(o), 
e++) :o > 191 && 224 > o ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), 
e += 2) :(c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), 
e += 3);
return t;
}
};
function getMissingEntries(e) {
if (0 > e) return void (prevnext_buttonClickable = !0);
var t = MAX_NUM_ENTRIES_PER_ANIMATION + NUM_INVISIBLE_PRELOADED_ENTRIES, n = 0, i = [], a = e;
if (isNextMovement()) {
do n++, prevnext_availableItemIndexes[a] || (i[i.length] = a), a++; while (t > n && a <= prevnext_lastEntryIndex);
} else do n++, prevnext_availableItemIndexes[a] || (i[i.length] = a), a--; while (t > n && a >= 0);
var r = i.length;
if (0 == r) return void (prevnext_buttonClickable = !0);
prevnext_ajaxStartOffset = isNextMovement() ? i[0] :i[r - 1];
var o = getAjaxObject(), v = "siteID=" + prevNextSiteID + "&itemType=" + prevNextItemType + "&itemURL=" + prevNextItemURL + "&offset=" + prevnext_ajaxStartOffset + "&num=" + r;
sendAjaxRequest(o, navigateAjaxURL, v, "", "GET", prevNextNavigateCallback, "", "");
}

function prevNextNavigateCallback(e, t) {
prevnext_buttonClickable = !0;
var n = document.getElementById("prevNextPanel");
if (null != n) {
t = unescape(t);
var i = -1 != t.indexOf("<error ");
if (!i) {
var a = document.getElementById("PrevNextEntries");
if (a) {
var r = t.match(/External1Border/g);
if (null != r) {
for (var o = r.length, v = 0; o > v; v++) prevnext_availableItemIndexes[prevnext_ajaxStartOffset] = !0, 
prevnext_ajaxStartOffset++;
var l = a.innerHTML;
if (isNextMovement()) newContent = l + t; else {
newContent = t + l;
var x = parseInt("RTL" == languageDirection ? n.style.right :n.style.left);
x -= o * prevnext_numPixelsToMovePerSingleStep, "RTL" == languageDirection ? n.style.right = x + "px" :n.style.left = x + "px";
}
a.style.width = parseInt(a.style.width) + o * prevnext_numPixelsToMovePerSingleStep + "px", 
a.innerHTML = newContent, prevnext_ajaxStartOffset = "";
}
}
}
}
}

function isNextMovement() {
return -1 == prevnext_animationDirection ? !0 :!1;
}

function navigationPrevClicked() {
0 == prevnext_buttonClickable || document.getElementById("prevArrow").className.indexOf("Disabled") >= 0 || (disableNavigationButtons(), 
toggleNavigationButton("nextArrow", "ClickableNavButtonRight"), prevnext_animationDirection = 1, 
prevnext_numStepsToTakeInAnimation = Math.min(MAX_NUM_ENTRIES_PER_ANIMATION, prevnext_left), 
prevnext_left -= prevnext_numStepsToTakeInAnimation, prevnext_right -= prevnext_numStepsToTakeInAnimation, 
triggerAnimation(), prevnext_left <= 0 && (toggleNavigationButton("prevArrow", "ClickableNavButtonLeftDisabled"), 
prevnext_left = 0), writeActivityIndicator(ACTIVITY_VIEW_EDIT_PHOTO, SCENARIO_VIEWPHOTO_NAVIGATION_BROWSE));
}

function navigationNextClicked() {
0 == prevnext_buttonClickable || document.getElementById("nextArrow").className.indexOf("Disabled") >= 0 || (disableNavigationButtons(), 
toggleNavigationButton("prevArrow", "ClickableNavButtonLeft"), prevnext_animationDirection = -1, 
prevnext_numStepsToTakeInAnimation = Math.min(MAX_NUM_ENTRIES_PER_ANIMATION, prevnext_lastEntryIndex - prevnext_right), 
prevnext_left += prevnext_numStepsToTakeInAnimation, prevnext_right += prevnext_numStepsToTakeInAnimation, 
triggerAnimation(), prevnext_right >= prevnext_lastEntryIndex && (toggleNavigationButton("nextArrow", "ClickableNavButtonRightDisabled"), 
prevnext_right = prevnext_lastEntryIndex), writeActivityIndicator(ACTIVITY_VIEW_EDIT_PHOTO, SCENARIO_VIEWPHOTO_NAVIGATION_BROWSE));
}

function navigationPhotoClicked(e) {
writeActivityIndicator(ACTIVITY_VIEW_EDIT_PHOTO, SCENARIO_VIEWPHOTO_NAVIGATION_CLICK), 
"undefined" != typeof navigationPhotoClickedViaAjax && navigationPhotoClickedViaAjax(e) || (document.location.href = e);
}

function disableNavigationButtons() {
prevnext_buttonClickable = !1;
}

function toggleNavigationButton(e, t) {
var n = document.getElementById(e);
n && (n.className = "Clickable " + t);
}

function triggerAnimation() {
prevnext_animationInterval = window.setInterval(function() {
animatePrevNextMechanism();
}, ANIMATION_SPEED_IN_MILLIS);
}

function animatePrevNextMechanism() {
var e = document.getElementById("prevNextPanel");
if (null != e) {
var t = prevnext_numPixelsToMovePerSingleStep * prevnext_numStepsToTakeInAnimation;
if (prevnext_numAnimationMoved >= t) clearInterval(prevnext_animationInterval), 
prevnext_numAnimationMoved = 0, getMissingEntries(isNextMovement() ? prevnext_right + 1 :prevnext_left - 1); else {
var n = t - prevnext_numAnimationMoved;
n > ANIMATION_GAP_IN_PIXELS && (n = ANIMATION_GAP_IN_PIXELS);
var i = parseInt("RTL" == languageDirection ? e.style.right :e.style.left);
i += n * prevnext_animationDirection, prevnext_numAnimationMoved += n, "RTL" == languageDirection ? e.style.right = i + "px" :e.style.left = i + "px";
}
}
}

var prevnext_animationDirection, prevnext_numAnimationMoved = 0, prevnext_buttonClickable = !0, prevnext_animationInterval, prevnext_ajaxStartOffset, prevnext_numStepsToTakeInAnimation;
function inviteFamilyMemberCloseRoll(e, i, t) {
if (familyMemberShadingEnabled) {
"undefined" == typeof t && (t = INCENTIVE_TYPE_EMAIL);
var n = "";
n = t == INCENTIVE_TYPE_EMAIL ? "familyMember" :"familyEvent";
var a = document.getElementById(n + "CloseBtn" + e), l = document.getElementById(n + "Details" + e);
i ? (a.className = "Clickable ClickableCloseBtnOnGrayRoll", l.className.indexOf("NewsFeedItemGrayed") < 0 && (l.className += " NewsFeedItemGrayed")) :(a.className = "Clickable ClickableCloseBtnOnGray", 
l.className.indexOf("NewsFeedItemGrayed") >= 0 && (l.className = l.className.replace(/NewsFeedItemGrayed/g, "")));
}
}

function inviteFamilyMemberClose(e, i, t, n) {
var a;
"undefined" == typeof i ? (i = INCENTIVE_TYPE_EMAIL, t = INCETIVIZER_ITEM_TYPE_INDIVIDUAL, 
a = window.inviteFamilyMemberCloseCallback) :a = window.addFamilyEventsCloseCallback;
var l = [ "siteID=" + currentSiteId, "accountID=" + currentUserAccountID, "incentiveType=" + i, "itemType=" + t, "itemID=" + e ].join("&"), r = getAjaxObject();
sendAjaxRequest(r, INCENTIVIZER_API_REMOVE_ITEM_LOCATION, l, "", "GET", a, [ e ], ""), 
"undefined" != typeof n && writeActivityIndicator(ACTIVITY_INCENTIVIZER, n);
}

function inviteFamilyMemberFamilyMemberHide(e, i) {
var t = document.getElementById("familyMember" + e);
t.style.opacity = i / 100, i -= 10, 0 > i ? setTimeout(function() {
document.getElementById("familyMember" + e).style.display = "none";
}, 300) :setTimeout(function() {
inviteFamilyMemberFamilyMemberHide(e, i);
}, 100);
}

function inviteFamilyMemberCloseCallback(e, i, t) {
inviteFamilyMemberCommonCallback(e, i, t, !1);
}

function inviteFamilyMemberCommonCallback(e, i, t, n) {
i = unescape(i);
var a = "<error>", l = "</error>", r = i.indexOf(a), m = i.indexOf(l), t = t.toString().replace(/,/g, "_"), I = INCENTIVIZER_API_UNEXPECTED_ERROR;
if (r >= 0 && m >= 0 && (I = i.substring(r + a.length, m)), I != INCENTIVIZER_API_ALL_OK && I != INCENTIVIZER_API_INDIVIDUAL_ALREADY_ASSOCIATED) {
var E = INVITE_FAMILY_MEMBER_ERROR_TEXT;
return I == INCENTIVIZER_API_MEMBER_ALREADY_ASSOCIATED && (E = INVITE_FAMILY_MEMBER_DUPLICATE_EMAIL_TEXT), 
alert(E), enableCssButton("inviteFamilyMembersBtn" + t), void jQuery("#InviteFamilyLoading" + t).hide();
}
var o = document.getElementById("familyMember" + t);
o.style.visibility = "hidden", familyMemberShadingEnabled = !1, setTimeout(function() {
familyMemberShadingEnabled = !0;
}, 500);
var d = shouldWaitBeforeDisplayingNextFamilyMember(t);
familyMemberIds[t] = !1, d ? setTimeout(function() {
inviteFamilyMemberRefreshList(t, !!n);
}, 300) :inviteFamilyMemberRefreshList(t, n), "undefined" == typeof familyMemberList[hiddenFamilyMemberIndex] && isMoreFamilyMembersAvailable && document.location.reload();
}

function inviteFamilyMemberRefreshList(e, i) {
var t = document.getElementById("familyMember" + e);
if (t.style.display = "none", "undefined" != typeof familyMemberList[hiddenFamilyMemberIndex]) {
var n = familyMemberList[hiddenFamilyMemberIndex], a = document.getElementById("familyMember" + n);
a.style.display = "block", familyMemberIds[n] = !0, hiddenFamilyMemberIndex++;
}
if (i) {
var l = document.getElementById("inviteSuccessRow"), r = document.getElementById("inviteSuccessText"), m = document.getElementById("InviteFamilyMembersName" + e);
if (null != l && null != r && null != m) {
var I = getObjInnerText(m), E = INVITE_FAMILY_MEMBER_INVITATION_TO_NAME_SENT_SUCCESSFULLY_TEXT.replace("%1", I);
setObjInnerText(r, E), l.style.display = "";
for (var o = r.offsetTop; null != r; ) o += r.offsetTop, r = r.offsetParent;
o < document.body.scrollTop && (location.hash = "InviteFamilySuccess");
}
}
}

function shouldWaitBeforeDisplayingNextFamilyMember(e) {
if ("undefined" != typeof familyMemberList[hiddenFamilyMemberIndex]) return !0;
for (var i = familyMemberList.length - 1; i >= 0; i--) if (familyMemberIds[familyMemberList[i]]) return familyMemberList[i] != e;
return !1;
}

function inviteFamilyMemberEmailFocus(e) {
if (e.value == INVITE_FAMILY_MEMBER_EMAIL_TEXT) {
e.value = "", e.dir = "ltr", e.className = "FL_FieldTextSmall", "undefined" != typeof e.document && e.document.selection.clear();
var i = e.id.substr(17);
e.onkeypress = function(e) {
"undefined" == typeof e && (e = window.event), 13 == e.keyCode && inviteFamilyMembersClicked(i);
};
}
}

function inviteFamilyMemberEmailBlur(e) {
if ("" == e.value) {
e.dir = document.body.dir, e.value = INVITE_FAMILY_MEMBER_EMAIL_TEXT;
var i = e.id.substr(17), t = document.getElementById("familyMemberError" + i);
t.style.display = "none", e.className = "InviteFamilyMembersHomeEmailField";
}
}

function inviteFamilyMembersClicked(e) {
if (familyMemberIds[e]) {
var i = document.getElementById("familyMemberEmail" + e), t = document.getElementById("familyMemberError" + e), n = document.getElementById("InviteFamilyMembersName" + e);
if (null == i || null == t || null == n) return;
var a = i.value;
if (t.style.display = "none", "" == a || a == INVITE_FAMILY_MEMBER_EMAIL_TEXT) {
var l = getObjInnerText(n);
return setObjInnerText(t, INVITE_FAMILY_MEMBER_EMPTY_EMAIL_TEXT.replace("%1", l)), 
void (t.style.display = "block");
}
if (a = trim(a).toLowerCase(), !isEmail(a) || a == trim(INVITE_FAMILY_MEMBER_EMAIL_TEXT).toLowerCase()) return setObjInnerText(t, INVITE_FAMILY_MEMBER_INVALID_EMAIL_TEXT), 
void (t.style.display = "block");
inviteFamilyMembersSendEmails(e);
}
}

function inviteFamilyMembersSendEmails(e) {
disableCssButton("inviteFamilyMembersBtn" + e);
var i = document.getElementById("familyMemberEmail" + e), t = i.value;
t = trim(t).toLowerCase();
var n = '<incentivizer-data-process siteID="' + currentSiteId + '" accountID="' + currentUserAccountID + '" incentiveType="' + INCENTIVE_TYPE_EMAIL + '"' + ("undefined" != typeof inviteFamilyMembersActivityID ? ' processDataActivityID="' + inviteFamilyMembersActivityID + '"' :"") + ">";
n += '<item itemType="' + INCETIVIZER_ITEM_TYPE_INDIVIDUAL + '" itemID="' + e + '"><![CDATA[' + t + "]]></item>", 
n += "</incentivizer-data-process>", jQuery("#InviteFamilyLoading" + e).show();
var a = getAjaxObject();
sendAjaxRequest(a, INCENTIVIZER_API_DATA_PROCESS_LOCATION, "lang=" + currentUserLang + "&incentiveType=" + INCENTIVE_TYPE_EMAIL + "&dataToProcess=" + encodeURIComponent(n), "", "POST", window.inviteFamilyMembersSendEmailsCallback, [ e ], "");
}

function inviteFamilyMembersSendEmailsCallback(e, i, t) {
inviteFamilyMemberCommonCallback(e, i, t, !0);
}

function inviteFamilyForGreetingEmailFocus(e) {
var i = document.getElementById("familyForGreetingEmail" + e), t = familyForGreetingList[e].defaultText;
i.value == t && (i.value = "", i.dir = "ltr", i.className = "InviteFamilyForGreetingEmailFieldInWork", 
"undefined" != typeof i.document && i.document.selection.clear());
}

function inviteFamilyForGreetingEmailBlur(e) {
var i = document.getElementById("familyForGreetingEmail" + e), t = document.getElementById("familyForGreetingError" + e), n = familyForGreetingList[e].defaultText;
"" == i.value ? (i.dir = document.body.dir, i.value = n, t.style.display = "none", 
i.className = "InviteFamilyForGreetingEmailField FL_LabelDimmed") :isEmail(i.value) ? (t.style.display = "none", 
i.className = "InviteFamilyForGreetingEmailFieldInWork") :(setObjInnerText(t, INVITE_FAMILY_MEMBER_INVALID_EMAIL_TEXT), 
t.style.display = "", i.className.indexOf("FieldInError") < 0 && (i.className += " FieldInError"));
}

function inviteFamilyForGreetingCheck() {
var e = document.getElementById("commentBody"), i = trim(e.value);
if ("" != i && i != e.getAttribute("originalValue")) {
var t = !0, n = '<incentivizer-data-process siteID="' + currentSiteId + '" accountID="' + currentUserAccountID + '" incentiveType="' + INCENTIVE_TYPE_EMAIL + '" processDataActivityID="' + emailActivityID + '">', a = 0, l = new Array();
for (id in familyForGreetingList) if (parseInt(id) == id) {
var r = (familyForGreetingList[id].name, document.getElementById("familyForGreetingEmail" + id)), m = document.getElementById("familyForGreetingError" + id);
if (null != r && null != m) {
var I = trim(r.value).toLowerCase();
"" == r.value || r.value == familyForGreetingList[id].defaultText ? t = !0 :isEmail(r.value) ? l[I] ? (setObjInnerText(m, INVITE_FAMILY_MEMBER_DUPLICATE_EMAIL_TEXT), 
m.style.display = "", r.className.indexOf("FieldInError") < 0 && (r.className += " FieldInError"), 
t = !1) :(l[I] = !0, n += '<item itemType="' + INCETIVIZER_ITEM_TYPE_INDIVIDUAL + '" itemID="' + id + '"><![CDATA[' + I + "]]></item>", 
a++) :(setObjInnerText(m, INVITE_FAMILY_MEMBER_INVALID_EMAIL_TEXT), m.style.display = "", 
r.className.indexOf("FieldInError") < 0 && (r.className += " FieldInError"), t = !1);
}
}
if (a > 0 && t) {
n += "</incentivizer-data-process>";
var E = getAjaxObject();
return sendAjaxRequest(E, INCENTIVIZER_API_DATA_PROCESS_LOCATION, "lang=" + currentUserLang + "&incentiveType=" + INCENTIVE_TYPE_EMAIL + "&dataToProcess=" + encodeURIComponent(n), "", "POST", window.inviteFamilyForGreetingCallback, [ a ], ""), 
disableAddCommentButton(), !1;
}
return t;
}
}

function inviteFamilyForGreetingPostCommentAdd() {
writeCommentActivityIndicator();
}

function writeCommentActivityIndicator() {
writeActivityIndicator(ACTIVITY_SINGLE_EVENT_PAGE, greetingScenario, !0);
}

function inviteFamilyForGreetingCallback(e, i, t) {
i = unescape(i);
var n = "<error>", a = "</error>", l = i.indexOf(n), r = i.indexOf(a), m = INCENTIVIZER_API_UNEXPECTED_ERROR;
l >= 0 && r >= 0 && (m = i.substring(l + n.length, r)), m != INCENTIVIZER_API_ALL_OK && m != INCENTIVIZER_API_INDIVIDUAL_ALREADY_ASSOCIATED ? m == INCENTIVIZER_API_MEMBER_ALREADY_ASSOCIATED ? alert(INVITE_FAMILY_MEMBER_DUPLICATE_EMAIL_TEXT) :alert(INVITE_FAMILY_MEMBER_ERROR_OCCURRED) :(familyForGreetingList = new Array(), 
addNewComment()), enableAddCommentButton();
}
function addFamilyEventsCloseCallback(e, t, n) {
addFamilyEventsCommonCallback(e, t, n, !1);
}

function addFamilyEventsCommonCallback(e, t, n, a) {
t = unescape(t);
var d = "<error>", l = "</error>", i = t.indexOf(d), r = t.indexOf(l), n = n.replace(/,/g, "_");
if (0 > i || 0 > r || t.substring(i + d.length, r) != INCENTIVIZER_API_ALL_OK) {
alert(errorOccurred), enableCssButton("addEventBtn" + n);
var s = document.getElementById("preloader" + n);
return void (null != s && (s.style.display = "none"));
}
var o = document.getElementById("familyEventDetails" + n);
if (null != o) {
o.style.visibility = "hidden", familyMemberShadingEnabled = !1, setTimeout(function() {
familyMemberShadingEnabled = !0;
}, 500);
var v = getNextEventToShow(o);
null != v ? setTimeout(function() {
addFamilyEventsRefreshList(n, !!a);
}, 300) :addFamilyEventsRefreshList(n, a);
}
}

function getNextEventToShow(e) {
for (e = e.nextSibling; null != e; ) {
if (null != e.className && e.className.indexOf("ToBeDisplayed") >= 0) return e;
e = e.nextSibling;
}
return null;
}

function addFamilyEventsRefreshList(e, t) {
var n = document.getElementById("familyEventDetails" + e);
if (null != n) {
n.className = "AddFamilyEventsRowDeleted";
var a = getNextEventToShow(n);
if (null != a) a.className = "incentivizerRow AddFamilyEventsRowVisible", jQuery(a).find("select").styledSelect(); else if (isMoreFamilyEventsAvailable) {
var d, l = n.parentNode, i = !1, r = l.rows.length;
for (d = 0; r > d; d++) if (l.rows[d].className.indexOf("RowVisible") >= 0) {
i = !0;
break;
}
i || document.location.reload();
}
if (t) {
var s = document.getElementById("addEventSuccessRow"), o = document.getElementById("addEventSuccessText");
if (null != s && null != o && null != addEventSuccessMsg) {
setObjInnerText(o, addEventSuccessMsg), s.style.display = "";
for (var v = o.offsetTop; null != o; ) v += o.offsetTop, o = o.offsetParent;
v < document.body.scrollTop && (location.hash = "AddFamilyEventsSuccess");
}
}
}
}

function addEventClicked(e, t, n, a, d, l) {
var i = e.replace(/,/g, "_"), r = getDateEntryValidationObj(i);
if (r.isDayMissing || r.isMonthMissing || r.isYearMissing) return addEventsShowError(i, EnterACompleteDate), 
void enableCssButton("addEventBtn" + i);
if (!r.isDateValid) return addEventsShowError(i, EnterAValidDate), void enableCssButton("addEventBtn" + i);
disableCssButton("addEventBtn" + i), jQuery("#preloader" + i).show(), addEventsHideError(i);
var s = parseInt(r.selectedDay, 10), o = parseInt(r.selectedMonth, 10), v = parseInt(r.selectedYear, 10);
addEventSuccessMsg = d;
var c = r.monthSelect.options[r.monthSelect.selectedIndex].text, u = v + (10 > o ? "0" :"") + o + (10 > s ? "0" :"") + s + "0", E = eventDateFormat.replace(/%1/, c).replace(/%2/, s).replace(/%3/, v), f = e.split(",")[0], m = '<incentivizer-data-process siteID="' + currentSiteId + '" accountID="' + currentUserAccountID + '" incentiveType="' + INCENTIVE_TYPE_EVENT + '" processDataActivityID="' + PROCESS_DATA_ACTIVITY_ID_EVENT + '">';
m += '<item itemType="' + f + '" itemID="' + e + '">', m += "<eventID>" + t + "</eventID>", 
m += "<eventDataLanguage>" + n + "</eventDataLanguage>", m += "<familyID>" + a + "</familyID>", 
m += "<eventSortedDate>" + u + "</eventSortedDate>", m += "<eventDate><![CDATA[" + E + "]]></eventDate>", 
m += "</item>", m += "</incentivizer-data-process>";
var y = getAjaxObject();
sendAjaxRequest(y, INCENTIVIZER_API_DATA_PROCESS_LOCATION, "incentiveType=" + INCENTIVE_TYPE_EVENT + "&dataToProcess=" + encodeURIComponent(m), "", "POST", window.addFamilyEventsAddCallback, i, ""), 
"undefined" != typeof l && writeActivityIndicator(ACTIVITY_INCENTIVIZER, l);
}

function addFamilyEventsAddCallback(e, t, n) {
addFamilyEventsCommonCallback(e, t, n, !0), reloadEventsList();
}

function reloadEventsList() {
clearEventCalloutCache(), hideLastNotification();
var e = document.getElementById("eventsMainContent"), t = document.getElementById("eventsCalendar");
if (null != e || null != t) {
var n = getAjaxObject();
sendAjaxRequest(n, reloadEventsAjaxScript, "", "eventsMainContent", "GET", window.reloadEventsCallback, "", "");
} else if ("undefined" != typeof navigateCalendar) {
var a = new Date(), d = a.getMonth() + 1, l = a.getFullYear();
navigateCalendar("EventCalendar", d, l);
}
}

function reloadEventsCallback(e) {
"undefined" != typeof calendarLoaded && calendarLoaded();
var t = document.getElementById("searchResultsNavigationLine");
if (null != t) {
var n = document.getElementById("eventsMainContent");
if (null != n) {
var a = 0, d = n.getElementsByTagName("TR");
if (null != d) {
var l, i = d.length;
for (l = 0; i > l; l++) ("FirstRow" == d[l].className || "MidRow" == d[l].className) && a++;
}
var r = t.getElementsByTagName("SPAN");
if (null != r) {
var l, i = r.length;
for (l = 0; i > l; l++) if ("FL_LabelLargeBold" == r[l].className) {
resultCaption = r[l];
var s = getObjInnerText(resultCaption);
s = s.replace(/[0-9]+/, a), setObjInnerText(resultCaption, s);
break;
}
}
}
}
}

function openAddEventDialog(e) {
null != AddEventPrevId && closeAddEventDialog(AddEventPrevId), AddEventPrevId = e, 
jQuery("#linkRow" + e).hide();
var t = jQuery("#formRow" + e).show();
t.find("select").styledSelect(), t.find("input,select").each(function() {
var e = jQuery(this);
e.data("prev-val", e.val());
});
}

function closeAddEventDialog(e) {
if (jQuery("#linkRow" + e).show(), jQuery("#formRow" + e).hide(), addEventsHideError(e), 
null != AddEventPrevId) {
var t = jQuery("#formRow" + AddEventPrevId);
t.find("input,select").each(function() {
var e = jQuery(this);
e.val(e.data("prev-val"));
}), t.find("select").trigger("change"), AddEventPrevId = null;
}
}

function addEventsShowHelper(e) {
jQuery("#addEventError" + e).is(":visible") || jQuery("#addEventHint" + e).show();
}

function addEventsShowError(e, t) {
jQuery("#addEventHint" + e).hide(), jQuery("#addEventError" + e).text(t).show();
}

function addEventsHideError(e) {
jQuery("#addEventError" + e).hide();
}

var addEventSuccessMsg = null, AddEventPrevId = null;
function showWhatsThis(l, o) {
displayedTooltip = document.getElementById("whatsThisToolTip" + o);
var d = "block" == displayedTooltip.style.display;
if (d) hideWhatsThis(); else if (null != displayedTooltip) {
var i = displayedTooltip.parentNode;
i != document.body && (i.removeChild(displayedTooltip), document.body.appendChild(displayedTooltip)), 
displayedTooltip.style.display = "block", displayedTooltip.style.top = (l.clientY ? l.clientY :l.pageY) + document.body.scrollTop + 10 + "px", 
xScroll = document.body.scrollLeft;
var t = (l.clientX ? l.clientX :l.pageX) + xScroll - Math.round(displayedTooltip.offsetWidth / 2), e = document.body.scrollLeft + document.body.clientWidth;
t + displayedTooltip.offsetWidth > e && (t = e - displayedTooltip.offsetWidth), 
t < xScroll && (t = xScroll), displayedTooltip.style.left = t + "px";
}
}

function hideWhatsThis() {
null != displayedTooltip && (displayedTooltip.style.display = "", displayedTooltip = null);
}

var displayedTooltip = null;
function gdp_getCurrentDateTypePickerLink(e, t, d) {
var r = null;
return "undefined" == typeof e && (e = gdp_isMainDateCurrent), "undefined" == typeof t && (t = gdp_isFirstDateCurrent), 
"undefined" == typeof d && (d = gdp_isSecondDateCurrent), null != gdp_currentDatePickerId && (e ? r = document.getElementById("gdp_mainDateTypePickerLink_" + gdp_currentDatePickerId) :t ? r = document.getElementById("gdp_firstDateTypePickerLink_" + gdp_currentDatePickerId) :d && (r = document.getElementById("gdp_secondDateTypePickerLink_" + gdp_currentDatePickerId))), 
r;
}

function gdp_dateDayFocus(e) {
e.className = "gdp_day ", jQuery(e).parent(".select-replace-cover").removeClass("select-replace-cover-dimmed");
}

function gdp_dateDayBlur(e) {
e.value <= 0 && (e.className = "gdp_day gdp_dayDimmed", jQuery(e).parent(".select-replace-cover").addClass("select-replace-cover-dimmed"));
}

function gdp_dateMonthFocus(e) {
e.className = "gdp_month ", jQuery(e).parent(".select-replace-cover").removeClass("select-replace-cover-dimmed");
}

function gdp_dateMonthBlur(e) {
e.value <= 0 && (e.className = "gdp_month gdp_monthDimmed", jQuery(e).parent(".select-replace-cover").addClass("select-replace-cover-dimmed"));
}

function gdp_dateYearFocus(e) {
e.value == DATE_YEAR && (e.value = "", e.className = e.className.replace(" gdp_yearDimmed", ""));
}

function gdp_dateYearBlur(e) {
"" == e.value ? (e.value = DATE_YEAR, e.className += " gdp_yearDimmed") :e.value == DATE_YEAR && e.className.indexOf("gdp_yearDimmed") < 0 && (e.className += " gdp_yearDimmed");
}

function gdp_turnOnAutoHide() {
document.attachEvent ? (document.attachEvent("onclick", gdp_dateTypePickerHide), 
document.attachEvent("onkeyup", gdp_dateTypePickerHide)) :(document.addEventListener("click", gdp_dateTypePickerHide, !1), 
document.addEventListener("keyup", gdp_dateTypePickerHide, !1));
}

function gdp_turnOffAutoHide() {
document.detachEvent ? (document.detachEvent("onclick", gdp_dateTypePickerHide), 
document.detachEvent("onkeyup", gdp_dateTypePickerHide)) :(document.removeEventListener("click", gdp_dateTypePickerHide, !1), 
document.removeEventListener("keyup", gdp_dateTypePickerHide, !1));
}

function gdp_mainDateTypePickerShow(e) {
gdp_currentDatePickerId = e, gdp_isMainDateCurrent = !0, gdp_isFirstDateCurrent = !1, 
gdp_isSecondDateCurrent = !1, gdp_dateTypePickerShow();
}

function gdp_firstDateTypePickerShow(e) {
gdp_currentDatePickerId = e, gdp_isMainDateCurrent = !1, gdp_isFirstDateCurrent = !0, 
gdp_isSecondDateCurrent = !1, gdp_dateTypePickerShow();
}

function gdp_secondDateTypePickerShow(e) {
gdp_currentDatePickerId = e, gdp_isMainDateCurrent = !1, gdp_isFirstDateCurrent = !1, 
gdp_isSecondDateCurrent = !0, gdp_dateTypePickerShow();
}

function gdp_dateTypePickerShow() {
var e = gdp_getCurrentDateTypePickerLink();
if (gdp_dateTypePickerDiv = document.getElementById("gdp_dateTypePickerDiv"), null != e && null != gdp_dateTypePickerDiv) {
var t = document.getElementById("gdp_dateTypePickerTable");
if (t) for (var d = t.getElementsByTagName("a"), r = t.getElementsByTagName("span"), n = 0; n < d.length; n++) d[n].style.display = "block", 
r[n].style.display = "none";
if (gdp_isFirstDateCurrent || gdp_isSecondDateCurrent) for (var n = 0; n < DATE_TYPES_NOT_SUPPORTED_IN_RANGE.length; n++) {
var a = document.getElementById(DATE_TYPE_LOOKUP[DATE_TYPES_NOT_SUPPORTED_IN_RANGE[n]] + "Link"), i = document.getElementById(DATE_TYPE_LOOKUP[DATE_TYPES_NOT_SUPPORTED_IN_RANGE[n]] + "Bullet");
a && i && (a.style.display = "none", i.style.display = "none");
}
var _ = null;
if (gdp_isMainDateCurrent) {
var p = document.getElementById("gdp_dateType_" + gdp_currentDatePickerId);
p && (_ = p.value);
} else if (gdp_isFirstDateCurrent) {
var g = document.getElementById("gdp_firstOperatorType_" + gdp_currentDatePickerId);
g && (_ = g.value);
} else if (gdp_isSecondDateCurrent) {
var o = document.getElementById("gdp_secondOperatorType_" + gdp_currentDatePickerId);
o && (_ = o.value);
}
if ("undefined" != typeof DATE_TYPE_LOOKUP[_] && (document.getElementById(DATE_TYPE_LOOKUP[_] + "Bullet").style.display = "block"), 
gdp_dateTypePickerDiv.style.display = "block", window.innerHeight) var c = window.innerHeight + window.pageYOffset; else var c = document.body.clientHeight + document.body.scrollTop;
var l = gdp_dateTypePickerDiv.offsetWidth, u = gdp_dateTypePickerDiv.offsetHeight, s = jQuery("#" + e.id).offset();
s.top += 21, s.left -= 5, s.top + u > c && (s.top -= u + 21);
var E = jQuery(gdp_dateTypePickerDiv);
E.data("gdp-original-parent", E.parent()), E.detach().appendTo("body"), "LTR" == languageDirection ? E.offset(s) :(s.left += e.offsetWidth - l + 9, 
E.offset(s)), hideAllSelectComponentsOnIE6UnderElement(gdp_dateTypePickerDiv.id), 
gdp_turnOffAutoHide(), setTimeout(gdp_turnOnAutoHide, 10);
}
}

function gdp_dateTypePickerTypeSelected(e) {
if (gdp_isMainDateCurrent ? gdp_mainDateTypePickerTypeSelected(e) :gdp_isFirstDateCurrent ? gdp_firstDateTypePickerTypeSelected(e) :gdp_isSecondDateCurrent && gdp_secondDateTypePickerTypeSelected(e), 
gdp_isMainDateCurrent || gdp_isFirstDateCurrent) {
var t = document.getElementById("gdp_firstDateNumericFieldsCell_" + gdp_currentDatePickerId), d = document.getElementById("gdp_firstDateTextFieldCell_" + gdp_currentDatePickerId);
if (null != t && null != d) if (e == DATE_TYPE_TEXT) {
t.style.display = "none", d.style.display = "";
var r = document.getElementById("gdp_firstDateText_" + gdp_currentDatePickerId);
r && r.focus();
} else t.style.display = "", d.style.display = "none";
}
void 0 != typeof jQuery && jQuery.fn.styledSelect && jQuery("#gdp_container_" + gdp_currentDatePickerId + ".ShouldStyledSelect select").styledSelect();
var n = 0 == jQuery("#gdp_errorLabel_" + gdp_currentDatePickerId).length;
n && gdp_hasErrors(gdp_currentDatePickerId) && gdp_validate(gdp_currentDatePickerId) && gdp_resetErrors(gdp_currentDatePickerId), 
gdp_dateTypePickerHide();
}

function gdp_mainDateTypePickerTypeSelected(e) {
var t = gdp_getCurrentDateTypePickerLink();
if (t) {
var d = document.getElementById("gdp_dateType_" + gdp_currentDatePickerId);
d && (d.value = e), "undefined" != typeof DATE_TYPE_NAMES[e] && setObjInnerText(t, DATE_TYPE_NAMES[e]);
var r = document.getElementById("gdp_firstDateTypePickerCell_" + gdp_currentDatePickerId), n = document.getElementById("gdp_rangeSeparator_" + gdp_currentDatePickerId), a = document.getElementById("gdp_rangeSecondRow_" + gdp_currentDatePickerId), i = document.getElementById("gdp_secondDateTypeLabel_" + gdp_currentDatePickerId);
r && n && a && i && ("undefined" != typeof DATE_TYPE_RANGE_LABELS[e] ? (r.style.display = "", 
n.style.display = "", a.style.display = "", setObjInnerText(i, DATE_TYPE_RANGE_LABELS[e]), 
gdp_firstDateTypePickerTypeSelected(DATE_TYPE_EXACT), gdp_secondDateTypePickerTypeSelected(DATE_TYPE_EXACT)) :e == DATE_TYPE_FROM || e == DATE_TYPE_TO ? (r.style.display = "", 
n.style.display = "none", a.style.display = "none", setObjInnerText(i, ""), gdp_firstDateTypePickerTypeSelected(DATE_TYPE_EXACT)) :(r.style.display = "none", 
n.style.display = "none", a.style.display = "none", setObjInnerText(i, ""), gdp_firstDateTypePickerTypeSelected(e)));
}
}

function gdp_firstDateTypePickerTypeSelected(e) {
var t = gdp_getCurrentDateTypePickerLink(!1, !0, !1);
if (t) {
var d = document.getElementById("gdp_firstOperatorType_" + gdp_currentDatePickerId);
d && (d.value = e), "undefined" != typeof DATE_TYPE_NAMES[e] && setObjInnerText(t, DATE_TYPE_NAMES[e]);
}
}

function gdp_secondDateTypePickerTypeSelected(e) {
var t = gdp_getCurrentDateTypePickerLink(!1, !1, !0);
if (t) {
var d = document.getElementById("gdp_secondOperatorType_" + gdp_currentDatePickerId);
d && (d.value = e), "undefined" != typeof DATE_TYPE_NAMES[e] && setObjInnerText(t, DATE_TYPE_NAMES[e]);
}
}

function gdp_dateTypePickerHide() {
if (gdp_turnOffAutoHide(), null != gdp_dateTypePickerDiv) {
var e = jQuery(gdp_dateTypePickerDiv);
e.hide(), e.data("gdp-original-parent") && (e.detach().appendTo(e.data("gdp-original-parent")), 
e.data("gdp-original-parent", null)), gdp_dateTypePickerDiv = null, gdp_currentDatePickerId = null, 
showAllSelectComponentsOnIE6();
}
}

function gdp_getFirstDate(e) {
var t = document.getElementById("gdp_firstDateDay_" + e), d = document.getElementById("gdp_firstDateMonth_" + e), r = document.getElementById("gdp_firstDateYear_" + e);
return gdp_getDate(t, d, r);
}

function gdp_getSecondDate(e) {
var t = document.getElementById("gdp_secondDateDay_" + e), d = document.getElementById("gdp_secondDateMonth_" + e), r = document.getElementById("gdp_secondDateYear_" + e);
return gdp_getDate(t, d, r);
}

function gdp_getDate(e, t, d) {
var r = parseInt(e.value, 10), n = parseInt(t.value, 10), a = parseInt(d.value, 10);
0 >= r && (r = 1), 0 >= n && (n = 1);
var i = new Date();
return i.setDate(1), i.setFullYear(a), i.setMonth(n - 1), i.setDate(r), i.getFullYear() != a || i.getMonth() != n - 1 || i.getDate() != r ? null :i;
}

function gdp_isEmpty(e) {
var t = document.getElementById("gdp_firstDateDay_" + e), d = document.getElementById("gdp_firstDateMonth_" + e), r = document.getElementById("gdp_firstDateYear_" + e), n = document.getElementById("gdp_firstDateText_" + e), a = document.getElementById("gdp_secondDateDay_" + e), i = document.getElementById("gdp_secondDateMonth_" + e), _ = document.getElementById("gdp_secondDateYear_" + e), p = document.getElementById("gdp_dateType_" + e), g = document.getElementById("gdp_firstOperatorType_" + e), o = document.getElementById("gdp_secondOperatorType_" + e);
if (!(t && d && r && n && a && i && _ && p && g && o)) return !0;
var c = p.value;
return c == DATE_TYPE_TEXT ? "" == trim(n.value) :c == DATE_TYPE_RANGE_BETWEEN_AND || c == DATE_TYPE_RANGE_FROM_TO ? t.value > 0 || d.value > 0 || "" != trim(r.value) && r.value != DATE_YEAR ? !1 :a.value > 0 || i.value > 0 || "" != trim(_.value) && _.value != DATE_YEAR ? !1 :!0 :t.value > 0 || d.value > 0 || "" != trim(r.value) && r.value != DATE_YEAR ? !1 :!0;
}

function dgp_isExists(e) {
var t = document.getElementById("gdp_firstDateDay_" + e), d = document.getElementById("gdp_firstDateMonth_" + e), r = document.getElementById("gdp_firstDateYear_" + e), n = document.getElementById("gdp_firstDateText_" + e), a = document.getElementById("gdp_secondDateDay_" + e), i = document.getElementById("gdp_secondDateMonth_" + e), _ = document.getElementById("gdp_secondDateYear_" + e), p = document.getElementById("gdp_dateType_" + e), g = document.getElementById("gdp_firstOperatorType_" + e), o = document.getElementById("gdp_secondOperatorType_" + e);
return t && d && r && n && a && i && _ && p && g && o ? !0 :!1;
}

function gdp_validate(e) {
var t = (document.getElementById("gdp_firstDateDay_" + e), document.getElementById("gdp_firstDateMonth_" + e), 
document.getElementById("gdp_firstDateYear_" + e), document.getElementById("gdp_firstDateText_" + e), 
document.getElementById("gdp_secondDateDay_" + e), document.getElementById("gdp_secondDateMonth_" + e)), d = (document.getElementById("gdp_secondDateYear_" + e), 
document.getElementById("gdp_dateType_" + e));
document.getElementById("gdp_firstOperatorType_" + e), document.getElementById("gdp_secondOperatorType_" + e);
if (!dgp_isExists(e)) return !1;
var r = d.value;
if (r == DATE_TYPE_TEXT) return !0;
if (r == DATE_TYPE_RANGE_BETWEEN_AND || r == DATE_TYPE_RANGE_FROM_TO) {
if (!gdp_validateFirstDate(e) || !gdp_validateSecondDate(e)) return !1;
var n = gdp_getFirstDate(e), a = gdp_getSecondDate(e);
if (null != n && null != a) {
if (n >= a) return gdp_Error(e, DATE_ERROR_RANGE_REVERSED), t.focus(), !1;
} else {
if (null == n && null != a) return r == DATE_TYPE_RANGE_FROM_TO ? !0 :(gdp_Error(e, DATE_ERROR_RANGE_FIRST_DATE_EMPTY), 
!1);
if (null != n && null == a) return r == DATE_TYPE_RANGE_FROM_TO ? !0 :(gdp_Error(e, DATE_ERROR_RANGE_SECOND_DATE_EMPTY), 
!1);
}
}
return gdp_validateFirstDate(e);
}

function gdp_validateFirstDate(e) {
var t = document.getElementById("gdp_firstDateDay_" + e), d = document.getElementById("gdp_firstDateMonth_" + e), r = document.getElementById("gdp_firstDateYear_" + e);
return gdp_validateSingleDate(e, t, d, r, "first");
}

function gdp_validateSecondDate(e) {
var t = document.getElementById("gdp_secondDateDay_" + e), d = document.getElementById("gdp_secondDateMonth_" + e), r = document.getElementById("gdp_secondDateYear_" + e);
return gdp_validateSingleDate(e, t, d, r, "second");
}

function gdp_validateSingleDate(e, t, d, r, n) {
var a = t.value, i = d.value, _ = r.value, p = r.getAttribute("originalValue");
if (0 >= a && 0 >= i && ("" == _ || _ == DATE_YEAR)) return !0;
if ("" == _ || _ == DATE_YEAR) return gdp_Error(e, DATE_ERROR_YEAR_MISSING, n + "DateYear"), 
r.focus(), !1;
if (a > 0 && 0 >= i) return gdp_Error(e, DATE_ERROR_MONTH_MISSING, n + "DateMonth"), 
d.focus(), !1;
var g = parseInt(t.value, 10), o = parseInt(d.value, 10), c = parseInt(_, 10);
if (isNaN(c)) return gdp_Error(e, DATE_ERROR_YEAR_NON_NUMERIC, n + "DateYear"), 
r.focus(), !1;
var l = !1, u = !1;
if (c != _) {
var s = /\s*A\.?D\.?\s*$/i;
if (s.test(_) && (_ = _.replace(s, ""), l = !0), _.indexOf("/") > 0) {
var E = _.split("/");
if (2 != E.length) return gdp_Error(e, DATE_ERROR_YEAR_NON_NUMERIC, n + "DateYear"), 
r.focus(), !1;
if (parseInt(E[0], 10) != E[0] || parseInt(E[1], 10) != E[1]) return gdp_Error(e, DATE_ERROR_YEAR_NON_NUMERIC, n + "DateYear"), 
r.focus(), !1;
u = !0;
}
if (!l && !u) return gdp_Error(e, DATE_ERROR_YEAR_NON_NUMERIC, n + "DateYear"), 
r.focus(), !1;
}
if (0 > c) return gdp_Error(e, DATE_ERROR_YEAR_NEGATIVE, n + "DateYear"), r.focus(), 
!1;
if (a > 0) {
var D = new Date();
if (D.setDate(1), D.setFullYear(c), D.setMonth(o - 1), D.setDate(g), D.getFullYear() != c || D.getMonth() != o - 1 || D.getDate() != g) return gdp_Error(e, DATE_ERROR_DATE_INVALID), 
t.focus(), !1;
}
if (100 > c && !l && gdp_alertOnTwoDigitYears && _ != p) {
var y = gdp_TwoDigitYearConfirmationDialogUrl;
return y += y.indexOf("?") > 1 ? "&year=" + c :"?year=" + c, openCenteredPopup2(y, 564, 177, "", "scroll:no;", "", gdp_twoDigitYearConfirmationDialogTitle, !0), 
!1;
}
return !0;
}

function gdp_twoDigitYearConfirmationDialogOnOK(e) {
gdp_alertOnTwoDigitYears = !1, e && gdp_twoDigitYearConfirmationDialogDontShowAgain(), 
"undefined" != typeof gdp_twoDigitYearConfirmationCallback && gdp_twoDigitYearConfirmationCallback();
}

function gdp_twoDigitYearConfirmationDialogDontShowAgain() {
var e = [ "siteID=" + currentSiteId, "memberID=" + currentUserAccountID, "messageID=" + gdp_twoDigitYearConfirmationDialogDontShowAgainMessageID ].join("&"), t = getAjaxObject();
sendAjaxRequest(t, dontShowAgainAPI, e, "", "GET", "", "", "");
}

function gdp_Error(e, t, d) {
var r = document.getElementById("gdp_errorLabel_" + e);
if (r) setObjInnerText(r, t), r.style.display = "", alert(t); else if (jQuery().validationEngine) {
gdp_resetErrors(e);
var n, a;
void 0 != d ? (n = "#gdp_" + d + "_" + e, a = "errorField", jQuery(n).is("select") && (n += "_styled")) :(n = "#gdp_container_" + e, 
a = "errorGroup"), jQuery(n).addClass(a).validationEngine("showPrompt", t);
}
}

function gdp_hasErrors(e) {
var t = 0 == jQuery("#gdp_errorLabel_" + e).length && jQuery().validationEngine;
return t && (jQuery("#gdp_container_" + e + " .errorField").length > 0 || jQuery("#gdp_container_" + e + ".errorGroup").length > 0) ? !0 :!1;
}

function gdp_resetErrors(e) {
var t = document.getElementById("gdp_errorLabel_" + e);
t ? t.style.display = "none" :jQuery().validationEngine && (jQuery("#gdp_container_" + e + " .errorField").removeClass("errorField").validationEngine("hidePrompt"), 
jQuery("#gdp_container_" + e).removeClass("errorGroup").validationEngine("hidePrompt"));
}

function gdp_reset(e, t) {
("undefined" == typeof t || null == t) && (t = DATE_TYPE_EXACT);
var d = document.getElementById("gdp_firstDateDay_" + e), r = document.getElementById("gdp_firstDateMonth_" + e), n = document.getElementById("gdp_firstDateYear_" + e), a = document.getElementById("gdp_firstDateText_" + e), i = document.getElementById("gdp_secondDateDay_" + e), _ = document.getElementById("gdp_secondDateMonth_" + e), p = document.getElementById("gdp_secondDateYear_" + e);
d && r && n && (d.selectedIndex = 0, r.selectedIndex = 0, n.value = DATE_YEAR, gdp_dateDayBlur(d), 
gdp_dateMonthBlur(r), gdp_dateYearBlur(n), jQuery(d).change(), jQuery(r).change()), 
a && (a.value = ""), i && _ && p && (i.selectedIndex = 0, _.selectedIndex = 0, p.value = DATE_YEAR, 
gdp_dateDayBlur(i), gdp_dateMonthBlur(_), gdp_dateYearBlur(p), jQuery(i).change(), 
jQuery(_).change()), gdp_currentDatePickerId = e, gdp_isMainDateCurrent = !0, gdp_isFirstDateCurrent = !1, 
gdp_isSecondDateCurrent = !1, gdp_dateTypePickerTypeSelected(t), gdp_resetErrors(e);
}

var gdp_dateTypePickerDiv = null, gdp_currentDatePickerId = null, gdp_isMainDateCurrent = !1, gdp_isFirstDateCurrent = !1, gdp_isSecondDateCurrent = !1;
function onSelectLink(e) {
for (i = 0; i < e.childNodes.length; i++) void 0 != e.childNodes[i].tagName && (e.childNodes[i].style.fontWeight = "");
}

function onChangeLink(e) {
for (i = 0; i < e.childNodes.length; i++) void 0 != e.childNodes[i].tagName && (e.childNodes[i].style.fontWeight = "");
}

function showMainContextMenu(e, t, n, i) {
if (!i) var i = window.event;
i.cancelBubble = !0, showMainContextMenuInner(e, n, i.pageX, i.pageY, i.clientX, i.clientY);
}

function showMainContextMenuInner(e, t, n, i, o, l) {
var d = 0, s = 0;
if (onBody = !1, varExists("menuTimer") && clearTimeout(menuTimer), n || i) {
var a, r = window.innerHeight + window.pageYOffset;
a = "LTR" == t ? window.innerWidth + window.pageXOffset :window.pageXOffset;
} else if (o || l) {
var a, r = parent.document.body.clientHeight + parent.document.body.scrollTop;
a = "LTR" == t ? parent.document.body.clientWidth + parent.document.body.scrollLeft :parent.document.body.scrollLeft;
}
document.getElementById(e).style.display = "";
var u = window.opera ? !0 :!1;
d = n ? n :o + parent.document.body.scrollLeft, s = i ? i :l + parent.document.body.scrollTop, 
document.all && !u && (d += 10);
var g = document.getElementById(e).offsetWidth, h = document.getElementById(e).offsetHeight;
"LTR" == t ? d + g > a && (d -= g) :0 > g ? d - -1 * g > a && (u || (d -= -1 * g)) :(d -= 19, 
d - g > a && (d -= g)), s + h > r && (s -= h), null != document.getElementById(e).offsetParent && (d -= getRelLeft(document.getElementById(e).offsetParent), 
s -= getRelTop(document.getElementById(e).offsetParent)), document.getElementById(e).style.left = d + "px", 
document.getElementById(e).style.top = s + "px", getParents(e, null), checkOverlapping(e), 
visibleMenuID = e, setVisibleElement(visibleMenuID);
}

function showSubContextMenu(e, t, n, i, o) {
if (onBody = !1, varExists("menuTimer") && clearTimeout(menuTimer), !o) var o = window.event;
if (o.cancelBubble = !0, o.pageX || o.pageY) {
var l, d = window.innerHeight + window.pageYOffset;
l = "LTR" == i ? window.innerWidth + window.pageXOffset :window.pageXOffset;
} else if (o.clientX || o.clientY) {
var l, d = parent.document.body.clientHeight + parent.document.body.scrollTop;
l = "LTR" == i ? parent.document.body.clientWidth + parent.document.body.scrollLeft :parent.document.body.scrollLeft;
}
var s = getRelTop(t), a = getRelLeft(t) + 18;
document.getElementById(e).style.display = "";
var r = document.getElementById(e).offsetWidth, u = document.getElementById(e).offsetHeight, g = window.opera ? !0 :!1;
s + u > d && (s -= u), "LTR" == i ? a + r > l && (a -= r) :0 > r ? a - -1 * r > l && (g || (a -= -1 * r)) :(a -= 19, 
a - r > l && (a -= r)), document.getElementById(e).style.left = a + "px", document.getElementById(e).style.top = s + "px", 
getParents(e, t, o, i), checkOverlapping(e);
}

function getParents(e, t, n, i, o) {
var l;
if (l = o ? !0 :!1, parts = e.split("_"), parents = Array(), parents[0] = parts[0], 
null != parts.length || 0 != parts.length || void 0 != parts.length) for (k = 1; k < parts.length; k++) parents[k] = parents[k - 1] + "_" + parts[k];
for (parents.shift(), p = 0; p < visibleMenus.length; p++) {
for (visible = !1, g = 0; g < parents.length; g++) visibleMenus[p] == parents[g] && (visible = !0);
!visible && document.getElementById(visibleMenus[p]) && (document.getElementById(visibleMenus[p]).style.display = "none");
}
null != t && (void 0 != highlightedRows[parents.length - 2] && (highlightedRows[parents.length - 2].className = "none"), 
highlightedRows[parents.length - 2] = t);
var d;
for (d = 0; d < parents.length - 1; d++) void 0 != highlightedRows[d] && (l ? highlightedRows[d].className = "ContextMenuRowHighlight" :highLightSearchResults ? highlightedRows[d].className = "ContextMenuRowHighlight" :highlightedRows[d].className = "");
for (kl = d; kl < highlightedRows.length; kl++) highlightedRows[kl].className = "";
for (visibleMenus = null, visibleMenus = parents, x = 0; x < parents.length; x++) document.getElementById(parents[x]) && (document.getElementById(parents[x]).style.display = "");
}

function adjustPos(e, t, n) {
var i = 0;
if (!(e.length <= 1)) for (ko = 1; ko < e.length; ko++) if (document.getElementById(e[ko])) {
i = getWidth(e[ko - 1]) - getWidth(e[ko]), xpos = getRelLeft(e[ko]), objParentWidth = getWidth(e[ko - 1]);
var o = window.opera ? !0 :!1;
if (o) var l = getRelLeft(e[ko - 1]) + objParentWidth - i; else var l = getRelLeft(e[ko - 1]) + objParentWidth;
var d = getWidth(e[ko]);
isInScreenWidth(l + d, t, n) ? xpos < 0 || 0 > l ? o ? document.getElementById(e[ko]).style.left = -1 * (-1 * objParentWidth + getRelLeft(e[ko - 1]) + getRelLeft(e[ko]) + i) + "px" :document.getElementById(e[ko]).style.left = l - 2 * objParentWidth + "px" :document.getElementById(e[ko]).style.left = l + "px" :document.getElementById(e[ko]).style.left = l - 2 * objParentWidth + i + "px";
}
}

function activateHideAll() {
return -1 == visibleElement ? void clearTimeout(hideAllMenusTimer) :(hideAllMenusTimer = setTimeout(hideAllMenus, 1e3), 
void (onBody = !0));
}

function hideAllMenus(e) {
if ("undefined" == typeof e && (e = 0), "" != visibleMenus && 0 != visibleMenus.length) {
if (0 != shouldHideButtonID) {
var t = shouldHideButtonID;
shouldHideButtonID = 0, "function" == typeof hideBtn2 && hideBtn2(t);
}
for (unhideAll(), all = visibleMenus.length - 1; all >= 0; all--) if (document.getElementById(visibleMenus[all]) && (document.getElementById(visibleMenus[all]).style.display = "none", 
0 != e && e == visibleMenus[all])) return;
}
}

function isInScreenWidth(e, t, n) {
if (!t) var t = window.event;
if (t.pageX || t.pageY) {
var i;
i = "LTR" == n ? window.innerWidth + window.pageXOffset :window.pageXOffset;
} else if (t.clientX || t.clientY) {
var i;
i = "LTR" == n ? parent.document.body.clientWidth + parent.document.body.scrollLeft :parent.document.body.scrollLeft;
}
return e > i ? !1 :!0;
}

function isInScreenHeight(e, t) {
if (!t) var t = window.event;
if (t.pageX || t.pageY) var n = window.innerHeight + window.pageYOffset; else if (t.clientX || t.clientY) var n = parent.document.body.clientHeight + parent.document.body.scrollTop;
return e > n ? !1 :!0;
}

function getWidth(e) {
var t = window.opera ? !0 :!1;
if (document.layers) fixedElement = document[e], s = fixedElement.document.width, 
d = fixedElement.document.height; else if (document.getElementById || t) {
fixedElement = document.getElementById(e), menuID = fixedElement.id.replace("ContextMenu", "");
var n = getRelLeft("ContextMenuTopLeft" + menuID), i = getRelTop("ContextMenuTopLeft" + menuID), o = getRelLeft("ContextMenuBottomRight" + menuID), l = getRelTop("ContextMenuBottomRight" + menuID), d = l - i, s = o - n;
} else document.all && !t && (fixedElement = document.all[e], s = fixedElement.offsetWidth, 
d = fixedElement.offsetHeight);
return s;
}

function hideMainContextMenu(e) {
menuTimer = setTimeout(function() {
setVisibleElement(e);
}, 700);
}

function undoHighLightRow(e) {
e.className = "";
}

function highLightRow(e) {
e.className = "ContextMenuRowHighlight";
}

var visibleMenus = Array(), highlightedRows = Array(), visibleMenuID = 0, buttonPos = 0, onBody = !0, menuTimer, hideAllMenusTimer, highLightSearchResults = "false", shouldHideButtonID = 0;
function showBtn(e) {
document.getElementById(e).style.display = "block";
}

function hideBtn(e) {
document.getElementById(e).style.display = "none";
}

function showZoom(e, t, o, n) {
"undefined" == typeof n && (n = "LTR");
var i = document.getElementById("iframe");
i.style.display = "none";
var l = getRelTop(t + "Img"), d = getRelLeft(t + "Img"), m = document.body.clientWidth, r = document.body.clientHeight, c = m + document.body.scrollLeft - d, s = r + document.body.scrollTop - l;
if (400 > c && d - document.body.scrollLeft > 200) var f = d - 200; else var f = d;
if (300 > s && l - document.body.scrollTop > 200) {
if (1 == o) var a = l - 10; else if (2 == o) var a = l - 70; else if (3 == o) var a = l - 100;
} else var a = l;
"RTL" == n ? i.style.right = m - d :i.style.left = f, i.style.top = a, document.getElementById("zoomiframe").src = e;
}

function familyCardIframeLoaded() {
var e = document.getElementById("iframe");
e.style.visibility = "visible", e.style.display = "inline", checkOverlapping(e);
}

function hide_all(e) {
menuTimer = setTimeout(function() {
hideTip(e);
}, 400);
}

function show_all() {
varExists("menuTimer") && clearTimeout(menuTimer);
}

function hideTip(e) {
document.getElementById(e + "Tip").style.display = "none", unhideAll();
}

function hideZoom(e) {
unhideAll(), null != document.getElementById("iframe") && (document.getElementById("iframe").style.display = "none");
}

function checkOverlapping(e) {
if (!(browserAgent.indexOf("msie") < 0)) {
"object" != typeof e && (e = document.getElementById(e)), cordDiv = calculateEdges(e);
for (var t = window.document.getElementsByTagName("select"), o = 0; o < t.length; o++) cordCombo = calculateEdges(t[o]), 
checkPointInArea(cordCombo, cordDiv) && hideCombo(t[o]);
for (o = 0; o < document.forms.length; o++) for (j = 0; j < document.forms[o].elements.length; j++) ("select-one" == document.forms[o].elements[j].type || "select-multiple" == document.forms[o].elements[j].type) && (cordCombo = calculateEdges(document.forms[o].elements[j]), 
checkPointInArea(cordCombo, cordDiv) && hideCombo(document.forms[o].elements[j]));
}
}

function checkPointInArea(e, t) {
overlap = !1;
for (o = 0; o < e.length; o++) e[o].X >= t[0].X && e[o].X <= t[1].X && e[o].Y >= t[0].Y && e[o].Y <= t[3].Y && (overlap = !0);
return overlap;
}

function hideCombo(e) {
e.style.display = "none", hiddenCombos[hiddenComboCount] = e, hiddenComboCount++;
}

function unhideAll() {
for (p = 0; p < hiddenCombos.length; p++) hiddenCombos[p].style.display = "", hiddenCombos[p] = null;
hiddenComboCount = 0, hiddenCombos = Array();
}

function calculateEdges(e) {
if ("object" != typeof e && (e = document.getElementById(e), !e)) return !1;
tLX = getRelLeft(e), tLY = getRelTop(e), topLeft = new Array(1), topLeft.X = tLX, 
topLeft.Y = tLY, tRX = getRelLeft(e) + e.offsetWidth, tRY = getRelTop(e), topRight = new Array(1), 
topRight.X = tRX, topRight.Y = tRY, bLX = getRelLeft(e), bLY = getRelTop(e) + e.offsetHeight, 
bottomLeft = new Array(1), bottomLeft.X = bLX, bottomLeft.Y = bLY, bRX = getRelLeft(e) + e.offsetWidth, 
bRY = getRelTop(e) + e.offsetHeight, bottomRight = new Array(1), bottomRight.X = bRX, 
bottomRight.Y = bRY;
var t = new Array(3);
return t[0] = topLeft, t[1] = topRight, t[2] = bottomLeft, t[3] = bottomRight, t;
}

var browserAgent = navigator.userAgent.toLowerCase(), hiddenCombos = new Array(), hiddenComboCount = 0;
function getRelLeft(e) {
if ("object" != typeof e) var t = document.getElementById(e); else t = e;
for (var o = t.offsetLeft; null != t.offsetParent && (t = t.offsetParent, o += t.offsetLeft, 
"body" != t.tagName); ) ;
return o;
}

function getRelTop(e) {
if ("object" != typeof e) var t = document.getElementById(e); else t = e;
for (var o = t.offsetTop; null != t.offsetParent && (t = t.offsetParent, o += t.offsetTop, 
"body" != t.tagName); ) ;
return o;
}

function calculateElementEdges(e) {
if ("object" != typeof e && (e = document.getElementById(e), !e)) return !1;
var t = getRelLeft(e), o = getRelTop(e), n = window.opera ? !0 :!1;
if (document.getElementById || n) {
menuID = e.id.replace("ContextMenu", "");
var l = getRelLeft("ContextMenuTopLeft" + menuID), i = getRelTop("ContextMenuTopLeft" + menuID), r = getRelLeft("ContextMenuBottomRight" + menuID), m = getRelTop("ContextMenuBottomRight" + menuID), d = m - i, f = r - l;
} else var d = e.offsetHeight, f = e.offsetWidth;
tLX = t, tLY = o, topLeft = new Array(1), topLeft.X = t, topLeft.Y = o, topRight = new Array(1), 
topRight.X = t + f, topRight.Y = o, bottomLeft = new Array(1), bottomLeft.X = t, 
bottomLeft.Y = o + d, bottomRight = new Array(1), bottomRight.X = t + f, bottomRight.Y = o + d;
var c = new Array(3);
return c[0] = topLeft, c[1] = topRight, c[2] = bottomLeft, c[3] = bottomRight, c;
}

function setVisibleElement(e) {
visibleElement = e, visibleElementEdges = calculateElementEdges(e);
}

function checkPosition(e) {
if (id = visibleElement, -1 != id) {
divCoordinates = visibleElementEdges, e || (e = window.event), scrollLeft = parent.document.body.scrollLeft, 
scrollTop = parent.document.body.scrollTop, document.documentElement && document.documentElement.scrollTop ? scrollTop = document.documentElement.scrollTop :document.body && (scrollTop = document.body.scrollTop), 
document.documentElement && document.documentElement.scrollTop ? scrollLeft = document.documentElement.scrollLeft :document.body && (scrollLeft = document.body.scrollLeft);
var t = e.pageX ? e.pageX :e.clientX + scrollLeft, o = e.pageY ? e.pageY :e.clientY + scrollTop;
t < divCoordinates[0].X - 5 || t > divCoordinates[1].X + 5 || o < divCoordinates[0].Y - 5 || o > divCoordinates[3].Y + 5 ? (activateHideAll(), 
unhideAll(), visibleElement = -1) :clearTimeout(hideAllMenusTimer);
}
}

var visibleElement = -1, visibleElementEdges = Array();
function deleteComment(e) {
deleteCommentID = e, invokeDeleteComment();
}

function deleteCommentConfirmation(e) {
e == MB_YES && invokeDeleteComment();
}

function invokeDeleteComment() {
deleteCommentRequest = "commentID=" + deleteCommentID;
var e = getAjaxObject();
sendAjaxRequest(e, deleteCommentAPI, deleteCommentRequest, "", "GET", deleteCommentCallback, "", "");
}

function deleteCommentCallback(e, t) {
if (t = unescape(t), gWasCommentBodyClicked = !1, -1 != t.indexOf("<delete-comment")) refreshCommentsListPage(); else {
var n = t.indexOf('<code id="');
if (-1 == n) return void handleDeleteCommentError(unexpectedCommentError);
n += 10;
var m = t.indexOf('"', n);
if (-1 == m) return void handleDeleteCommentError(unexpectedCommentError);
var a = parseInt(t.substring(n, m));
handleDeleteCommentError(a);
}
}

function refreshCommentsListPage() {
var e = getAjaxObject(), t = "";
window.isRecordPageFaceliftExposed && (t = "isRecordPageFaceliftExposed=true"), 
sendAjaxRequest(e, viewCommentsListURL, t, "", "GET", refreshCommentsListDone, "", "");
}

function refreshCommentsListDone(e, t) {
t = unescape(t);
var n = t.substr(0, t.indexOf(",")), m = t.substr(t.indexOf(",") + 1), a = document.getElementById("commentsContainer");
null != a && (a.innerHTML = m, a.style.display = ""), window.isRecordPageFaceliftExposed && window.parseAndRenderSecondaryActions && window.parseAndRenderSecondaryActions();
var o = document.getElementById("commentsCounter");
null != o && ("0" == n ? o.innerHTML = "" :o.innerHTML = " (" + n + ")"), enableAddCommentButton(), 
commentsReset();
}

function commentsReset() {
if (gWasCommentBodyClicked) {
gWasCommentBodyClicked = !1;
var e = document.getElementById("commentBody");
if (e && (e.value = gCommentBodyPrompt, e.className = "CommentsTextArea", e.style.height = "31px"), 
showCAPTCHA) {
var t = document.getElementById("captchaPanel"), n = document.getElementById("captchaPrivateKey");
t && n && (t.style.display = "none", n.value = "");
}
}
}

function commentsBodyClicked(e) {
gWasCommentBodyClicked || (gWasCommentBodyClicked = !0, gCommentBodyPrompt = e.value, 
e.value = "", e.className.indexOf("CommentsTextAreaInWork") < 0 && (e.className = e.className.replace("CommentsTextArea", "CommentsTextAreaInWork")));
}

function addNewComment() {
var e = document.getElementById("commentBody"), t = trim(e.value);
if ("" != t && t != e.getAttribute("originalValue")) if (showCAPTCHA) {
var n = document.getElementById("captchaPanel");
if (n) {
if ("none" == n.style.display) {
disableAddCommentButton();
var m = getAjaxObject();
return void sendAjaxRequest(m, "/FP/API/Utilities/replace-captcha.php", "", "", "GET", window.setInitialCommentCaptcha, "", "");
}
var a = document.getElementById("captchaPrivateKey");
if ("" == a.value || isTextAreaShadedEmpty(a)) return alert(emptyValidationCode), 
void grabFieldFocus("captchaPrivateKey");
}
captchaRequest = "";
var o = document.getElementById("public_key");
o && (captchaRequest += "public_key=" + o.value);
var r = document.getElementById("captchaPrivateKey");
r && (captchaRequest += "&private_key=" + r.value), disableAddCommentButton();
var m = getAjaxObject();
sendAjaxRequest(m, captchaValidatorAPI, captchaRequest, "", "POST", window.commentCaptchaValidationCallback, "", "");
} else startAddingComment();
}

function setInitialCommentCaptcha(e, t) {
var n = document.getElementById("captchaPanel");
t = unescape(t);
var m = document.getElementById("captchaContainer");
m && (m.innerHTML = t), n.style.display = "inline", enableAddCommentButton();
}

function disableAddCommentButton() {
clearCommentError(), disableCssButton("addCommentButton");
var e = document.getElementById("addCommentLoader");
null != e && (e.style.display = "");
}

function enableAddCommentButton() {
enableCssButton("addCommentButton");
var e = document.getElementById("addCommentLoader");
null != e && (e.style.display = "none");
}

function commentCaptchaValidationCallback(e, t) {
if (t = unescape(t), "[success]" == t) startAddingComment(); else if (numCaptchaFailures++, 
numCaptchaFailures >= maxNumCaptchaFailurs) {
var n = getAjaxObject();
sendAjaxRequest(n, "/FP/API/Utilities/replace-captcha.php", "", "", "GET", window.replaceCommentCaptcha, "", "");
} else enableAddCommentButton(), triggerInvalidCaptchaCodeMsg(), grabFieldFocus("captchaPrivateKey");
}

function replaceCommentCaptcha(e, t) {
numCaptchaFailures = 0, t = unescape(t);
var n = document.getElementById("captchaContainer");
n && (n.innerHTML = t), enableAddCommentButton(), triggerInvalidCaptchaCodeMsg(), 
grabFieldFocus("captchaPrivateKey");
}

function commentCaptchaKeyUp(e) {
var t = getEventCode(e);
13 == t && addNewComment();
}

function startAddingComment() {
disableAddCommentButton();
var e = document.getElementById("commentBody"), t = trim(e.value);
if ("" == t) return showCommentError(fillCommentMsg), void grabFieldFocus("commentBody");
t = replace(t, "&", "%26"), t = replace(t, "+", "%2B");
var n = addCommentParams;
if (n += "&commentBody=" + t, showCAPTCHA) {
var m = document.getElementById("public_key");
m && (n += "&public_key=" + m.value);
var a = document.getElementById("captchaPrivateKey");
a && (n += "&private_key=" + a.value);
}
null != commentEmbargoDate && (n += "&embargoDate=" + commentEmbargoDate);
var o = getAjaxObject();
sendAjaxRequest(o, addCommentAPI, n, "", "POST", addCommentCallback, "", "");
}

function addCommentCallback(e, t) {
if (t = unescape(t), -1 != t.indexOf("<add-comment")) {
if ("undefined" != typeof addCommentPageCallback && addCommentPageCallback(), null != commentEmbargoDate || commentHideComments) refreshCommentsListDone(null, "0,"); else {
var n = (t.match(/itemID="(\d+)"/) || [])[1];
n && (viewCommentsListURL = viewCommentsListURL.replace(/&itemID=\d+/, "&itemID=" + n), 
addCommentParams = addCommentParams.replace(/&itemID=\d+/, "&itemID=" + n)), refreshCommentsListPage();
}
"undefined" != typeof addCommentPostCallback && addCommentPostCallback();
} else {
enableAddCommentButton();
var m = t.indexOf('<code id="');
if (-1 == m) return void handleAddCommentError(unexpectedCommentError);
m += 10;
var a = t.indexOf('"', m);
if (-1 == a) return void handleAddCommentError(unexpectedCommentError);
var o = parseInt(t.substring(m, a));
handleAddCommentError(o);
}
}

function showCommentError(e) {
var t = document.getElementById("commentError"), n = document.getElementById("commentBody");
null != n && n.className.indexOf("FieldInError") < 0 && (n.className += " FieldInError"), 
null != t ? (setObjInnerText(t, e), t.style.display = "") :alert(e);
}

function clearCommentError() {
var e = document.getElementById("commentBody");
null != e && (e.className = "CommentsTextAreaInWork");
var t = document.getElementById("commentError");
null != t && (t.innerHTML = "&nbsp;");
}

function checkIfMemberCanAddCommentsCallback(e) {
var t = e.code, n = jQuery("#addCommentsPanel");
0 == t ? (n.show(), jQuery("#addCommentButtonPanel").show()) :(n.html(""), jQuery("#smLimitedAddCommentButtonPanel").show(), 
jQuery("#smLimitedAddCommentButton").attr("href", e.additionalInfo));
}

function promptUserForCommentDelete() {
messageBox2(SECTION_NONE, "Popup" + MESSAGE_BOX_PARAMETER_SEPARATOR + "Confirmation", "Comments" + MESSAGE_BOX_PARAMETER_SEPARATOR + "Delete comment message", MB_ICONQUESTION, MB_YESNOCANCEL, MB_DEFAULT_BUTTON, deleteCommentConfirmation);
}

function triggerUnexpectedDeleteCommentErrorMsg() {
alert(failedToDeleteComment);
}

function triggerUnprivilegedDeleteCommentErrorMsg() {
alert(UserIsNotAllowedToDeleteComment);
}

function handleDeleteCommentError(e) {
switch (e) {
case commentBadRequest:
case unexpectedCommentError:
case commentDatabaseError:
triggerUnexpectedDeleteCommentErrorMsg();
break;

case commentPrivilegeAccess:
triggerUnprivilegedDeleteCommentErrorMsg();
break;

case commentSuccess:
case commentNoSuchComment:
refreshCommentsListPage();
break;

default:
triggerUnexpectedDeleteCommentErrorMsg();
}
}

function triggerUnexpectedAddCommentErrorMsg() {
alert(failedToAddComment);
}

function triggerUnprivilegedAddCommentErrorMsg() {
alert(UserIsNotAllowedToAddComment);
}

function triggerTooManyDailyCommentsMsg() {
alert(replace(tooManyDailyComments, "<br>", "\n"));
}

function handleAddCommentError(e) {
switch (e) {
case commentBadRequest:
case unexpectedCommentError:
case commentDatabaseError:
case commentNoSuchItem:
case commentDisallowToPostComments:
triggerUnexpectedAddCommentErrorMsg();
break;

case commentPrivilegeAccess:
triggerUnprivilegedAddCommentErrorMsg();
break;

case commentCaptchaValidationError:
triggerInvalidCaptchaCodeMsg();
break;

case commentTooManyDailyComments:
triggerTooManyDailyCommentsMsg();
break;

case commentSpamComment:
case commentSuccess:
refreshCommentsListPage();
break;

default:
triggerUnexpectedAddCommentErrorMsg();
}
}

function triggerInvalidCaptchaCodeMsg() {
alert(replace(wrongValidationCode, "<br>", "\n"));
}

var deleteCommentID = 0, gWasCommentBodyClicked = !1, gCommentBodyPrompt = "", numCaptchaFailures = 0, maxNumCaptchaFailurs = 3;
function requestToShowCallout(e, t, n, a, i, o, l) {
"undefined" == typeof o && (o = "0"), delayedE.clientX = e.clientX, delayedE.clientY = e.clientY, 
delayedE.pageX = e.pageX, delayedE.pageY = e.pageY, delayedCacheKey = createCacheKey(t, o), 
delayedAjaxURL = n, delayedAjaxParams = a, delayedOpenBalloonId = setTimeout(function() {
requestToShowCalloutDelayed(l);
}, i ? 500 :0);
}

function requestToShowCalloutDelayed(e) {
var t = "";
if (!(delayedCacheKey.split(";")[0] <= 0 || isNaN(delayedCacheKey.split(";")[0]))) if (callingIndividualId = delayedCacheKey, 
hideAllBalloons(!0), updateBalloonLocation(delayedE, BALLOON_TYPE_CALLOUT, e), isPersonInCache(delayedCacheKey)) updateBalloonData(balloonVerticalPosition, personDataCache[delayedCacheKey], BALLOON_TYPE_CALLOUT), 
requestToShowBalloon(callingObjectID, BALLOON_TYPE_CALLOUT), writeActivityIndicator(ACTIVITY_CALLOUT, SCENARIO_CALLOUT_OPEN, !0); else {
t = '<table cellspacing=0 cellpadding=0 border=0><Tr><td style="padding: 5px"><img src="' + AssetManager.R_IMG("/FP/Icons/AjaxIcons/loading.gif") + '"></td><td valign="bottom" style="padding-bottom: 11px"><a class="NewsFeedMemberLink" style="height: 20px; text-valign: middle">' + loadingText + "</span></td></tr></table>", 
toggleBalloonCloseButton(!1, BALLOON_TYPE_CALLOUT), updateBalloonData(balloonVerticalPosition, t, BALLOON_TYPE_CALLOUT), 
updateBalloonVerticalDirection(BALLOON_TYPE_CALLOUT), displayBalloon(0, BALLOON_TYPE_CALLOUT);
var n = getAjaxObject(), a = Math.round(new Date().getTime() / 1e3);
sendAjaxRequest(n, delayedAjaxURL, delayedAjaxParams + "&secondsSince1970=" + a, "", "GET", finishedLoadingPersonData, [ delayedCacheKey ], t);
}
}

function finishedLoadingPersonData(e, t, n) {
var a = unescape(t);
addPersonDataToCache(n, a), n == callingIndividualId ? (hideBalloon(!0, BALLOON_TYPE_CALLOUT), 
toggleBalloonCloseButton(!0, BALLOON_TYPE_CALLOUT), updateBalloonData(balloonVerticalPosition, a, BALLOON_TYPE_CALLOUT), 
updateBalloonVerticalDirection(BALLOON_TYPE_CALLOUT), displayBalloon(0, BALLOON_TYPE_CALLOUT)) :hideBalloon(!0, BALLOON_TYPE_CALLOUT);
}

function createCacheKey(e, t) {
return e + ";" + t;
}

function isPersonInCache(e) {
var t = !1;
return t = "undefined" == typeof personDataCache[e] || null == personDataCache[e] ? !1 :!0;
}

function addPersonDataToCache(e, t) {
("undefined" == typeof personDataCache[e] || null == personDataCache[e]) && (personDataCache[e] = t);
}

function removePersonFromCache(e) {
personDataCache[e] = null;
}

function onInviteClick(e, t, n) {
var a = document.getElementById("inviteTosite"), i = document.getElementById("invitationErrorMessage");
if (isEmail(a.value)) {
i.style.display = "none";
var o = document.getElementById("invitationContent");
if (null != o) {
o.style.width = o.offsetWidth + "px", o.style.height = o.offsetHeight + "px";
var l = document.getElementById("invitationLayoutTable");
l.style.display = "none";
var d = document.getElementById("invitationSendingMessageLayoutTable");
d.style.display = "block";
var r = document.getElementById("invitationSendingMessageCell");
r.setAttribute("height", o.offsetHeight);
var c = document.getElementById("invitationSendingMessage");
c.style.width = o.offsetWidth - 6 + "px";
} else {
var s = document.getElementById("invitationPreloader");
null != s && (s.style.display = "");
}
inviteIndividual(e, a.value, t, n);
} else i.style.display = "", i.innerHTML = INVITATION_PANEL_ERROR_TEXT, restoreButtonSprite2("inviteBtn", !0);
}

function inviteIndividual(e, t, n, a) {
"undefined" == typeof a && (a = PROCESS_DATA_ACTIVITY_ID_CALLOUT);
var i = '<incentivizer-data-process siteID="' + n + '" accountID="' + currentUserAccountID + '" incentiveType="' + INCENTIVE_TYPE_EMAIL + '" processDataActivityID="' + a + '">';
t = trim(t).toLowerCase(), i += '<item itemType="' + INCETIVIZER_ITEM_TYPE_INDIVIDUAL + '" itemID="' + e + '"><![CDATA[' + t + "]]></item>", 
i += "</incentivizer-data-process>";
var o = getAjaxObject();
sendAjaxRequest(o, INCENTIVIZER_API_DATA_PROCESS_LOCATION, "lang=" + currentUserLang + "&incentiveType=" + INCENTIVE_TYPE_EMAIL + "&dataToProcess=" + encodeURIComponent(i), "", "POST", window.inviteIndividualCallback, [ createCacheKey(e, n) ], "");
}

function inviteIndividualCallback(e, t, n) {
t = unescape(t);
var a = "<error>", i = "</error>", o = t.indexOf(a), l = t.indexOf(i), d = INCENTIVIZER_API_UNEXPECTED_ERROR;
o >= 0 && l >= 0 && (d = t.substring(o + a.length, l));
var r;
r = d != INCENTIVIZER_API_ALL_OK && d != INCENTIVIZER_API_INDIVIDUAL_ALREADY_ASSOCIATED ? !1 :!0;
var c = document.getElementById("invitationSendingMessageLayoutTable");
if (null != c && (c.style.display = "none"), r) {
removePersonFromCache(n);
var s = document.getElementById("invitationSuccessWrapper");
s.style.display = "block";
var I = document.getElementById("PK_invitationForm");
null != I && (I.style.display = "none");
} else {
var y = document.getElementById("invitationLayoutTable");
if (null != y) y.style.display = "block", restoreButtonSprite2("inviteBtn", !0); else {
var T = document.getElementById("invitationPreloader");
null != T && (T.style.display = "none");
}
var L = document.getElementById("invitationErrorMessage");
L.style.display = "", L.innerHTML = d == INCENTIVIZER_API_MEMBER_ALREADY_ASSOCIATED ? INVITATION_PANEL_DUPLICATE_TEXT :INVITATION_PANEL_FAILED_TEXT;
}
}

function buyBirthdayGift(e, t, n) {
"undefined" != typeof t && "undefined" != typeof n && writeActivityIndicator(t, n), 
top.location.href = e;
}

function buyAnniversaryGift(e, t, n) {
"undefined" != typeof t && "undefined" != typeof n && writeActivityIndicator(t, n), 
top.location.href = e;
}

function openCalloutProfileLink() {
writeActivityIndicator(ACTIVITY_CALLOUT, SCENARIO_CALLOUT_VIEW_PROFILE);
}

function openCalloutFamilyTreeLink() {
writeActivityIndicator(ACTIVITY_CALLOUT, SCENARIO_CALLOUT_VIEW_IN_TREE);
}

function openCalloutPhotosLink() {
writeActivityIndicator(ACTIVITY_CALLOUT, SCENARIO_CALLOUT_VIEW_PHOTOS);
}

function openCalloutContactLink(e) {
writeActivityIndicator(ACTIVITY_CALLOUT, SCENARIO_CALLOUT_CONTACT);
var t = "GenealogySearchPageManager" === window.currentPageManagerClass ? "supersearch" :void 0;
contactMember(e, void 0, t);
}

var callingIndividualId, personDataCache = new Array(), delayedOpenBalloonId, delayedE = new Object(), delayedCacheKey, delayedAjaxURL, delayedAjaxParams;
function requestToShowMapCallout(e, a, o, l, t, n, d) {
delayedMapCalloutE.clientX = e.clientX, delayedMapCalloutE.clientY = e.clientY, 
delayedMapCalloutE.pageX = e.pageX, delayedMapCalloutE.pageY = e.pageY, delayedMapCalloutAddress = a, 
delayedMapCalloutGoogleMapLink = o, delayedMapCalloutGoogleMapPrintLink = l, delayedMapCalloutGoogleMapDrivingDirectionsLink = t, 
delayedMapCalloutFamilyMapLink = n, delayedMapCalloutIsFamilyMapNew = d, delayedOpenBalloonId = setTimeout(requestToShowMapCalloutDelayed, 500);
}

function requestToShowMapCalloutDelayed() {
hideAllBalloons(!0), updateBalloonLocation(delayedMapCalloutE, BALLOON_TYPE_MAP);
var e;
window.isRecordPageFaceliftExposed && (e = {
width:504,
height:435
}), updateBalloonData(balloonVerticalPosition, getDefaultMapCanvas(delayedMapCalloutAddress, delayedMapCalloutGoogleMapPrintLink, delayedMapCalloutGoogleMapDrivingDirectionsLink, delayedMapCalloutFamilyMapLink, delayedMapCalloutIsFamilyMapNew), BALLOON_TYPE_MAP, e);
var a = document.getElementById("mapCanvasIframe");
null != a && (setTimeout(function() {
document.getElementById("mapCanvasIframe").src = delayedMapCalloutGoogleMapLink;
}, 500), requestToShowBalloon("", BALLOON_TYPE_MAP));
}

function getMapCalloutData(e) {
var a = new google.maps.Geocoder();
a.geocode({
address:e
}, function(a, o) {
if (o == google.maps.GeocoderStatus.OK) {
var l = document.getElementById("map_canvas"), t = {
center:a[0].geometry.location,
mapTypeId:google.maps.MapTypeId.ROADMAP,
scrollwheel:!1
}, n = new google.maps.Map(l, t);
n.fitBounds(a[0].geometry.viewport);
var d = new google.maps.MarkerImage(AssetManager.R_IMG("/FP/Assets/Images/Callout/map_pin_large.png?v=1"), new google.maps.Size(28, 38), new google.maps.Point(0, 0), new google.maps.Point(14, 38)), p = new google.maps.MarkerImage(AssetManager.R_IMG("/FP/Assets/Images/Callout/map_pin_shadow.png?v=1"), new google.maps.Size(42, 34), new google.maps.Point(0, 0), new google.maps.Point(13, 33));
new google.maps.Marker({
map:n,
position:a[0].geometry.location,
icon:d,
shadow:p
});
} else if (o == google.maps.GeocoderStatus.ZERO_RESULTS && e.indexOf(",") > 0) {
var i = e.split(",");
i = i.slice(1);
var s = trim(i.join(","));
getMapCalloutData(s);
} else {
var g = document.getElementById("loadingMap"), u = document.getElementById("addressNotFound");
g && u && (g.style.display = "none", u.style.display = "");
}
});
}

function openDrivingDirerctions(e) {
requestToHideBalloon(BALLOON_TYPE_MAP), window.open(e);
}

function printMap(e) {
requestToHideBalloon(BALLOON_TYPE_MAP), window.open(e);
}

function openFamilyMap(e) {
requestToHideBalloon(BALLOON_TYPE_MAP), window.open(e);
}

var delayedMapCalloutE = new Object(), delayedMapCalloutAddress;
function requestToShowEventCallout(e, a, t, l, o) {
var n = e.target;
n || (n = e.srcElement);
for (var u = Math.round(n.offsetHeight / 2), C = Math.round(n.offsetWidth / 2); null != n; ) u += n.offsetTop, 
C += n.offsetLeft, n = n.offsetParent;
delayedEventCalloutE.curMouseX = C, delayedEventCalloutE.curMouseY = u, delayedEventCalloutCacheKey = createEventCalloutCacheKey(a, t, o), 
delayedEventCalloutAjaxURL = "/FP/API/day-callout.php", delayedEventCalloutAjaxParams = "s=" + t + "&lang=" + currentUserLang + "&date=" + a + "&proximity=" + l, 
lastCalloutEventRequestTS = new Date().getTime(), delayedOpenBalloonId = setTimeout(function() {
requestToShowEventCalloutDelayed(delayedEventCalloutCacheKey, lastCalloutEventRequestTS);
}, 500);
}

function requestToShowEventCalloutDelayed(e, a) {
var t = "";
if (delayedEventCalloutCacheKey == e && lastCalloutEventRequestTS == a) {
var l = delayedEventCalloutCacheKey.match(/([0-9]{4})-([0-9]{1,2})-([0-9]{1,2});([0-9]+);([0-1])/);
if (null != l) {
var o = "1" == l[5];
if (callingEventCalloutCacheKey = delayedEventCalloutCacheKey, hideAllBalloons(!0), 
curMouseX = delayedEventCalloutE.curMouseX, curMouseY = delayedEventCalloutE.curMouseY, 
updateBalloonLocation(0, BALLOON_TYPE_EVENTS), isEventCalloutInCache(delayedEventCalloutCacheKey) || o) t = o ? getNoEventsHTML(l[1], l[2], l[3], l[4]) :eventCalloutDataCache[delayedEventCalloutCacheKey], 
updateEventCalloutInnerHTML(t), requestToShowBalloon(callingEventCalloutCacheKey, BALLOON_TYPE_EVENTS), 
writeActivityIndicator(ACTIVITY_DAY_CALLOUT, SCENARIO_DAY_CALLOUT_OPEN); else {
var n = '<div id="dayCalloutGradientLoading">' + LOADING_CALLOUT_BALLOON_TEXT + "</div>";
toggleBalloonCloseButton(!1, BALLOON_TYPE_EVENTS), updateBalloonData(balloonVerticalPosition, n, BALLOON_TYPE_EVENTS), 
updateBalloonVerticalDirection(BALLOON_TYPE_EVENTS), requestToShowBalloon(callingEventCalloutCacheKey, BALLOON_TYPE_EVENTS);
var u = getAjaxObject(), C = Math.round(new Date().getTime() / 1e3);
sendAjaxRequest(u, delayedEventCalloutAjaxURL, delayedEventCalloutAjaxParams + "&secondsSince1970=" + C, "", "GET", finishedLoadingEventCalloutData, [ delayedEventCalloutCacheKey ], n);
}
}
}
}

function finishedLoadingEventCalloutData(e, a, t) {
var l = unescape(a);
addEventCalloutDataToCache(t, l), t == callingEventCalloutCacheKey ? (hideBalloon(!0, BALLOON_TYPE_EVENTS), 
toggleBalloonCloseButton(!0, BALLOON_TYPE_EVENTS), updateEventCalloutInnerHTML(l), 
updateBalloonVerticalDirection(BALLOON_TYPE_EVENTS), displayBalloon(0, BALLOON_TYPE_EVENTS)) :hideBalloon(!0, BALLOON_TYPE_EVENTS);
}

function updateEventCalloutInnerHTML(e) {
updateBalloonData(balloonVerticalPosition, e, BALLOON_TYPE_EVENTS);
var a = jQuery("#dayCalloutInnerTable"), t = a.height();
a.parent().height(t), jQuery("#dayCalloutGradient").height(t);
}

function createEventCalloutCacheKey(e, a, t) {
return e + ";" + a + ";" + (t ? 1 :0);
}

function isEventCalloutInCache(e) {
var a = !1;
return a = "undefined" == typeof eventCalloutDataCache[e] || null == eventCalloutDataCache[e] ? !1 :!0;
}

function addEventCalloutDataToCache(e, a) {
("undefined" == typeof eventCalloutDataCache[e] || null == eventCalloutDataCache[e]) && (eventCalloutDataCache[e] = a);
}

function removeEventCalloutFromCache(e) {
eventCalloutDataCache[e] = null;
}

function clearEventCalloutCache() {
eventCalloutDataCache = new Array();
}

function requestToHideEventCallout(e) {
lastCalloutEventRequestTS = new Date().getTime(), isBalloonVisible && requestToHideBalloon(BALLOON_TYPE_EVENTS);
}

var callingEventCalloutCacheKey, eventCalloutDataCache = new Array(), lastCalloutEventRequestTS = 0, delayedEventCalloutE = new Object(), delayedEventCalloutCacheKey, delayedEventCalloutAjaxURL, delayedEventCalloutAjaxParams;
function changeMapDistributionGeographicalArea(e, t, i, a, n, r, s, o, d, l, u, p) {
var g = document.getElementById("MapDistribution_" + e + "_table");
g && (g.className = "MapDistributionWidgetGrayed");
var c = document.getElementById("MapDistribution_" + e + "_loadingMessage");
c && (c.style.display = "");
for (var y = 1; 5 >= y; y++) {
var b = document.getElementById("MapDistribution_" + e + "_Link" + y), m = document.getElementById("MapDistribution_" + e + "_Label" + y);
y == i ? b && (b.style.display = "none", m.style.display = "") :b && (b.style.display = "", 
m.style.display = "none");
}
var M = "/FP/API/changeMapDistribution.php", h = "mapDistributionId=" + e;
h += "&area=" + t, h += "&countries=" + window["MapDistribution_" + e + "_Keys"], 
h += "&occurances=" + window["MapDistribution_" + e + "_Values"], h += "&chartWidth=" + a, 
h += "&chartHeight=" + n, h += "&maxEntriesToShowInMap=" + r, h += "&maxEntriesToShowInLegend=" + s, 
h += "&showValuesInLegend=" + o, h += "&showPercentageInLegend=" + d, h += "&defaultColor=" + l, 
h += "&startOfGradientColor=" + u, h += "&endOfGradientColor=" + p;
var _ = getAjaxObject();
sendAjaxRequest(_, M, h, "", "GET", finishedChangeMapDistributionGeographicalArea, e);
}

function finishedChangeMapDistributionGeographicalArea(e, t, i) {
var a = unescape(t), n = a.split("||");
if (1 == n[0]) return !1;
var r = i, s = document.getElementById("MapDistribution_" + r);
s && (s.innerHTML = n[1]);
var o = document.getElementById("MapDistribution_" + r + "_table");
o && (s.className = "MapDistributionWidgetRegular");
var d = document.getElementById("MapDistribution_" + r + "_loadingMessage");
d && (d.style.display = "none");
}
function bottomSmoothScrollBy(e, t) {
return e = parseInt(e), t = parseInt(t), e > 0 ? (window.scrollBy(0, t), scrollBottomTimeoutId = setTimeout(function() {
bottomSmoothScrollBy(e - t, t);
}, 10)) :clearTimeout(scrollBottomTimeoutId), !1;
}

function membersListIndividualsComboBoxChanged(e) {
var t = e.split("_"), n = document.getElementById("helperMessage_" + t[1]), i = document.getElementById(e);
i.value.length >= 2 ? n && (n.style.display = "", n.style.visibility = "visible") :n && (n.style.display = "none", 
n.style.visibility = "hidden");
}

function applyMemberAssociation(e, t, n) {
n.hideError();
var i = n.getSelectedIndividual();
if (null == i) return void n.showError();
i.memberId = e;
var l = "/FP/API/associateMember.php", a = "memberIdToAssociate=" + e;
a += "&individualIdToAssociate=" + i.id, a += "&originatingSiteID=" + t;
var d = getAjaxObject();
sendAjaxRequest(d, l, a, "", "GET", window.finishedMemberAssociation, [ i.memberId + ";_;" + i.relationship ]);
}

function finishedMemberAssociation(e, t, n) {
writeActivityIndicator(ACTIVITY_MEMBERS_LIST, SCENARIO_MEMBERS_LIST_ASSOCIATIONS), 
location.reload();
}

function fixRelationship(e, t) {
hideAllMenus(t);
var n = document.getElementById("editRelation_" + e), i = document.getElementById("relationLabel_" + e);
n.style.display = "", i.style.display = "none";
}

function closeFixRelationship(e) {
var t = document.getElementById("associationErrorMessage_" + e);
t.style.display = "none", t.style.visibility = "hidden";
var n = document.getElementById("helperMessage_" + e);
n && (n.style.display = "none", n.style.visibility = "hidden");
var i = document.getElementById("editRelation_" + e), l = document.getElementById("relationLabel_" + e);
i.style.display = "none", l.style.display = "";
}

function showChangeEmail(e) {
var t = document.getElementById("changeEmailPanel_" + e);
if (t) t.style.display = ""; else {
var n = document.getElementById("membersTable"), i = document.getElementById("memberRow_" + e), l = n.insertRow(i.rowIndex + 1);
l.id = "changeEmailPanel_" + e, l.className = "MembersListReminderRow";
var a = l.insertCell(0);
a.colSpan = "12", a.style.borderBottom = "1px solid #CFD8DF";
var d = document.getElementById("invitationPanel_" + e);
a.innerHTML = d.innerHTML;
}
var s = document.getElementById("sourceLink_" + e);
s.style.visibility = "hidden";
var r = document.getElementById("changeEmailTextBox_" + e);
r.readOnly || (r.focus(), r.select()), ("undefined" == typeof initialEmailAddress[e] || null == initialEmailAddress[e]) && (initialEmailAddress[e] = r.value);
}

function closeChangeEmail(e) {
var t = document.getElementById("changeEmailPanel_" + e);
t.style.display = "none";
var n = document.getElementById("sourceLink_" + e);
n && (n.style.visibility = "visible");
}

function changeEmailReinviteMember(e, t, n) {
var i = document.getElementById("changeEmailTextBox_" + e), l = document.getElementById("changeEmailErrorMessage_" + e);
if (l && (l.style.display = "none", l.innerHTML = ""), 1 == i.getAttribute("validateEmail") && i.value == initialEmailAddress[e]) return l ? (l.style.display = "", 
l.innerHTML = enterDifferentEmailMessage) :alert(enterDifferentEmailMessage), restoreButtonSprite2("changeEmailReinviteButton_" + e, !0), 
!1;
if (!isEmail(i.value)) return l ? (l.style.display = "", l.innerHTML = enterValidEmailMessage) :alert(enterValidEmailMessage), 
restoreButtonSprite2("changeEmailReinviteButton_" + e, !0), !1;
var a = document.getElementById("changeEmailPleaseWait_" + e), d = document.getElementById("changeEmailCancel_" + e);
a.style.visibility = "visible", d.style.display = "none";
var s = "/FP/API/changeEmail.php", r = "memberID=" + e;
r += "&changeEmail=" + (i.readOnly || initialEmailAddress[e] == i.value ? 0 :1), 
r += "&newEmailAddress=" + encodeURIComponent(i.value), r += "&originatingSiteID=" + t;
var o = getAjaxObject();
sendAjaxRequest(o, s, r, "", "GET", window.finishedChangeEmail, [ e + ";" + (n ? 1 :0) ]);
}

function finishedChangeEmail(e, t, n) {
var i = unescape(t), l = n.split(";")[0], a = 1 == n.split(";")[1];
document.getElementById("changeEmail_" + l);
if (0 != i) {
var d = document.getElementById("changeEmailPleaseWait_" + l), s = document.getElementById("changeEmailCancel_" + l);
d.style.visibility = "hidden", s.style.display = "";
var r = "", o = i.split(";")[0];
r = 1 == o ? i.substr(i.indexOf(";") + 1) :a ? reminderFailedText :reinvitationFailedText;
var m = document.getElementById("changeEmailErrorMessage_" + l);
return m ? (m.style.display = "", m.innerHTML = r) :alert(enterValidEmailMessage), 
restoreButtonSprite2("changeEmailReinviteButton_" + l, !0), !1;
}
var c = a ? reminderSentText :reinvitationSentText, u = document.getElementById("statusCell_" + l);
u.innerHTML = '<table cellspacing="0" cellpadding="0" border="0"><tr><td><img class="NotificationIcon NotificationIconSmallCheckmarkOverWhite" src="' + AssetManager.R_IMG("/FP/Images/spacer.gif") + '"/></td><td style="padding-left: 4px;"><span class="FL_LabelGreenBold">' + c + "</span></td></tr></table>", 
closeChangeEmail(l);
}

function vaildateEnterAddressPopupFields(e) {
if ("undefined" == typeof e && (e = !1), e) {
var t = document.getElementById("streetAddress"), n = document.getElementById("city"), i = document.getElementById("zip"), l = document.getElementById("country"), a = l.options[l.selectedIndex].value;
if ("US" == a || "CA" == a) var d = document.getElementById("canadianProvinces"), s = d.options[d.selectedIndex].value; else var s = "";
var r = document.getElementById("homePhone"), o = document.getElementById("cellPhone");
if ("" == t.value && "" == n.value && "" == i.value && "" == a && "" == s && "" == r.value && "" == o.value) return !0;
}
var t = document.getElementById("streetAddress");
if ("" == t.value) return alert(enterAddressPleaseFillAtLeastOneField), restoreButtonSprite2("saveBtn", !0), 
t.focus(), !1;
var n = document.getElementById("city");
if ("" == n.value) return alert(enterAddressPleaseFillAtLeastOneField), restoreButtonSprite2("saveBtn", !0), 
n.focus(), !1;
var l = document.getElementById("country"), a = l.options[l.selectedIndex].value;
if ("" == a) return alert(enterAddressPleaseFillAtLeastOneField), restoreButtonSprite2("saveBtn", !0), 
l.focus(), !1;
if ("US" == a || "CA" == a) {
if ("US" == a) var d = document.getElementById("usStates"); else var d = document.getElementById("canadianProvinces");
var s = d.options[d.selectedIndex].value;
if ("" == s) return alert(enterAddressPleaseFillAtLeastOneField), restoreButtonSprite2("saveBtn", !0), 
d.focus(), !1;
}
var r = document.getElementById("homePhone");
if ("" != r.value && r.value.length < 5) return alert(enterAddressPhoneNumberLength), 
restoreButtonSprite2("saveBtn", !0), r.focus(), !1;
var o = document.getElementById("cellPhone");
return "" != o.value && o.value.length < 5 ? (alert(enterAddressPhoneNumberLength), 
restoreButtonSprite2("saveBtn", !0), o.focus(), !1) :!0;
}

function membersListEnterAddressSaveBtnClicked(e, t, n, i) {
if (!vaildateEnterAddressPopupFields(e)) return !1;
var l = document.getElementById("preloader");
l && (l.style.visibility = "visible");
var a = document.getElementById("country"), d = a.options[a.selectedIndex].value, s = "";
if ("US" == d || "CA" == d) {
if ("US" == d) var r = document.getElementById("usStates"); else var r = document.getElementById("canadianProvinces");
s = r.options[r.selectedIndex].value;
}
var o = "/FP/API/changeAddress.php", m = "memberID=" + n;
m += "&initiatorID=" + t, m += "&originatingSiteId=" + i, m += "&address=" + encodeURIComponent(document.getElementById("streetAddress").value), 
m += "&city=" + encodeURIComponent(document.getElementById("city").value), m += "&state=" + s, 
m += "&country=" + d, m += "&zipCode=" + document.getElementById("zip").value, m += "&homePhone=" + document.getElementById("homePhone").value, 
m += "&cellPhone=" + document.getElementById("cellPhone").value;
var c = parent.document.getElementById("balloon_box" + parent.BALLOON_TYPE_MAP);
c && parent.attachBalloonToBody(c), m += "&isMapCalloutWidgetPresent=" + (null == c ? 0 :1);
var u = getAjaxObject();
sendAjaxRequest(u, o, m, "", "GET", window.finishedChangeAddress, [ n ]);
}

function finishedChangeAddress(e, t, n) {
var i = unescape(t), l = i.split("||");
if (1 == l[0]) return closePopup(), !1;
var a = n, d = parent.document.getElementById("address_" + a);
d && (d.innerHTML = l[1]), closePopup();
}

var scrollBottomTimeoutId, initialEmailAddress = new Array();
function openEnterAddressPopup(e, n, t) {
hideAllMenus(t), openCenteredPopup2(n, 436, isIE ? 378 :358, "", "scroll:no;", null, e, !0);
}

function membersAddressesChanged(e) {
if ("undefined" != typeof membersAddressesArr[e]) {
var n = membersAddressesArr[e].split("||"), t = document.getElementById("homePhone");
t.value = n[0];
var d = document.getElementById("streetAddress");
d.value = n[1];
var l = document.getElementById("city");
l.value = n[2];
var s = document.getElementById("zip");
s.value = n[5];
var i = document.getElementById("country");
i.value = n[4], i.onchange();
var a = document.getElementById("usStates");
a.value = n[3], a.value != n[3] && (a.selectedIndex = 0);
var o = document.getElementById("canadianProvinces");
o.value = n[3], o.value != n[3] && (o.selectedIndex = 0);
}
}

function countryChanged(e) {
var n = document.getElementById("stateOrDistrictLabel"), t = document.getElementById("usStates"), d = document.getElementById("canadianProvinces"), l = document.getElementById("requiredStateOrProvnice");
"US" == e ? (l.style.display = "", n.innerHTML = stateLabel, n.style.display = "", 
t.style.display = "", d.style.display = "none") :"CA" == e ? (l.style.display = "", 
n.innerHTML = provinceLabel, n.style.display = "", t.style.display = "none", d.style.display = "") :(l.style.display = "none", 
n.style.display = "none", t.style.display = "none", d.style.display = "none");
}

function phoneFieldFocused() {
var e = document.getElementById("phoneNumberTip");
e && (e.style.visibility = "visible");
}

function phoneFieldBlured() {
var e = document.getElementById("phoneNumberTip");
e && (e.style.visibility = "hidden");
}
function getXmlDocument(e) {
var t;
if (document.implementation.createDocument) {
var n = new DOMParser();
t = n.parseFromString(e, "text/xml");
} else window.ActiveXObject && (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", 
t.loadXML(e));
return t;
}

function getXmlNodes(e, t) {
if (null != e && "undefined" != typeof e.getElementsByTagName) {
var n = e.getElementsByTagName(t);
return "undefined" != typeof n ? n :null;
}
return null;
}

function getXmlNode(e, t) {
if (null != e && "undefined" != typeof e.getElementsByTagName) {
var n = e.getElementsByTagName(t);
return "undefined" != typeof n ? n[0] :null;
}
return null;
}

function getXmlNodeValue(e) {
return null != e && "undefined" != typeof e.firstChild && null != e.firstChild && "undefined" != typeof e.firstChild.nodeValue ? e.firstChild.nodeValue :null;
}

function getXmlNodeAttributeValue(e, t) {
return null != e && "undefined" != typeof e.attributes && null != e.attributes && null != e.attributes.getNamedItem(t) ? e.attributes.getNamedItem(t).value :null;
}
function isTextAreaShadedEmpty(e) {
return e && "" != e.value && e.value != e.getAttribute("comment") ? !1 :!0;
}

function setTextAreaShadedText(e, t) {
var a = document.getElementById(e);
a && (removeClass(a, a.getAttribute("commentCssClass")), a.value = t, a.dir = a.getAttribute("inputDir"));
}

function clearTextAreaShaded(e) {
var t = document.getElementById(e);
t && (addClass(t, t.getAttribute("commentCssClass")), t.value = t.getAttribute("comment"), 
t.dir = t.getAttribute("commentDir"));
}

function changeTextAreaShadedComment(e, t) {
var a = document.getElementById(e);
a && (isTextAreaShadedEmpty(a) && (a.value = t), a.setAttribute("comment", t));
}
function Accelimation(t, i, s, n, e, h, a, o) {
if ("undefined" == typeof e && (e = .1), "undefined" == typeof h && (h = "px"), 
e > 2 || 0 >= e) throw new Error("Illegal value for zip. Must be less than or equal to 2 and greater than 0.");
"undefined" == typeof a && (a = ""), "undefined" == typeof o && (o = ""), this.obj = t, 
this.prop = i, this.x1 = s, this.dt = n, this.zip = e, this.unit = h, this.prefix = a, 
this.suffix = o, this.x0 = parseFloat(this.obj[this.prop]), isNaN(this.x0) && (this.x0 = 0), 
this.D = this.x1 - this.x0, this.A = this.D / Math.abs(Math.pow(n, this.zip)), this.id = Accelimation.instances.length, 
this.onend = null;
}

Accelimation.prototype.start = function() {
this.t0 = new Date().getTime(), this.t1 = this.t0 + this.dt;
this.x1 - this.x0;
Accelimation._add(this);
}, Accelimation.prototype.stop = function() {
Accelimation._remove(this);
}, Accelimation.prototype._paint = function(t) {
if (t < this.t1) {
var i = t - this.t0;
this.obj[this.prop] = this.prefix + Math.round(1e3 * (Math.abs(Math.pow(i, this.zip)) * this.A + this.x0)) / 1e3 + this.suffix + this.unit;
} else this._end();
}, Accelimation.prototype._end = function() {
Accelimation._remove(this), this.obj[this.prop] = this.x1 + this.unit, this.onend && this.onend();
}, Accelimation._add = function(t) {
var i = this.instances.length;
this.instances[i] = t, 1 == this.instances.length && (this.timerID = window.setInterval(function() {
Accelimation._paintAll();
}, this.targetRes));
}, Accelimation._remove = function(t) {
for (var i = 0; i < this.instances.length; i++) if (t == this.instances[i]) {
this.instances = this.instances.slice(0, i).concat(this.instances.slice(i + 1));
break;
}
0 == this.instances.length && (window.clearInterval(this.timerID), this.timerID = null);
}, Accelimation._paintAll = function() {
for (var t = new Date().getTime(), i = 0; i < this.instances.length; i++) this.instances[i]._paint(Math.max(t, this.instances[i].t0));
}, Accelimation.instances = [], Accelimation.targetRes = 10, Accelimation.timerID = null;
function pk_openLanguageSelector(e, n, a) {
openNewPopup("/FP/Library/LanguageSelector/PK_LanguageSelector.php", "s=" + e + "&lang=" + n, a);
}

function languageSelectorLanguageSelected(e) {
function n() {
window.closeNewPopup();
}
var a = document.location.href, t = "";
a.indexOf("#") > -1 && (t = a.substr(a.indexOf("#")), a = a.substr(0, a.indexOf("#"))), 
a += a.indexOf("?") > -1 ? "&page-url-for-lang=" + e :"?page-url-for-lang=" + e;
var o = new XMLHttpRequest();
o.preventCsrfToken = !0, o.open("GET", a), o.setRequestHeader("Content-Type", "application/json"), 
o.onload = function() {
try {
if (200 === o.status && o.responseText) {
var e = JSON.parse(o.responseText);
if (e && e.data && e.data.url) return void document.location.replace(e.data.url + t);
}
n();
} catch (a) {
n();
}
}, o.send();
}

function onLanguageSelected(e) {
for (var n = "languageSelectorLabel", a = "languageSelectorLink", t = document.querySelectorAll(".language_list ." + n), o = 0; o < t.length; o++) t[o].classList.remove(n), 
t[o].classList.add(a);
var l = document.getElementById("link_" + e);
l && (l.classList.remove(a), l.classList.add(n));
}

function languageSelectorOnApply(e) {
languageSelectorLanguageSelected(e);
}
function openSignupPopup(e, o) {
o = jQuery.extend({
lang:e
}, signupPopupDefaultOptions, o), "loginOnly" == o.popupType ? o.startWith = "login" :"signupOnly" == o.popupType ? o.startWith = "signup" :"forgotPasswordOnly" == o.popupType && (o.startWith = "forgotPassword"), 
"login" !== o.startWith || window.isIE || (o.focusOnFirstField = !0, o.focusOnFieldType = "email");
var n = {
OnBeforeClose:signupPopupBeforeClose
};
o.focusOnFirstField && (n.mhFocusOnFirstField = !0, n.focusOnFieldType = o.focusOnFieldType), 
o.emailValue && "" != o.emailValue && (n.preFillFieldValue = o.emailValue, n.focusOnPreFillValueType = o.preFillFieldType), 
jQuery.isFunction(o.onCloseCallback) && (n = jQuery.extend({}, {
OnAfterClose:o.onCloseCallback
}, n), delete o.onCloseCallback), jQuery.isFunction(o.mhPopupReady) && (n = jQuery.extend({}, {
mhPopupReady:o.mhPopupReady
}, n), delete o.mhPopupReady), o.onCloseByCancel && (n = jQuery.extend(n, {
onCloseByCancel:o.onCloseByCancel
}));
var i = Object.keys(o).map(function(e) {
return o[e] ? encodeURIComponent(e) + "=" + encodeURIComponent(o[e]) :null;
}).filter(function(e) {
return !!e;
}).join("&");
openNewPopup("/FP/Library/SignupPopup/SignupPopup.php", i, n);
}

function signupPopupBeforeClose() {
jQuery("#loginForm").validationEngine("hideAll");
}

function openPasswordConfirmationPopup(e, o) {
o = jQuery.extend({}, passwordConfirmationDefaultOptions, o);
var n = {
OnBeforeClose:passwordConfirmationPopupBeforeClose
};
jQuery.isFunction(o.onCloseCallback) && (n = jQuery.extend({}, {
OnAfterClose:o.onCloseCallback
}, n)), openNewPopup("/FP/Library/PlanCancelConfirmationPopup/PlanCancelConfirmationPopup.php", "lang=" + e, n);
}

function passwordConfirmationPopupBeforeClose() {
jQuery("#verifyPasswordForm").validationEngine("hideAll"), jQuery("#forgotPasswordForm").validationEngine("hideAll");
}

var FORGOT_PASSWORD_ACTIVITY = "SignupSignin.forgotPasswordClicked", LOGIN_CLICKED_ACTIVITY = "SignupSignin.loginClicked", signupPopupDefaultOptions = {
signupTitle:"",
loginTitle:"",
flavor:"",
signupReason:"family tree data entry",
startWith:"login",
popupType:"combined",
onCloseCallback:"",
focusOnFirstField:!1,
callbackExtraParameter:"",
emailValue:"",
preFillFieldType:""
}, passwordConfirmationDefaultOptions = {
signupTitle:"",
loginTitle:"",
startWith:"login",
popupType:"combined",
onCloseCallback:""
};
function crossBrowserNavigateToHash(e) {
if (isIE) {
var t = document.getElementById("ajaxIFrame");
null == t && (t = document.createElement("iframe"), t.id = "ajaxIFrame", t.style.display = "none", 
document.body.appendChild(t)), t.src = "/FP/API/Utilities/ajax-log.html?" + e.substr(1);
}
document.location.hash = e;
}

function ajaxLogCallback(e) {
if ("" == e && iframeTitleNotSet) {
try {
var t = document.frames("ajaxIFrame");
t && (t.document.title = document.title);
} catch (a) {}
iframeTitleNotSet = !1;
}
document.location.hash = "#" + e, "undefined" != typeof actOnNewAnchor && actOnNewAnchor("#" + e);
}

var iframeTitleNotSet = !0;
function showPremiumFeaturePopup(e) {
var r = premiumFeatureUrl;
r += "&reason=" + e;
var u = 580, o = 240;
openCenteredPopup2(r, u, o, "", "scroll:no;", "", premiumFeatureTitle, !0);
}
function getOuterHTML(e) {
var o = jQuery(e);
return o.length > 0 ? o.clone().wrap("<div></div>").parent().html() :void 0;
}

function openNewPopup(e, o, n) {
var t = !1;
n = jQuery.extend({}, {
escClose:!1
}, simpleModalDefaultOptions, n), "undefined" != typeof n.dontAllowClosing && n.dontAllowClosing && (t = !0), 
modalOptions = n, getNewPopupWindow().modal(n), n.shouldBeFluidPopup && n.isInMobile && jQuery("body").removeClass("mobile_responsive_popup"), 
"undefined" == typeof o && (o = ""), "" != o && (o += "&"), o += "&dontAllowClosing=" + (t ? 1 :0);
var i = function() {
jQuery("#simplemodal-container").hide();
try {
jQuery.modal.close();
} catch (e) {}
"undefined" != typeof MH_Error ? new MH_Error() :alert("An error occurred. Please try again later.");
};
jQuery.ajax({
url:e,
data:o,
cache:!1,
dataType:"json",
success:function(e) {
e.error ? i() :popupDataRetrieved(e, n, t);
},
error:function(e, o) {
i();
}
});
}

function popupDataRetrieved(e, o, n) {
var t;
if (e.cssResources.length > 0) {
var i = new LazyCssDownloader();
for (t = 0; t < e.cssResources.length; t++) i.addFullPathCss(e.cssResources[t]);
i.startDownload();
}
var l = function() {
setPopupContent(e.content, o, n);
};
if (e.jsResources.length > 0) {
var r = new LazyScriptDownloader(l);
for (t = 0; t < e.jsResources.length; t++) r.addFullPathScript(e.jsResources[t]);
r.startDownload();
} else l();
}

function setPopupContent(e, o, n) {
var t, i;
t = getNewPopupWindow(), t.html(e), i = jQuery("#simplemodal-container");
var l, r;
i.show(), l = t.children().first().width() + newPopupBordersWidth, r = t.children().first().height() + newPopupBordersHeight, 
i.width(l), i.height(r), jQuery.modal.setPosition(), jQuery.fn.styledSelect && jQuery("#newPopupDragContainer select").not(".dont-styled-select").styledSelect(), 
void 0 != o && o.mhScrollableContainerSelector && setPopupInnerScroll(o.mhScrollableContainerSelector), 
i.hide(), i.fadeIn("fast", function() {
if (void 0 != o) {
if (o.mhFocusOnFirstField) {
var e = o.focusOnFieldType || "text";
if (jQuery("#newPopupWindow input[type=" + e + "]:visible:first").focus(), o.preFillFieldValue && "" != o.preFillFieldValue) {
var t = o.focusOnPreFillValueType, i = o.preFillFieldValue;
jQuery("#newPopupWindow input[type=" + e + "]:visible:first").val(i), jQuery("#newPopupWindow input[type=" + t != "" ? t :e + "]:visible:first").focus();
}
}
void 0 != o.mhPopupReady && o.mhPopupReady();
}
n !== !0 && jQuery(document).bind("keydown.simplemodal", function(e) {
27 === e.keyCode && (e.preventDefault(), closeNewPopup());
});
}), isIE && "BackCompat" == document.compatMode ? jQuery("#popupHeader").css("cursor", "default") :jQuery("#newPopupDragContainer").draggable({
handle:"#popupHeader"
});
}

function setPopupInnerScroll(e, o) {
var n = jQuery(e);
if (0 != n.length) {
n.css({
"max-height":"",
"overflow-y":"hidden"
});
var t = jQuery("#newPopupDragContainer"), i = jQuery(window).height(), l = t.height(), r = 35;
if (l > i - r) {
var s = l - (i - r), u = n.height() - s;
if (n.css({
"max-height":u,
"overflow-y":"auto"
}), void 0 != o) {
var a = jQuery(o), p = a.height() + a.position().top;
p > u && p - u > n.scrollTop() && window.setTimeout(function() {
n.scrollTop(p - u);
}, 0);
}
}
jQuery("#simplemodal-container").height(getNewPopupWindow().height()), jQuery.modal.setPosition();
}
}

function closeNewPopup() {
jQuery.modal.close(), modalOptions && modalOptions.onCloseByCancel && modalOptions.onCloseByCancel();
}

function closeNewPopupFromBackInHistory() {
jQuery.modal.close(), jQuery(window).off("popstate", closeNewPopupFromBackInHistory);
}

function popupOpened(e) {
jQuery("body").addClass("smPopupOpen"), hideAllFlashes(), e.data.show(), this.o.modal ? e.overlay.fadeIn("fast", function() {
e.container.fadeIn("fast");
}) :e.container.fadeIn("fast");
}

function popupClosed(e, o) {
o && jQuery.isFunction(o.OnBeforeClose) && o.OnBeforeClose.apply(this), e.container.fadeOut("fast", function() {
e.overlay.fadeOut("fast", function() {
jQuery.modal.close(), o && jQuery.isFunction(o.OnAfterClose) && o.OnAfterClose.apply(this);
});
}), showAllFlashes(), jQuery("body").removeClass("smPopupOpen");
}

function toggleFlashVisibilty(e, o) {
for (var n = e.document.getElementsByTagName("object"), t = 0; t < n.length; t++) n[t].style.visibility = o;
for (n = e.document.getElementsByTagName("EMBED"), t = 0; t < n.length; t++) n[t].style.visibility = o;
}

function hideAllFlashes() {
toggleFlashVisibilty(window, "hidden");
}

function showAllFlashes() {
toggleFlashVisibilty(window, "visible");
}

function setNewPopupTitle(e) {
jQuery("#popupHeader .PK_popupTitle").fadeOut("fast", function() {
jQuery(this).html(e), jQuery(this).fadeIn();
});
}

var simpleModalDefaultOptions = {
onClose:popupClosed,
onOpen:popupOpened,
modal:!0,
fixed:"undefined" == typeof isMobile ? !1 :isMobile
}, modalOptions = {}, getNewPopupWindow = function() {
var e;
return function() {
if (!e) {
e = !0;
var o = jQuery('<div id="newPopupWindow" style="display: none;">&nbsp;</div>');
return document.body.appendChild(o[0]), o;
}
return jQuery("#newPopupWindow");
};
}(), newPopupBordersWidth = 14, newPopupBordersHeight = 14;
!function(e, t) {
function n(t) {
this._window = t || e, this._document = this._window.document;
}
var r = "USD", i = "EUR", s = "GBP", o = "SymbolOff", d = "SymbolOn", u = "price", c = "currency_selector";
n.prototype.updateCurrency = function(e, t, n, r, i, s, o) {
if ("undefined" == typeof s || 0 == s) this.handleClickFeedbackInNonSelector(e); else {
var d = this.getSelectedCurrency(o);
2 == d.length && (e = d[0], t = d[1]);
}
this.updatePricesByCurrency(e), this.updateAllCurrencyWidgets(e, t), n && this.persistCurrencyInSession(t, r), 
i && i(t);
}, n.prototype.handleClickFeedbackInNonSelector = function(e) {
jQuery(this._document).find("." + r + d).removeClass(r + d).addClass(r + o), jQuery(this._document).find("." + i + d).removeClass(i + d).addClass(i + o), 
jQuery(this._document).find("." + s + d).removeClass(s + d).addClass(s + o), jQuery(this._document).find("." + e + o).removeClass(e + o).addClass(e + d);
}, n.prototype.updatePricesByCurrency = function(e) {
jQuery(this._document).find('span[class^="' + u + '"]').hide(), jQuery(this._document).find("." + u + e).show();
}, n.prototype.persistCurrencyInSession = function(e, t) {
this._window.jQuery.ajax({
url:"/FP/API/Billing/save-last-currency.php",
type:"POST",
data:{
currencyCode:e,
s:t
},
dataType:"json"
});
}, n.prototype.getSelectedCurrency = function(e) {
var t = jQuery(this._document).find("#" + e + " option:selected");
return "undefined" != typeof t ? t.val().split("-") :[];
}, n.prototype.updateAllCurrencyWidgets = function(e, t) {
var n, r = e + "-" + t, i = jQuery(this._document).find("." + c), s = i.length;
for (n = 0; s > n; n++) i[n].value = r;
}, t.CurrencyWidget = n;
}(window, window);
var googleAnalyticsTracking = {
options:{
debugMode:!1,
defaultTrackableEvents:{
click:{
a:"Link click",
":button":"Button click",
":submit":"Submit click"
}
}
},
attachElementsTracking:function(t, e, n) {
var e = e ? e :googleAnalyticsTracking.options.defaultTrackableEvents;
_.each(e, function(e, a) {
_.each(e, function(e, i) {
jQuery(i).each(function() {
var i = jQuery(this), c = i.attr("id");
c && googleAnalyticsTracking.bindTrackEvent("#" + c, a, t, e, c, null, null, n);
});
});
});
},
trackEvent:function(t, e, n, a, i, c) {
"undefined" == typeof i && (i = !1), "undefined" == typeof c && (c = "GAevent");
var o = {
event:c,
eventCategory:t,
eventAction:e,
eventLabel:n,
eventValue:a,
eventNonInteraction:i
};
googleAnalyticsTracking.trackEventObject(o);
},
bindTrackEvent:function(t, e, n, a, i, c, o, r) {
if ("undefined" != typeof r) {
var l = jQuery(t);
if (0 != l.length && (l.bind(e, function() {
googleAnalyticsTracking.trackEvent(n, a, i, c, o, r);
}), googleAnalyticsTracking.options.debugMode)) {
l.css({
borderColor:"red",
borderWidth:"1px",
borderStyle:"solid"
});
var u = l.attr("title");
l.attr("title", u ? u :"(GA: " + n + ", " + a + ", " + i + ")");
}
}
},
trackEventObject:function(t) {
"undefined" != typeof gtmDataLayer && gtmDataLayer.push(t);
}
};
function displayAccountIdBalloon(o, e, r) {
function n() {
r.hideBalloon(), e.unbind("touchstart", n);
}
if (o.stopPropagation(), r.showBalloon && (window.isMobile || window.isTablet)) {
var t = "top";
window.isTablet && (t = "bottom"), r.showBalloon({
position:t,
offsetY:-10,
classname:"account_id_balloon_style"
}), e.bind("touchstart", n);
}
}

function handleUpgradeButtonClick(o, e, r) {
if (currentSiteId == r) window.writeRedirectActivity(o.activityName, o.scenario, o.redirectUrl); else {
var n = jQuery.param(jQuery.extend({
s:currentSiteId
}, e, o));
openNewPopup("/FP/Library/UpgradeMultipleSitesPopup/UpgradeMultipleSitesPopup.php", n);
}
}

var userStripMySitesDropdown = {
siteId:null,
dataLoaded:!1,
dropdownLink:null,
dropdown:null,
dropdownOpen:!1,
dropdownPositioned:!1,
clickEventName:"click",
dropdownMouseEnterTimeout:null,
dropdownMouseLeaveTimeout:null,
isQuirksMode:!1,
isMobile:!1,
init:function(o, e, r) {
"undefined" != typeof e && (userStripMySitesDropdown.isQuirksMode = e), "undefined" != typeof r && (userStripMySitesDropdown.isMobile = r), 
userStripMySitesDropdown.siteId = o, userStripMySitesDropdown.dropdownLink = jQuery("#pk_user_strip_my_sites"), 
userStripMySitesDropdown.dropdown = jQuery(".pk_user_strip_my_sites_dropdown"), 
userStripMySitesDropdown.isMobile ? (userStripMySitesDropdown.dropdownLink.click(userStripMySitesDropdown.dropdownLinkClicked), 
isIos && (userStripMySitesDropdown.clickEventName = "touchend")) :(userStripMySitesDropdown.dropdownLink.click(userStripMySitesDropdown.activateUrl), 
userStripMySitesDropdown.dropdownLink.mouseenter(userStripMySitesDropdown.dropdownMouseEnter), 
userStripMySitesDropdown.dropdownLink.mouseleave(userStripMySitesDropdown.dropdownMouseLeave), 
userStripMySitesDropdown.dropdown.mouseenter(function() {
userStripMySitesDropdown.dropdownMouseEnterClearTimeout(), userStripMySitesDropdown.dropdownMouseLeaveClearTimeout();
}), userStripMySitesDropdown.dropdown.mouseleave(userStripMySitesDropdown.dropdownMouseLeave));
},
dropdownMouseEnter:function() {
userStripMySitesDropdown.dropdownMouseLeaveClearTimeout(), userStripMySitesDropdown.dropdownMouseEnterSetTimeout();
},
dropdownMouseEnterSetTimeout:function() {
userStripMySitesDropdown.dropdownMouseEnterTimeout = setTimeout(userStripMySitesDropdown.dropdownMouseEnterInner, 150);
},
dropdownMouseEnterInner:function() {
userStripMySitesDropdown.dataLoaded || userStripMySitesDropdown.loadData(), userStripMySitesDropdown.showDropdown();
},
dropdownMouseEnterClearTimeout:function() {
clearTimeout(userStripMySitesDropdown.dropdownMouseEnterTimeout);
},
dropdownMouseLeave:function() {
userStripMySitesDropdown.dropdownMouseEnterClearTimeout(), userStripMySitesDropdown.dropdownMouseLeaveSetTimeout();
},
dropdownMouseLeaveSetTimeout:function() {
userStripMySitesDropdown.dropdownMouseLeaveTimeout = setTimeout(userStripMySitesDropdown.dropdownMouseLeaveInner, 500);
},
dropdownMouseLeaveInner:function() {
userStripMySitesDropdown.hideDropdown();
},
dropdownMouseLeaveClearTimeout:function() {
clearTimeout(userStripMySitesDropdown.dropdownMouseLeaveTimeout);
},
dropdownLinkClicked:function(o) {
return userStripMySitesDropdown.dataLoaded || userStripMySitesDropdown.loadData(), 
userStripMySitesDropdown.dropdownOpen ? userStripMySitesDropdown.activateUrl() :userStripMySitesDropdown.showDropdown(), 
o.stopPropagation(), !1;
},
activateUrl:function() {
var o = userStripMySitesDropdown.dropdownLink.attr("href");
document.location.href = o;
},
loadData:function() {
jQuery.ajax({
url:"/FP/API/MySites/mySitesDropdown.php",
dataType:"json",
data:{
siteId:userStripMySitesDropdown.siteId
},
success:function(o) {
userStripMySitesDropdown.dataLoaded = !0;
var e = jQuery("#userStripMySitesLinks");
"undefined" != typeof o.data && (jQuery("#userStripMySitesLinks").html(o.data), 
jQuery("#userStripMySitesPreloader").hide(), e.show(), userStripMySitesDropdown.isQuirksMode && e.height() > 175 && e.height(175));
}
});
},
showDropdown:function() {
userStripMySitesDropdown.dropdownPositioned || userStripMySitesDropdown.positionDropdown(), 
userStripMySitesDropdown.dropdown.show(), userStripMySitesDropdown.dropdownLink.addClass("pk_user_strip_item_hover"), 
userStripMySitesDropdown.isMobile && jQuery("html").bind(userStripMySitesDropdown.clickEventName, userStripMySitesDropdown.mouseClickedGeneral), 
userStripMySitesDropdown.dropdownOpen = !0;
},
mouseClickedGeneral:function(o) {
isIos && jQuery(o.originalEvent.target).is("#pk_user_strip_my_sites *, .pk_user_strip_my_sites_dropdown *") || userStripMySitesDropdown.hideDropdown();
},
hideDropdown:function() {
userStripMySitesDropdown.dropdown.hide(), userStripMySitesDropdown.dropdownLink.removeClass("pk_user_strip_item_hover"), 
userStripMySitesDropdown.isMobile && jQuery("html").unbind(userStripMySitesDropdown.clickEventName, userStripMySitesDropdown.mouseClickedGeneral), 
userStripMySitesDropdown.dropdownOpen = !1;
},
positionDropdown:function() {
userStripMySitesDropdown.dropdownLink.offset();
userStripMySitesDropdown.dropdown.css("top", userStripMySitesDropdown.dropdownLink.outerHeight()), 
userStripMySitesDropdown.dropdownPositioned = !0;
}
}, userStripNotification = {
updateIconValue:function(o, e) {
var r, n, t = jQuery("#userStripNotificationIcon" + o), i = t.text();
r = i ? i :"0", n = parseInt(r) + e, 0 > n && (n = 0), t.text(n), n ? t.css("visibility", "visible") :t.css("visibility", "hidden");
}
}, userStripAccountDropdown = {
dropdownLink:null,
dropdown:null,
dropdownOpen:!1,
dropdownPositioned:!1,
clickEventName:"click",
dropdownMouseEnterTimeout:null,
dropdownMouseLeaveTimeout:null,
isMobile:!1,
init:function(o) {
"undefined" != typeof o && (userStripAccountDropdown.isMobile = o), userStripAccountDropdown.dropdownLink = jQuery("#pk_user_strip_account"), 
userStripAccountDropdown.dropdown = jQuery(".pk_user_strip_account_dropdown"), userStripAccountDropdown.isMobile ? (userStripAccountDropdown.dropdownLink.click(userStripAccountDropdown.dropdownLinkClicked), 
isIos && (userStripAccountDropdown.clickEventName = "touchend")) :(userStripAccountDropdown.dropdownLink.click(userStripAccountDropdown.activateUrl), 
userStripAccountDropdown.dropdownLink.mouseenter(userStripAccountDropdown.dropdownMouseEnter), 
userStripAccountDropdown.dropdownLink.mouseleave(userStripAccountDropdown.dropdownMouseLeave), 
userStripAccountDropdown.dropdown.mouseenter(function() {
userStripAccountDropdown.dropdownMouseEnterClearTimeout(), userStripAccountDropdown.dropdownMouseLeaveClearTimeout();
}), userStripAccountDropdown.dropdown.mouseleave(userStripAccountDropdown.dropdownMouseLeave));
},
dropdownMouseEnter:function() {
userStripAccountDropdown.dropdownMouseLeaveClearTimeout(), userStripAccountDropdown.dropdownMouseEnterSetTimeout();
},
dropdownMouseEnterSetTimeout:function() {
userStripAccountDropdown.dropdownMouseEnterTimeout = setTimeout(userStripAccountDropdown.dropdownMouseEnterInner, 0);
},
dropdownMouseEnterInner:function() {
userStripAccountDropdown.showDropdown();
},
dropdownMouseEnterClearTimeout:function() {
clearTimeout(userStripAccountDropdown.dropdownMouseEnterTimeout);
},
dropdownMouseLeave:function() {
userStripAccountDropdown.dropdownMouseEnterClearTimeout(), userStripAccountDropdown.dropdownMouseLeaveSetTimeout();
},
dropdownMouseLeaveSetTimeout:function() {
userStripAccountDropdown.dropdownMouseLeaveTimeout = setTimeout(userStripAccountDropdown.dropdownMouseLeaveInner, 500);
},
dropdownMouseLeaveInner:function() {
userStripAccountDropdown.hideDropdown();
},
dropdownMouseLeaveClearTimeout:function() {
clearTimeout(userStripAccountDropdown.dropdownMouseLeaveTimeout);
},
dropdownLinkClicked:function(o) {
return userStripAccountDropdown.dropdownOpen ? userStripAccountDropdown.activateUrl() :userStripAccountDropdown.showDropdown(), 
o.stopPropagation(), !1;
},
activateUrl:function() {
var o = userStripAccountDropdown.dropdownLink.attr("href");
document.location.href = o;
},
showDropdown:function() {
userStripAccountDropdown.dropdownPositioned || userStripAccountDropdown.positionDropdown(), 
userStripAccountDropdown.dropdown.show(), userStripAccountDropdown.dropdownLink.addClass("pk_user_strip_item_hover"), 
userStripAccountDropdown.isMobile && jQuery("html").bind(userStripAccountDropdown.clickEventName, userStripAccountDropdown.mouseClickedGeneral), 
userStripAccountDropdown.dropdownOpen = !0;
},
mouseClickedGeneral:function(o) {
isIos && jQuery(o.originalEvent.target).is("#pk_user_strip_account *, .pk_user_strip_account_dropdown *") || userStripAccountDropdown.hideDropdown();
},
hideDropdown:function() {
userStripAccountDropdown.dropdown.hide(), userStripAccountDropdown.dropdownLink.removeClass("pk_user_strip_item_hover"), 
userStripAccountDropdown.isMobile && jQuery("html").unbind(userStripAccountDropdown.clickEventName, userStripAccountDropdown.mouseClickedGeneral), 
userStripAccountDropdown.dropdownOpen = !1;
},
positionDropdown:function() {
var o = jQuery(".pk_user_strip");
userStripAccountDropdown.dropdown.css("top", userStripAccountDropdown.dropdownLink.outerHeight()), 
"right" == displayLanguageDirection ? userStripAccountDropdown.dropdown.css("right", o.offset().left + o.width() - userStripAccountDropdown.dropdownLink.offset().left - userStripAccountDropdown.dropdownLink.outerWidth() - 1) :userStripAccountDropdown.dropdown.css("left", userStripAccountDropdown.dropdownLink.offset().left - o.offset().left - 1), 
userStripAccountDropdown.dropdownPositioned = !0;
}
}, userStripSearch = {
isIeQuirks:!1,
searchFld:null,
searchFldInput:null,
searchBtn:null,
searchOpen:!1,
clickEventName:"click",
init:function(o) {
"undefined" != typeof o && (userStripSearch.isIeQuirks = o), userStripSearch.searchFld = jQuery(".pk_strip_search_fld"), 
userStripSearch.searchFldInput = jQuery(".pk_strip_search_fld input"), userStripSearch.searchBtn = jQuery(".pk_strip_search_btn"), 
userStripSearch.searchFld.click(userStripSearch.searchFldClicked), userStripSearch.searchBtn.click(userStripSearch.searchBtnClicked), 
isIE && userStripSearch.extraInitForIe(), isIos && (userStripSearch.clickEventName = "touchend");
},
extraInitForIe:function() {
userStripSearch.searchFld.animate({
opacity:1,
width:11
}, function() {
userStripSearch.searchFld.animate({
opacity:0,
width:11
}, function() {
jQuery(".pk_strip_search").show();
});
});
},
searchFldClicked:function(o) {
o.stopPropagation();
},
searchBtnClicked:function(o) {
userStripSearch.searchOpen ? "" == trim(userStripSearch.searchFldInput.val()) ? userStripSearch.hideSearchFld() :jQuery("#searchSiteFrm").submit() :userStripSearch.showSearchFld(), 
o.stopPropagation();
},
showSearchFld:function() {
userStripSearch.isIeQuirks ? userStripSearch.searchFld.animate({
opacity:1,
width:156
}, 300) :userStripSearch.searchFld.animate({
opacity:1,
width:151
}, 300), userStripSearch.searchOpen = !0, userStripSearch.searchFldInput.focus(), 
jQuery("html").bind(userStripSearch.clickEventName, userStripSearch.hideSearchFld);
},
hideSearchFld:function() {
userStripSearch.searchFld.css({
opacity:0,
width:11
}), userStripSearch.searchOpen = !1, jQuery("html").unbind(userStripSearch.clickEventName, userStripSearch.hideSearchFld);
},
performSuperSearch:function(o, e, r) {
return o.query.value = trim(o.query.value), o.query.value.length < e ? (alert(r), 
!1) :!0;
}
}, userStripInfoPanelTooltip = {
sessionKey:null,
cookieName:null,
userStripInfoPanelMessage:null,
userStripInfoPanelMessageContent:null,
userStripInfoPanelMessageContentClass:null,
ieQuirks:!1,
init:function(o, e, r) {
userStripInfoPanelTooltip.sessionKey = o, userStripInfoPanelTooltip.cookieName = e, 
userStripInfoPanelTooltip.ieQuirks = r, userStripInfoPanelTooltip.userStripInfoPanelMessage = jQuery("#pk_user_strip_info_panel_message"), 
userStripInfoPanelTooltip.userStripInfoPanelMessageContent = jQuery("#pk_user_strip_info_panel_tooltip").html(), 
userStripInfoPanelTooltip.userStripInfoPanelMessageContentClass = jQuery("#pk_user_strip_info_panel_tooltip").attr("class");
},
closeBalloon:function(o) {
("undefined" == typeof o || null == o) && (o = !0), userStripInfoPanelTooltip.userStripInfoPanelMessage && (userStripInfoPanelTooltip.userStripInfoPanelMessage.hideBalloon(), 
userStripInfoPanelTooltip.sessionKey ? (dontShowAgainInSession(userStripInfoPanelTooltip.sessionKey, 1, currentUserAccountID, null, o), 
userStripInfoPanelTooltip.sessionKey = null) :userStripInfoPanelTooltip.cookieName && (dontShowAgain(userStripInfoPanelTooltip.cookieName, 1, currentUserAccountID, null, null, o), 
userStripInfoPanelTooltip.cookieName = null), jQuery(window).unbind("resize", userStripInfoPanelTooltip.innerShowBalloon), 
userStripInfoPanelTooltip.activateAutoShowBalloon());
},
showBalloon:function() {
userStripInfoPanelTooltip.innerShowBalloon(), jQuery(window).bind("resize", userStripInfoPanelTooltip.innerShowBalloon);
},
innerShowBalloon:function() {
userStripInfoPanelTooltip.userStripInfoPanelMessage.showBalloon({
position:"bottom",
container:"#pk_user_strip_info_panel_message",
contents:userStripInfoPanelTooltip.userStripInfoPanelMessageContent,
classname:userStripInfoPanelTooltip.userStripInfoPanelMessageContentClass,
ieQuirks:userStripInfoPanelTooltip.ieQuirks
});
},
activateAutoShowBalloon:function() {
userStripInfoPanelTooltip.userStripInfoPanelMessage.attr("onmouseover", null), userStripInfoPanelTooltip.userStripInfoPanelMessage.balloon({
position:"bottom",
contents:userStripInfoPanelTooltip.userStripInfoPanelMessageContent,
classname:userStripInfoPanelTooltip.userStripInfoPanelMessageContentClass,
ieQuirks:userStripInfoPanelTooltip.ieQuirks,
delay:200
});
}
};

if (window.jQuery) {
var accountIdElem = jQuery("#user_strip_account_drop_down_my_account_id");
accountIdElem && accountIdElem.balloon && accountIdElem.balloon({
position:"bottom",
offsetY:-10,
classname:"account_id_balloon_style",
delay:500
});
}
function disableCssButton(t) {
disableCssButtonObject(jQuery("#" + t));
}

function disableCssButtonObject(t) {
t.hasClass("css_button_disabled") || (t.addClass("css_button_disabled"), t.attr("disabled", "disabled"));
}

function enableCssButton(t) {
enableCssButtonObject(jQuery("#" + t));
}

function enableCssButtonObject(t) {
t.hasClass("css_button_disabled") && (t.removeClass("css_button_disabled"), t.removeAttr("disabled"));
}

function setCssButtonText(t, s) {
jQuery("#" + t).html(s);
}

function CssButton(t, s, i, n, e, l) {
this.id = t, this.text = n, this.style = s, this.color = i, this.href = e, this.onclick = l, 
this.tooltip = "", this.minWidth = null, this.setTooltip = function(t) {
this.tooltip = t;
}, this.setMinWidth = function(t) {
this.minWidth = t;
}, this.setCanBeDisabled = function(t) {
this.canBeDisabled = t;
}, this.render = function() {
var n = '<a id="' + t + '" class="css_button css_button_' + s + " css_button_" + i + '"';
return null != this.href && "" != this.href && (n += ' href="' + this.href + '"'), 
null != this.tooltip && "" != this.tooltip && (n += ' title="' + this.tooltip + '"'), 
null != this.minWidth && "" != this.minWidth && (n += ' style="min-width:' + this.minWidth + 'px;"'), 
null != this.onclick && "" != this.onclick && (n += ' onclick="' + this.onclick + ';"'), 
n += ">" + this.text + "</a>";
};
}
!function(e) {
e.PrefetchAssets = function(e, n) {
function t(n) {
for (var t = 0; t < n.length; t++) {
var o = e.createElement("link");
o.rel = "prefetch", o.dataset && (o.dataset.automations = "prefetch"), o.crossorigin = "anonymous", 
o.href = n[t], e.head.appendChild(o);
}
}
function o(e) {
var o = n(e.selectors);
o.on(e.events, function(e, n) {
return function o() {
n.off(e.events, o), t(e.links);
};
}(e, o));
}
e = e || document, n = n || jQuery, this.prefetch = function(e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.events ? o(r) :t(r.links);
}
};
};
}(window);
!function(e, t) {
"use strict";
function o(e) {
this.windowObj = e || t, this.getSuggestions = _.throttle(this._getSuggestions.bind(this), s);
}
var i = "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyB3ST7ubM5RvYAJIAVU9lkH7Spp12jHvt8", r = 2, s = 300, n = {
onWhite:"/FP/Assets/Images/Locations/powered_by_google_on_white.png",
"onWhite@2x":"/FP/Assets/Images/Locations/powered_by_google_on_white@2x.png",
onNonWhite:"/FP/Assets/Images/Locations/powered_by_google_on_non_white.png",
"onNonWhite@2x":"/FP/Assets/Images/Locations/powered_by_google_on_non_white@2x.png"
}, c = [ n ], a = {
resultsLimit:5
};
o.prototype.init = function() {
var e = new jQuery.Deferred();
return this.insertGoogleApiScriptDeferred = e, jQuery.getScript(i).done(function() {
e.resolve();
}).fail(function(o) {
e.reject("Error:" + o), t.writeActivityIndicator("locations.Autocomplete.GooglePlaces.ScriptLoadError", void 0, !0);
}), !0;
}, o.prototype.getPoweredByUrls = function() {
return c;
}, o.prototype._getSuggestions = function(e, o) {
o = o || {}, _.defaults(o, a);
var i = new jQuery.Deferred(), s = this;
return e && e.length >= r ? this.insertGoogleApiScriptDeferred ? this.insertGoogleApiScriptDeferred.promise().done(function() {
var t = s.windowObj, r = t.google;
if (!r || !r.maps || !r.maps.places) return void i.reject("Error: the namespace google.maps.places does not exist on the window.");
var n = new r.maps.places.AutocompleteService();
n.getPlacePredictions({
input:e,
types:[ "(regions)" ]
}, function(e, s) {
var n = [];
if (s === r.maps.places.PlacesServiceStatus.ZERO_RESULTS) i.resolve(n); else if (s === r.maps.places.PlacesServiceStatus.OK) {
var c = o.resultsLimit;
n = e.slice(0, c).map(function(e) {
return {
name:e.description,
extendedInfo:e
};
}), i.resolve(n);
} else i.reject("Error: failed to fetch suggestions for the given searchTerm. Returned status code: " + s), 
t.writeActivityIndicator("locations.Autocomplete.GooglePlaces.GotErrorFromApi", s, !0);
}), t.writeActivityIndicator("locations.Autocomplete.GooglePlaces.ApiCall", void 0, !0);
}).fail(i.reject) :(i.reject("Error: init() must be called before other API calls on this object."), 
t.writeActivityIndicator("locations.Autocomplete.GooglePlaces.GetSuggestionsCalledBeforeInit", void 0, !0)) :i.reject("Error: searchTerm must be a string with at least " + r + " characters."), 
i.promise();
};
var l = e.mhLocations = e.mhLocations || {};
l.LocationsGoogleFetcher = o;
}(window, window);
!function(e, r) {
"use strict";
function t(e, t) {
this.windowObj = e || r, this.individualId = t;
}
var i = 12, s = 2, o = {
resultsLimit:5
};
t.prototype.init = function() {
if (!this.individualId) return !1;
var e = this.windowObj, r = this, t = {
apiTypeID:i,
siteID:e.currentSiteId,
individualID:this.individualId,
accountID:e.currentUserAccountID,
displayLang:e.languageCode,
currentSiteID:e.currentSiteId
}, s = "/FP/API/Profile/get-profile-property.php?" + jQuery.param(t), o = new jQuery.Deferred();
return this.fetchPlacesDeferred = o, jQuery.ajax({
type:"GET",
url:s
}).done(function(e) {
var t = getProfilePropertyResponseTransformer.transformPropertyApiXmlResponseToArray(e);
r.places = t, r.lowercasePlaces = t.map(function(e) {
return e.toLowerCase();
}), o.resolve(t);
}).fail(function() {
o.reject("Error trying to fetch the list of places.");
}), !0;
}, t.prototype.updateAvailableLocations = function(e) {
var r = new jQuery.Deferred(), t = this;
return e && e.length >= s ? this.fetchPlacesDeferred ? this.fetchPlacesDeferred.promise().done(function() {
t.places.push(e), t.lowercasePlaces.push(e.toLowerCase()), r.resolve();
}).fail(r.reject) :r.reject("Error: init() must be called before other API calls on this object.") :r.reject("Error: searchTerm must be a string with at least " + s + " characters."), 
r.promise();
}, t.prototype.getPoweredByUrls = function() {
return [];
}, t.prototype.getSuggestions = function(e, r) {
r = r || {}, _.defaults(r, o);
var t = new jQuery.Deferred(), i = this;
if (e && e.length >= s) if (this.fetchPlacesDeferred) {
var a = e.toLowerCase();
this.fetchPlacesDeferred.promise().done(function() {
for (var e = r.resultsLimit, s = [], o = 0, n = i.lowercasePlaces.length; n > o && s.length < e; o++) i.lowercasePlaces[o].indexOf(a) >= 0 && s.push(o);
var c = s.map(function(e) {
return {
name:i.places[e]
};
});
t.resolve(c);
}).fail(t.reject);
} else t.reject("Error: init() must be called before other API calls on this object."); else t.reject("Error: searchTerm must be a string with at least " + s + " characters.");
return t.promise();
};
var a = e.mhLocations = e.mhLocations || {};
a.LocationsMyHeritageFetcher = t;
}(window, window);
!function(o, e) {
"use strict";
function n(o) {
this.windowObj = o || e;
}
var t = "Locations.Autocomplete.GooglePlaces.Exposure";
n.prototype.createLocationsSuggestionsManager = function(o) {
var e = this.windowObj, n = new e.mhLocations.LocationsMyHeritageFetcher(null, o), i = null;
e.features.exposureService.isFeatureEnabled(t) && (i = new e.mhLocations.LocationsGoogleFetcher());
var a = new e.mhLocations.LocationsSuggestionsManager(n, i);
return a;
};
var i = o.mhLocations = o.mhLocations || {};
i.LocationsSuggestionsFactory = n;
}(window, window);
!function(e) {
"use strict";
function t(e, t) {
this.myHeritageFetcher = e, this.otherFetcher = t, this.initialized = !1;
}
var r = 2, i = {
resultsLimit:5
};
t.prototype.init = function() {
if (this.initialized === !0) return !0;
var e;
return e = this.myHeritageFetcher.init(), e === !1 ? (this.myHeritageFetcherError = !0, 
!1) :(this.initialized = !0, this.otherFetcher ? e = this.otherFetcher.init() :!0);
}, t.prototype.updateAvailableLocations = function(e) {
var t = new jQuery.Deferred();
return this.myHeritageFetcherError === !0 ? (t.reject("Error: The MyHeritage fetcher object could not be initialized, and therefore we cannot perform locations autocomplete."), 
t.promise()) :(e && e.length >= r ? this.myHeritageFetcher.updateAvailableLocations(e).done(t.resolve).fail(t.reject) :t.reject("Error: searchTerm must be a string with at least " + r + " characters."), 
t.promise());
}, t.prototype.getPoweredByUrls = function() {
var e = this.myHeritageFetcher.getPoweredByUrls();
return this.otherFetcher && (e = e.concat(this.otherFetcher.getPoweredByUrls())), 
e;
}, t.prototype.getSuggestions = function(e, t) {
t = t || {}, _.defaults(t, i);
var o = new jQuery.Deferred(), n = this;
return this.myHeritageFetcherError === !0 ? (o.reject("Error: The MyHeritage fetcher object could not be initialized, and therefore we cannot perform locations autocomplete."), 
o.promise()) :(e && e.length >= r ? this.myHeritageFetcher.getSuggestions(e, t).done(function(r) {
function i() {
r = r.slice(0, t.resultsLimit), o.resolve(r);
}
return r.length >= t.resultsLimit || !n.otherFetcher ? i() :void n.otherFetcher.getSuggestions(e, t).done(function(e) {
var t = _.pluck(r, "name");
e.forEach(function(e) {
t.indexOf(e.name) < 0 && r.push(e);
}), i();
}).fail(function() {
i();
});
}).fail(o.reject) :o.reject("Error: searchTerm must be a string with at least " + r + " characters."), 
o.promise());
};
var o = e.mhLocations = e.mhLocations || {};
o.LocationsSuggestionsManager = t;
}(window);
!function(t) {
"use strict";
t.NotificationTooltip = function(t) {
function i() {
t.setTimeout(function() {
a.find(".close").hide();
}, 500);
}
function n() {
s.showBalloon(c);
}
function o() {
var t = {};
jQuery.extend(t, c, {
delay:200
}), s.balloon(t);
}
var e, a, s, c = {}, r = this;
this.close = function() {
var n = a.data("dsa-key");
t.dontShowAgainInSession(n, 1, e), s && (s.hideBalloon(), i(), o());
}, this.setHitArea = function(t, e, r) {
s = t, jQuery.extend(c, e);
var u = a.data("dsa");
0 != u || r ? (i(), o()) :n();
}, this.init = function(t, i, n) {
e = t, a = i, a.find(".close").click(r.close), jQuery.extend(c, {
contents:i
}, n);
};
}, t.NotificationPanel = function(t) {
function i() {
var i = o.data("dsa-key"), e = o.data("severity");
e == s.SEVERITY_WARNING ? t.dontShowAgain(i, 1, n) :(e == s.SEVERITY_SEVERE_WARNING || e == s.SEVERITY_RECURRING_WARNING) && t.dontShowAgainInSession(i, 1, n), 
o.slideUp(500), a && a.onNotificationPanelClose();
}
var n, o, e, a, s = this;
this.SEVERITY_WARNING = 1, this.SEVERITY_SEVERE_WARNING = 2, this.SEVERITY_RECURRING_WARNING = 3, 
this.setNotificationManager = function(t) {
a = t;
}, this.getTooltipHitArea = function() {
return e;
}, this.init = function(t, a, s) {
n = t, o = a, e = s, o.find(".close").click(i);
};
}, t.UserStripNotification = function() {
var t, i, n, o, e = null, a = null;
this.getTooltipHitArea = function() {
return i;
}, this.notify = function() {
t.fadeIn(500);
}, this.getMessage = function() {
return null === e && (e = n ? n.html() :""), e;
}, this.getActions = function() {
return null === a && (a = o ? o.html() :""), a;
}, this.init = function(e, a, s, c) {
t = e, i = a, n = s, o = c;
};
}, t.NotificationManager = function(t) {
function i() {
o.setHitArea(e.getTooltipHitArea(), a);
}
function n() {
r.notify(), o.setHitArea(r.getTooltipHitArea(), u, !0);
}
var o, e, a, s, c, r, u, f, l = this;
this.setNotificationTooltip = function(t) {
o = t;
}, this.setNotificationPanel = function(t, i, n, o) {
e = t, e.setNotificationManager(l), a = i, s = n, c = o, s.addClass(c);
}, this.setUserStripNotification = function(t, i) {
r = t, u = i;
}, this.setDockedNavigation = function(t) {
f = t;
}, this.notify = function() {
o && (e ? i() :r && n());
}, this.onNotificationPanelClose = function() {
o.close(), t.setTimeout(function() {
n(), f.reset(), s && s.removeClass(c);
}, 800);
};
}, t.NotificationModals = function(t) {
this.openExportGedcomModal = function(i, n, o) {
this.reportGoal(n, o), t.openNewPopup("/FP/Library/ExportGedcomPopup/ExportGedcomPopup.php", "&s=" + i), 
t.writeActivityIndicator("revenues3.menuExportTreeClick");
}, this.openDowngradeSiteModal = function(i, n, o) {
this.reportGoal(n, o), t.openNewPopup("/FP/Library/SiteExpiration/SiteExpirationPopup.php", "&s=" + i), 
t.writeActivityIndicator("revenues3.menuDowngradeSiteClick");
}, this.handleExtendModalAction = function(i, n, o) {
this.reportGoal(i, n), window.writeActivityIndicator("revenues3.menuExtendSiteClick"), 
t.location.href = o;
}, this.reportGoal = function(i, n) {
if (t.FeatureExposureService) {
var o = new t.FeatureExposureService();
o.logExperimentActivity(i, n);
}
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(e) {
"use strict";
e.UserStripSitesDropDown = function() {
function e(e) {
return o || t(), u ? i() :n(), e.stopPropagation(), e.preventDefault(), !1;
}
function t() {
jQuery.ajax({
url:f.dataUrl,
dataType:"json",
data:{
s:a
},
success:function(e) {
o = !0;
var t = s;
"undefined" != typeof f.$userStripSiteLinksContainer && (t = f.$userStripSiteLinksContainer), 
"undefined" != typeof e.data && (t.html(e.data), "undefined" != typeof f.$userStripSitePreloader && f.$userStripSitePreloader.hide(), 
t.show());
}
});
}
function n() {
s.show(), l.attr("aria-expanded", !0), "undefined" != typeof f.rolloverClass && l.addClass(f.rolloverClass);
var e = jQuery("html");
e.trigger(new jQuery.Event({
type:"click"
})), e.on("click", r), u = !0;
}
function i() {
s.hide(), l.attr("aria-expanded", !1), "undefined" != typeof f.rolloverClass && l.removeClass(f.rolloverClass), 
jQuery("html").off("click", r), u = !1;
}
function r() {
i();
}
var a = null, o = !1, l = null, s = null, u = !1, d = null, f = {
dataUrl:"/FP/API/MySites/get-user-strip-site-links.php"
};
this.init = function(t, n, i, r) {
a = t, l = n, s = i, jQuery.extend(f, r), l.click(e), s.css("margin-top", l.outerHeight());
}, this.getMenuTitle = function() {
return null === d && (d = l ? l.html() :""), d;
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(e) {
"use strict";
e.UserStripSitesMatches = function() {
function e(e, t, i) {
"undefined" == typeof e && (e = n), "undefined" == typeof t && (t = s);
var a = {
s:e,
lang:t
};
if (i) for (var r in i) i.hasOwnProperty(r) && (a[r] = i[r]);
jQuery.ajax({
url:[ "", "FP", "API", "Navbar", "get-is-member-eligible.php" ].join("/"),
data:a,
dataType:"json",
type:"GET",
success:function(e) {
if ("success" == e.status) {
var t = e.data;
t.is_eligible ? window.writeRedirectActivity("userStrip.dnaMatchesButtonClicked", void 0, t.page_url) :MH_Error({
title:t.title,
message:t.message,
messageIsHTML:!0
});
}
}
});
}
var t = 4, i = 10, n = null, s = null;
this.init = function(a, r, c) {
n = a, s = r;
var o = document.getElementsByClassName(c);
o && o.length > 0 && (o = o[0], o.classList.contains("user_strip_matches_dna_has_kits") ? o.addEventListener("click", function() {
e(currentSiteId, languageCode, {
service_id:t,
sort:"creation_time"
});
}) :o.addEventListener("click", function() {
e(currentSiteId, languageCode, {
service_id:i
});
}));
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(n) {
"use strict";
n.DropDownMenu = function() {
function n(n) {
o ? i() :t(), n.stopPropagation(), n.preventDefault();
}
function t() {
l.show(), u.attr("aria-expanded", !0);
var n = jQuery("html");
n.trigger("click"), n.on("click", e), o = !0;
}
function i() {
l.hide(), u.attr("aria-expanded", !1), jQuery("html").off("click", e), o = !1;
}
function e() {
i();
}
var u = null, l = null, o = !1, r = null, c = null;
this.init = function(t, i) {
u = t, l = i, u.click(n);
}, this.getMenuTitle = function() {
return null === r && (r = u ? u.html() :""), r;
}, this.getMenuLinks = function() {
return null === c && (c = l ? l.html() :""), jQuery.Deferred().resolve(c);
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(e) {
"use strict";
e.DockedElement = function() {
function e() {
var e = 0;
null !== c && (e = 0 - c.getStackedHeight()), d = i.offset().top + e;
}
function t() {
var e = n.scrollTop();
e > d ? (o.addClass("docked"), o.trigger("docking"), null !== c && c.dockedAboveAnotherElement()) :(o.removeClass("docked"), 
o.trigger("undocking"), null !== c && c.removedDockingAboveAnotherElement());
}
var n, o, i, c, d, l;
this.reset = function() {
e();
}, this.getStackedHeight = function() {
var e = 0;
return i && (e = i.height()), null === c ? e :c ? e + c.getStackedHeight :e;
}, this.dockedAboveAnotherElement = function() {
o && o.addClass("docked_above");
}, this.removedDockingAboveAnotherElement = function() {
o && o.removeClass("docked_above");
}, this.isDockable = function() {
return l;
}, this.deactivate = function() {
n.off("scroll", t);
}, this.init = function(d, r, s, a) {
c = a || null, n = jQuery(window), o = d, i = r, l = s, null !== c && o.css("top", c.getStackedHeight() + "px"), 
e(), l && (t(), n.on("scroll", t));
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(e) {
"use strict";
e.Tabs = function() {
function e() {
r.find("#tab_sub_menu_item_99990").on("click", function(e) {
e.stopPropagation(), e.preventDefault(), jQuery(this).addClass("active"), writeActivityIndicator(e.currentTarget.dataset.activity, "", !0);
});
}
function n() {
r.find("#tab_sub_menu_item_99990").removeClass("active");
}
function t() {
jQuery(window).on("scroll", o), c = setTimeout(function(e) {
r.addClass("on");
}, 150);
}
function o() {
jQuery(window).off("scroll", o), clearTimeout(c), r.removeClass("on"), n();
}
function i(e) {
jQuery(e.originalEvent.target).is("#masterPageHeader .tabs .open *") || (r.removeClass("tap"), 
r.find(".tab_container").removeClass("open"), jQuery(window).off(isIos ? "touchend" :"click", i));
}
function a(e, n) {
l ? !e.hasClass("open") && e.find(".sub_menu").length > 0 && (r.addClass("tap"), 
r.find(".tab_container").removeClass("open"), e.addClass("open"), n.preventDefault(), 
n.stopImmediatePropagation()) :(e.hasClass("open") ? (r.removeClass("tap"), e.removeClass("open")) :(r.addClass("tap"), 
r.find(".tab_container").removeClass("open"), e.addClass("open"), e.offset().top < 0 && e[0].scrollIntoView()), 
n.stopImmediatePropagation(), n.preventDefault()), u || jQuery(window).on(isIos ? "touchend" :"click", i);
}
function s(e, n) {
function t(e) {
var t = e.parent();
return t.hasClass(n) || (t = t.parent()), t;
}
var o;
e.focus(function() {
o = t(jQuery(this)), o.addClass("focused");
}).blur(function() {
var e = this;
o = null, setTimeout(function() {
var n = t(jQuery(e));
o && n[0] === o[0] || n.removeClass("focused");
});
}).click(function() {
e.blur();
});
}
var r, c, u, l;
this.init = function(n) {
r = n, u = r.is(".mh_mobile.mh_responsive *"), l = r.is(".mh_mobile:not(.mh_responsive) *"), 
n.is(".mh_desktop *") ? (n.mouseenter(t).mouseleave(o).focusin(t), n.find(".tab_container").mouseenter(function() {
jQuery(this).addClass("open");
}).mouseleave(function() {
jQuery(this).removeClass("open");
}), s(n.find(".tab_container a"), "tab_container")) :l ? n.find(".tab").each(function() {
var e = jQuery(this);
e.click(function(e) {
a(jQuery(this).parents(".tab_container"), e);
});
}) :n.find(".arrow").click(function(e) {
a(jQuery(this).parents(".tab_container"), e);
});
for (var i in window.navigationClickHandlers) n.find("#nav_tab_" + i + ", #tab_sub_menu_item_" + i).click(function(e) {
var n = this.dataset.menuItemId;
e.preventDefault(), e.stopPropagation(), window.navigationClickHandlers[n]();
});
e();
};
}, e.DockedElement = function() {
function e() {
var e = 0;
null !== a && (e = 0 - a.getStackedHeight()), s = i.offset().top + e;
}
function n() {
var e = t.scrollTop();
e > s ? (o.addClass("docked"), o.trigger("docking"), null !== a && a.dockedAboveAnotherElement()) :(o.removeClass("docked"), 
o.trigger("undocking"), null !== a && a.removedDockingAboveAnotherElement());
}
var t, o, i, a, s, r;
this.reset = function() {
e();
}, this.getStackedHeight = function() {
var e = 0;
return i && (e = i.height()), null === a ? e :a ? e + a.getStackedHeight :e;
}, this.dockedAboveAnotherElement = function() {
o && o.addClass("docked_above");
}, this.removedDockingAboveAnotherElement = function() {
o && o.removeClass("docked_above");
}, this.isDockable = function() {
return r;
}, this.deactivate = function() {
t.off("scroll", n);
}, this.init = function(s, c, u, l) {
a = l || null, t = jQuery(window), o = s, i = c, r = u, null !== a && o.css("top", a.getStackedHeight() + "px"), 
e(), r && (n(), t.on("scroll", n));
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(e) {
"use strict";
e.PageHeader = function(e) {
var t = e.navigateWrapper, i = e.prev, a = e.next;
this.changeTitle = function(t, i) {
var a = jQuery(e.title);
if (i) {
var n = jQuery(document.createElement("span")).html(t), r = n.contents().first();
r.replaceWith(r.wrap('<a href="' + i + '">')), a.empty().append(n);
} else a.html(t);
}, this.hide = function() {
jQuery(e.pageHeaderContainer).hide();
}, this.show = function() {
jQuery(e.pageHeaderContainer).show();
}, this.setBreadCrumbs = function(t) {
if (t && t.length > 0) {
for (var i, a = jQuery('<ol class="breadcrumb"></ol>'), n = 0; n < t.length; n++) {
if (i = t[n].single ? jQuery('<li class="single"></li>') :jQuery("<li></li>"), t[n].link) i.html('<a href="' + t[n].link + '" title="' + t[n].text + '"><bdi>' + t[n].text + "</bdi></a>"); else if (t[n].click) {
var r = jQuery('<a title="' + t[n].text + '"><bdi>' + t[n].text + "</bdi></a>");
r.click(t[n].click), i.append(r);
} else i.html("<bdi>" + t[n].text + "</bdi>");
a.append(i);
}
jQuery(e.breadcrumbs).html(a);
} else jQuery(e.breadcrumbs).html("");
}, this.setPrevNextNavigationText = function(e, t) {
i.html("<span>" + e + "</span>"), a.html("<span>" + t + "</span>");
}, this.setPrevNextNavigation = function(e, n) {
i.off("click"), e ? (t.addClass("has_prev"), i.click(e)) :t.removeClass("has_prev"), 
a.off("click"), n ? (t.addClass("has_next"), a.click(n)) :t.removeClass("has_next");
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(t) {
"use strict";
t.MobileHeader = function() {
function t(t) {
return f[t] = f[t] || jQuery(t), f[t];
}
function i() {
o.toggleClass("pushed");
var t = s.isIos ? "touchend" :"click";
o.hasClass("pushed") ? e.on(t, n) :e.off(t, n);
}
function n(t) {
t && t.originalEvent && ("LTR" == s.dir && t.originalEvent.pageX > a.outerWidth() || "RTL" == s.dir && t.originalEvent.pageX < a.offset().left) && i();
}
var e, o, a, s, l, u, r, c, f;
this.init = function(t, n, d, p, v, h, g, P, m) {
e = t, o = n, a = d, s = v, l = h, u = g, r = P, c = m, f = [], p.click(function(t) {
i(), t.stopPropagation(), t.preventDefault();
}), s.isIos && p.on("touchend", function(t) {
t.stopPropagation();
});
}, this.setToolbar = function(i) {
var n = t(l);
n.addClass("hidden").removeClass("visible"), jQuery.isPlainObject(i) && jQuery.each(i, function(i, n) {
var e = t(u + i);
e.off("click"), n && e.on("click", n), e.removeClass("hidden").addClass("visible");
});
}, this.setPageTitle = function(i) {
var n = t(r);
n.html(i);
}, this.removePageTitlePopupInfo = function() {
var i = t(c);
i.remove();
}, this.setPageTitlePopupInfo = function(i) {
var n = t(r), e = '<a class="title_info_button" data-title="' + i.popup_title + '" data-text="' + i.popup_text + '"></a>';
n.append(e);
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(n) {
"use strict";
n.PageHeaderPopupInfo = function(n) {
this.init = function(o) {
function i(o) {
"function" == typeof n.openNewPopup && e && n.openNewPopup(e), o.preventDefault();
}
var t = jQuery(o), e = t.data("url");
e && t.on("click", i);
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(e) {
"use strict";
e.MobileLanguageSelector = function() {
function e() {
var e = jQuery.Deferred();
return jQuery.ajax({
url:[ "", "FP", "API", "Languages", "get-language-list-html.php" ].join("/"),
type:"GET",
data:{
lang:n
},
dataType:"json",
success:function(n) {
return "success" != n.status ? e.reject() :void e.resolve(n.data.html);
},
error:function() {
return e.reject();
}
}), e;
}
var n, t = null, u = null, r = null;
this.init = function(e, u) {
t = e, n = u;
}, this.getMenuTitle = function() {
return null === u && (u = t ? t.html() :""), u;
}, this.getMenuLinks = function() {
var n = jQuery.Deferred();
return null === r ? e().then(function(e) {
r = e, n.resolve(r);
}, function() {
r = "", n.resolve(r);
}) :n.resolve(r), n;
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(e) {
"use strict";
e.MobileMenu = function() {
function e(e) {
var n = jQuery.Deferred();
return e.getMenuLinks().then(function(t) {
u.empty().append(e.getMenuTitle()), a.empty().append(t), n.resolve();
}), n;
}
function n() {
o.addClass("pushed"), jQuery(".mobile_header_sites_menu")[0].scrollIntoView();
var e = o.offset().top;
0 > e && o.parent()[0].scrollIntoView();
}
function t(e) {
o.removeClass("pushed"), e.stopPropagation(), e.preventDefault();
}
function i(t, i) {
e(t).then(function() {
n();
}), i.stopPropagation(), i.preventDefault();
}
var o, u, a;
this.init = function(e, n, i, s) {
o = e, u = i, a = s, n.click(t);
}, this.addMenuItem = function(e, n) {
e.append(n.getMenuTitle()), e.hasClass("off") || e.click(function(e) {
i(n, e);
});
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(i) {
"use strict";
i.MobileNotifications = function() {
var i, t;
this.init = function(n, o) {
i = n, t = o;
}, this.setNotification = function(n) {
i.append(n.getMessage()), t.append(n.getActions());
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(t) {
"use strict";
t.MobileSubscribe = function() {
var t, i;
this.isEnabled = function() {
return features.exposureService.isFeatureEnabled("Navigation.MobileWeb.ShowGoPremiumButton.Exposure");
}, this.init = function(n, e) {
t = n, i = e, t.addClass("visible-xs"), i.length > 0 && t.html(i[0].outerHTML);
}, this.setButton = function(t) {
i.addClass(t);
}, this.setSubscribeButton = function(t) {
i = t;
}, this.updateUpgradePlanABTestVariant = function() {
i.attr("onclick", function(t, i) {
return i ? i.replace(/&reason=\d+/, "&reason=139") :i;
});
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(o) {
"use strict";
o.MasterPage = function() {
var o;
this.init = function(i) {
i && i.wrapper && (o = i.wrapper);
}, this.showFooter = function() {
o && jQuery(o).removeClass("footer_off");
}, this.hideFooter = function() {
o && jQuery(o).addClass("footer_off");
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function(o) {
"use strict";
o.Footer = function() {
this.init = function(o, i) {
var n = null;
jQuery(".footer_link#SignUp").on("click", function(o) {
var i = jQuery("#footer_new").data("treeWizardUrl");
window.successfulSignupCallback = function(o) {
window.successfulSignupCallback = void 0, window.location.href = i.replace("site_id", o);
};
var n = {
flavor:"noPasswordConfirmationSignup",
signupReason:"footer",
popupType:"signupOnly",
createTreeOnSignup:!0,
destinationURLToPaywall:!1,
should_redirect_to_magic7:!0
};
window.openSignupPopup(languageCode, n);
}), o.loginLink && o.loginLink.length > 0 && o.loginLink.on("click", function(o) {
logIn(), o.stopPropagation();
}), o.signupLink && o.signupLink.length > 0 && o.signupLink.on("click", function(o) {
signupFromCompanyHome(), o.stopPropagation();
}), i && i.hover(function() {
clearTimeout(n), n = setTimeout(function() {
if (!i.hasClass("footer_active")) {
var o = i.position().top;
i.css({
top:"auto"
});
var n = i.position().top;
i.css({
top:o + "px"
}), i[0].offsetTop, i.css({
top:n - 40 + "px"
}), i.addClass("footer_active");
}
}, 200);
}, function() {
clearTimeout(n), n = setTimeout(function() {
if (i.hasClass("footer_active")) {
i.css({
transition:"initial"
}), i.css({
top:"auto"
});
var o = i.position().top;
i.css({
top:"calc(100% - 45px)"
});
var n = i.position().top;
i.css({
top:o + "px"
}), i[0].offsetTop, i.css({
transition:"all 0.2s"
}), i.css({
top:n + "px"
}), i.css({
top:"calc(100% - 45px)"
}), i.removeClass("footer_active");
}
}, 200);
});
};
};
}(window.mhNavigation = window.mhNavigation || {});
!function() {
"use strict";
if ("undefined" != typeof jQuery) {
var n = window.mhNavigation, o = new n.Footer(), e = jQuery("#pk_master_footer_container");
e.hasClass("sliding_footer") || (e = null), jQuery("#footer_new").on("click", "ul.footer_links_container > li a[role=footerItem]", function(n) {
googleAnalyticsTracking.trackEvent("Footer Clicks", "Footer link click", n.currentTarget.id, null, null, "GTM event To GA");
}), o.init({
loginLink:jQuery("#LoginLink"),
signupLink:jQuery("#sign_up_footer_link")
}, e);
}
}();
!function(n) {
"use strict";
var o = 9, i = 27, t = "tab_focus";
n.Highlighter = function() {
function n() {
a.on("keyup", u);
}
function u(n) {
n.which === o && (f(), a.off("keyup", u));
}
function e(n) {
n.which === i && (s.activeElement.blur(), c());
}
function f() {
a.addClass(t), a.on("mousemove", c), a.on("keyup", e);
}
function c() {
a.off("mousemove", c), a.off("keyup", e), a.removeClass(t), n();
}
var a, s;
this.init = function(o, i) {
a = o, s = i, n();
};
};
}(window.mhNavigation = window.mhNavigation || {});
var currentUserAccountID = currentUserAccountID || null, currentSiteId = currentSiteId || null;

"undefined" != typeof jQuery && !function() {
"use strict";
var e = window.mhNavigation;
if (currentUserAccountID && currentSiteId) {
var i = e.objects = {}, n = new e.NotificationTooltip(window), t = new e.NotificationPanel(window), a = new e.UserStripNotification(), r = new e.MobileSubscribe(), o = new e.NotificationManager(window), u = {
matches:new e.UserStripSitesMatches(),
sitesDropDown:new e.UserStripSitesDropDown(),
accountMenu:new e.DropDownMenu(),
helpMenu:new e.DropDownMenu(),
notificationMenu:new e.DropDownMenu()
}, c = new e.Tabs();
i.dockedNavigation = new e.DockedElement(), o.setDockedNavigation(i.dockedNavigation);
var s = new e.Highlighter();
i.pageHeader = new e.PageHeader({
pageHeaderContainer:"#masterPageHeader .page_header_container",
title:"#masterPageHeader .page_header .title",
breadcrumbs:"#masterPageHeader .page_header .breadcrumbs",
navigateWrapper:jQuery(".navigate_wrapper"),
prev:jQuery(".navigate_wrapper .prev"),
next:jQuery(".navigate_wrapper .next")
});
var l = new e.PageHeaderPopupInfo(window);
l.init("#masterPageHeader .page_header .title_info_button"), i.masterPage = new e.MasterPage(), 
i.masterPage.init({
wrapper:"#pk_master_wrapper"
}), i.mobileHeader = new e.MobileHeader();
var d = new e.MobileMenu(), _ = new e.MobileLanguageSelector(), g = new e.MobileNotifications(), p = new e.PageHeaderPopupInfo(window);
p.init("#masterPageHeader .mobile_header .title_info_button"), jQuery(function() {
function e(e, i) {
var n = e.dataset.href, t = e.getAttribute("href");
return i ? i.search("MoreButton") > -1 ? !1 :n ? (writeActivityIndicator(i, "", !0), 
window.open(n), !1) :t && "#" !== t[0] && !e.dataset.menuItemId ? writeRedirectActivity(i, "", t) :(writeActivityIndicator(i, "", !0), 
!1) :void 0;
}
var l = jQuery(".navigation_header .notification_tooltip");
l.length > 0 && (n.init(currentUserAccountID, l, {
classname:"balloonStyle notification_tooltip"
}), o.setNotificationTooltip(n));
var p = jQuery(".navigation_header .notification_panel");
if (p.length > 0) {
t.init(currentUserAccountID, p, p.find(".tooltip_hit_area")), o.setNotificationPanel(t, {
position:"bottom",
offsetY:7
}, jQuery(document.body), "notification_panel_on");
var m = jQuery(".notification_panel .account_menu_links");
m.length > 0 && u.notificationMenu.init(jQuery(".notification_panel .account_menu"), m);
}
var v = jQuery(".navigation_header .user_strip_notification");
v.length > 0 && (a.init(v, v.find(".tooltip_hit_area"), v.find(".notification"), v.find(".actions")), 
o.setUserStripNotification(a, {
position:"bottom",
offsetY:7
})), o.notify(), s.init(jQuery(document.body), document), u.matches.init(currentSiteId, languageCode, "user_strip_matches_dna"), 
u.sitesDropDown.init(currentSiteId, jQuery("#user_strip_sites_drop_down"), jQuery(".user_strip_sites_drop_down"), {
$userStripSiteLinksContainer:jQuery("#user_strip_site_links"),
$userStripSitePreloader:jQuery("#user_strip_sites_preloader")
}), u.accountMenu.init(jQuery(".user_strip_account_menu .account_menu"), jQuery(".user_strip_account_menu .account_menu_links")), 
u.helpMenu.init(jQuery(".user_strip_help_menu .account_menu"), jQuery(".user_strip_help_menu .account_menu_links"));
var w = jQuery(".navigation_header");
w.length > 0 && (c.init(w.find("ul.tabs")), i.dockedNavigation.init(w, w.find(".navigation_container"), w.hasClass("dockable"))), 
i.mobileHeader.init(jQuery(window), jQuery(document.body), jQuery(".navigation_container"), jQuery(".mobile_header .hamburger"), {
isIos:isIos,
dir:languageDirection
}, ".toolbar_container > [class^=toolbar_]", ".toolbar_", ".page_title .inner_text", ".page_title .title_info_button");
var f = jQuery(".navigation_container .mobile_header_menu_links");
d.init(f, f.find(".back_button a"), f.find(".title"), f.find(".link_list"));
var b = jQuery(".navigation_container .mobile_header_sites_menu");
b.length > 0 && d.addMenuItem(b.find(".sites_menu"), u.sitesDropDown);
var h = jQuery(".navigation_container .mobile_header_account_menu");
h.length > 0 && d.addMenuItem(h.find(".account_menu"), u.accountMenu);
var y = jQuery(".navigation_container .mobile_header_help_menu");
y.length > 0 && d.addMenuItem(y.find(".help_menu"), u.helpMenu), _.init(jQuery("#user_strip_language_picker"), languageCode || "EN"), 
d.addMenuItem(jQuery(".navigation_container .mobile_header_language_menu .language_menu"), _);
var j = jQuery(".navigation_container .mobile_header_notifications");
g.init(j.find(".message"), j.find(".actions")), g.setNotification(a);
var Q = jQuery("#go_premium").not(".footer_upgrade_button");
if (Q) {
var M = Q.clone().attr("id", "go_premium_mobile");
if (M.length > 0 && "classList" in M[0] && 3 in M[0].classList) {
var k = M[0].classList[3], I = k + "_mobile", D = new RegExp(k);
M[0].children.length > 0 && M[0].children[0].innerHTML.search(D) && (M[0].children[0].innerHTML = M[0].children[0].innerHTML.replace(k, I)), 
"value" in M[0].classList && M[0].classList.value.search(D) && (M[0].classList.value = M[0].classList.value.replace(k, I));
}
r.init(jQuery(".mobile_subscribe"), M);
}
r.setSubscribeButton(jQuery("#go_premium_mobile")), r.setButton("css_button_big"), 
r.updateUpgradePlanABTestVariant(), jQuery("body").on("click", ".help-links > a.link", function(i) {
var n = i.currentTarget, t = n.dataset.activity, a = t ? "UserStrip." + t + ".Click" :void 0;
return e(n, a);
}), w.find("ul.tabs > li a[role=menuitem]").click(function(i) {
googleAnalyticsTracking.trackEvent("Navigation Clicks", "main navigation selection", null, null, null, "GTM event To GA");
var n = i.currentTarget, t = n.dataset.activity, a = t ? "NavigationMenu." + t + ".Click" :void 0;
return e(n, a);
}), jQuery("body").on("click", ".js_dna_order", function() {
var e = "Plans.NewNavigationOrderDNA.Click";
window.writeActivityIndicator(e, void 0, void 0, void 0, "NewFooterStatisticsService");
var i = 15;
return window.navigateIfEligible(i, currentSiteId), !1;
});
});
}
}();
function navigateToPageIfEligible(e, i, a, g) {
"undefined" == typeof i && (i = currentSiteId), "undefined" == typeof a && (a = languageCode);
var t = {
s:i,
lang:a
};
if (g) for (var l in g) g.hasOwnProperty(l) && (t[l] = g[l]);
jQuery.ajax({
url:e,
data:t,
dataType:"json",
type:"GET",
success:function(e) {
if ("success" == e.status) {
var i = e.data;
i.is_eligible ? document.location.href = i.page_url :MH_Error({
title:i.title,
message:i.message,
messageIsHTML:!0
});
}
}
});
}

function navigateToInviteMembersPageIfEligible(e, i) {
navigateToPageIfEligible([ "", "FP", "API", "Members", "get-is-member-eligible-to-invite-members.php" ].join("/"), e, i);
}

function navigateToHealthTreeIfEligible(e, i) {
navigateToPageIfEligible([ "", "FP", "API", "Health", "get-is-member-eligible-to-health-tree.php" ].join("/"), e, i);
}

function navigateToSurveyHubPageIfEligible(e, i) {
navigateToPageIfEligible([ "", "FP", "API", "Surveys", "get-is-eligible-for-survey-hub-app.php" ].join("/"), e, i);
}

function navigateIfEligible(e, i, a, g) {
g || (g = {}), g.service_id = e, navigateToPageIfEligible([ "", "FP", "API", "Navbar", "get-is-member-eligible.php" ].join("/"), i, a, g);
}

window.navigateToSurveyHubPageIfEligibleHelper = navigateToSurveyHubPageIfEligible, 
window.navigateToInviteMembersPageIfEligibleTestHelper = navigateToInviteMembersPageIfEligible, 
window.navigateToPageIfEligibleTestHelper = navigateToPageIfEligible;
!function() {
function e(t) {
var i = e.modules[t];
if (!i) throw new Error('failed to require "' + t + '"');
return "exports" in i || "function" != typeof i.definition || (i.client = i.component = !0, 
i.definition.call(this, i.exports = {}, i), delete i.definition), i.exports;
}
e.modules = {}, e.register = function(t, i) {
e.modules[t] = {
definition:i
};
}, e.define = function(t, i) {
e.modules[t] = {
exports:i
};
}, e.register("component~emitter@1.1.2", function(e, t) {
function i(e) {
return e ? n(e) :void 0;
}
function n(e) {
for (var t in i.prototype) e[t] = i.prototype[t];
return e;
}
t.exports = i, i.prototype.on = i.prototype.addEventListener = function(e, t) {
return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), 
this;
}, i.prototype.once = function(e, t) {
function i() {
n.off(e, i), t.apply(this, arguments);
}
var n = this;
return this._callbacks = this._callbacks || {}, i.fn = t, this.on(e, i), this;
}, i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function(e, t) {
if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
this;
var i = this._callbacks[e];
if (!i) return this;
if (1 == arguments.length) return delete this._callbacks[e], this;
for (var n, s = 0; s < i.length; s++) if (n = i[s], n === t || n.fn === t) {
i.splice(s, 1);
break;
}
return this;
}, i.prototype.emit = function(e) {
this._callbacks = this._callbacks || {};
var t = [].slice.call(arguments, 1), i = this._callbacks[e];
if (i) {
i = i.slice(0);
for (var n = 0, s = i.length; s > n; ++n) i[n].apply(this, t);
}
return this;
}, i.prototype.listeners = function(e) {
return this._callbacks = this._callbacks || {}, this._callbacks[e] || [];
}, i.prototype.hasListeners = function(e) {
return !!this.listeners(e).length;
};
}), e.register("dropzone", function(t, i) {
i.exports = e("dropzone/lib/dropzone.js");
}), e.register("dropzone/lib/dropzone.js", function(t, i) {
(function() {
var t, n, s, r, o, l, a, u, p = {}.hasOwnProperty, d = function(e, t) {
function i() {
this.constructor = e;
}
for (var n in t) p.call(t, n) && (e[n] = t[n]);
return i.prototype = t.prototype, e.prototype = new i(), e.__super__ = t.prototype, 
e;
}, c = [].slice;
n = "undefined" != typeof Emitter && null !== Emitter ? Emitter :e("component~emitter@1.1.2"), 
a = function() {}, t = function(e) {
function t(e, n) {
var s, r, o;
if (this.element = e, this.version = t.version, this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""), 
this.clickableElements = [], this.listeners = [], this.files = [], "string" == typeof this.element && (this.element = document.querySelector(this.element)), 
!this.element || null == this.element.nodeType) throw new Error("Invalid dropzone element.");
if (this.element.dropzone) throw new Error("Dropzone already attached.");
if (t.instances.push(this), this.element.dropzone = this, s = null != (o = t.optionsForElement(this.element)) ? o :{}, 
this.options = i({}, this.defaultOptions, s, null != n ? n :{}), this.options.forceFallback || !t.isBrowserSupported()) return this.options.fallback.call(this);
if (null == this.options.url && (this.options.url = this.element.getAttribute("action")), 
!this.options.url) throw new Error("No URL provided.");
if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes, 
delete this.options.acceptedMimeTypes), this.options.method = this.options.method.toUpperCase(), 
(r = this.getExistingFallback()) && r.parentNode && r.parentNode.removeChild(r), 
this.options.previewsContainer ? this.previewsContainer = t.getElement(this.options.previewsContainer, "previewsContainer") :this.previewsContainer = this.element, 
this.options.clickable && (this.options.clickable === !0 ? this.clickableElements = [ this.element ] :this.clickableElements = t.getElements(this.options.clickable, "clickable")), 
this.init();
}
var i;
return d(t, e), t.prototype.events = [ "drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached" ], 
t.prototype.defaultOptions = {
url:null,
method:"post",
withCredentials:!1,
parallelUploads:2,
uploadMultiple:!1,
maxFilesize:256,
paramName:"file",
createImageThumbnails:!0,
maxThumbnailFilesize:10,
thumbnailWidth:100,
thumbnailHeight:100,
maxFiles:null,
params:{},
clickable:!0,
ignoreHiddenFiles:!0,
acceptedFiles:null,
acceptedMimeTypes:null,
autoProcessQueue:!0,
autoQueue:!0,
addRemoveLinks:!1,
previewsContainer:null,
dictDefaultMessage:"Drop files here to upload",
dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",
dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",
dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
dictInvalidFileType:"You can't upload files of this type.",
dictResponseError:"Server responded with {{statusCode}} code.",
dictCancelUpload:"Cancel upload",
dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",
dictRemoveFile:"Remove file",
dictRemoveFileConfirmation:null,
dictMaxFilesExceeded:"You can not upload any more files.",
accept:function(e, t) {
return t();
},
init:function() {
return a;
},
forceFallback:!1,
fallback:function() {
var e, i, n, s, r, o;
for (this.element.className = "" + this.element.className + " dz-browser-not-supported", 
o = this.element.getElementsByTagName("div"), s = 0, r = o.length; r > s; s++) e = o[s], 
/(^| )dz-message($| )/.test(e.className) && (i = e, e.className = "dz-message");
return i || (i = t.createElement('<div class="dz-message"><span></span></div>'), 
this.element.appendChild(i)), n = i.getElementsByTagName("span")[0], n && (n.textContent = this.options.dictFallbackMessage), 
this.element.appendChild(this.getFallbackForm());
},
resize:function(e) {
var t, i, n;
return t = {
srcX:0,
srcY:0,
srcWidth:e.width,
srcHeight:e.height
}, i = e.width / e.height, t.optWidth = this.options.thumbnailWidth, t.optHeight = this.options.thumbnailHeight, 
(null == t.optWidth || null == t.optHeight) && (null == t.optWidth && null == t.optHeight ? (t.optWidth = t.srcWidth, 
t.optHeight = t.srcHeight) :null == t.optWidth ? t.optWidth = i * t.optHeight :null == t.optHeight && (t.optHeight = 1 / i * t.optWidth)), 
n = t.optWidth / t.optHeight, e.height < t.optHeight || e.width < t.optWidth ? (t.trgHeight = t.srcHeight, 
t.trgWidth = t.srcWidth) :i > n ? (t.srcHeight = e.height, t.srcWidth = t.srcHeight * n) :(t.srcWidth = e.width, 
t.srcHeight = t.srcWidth / n), t.srcX = (e.width - t.srcWidth) / 2, t.srcY = (e.height - t.srcHeight) / 2, 
t;
},
drop:function(e) {
return this.element.classList.remove("dz-drag-hover");
},
dragstart:a,
dragend:function(e) {
return this.element.classList.remove("dz-drag-hover");
},
dragenter:function(e) {
return this.element.classList.add("dz-drag-hover");
},
dragover:function(e) {
return this.element.classList.add("dz-drag-hover");
},
dragleave:function(e) {
return this.element.classList.remove("dz-drag-hover");
},
paste:a,
reset:function() {
return this.element.classList.remove("dz-started");
},
addedfile:function(e) {
var i, n, s, r, o, l, a, u, p, d, c, h, m, f = this;
for (this.element === this.previewsContainer && this.element.classList.add("dz-started"), 
e.previewElement = t.createElement(this.options.previewTemplate.trim()), e.previewTemplate = e.previewElement, 
this.previewsContainer.appendChild(e.previewElement), d = e.previewElement.querySelectorAll("[data-dz-name]"), 
r = 0, a = d.length; a > r; r++) i = d[r], i.textContent = e.name;
for (c = e.previewElement.querySelectorAll("[data-dz-size]"), o = 0, u = c.length; u > o; o++) i = c[o], 
i.innerHTML = this.filesize(e.size);
for (this.options.addRemoveLinks && (e._removeLink = t.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), 
e.previewElement.appendChild(e._removeLink)), n = function(i) {
return i.preventDefault(), i.stopPropagation(), e.status === t.UPLOADING && f.options.dictCancelUploadConfirmation ? t.confirm(f.options.dictCancelUploadConfirmation, function() {
return f.removeFile(e);
}) :f.options.dictRemoveFileConfirmation ? t.confirm(f.options.dictRemoveFileConfirmation, function() {
return f.removeFile(e);
}) :f.removeFile(e);
}, h = e.previewElement.querySelectorAll("[data-dz-remove]"), m = [], l = 0, p = h.length; p > l; l++) s = h[l], 
m.push(s.addEventListener("click", n));
return m;
},
removedfile:function(e) {
var t;
return null != (t = e.previewElement) && t.parentNode.removeChild(e.previewElement), 
this._updateMaxFilesReachedClass();
},
thumbnail:function(e, t) {
var i, n, s, r, o;
for (e.previewElement.classList.remove("dz-file-preview"), e.previewElement.classList.add("dz-image-preview"), 
r = e.previewElement.querySelectorAll("[data-dz-thumbnail]"), o = [], n = 0, s = r.length; s > n; n++) i = r[n], 
i.alt = e.name, o.push(i.src = t);
return o;
},
error:function(e, t) {
var i, n, s, r, o;
for (e.previewElement.classList.add("dz-error"), "String" != typeof t && t.error && (t = t.error), 
r = e.previewElement.querySelectorAll("[data-dz-errormessage]"), o = [], n = 0, 
s = r.length; s > n; n++) i = r[n], o.push(i.textContent = t);
return o;
},
errormultiple:a,
processing:function(e) {
return e.previewElement.classList.add("dz-processing"), e._removeLink ? e._removeLink.textContent = this.options.dictCancelUpload :void 0;
},
processingmultiple:a,
uploadprogress:function(e, t, i) {
var n, s, r, o, l;
for (o = e.previewElement.querySelectorAll("[data-dz-uploadprogress]"), l = [], 
s = 0, r = o.length; r > s; s++) n = o[s], l.push(n.style.width = "" + t + "%");
return l;
},
totaluploadprogress:a,
sending:a,
sendingmultiple:a,
success:function(e) {
return e.previewElement.classList.add("dz-success");
},
successmultiple:a,
canceled:function(e) {
return this.emit("error", e, "Upload canceled.");
},
canceledmultiple:a,
complete:function(e) {
return e._removeLink ? e._removeLink.textContent = this.options.dictRemoveFile :void 0;
},
completemultiple:a,
maxfilesexceeded:a,
maxfilesreached:a,
previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-success-mark"><span>✔</span></div>\n  <div class="dz-error-mark"><span>✘</span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'
}, i = function() {
var e, t, i, n, s, r, o;
for (n = arguments[0], i = 2 <= arguments.length ? c.call(arguments, 1) :[], r = 0, 
o = i.length; o > r; r++) {
t = i[r];
for (e in t) s = t[e], n[e] = s;
}
return n;
}, t.prototype.getAcceptedFiles = function() {
var e, t, i, n, s;
for (n = this.files, s = [], t = 0, i = n.length; i > t; t++) e = n[t], e.accepted && s.push(e);
return s;
}, t.prototype.getRejectedFiles = function() {
var e, t, i, n, s;
for (n = this.files, s = [], t = 0, i = n.length; i > t; t++) e = n[t], e.accepted || s.push(e);
return s;
}, t.prototype.getFilesWithStatus = function(e) {
var t, i, n, s, r;
for (s = this.files, r = [], i = 0, n = s.length; n > i; i++) t = s[i], t.status === e && r.push(t);
return r;
}, t.prototype.getQueuedFiles = function() {
return this.getFilesWithStatus(t.QUEUED);
}, t.prototype.getUploadingFiles = function() {
return this.getFilesWithStatus(t.UPLOADING);
}, t.prototype.getActiveFiles = function() {
var e, i, n, s, r;
for (s = this.files, r = [], i = 0, n = s.length; n > i; i++) e = s[i], (e.status === t.UPLOADING || e.status === t.QUEUED) && r.push(e);
return r;
}, t.prototype.init = function() {
var e, i, n, s, r, o, l, a = this;
for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), 
this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(t.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), 
this.clickableElements.length && (n = function() {
return a.hiddenFileInput && document.body.removeChild(a.hiddenFileInput), a.hiddenFileInput = document.createElement("input"), 
a.hiddenFileInput.setAttribute("type", "file"), (null == a.options.maxFiles || a.options.maxFiles > 1) && a.hiddenFileInput.setAttribute("multiple", "multiple"), 
a.hiddenFileInput.className = "dz-hidden-input", null != a.options.acceptedFiles && a.hiddenFileInput.setAttribute("accept", a.options.acceptedFiles), 
a.hiddenFileInput.style.visibility = "hidden", a.hiddenFileInput.style.position = "absolute", 
a.hiddenFileInput.style.top = "0", a.hiddenFileInput.style.left = "0", a.hiddenFileInput.style.height = "0", 
a.hiddenFileInput.style.width = "0", document.body.appendChild(a.hiddenFileInput), 
a.hiddenFileInput.addEventListener("change", function() {
var e, t, i, s;
if (t = a.hiddenFileInput.files, t.length) for (i = 0, s = t.length; s > i; i++) e = t[i], 
a.addFile(e);
return n();
});
})(), this.URL = null != (o = window.URL) ? o :window.webkitURL, l = this.events, 
s = 0, r = l.length; r > s; s++) e = l[s], this.on(e, this.options[e]);
return this.on("uploadprogress", function() {
return a.updateTotalUploadProgress();
}), this.on("removedfile", function() {
return a.updateTotalUploadProgress();
}), this.on("canceled", function(e) {
return a.emit("complete", e);
}), this.on("complete", function(e) {
return 0 === a.getUploadingFiles().length && 0 === a.getQueuedFiles().length ? setTimeout(function() {
return a.emit("queuecomplete");
}, 0) :void 0;
}), i = function(e) {
return e.stopPropagation(), e.preventDefault ? e.preventDefault() :e.returnValue = !1;
}, this.listeners = [ {
element:this.element,
events:{
dragstart:function(e) {
return a.emit("dragstart", e);
},
dragenter:function(e) {
return i(e), a.emit("dragenter", e);
},
dragover:function(e) {
var t;
try {
t = e.dataTransfer.effectAllowed;
} catch (n) {}
return e.dataTransfer.dropEffect = "move" === t || "linkMove" === t ? "move" :"copy", 
i(e), a.emit("dragover", e);
},
dragleave:function(e) {
return a.emit("dragleave", e);
},
drop:function(e) {
return i(e), a.drop(e);
},
dragend:function(e) {
return a.emit("dragend", e);
}
}
} ], this.clickableElements.forEach(function(e) {
return a.listeners.push({
element:e,
events:{
click:function(i) {
return e !== a.element || i.target === a.element || t.elementInside(i.target, a.element.querySelector(".dz-message")) ? a.hiddenFileInput.click() :void 0;
}
}
});
}), this.enable(), this.options.init.call(this);
}, t.prototype.destroy = function() {
var e;
return this.disable(), this.removeAllFiles(!0), (null != (e = this.hiddenFileInput) ? e.parentNode :void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), 
this.hiddenFileInput = null), delete this.element.dropzone, t.instances.splice(t.instances.indexOf(this), 1);
}, t.prototype.updateTotalUploadProgress = function() {
var e, t, i, n, s, r, o, l;
if (n = 0, i = 0, e = this.getActiveFiles(), e.length) {
for (l = this.getActiveFiles(), r = 0, o = l.length; o > r; r++) t = l[r], n += t.upload.bytesSent, 
i += t.upload.total;
s = 100 * n / i;
} else s = 100;
return this.emit("totaluploadprogress", s, i, n);
}, t.prototype._getParamName = function(e) {
return "function" == typeof this.options.paramName ? this.options.paramName(e) :"" + this.options.paramName + (this.options.uploadMultiple ? "[" + e + "]" :"");
}, t.prototype.getFallbackForm = function() {
var e, i, n, s;
return (e = this.getExistingFallback()) ? e :(n = '<div class="dz-fallback">', this.options.dictFallbackText && (n += "<p>" + this.options.dictFallbackText + "</p>"), 
n += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' :void 0) + ' /><input type="submit" value="Upload!"></div>', 
i = t.createElement(n), "FORM" !== this.element.tagName ? (s = t.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>'), 
s.appendChild(i)) :(this.element.setAttribute("enctype", "multipart/form-data"), 
this.element.setAttribute("method", this.options.method)), null != s ? s :i);
}, t.prototype.getExistingFallback = function() {
var e, t, i, n, s, r;
for (t = function(e) {
var t, i, n;
for (i = 0, n = e.length; n > i; i++) if (t = e[i], /(^| )fallback($| )/.test(t.className)) return t;
}, r = [ "div", "form" ], n = 0, s = r.length; s > n; n++) if (i = r[n], e = t(this.element.getElementsByTagName(i))) return e;
}, t.prototype.setupEventListeners = function() {
var e, t, i, n, s, r, o;
for (r = this.listeners, o = [], n = 0, s = r.length; s > n; n++) e = r[n], o.push(function() {
var n, s;
n = e.events, s = [];
for (t in n) i = n[t], s.push(e.element.addEventListener(t, i, !1));
return s;
}());
return o;
}, t.prototype.removeEventListeners = function() {
var e, t, i, n, s, r, o;
for (r = this.listeners, o = [], n = 0, s = r.length; s > n; n++) e = r[n], o.push(function() {
var n, s;
n = e.events, s = [];
for (t in n) i = n[t], s.push(e.element.removeEventListener(t, i, !1));
return s;
}());
return o;
}, t.prototype.disable = function() {
var e, t, i, n, s;
for (this.clickableElements.forEach(function(e) {
return e.classList.remove("dz-clickable");
}), this.removeEventListeners(), n = this.files, s = [], t = 0, i = n.length; i > t; t++) e = n[t], 
s.push(this.cancelUpload(e));
return s;
}, t.prototype.enable = function() {
return this.clickableElements.forEach(function(e) {
return e.classList.add("dz-clickable");
}), this.setupEventListeners();
}, t.prototype.filesize = function(e) {
var t;
return e >= 109951162777.6 ? (e /= 109951162777.6, t = "TiB") :e >= 107374182.4 ? (e /= 107374182.4, 
t = "GiB") :e >= 104857.6 ? (e /= 104857.6, t = "MiB") :e >= 102.4 ? (e /= 102.4, 
t = "KiB") :(e = 10 * e, t = "b"), "<strong>" + Math.round(e) / 10 + "</strong> " + t;
}, t.prototype._updateMaxFilesReachedClass = function() {
return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), 
this.element.classList.add("dz-max-files-reached")) :this.element.classList.remove("dz-max-files-reached");
}, t.prototype.drop = function(e) {
var t, i;
e.dataTransfer && (this.emit("drop", e), t = e.dataTransfer.files, t.length && (i = e.dataTransfer.items, 
i && i.length && null != i[0].webkitGetAsEntry ? this._addFilesFromItems(i) :this.handleFiles(t)));
}, t.prototype.paste = function(e) {
var t, i;
if (null != (null != e && null != (i = e.clipboardData) ? i.items :void 0)) return this.emit("paste", e), 
t = e.clipboardData.items, t.length ? this._addFilesFromItems(t) :void 0;
}, t.prototype.handleFiles = function(e) {
var t, i, n, s;
for (s = [], i = 0, n = e.length; n > i; i++) t = e[i], s.push(this.addFile(t));
return s;
}, t.prototype._addFilesFromItems = function(e) {
var t, i, n, s, r;
for (r = [], n = 0, s = e.length; s > n; n++) i = e[n], null != i.webkitGetAsEntry && (t = i.webkitGetAsEntry()) ? t.isFile ? r.push(this.addFile(i.getAsFile())) :t.isDirectory ? r.push(this._addFilesFromDirectory(t, t.name)) :r.push(void 0) :null != i.getAsFile && (null == i.kind || "file" === i.kind) ? r.push(this.addFile(i.getAsFile())) :r.push(void 0);
return r;
}, t.prototype._addFilesFromDirectory = function(e, t) {
var i, n, s = this;
return i = e.createReader(), n = function(e) {
var i, n, r;
for (n = 0, r = e.length; r > n; n++) i = e[n], i.isFile ? i.file(function(e) {
return s.options.ignoreHiddenFiles && "." === e.name.substring(0, 1) ? void 0 :(e.fullPath = "" + t + "/" + e.name, 
s.addFile(e));
}) :i.isDirectory && s._addFilesFromDirectory(i, "" + t + "/" + i.name);
}, i.readEntries(n, function(e) {
return "undefined" != typeof console && null !== console && "function" == typeof console.log ? console.log(e) :void 0;
});
}, t.prototype.accept = function(e, i) {
return e.size > 1024 * this.options.maxFilesize * 1024 ? i(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(e.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) :t.isValidFile(e, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (i(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), 
this.emit("maxfilesexceeded", e)) :this.options.accept.call(this, e, i) :i(this.options.dictInvalidFileType);
}, t.prototype.addFile = function(e) {
var i = this;
return e.upload = {
progress:0,
total:e.size,
bytesSent:0
}, this.files.push(e), e.status = t.ADDED, this.emit("addedfile", e), this._enqueueThumbnail(e), 
this.accept(e, function(t) {
return t ? (e.accepted = !1, i._errorProcessing([ e ], t)) :(e.accepted = !0, i.options.autoQueue && i.enqueueFile(e)), 
i._updateMaxFilesReachedClass();
});
}, t.prototype.enqueueFiles = function(e) {
var t, i, n;
for (i = 0, n = e.length; n > i; i++) t = e[i], this.enqueueFile(t);
return null;
}, t.prototype.enqueueFile = function(e) {
var i = this;
if (e.status !== t.ADDED || e.accepted !== !0) throw new Error("This file can't be queued because it has already been processed or was rejected.");
return e.status = t.QUEUED, this.options.autoProcessQueue ? setTimeout(function() {
return i.processQueue();
}, 0) :void 0;
}, t.prototype._thumbnailQueue = [], t.prototype._processingThumbnail = !1, t.prototype._enqueueThumbnail = function(e) {
var t = this;
return this.options.createImageThumbnails && e.type.match(/image.*/) && e.size <= 1024 * this.options.maxThumbnailFilesize * 1024 ? (this._thumbnailQueue.push(e), 
setTimeout(function() {
return t._processThumbnailQueue();
}, 0)) :void 0;
}, t.prototype._processThumbnailQueue = function() {
var e = this;
if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length) return this._processingThumbnail = !0, 
this.createThumbnail(this._thumbnailQueue.shift(), function() {
return e._processingThumbnail = !1, e._processThumbnailQueue();
});
}, t.prototype.removeFile = function(e) {
return e.status === t.UPLOADING && this.cancelUpload(e), this.files = u(this.files, e), 
this.emit("removedfile", e), 0 === this.files.length ? this.emit("reset") :void 0;
}, t.prototype.removeAllFiles = function(e) {
var i, n, s, r;
for (null == e && (e = !1), r = this.files.slice(), n = 0, s = r.length; s > n; n++) i = r[n], 
(i.status !== t.UPLOADING || e) && this.removeFile(i);
return null;
}, t.prototype.createThumbnail = function(e, t) {
var i, n = this;
return i = new FileReader(), i.onload = function() {
var s;
return s = document.createElement("img"), s.onload = function() {
var i, r, o, a, u, p, d, c;
return e.width = s.width, e.height = s.height, o = n.options.resize.call(n, e), 
null == o.trgWidth && (o.trgWidth = o.optWidth), null == o.trgHeight && (o.trgHeight = o.optHeight), 
i = document.createElement("canvas"), r = i.getContext("2d"), i.width = o.trgWidth, 
i.height = o.trgHeight, l(r, s, null != (u = o.srcX) ? u :0, null != (p = o.srcY) ? p :0, o.srcWidth, o.srcHeight, null != (d = o.trgX) ? d :0, null != (c = o.trgY) ? c :0, o.trgWidth, o.trgHeight), 
a = i.toDataURL("image/png"), n.emit("thumbnail", e, a), null != t ? t() :void 0;
}, s.src = i.result;
}, i.readAsDataURL(e);
}, t.prototype.processQueue = function() {
var e, t, i, n;
if (t = this.options.parallelUploads, i = this.getUploadingFiles().length, e = i, 
!(i >= t) && (n = this.getQueuedFiles(), n.length > 0)) {
if (this.options.uploadMultiple) return this.processFiles(n.slice(0, t - i));
for (;t > e; ) {
if (!n.length) return;
this.processFile(n.shift()), e++;
}
}
}, t.prototype.processFile = function(e) {
return this.processFiles([ e ]);
}, t.prototype.processFiles = function(e) {
var i, n, s;
for (n = 0, s = e.length; s > n; n++) i = e[n], i.processing = !0, i.status = t.UPLOADING, 
this.emit("processing", i);
return this.options.uploadMultiple && this.emit("processingmultiple", e), this.uploadFiles(e);
}, t.prototype._getFilesWithXhr = function(e) {
var t, i;
return i = function() {
var i, n, s, r;
for (s = this.files, r = [], i = 0, n = s.length; n > i; i++) t = s[i], t.xhr === e && r.push(t);
return r;
}.call(this);
}, t.prototype.cancelUpload = function(e) {
var i, n, s, r, o, l, a;
if (e.status === t.UPLOADING) {
for (n = this._getFilesWithXhr(e.xhr), s = 0, o = n.length; o > s; s++) i = n[s], 
i.status = t.CANCELED;
for (e.xhr.abort(), r = 0, l = n.length; l > r; r++) i = n[r], this.emit("canceled", i);
this.options.uploadMultiple && this.emit("canceledmultiple", n);
} else ((a = e.status) === t.ADDED || a === t.QUEUED) && (e.status = t.CANCELED, 
this.emit("canceled", e), this.options.uploadMultiple && this.emit("canceledmultiple", [ e ]));
return this.options.autoProcessQueue ? this.processQueue() :void 0;
}, t.prototype.uploadFile = function(e) {
return this.uploadFiles([ e ]);
}, t.prototype.uploadFiles = function(e) {
var n, s, r, o, l, a, u, p, d, c, h, m, f, g, v, y, F, b, E, w, z, L, k, C, x, A, T, D, _, U, N, S, I = this;
for (F = new XMLHttpRequest(), b = 0, L = e.length; L > b; b++) n = e[b], n.xhr = F;
F.open(this.options.method, this.options.url, !0), F.withCredentials = !!this.options.withCredentials, 
g = null, r = function() {
var t, i, s;
for (s = [], t = 0, i = e.length; i > t; t++) n = e[t], s.push(I._errorProcessing(e, g || I.options.dictResponseError.replace("{{statusCode}}", F.status), F));
return s;
}, v = function(t) {
var i, s, r, o, l, a, u, p, d;
if (null != t) for (s = 100 * t.loaded / t.total, r = 0, a = e.length; a > r; r++) n = e[r], 
n.upload = {
progress:s,
total:t.total,
bytesSent:t.loaded
}; else {
for (i = !0, s = 100, o = 0, u = e.length; u > o; o++) n = e[o], (100 !== n.upload.progress || n.upload.bytesSent !== n.upload.total) && (i = !1), 
n.upload.progress = s, n.upload.bytesSent = n.upload.total;
if (i) return;
}
for (d = [], l = 0, p = e.length; p > l; l++) n = e[l], d.push(I.emit("uploadprogress", n, s, n.upload.bytesSent));
return d;
}, F.onload = function(i) {
var n;
if (e[0].status !== t.CANCELED && 4 === F.readyState) {
if (g = F.responseText, F.getResponseHeader("content-type") && ~F.getResponseHeader("content-type").indexOf("application/json")) try {
g = JSON.parse(g);
} catch (s) {
i = s, g = "Invalid JSON response from server.";
}
return v(), 200 <= (n = F.status) && 300 > n ? I._finished(e, g, i) :r();
}
}, F.onerror = function() {
return e[0].status !== t.CANCELED ? r() :void 0;
}, f = null != (T = F.upload) ? T :F, f.onprogress = v, a = {
Accept:"application/json",
"Cache-Control":"no-cache",
"X-Requested-With":"XMLHttpRequest"
}, this.options.headers && i(a, this.options.headers);
for (o in a) l = a[o], F.setRequestHeader(o, l);
if (s = new FormData(), this.options.params) {
D = this.options.params;
for (h in D) y = D[h], s.append(h, y);
}
for (E = 0, k = e.length; k > E; E++) n = e[E], this.emit("sending", n, F, s);
if (this.options.uploadMultiple && this.emit("sendingmultiple", e, F, s), "FORM" === this.element.tagName) for (_ = this.element.querySelectorAll("input, textarea, select, button"), 
w = 0, C = _.length; C > w; w++) if (p = _[w], d = p.getAttribute("name"), c = p.getAttribute("type"), 
"SELECT" === p.tagName && p.hasAttribute("multiple")) for (U = p.options, z = 0, 
x = U.length; x > z; z++) m = U[z], m.selected && s.append(d, m.value); else (!c || "checkbox" !== (N = c.toLowerCase()) && "radio" !== N || p.checked) && s.append(d, p.value);
for (u = A = 0, S = e.length - 1; S >= 0 ? S >= A :A >= S; u = S >= 0 ? ++A :--A) s.append(this._getParamName(u), e[u], e[u].name);
return F.send(s);
}, t.prototype._finished = function(e, i, n) {
var s, r, o;
for (r = 0, o = e.length; o > r; r++) s = e[r], s.status = t.SUCCESS, this.emit("success", s, i, n), 
this.emit("complete", s);
return this.options.uploadMultiple && (this.emit("successmultiple", e, i, n), this.emit("completemultiple", e)), 
this.options.autoProcessQueue ? this.processQueue() :void 0;
}, t.prototype._errorProcessing = function(e, i, n) {
var s, r, o;
for (r = 0, o = e.length; o > r; r++) s = e[r], s.status = t.ERROR, this.emit("error", s, i, n), 
this.emit("complete", s);
return this.options.uploadMultiple && (this.emit("errormultiple", e, i, n), this.emit("completemultiple", e)), 
this.options.autoProcessQueue ? this.processQueue() :void 0;
}, t;
}(n), t.version = "3.9.0", t.options = {}, t.optionsForElement = function(e) {
return e.getAttribute("id") ? t.options[s(e.getAttribute("id"))] :void 0;
}, t.instances = [], t.forElement = function(e) {
if ("string" == typeof e && (e = document.querySelector(e)), null == (null != e ? e.dropzone :void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
return e.dropzone;
}, t.autoDiscover = !0, t.discover = function() {
var e, i, n, s, r, o;
for (document.querySelectorAll ? n = document.querySelectorAll(".dropzone") :(n = [], 
e = function(e) {
var t, i, s, r;
for (r = [], i = 0, s = e.length; s > i; i++) t = e[i], /(^| )dropzone($| )/.test(t.className) ? r.push(n.push(t)) :r.push(void 0);
return r;
}, e(document.getElementsByTagName("div")), e(document.getElementsByTagName("form"))), 
o = [], s = 0, r = n.length; r > s; s++) i = n[s], t.optionsForElement(i) !== !1 ? o.push(new t(i)) :o.push(void 0);
return o;
}, t.blacklistedBrowsers = [ /opera.*Macintosh.*version\/12/i ], t.isBrowserSupported = function() {
var e, i, n, s, r;
if (e = !0, window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) if ("classList" in document.createElement("a")) for (r = t.blacklistedBrowsers, 
n = 0, s = r.length; s > n; n++) i = r[n], i.test(navigator.userAgent) && (e = !1); else e = !1; else e = !1;
return e;
}, u = function(e, t) {
var i, n, s, r;
for (r = [], n = 0, s = e.length; s > n; n++) i = e[n], i !== t && r.push(i);
return r;
}, s = function(e) {
return e.replace(/[\-_](\w)/g, function(e) {
return e.charAt(1).toUpperCase();
});
}, t.createElement = function(e) {
var t;
return t = document.createElement("div"), t.innerHTML = e, t.childNodes[0];
}, t.elementInside = function(e, t) {
if (e === t) return !0;
for (;e = e.parentNode; ) if (e === t) return !0;
return !1;
}, t.getElement = function(e, t) {
var i;
if ("string" == typeof e ? i = document.querySelector(e) :null != e.nodeType && (i = e), 
null == i) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector or a plain HTML element.");
return i;
}, t.getElements = function(e, t) {
var i, n, s, r, o, l, a, u;
if (e instanceof Array) {
s = [];
try {
for (r = 0, l = e.length; l > r; r++) n = e[r], s.push(this.getElement(n, t));
} catch (p) {
i = p, s = null;
}
} else if ("string" == typeof e) for (s = [], u = document.querySelectorAll(e), 
o = 0, a = u.length; a > o; o++) n = u[o], s.push(n); else null != e.nodeType && (s = [ e ]);
if (null == s || !s.length) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
return s;
}, t.confirm = function(e, t, i) {
return window.confirm(e) ? t() :null != i ? i() :void 0;
}, t.isValidFile = function(e, t) {
var i, n, s, r, o;
if (!t) return !0;
for (t = t.split(","), n = e.type, i = n.replace(/\/.*$/, ""), r = 0, o = t.length; o > r; r++) if (s = t[r], 
s = s.trim(), "." === s.charAt(0)) {
if (-1 !== e.name.toLowerCase().indexOf(s.toLowerCase(), e.name.length - s.length)) return !0;
} else if (/\/\*$/.test(s)) {
if (i === s.replace(/\/.*$/, "")) return !0;
} else if (n === s) return !0;
return !1;
}, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function(e) {
return this.each(function() {
return new t(this, e);
});
}), "undefined" != typeof i && null !== i ? i.exports = t :window.Dropzone = t, 
t.ADDED = "added", t.QUEUED = "queued", t.ACCEPTED = t.QUEUED, t.UPLOADING = "uploading", 
t.PROCESSING = t.UPLOADING, t.CANCELED = "canceled", t.ERROR = "error", t.SUCCESS = "success", 
o = function(e) {
var t, i, n, s, r, o, l, a, u, p;
for (l = e.naturalWidth, o = e.naturalHeight, i = document.createElement("canvas"), 
i.width = 1, i.height = o, n = i.getContext("2d"), n.drawImage(e, 0, 0), s = n.getImageData(0, 0, 1, o).data, 
p = 0, r = o, a = o; a > p; ) t = s[4 * (a - 1) + 3], 0 === t ? r = a :p = a, a = r + p >> 1;
return u = a / o, 0 === u ? 1 :u;
}, l = function(e, t, i, n, s, r, l, a, u, p) {
var d;
return d = o(t), e.drawImage(t, i, n, s, r, l, a, u, p / d);
}, r = function(e, t) {
var i, n, s, r, o, l, a, u, p;
if (s = !1, p = !0, n = e.document, u = n.documentElement, i = n.addEventListener ? "addEventListener" :"attachEvent", 
a = n.addEventListener ? "removeEventListener" :"detachEvent", l = n.addEventListener ? "" :"on", 
r = function(i) {
return "readystatechange" !== i.type || "complete" === n.readyState ? (("load" === i.type ? e :n)[a](l + i.type, r, !1), 
!s && (s = !0) ? t.call(e, i.type || i) :void 0) :void 0;
}, o = function() {
var e;
try {
u.doScroll("left");
} catch (t) {
return e = t, void setTimeout(o, 50);
}
return r("poll");
}, "complete" !== n.readyState) {
if (n.createEventObject && u.doScroll) {
try {
p = !e.frameElement;
} catch (d) {}
p && o();
}
return n[i](l + "DOMContentLoaded", r, !1), n[i](l + "readystatechange", r, !1), 
e[i](l + "load", r, !1);
}
}, t._autoDiscoverFunction = function() {
return t.autoDiscover ? t.discover() :void 0;
}, r(window, t._autoDiscoverFunction);
}).call(this);
}), this.Dropzone = e("dropzone");
}();
var photos = photos || {};

photos.createAlbumPopup = function() {
function e(e) {
var a = jQuery("#create_new_album_form .errorMessage"), r = jQuery("#create_new_album_form .errorMessageText");
a && r && (0 != e.length ? (r.html(e), a.fadeIn()) :(r.html(""), a.fadeOut()));
}
var a = null, r = function(e, r, t) {
jQuery.isFunction(t.onAlbumCreateCallback) && (a = t.onAlbumCreateCallback), openNewPopup("/FP/Library/Photos/Albums/CreateNewAlbumPopup/create-new-album-popup.php", "siteId=" + e + "&lang=" + r, t);
}, t = function() {
disableButtonSprite2("saveButton"), e("");
var r = jQuery("#create_new_album_form");
return r.validationEngine("validate") ? (lcreateAlbumURLParams = createAlbumURLParams.replace("%1", jQuery("#album_name").val()), 
lcreateAlbumURLParams = lcreateAlbumURLParams.replace("%2", jQuery("#album_description").val()), 
lcreateAlbumURLParams = lcreateAlbumURLParams.replace("%3", jQuery("#make_album_public").is(":checked") ? 1 :0), 
jQuery.ajax({
type:"POST",
url:createAlbumURL,
data:lcreateAlbumURLParams,
dataType:"text",
success:function(r) {
var t = r.indexOf('<create-album albumID="');
if (-1 == t) return e(-1 == r.indexOf('code="' + albumTitleIsInUseCode + '"') ? failedToCreateAlbumMsg :albumTitleIsTakenMsg), 
restoreButtonSprite2("saveButton", !0), !1;
t += 23;
var u = r.indexOf('"', t);
if (-1 == u) return e(failedToCreateAlbumMsg), restoreButtonSprite2("saveButton", !0), 
!1;
if (null !== a) {
var l = parseInt(r.substring(t, u)), n = _.escape(jQuery("#album_name").val());
a.apply(this, [ l, n ]);
}
closeNewPopup();
}
}), !1) :(restoreButtonSprite2("saveButton", !0), !1);
};
return {
openCreateAlbumPopup:r,
createNewAlbum:t
};
}();
var MediaUploader = function(e, a, i, d, o, n) {
function l() {
var e = null, a = oe.exec(document.location.hash);
return a && 5 == a.length && (e = {
siteId:a[1],
albumId:0 == a[2] ? null :a[2],
individualId:0 == a[3] ? null :a[3],
isExternal:1 == a[4]
}), e;
}
function r(e) {
document.location.href = "/FP/add-photos.php?s=" + e;
}
function s(e) {
return "." + e.join(",.");
}
function t(e, a, i, d) {
var o = _.last(e.name.split(".")).toLowerCase();
return _.indexOf(i, o) < 0 ? (u(e, a, a.dict_media_uploader_unsupported_media_type + " " + e.name), 
!1) :e.size > d ? (u(e, a, a.dict_media_uploader_oversized_media + " " + e.name), 
!1) :!0;
}
function u(e, a, i) {
ae.removeFile(e), re++, se.push(i), p(re, se, a);
}
function c(e, a) {
0 >= e ? (m(a), A()) :ue && (h(), k(ce));
}
function p(e, a, i) {
v(e > 1 ? i.dict_media_uploader_could_not_upload_files.replace("%1", e) :i.dict_media_uploader_could_not_upload_file, a.join("<br>"), i.dict_media_uploader_language_direction);
}
function m(e) {
v(e.dict_media_uploader_storage_quota_reached, e.dict_media_uploader_upgrade_storage, e.dict_media_uploader_language_direction), 
ue = !0;
}
function v(e, a, i) {
if (!ue) {
var d = jQuery("#errors .status");
d.find("span").html(e), d.addClass("show"), jQuery("#errors #tooltipHandle").showBalloon({
position:"bottom " + ("RTL" == i ? "left" :"right"),
contents:G().replace("%1", a),
classname:"pk_user_strip_info_severe_warning_tooltip mediaUploaderTooltip",
tipSize:0,
offsetX:"RTL" == i ? -35 :35,
offsetY:-9
});
var o = jQuery("#tooltip .close a");
o.unbind("click"), o.click(function() {
return f(), !1;
}), d.unbind("mouseover"), d.mouseover(function() {
v(e, a, i);
});
}
}
function h() {
jQuery("#errors .status").removeClass("show"), f(), ue = !1;
}
function f() {
jQuery("#errors #tooltipHandle").hideBalloon();
}
function b(e, a, i) {
jQuery(document).keyup(function(d) {
27 == d.keyCode && i.cancel(e, a);
});
}
function g() {
jQuery(document).unbind("keyup");
}
function y(e, a, i, d, o, n) {
j();
var r = !1, s = l();
null != s && (r = s.isExternal);
var t = "#upload-media-" + e + "-" + (a ? a :0) + "-" + (i ? i :0) + "-" + (r ? 1 :0);
null == document.location.hash.match(oe) ? document.location.hash = t :document.location.hash = document.location.hash.replace(oe, t), 
jQuery(window).bind("hashchange", function() {
null == document.location.hash.match(oe) && n.cancel(d, o);
});
}
function U(e) {
j(), jQuery(window).bind("hashchange", function() {
e.openUploaderFromHash(de);
});
}
function j() {
jQuery(window).unbind("hashchange");
}
function Q(e) {
var a = e.type, i = a.replace(/\/.*$/, "").toLowerCase();
if ("image" != i) {
var d = jQuery('<div class="alternativeThumbnail"></div>');
jQuery(e.previewElement).find(".dz-details").append(d), "video" == i ? d.addClass("video") :"audio" == i ? d.addClass("audio") :d.addClass("document");
}
}
function k(e) {
enableCssButton("mediaUploaderConfirmBtn"), jQuery("#mediaUploaderConfirmBtn").click(e);
}
function A() {
disableCssButton("mediaUploaderConfirmBtn"), jQuery("#mediaUploaderConfirmBtn").unbind("click");
}
function C(e, a, i, d) {
var o = new MH_Notice({
message:i.dict_media_uploader_cancel_confirmation,
buttons:{
secondary:{
text:"no",
click:function() {
o.close();
}
},
primary:{
text:"yes",
click:function() {
o.close(), B(e, a.onAfterCancel, d), isMediaUploaderRedesignEnabled && (a.uploadParams && "CloseButton" === a.uploadParams.comingFrom ? writeActivityIndicator(fe.clickOnXApprovalOnPopup, null, !0, 1) :a.uploadParams && "CancelButton" === a.uploadParams.comingFrom && writeActivityIndicator(fe.clickOnCancelApprovalOnPopup, null, !0, 1));
}
}
}
});
}
function w() {
jQuery(".mediaUploaderUploadingMask").show(), jQuery("#mediaUploader").addClass("loading"), 
jQuery(".mediaUploaderUploadingMask #mediaUploaderSpinner").show().spin({
lines:12,
length:20,
width:9,
radius:20,
color:"#fff",
speed:1,
trail:60,
shadow:!1
});
}
function M() {
jQuery(".mediaUploaderUploadingMask").hide(), jQuery("#mediaUploader").removeClass("loading"), 
jQuery(".mediaUploaderUploadingMask #mediaUploaderSpinner").hide();
}
function x(e, a, i, d, o, n, l) {
if (1 == e) var r = n.dict_media_uploader_success_message_singular; else var r = n.dict_media_uploader_success_message_plural.replace("%1", e);
jQuery("#uploadMessage .caption").html(r), isMediaUploaderRedesignEnabled && a === _e && (a = n.dict_media_uploader_all_media_items), 
jQuery("#uploadMessage .subcaption").html(a), jQuery("#mediaUploaderDoneBtn").unbind("click").click(function() {
return me ? (j(), S(), F(d, !1), setTimeout(function() {
document.location.reload();
}, 1)) :I(d, o.onAfterUpload, l), !1;
}), jQuery("#mediaUploaderAlbumBtn").unbind("click").click(function() {
return isMediaUploaderRedesignEnabled ? writeActivityIndicatorWithCallback([ {
activityId:fe.clickOnViewAlbum,
delta:1
} ], function() {
jQuery.isFunction(o.onAfterUpload) && jQuery("#header #media_uploader_hidden_checkbox").is(":checked") && o.onAfterUpload(), 
document.location.href = i;
}) :(jQuery.isFunction(o.onAfterUpload) && o.onAfterUpload(), document.location.href = i), 
!1;
}), M(), jQuery("#mediaUploader").hide(), ae.removeAllFiles(!0), jQuery(".mediaUploaderUploadingMask").show(), 
jQuery("#mediaUploader").addClass("loading"), jQuery("#uploadMessage").show();
}
function P() {
jQuery(".mediaUploaderUploadingMask").hide(), jQuery("#mediaUploader").removeClass("loading"), 
jQuery(".uploadMessage").hide();
}
function I(e, a, i) {
M(), P(), h(), g(), jQuery("#mediaUploader").hide(), jQuery(".mediaUploaderMask").hide(), 
jQuery(document.body).removeClass("mediaUploaderClip"), le = 0, re = 0, se = [], 
ae.removeAllFiles(!0), S(), U(i), jQuery.isFunction(a) && a();
}
function B(e, a, i) {
I(e, a, i), F(e);
}
function S() {
var e = l();
null == e || e.isExternal || window.dontBackHistory ? document.location.hash = document.location.hash.replace(oe, "") :window.history.back();
}
function F(e, a) {
"undefined" == typeof a && (a = !0), jQuery.ajax({
type:"GET",
url:"/FP/API/Photos/media-uploader-remove.php",
dataType:"json",
async:a,
data:{
uploadSessionGuid:e,
lang:ve
}
});
}
function z(e, a, i, d) {
if (te -= e.size, t(e, a, i, d)) {
var o = jQuery(e.previewElement).find(".dz-filename span"), n = o.text(), l = _.last(n.split("."));
o.html(n.replace("." + l, "")), A(), Q(e);
var r = jQuery("#footer");
r.hasClass("show") || (jQuery("#banner").hide(), r.addClass("show"));
}
}
function T(e, a, i) {
a = jQuery.parseJSON(a), "undefined" == typeof a.status || 0 != a.status ? u(e, i, i.dict_media_uploader_server_error + " " + e.name) :c(te, i);
}
function O(e, a, i, d) {
if (100 == e && 0 == a && 0 == i) return void E(d);
var o = jQuery("#progressBar"), n = jQuery("#progressBar .ui-progressbar-value");
0 == le && (n.removeClass("adding"), o.progressbar({
value:0
})), e > le && (le = e);
var l = ae.getAcceptedFiles().length, r = ae.getQueuedFiles().length;
jQuery("#progressStatus").html(d.dict_media_uploader_uploading_status.replace("%1", l - r).replace("%2", l)), 
n.addClass("adding"), o.progressbar({
value:le
}), jQuery("#progress").show();
}
function E(e) {
ue || k(ce), le = 0;
var a = ae.getAcceptedFiles().length;
jQuery("#progressStatus").html(e.dict_media_uploader_finished_status.replace("%1", a).replace("%2", a)), 
jQuery("#progressBar").progressbar({
value:100
});
}
function R(e, a) {
te += e.size, c(te, a);
}
function D() {
jQuery("#progress").hide(), h(), re = 0, se = [], jQuery("#footer").removeClass("show");
}
function W(e, a) {
jQuery("#albums").append('<option id="' + e + '" selected>' + a + "</option>"), 
jQuery("#albumToolbar .select-replace span").html(a);
}
function N(e, a, i, d, o) {
d = jQuery.extend({}, ie, d), isMediaUploaderRedesignEnabled && writeActivityIndicator(fe.mainUploadPageView, null, !0, 1), 
de = d;
var n = null == ae;
ee || (ee = !0, H(n, e, a, i, d).done(jQuery.proxy(function(l) {
ee = !1;
var r = l.uploadSessionGuid;
n ? (L(l.mediaUploaderDictionary, l.mobileAppInfo, l.isMobile, l.photoImportExposures), 
$(l.mediaUploaderMediaTypes, l.mediaUploaderMaxMediaFileSize, l.mediaUploaderDictionary), 
ne = l.mediaUploaderDictionary) :isMediaUploaderRedesignEnabled && !jQuery("#media_uploader_hidden_checkbox").is(":checked") && jQuery("#media_uploader_hidden_checkbox").prop("checked", !0), 
null != i ? Y(l.profileName, e, i, r, ne, d, o) :K(e, l.albumId, l.albums, r, ne, d, o), 
Z(r), jQuery(document.body).addClass("mediaUploaderClip"), jQuery(".mediaUploaderMask").show(), 
jQuery("#mediaUploader").show(), null == i && jQuery("#albums").styledSelect({
backgroundPosition:{
ltr:28,
rtl:14
}
}), te = l.availableQuota, b(r, d, o), y(e, a, i, r, d, o);
}, o)).fail(jQuery.proxy(function(e) {
ee = !1, "undefined" != typeof e.err_title && "undefined" != typeof e.err_message && MH_Error({
title:e.err_title,
message:e.err_message,
messageIsHTML:!0
});
})));
}
function H(e, a, i, d, o) {
var n = jQuery.Deferred(), l = {
siteId:a,
lang:ve
};
return i ? l.albumId = i :d && (l.individualId = d), e && (l.newSession = 1), l = jQuery.extend({}, l, o.uploadParams), 
jQuery.ajax({
type:"GET",
url:"/FP/API/Photos/media-uploader-init.php",
dataType:"json",
data:l,
success:function(e) {
0 == e.status && "undefined" != typeof e.data ? n.resolve(e.data) :1 == e.status && n.reject(e);
}
}), n.promise();
}
function L(e, a, i, d) {
var o = new CssButton("mediaUploaderCancelBtn", "dialog", "cancel", e.dict_media_uploader_cancel, "#", null);
o.setMinWidth(173);
var n = new CssButton("mediaUploaderConfirmBtn", "dialog", "confirm", e.dict_media_uploader_done, "#", null);
n.setMinWidth(173);
var l = new CssButton("mediaUploaderDoneBtn", "dialog", "cancel", e.dict_media_uploader_done, "#", null);
l.setMinWidth(183);
var r = new CssButton("mediaUploaderAlbumBtn", "dialog", "confirm", e.dict_media_uploader_view_album, "#", null);
r.setMinWidth(183);
var s = "";
d.isFacebookImportExposed && (s = '               <a href="' + e.dict_media_uploader_banner_import_facebook_url + '" class="facebook"></a>');
var t = "";
d.isPicasaImportExposed && (t = '               <a href="' + e.dict_media_uploader_banner_import_picasa_url + '" class="picasa"></a>'), 
isMediaUploaderRedesignEnabled ? jQuery(document.body).append('<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200" rel="stylesheet" type="text/css"><div class="mediaUploaderMask"></div><div id="mediaUploader">   <div id="header">      <div class="headerText">           <div class="headerTextContent">               <div class="headerCaptionWrapper">                   <div id="media_uploader_checkbox">                      <input type="checkbox" id="media_uploader_hidden_checkbox" checked>                      <div id="media_uploader_icon_checkbox_background">                          <label for="media_uploader_hidden_checkbox"></label>                      </div>                   </div>                  <label for="media_uploader_hidden_checkbox" class="caption" style="font-size: 18px;"></label>               </div>               <div id="albumToolbar">                   <div class="wrapper"></div>               </div>           </div>          <div class="closeBtn">             <a href="#" id="mediaUploaderCloseBtn" class="close"><img src="' + AssetManager.spacer() + '"></a>          </div>       </div>       <div id="progress">           <div id="progressStatus"></div>           <div id="progressBar"></div>       </div>       <div id="errors">           <div class="status"><img class="errorIcon" src="' + AssetManager.spacer() + '"><span></span></div>           <div id="tooltipHandle"></div>      </div>   </div>   <div id="dropzoneContainer">       <div class="dropzone" id="dropzone">           <div class="dz-message">' + X(e, i) + '</div>       </div>   </div>   <div id="footer">       <div class="buttons">' + o.render() + n.render() + '</div>   </div>   <div id="banner">       <div id="app">           <div class="wrapper">               <span>' + e.dict_media_uploader_banner_app_caption + '</span>           </div>           <a href="' + a.iPhoneUrl + '" class="iphone"></a>           <a href="' + a.androidUrl + '" class="android"></a>       </div>       <div id="other">           <div id="import">               <div class="wrapper">                   <span>' + e.dict_media_uploader_banner_import_caption + "</span>               </div>" + s + t + '           </div>       </div>   </div></div><div class="mediaUploaderUploadingMask">   <a href="#" id="mediaUploaderUploadingCloseBtn" class="close"><img src="' + AssetManager.spacer() + '"></a>   <div id="mediaUploaderSpinner"></div>   <div id="uploadMessage">       <div class="wrapper">           <div class="caption"></div>           <div class="subcaption"></div>       </div>       <div class="buttons">' + l.render() + r.render() + "</div>   </div></div>") :jQuery(document.body).append('<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200" rel="stylesheet" type="text/css"><div class="mediaUploaderMask"></div><div id="mediaUploader">   <div id="header">      <div class="headerText">           <div class="headerTextContent">               <div class="headerCaptionWrapper">                   <div class="caption"></div>               </div>               <div id="albumToolbar">                  <div class="wrapper"></div>                  <a id="mediaUploaderCreateAlbumBtn" href="#"></a>             </div>          </div>          <div class="closeBtn">              <a href="#" id="mediaUploaderCloseBtn" class="close"><img src="' + AssetManager.spacer() + '"></a>          </div>       </div>       <div id="progress">           <div id="progressStatus"></div>           <div id="progressBar"></div>       </div>       <div id="errors">           <div class="status"><img class="errorIcon" src="' + AssetManager.spacer() + '"><span></span></div>           <div id="tooltipHandle"></div>       </div>   </div>   <div id="dropzoneContainer">       <div class="dropzone" id="dropzone">           <div class="dz-message">' + X(e, i) + '</div>       </div>   </div>   <div id="footer">       <div class="buttons">' + o.render() + n.render() + '</div>   </div>   <div id="banner">       <div id="app">           <div class="wrapper">               <span>' + e.dict_media_uploader_banner_app_caption + '</span>           </div>           <a href="' + a.iPhoneUrl + '" class="iphone"></a>           <a href="' + a.androidUrl + '" class="android"></a>       </div>       <div id="other">           <div id="import">               <div class="wrapper">                   <span>' + e.dict_media_uploader_banner_import_caption + "</span>               </div>" + s + t + '           </div>       </div>   </div></div><div class="mediaUploaderUploadingMask">   <a href="#" id="mediaUploaderUploadingCloseBtn" class="close"><img src="' + AssetManager.spacer() + '"></a>   <div id="mediaUploaderSpinner"></div>   <div id="uploadMessage">       <div class="wrapper">           <div class="caption"></div>           <div class="subcaption"></div>       </div>       <div class="buttons">' + l.render() + r.render() + "</div>   </div></div>"), 
a.isIphoneAppAvailable && a.isAndroidAppAvailable || (a.isIphoneAppAvailable || a.isAndroidAppAvailable ? a.isIphoneAppAvailable ? a.isAndroidAppAvailable || jQuery("#appButtons .android").hide() :jQuery("#appButtons .iphone").hide() :jQuery("#appButtons").hide());
}
function X(e, a) {
var i = '    <div class="dz-message-1"></div><div class="dz-message-2">' + e.dict_media_uploader_caption + "</div>";
return a || (i += '    <div class="dz-message-3">' + e.dict_media_uploader_subcaption + '</div><div class="dz-message-4">   <div class="css_button css_button_dialog css_button_confirm" style="min-width:263px;">' + e.dict_media_uploader_select_files + "</div></div>"), 
i;
}
function G() {
var e = '    <div id="tooltip">   <table cellpadding="0" cellspacing="0" border="0">    <tr>        <td class="text"><div>%1</div></td>        <td class="separator"></td>        <td class="close">            <a href="#">                <img src="' + AssetManager.spacer() + '" class="PK_Clickable PK_ClickableRedX">            </a>        </td>    </tr>   </table></div>';
return e;
}
function V(e, a, i) {
jQuery("#mediaUploaderCancelBtn").unbind("click").click(function() {
return a.uploadParams = {
comingFrom:"CancelButton"
}, i.cancel(e, a), !1;
}), jQuery("#mediaUploaderCloseBtn").unbind("click").click(function() {
return a.uploadParams = {
comingFrom:"CloseButton"
}, i.cancel(e, a), !1;
}), jQuery("#mediaUploaderUploadingCloseBtn").unbind("click").click(function() {
return B(e, a.onAfterCancel, i), !1;
}), isMediaUploaderRedesignEnabled && jQuery("#header #media_uploader_hidden_checkbox").unbind("change").change(function() {
!this.checked && jQuery(this).hasClass("individual_session") && writeActivityIndicator(fe.uncheckIndividualSuggestion, null, !0, 1), 
!this.checked && jQuery(this).hasClass("album_session") && writeActivityIndicator(fe.uncheckAlbumSuggestion, null, !0, 1);
});
}
function q(e, a, i) {
var d = [];
d.push('<select id="albums">'), isMediaUploaderRedesignEnabled && e.toString() === he && (d.push("<option id=" + he + " selected>" + i.dict_media_uploader_select_album + "</option>"), 
a = _.reject(a, function(e) {
return e.Album_ID === he;
}));
for (var o in a) d.push('<option id="' + a[o].Album_ID + '"' + (a[o].Album_ID == e ? "selected" :"") + ">" + a[o].Title + "</option>");
d.push("</select>"), jQuery("#albumToolbar .wrapper").html(d.join("")), isMediaUploaderRedesignEnabled && jQuery("#albums").change(function() {
writeActivityIndicator(fe.changeAlbum, null, !0, 1);
});
}
function J() {
return jQuery("#albums option:selected").attr("id");
}
function K(e, a, i, d, o, n, l) {
var r = jQuery("#header .caption");
if (isMediaUploaderRedesignEnabled) if (de.uploadParams && de.uploadParams.albumName) {
var s = de.uploadParams.albumName;
r.html(o.dict_media_uploader_the_uploaded_items_will_be_assigned_to_the_album.replace("%1", "<span>" + s + "</span>")), 
jQuery("#albumToolbar").hide(), jQuery("#media_uploader_hidden_checkbox").addClass("album_session"), 
jQuery("#media_uploader_hidden_checkbox").removeClass("individual_session"), jQuery("#media_uploader_checkbox").show(), 
ce = function() {
var i = jQuery("#header #media_uploader_hidden_checkbox").is(":checked");
return i ? l.upload(e, a, null, d, n) :l.upload(e, he, null, d, n), !1;
};
} else r.html(o.dict_media_uploader_site_album_caption), q(a, i, o), Object.keys(i).length > 1 ? (r.show(), 
jQuery("#albumToolbar").show()) :(r.hide(), jQuery("#albumToolbar").hide()), jQuery("#media_uploader_checkbox").hide(), 
ce = function() {
return l.upload(e, J(), null, d, n), !1;
}; else r.html(o.dict_media_uploader_site_album_caption), jQuery("#media_uploader_checkbox").hide(), 
q(a, i, o), jQuery("#albumToolbar").show(), jQuery("#mediaUploaderCreateAlbumBtn").unbind("click").click(function() {
return photos.createAlbumPopup.openCreateAlbumPopup(e, o.dict_media_uploader_language_code, {
onAlbumCreateCallback:l.albumCreated
}), !1;
}), ce = function() {
return l.upload(e, J(), null, d, n), !1;
};
jQuery("#banner").show(), jQuery("#mediaUploaderConfirmBtn").unbind("click").click(ce), 
V(d, n, l);
}
function Y(e, a, i, d, o, n, l) {
var r = jQuery("#header .caption");
isMediaUploaderRedesignEnabled ? (r.html(o.dict_media_uploader_all_uploaded_items_will_be_tagged_with.replace("%1", "<span>" + e + "</span>")), 
jQuery("#media_uploader_hidden_checkbox").addClass("individual_session"), jQuery("#media_uploader_hidden_checkbox").removeClass("album_session"), 
jQuery("#media_uploader_checkbox").show(), ce = function() {
var e = jQuery("#header #media_uploader_hidden_checkbox").is(":checked");
return e ? l.upload(a, null, i, d, n) :l.upload(a, he, null, d, n), !1;
}) :(r.html(o.dict_media_uploader_individual_album_caption.replace("%1", "<span>" + e + "</span>")), 
jQuery("#media_uploader_checkbox").hide(), ce = function() {
return l.upload(a, null, i, d, n), !1;
}), jQuery("#albumToolbar").hide(), jQuery("#banner").show(), jQuery("#mediaUploaderConfirmBtn").unbind("click").click(ce), 
V(d, n, l);
}
function $(e, a, i) {
Dropzone.autoDiscover = !1;
var d = {
url:"/FP/API/Photos/media-uploader-add.php",
addRemoveLinks:!0,
acceptedFiles:s(e),
dictDefaultMessage:"",
dictFallbackMessage:"",
dictFallbackText:"",
dictFileTooBig:"",
dictInvalidFileType:"",
dictResponseError:"",
dictCancelUpload:"",
dictCancelUploadConfirmation:"",
dictRemoveFile:"",
dictRemoveFileConfirmation:"",
dictMaxFilesExceeded:"",
thumbnailWidth:222,
thumbnailHeight:222,
previewTemplate:'<div class="dz-preview"><div class="dz-details"><img data-dz-thumbnail src="' + AssetManager.spacer() + '"/><div class="dz-filename-mask"></div><div class="dz-filename"><span data-dz-name></span></div></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div></div>'
};
jQuery("#mediaUploader").on("drop dragover", function(e) {
e.preventDefault(), e.stopPropagation();
}), ae = new Dropzone("#dropzone", d), ae.on("addedfile", function(d) {
z(d, i, e, a);
}), ae.on("success", function(e, a) {
T(e, a, i);
}), ae.on("totaluploadprogress", function(e, a, d) {
O(e, a, d, i);
}), ae.on("queuecomplete", function() {
E(i);
}), ae.on("removedfile", function(e) {
R(e, i);
}), ae.on("reset", D);
}
function Z(e) {
ae.on("sending", function(a, i, d) {
d.append("uploadSessionGuid", e);
});
}
var ee = !1, ae = null, ie = {
uploadParams:null,
onBeforeShowSuccess:function(e, a, i) {
return !0;
},
onAfterUpload:null,
onAfterCancel:null
}, de = null, oe = /#upload-media-([0-9]+)-([0-9]+)-([0-9]+)-([0-1])/, ne = null, le = 0, re = 0, se = [], te = 0, ue = !1, ce = function() {}, pe = e, me = a, ve = i, he = d, _e = o, fe = n;
this.getIsSupported = function() {
var e = features.exposureService.isFeatureEnabled("MediaUploader.Mobile.Exposure");
return pe && !e ? !1 :jQuery("html").hasClass("filereader");
}, this.openSiteAlbumUploader = function(e, a, i) {
return this.getIsSupported() ? void N(e, a, null, i, this) :void r(e);
}, this.openIndividualAlbumUploader = function(e, a, i) {
return this.getIsSupported() ? void N(e, null, a, i, this) :void r(e);
}, this.openUploaderFromHash = function(e) {
var a = l();
if (null != a) {
var i = a.siteId, d = a.albumId, o = a.individualId;
null != o ? this.getIsSupported() && this.openIndividualAlbumUploader(i, o, e) :this.getIsSupported() && this.openSiteAlbumUploader(i, d, e);
}
}, this.albumCreated = function(e, a) {
W(e, a);
}, this.upload = function(e, a, i, d, o) {
isMediaUploaderRedesignEnabled && writeActivityIndicator(fe.clickOnDone, null, !0, 1), 
A();
var n = ae.getAcceptedFiles(), l = {};
_.each(n, function(e) {
var a = jQuery.parseJSON(e.xhr.response);
"undefined" != typeof a.data && "undefined" != typeof a.data.sandboxFileName && (l[a.data.sandboxFileName] = e.name);
}), w(), jQuery.ajax({
type:"POST",
url:"/FP/API/Photos/media-uploader-upload.php",
dataType:"json",
data:jQuery.extend({
siteId:e,
albumId:a,
individualId:i,
uploadSessionGuid:d,
sandboxFiles:l,
lang:ve
}, o.uploadParams),
mediaUploader:this,
success:function(n) {
0 == n.status && (null != a ? o.onBeforeShowSuccess(e, a, i) && x(n.data.numUploadedFiles, n.data.albumName, n.data.albumPageUrl, d, o, ne, this.mediaUploader) :I(d, o.onAfterUpload, this.mediaUploader));
}
});
}, this.cancel = function(e, a) {
ae.getAcceptedFiles().length > 0 ? C(e, a, ne, this) :(isMediaUploaderRedesignEnabled && writeActivityIndicator(fe.clickOnXMainScreen, null, !0, 1), 
B(e, a.onAfterCancel, this));
};
}, pagesWhereNeedToReloadWhenDone = [ "HomePageManager", "PAMAlbumsPageManager", "AlbumsPageManager", "PhotoWorldPageManager" ], activityIds = {
mainUploadPageView:"mediaUploader.mainUploadPageView",
uncheckAlbumSuggestion:"mediaUploader.uncheckAlbumSuggestion",
uncheckIndividualSuggestion:"mediaUploader.uncheckIndividualSuggestion",
changeAlbum:"mediaUploader.changeAlbum",
clickOnXMainScreen:"mediaUploader.clickOnXMainScreen",
clickOnCancelApprovalOnPopup:"mediaUploader.clickOnCancelApprovalOnPopup",
clickOnXApprovalOnPopup:"mediaUploader.clickOnXApprovalOnPopup",
clickOnDone:"mediaUploader.clickOnDone",
clickOnViewAlbum:"mediaUploader.clickOnViewAlbum"
}, photos = photos || {}, isOnMobile = !1, shouldReloadWhenDone = !1, mediaUploaderlLanguageCode = "EN", defaultFamilyPhotosAlbumId = "2", defaultFamilyPhotosAlbumName = "Family photos";

"undefined" != typeof isMobile && (isOnMobile = isMobile), "undefined" != typeof currentPageManagerClass && (shouldReloadWhenDone = _.indexOf(pagesWhereNeedToReloadWhenDone, currentPageManagerClass) >= 0), 
"undefined" != typeof languageCode && (mediaUploaderlLanguageCode = languageCode), 
photos.mediaUploader = new MediaUploader(isOnMobile, shouldReloadWhenDone, mediaUploaderlLanguageCode, defaultFamilyPhotosAlbumId, defaultFamilyPhotosAlbumName, activityIds);
!function(n) {
n.MobilePromotionalBannerService = function() {
function n(n, i) {
o.writeActivityIndicator(e + "." + n), o.googleAnalyticsTracking.trackEvent(l, l + " " + i, c, null, null, "GTM event To GA");
}
var o, i = this, e = "mobile-web-onboarding.MobilePromotionalBanner", t = "BannerDismissed", r = "GetTheAppButtonClicked", a = "BannerViewed", l = "App Promotional", c = "banner", m = "dismissed", d = "button clicked", s = "viewed";
i.init = function(n) {
o = n ? n :window;
}, i.reportPromotionDismissal = function() {
n(t, m);
}, i.reportPromotionSuccess = function() {
n(r, d);
}, i.reportPromotionViewed = function() {
n(a, s);
};
};
}(window.mobilePromotionalBanner = window.mobilePromotionalBanner || {});
!function(n) {
n.MobilePromotionalBannerController = function() {
var n;
this.init = function(i) {
n = i.mobilePromotionalBannerService;
}, this.bindDismissBannerAction = function(i, o, t, e) {
t && t.length > 0 && t.on("click", function() {
i.slideUp(), o.slideUp(), e.remove(), n.reportPromotionDismissal();
});
}, this.bindAppButtons = function(i) {
i && i.length > 0 && i.on("click", function() {
n.reportPromotionSuccess();
});
}, this.bindBannerViewed = function(i) {
i && i.is(":visible") && n.reportPromotionViewed();
};
};
}(window.mobilePromotionalBanner = window.mobilePromotionalBanner || {});
"undefined" != typeof jQuery && !function() {
"use strict";
var n = window.mobilePromotionalBanner, o = jQuery("#promotional_banner"), e = jQuery("#promotional_banner_dismiss"), i = jQuery(".promotional_action"), r = jQuery(".promotional_banner_wrapper"), a = jQuery("#promotional_banner_body_styling"), t = new n.MobilePromotionalBannerService();
t.init();
var l = new n.MobilePromotionalBannerController();
l.init({
mobilePromotionalBannerService:t
}), l.bindDismissBannerAction(o, r, e, a), l.bindAppButtons(i), l.bindBannerViewed(o);
}();
