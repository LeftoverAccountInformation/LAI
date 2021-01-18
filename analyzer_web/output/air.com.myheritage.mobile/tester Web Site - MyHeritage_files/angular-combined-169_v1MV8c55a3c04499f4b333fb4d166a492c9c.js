/* #vfic now: 30 Aug 2019 13:57:57 on web256 */ 
!function(t) {
"use strict";
function e(t) {
return w(t) ? void (b(t.objectMaxDepth) && (Xr.objectMaxDepth = n(t.objectMaxDepth) ? t.objectMaxDepth :NaN)) :Xr;
}
function n(t) {
return E(t) && t > 0;
}
function r(t, e) {
return e = e || Error, function() {
var n, r, i = arguments[0], o = arguments[1], a = "[" + (t ? t + ":" :"") + i + "] ", s = G(arguments, 2).map(function(t) {
return St(t, Xr.objectMaxDepth);
});
for (a += o.replace(/\{\d+\}/g, function(t) {
var e = +t.slice(1, -1);
return e < s.length ? s[e] :t;
}), a += "\nhttp://errors.angularjs.org/1.6.9/" + (t ? t + "/" :"") + i, r = 0, 
n = "?"; r < s.length; r++, n = "&") a += n + "p" + r + "=" + encodeURIComponent(s[r]);
return new e(a);
};
}
function i(t) {
if (null == t || M(t)) return !1;
if (bi(t) || C(t) || ui && t instanceof ui) return !0;
var e = "length" in Object(t) && t.length;
return E(e) && (e >= 0 && (e - 1 in t || t instanceof Array) || "function" == typeof t.item);
}
function o(t, e, n) {
var r, a;
if (t) if (A(t)) for (r in t) "prototype" !== r && "length" !== r && "name" !== r && t.hasOwnProperty(r) && e.call(n, t[r], r, t); else if (bi(t) || i(t)) {
var s = "object" != typeof t;
for (r = 0, a = t.length; a > r; r++) (s || r in t) && e.call(n, t[r], r, t);
} else if (t.forEach && t.forEach !== o) t.forEach(e, n, t); else if (x(t)) for (r in t) e.call(n, t[r], r, t); else if ("function" == typeof t.hasOwnProperty) for (r in t) t.hasOwnProperty(r) && e.call(n, t[r], r, t); else for (r in t) ni.call(t, r) && e.call(n, t[r], r, t);
return t;
}
function a(t, e, n) {
for (var r = Object.keys(t).sort(), i = 0; i < r.length; i++) e.call(n, t[r[i]], r[i]);
return r;
}
function s(t) {
return function(e, n) {
t(n, e);
};
}
function u() {
return ++gi;
}
function c(t, e) {
e ? t.$$hashKey = e :delete t.$$hashKey;
}
function l(t, e, n) {
for (var r = t.$$hashKey, i = 0, o = e.length; o > i; ++i) {
var a = e[i];
if (w(a) || A(a)) for (var s = Object.keys(a), u = 0, f = s.length; f > u; u++) {
var h = s[u], p = a[h];
n && w(p) ? S(p) ? t[h] = new Date(p.valueOf()) :O(p) ? t[h] = new RegExp(p) :p.nodeName ? t[h] = p.cloneNode(!0) :R(p) ? t[h] = p.clone() :(w(t[h]) || (t[h] = bi(p) ? [] :{}), 
l(t[h], [ p ], !0)) :t[h] = p;
}
}
return c(t, r), t;
}
function f(t) {
return l(t, fi.call(arguments, 1), !1);
}
function h(t) {
return l(t, fi.call(arguments, 1), !0);
}
function p(t) {
return parseInt(t, 10);
}
function d(t, e) {
return f(Object.create(t), e);
}
function $() {}
function v(t) {
return t;
}
function m(t) {
return function() {
return t;
};
}
function g(t) {
return A(t.toString) && t.toString !== di;
}
function y(t) {
return "undefined" == typeof t;
}
function b(t) {
return "undefined" != typeof t;
}
function w(t) {
return null !== t && "object" == typeof t;
}
function x(t) {
return null !== t && "object" == typeof t && !$i(t);
}
function C(t) {
return "string" == typeof t;
}
function E(t) {
return "number" == typeof t;
}
function S(t) {
return "[object Date]" === di.call(t);
}
function k(t) {
var e = di.call(t);
switch (e) {
case "[object Error]":
return !0;

case "[object Exception]":
return !0;

case "[object DOMException]":
return !0;

default:
return t instanceof Error;
}
}
function A(t) {
return "function" == typeof t;
}
function O(t) {
return "[object RegExp]" === di.call(t);
}
function M(t) {
return t && t.window === t;
}
function V(t) {
return t && t.$evalAsync && t.$watch;
}
function T(t) {
return "[object File]" === di.call(t);
}
function N(t) {
return "[object FormData]" === di.call(t);
}
function I(t) {
return "[object Blob]" === di.call(t);
}
function j(t) {
return "boolean" == typeof t;
}
function D(t) {
return t && A(t.then);
}
function P(t) {
return t && E(t.length) && wi.test(di.call(t));
}
function _(t) {
return "[object ArrayBuffer]" === di.call(t);
}
function R(t) {
return !(!t || !(t.nodeName || t.prop && t.attr && t.find));
}
function U(t) {
var e, n = {}, r = t.split(",");
for (e = 0; e < r.length; e++) n[r[e]] = !0;
return n;
}
function L(t) {
return ri(t.nodeName || t[0] && t[0].nodeName);
}
function q(t, e) {
return -1 !== Array.prototype.indexOf.call(t, e);
}
function F(t, e) {
var n = t.indexOf(e);
return n >= 0 && t.splice(n, 1), n;
}
function H(t, e, r) {
function i(t, e, n) {
if (n--, 0 > n) return "...";
var r, i = e.$$hashKey;
if (bi(t)) for (var o = 0, s = t.length; s > o; o++) e.push(a(t[o], n)); else if (x(t)) for (r in t) e[r] = a(t[r], n); else if (t && "function" == typeof t.hasOwnProperty) for (r in t) t.hasOwnProperty(r) && (e[r] = a(t[r], n)); else for (r in t) ni.call(t, r) && (e[r] = a(t[r], n));
return c(e, i), e;
}
function a(t, e) {
if (!w(t)) return t;
var n = u.indexOf(t);
if (-1 !== n) return l[n];
if (M(t) || V(t)) throw vi("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
var r = !1, o = s(t);
return void 0 === o && (o = bi(t) ? [] :Object.create($i(t)), r = !0), u.push(t), 
l.push(o), r ? i(t, o, e) :o;
}
function s(t) {
switch (di.call(t)) {
case "[object Int8Array]":
case "[object Int16Array]":
case "[object Int32Array]":
case "[object Float32Array]":
case "[object Float64Array]":
case "[object Uint8Array]":
case "[object Uint8ClampedArray]":
case "[object Uint16Array]":
case "[object Uint32Array]":
return new t.constructor(a(t.buffer), t.byteOffset, t.length);

case "[object ArrayBuffer]":
if (!t.slice) {
var e = new ArrayBuffer(t.byteLength);
return new Uint8Array(e).set(new Uint8Array(t)), e;
}
return t.slice(0);

case "[object Boolean]":
case "[object Number]":
case "[object String]":
case "[object Date]":
return new t.constructor(t.valueOf());

case "[object RegExp]":
var n = new RegExp(t.source, t.toString().match(/[^\/]*$/)[0]);
return n.lastIndex = t.lastIndex, n;

case "[object Blob]":
return new t.constructor([ t ], {
type:t.type
});
}
return A(t.cloneNode) ? t.cloneNode(!0) :void 0;
}
var u = [], l = [];
if (r = n(r) ? r :NaN, e) {
if (P(e) || _(e)) throw vi("cpta", "Can't copy! TypedArray destination cannot be mutated.");
if (t === e) throw vi("cpi", "Can't copy! Source and destination are identical.");
return bi(e) ? e.length = 0 :o(e, function(t, n) {
"$$hashKey" !== n && delete e[n];
}), u.push(t), l.push(e), i(t, e, r);
}
return a(t, r);
}
function B(t, e) {
return t === e || t !== t && e !== e;
}
function z(t, e) {
if (t === e) return !0;
if (null === t || null === e) return !1;
if (t !== t && e !== e) return !0;
var n, r, i, o = typeof t, a = typeof e;
if (o === a && "object" === o) {
if (!bi(t)) {
if (S(t)) return S(e) ? B(t.getTime(), e.getTime()) :!1;
if (O(t)) return O(e) ? t.toString() === e.toString() :!1;
if (V(t) || V(e) || M(t) || M(e) || bi(e) || S(e) || O(e)) return !1;
i = bt();
for (r in t) if ("$" !== r.charAt(0) && !A(t[r])) {
if (!z(t[r], e[r])) return !1;
i[r] = !0;
}
for (r in e) if (!(r in i) && "$" !== r.charAt(0) && b(e[r]) && !A(e[r])) return !1;
return !0;
}
if (!bi(e)) return !1;
if ((n = t.length) === e.length) {
for (r = 0; n > r; r++) if (!z(t[r], e[r])) return !1;
return !0;
}
}
return !1;
}
function W(t, e, n) {
return t.concat(fi.call(e, n));
}
function G(t, e) {
return fi.call(t, e || 0);
}
function J(t, e) {
var n = arguments.length > 2 ? G(arguments, 2) :[];
return !A(e) || e instanceof RegExp ? e :n.length ? function() {
return arguments.length ? e.apply(t, W(n, arguments, 0)) :e.apply(t, n);
} :function() {
return arguments.length ? e.apply(t, arguments) :e.call(t);
};
}
function K(e, n) {
var r = n;
return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1) ? r = void 0 :M(n) ? r = "$WINDOW" :n && t.document === n ? r = "$DOCUMENT" :V(n) && (r = "$SCOPE"), 
r;
}
function Z(t, e) {
return y(t) ? void 0 :(E(e) || (e = e ? 2 :null), JSON.stringify(t, K, e));
}
function Y(t) {
return C(t) ? JSON.parse(t) :t;
}
function Q(t, e) {
t = t.replace(ki, "");
var n = Date.parse("Jan 01, 1970 00:00:00 " + t) / 6e4;
return yi(n) ? e :n;
}
function X(t, e) {
return t = new Date(t.getTime()), t.setMinutes(t.getMinutes() + e), t;
}
function tt(t, e, n) {
n = n ? -1 :1;
var r = t.getTimezoneOffset(), i = Q(e, r);
return X(t, n * (i - r));
}
function et(t) {
t = ui(t).clone().empty();
var e = ui("<div>").append(t).html();
try {
return t[0].nodeType === Ii ? ri(e) :e.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/, function(t, e) {
return "<" + ri(e);
});
} catch (n) {
return ri(e);
}
}
function nt(t) {
try {
return decodeURIComponent(t);
} catch (e) {}
}
function rt(t) {
var e = {};
return o((t || "").split("&"), function(t) {
var n, r, i;
t && (r = t = t.replace(/\+/g, "%20"), n = t.indexOf("="), -1 !== n && (r = t.substring(0, n), 
i = t.substring(n + 1)), r = nt(r), b(r) && (i = b(i) ? nt(i) :!0, ni.call(e, r) ? bi(e[r]) ? e[r].push(i) :e[r] = [ e[r], i ] :e[r] = i));
}), e;
}
function it(t) {
var e = [];
return o(t, function(t, n) {
bi(t) ? o(t, function(t) {
e.push(at(n, !0) + (t === !0 ? "" :"=" + at(t, !0)));
}) :e.push(at(n, !0) + (t === !0 ? "" :"=" + at(t, !0)));
}), e.length ? e.join("&") :"";
}
function ot(t) {
return at(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
}
function at(t, e) {
return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, e ? "%20" :"+");
}
function st(t, e) {
var n, r, i = Ai.length;
for (r = 0; i > r; ++r) if (n = Ai[r] + e, C(n = t.getAttribute(n))) return n;
return null;
}
function ut(e) {
var n = e.currentScript;
if (!n) return !0;
if (!(n instanceof t.HTMLScriptElement || n instanceof t.SVGScriptElement)) return !1;
var r = n.attributes, i = [ r.getNamedItem("src"), r.getNamedItem("href"), r.getNamedItem("xlink:href") ];
return i.every(function(t) {
if (!t) return !0;
if (!t.value) return !1;
var n = e.createElement("a");
if (n.href = t.value, e.location.origin === n.origin) return !0;
switch (n.protocol) {
case "http:":
case "https:":
case "ftp:":
case "blob:":
case "file:":
case "data:":
return !0;

default:
return !1;
}
});
}
function ct(e, n) {
var r, i, a = {};
if (o(Ai, function(t) {
var n = t + "app";
!r && e.hasAttribute && e.hasAttribute(n) && (r = e, i = e.getAttribute(n));
}), o(Ai, function(t) {
var n, o = t + "app";
!r && (n = e.querySelector("[" + o.replace(":", "\\:") + "]")) && (r = n, i = n.getAttribute(o));
}), r) {
if (!Oi) return void t.console.error("AngularJS: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match.");
a.strictDi = null !== st(r, "strict-di"), n(r, i ? [ i ] :[], a);
}
}
function lt(e, n, r) {
w(r) || (r = {});
var i = {
strictDi:!1
};
r = f(i, r);
var a = function() {
if (e = ui(e), e.injector()) {
var i = e[0] === t.document ? "document" :et(e);
throw vi("btstrpd", "App already bootstrapped with this element '{0}'", i.replace(/</, "&lt;").replace(/>/, "&gt;"));
}
n = n || [], n.unshift([ "$provide", function(t) {
t.value("$rootElement", e);
} ]), r.debugInfoEnabled && n.push([ "$compileProvider", function(t) {
t.debugInfoEnabled(!0);
} ]), n.unshift("ng");
var o = he(n, r.strictDi);
return o.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(t, e, n, r) {
t.$apply(function() {
e.data("$injector", r), n(e)(t);
});
} ]), o;
}, s = /^NG_ENABLE_DEBUG_INFO!/, u = /^NG_DEFER_BOOTSTRAP!/;
return t && s.test(t.name) && (r.debugInfoEnabled = !0, t.name = t.name.replace(s, "")), 
t && !u.test(t.name) ? a() :(t.name = t.name.replace(u, ""), mi.resumeBootstrap = function(t) {
return o(t, function(t) {
n.push(t);
}), a();
}, void (A(mi.resumeDeferredBootstrap) && mi.resumeDeferredBootstrap()));
}
function ft() {
t.name = "NG_ENABLE_DEBUG_INFO!" + t.name, t.location.reload();
}
function ht(t) {
var e = mi.element(t).injector();
if (!e) throw vi("test", "no injector found for element argument to getTestability");
return e.get("$$testability");
}
function pt(t, e) {
return e = e || "_", t.replace(Mi, function(t, n) {
return (n ? e :"") + t.toLowerCase();
});
}
function dt() {
var e;
if (!Vi) {
var n = Si();
ci = y(n) ? t.jQuery :n ? t[n] :void 0, ci && ci.fn.on ? (ui = ci, f(ci.fn, {
scope:Zi.scope,
isolateScope:Zi.isolateScope,
controller:Zi.controller,
injector:Zi.injector,
inheritedData:Zi.inheritedData
}), e = ci.cleanData, ci.cleanData = function(t) {
for (var n, r, i = 0; null != (r = t[i]); i++) n = ci._data(r, "events"), n && n.$destroy && ci(r).triggerHandler("$destroy");
e(t);
}) :ui = _t, mi.element = ui, Vi = !0;
}
}
function $t(t, e, n) {
if (!t) throw vi("areq", "Argument '{0}' is {1}", e || "?", n || "required");
return t;
}
function vt(t, e, n) {
return n && bi(t) && (t = t[t.length - 1]), $t(A(t), e, "not a function, got " + (t && "object" == typeof t ? t.constructor.name || "Object" :typeof t)), 
t;
}
function mt(t, e) {
if ("hasOwnProperty" === t) throw vi("badname", "hasOwnProperty is not a valid {0} name", e);
}
function gt(t, e, n) {
if (!e) return t;
for (var r, i = e.split("."), o = t, a = i.length, s = 0; a > s; s++) r = i[s], 
t && (t = (o = t)[r]);
return !n && A(t) ? J(o, t) :t;
}
function yt(t) {
for (var e, n = t[0], r = t[t.length - 1], i = 1; n !== r && (n = n.nextSibling); i++) (e || t[i] !== n) && (e || (e = ui(fi.call(t, 0, i))), 
e.push(n));
return e || t;
}
function bt() {
return Object.create(null);
}
function wt(t) {
if (null == t) return "";
switch (typeof t) {
case "string":
break;

case "number":
t = "" + t;
break;

default:
t = !g(t) || bi(t) || S(t) ? Z(t) :t.toString();
}
return t;
}
function xt(t) {
function e(t, e, n) {
return t[e] || (t[e] = n());
}
var n = r("$injector"), i = r("ng"), o = e(t, "angular", Object);
return o.$$minErr = o.$$minErr || r, e(o, "module", function() {
var t = {};
return function(r, o, a) {
var s = {}, u = function(t, e) {
if ("hasOwnProperty" === t) throw i("badname", "hasOwnProperty is not a valid {0} name", e);
};
return u(r, "module"), o && t.hasOwnProperty(r) && (t[r] = null), e(t, r, function() {
function t(t, e, n, r) {
return r || (r = u), function() {
return r[n || "push"]([ t, e, arguments ]), h;
};
}
function e(t, e, n) {
return n || (n = u), function(i, o) {
return o && A(o) && (o.$$moduleName = r), n.push([ t, e, arguments ]), h;
};
}
if (!o) throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
var u = [], c = [], l = [], f = t("$injector", "invoke", "push", c), h = {
_invokeQueue:u,
_configBlocks:c,
_runBlocks:l,
info:function(t) {
if (b(t)) {
if (!w(t)) throw i("aobj", "Argument '{0}' must be an object", "value");
return s = t, this;
}
return s;
},
requires:o,
name:r,
provider:e("$provide", "provider"),
factory:e("$provide", "factory"),
service:e("$provide", "service"),
value:t("$provide", "value"),
constant:t("$provide", "constant", "unshift"),
decorator:e("$provide", "decorator", c),
animation:e("$animateProvider", "register"),
filter:e("$filterProvider", "register"),
controller:e("$controllerProvider", "register"),
directive:e("$compileProvider", "directive"),
component:e("$compileProvider", "component"),
config:f,
run:function(t) {
return l.push(t), this;
}
};
return a && f(a), h;
});
};
});
}
function Ct(t, e) {
if (bi(t)) {
e = e || [];
for (var n = 0, r = t.length; r > n; n++) e[n] = t[n];
} else if (w(t)) {
e = e || {};
for (var i in t) ("$" !== i.charAt(0) || "$" !== i.charAt(1)) && (e[i] = t[i]);
}
return e || t;
}
function Et(t, e) {
var r = [];
return n(e) && (t = mi.copy(t, null, e)), JSON.stringify(t, function(t, e) {
if (e = K(t, e), w(e)) {
if (r.indexOf(e) >= 0) return "...";
r.push(e);
}
return e;
});
}
function St(t, e) {
return "function" == typeof t ? t.toString().replace(/ \{[\s\S]*$/, "") :y(t) ? "undefined" :"string" != typeof t ? Et(t, e) :t;
}
function kt(n) {
f(n, {
errorHandlingConfig:e,
bootstrap:lt,
copy:H,
extend:f,
merge:h,
equals:z,
element:ui,
forEach:o,
injector:he,
noop:$,
bind:J,
toJson:Z,
fromJson:Y,
identity:v,
isUndefined:y,
isDefined:b,
isString:C,
isFunction:A,
isObject:w,
isNumber:E,
isElement:R,
isArray:bi,
version:_i,
isDate:S,
lowercase:ri,
uppercase:ii,
callbacks:{
$$counter:0
},
getTestability:ht,
reloadWithDebugInfo:ft,
$$minErr:r,
$$csp:Ei,
$$encodeUriSegment:ot,
$$encodeUriQuery:at,
$$stringify:wt
}), li = xt(t), li("ng", [ "ngLocale" ], [ "$provide", function(t) {
t.provider({
$$sanitizeUri:Pn
}), t.provider("$compile", Ce).directive({
a:sa,
input:Aa,
textarea:Aa,
form:pa,
script:ws,
select:Es,
option:Ss,
ngBind:Va,
ngBindHtml:Na,
ngBindTemplate:Ta,
ngClass:ja,
ngClassEven:Pa,
ngClassOdd:Da,
ngCloak:_a,
ngController:Ra,
ngForm:da,
ngHide:ds,
ngIf:qa,
ngInclude:Fa,
ngInit:Ba,
ngNonBindable:os,
ngPluralize:cs,
ngRepeat:ls,
ngShow:ps,
ngStyle:$s,
ngSwitch:vs,
ngSwitchWhen:ms,
ngSwitchDefault:gs,
ngOptions:us,
ngTransclude:bs,
ngModel:ns,
ngList:za,
ngChange:Ia,
pattern:As,
ngPattern:As,
required:ks,
ngRequired:ks,
minlength:Ms,
ngMinlength:Ms,
maxlength:Os,
ngMaxlength:Os,
ngValue:Ma,
ngModelOptions:is
}).directive({
ngInclude:Ha
}).directive(ua).directive(Ua), t.provider({
$anchorScroll:pe,
$animate:$o,
$animateCss:go,
$$animateJs:ho,
$$animateQueue:po,
$$AnimateRunner:mo,
$$animateAsyncRun:vo,
$browser:ye,
$cacheFactory:be,
$controller:Me,
$document:Ve,
$$isDocumentHidden:Te,
$exceptionHandler:Ne,
$filter:Yn,
$$forceReflow:So,
$interpolate:We,
$interval:Ge,
$http:Fe,
$httpParamSerializer:je,
$httpParamSerializerJQLike:De,
$httpBackend:Be,
$xhrFactory:He,
$jsonpCallbacks:Io,
$location:ln,
$log:fn,
$parse:An,
$rootScope:Dn,
$q:On,
$$q:Mn,
$sce:qn,
$sceDelegate:Ln,
$sniffer:Fn,
$templateCache:we,
$templateRequest:Hn,
$$testability:Bn,
$timeout:zn,
$window:Jn,
$$rAF:jn,
$$jqLite:oe,
$$Map:no,
$$cookieReader:Zn
});
} ]).info({
angularVersion:"1.6.9"
});
}
function At() {
return ++Ui;
}
function Ot(t) {
return Vt(t.replace(qi, "ms-"));
}
function Mt(t, e) {
return e.toUpperCase();
}
function Vt(t) {
return t.replace(Li, Mt);
}
function Tt(t) {
return !zi.test(t);
}
function Nt(t) {
var e = t.nodeType;
return e === Ti || !e || e === Di;
}
function It(t) {
for (var e in Ri[t.ng339]) return !0;
return !1;
}
function jt(t, e) {
var n, r, i, a, s = e.createDocumentFragment(), u = [];
if (Tt(t)) u.push(e.createTextNode(t)); else {
for (n = s.appendChild(e.createElement("div")), r = (Wi.exec(t) || [ "", "" ])[1].toLowerCase(), 
i = Ji[r] || Ji._default, n.innerHTML = i[1] + t.replace(Gi, "<$1></$2>") + i[2], 
a = i[0]; a--; ) n = n.lastChild;
u = W(u, n.childNodes), n = s.firstChild, n.textContent = "";
}
return s.textContent = "", s.innerHTML = "", o(u, function(t) {
s.appendChild(t);
}), s;
}
function Dt(e, n) {
n = n || t.document;
var r;
return (r = Bi.exec(e)) ? [ n.createElement(r[1]) ] :(r = jt(e, n)) ? r.childNodes :[];
}
function Pt(t, e) {
var n = t.parentNode;
n && n.replaceChild(e, t), e.appendChild(t);
}
function _t(t) {
if (t instanceof _t) return t;
var e;
if (C(t) && (t = xi(t), e = !0), !(this instanceof _t)) {
if (e && "<" !== t.charAt(0)) throw Hi("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
return new _t(t);
}
e ? Gt(this, Dt(t)) :A(t) ? Xt(t) :Gt(this, t);
}
function Rt(t) {
return t.cloneNode(!0);
}
function Ut(t, e) {
!e && Nt(t) && ui.cleanData([ t ]), t.querySelectorAll && ui.cleanData(t.querySelectorAll("*"));
}
function Lt(t, e, n, r) {
if (b(r)) throw Hi("offargs", "jqLite#off() does not support the `selector` argument");
var i = Ft(t), a = i && i.events, s = i && i.handle;
if (s) if (e) {
var u = function(e) {
var r = a[e];
b(n) && F(r || [], n), b(n) && r && r.length > 0 || (t.removeEventListener(e, s), 
delete a[e]);
};
o(e.split(" "), function(t) {
u(t), Fi[t] && u(Fi[t]);
});
} else for (e in a) "$destroy" !== e && t.removeEventListener(e, s), delete a[e];
}
function qt(t, e) {
var n = t.ng339, r = n && Ri[n];
if (r) {
if (e) return void delete r.data[e];
r.handle && (r.events.$destroy && r.handle({}, "$destroy"), Lt(t)), delete Ri[n], 
t.ng339 = void 0;
}
}
function Ft(t, e) {
var n = t.ng339, r = n && Ri[n];
return e && !r && (t.ng339 = n = At(), r = Ri[n] = {
events:{},
data:{},
handle:void 0
}), r;
}
function Ht(t, e, n) {
if (Nt(t)) {
var r, i = b(n), o = !i && e && !w(e), a = !e, s = Ft(t, !o), u = s && s.data;
if (i) u[Vt(e)] = n; else {
if (a) return u;
if (o) return u && u[Vt(e)];
for (r in e) u[Vt(r)] = e[r];
}
}
}
function Bt(t, e) {
return t.getAttribute ? (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ") > -1 :!1;
}
function zt(t, e) {
if (e && t.setAttribute) {
var n = (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " "), r = n;
o(e.split(" "), function(t) {
t = xi(t), r = r.replace(" " + t + " ", " ");
}), r !== n && t.setAttribute("class", xi(r));
}
}
function Wt(t, e) {
if (e && t.setAttribute) {
var n = (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " "), r = n;
o(e.split(" "), function(t) {
t = xi(t), -1 === r.indexOf(" " + t + " ") && (r += t + " ");
}), r !== n && t.setAttribute("class", xi(r));
}
}
function Gt(t, e) {
if (e) if (e.nodeType) t[t.length++] = e; else {
var n = e.length;
if ("number" == typeof n && e.window !== e) {
if (n) for (var r = 0; n > r; r++) t[t.length++] = e[r];
} else t[t.length++] = e;
}
}
function Jt(t, e) {
return Kt(t, "$" + (e || "ngController") + "Controller");
}
function Kt(t, e, n) {
t.nodeType === Di && (t = t.documentElement);
for (var r = bi(e) ? e :[ e ]; t; ) {
for (var i = 0, o = r.length; o > i; i++) if (b(n = ui.data(t, r[i]))) return n;
t = t.parentNode || t.nodeType === Pi && t.host;
}
}
function Zt(t) {
for (Ut(t, !0); t.firstChild; ) t.removeChild(t.firstChild);
}
function Yt(t, e) {
e || Ut(t);
var n = t.parentNode;
n && n.removeChild(t);
}
function Qt(e, n) {
n = n || t, "complete" === n.document.readyState ? n.setTimeout(e) :ui(n).on("load", e);
}
function Xt(e) {
function n() {
t.document.removeEventListener("DOMContentLoaded", n), t.removeEventListener("load", n), 
e();
}
"complete" === t.document.readyState ? t.setTimeout(e) :(t.document.addEventListener("DOMContentLoaded", n), 
t.addEventListener("load", n));
}
function te(t, e) {
var n = Yi[e.toLowerCase()];
return n && Qi[L(t)] && n;
}
function ee(t) {
return Xi[t];
}
function ne(t, e) {
var n = function(n, r) {
n.isDefaultPrevented = function() {
return n.defaultPrevented;
};
var i = e[r || n.type], o = i ? i.length :0;
if (o) {
if (y(n.immediatePropagationStopped)) {
var a = n.stopImmediatePropagation;
n.stopImmediatePropagation = function() {
n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n);
};
}
n.isImmediatePropagationStopped = function() {
return n.immediatePropagationStopped === !0;
};
var s = i.specialHandlerWrapper || re;
o > 1 && (i = Ct(i));
for (var u = 0; o > u; u++) n.isImmediatePropagationStopped() || s(t, n, i[u]);
}
};
return n.elem = t, n;
}
function re(t, e, n) {
n.call(t, e);
}
function ie(t, e, n) {
var r = e.relatedTarget;
(!r || r !== t && !Ki.call(t, r)) && n.call(t, e);
}
function oe() {
this.$get = function() {
return f(_t, {
hasClass:function(t, e) {
return t.attr && (t = t[0]), Bt(t, e);
},
addClass:function(t, e) {
return t.attr && (t = t[0]), Wt(t, e);
},
removeClass:function(t, e) {
return t.attr && (t = t[0]), zt(t, e);
}
});
};
}
function ae(t, e) {
var n = t && t.$$hashKey;
if (n) return "function" == typeof n && (n = t.$$hashKey()), n;
var r = typeof t;
return n = "function" === r || "object" === r && null !== t ? t.$$hashKey = r + ":" + (e || u)() :r + ":" + t;
}
function se() {
this._keys = [], this._values = [], this._lastKey = NaN, this._lastIndex = -1;
}
function ue(t) {
return Function.prototype.toString.call(t);
}
function ce(t) {
var e = ue(t).replace(so, ""), n = e.match(ro) || e.match(io);
return n;
}
function le(t) {
var e = ce(t);
return e ? "function(" + (e[1] || "").replace(/[\s\r\n]+/, " ") + ")" :"fn";
}
function fe(t, e, n) {
var r, i, a;
if ("function" == typeof t) {
if (!(r = t.$inject)) {
if (r = [], t.length) {
if (e) throw C(n) && n || (n = t.name || le(t)), uo("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
i = ce(t), o(i[1].split(oo), function(t) {
t.replace(ao, function(t, e, n) {
r.push(n);
});
});
}
t.$inject = r;
}
} else bi(t) ? (a = t.length - 1, vt(t[a], "fn"), r = t.slice(0, a)) :vt(t, "fn", !0);
return r;
}
function he(t, e) {
function n(t) {
return function(e, n) {
return w(e) ? void o(e, s(t)) :t(e, n);
};
}
function r(t, e) {
if (mt(t, "service"), (A(e) || bi(e)) && (e = x.instantiate(e)), !e.$get) throw uo("pget", "Provider '{0}' must define $get factory method.", t);
return b[t + $] = e;
}
function i(t, e) {
return function() {
var n = k.invoke(e, this);
if (y(n)) throw uo("undef", "Provider '{0}' must return a value from $get factory method.", t);
return n;
};
}
function a(t, e, n) {
return r(t, {
$get:n !== !1 ? i(t, e) :e
});
}
function u(t, e) {
return a(t, [ "$injector", function(t) {
return t.instantiate(e);
} ]);
}
function c(t, e) {
return a(t, m(e), !1);
}
function l(t, e) {
mt(t, "constant"), b[t] = e, E[t] = e;
}
function f(t, e) {
var n = x.get(t + $), r = n.$get;
n.$get = function() {
var t = k.invoke(r, n);
return k.invoke(e, null, {
$delegate:t
});
};
}
function h(t) {
$t(y(t) || bi(t), "modulesToLoad", "not an array");
var e, n = [];
return o(t, function(t) {
function r(t) {
var e, n;
for (e = 0, n = t.length; n > e; e++) {
var r = t[e], i = x.get(r[0]);
i[r[1]].apply(i, r[2]);
}
}
if (!g.get(t)) {
g.set(t, !0);
try {
C(t) ? (e = li(t), k.modules[t] = e, n = n.concat(h(e.requires)).concat(e._runBlocks), 
r(e._invokeQueue), r(e._configBlocks)) :A(t) ? n.push(x.invoke(t)) :bi(t) ? n.push(x.invoke(t)) :vt(t, "module");
} catch (i) {
throw bi(t) && (t = t[t.length - 1]), i.message && i.stack && -1 === i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), 
uo("modulerr", "Failed to instantiate module {0} due to:\n{1}", t, i.stack || i.message || i);
}
}
}), n;
}
function p(t, n) {
function r(e, r) {
if (t.hasOwnProperty(e)) {
if (t[e] === d) throw uo("cdep", "Circular dependency found: {0}", e + " <- " + v.join(" <- "));
return t[e];
}
try {
return v.unshift(e), t[e] = d, t[e] = n(e, r), t[e];
} catch (i) {
throw t[e] === d && delete t[e], i;
} finally {
v.shift();
}
}
function i(t, n, i) {
for (var o = [], a = he.$$annotate(t, e, i), s = 0, u = a.length; u > s; s++) {
var c = a[s];
if ("string" != typeof c) throw uo("itkn", "Incorrect injection token! Expected service name as string, got {0}", c);
o.push(n && n.hasOwnProperty(c) ? n[c] :r(c, i));
}
return o;
}
function o(t) {
if (si || "function" != typeof t) return !1;
var e = t.$$ngIsClass;
return j(e) || (e = t.$$ngIsClass = /^(?:class\b|constructor\()/.test(ue(t))), e;
}
function a(t, e, n, r) {
"string" == typeof n && (r = n, n = null);
var a = i(t, n, r);
return bi(t) && (t = t[t.length - 1]), o(t) ? (a.unshift(null), new (Function.prototype.bind.apply(t, a))()) :t.apply(e, a);
}
function s(t, e, n) {
var r = bi(t) ? t[t.length - 1] :t, o = i(t, e, n);
return o.unshift(null), new (Function.prototype.bind.apply(r, o))();
}
return {
invoke:a,
instantiate:s,
get:r,
annotate:he.$$annotate,
has:function(e) {
return b.hasOwnProperty(e + $) || t.hasOwnProperty(e);
}
};
}
e = e === !0;
var d = {}, $ = "Provider", v = [], g = new eo(), b = {
$provide:{
provider:n(r),
factory:n(a),
service:n(u),
value:n(c),
constant:n(l),
decorator:f
}
}, x = b.$injector = p(b, function(t, e) {
throw mi.isString(e) && v.push(e), uo("unpr", "Unknown provider: {0}", v.join(" <- "));
}), E = {}, S = p(E, function(t, e) {
var n = x.get(t + $, e);
return k.invoke(n.$get, n, void 0, t);
}), k = S;
b["$injector" + $] = {
$get:m(S)
}, k.modules = x.modules = bt();
var O = h(t);
return k = S.get("$injector"), k.strictDi = e, o(O, function(t) {
t && k.invoke(t);
}), k.loadNewModules = function(t) {
o(h(t), function(t) {
t && k.invoke(t);
});
}, k;
}
function pe() {
var t = !0;
this.disableAutoScrolling = function() {
t = !1;
}, this.$get = [ "$window", "$location", "$rootScope", function(e, n, r) {
function i(t) {
var e = null;
return Array.prototype.some.call(t, function(t) {
return "a" === L(t) ? (e = t, !0) :void 0;
}), e;
}
function o() {
var t = s.yOffset;
if (A(t)) t = t(); else if (R(t)) {
var n = t[0], r = e.getComputedStyle(n);
t = "fixed" !== r.position ? 0 :n.getBoundingClientRect().bottom;
} else E(t) || (t = 0);
return t;
}
function a(t) {
if (t) {
t.scrollIntoView();
var n = o();
if (n) {
var r = t.getBoundingClientRect().top;
e.scrollBy(0, r - n);
}
} else e.scrollTo(0, 0);
}
function s(t) {
t = C(t) ? t :E(t) ? t.toString() :n.hash();
var e;
t ? (e = u.getElementById(t)) ? a(e) :(e = i(u.getElementsByName(t))) ? a(e) :"top" === t && a(null) :a(null);
}
var u = e.document;
return t && r.$watch(function() {
return n.hash();
}, function(t, e) {
(t !== e || "" !== t) && Qt(function() {
r.$evalAsync(s);
});
}), s;
} ];
}
function de(t, e) {
return t || e ? t ? e ? (bi(t) && (t = t.join(" ")), bi(e) && (e = e.join(" ")), 
t + " " + e) :t :e :"";
}
function $e(t) {
for (var e = 0; e < t.length; e++) {
var n = t[e];
if (n.nodeType === lo) return n;
}
}
function ve(t) {
C(t) && (t = t.split(" "));
var e = bt();
return o(t, function(t) {
t.length && (e[t] = !0);
}), e;
}
function me(t) {
return w(t) ? t :{};
}
function ge(t, e, n, r) {
function i(t) {
try {
t.apply(null, G(arguments, 1));
} finally {
if (m--, 0 === m) for (;g.length; ) try {
g.pop()();
} catch (e) {
n.error(e);
}
}
}
function a(t) {
var e = t.indexOf("#");
return -1 === e ? "" :t.substr(e);
}
function s() {
E = null, c();
}
function u() {
b = S(), b = y(b) ? null :b, z(b, O) && (b = O), O = b, w = b;
}
function c() {
var t = w;
u(), (x !== l.url() || t !== b) && (x = l.url(), w = b, o(k, function(t) {
t(l.url(), b);
}));
}
var l = this, f = t.location, h = t.history, p = t.setTimeout, d = t.clearTimeout, v = {};
l.isMock = !1;
var m = 0, g = [];
l.$$completeOutstandingRequest = i, l.$$incOutstandingRequestCount = function() {
m++;
}, l.notifyWhenNoOutstandingRequests = function(t) {
0 === m ? t() :g.push(t);
};
var b, w, x = f.href, C = e.find("base"), E = null, S = r.history ? function() {
try {
return h.state;
} catch (t) {}
} :$;
u(), l.url = function(e, n, i) {
if (y(i) && (i = null), f !== t.location && (f = t.location), h !== t.history && (h = t.history), 
e) {
var o = w === i;
if (x === e && (!r.history || o)) return l;
var s = x && tn(x) === tn(e);
return x = e, w = i, !r.history || s && o ? (s || (E = e), n ? f.replace(e) :s ? f.hash = a(e) :f.href = e, 
f.href !== e && (E = e)) :(h[n ? "replaceState" :"pushState"](i, "", e), u()), E && (E = e), 
l;
}
return E || f.href.replace(/%27/g, "'");
}, l.state = function() {
return b;
};
var k = [], A = !1, O = null;
l.onUrlChange = function(e) {
return A || (r.history && ui(t).on("popstate", s), ui(t).on("hashchange", s), A = !0), 
k.push(e), e;
}, l.$$applicationDestroyed = function() {
ui(t).off("hashchange popstate", s);
}, l.$$checkUrlChange = c, l.baseHref = function() {
var t = C.attr("href");
return t ? t.replace(/^(https?:)?\/\/[^\/]*/, "") :"";
}, l.defer = function(t, e) {
var n;
return m++, n = p(function() {
delete v[n], i(t);
}, e || 0), v[n] = !0, n;
}, l.defer.cancel = function(t) {
return v[t] ? (delete v[t], d(t), i($), !0) :!1;
};
}
function ye() {
this.$get = [ "$window", "$log", "$sniffer", "$document", function(t, e, n, r) {
return new ge(t, r, e, n);
} ];
}
function be() {
this.$get = function() {
function t(t, n) {
function i(t) {
t !== h && (p ? p === t && (p = t.n) :p = t, o(t.n, t.p), o(t, h), h = t, h.n = null);
}
function o(t, e) {
t !== e && (t && (t.p = e), e && (e.n = t));
}
if (t in e) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", t);
var a = 0, s = f({}, n, {
id:t
}), u = bt(), c = n && n.capacity || Number.MAX_VALUE, l = bt(), h = null, p = null;
return e[t] = {
put:function(t, e) {
if (!y(e)) {
if (c < Number.MAX_VALUE) {
var n = l[t] || (l[t] = {
key:t
});
i(n);
}
return t in u || a++, u[t] = e, a > c && this.remove(p.key), e;
}
},
get:function(t) {
if (c < Number.MAX_VALUE) {
var e = l[t];
if (!e) return;
i(e);
}
return u[t];
},
remove:function(t) {
if (c < Number.MAX_VALUE) {
var e = l[t];
if (!e) return;
e === h && (h = e.p), e === p && (p = e.n), o(e.n, e.p), delete l[t];
}
t in u && (delete u[t], a--);
},
removeAll:function() {
u = bt(), a = 0, l = bt(), h = p = null;
},
destroy:function() {
u = null, s = null, l = null, delete e[t];
},
info:function() {
return f({}, s, {
size:a
});
}
};
}
var e = {};
return t.info = function() {
var t = {};
return o(e, function(e, n) {
t[n] = e.info();
}), t;
}, t.get = function(t) {
return e[t];
}, t;
};
}
function we() {
this.$get = [ "$cacheFactory", function(t) {
return t("templates");
} ];
}
function xe() {}
function Ce(e, n) {
function r(t, e, n) {
var r = /^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/, i = bt();
return o(t, function(t, o) {
if (t in O) return void (i[o] = O[t]);
var a = t.match(r);
if (!a) throw yo("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", e, o, t, n ? "controller bindings definition" :"isolate scope definition");
i[o] = {
mode:a[1][0],
collection:"*" === a[2],
optional:"?" === a[3],
attrName:a[4] || o
}, a[4] && (O[t] = i[o]);
}), i;
}
function i(t, e) {
var n = {
isolateScope:null,
bindToController:null
};
if (w(t.scope) && (t.bindToController === !0 ? (n.bindToController = r(t.scope, e, !0), 
n.isolateScope = {}) :n.isolateScope = r(t.scope, e, !1)), w(t.bindToController) && (n.bindToController = r(t.bindToController, e, !0)), 
n.bindToController && !t.controller) throw yo("noctrl", "Cannot bind to controller without directive '{0}'s controller.", e);
return n;
}
function a(t) {
var e = t.charAt(0);
if (!e || e !== ri(e)) throw yo("baddir", "Directive/Component name '{0}' is invalid. The first character must be a lowercase letter", t);
if (t !== t.trim()) throw yo("baddir", "Directive/Component name '{0}' is invalid. The name should not contain leading or trailing whitespaces", t);
}
function u(t) {
var e = t.require || t.controller && t.name;
return !bi(e) && w(e) && o(e, function(t, n) {
var r = t.match(E), i = t.substring(r[0].length);
i || (e[n] = r[0] + n);
}), e;
}
function c(t, e) {
if (t && (!C(t) || !/[EACM]/.test(t))) throw yo("badrestrict", "Restrict property '{0}' of directive '{1}' is invalid", t, e);
return t || "EA";
}
var l = {}, h = "Directive", p = /^\s*directive:\s*([\w-]+)\s+(.*)$/, g = /(([\w-]+)(?::([^;]+))?;?)/, x = U("ngSrc,ngSrcset,src,srcset"), E = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, S = /^(on[a-z]+|formaction)$/, O = bt();
this.directive = function _(t, n) {
return $t(t, "name"), mt(t, "directive"), C(t) ? (a(t), $t(n, "directiveFactory"), 
l.hasOwnProperty(t) || (l[t] = [], e.factory(t + h, [ "$injector", "$exceptionHandler", function(e, n) {
var r = [];
return o(l[t], function(i, o) {
try {
var a = e.invoke(i);
A(a) ? a = {
compile:m(a)
} :!a.compile && a.link && (a.compile = m(a.link)), a.priority = a.priority || 0, 
a.index = o, a.name = a.name || t, a.require = u(a), a.restrict = c(a.restrict, t), 
a.$$moduleName = i.$$moduleName, r.push(a);
} catch (s) {
n(s);
}
}), r;
} ])), l[t].push(n)) :o(t, s(_)), this;
}, this.component = function R(t, e) {
function n(t) {
function n(e) {
return A(e) || bi(e) ? function(n, r) {
return t.invoke(e, this, {
$element:n,
$attrs:r
});
} :e;
}
var i = e.template || e.templateUrl ? e.template :"", a = {
controller:r,
controllerAs:Oe(e.controller) || e.controllerAs || "$ctrl",
template:n(i),
templateUrl:n(e.templateUrl),
transclude:e.transclude,
scope:{},
bindToController:e.bindings || {},
restrict:"E",
require:e.require
};
return o(e, function(t, e) {
"$" === e.charAt(0) && (a[e] = t);
}), a;
}
if (!C(t)) return o(t, s(J(this, R))), this;
var r = e.controller || function() {};
return o(e, function(t, e) {
"$" === e.charAt(0) && (n[e] = t, A(r) && (r[e] = t));
}), n.$inject = [ "$injector" ], this.directive(t, n);
}, this.aHrefSanitizationWhitelist = function(t) {
return b(t) ? (n.aHrefSanitizationWhitelist(t), this) :n.aHrefSanitizationWhitelist();
}, this.imgSrcSanitizationWhitelist = function(t) {
return b(t) ? (n.imgSrcSanitizationWhitelist(t), this) :n.imgSrcSanitizationWhitelist();
};
var M = !0;
this.debugInfoEnabled = function(t) {
return b(t) ? (M = t, this) :M;
};
var T = !1;
this.preAssignBindingsEnabled = function(t) {
return b(t) ? (T = t, this) :T;
};
var N = !1;
this.strictComponentBindingsEnabled = function(t) {
return b(t) ? (N = t, this) :N;
};
var I = 10;
this.onChangesTtl = function(t) {
return arguments.length ? (I = t, this) :I;
};
var D = !0;
this.commentDirectivesEnabled = function(t) {
return arguments.length ? (D = t, this) :D;
};
var P = !0;
this.cssClassDirectivesEnabled = function(t) {
return arguments.length ? (P = t, this) :P;
}, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function(e, n, r, a, s, u, c, m, O, _) {
function R() {
try {
if (!--It) throw At = void 0, yo("infchng", "{0} $onChanges() iterations reached. Aborting!\n", I);
c.$apply(function() {
for (var t = [], e = 0, n = At.length; n > e; ++e) try {
At[e]();
} catch (r) {
t.push(r);
}
if (At = void 0, t.length) throw t;
});
} finally {
It++;
}
}
function U(t, e) {
if (e) {
var n, r, i, o = Object.keys(e);
for (n = 0, r = o.length; r > n; n++) i = o[n], this[i] = e[i];
} else this.$attr = {};
this.$$element = t;
}
function q(t, e, n) {
Mt.innerHTML = "<span " + e + ">";
var r = Mt.firstChild.attributes, i = r[0];
r.removeNamedItem(i.name), i.value = n, t.attributes.setNamedItem(i);
}
function H(t, e) {
try {
t.addClass(e);
} catch (n) {}
}
function W(t, e, n, r, i) {
t instanceof ui || (t = ui(t));
var o = Z(t, e, t, n, r, i);
W.$$addScopeClass(t);
var a = null;
return function(e, n, r) {
if (!t) throw yo("multilink", "This element has already been linked.");
$t(e, "scope"), i && i.needsNewScope && (e = e.$parent.$new()), r = r || {};
var s = r.parentBoundTranscludeFn, u = r.transcludeControllers, c = r.futureParentElement;
s && s.$$boundTransclude && (s = s.$$boundTransclude), a || (a = K(c));
var l;
if (l = "html" !== a ? ui(gt(a, ui("<div>").append(t).html())) :n ? Zi.clone.call(t) :t, 
u) for (var f in u) l.data("$" + f + "Controller", u[f].instance);
return W.$$addScopeInfo(l, e), n && n(l, e), o && o(e, l, l, s), n || (t = o = null), 
l;
};
}
function K(t) {
var e = t && t[0];
return e && "foreignobject" !== L(e) && di.call(e).match(/SVG/) ? "svg" :"html";
}
function Z(t, e, n, r, i, o) {
function a(t, n, r, i) {
var o, a, s, u, c, l, f, h, $;
if (p) {
var v = n.length;
for ($ = new Array(v), c = 0; c < d.length; c += 3) f = d[c], $[f] = n[f];
} else $ = n;
for (c = 0, l = d.length; l > c; ) s = $[d[c++]], o = d[c++], a = d[c++], o ? (o.scope ? (u = t.$new(), 
W.$$addScopeInfo(ui(s), u)) :u = t, h = o.transcludeOnThisElement ? Q(t, o.transclude, i) :!o.templateOnThisElement && i ? i :!i && e ? Q(t, e) :null, 
o(a, u, s, r, h)) :a && a(t, s.childNodes, void 0, i);
}
for (var s, u, c, l, f, h, p, d = [], $ = bi(t) || t instanceof ui, v = 0; v < t.length; v++) s = new U(), 
11 === si && Y(t, v, $), u = X(t[v], [], s, 0 === v ? r :void 0, i), c = u.length ? ot(u, t[v], s, e, n, null, [], [], o) :null, 
c && c.scope && W.$$addScopeClass(s.$$element), f = c && c.terminal || !(l = t[v].childNodes) || !l.length ? null :Z(l, c ? (c.transcludeOnThisElement || !c.templateOnThisElement) && c.transclude :e), 
(c || f) && (d.push(v, c, f), h = !0, p = p || c), o = null;
return h ? a :null;
}
function Y(t, e, n) {
var r, i = t[e], o = i.parentNode;
if (i.nodeType === Ii) for (;;) {
if (r = o ? i.nextSibling :t[e + 1], !r || r.nodeType !== Ii) break;
i.nodeValue = i.nodeValue + r.nodeValue, r.parentNode && r.parentNode.removeChild(r), 
n && r === t[e + 1] && t.splice(e + 1, 1);
}
}
function Q(t, e, n) {
function r(r, i, o, a, s) {
return r || (r = t.$new(!1, s), r.$$transcluded = !0), e(r, i, {
parentBoundTranscludeFn:n,
transcludeControllers:o,
futureParentElement:a
});
}
var i = r.$$slots = bt();
for (var o in e.$$slots) e.$$slots[o] ? i[o] = Q(t, e.$$slots[o], n) :i[o] = null;
return r;
}
function X(t, e, n, r, i) {
var o, a, s, u = t.nodeType, c = n.$attr;
switch (u) {
case Ti:
a = L(t), ct(e, Se(a), "E", r, i);
for (var l, f, h, p, d, $, v = t.attributes, m = 0, y = v && v.length; y > m; m++) {
var b = !1, x = !1;
l = v[m], f = l.name, d = l.value, p = Se(f), $ = _t.test(p), $ && (f = f.replace(wo, "").substr(8).replace(/_(.)/g, function(t, e) {
return e.toUpperCase();
}));
var E = p.match(Ut);
E && lt(E[1]) && (b = f, x = f.substr(0, f.length - 5) + "end", f = f.substr(0, f.length - 6)), 
h = Se(f.toLowerCase()), c[h] = f, ($ || !n.hasOwnProperty(h)) && (n[h] = d, te(t, h) && (n[h] = !0)), 
wt(t, e, d, h, $), ct(e, h, "A", r, i, b, x);
}
if ("input" === a && "hidden" === t.getAttribute("type") && t.setAttribute("autocomplete", "off"), 
!Nt) break;
if (s = t.className, w(s) && (s = s.animVal), C(s) && "" !== s) for (;o = g.exec(s); ) h = Se(o[2]), 
ct(e, h, "C", r, i) && (n[h] = xi(o[3])), s = s.substr(o.index + o[0].length);
break;

case Ii:
mt(e, t.nodeValue);
break;

case ji:
if (!Vt) break;
tt(t, e, n, r, i);
}
return e.sort(dt), e;
}
function tt(t, e, n, r, i) {
try {
var o = p.exec(t.nodeValue);
if (o) {
var a = Se(o[1]);
ct(e, a, "M", r, i) && (n[a] = xi(o[2]));
}
} catch (s) {}
}
function nt(t, e, n) {
var r = [], i = 0;
if (e && t.hasAttribute && t.hasAttribute(e)) {
do {
if (!t) throw yo("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", e, n);
t.nodeType === Ti && (t.hasAttribute(e) && i++, t.hasAttribute(n) && i--), r.push(t), 
t = t.nextSibling;
} while (i > 0);
} else r.push(t);
return ui(r);
}
function rt(t, e, n) {
return function(r, i, o, a, s) {
return i = nt(i[0], e, n), t(r, i, o, a, s);
};
}
function it(t, e, n, r, i, o) {
var a;
return t ? W(e, n, r, i, o) :function() {
return a || (a = W(e, n, r, i, o), e = n = o = null), a.apply(this, arguments);
};
}
function ot(t, e, n, i, a, s, u, c, l) {
function h(t, e, n, r) {
t && (n && (t = rt(t, n, r)), t.require = d.require, t.directiveName = $, (E === d || d.$$isolateScope) && (t = Ct(t, {
isolateScope:!0
})), u.push(t)), e && (n && (e = rt(e, n, r)), e.require = d.require, e.directiveName = $, 
(E === d || d.$$isolateScope) && (e = Ct(e, {
isolateScope:!0
})), c.push(e));
}
function p(t, i, a, s, l) {
function h(t, e, n, r) {
var i;
if (V(t) || (r = n, n = e, e = t, t = void 0), N && (i = g), n || (n = N ? k.parent() :k), 
!r) return l(t, e, i, n, R);
var o = l.$$slots[r];
if (o) return o(t, e, i, n, R);
if (y(o)) throw yo("noslot", 'No parent directive that requires a transclusion with slot name "{0}". Element: {1}', r, et(k));
}
var p, d, $, v, m, g, b, k, O, M;
e === a ? (O = n, k = n.$$element) :(k = ui(a), O = new U(k, n)), m = i, E ? v = i.$new(!0) :x && (m = i.$parent), 
l && (b = h, b.$$boundTransclude = l, b.isSlotFilled = function(t) {
return !!l.$$slots[t];
}), C && (g = st(k, O, b, C, v, i, E)), E && (W.$$addScopeInfo(k, v, !0, !(S && (S === E || S === E.$$originalDirective))), 
W.$$addScopeClass(k, !0), v.$$isolateBindings = E.$$isolateBindings, M = kt(i, O, v, v.$$isolateBindings, E), 
M.removeWatches && v.$on("$destroy", M.removeWatches));
for (var I in g) {
var j = C[I], D = g[I], P = j.$$bindings.bindToController;
if (T) {
P ? D.bindingInfo = kt(m, O, D.instance, P, j) :D.bindingInfo = {};
var _ = D();
_ !== D.instance && (D.instance = _, k.data("$" + j.name + "Controller", _), D.bindingInfo.removeWatches && D.bindingInfo.removeWatches(), 
D.bindingInfo = kt(m, O, D.instance, P, j));
} else D.instance = D(), k.data("$" + j.name + "Controller", D.instance), D.bindingInfo = kt(m, O, D.instance, P, j);
}
for (o(C, function(t, e) {
var n = t.require;
t.bindToController && !bi(n) && w(n) && f(g[e].instance, at(e, n, k, g));
}), o(g, function(t) {
var e = t.instance;
if (A(e.$onChanges)) try {
e.$onChanges(t.bindingInfo.initialChanges);
} catch (n) {
r(n);
}
if (A(e.$onInit)) try {
e.$onInit();
} catch (n) {
r(n);
}
A(e.$doCheck) && (m.$watch(function() {
e.$doCheck();
}), e.$doCheck()), A(e.$onDestroy) && m.$on("$destroy", function() {
e.$onDestroy();
});
}), p = 0, d = u.length; d > p; p++) $ = u[p], Et($, $.isolateScope ? v :i, k, O, $.require && at($.directiveName, $.require, k, g), b);
var R = i;
for (E && (E.template || null === E.templateUrl) && (R = v), t && t(R, a.childNodes, void 0, l), 
p = c.length - 1; p >= 0; p--) $ = c[p], Et($, $.isolateScope ? v :i, k, O, $.require && at($.directiveName, $.require, k, g), b);
o(g, function(t) {
var e = t.instance;
A(e.$postLink) && e.$postLink();
});
}
l = l || {};
for (var d, $, v, m, g, b = -Number.MAX_VALUE, x = l.newScopeDirective, C = l.controllerDirectives, E = l.newIsolateScopeDirective, S = l.templateDirective, k = l.nonTlbTranscludeDirective, O = !1, M = !1, N = l.hasElementTranscludeDirective, I = n.$$element = ui(e), j = s, D = i, P = !1, _ = !1, R = 0, q = t.length; q > R; R++) {
d = t[R];
var F = d.$$start, H = d.$$end;
if (F && (I = nt(e, F, H)), v = void 0, b > d.priority) break;
if (g = d.scope, g && (d.templateUrl || (w(g) ? (vt("new/isolated scope", E || x, d, I), 
E = d) :vt("new/isolated scope", E, d, I)), x = x || d), $ = d.name, !P && (d.replace && (d.templateUrl || d.template) || d.transclude && !d.$$tlb)) {
for (var B, z = R + 1; B = t[z++]; ) if (B.transclude && !B.$$tlb || B.replace && (B.templateUrl || B.template)) {
_ = !0;
break;
}
P = !0;
}
if (!d.templateUrl && d.controller && (C = C || bt(), vt("'" + $ + "' controller", C[$], d, I), 
C[$] = d), g = d.transclude) if (O = !0, d.$$tlb || (vt("transclusion", k, d, I), 
k = d), "element" === g) N = !0, b = d.priority, v = I, I = n.$$element = ui(W.$$createComment($, n[$])), 
e = I[0], xt(a, G(v), e), v[0].$$parentNode = v[0].parentNode, D = it(_, v, i, b, j && j.name, {
nonTlbTranscludeDirective:k
}); else {
var K = bt();
if (w(g)) {
v = [];
var Z = bt(), Y = bt();
o(g, function(t, e) {
var n = "?" === t.charAt(0);
t = n ? t.substring(1) :t, Z[t] = e, K[e] = null, Y[e] = n;
}), o(I.contents(), function(t) {
var e = Z[Se(L(t))];
e ? (Y[e] = !0, K[e] = K[e] || [], K[e].push(t)) :v.push(t);
}), o(Y, function(t, e) {
if (!t) throw yo("reqslot", "Required transclusion slot `{0}` was not filled.", e);
});
for (var Q in K) K[Q] && (K[Q] = it(_, K[Q], i));
} else v = ui(Rt(e)).contents();
I.empty(), D = it(_, v, i, void 0, void 0, {
needsNewScope:d.$$isolateScope || d.$$newScope
}), D.$$slots = K;
}
if (d.template) if (M = !0, vt("template", S, d, I), S = d, g = A(d.template) ? d.template(I, n) :d.template, 
g = Pt(g), d.replace) {
if (j = d, v = Tt(g) ? [] :Ae(gt(d.templateNamespace, xi(g))), e = v[0], 1 !== v.length || e.nodeType !== Ti) throw yo("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", $, "");
xt(a, I, e);
var tt = {
$attr:{}
}, ot = X(e, [], tt), ct = t.splice(R + 1, t.length - (R + 1));
(E || x) && ut(ot, E, x), t = t.concat(ot).concat(ct), ft(n, tt), q = t.length;
} else I.html(g);
if (d.templateUrl) M = !0, vt("template", S, d, I), S = d, d.replace && (j = d), 
p = ht(t.splice(R, t.length - R), I, n, a, O && D, u, c, {
controllerDirectives:C,
newScopeDirective:x !== d && x,
newIsolateScopeDirective:E,
templateDirective:S,
nonTlbTranscludeDirective:k
}), q = t.length; else if (d.compile) try {
m = d.compile(I, n, D);
var lt = d.$$originalDirective || d;
A(m) ? h(null, J(lt, m), F, H) :m && h(J(lt, m.pre), J(lt, m.post), F, H);
} catch (pt) {
r(pt, et(I));
}
d.terminal && (p.terminal = !0, b = Math.max(b, d.priority));
}
return p.scope = x && x.scope === !0, p.transcludeOnThisElement = O, p.templateOnThisElement = M, 
p.transclude = D, l.hasElementTranscludeDirective = N, p;
}
function at(t, e, n, r) {
var i;
if (C(e)) {
var a = e.match(E), s = e.substring(a[0].length), u = a[1] || a[3], c = "?" === a[2];
if ("^^" === u ? n = n.parent() :(i = r && r[s], i = i && i.instance), !i) {
var l = "$" + s + "Controller";
i = u ? n.inheritedData(l) :n.data(l);
}
if (!i && !c) throw yo("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", s, t);
} else if (bi(e)) {
i = [];
for (var f = 0, h = e.length; h > f; f++) i[f] = at(t, e[f], n, r);
} else w(e) && (i = {}, o(e, function(e, o) {
i[o] = at(t, e, n, r);
}));
return i || null;
}
function st(t, e, n, r, i, o, a) {
var s = bt();
for (var c in r) {
var l = r[c], f = {
$scope:l === a || l.$$isolateScope ? i :o,
$element:t,
$attrs:e,
$transclude:n
}, h = l.controller;
"@" === h && (h = e[l.name]);
var p = u(h, f, !0, l.controllerAs);
s[l.name] = p, t.data("$" + l.name + "Controller", p.instance);
}
return s;
}
function ut(t, e, n) {
for (var r = 0, i = t.length; i > r; r++) t[r] = d(t[r], {
$$isolateScope:e,
$$newScope:n
});
}
function ct(t, n, r, o, a, s, u) {
if (n === a) return null;
var c = null;
if (l.hasOwnProperty(n)) for (var f, p = e.get(n + h), $ = 0, v = p.length; v > $; $++) if (f = p[$], 
(y(o) || o > f.priority) && -1 !== f.restrict.indexOf(r)) {
if (s && (f = d(f, {
$$start:s,
$$end:u
})), !f.$$bindings) {
var m = f.$$bindings = i(f, f.name);
w(m.isolateScope) && (f.$$isolateBindings = m.isolateScope);
}
t.push(f), c = f;
}
return c;
}
function lt(t) {
if (l.hasOwnProperty(t)) for (var n, r = e.get(t + h), i = 0, o = r.length; o > i; i++) if (n = r[i], 
n.multiElement) return !0;
return !1;
}
function ft(t, e) {
var n = e.$attr, r = t.$attr;
o(t, function(r, i) {
"$" !== i.charAt(0) && (e[i] && e[i] !== r && (r.length ? r += ("style" === i ? ";" :" ") + e[i] :r = e[i]), 
t.$set(i, r, !0, n[i]));
}), o(e, function(e, i) {
t.hasOwnProperty(i) || "$" === i.charAt(0) || (t[i] = e, "class" !== i && "style" !== i && (r[i] = n[i]));
});
}
function ht(t, e, n, i, s, u, c, l) {
var f, h, p = [], $ = e[0], v = t.shift(), m = d(v, {
templateUrl:null,
transclude:null,
replace:null,
$$originalDirective:v
}), g = A(v.templateUrl) ? v.templateUrl(e, n) :v.templateUrl, y = v.templateNamespace;
return e.empty(), a(g).then(function(r) {
var a, d, b, x;
if (r = Pt(r), v.replace) {
if (b = Tt(r) ? [] :Ae(gt(y, xi(r))), a = b[0], 1 !== b.length || a.nodeType !== Ti) throw yo("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", v.name, g);
d = {
$attr:{}
}, xt(i, e, a);
var C = X(a, [], d);
w(v.scope) && ut(C, !0), t = C.concat(t), ft(n, d);
} else a = $, e.html(r);
for (t.unshift(m), f = ot(t, a, n, s, e, v, u, c, l), o(i, function(t, n) {
t === a && (i[n] = e[0]);
}), h = Z(e[0].childNodes, s); p.length; ) {
var E = p.shift(), S = p.shift(), k = p.shift(), A = p.shift(), O = e[0];
if (!E.$$destroyed) {
if (S !== $) {
var M = S.className;
l.hasElementTranscludeDirective && v.replace || (O = Rt(a)), xt(k, ui(S), O), H(ui(O), M);
}
x = f.transcludeOnThisElement ? Q(E, f.transclude, A) :A, f(h, E, O, i, x);
}
}
p = null;
})["catch"](function(t) {
k(t) && r(t);
}), function(t, e, n, r, i) {
var o = i;
e.$$destroyed || (p ? p.push(e, n, r, o) :(f.transcludeOnThisElement && (o = Q(e, f.transclude, i)), 
f(h, e, n, r, o)));
};
}
function dt(t, e) {
var n = e.priority - t.priority;
return 0 !== n ? n :t.name !== e.name ? t.name < e.name ? -1 :1 :t.index - e.index;
}
function vt(t, e, n, r) {
function i(t) {
return t ? " (module: " + t + ")" :"";
}
if (e) throw yo("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", e.name, i(e.$$moduleName), n.name, i(n.$$moduleName), t, et(r));
}
function mt(t, e) {
var r = n(e, !0);
r && t.push({
priority:0,
compile:function(t) {
var e = t.parent(), n = !!e.length;
return n && W.$$addBindingClass(e), function(t, e) {
var i = e.parent();
n || W.$$addBindingClass(i), W.$$addBindingInfo(i, r.expressions), t.$watch(r, function(t) {
e[0].nodeValue = t;
});
};
}
});
}
function gt(e, n) {
switch (e = ri(e || "html")) {
case "svg":
case "math":
var r = t.document.createElement("div");
return r.innerHTML = "<" + e + ">" + n + "</" + e + ">", r.childNodes[0].childNodes;

default:
return n;
}
}
function yt(t, e) {
if ("srcdoc" === e) return m.HTML;
var n = L(t);
if ("src" === e || "ngSrc" === e) {
if (-1 === [ "img", "video", "audio", "source", "track" ].indexOf(n)) return m.RESOURCE_URL;
} else if ("xlinkHref" === e || "form" === n && "action" === e || "link" === n && "href" === e) return m.RESOURCE_URL;
}
function wt(t, e, r, i, o) {
var a = yt(t, i), s = !o, u = x[i] || o, c = n(r, s, a, u);
if (c) {
if ("multiple" === i && "select" === L(t)) throw yo("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", et(t));
if (S.test(i)) throw yo("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
e.push({
priority:100,
compile:function() {
return {
pre:function(t, e, o) {
var s = o.$$observers || (o.$$observers = bt()), l = o[i];
l !== r && (c = l && n(l, !0, a, u), r = l), c && (o[i] = c(t), (s[i] || (s[i] = [])).$$inter = !0, 
(o.$$observers && o.$$observers[i].$$scope || t).$watch(c, function(t, e) {
"class" === i && t !== e ? o.$updateClass(t, e) :o.$set(i, t);
}));
}
};
}
});
}
}
function xt(e, n, r) {
var i, o, a = n[0], s = n.length, u = a.parentNode;
if (e) for (i = 0, o = e.length; o > i; i++) if (e[i] === a) {
e[i++] = r;
for (var c = i, l = c + s - 1, f = e.length; f > c; c++, l++) f > l ? e[c] = e[l] :delete e[c];
e.length -= s - 1, e.context === a && (e.context = r);
break;
}
u && u.replaceChild(r, a);
var h = t.document.createDocumentFragment();
for (i = 0; s > i; i++) h.appendChild(n[i]);
for (ui.hasData(a) && (ui.data(r, ui.data(a)), ui(a).off("$destroy")), ui.cleanData(h.querySelectorAll("*")), 
i = 1; s > i; i++) delete n[i];
n[0] = r, n.length = 1;
}
function Ct(t, e) {
return f(function() {
return t.apply(null, arguments);
}, t, e);
}
function Et(t, e, n, i, o, a) {
try {
t(e, n, i, o, a);
} catch (s) {
r(s, et(n));
}
}
function St(t, e) {
if (N) throw yo("missingattr", "Attribute '{0}' of '{1}' is non-optional and must be set!", t, e);
}
function kt(t, e, r, i, a) {
function u(e, n, i) {
A(r.$onChanges) && !B(n, i) && (At || (t.$$postDigest(R), At = []), l || (l = {}, 
At.push(c)), l[e] && (i = l[e].previousValue), l[e] = new Ee(i, n));
}
function c() {
r.$onChanges(l), l = void 0;
}
var l, f = [], h = {};
return o(i, function(i, o) {
var c, l, p, d, v, m = i.attrName, g = i.optional, y = i.mode;
switch (y) {
case "@":
g || ni.call(e, m) || (St(m, a.name), r[o] = e[m] = void 0), v = e.$observe(m, function(t) {
if (C(t) || j(t)) {
var e = r[o];
u(o, t, e), r[o] = t;
}
}), e.$$observers[m].$$scope = t, c = e[m], C(c) ? r[o] = n(c)(t) :j(c) && (r[o] = c), 
h[o] = new Ee(bo, r[o]), f.push(v);
break;

case "=":
if (!ni.call(e, m)) {
if (g) break;
St(m, a.name), e[m] = void 0;
}
if (g && !e[m]) break;
l = s(e[m]), d = l.literal ? z :B, p = l.assign || function() {
throw c = r[o] = l(t), yo("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", e[m], m, a.name);
}, c = r[o] = l(t);
var b = function(e) {
return d(e, r[o]) || (d(e, c) ? p(t, e = r[o]) :r[o] = e), c = e;
};
b.$stateful = !0, v = i.collection ? t.$watchCollection(e[m], b) :t.$watch(s(e[m], b), null, l.literal), 
f.push(v);
break;

case "<":
if (!ni.call(e, m)) {
if (g) break;
St(m, a.name), e[m] = void 0;
}
if (g && !e[m]) break;
l = s(e[m]);
var w = l.literal, x = r[o] = l(t);
h[o] = new Ee(bo, r[o]), v = t.$watch(l, function(t, e) {
if (e === t) {
if (e === x || w && z(e, x)) return;
e = x;
}
u(o, t, e), r[o] = t;
}, w), f.push(v);
break;

case "&":
if (g || ni.call(e, m) || St(m, a.name), l = e.hasOwnProperty(m) ? s(e[m]) :$, l === $ && g) break;
r[o] = function(e) {
return l(t, e);
};
}
}), {
initialChanges:h,
removeWatches:f.length && function() {
for (var t = 0, e = f.length; e > t; ++t) f[t]();
}
};
}
var At, Ot = /^\w/, Mt = t.document.createElement("div"), Vt = D, Nt = P, It = I;
U.prototype = {
$normalize:Se,
$addClass:function(t) {
t && t.length > 0 && O.addClass(this.$$element, t);
},
$removeClass:function(t) {
t && t.length > 0 && O.removeClass(this.$$element, t);
},
$updateClass:function(t, e) {
var n = ke(t, e);
n && n.length && O.addClass(this.$$element, n);
var r = ke(e, t);
r && r.length && O.removeClass(this.$$element, r);
},
$set:function(t, e, n, i) {
var a, s = this.$$element[0], u = te(s, t), c = ee(t), l = t;
if (u ? (this.$$element.prop(t, e), i = u) :c && (this[c] = e, l = c), this[t] = e, 
i ? this.$attr[t] = i :(i = this.$attr[t], i || (this.$attr[t] = i = pt(t, "-"))), 
a = L(this.$$element), "a" === a && ("href" === t || "xlinkHref" === t) || "img" === a && "src" === t) this[t] = e = _(e, "src" === t); else if ("img" === a && "srcset" === t && b(e)) {
for (var f = "", h = xi(e), p = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, d = /\s/.test(h) ? p :/(,)/, $ = h.split(d), v = Math.floor($.length / 2), m = 0; v > m; m++) {
var g = 2 * m;
f += _(xi($[g]), !0), f += " " + xi($[g + 1]);
}
var w = xi($[2 * m]).split(/\s/);
f += _(xi(w[0]), !0), 2 === w.length && (f += " " + xi(w[1])), this[t] = e = f;
}
n !== !1 && (null === e || y(e) ? this.$$element.removeAttr(i) :Ot.test(i) ? this.$$element.attr(i, e) :q(this.$$element[0], i, e));
var x = this.$$observers;
x && o(x[l], function(t) {
try {
t(e);
} catch (n) {
r(n);
}
});
},
$observe:function(t, e) {
var n = this, r = n.$$observers || (n.$$observers = bt()), i = r[t] || (r[t] = []);
return i.push(e), c.$evalAsync(function() {
i.$$inter || !n.hasOwnProperty(t) || y(n[t]) || e(n[t]);
}), function() {
F(i, e);
};
}
};
var jt = n.startSymbol(), Dt = n.endSymbol(), Pt = "{{" === jt && "}}" === Dt ? v :function(t) {
return t.replace(/\{\{/g, jt).replace(/}}/g, Dt);
}, _t = /^ngAttr[A-Z]/, Ut = /^(.+)Start$/;
return W.$$addBindingInfo = M ? function(t, e) {
var n = t.data("$binding") || [];
bi(e) ? n = n.concat(e) :n.push(e), t.data("$binding", n);
} :$, W.$$addBindingClass = M ? function(t) {
H(t, "ng-binding");
} :$, W.$$addScopeInfo = M ? function(t, e, n, r) {
var i = n ? r ? "$isolateScopeNoTemplate" :"$isolateScope" :"$scope";
t.data(i, e);
} :$, W.$$addScopeClass = M ? function(t, e) {
H(t, e ? "ng-isolate-scope" :"ng-scope");
} :$, W.$$createComment = function(e, n) {
var r = "";
return M && (r = " " + (e || "") + ": ", n && (r += n + " ")), t.document.createComment(r);
}, W;
} ];
}
function Ee(t, e) {
this.previousValue = t, this.currentValue = e;
}
function Se(t) {
return t.replace(wo, "").replace(xo, function(t, e, n) {
return n ? e.toUpperCase() :e;
});
}
function ke(t, e) {
var n = "", r = t.split(/\s+/), i = e.split(/\s+/);
t:for (var o = 0; o < r.length; o++) {
for (var a = r[o], s = 0; s < i.length; s++) if (a === i[s]) continue t;
n += (n.length > 0 ? " " :"") + a;
}
return n;
}
function Ae(t) {
t = ui(t);
var e = t.length;
if (1 >= e) return t;
for (;e--; ) {
var n = t[e];
(n.nodeType === ji || n.nodeType === Ii && "" === n.nodeValue.trim()) && hi.call(t, e, 1);
}
return t;
}
function Oe(t, e) {
if (e && C(e)) return e;
if (C(t)) {
var n = Eo.exec(t);
if (n) return n[3];
}
}
function Me() {
var t = {}, e = !1;
this.has = function(e) {
return t.hasOwnProperty(e);
}, this.register = function(e, n) {
mt(e, "controller"), w(e) ? f(t, e) :t[e] = n;
}, this.allowGlobals = function() {
e = !0;
}, this.$get = [ "$injector", "$window", function(n, i) {
function o(t, e, n, i) {
if (!t || !w(t.$scope)) throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", i, e);
t.$scope[e] = n;
}
return function(r, a, s, u) {
var c, l, h, p;
if (s = s === !0, u && C(u) && (p = u), C(r)) {
if (l = r.match(Eo), !l) throw Co("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", r);
if (h = l[1], p = p || l[3], r = t.hasOwnProperty(h) ? t[h] :gt(a.$scope, h, !0) || (e ? gt(i, h, !0) :void 0), 
!r) throw Co("ctrlreg", "The controller with the name '{0}' is not registered.", h);
vt(r, h, !0);
}
if (s) {
var d = (bi(r) ? r[r.length - 1] :r).prototype;
return c = Object.create(d || null), p && o(a, p, c, h || r.name), f(function() {
var t = n.invoke(r, c, a, h);
return t !== c && (w(t) || A(t)) && (c = t, p && o(a, p, c, h || r.name)), c;
}, {
instance:c,
identifier:p
});
}
return c = n.instantiate(r, a, h), p && o(a, p, c, h || r.name), c;
};
} ];
}
function Ve() {
this.$get = [ "$window", function(t) {
return ui(t.document);
} ];
}
function Te() {
this.$get = [ "$document", "$rootScope", function(t, e) {
function n() {
i = r.hidden;
}
var r = t[0], i = r && r.hidden;
return t.on("visibilitychange", n), e.$on("$destroy", function() {
t.off("visibilitychange", n);
}), function() {
return i;
};
} ];
}
function Ne() {
this.$get = [ "$log", function(t) {
return function(e, n) {
t.error.apply(t, arguments);
};
} ];
}
function Ie(t) {
return w(t) ? S(t) ? t.toISOString() :Z(t) :t;
}
function je() {
this.$get = function() {
return function(t) {
if (!t) return "";
var e = [];
return a(t, function(t, n) {
null === t || y(t) || A(t) || (bi(t) ? o(t, function(t) {
e.push(at(n) + "=" + at(Ie(t)));
}) :e.push(at(n) + "=" + at(Ie(t))));
}), e.join("&");
};
};
}
function De() {
this.$get = function() {
return function(t) {
function e(t, r, i) {
null === t || y(t) || (bi(t) ? o(t, function(t, n) {
e(t, r + "[" + (w(t) ? n :"") + "]");
}) :w(t) && !S(t) ? a(t, function(t, n) {
e(t, r + (i ? "" :"[") + n + (i ? "" :"]"));
}) :n.push(at(r) + "=" + at(Ie(t))));
}
if (!t) return "";
var n = [];
return e(t, "", !0), n.join("&");
};
};
}
function Pe(t, e) {
if (C(t)) {
var n = t.replace(Vo, "").trim();
if (n) {
var r = e("Content-Type"), i = r && 0 === r.indexOf(ko);
if (i || _e(n)) try {
t = Y(n);
} catch (o) {
if (!i) return t;
throw To("baddata", 'Data must be a valid JSON object. Received: "{0}". Parse error: "{1}"', t, o);
}
}
}
return t;
}
function _e(t) {
var e = t.match(Oo);
return e && Mo[e[0]].test(t);
}
function Re(t) {
function e(t, e) {
t && (r[t] = r[t] ? r[t] + ", " + e :e);
}
var n, r = bt();
return C(t) ? o(t.split("\n"), function(t) {
n = t.indexOf(":"), e(ri(xi(t.substr(0, n))), xi(t.substr(n + 1)));
}) :w(t) && o(t, function(t, n) {
e(ri(n), xi(t));
}), r;
}
function Ue(t) {
var e;
return function(n) {
if (e || (e = Re(t)), n) {
var r = e[ri(n)];
return void 0 === r && (r = null), r;
}
return e;
};
}
function Le(t, e, n, r) {
return A(r) ? r(t, e, n) :(o(r, function(r) {
t = r(t, e, n);
}), t);
}
function qe(t) {
return t >= 200 && 300 > t;
}
function Fe() {
var t = this.defaults = {
transformResponse:[ Pe ],
transformRequest:[ function(t) {
return !w(t) || T(t) || I(t) || N(t) ? t :Z(t);
} ],
headers:{
common:{
Accept:"application/json, text/plain, */*"
},
post:Ct(Ao),
put:Ct(Ao),
patch:Ct(Ao)
},
xsrfCookieName:"XSRF-TOKEN",
xsrfHeaderName:"X-XSRF-TOKEN",
paramSerializer:"$httpParamSerializer",
jsonpCallbackParam:"callback"
}, e = !1;
this.useApplyAsync = function(t) {
return b(t) ? (e = !!t, this) :e;
};
var n = this.interceptors = [];
this.$get = [ "$browser", "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", "$sce", function(i, a, s, u, c, l, h, p) {
function d(e) {
function n(t, e) {
for (var n = 0, r = e.length; r > n; ) {
var i = e[n++], o = e[n++];
t = t.then(i, o);
}
return e.length = 0, t;
}
function a() {
i.$$completeOutstandingRequest($);
}
function s(t, e) {
var n, r = {};
return o(t, function(t, i) {
A(t) ? (n = t(e), null != n && (r[i] = n)) :r[i] = t;
}), r;
}
function u(e) {
var n, r, i, o = t.headers, a = f({}, e.headers);
o = f({}, o.common, o[ri(e.method)]);
t:for (n in o) {
r = ri(n);
for (i in a) if (ri(i) === r) continue t;
a[n] = o[n];
}
return s(a, Ct(e));
}
function c(e) {
var n = e.headers, r = Le(e.data, Ue(n), void 0, e.transformRequest);
return y(r) && o(n, function(t, e) {
"content-type" === ri(e) && delete n[e];
}), y(e.withCredentials) && !y(t.withCredentials) && (e.withCredentials = t.withCredentials), 
g(e, r).then(d, d);
}
function d(t) {
var e = f({}, t);
return e.data = Le(t.data, t.headers, t.status, v.transformResponse), qe(t.status) ? e :l.reject(e);
}
if (!w(e)) throw r("$http")("badreq", "Http request configuration must be an object.  Received: {0}", e);
if (!C(p.valueOf(e.url))) throw r("$http")("badreq", "Http request configuration url must be a string or a $sce trusted object.  Received: {0}", e.url);
var v = f({
method:"get",
transformRequest:t.transformRequest,
transformResponse:t.transformResponse,
paramSerializer:t.paramSerializer,
jsonpCallbackParam:t.jsonpCallbackParam
}, e);
v.headers = u(e), v.method = ii(v.method), v.paramSerializer = C(v.paramSerializer) ? h.get(v.paramSerializer) :v.paramSerializer, 
i.$$incOutstandingRequestCount();
var m = [], b = [], x = l.resolve(v);
return o(k, function(t) {
(t.request || t.requestError) && m.unshift(t.request, t.requestError), (t.response || t.responseError) && b.push(t.response, t.responseError);
}), x = n(x, m), x = x.then(c), x = n(x, b), x = x["finally"](a);
}
function v(t) {
o(arguments, function(t) {
d[t] = function(e, n) {
return d(f({}, n || {}, {
method:t,
url:e
}));
};
});
}
function m(t) {
o(arguments, function(t) {
d[t] = function(e, n, r) {
return d(f({}, r || {}, {
method:t,
url:e,
data:n
}));
};
});
}
function g(n, r) {
function i(t) {
if (t) {
var n = {};
return o(t, function(t, r) {
n[r] = function(n) {
function r() {
t(n);
}
e ? c.$applyAsync(r) :c.$$phase ? r() :c.$apply(r);
};
}), n;
}
}
function u(t, n, r, i, o) {
function a() {
f(n, t, r, i, o);
}
v && (qe(t) ? v.put(M, [ t, n, Re(r), i, o ]) :v.remove(M)), e ? c.$applyAsync(a) :(a(), 
c.$$phase || c.$apply());
}
function f(t, e, r, i, o) {
e = e >= -1 ? e :0, (qe(e) ? g.resolve :g.reject)({
data:t,
status:e,
headers:Ue(r),
config:n,
statusText:i,
xhrStatus:o
});
}
function h(t) {
f(t.data, t.status, Ct(t.headers()), t.statusText, t.xhrStatus);
}
function $() {
var t = d.pendingRequests.indexOf(n);
-1 !== t && d.pendingRequests.splice(t, 1);
}
var v, m, g = l.defer(), k = g.promise, A = n.headers, O = "jsonp" === ri(n.method), M = n.url;
if (O ? M = p.getTrustedResourceUrl(M) :C(M) || (M = p.valueOf(M)), M = x(M, n.paramSerializer(n.params)), 
O && (M = E(M, n.jsonpCallbackParam)), d.pendingRequests.push(n), k.then($, $), 
!n.cache && !t.cache || n.cache === !1 || "GET" !== n.method && "JSONP" !== n.method || (v = w(n.cache) ? n.cache :w(t.cache) ? t.cache :S), 
v && (m = v.get(M), b(m) ? D(m) ? m.then(h, h) :bi(m) ? f(m[1], m[0], Ct(m[2]), m[3], m[4]) :f(m, 200, {}, "OK", "complete") :v.put(M, k)), 
y(m)) {
var V = Gn(n.url) ? s()[n.xsrfCookieName || t.xsrfCookieName] :void 0;
V && (A[n.xsrfHeaderName || t.xsrfHeaderName] = V), a(n.method, M, r, u, A, n.timeout, n.withCredentials, n.responseType, i(n.eventHandlers), i(n.uploadEventHandlers));
}
return k;
}
function x(t, e) {
return e.length > 0 && (t += (-1 === t.indexOf("?") ? "?" :"&") + e), t;
}
function E(t, e) {
var n = t.split("?");
if (n.length > 2) throw To("badjsonp", 'Illegal use more than one "?", in url, "{1}"', t);
var r = rt(n[1]);
return o(r, function(n, r) {
if ("JSON_CALLBACK" === n) throw To("badjsonp", 'Illegal use of JSON_CALLBACK in url, "{0}"', t);
if (r === e) throw To("badjsonp", 'Illegal use of callback param, "{0}", in url, "{1}"', e, t);
}), t += (-1 === t.indexOf("?") ? "?" :"&") + e + "=JSON_CALLBACK";
}
var S = u("$http");
t.paramSerializer = C(t.paramSerializer) ? h.get(t.paramSerializer) :t.paramSerializer;
var k = [];
return o(n, function(t) {
k.unshift(C(t) ? h.get(t) :h.invoke(t));
}), d.pendingRequests = [], v("get", "delete", "head", "jsonp"), m("post", "put", "patch"), 
d.defaults = t, d;
} ];
}
function He() {
this.$get = function() {
return function() {
return new t.XMLHttpRequest();
};
};
}
function Be() {
this.$get = [ "$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function(t, e, n, r) {
return ze(t, r, t.defer, e, n[0]);
} ];
}
function ze(t, e, n, r, i) {
function a(t, e, n) {
t = t.replace("JSON_CALLBACK", e);
var o = i.createElement("script"), a = null;
return o.type = "text/javascript", o.src = t, o.async = !0, a = function(t) {
o.removeEventListener("load", a), o.removeEventListener("error", a), i.body.removeChild(o), 
o = null;
var s = -1, u = "unknown";
t && ("load" !== t.type || r.wasCalled(e) || (t = {
type:"error"
}), u = t.type, s = "error" === t.type ? 404 :200), n && n(s, u);
}, o.addEventListener("load", a), o.addEventListener("error", a), i.body.appendChild(o), 
a;
}
return function(i, s, u, c, l, f, h, p, d, $) {
function v() {
w && w(), x && x.abort();
}
function m(t, e, r, i, o, a) {
b(A) && n.cancel(A), w = x = null, t(e, r, i, o, a);
}
if (s = s || t.url(), "jsonp" === ri(i)) var g = r.createCallback(s), w = a(s, g, function(t, e) {
var n = 200 === t && r.getResponse(g);
m(c, t, n, "", e, "complete"), r.removeCallback(g);
}); else {
var x = e(i, s);
x.open(i, s, !0), o(l, function(t, e) {
b(t) && x.setRequestHeader(e, t);
}), x.onload = function() {
var t = x.statusText || "", e = "response" in x ? x.response :x.responseText, n = 1223 === x.status ? 204 :x.status;
0 === n && (n = e ? 200 :"file" === Wn(s).protocol ? 404 :0), m(c, n, e, x.getAllResponseHeaders(), t, "complete");
};
var C = function() {
m(c, -1, null, null, "", "error");
}, E = function() {
m(c, -1, null, null, "", "abort");
}, S = function() {
m(c, -1, null, null, "", "timeout");
};
if (x.onerror = C, x.onabort = E, x.ontimeout = S, o(d, function(t, e) {
x.addEventListener(e, t);
}), o($, function(t, e) {
x.upload.addEventListener(e, t);
}), h && (x.withCredentials = !0), p) try {
x.responseType = p;
} catch (k) {
if ("json" !== p) throw k;
}
x.send(y(u) ? null :u);
}
if (f > 0) var A = n(v, f); else D(f) && f.then(v);
};
}
function We() {
var t = "{{", e = "}}";
this.startSymbol = function(e) {
return e ? (t = e, this) :t;
}, this.endSymbol = function(t) {
return t ? (e = t, this) :e;
}, this.$get = [ "$parse", "$exceptionHandler", "$sce", function(n, r, i) {
function o(t) {
return "\\\\\\" + t;
}
function a(n) {
return n.replace(h, t).replace(p, e);
}
function s(t, e, n, r) {
var i = t.$watch(function(t) {
return i(), r(t);
}, e, n);
return i;
}
function u(o, u, h, p) {
function d(t) {
try {
return t = V(t), p && !b(t) ? t :wt(t);
} catch (e) {
r(No.interr(o, e));
}
}
if (!o.length || -1 === o.indexOf(t)) {
var $;
if (!u) {
var v = a(o);
$ = m(v), $.exp = o, $.expressions = [], $.$$watchDelegate = s;
}
return $;
}
p = !!p;
for (var g, w, x, C = 0, E = [], S = [], k = o.length, A = [], O = []; k > C; ) {
if (-1 === (g = o.indexOf(t, C)) || -1 === (w = o.indexOf(e, g + c))) {
C !== k && A.push(a(o.substring(C)));
break;
}
C !== g && A.push(a(o.substring(C, g))), x = o.substring(g + c, w), E.push(x), S.push(n(x, d)), 
C = w + l, O.push(A.length), A.push("");
}
if (h && A.length > 1 && No.throwNoconcat(o), !u || E.length) {
var M = function(t) {
for (var e = 0, n = E.length; n > e; e++) {
if (p && y(t[e])) return;
A[O[e]] = t[e];
}
return A.join("");
}, V = function(t) {
return h ? i.getTrusted(h, t) :i.valueOf(t);
};
return f(function(t) {
var e = 0, n = E.length, i = new Array(n);
try {
for (;n > e; e++) i[e] = S[e](t);
return M(i);
} catch (a) {
r(No.interr(o, a));
}
}, {
exp:o,
expressions:E,
$$watchDelegate:function(t, e) {
var n;
return t.$watchGroup(S, function(r, i) {
var o = M(r);
e.call(this, o, r !== i ? n :o, t), n = o;
});
}
});
}
}
var c = t.length, l = e.length, h = new RegExp(t.replace(/./g, o), "g"), p = new RegExp(e.replace(/./g, o), "g");
return u.startSymbol = function() {
return t;
}, u.endSymbol = function() {
return e;
}, u;
} ];
}
function Ge() {
this.$get = [ "$rootScope", "$window", "$q", "$$q", "$browser", function(t, e, n, r, i) {
function o(o, s, u, c) {
function l() {
f ? o.apply(null, h) :o($);
}
var f = arguments.length > 4, h = f ? G(arguments, 4) :[], p = e.setInterval, d = e.clearInterval, $ = 0, v = b(c) && !c, m = (v ? r :n).defer(), g = m.promise;
return u = b(u) ? u :0, g.$$intervalId = p(function() {
v ? i.defer(l) :t.$evalAsync(l), m.notify($++), u > 0 && $ >= u && (m.resolve($), 
d(g.$$intervalId), delete a[g.$$intervalId]), v || t.$apply();
}, s), a[g.$$intervalId] = m, g;
}
var a = {};
return o.cancel = function(t) {
return t && t.$$intervalId in a ? (In(a[t.$$intervalId].promise), a[t.$$intervalId].reject("canceled"), 
e.clearInterval(t.$$intervalId), delete a[t.$$intervalId], !0) :!1;
}, o;
} ];
}
function Je(t) {
for (var e = t.split("/"), n = e.length; n--; ) e[n] = ot(e[n].replace(/%2F/g, "/"));
return e.join("/");
}
function Ke(t, e) {
for (var n = t.split("/"), r = n.length; r--; ) n[r] = decodeURIComponent(n[r]), 
e && (n[r] = n[r].replace(/\//g, "%2F"));
return n.join("/");
}
function Ze(t, e) {
var n = Wn(t);
e.$$protocol = n.protocol, e.$$host = n.hostname, e.$$port = p(n.port) || Do[n.protocol] || null;
}
function Ye(t, e, n) {
if (_o.test(t)) throw Po("badpath", 'Invalid url "{0}".', t);
var r = "/" !== t.charAt(0);
r && (t = "/" + t);
var i = Wn(t), o = r && "/" === i.pathname.charAt(0) ? i.pathname.substring(1) :i.pathname;
e.$$path = Ke(o, n), e.$$search = rt(i.search), e.$$hash = decodeURIComponent(i.hash), 
e.$$path && "/" !== e.$$path.charAt(0) && (e.$$path = "/" + e.$$path);
}
function Qe(t, e) {
return t.slice(0, e.length) === e;
}
function Xe(t, e) {
return Qe(e, t) ? e.substr(t.length) :void 0;
}
function tn(t) {
var e = t.indexOf("#");
return -1 === e ? t :t.substr(0, e);
}
function en(t) {
return t.replace(/(#.+)|#$/, "$1");
}
function nn(t) {
return t.substr(0, tn(t).lastIndexOf("/") + 1);
}
function rn(t) {
return t.substring(0, t.indexOf("/", t.indexOf("//") + 2));
}
function on(t, e, n) {
this.$$html5 = !0, n = n || "", Ze(t, this), this.$$parse = function(t) {
var n = Xe(e, t);
if (!C(n)) throw Po("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, e);
Ye(n, this, !0), this.$$path || (this.$$path = "/"), this.$$compose();
}, this.$$compose = function() {
var t = it(this.$$search), n = this.$$hash ? "#" + ot(this.$$hash) :"";
this.$$url = Je(this.$$path) + (t ? "?" + t :"") + n, this.$$absUrl = e + this.$$url.substr(1), 
this.$$urlUpdatedByLocation = !0;
}, this.$$parseLinkUrl = function(r, i) {
if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
var o, a, s;
return b(o = Xe(t, r)) ? (a = o, s = n && b(o = Xe(n, o)) ? e + (Xe("/", o) || o) :t + a) :b(o = Xe(e, r)) ? s = e + o :e === r + "/" && (s = e), 
s && this.$$parse(s), !!s;
};
}
function an(t, e, n) {
Ze(t, this), this.$$parse = function(r) {
function i(t, e, n) {
var r, i = /^\/[A-Z]:(\/.*)/;
return Qe(e, n) && (e = e.replace(n, "")), i.exec(e) ? t :(r = i.exec(t), r ? r[1] :t);
}
var o, a = Xe(t, r) || Xe(e, r);
y(a) || "#" !== a.charAt(0) ? this.$$html5 ? o = a :(o = "", y(a) && (t = r, this.replace())) :(o = Xe(n, a), 
y(o) && (o = a)), Ye(o, this, !1), this.$$path = i(this.$$path, o, t), this.$$compose();
}, this.$$compose = function() {
var e = it(this.$$search), r = this.$$hash ? "#" + ot(this.$$hash) :"";
this.$$url = Je(this.$$path) + (e ? "?" + e :"") + r, this.$$absUrl = t + (this.$$url ? n + this.$$url :""), 
this.$$urlUpdatedByLocation = !0;
}, this.$$parseLinkUrl = function(e, n) {
return tn(t) === tn(e) ? (this.$$parse(e), !0) :!1;
};
}
function sn(t, e, n) {
this.$$html5 = !0, an.apply(this, arguments), this.$$parseLinkUrl = function(r, i) {
if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
var o, a;
return t === tn(r) ? o = r :(a = Xe(e, r)) ? o = t + n + a :e === r + "/" && (o = e), 
o && this.$$parse(o), !!o;
}, this.$$compose = function() {
var e = it(this.$$search), r = this.$$hash ? "#" + ot(this.$$hash) :"";
this.$$url = Je(this.$$path) + (e ? "?" + e :"") + r, this.$$absUrl = t + n + this.$$url, 
this.$$urlUpdatedByLocation = !0;
};
}
function un(t) {
return function() {
return this[t];
};
}
function cn(t, e) {
return function(n) {
return y(n) ? this[t] :(this[t] = e(n), this.$$compose(), this);
};
}
function ln() {
var t = "!", e = {
enabled:!1,
requireBase:!0,
rewriteLinks:!0
};
this.hashPrefix = function(e) {
return b(e) ? (t = e, this) :t;
}, this.html5Mode = function(t) {
return j(t) ? (e.enabled = t, this) :w(t) ? (j(t.enabled) && (e.enabled = t.enabled), 
j(t.requireBase) && (e.requireBase = t.requireBase), (j(t.rewriteLinks) || C(t.rewriteLinks)) && (e.rewriteLinks = t.rewriteLinks), 
this) :e;
}, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(n, r, i, o, a) {
function s(t, e, n) {
var i = c.url(), o = c.$$state;
try {
r.url(t, e, n), c.$$state = r.state();
} catch (a) {
throw c.url(i), c.$$state = o, a;
}
}
function u(t, e) {
n.$broadcast("$locationChangeSuccess", c.absUrl(), t, c.$$state, e);
}
var c, l, f, h = r.baseHref(), p = r.url();
if (e.enabled) {
if (!h && e.requireBase) throw Po("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
f = rn(p) + (h || "/"), l = i.history ? on :sn;
} else f = tn(p), l = an;
var d = nn(f);
c = new l(f, d, "#" + t), c.$$parseLinkUrl(p, p), c.$$state = r.state();
var $ = /^\s*(javascript|mailto):/i;
o.on("click", function(t) {
var i = e.rewriteLinks;
if (i && !t.ctrlKey && !t.metaKey && !t.shiftKey && 2 !== t.which && 2 !== t.button) {
for (var s = ui(t.target); "a" !== L(s[0]); ) if (s[0] === o[0] || !(s = s.parent())[0]) return;
if (!C(i) || !y(s.attr(i))) {
var u = s.prop("href"), l = s.attr("href") || s.attr("xlink:href");
w(u) && "[object SVGAnimatedString]" === u.toString() && (u = Wn(u.animVal).href), 
$.test(u) || !u || s.attr("target") || t.isDefaultPrevented() || c.$$parseLinkUrl(u, l) && (t.preventDefault(), 
c.absUrl() !== r.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0));
}
}
}), en(c.absUrl()) !== en(p) && r.url(c.absUrl(), !0);
var v = !0;
return r.onUrlChange(function(t, e) {
return Qe(t, d) ? (n.$evalAsync(function() {
var r, i = c.absUrl(), o = c.$$state;
t = en(t), c.$$parse(t), c.$$state = e, r = n.$broadcast("$locationChangeStart", t, i, e, o).defaultPrevented, 
c.absUrl() === t && (r ? (c.$$parse(i), c.$$state = o, s(i, !1, o)) :(v = !1, u(i, o)));
}), void (n.$$phase || n.$digest())) :void (a.location.href = t);
}), n.$watch(function() {
if (v || c.$$urlUpdatedByLocation) {
c.$$urlUpdatedByLocation = !1;
var t = en(r.url()), e = en(c.absUrl()), o = r.state(), a = c.$$replace, l = t !== e || c.$$html5 && i.history && o !== c.$$state;
(v || l) && (v = !1, n.$evalAsync(function() {
var e = c.absUrl(), r = n.$broadcast("$locationChangeStart", e, t, c.$$state, o).defaultPrevented;
c.absUrl() === e && (r ? (c.$$parse(t), c.$$state = o) :(l && s(e, a, o === c.$$state ? null :c.$$state), 
u(t, o)));
}));
}
c.$$replace = !1;
}), c;
} ];
}
function fn() {
var t = !0, e = this;
this.debugEnabled = function(e) {
return b(e) ? (t = e, this) :t;
}, this.$get = [ "$window", function(n) {
function r(t) {
return k(t) && (t.stack && a ? t = t.message && -1 === t.stack.indexOf(t.message) ? "Error: " + t.message + "\n" + t.stack :t.stack :t.sourceURL && (t = t.message + "\n" + t.sourceURL + ":" + t.line)), 
t;
}
function i(t) {
var e = n.console || {}, i = e[t] || e.log || $;
return function() {
var t = [];
return o(arguments, function(e) {
t.push(r(e));
}), Function.prototype.apply.call(i, e, t);
};
}
var a = si || /\bEdge\//.test(n.navigator && n.navigator.userAgent);
return {
log:i("log"),
info:i("info"),
warn:i("warn"),
error:i("error"),
debug:function() {
var n = i("debug");
return function() {
t && n.apply(e, arguments);
};
}()
};
} ];
}
function hn(t) {
return t + "";
}
function pn(t, e) {
return "undefined" != typeof t ? t :e;
}
function dn(t, e) {
return "undefined" == typeof t ? e :"undefined" == typeof e ? t :t + e;
}
function $n(t, e) {
var n = t(e);
return !n.$stateful;
}
function vn(t, e) {
switch (t.type) {
case Bo.MemberExpression:
if (t.computed) return !1;
break;

case Bo.UnaryExpression:
return zo;

case Bo.BinaryExpression:
return "+" !== t.operator ? zo :!1;

case Bo.CallExpression:
return !1;
}
return void 0 === e ? Wo :e;
}
function mn(t, e, n) {
var r, i, a, s = t.isPure = vn(t, n);
switch (t.type) {
case Bo.Program:
r = !0, o(t.body, function(t) {
mn(t.expression, e, s), r = r && t.expression.constant;
}), t.constant = r;
break;

case Bo.Literal:
t.constant = !0, t.toWatch = [];
break;

case Bo.UnaryExpression:
mn(t.argument, e, s), t.constant = t.argument.constant, t.toWatch = t.argument.toWatch;
break;

case Bo.BinaryExpression:
mn(t.left, e, s), mn(t.right, e, s), t.constant = t.left.constant && t.right.constant, 
t.toWatch = t.left.toWatch.concat(t.right.toWatch);
break;

case Bo.LogicalExpression:
mn(t.left, e, s), mn(t.right, e, s), t.constant = t.left.constant && t.right.constant, 
t.toWatch = t.constant ? [] :[ t ];
break;

case Bo.ConditionalExpression:
mn(t.test, e, s), mn(t.alternate, e, s), mn(t.consequent, e, s), t.constant = t.test.constant && t.alternate.constant && t.consequent.constant, 
t.toWatch = t.constant ? [] :[ t ];
break;

case Bo.Identifier:
t.constant = !1, t.toWatch = [ t ];
break;

case Bo.MemberExpression:
mn(t.object, e, s), t.computed && mn(t.property, e, s), t.constant = t.object.constant && (!t.computed || t.property.constant), 
t.toWatch = t.constant ? [] :[ t ];
break;

case Bo.CallExpression:
a = t.filter ? $n(e, t.callee.name) :!1, r = a, i = [], o(t.arguments, function(t) {
mn(t, e, s), r = r && t.constant, i.push.apply(i, t.toWatch);
}), t.constant = r, t.toWatch = a ? i :[ t ];
break;

case Bo.AssignmentExpression:
mn(t.left, e, s), mn(t.right, e, s), t.constant = t.left.constant && t.right.constant, 
t.toWatch = [ t ];
break;

case Bo.ArrayExpression:
r = !0, i = [], o(t.elements, function(t) {
mn(t, e, s), r = r && t.constant, i.push.apply(i, t.toWatch);
}), t.constant = r, t.toWatch = i;
break;

case Bo.ObjectExpression:
r = !0, i = [], o(t.properties, function(t) {
mn(t.value, e, s), r = r && t.value.constant, i.push.apply(i, t.value.toWatch), 
t.computed && (mn(t.key, e, !1), r = r && t.key.constant, i.push.apply(i, t.key.toWatch));
}), t.constant = r, t.toWatch = i;
break;

case Bo.ThisExpression:
t.constant = !1, t.toWatch = [];
break;

case Bo.LocalsExpression:
t.constant = !1, t.toWatch = [];
}
}
function gn(t) {
if (1 === t.length) {
var e = t[0].expression, n = e.toWatch;
return 1 !== n.length ? n :n[0] !== e ? n :void 0;
}
}
function yn(t) {
return t.type === Bo.Identifier || t.type === Bo.MemberExpression;
}
function bn(t) {
return 1 === t.body.length && yn(t.body[0].expression) ? {
type:Bo.AssignmentExpression,
left:t.body[0].expression,
right:{
type:Bo.NGValueParameter
},
operator:"="
} :void 0;
}
function wn(t) {
return 0 === t.body.length || 1 === t.body.length && (t.body[0].expression.type === Bo.Literal || t.body[0].expression.type === Bo.ArrayExpression || t.body[0].expression.type === Bo.ObjectExpression);
}
function xn(t) {
return t.constant;
}
function Cn(t) {
this.$filter = t;
}
function En(t) {
this.$filter = t;
}
function Sn(t, e, n) {
this.ast = new Bo(t, n), this.astCompiler = n.csp ? new En(e) :new Cn(e);
}
function kn(t) {
return A(t.valueOf) ? t.valueOf() :Lo.call(t);
}
function An() {
var t, e, n = bt(), r = {
"true":!0,
"false":!1,
"null":null,
undefined:void 0
};
this.addLiteral = function(t, e) {
r[t] = e;
}, this.setIdentifierFns = function(n, r) {
return t = n, e = r, this;
}, this.$get = [ "$filter", function(i) {
function a(t, e) {
var r, o;
switch (typeof t) {
case "string":
if (t = t.trim(), o = t, r = n[o], !r) {
var a = new Ho(v), s = new Sn(a, i, v);
r = s.parse(t), r.constant ? r.$$watchDelegate = h :r.oneTime ? r.$$watchDelegate = r.literal ? f :l :r.inputs && (r.$$watchDelegate = c), 
n[o] = r;
}
return p(r, e);

case "function":
return p(t, e);

default:
return p($, e);
}
}
function s(t) {
var e = new Ho(v), n = new Sn(e, i, v);
return n.getAst(t).ast;
}
function u(t, e, n) {
return null == t || null == e ? t === e :"object" != typeof t || (t = kn(t), "object" != typeof t || n) ? t === e || t !== t && e !== e :!1;
}
function c(t, e, n, r, i) {
var o, a = r.inputs;
if (1 === a.length) {
var s = u;
return a = a[0], t.$watch(function(t) {
var e = a(t);
return u(e, s, a.isPure) || (o = r(t, void 0, void 0, [ e ]), s = e && kn(e)), o;
}, e, n, i);
}
for (var c = [], l = [], f = 0, h = a.length; h > f; f++) c[f] = u, l[f] = null;
return t.$watch(function(t) {
for (var e = !1, n = 0, i = a.length; i > n; n++) {
var s = a[n](t);
(e || (e = !u(s, c[n], a[n].isPure))) && (l[n] = s, c[n] = s && kn(s));
}
return e && (o = r(t, void 0, void 0, l)), o;
}, e, n, i);
}
function l(t, e, n, r, i) {
function o(t) {
return r(t);
}
function a(t, n, r) {
u = t, A(e) && e(t, n, r), b(t) && r.$$postDigest(function() {
b(u) && s();
});
}
var s, u;
return s = r.inputs ? c(t, a, n, r, i) :t.$watch(o, a, n);
}
function f(t, e, n, r) {
function i(t) {
var e = !0;
return o(t, function(t) {
b(t) || (e = !1);
}), e;
}
var a, s;
return a = t.$watch(function(t) {
return r(t);
}, function(t, n, r) {
s = t, A(e) && e(t, n, r), i(t) && r.$$postDigest(function() {
i(s) && a();
});
}, n);
}
function h(t, e, n, r) {
var i = t.$watch(function(t) {
return i(), r(t);
}, e, n);
return i;
}
function p(t, e) {
if (!e) return t;
var n = t.$$watchDelegate, r = !1, i = n !== f && n !== l, o = i ? function(n, i, o, a) {
var s = r && a ? a[0] :t(n, i, o, a);
return e(s, n, i);
} :function(n, r, i, o) {
var a = t(n, r, i, o), s = e(a, n, r);
return b(a) ? s :a;
};
return r = !t.inputs, n && n !== c ? (o.$$watchDelegate = n, o.inputs = t.inputs) :e.$stateful || (o.$$watchDelegate = c, 
o.inputs = t.inputs ? t.inputs :[ t ]), o.inputs && (o.inputs = o.inputs.map(function(t) {
return t.isPure === Wo ? function(e) {
return t(e);
} :t;
})), o;
}
var d = Ei().noUnsafeEval, v = {
csp:d,
literals:H(r),
isIdentifierStart:A(t) && t,
isIdentifierContinue:A(e) && e
};
return a.$$getAst = s, a;
} ];
}
function On() {
var t = !0;
this.$get = [ "$rootScope", "$exceptionHandler", function(e, n) {
return Vn(function(t) {
e.$evalAsync(t);
}, n, t);
} ], this.errorOnUnhandledRejections = function(e) {
return b(e) ? (t = e, this) :t;
};
}
function Mn() {
var t = !0;
this.$get = [ "$browser", "$exceptionHandler", function(e, n) {
return Vn(function(t) {
e.defer(t);
}, n, t);
} ], this.errorOnUnhandledRejections = function(e) {
return b(e) ? (t = e, this) :t;
};
}
function Vn(t, e, n) {
function i() {
return new a();
}
function a() {
var t = this.promise = new s();
this.resolve = function(e) {
h(t, e);
}, this.reject = function(e) {
d(t, e);
}, this.notify = function(e) {
v(t, e);
};
}
function s() {
this.$$state = {
status:0
};
}
function u(r) {
var i, o, a;
a = r.pending, r.processScheduled = !1, r.pending = void 0;
try {
for (var s = 0, u = a.length; u > s; ++s) {
Nn(r), o = a[s][0], i = a[s][r.status];
try {
A(i) ? h(o, i(r.value)) :1 === r.status ? h(o, r.value) :d(o, r.value);
} catch (l) {
d(o, l), l && l.$$passToExceptionHandler === !0 && e(l);
}
}
} finally {
--O, n && 0 === O && t(c);
}
}
function c() {
for (;!O && M.length; ) {
var t = M.shift();
if (!Tn(t)) {
Nn(t);
var n = "Possibly unhandled rejection: " + St(t.value);
k(t.value) ? e(t.value, n) :e(n);
}
}
}
function l(e) {
!n || e.pending || 2 !== e.status || Tn(e) || (0 === O && 0 === M.length && t(c), 
M.push(e)), !e.processScheduled && e.pending && (e.processScheduled = !0, ++O, t(function() {
u(e);
}));
}
function h(t, e) {
t.$$state.status || (e === t ? $(t, S("qcycle", "Expected promise to be resolved with value other than itself '{0}'", e)) :p(t, e));
}
function p(t, e) {
function n(e) {
a || (a = !0, p(t, e));
}
function r(e) {
a || (a = !0, $(t, e));
}
function i(e) {
v(t, e);
}
var o, a = !1;
try {
(w(e) || A(e)) && (o = e.then), A(o) ? (t.$$state.status = -1, o.call(e, n, r, i)) :(t.$$state.value = e, 
t.$$state.status = 1, l(t.$$state));
} catch (s) {
r(s);
}
}
function d(t, e) {
t.$$state.status || $(t, e);
}
function $(t, e) {
t.$$state.value = e, t.$$state.status = 2, l(t.$$state);
}
function v(n, r) {
var i = n.$$state.pending;
n.$$state.status <= 0 && i && i.length && t(function() {
for (var t, n, o = 0, a = i.length; a > o; o++) {
n = i[o][0], t = i[o][3];
try {
v(n, A(t) ? t(r) :r);
} catch (s) {
e(s);
}
}
});
}
function m(t) {
var e = new s();
return d(e, t), e;
}
function g(t, e, n) {
var r = null;
try {
A(n) && (r = n());
} catch (i) {
return m(i);
}
return D(r) ? r.then(function() {
return e(t);
}, m) :e(t);
}
function b(t, e, n, r) {
var i = new s();
return h(i, t), i.then(e, n, r);
}
function x(t) {
var e = new s(), n = 0, r = bi(t) ? [] :{};
return o(t, function(t, i) {
n++, b(t).then(function(t) {
r[i] = t, --n || h(e, r);
}, function(t) {
d(e, t);
});
}), 0 === n && h(e, r), e;
}
function C(t) {
var e = i();
return o(t, function(t) {
b(t).then(e.resolve, e.reject);
}), e.promise;
}
function E(t) {
function e(t) {
h(r, t);
}
function n(t) {
d(r, t);
}
if (!A(t)) throw S("norslvr", "Expected resolverFn, got '{0}'", t);
var r = new s();
return t(e, n), r;
}
var S = r("$q", TypeError), O = 0, M = [];
f(s.prototype, {
then:function(t, e, n) {
if (y(t) && y(e) && y(n)) return this;
var r = new s();
return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([ r, t, e, n ]), 
this.$$state.status > 0 && l(this.$$state), r;
},
"catch":function(t) {
return this.then(null, t);
},
"finally":function(t, e) {
return this.then(function(e) {
return g(e, V, t);
}, function(e) {
return g(e, m, t);
}, e);
}
});
var V = b;
return E.prototype = s.prototype, E.defer = i, E.reject = m, E.when = b, E.resolve = V, 
E.all = x, E.race = C, E;
}
function Tn(t) {
return !!t.pur;
}
function Nn(t) {
t.pur = !0;
}
function In(t) {
Nn(t.$$state);
}
function jn() {
this.$get = [ "$window", "$timeout", function(t, e) {
var n = t.requestAnimationFrame || t.webkitRequestAnimationFrame, r = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame, i = !!n, o = i ? function(t) {
var e = n(t);
return function() {
r(e);
};
} :function(t) {
var n = e(t, 16.66, !1);
return function() {
e.cancel(n);
};
};
return o.supported = i, o;
} ];
}
function Dn() {
function t(t) {
function e() {
this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = u(), 
this.$$ChildScope = null;
}
return e.prototype = t, e;
}
var e = 10, n = r("$rootScope"), a = null, s = null;
this.digestTtl = function(t) {
return arguments.length && (e = t), e;
}, this.$get = [ "$exceptionHandler", "$parse", "$browser", function(r, c, l) {
function f(t) {
t.currentScope.$$destroyed = !0;
}
function h(t) {
9 === si && (t.$$childHead && h(t.$$childHead), t.$$nextSibling && h(t.$$nextSibling)), 
t.$parent = t.$$nextSibling = t.$$prevSibling = t.$$childHead = t.$$childTail = t.$root = t.$$watchers = null;
}
function p() {
this.$id = u(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
this.$$watchersCount = 0, this.$$isolateBindings = null;
}
function d(t) {
if (E.$$phase) throw n("inprog", "{0} already in progress", E.$$phase);
E.$$phase = t;
}
function v() {
E.$$phase = null;
}
function m(t, e) {
do t.$$watchersCount += e; while (t = t.$parent);
}
function g(t, e, n) {
do t.$$listenerCount[n] -= e, 0 === t.$$listenerCount[n] && delete t.$$listenerCount[n]; while (t = t.$parent);
}
function b() {}
function x() {
for (;O.length; ) try {
O.shift()();
} catch (t) {
r(t);
}
s = null;
}
function C() {
null === s && (s = l.defer(function() {
E.$apply(x);
}));
}
p.prototype = {
constructor:p,
$new:function(e, n) {
var r;
return n = n || this, e ? (r = new p(), r.$root = this.$root) :(this.$$ChildScope || (this.$$ChildScope = t(this)), 
r = new this.$$ChildScope()), r.$parent = n, r.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = r, 
n.$$childTail = r) :n.$$childHead = n.$$childTail = r, (e || n !== this) && r.$on("$destroy", f), 
r;
},
$watch:function(t, e, n, r) {
var i = c(t), o = A(e) ? e :$;
if (i.$$watchDelegate) return i.$$watchDelegate(this, o, n, i, t);
var s = this, u = s.$$watchers, l = {
fn:o,
last:b,
get:i,
exp:r || t,
eq:!!n
};
return a = null, u || (u = s.$$watchers = [], u.$$digestWatchIndex = -1), u.unshift(l), 
u.$$digestWatchIndex++, m(this, 1), function() {
var t = F(u, l);
t >= 0 && (m(s, -1), t < u.$$digestWatchIndex && u.$$digestWatchIndex--), a = null;
};
},
$watchGroup:function(t, e) {
function n() {
u = !1, c ? (c = !1, e(i, i, s)) :e(i, r, s);
}
var r = new Array(t.length), i = new Array(t.length), a = [], s = this, u = !1, c = !0;
if (!t.length) {
var l = !0;
return s.$evalAsync(function() {
l && e(i, i, s);
}), function() {
l = !1;
};
}
return 1 === t.length ? this.$watch(t[0], function(t, n, o) {
i[0] = t, r[0] = n, e(i, t === n ? i :r, o);
}) :(o(t, function(t, e) {
var o = s.$watch(t, function(t, o) {
i[e] = t, r[e] = o, u || (u = !0, s.$evalAsync(n));
});
a.push(o);
}), function() {
for (;a.length; ) a.shift()();
});
},
$watchCollection:function(t, e) {
function n(t) {
o = t;
var e, n, r, s, u;
if (!y(o)) {
if (w(o)) if (i(o)) {
a !== p && (a = p, v = a.length = 0, f++), e = o.length, v !== e && (f++, a.length = v = e);
for (var c = 0; e > c; c++) u = a[c], s = o[c], r = u !== u && s !== s, r || u === s || (f++, 
a[c] = s);
} else {
a !== d && (a = d = {}, v = 0, f++), e = 0;
for (n in o) ni.call(o, n) && (e++, s = o[n], u = a[n], n in a ? (r = u !== u && s !== s, 
r || u === s || (f++, a[n] = s)) :(v++, a[n] = s, f++));
if (v > e) {
f++;
for (n in a) ni.call(o, n) || (v--, delete a[n]);
}
} else a !== o && (a = o, f++);
return f;
}
}
function r() {
if ($ ? ($ = !1, e(o, o, u)) :e(o, s, u), l) if (w(o)) if (i(o)) {
s = new Array(o.length);
for (var t = 0; t < o.length; t++) s[t] = o[t];
} else {
s = {};
for (var n in o) ni.call(o, n) && (s[n] = o[n]);
} else s = o;
}
n.$stateful = !0;
var o, a, s, u = this, l = e.length > 1, f = 0, h = c(t, n), p = [], d = {}, $ = !0, v = 0;
return this.$watch(h, r);
},
$digest:function() {
var t, i, o, u, c, f, h, p, $, m, g, y = e, w = this, C = [];
d("$digest"), l.$$checkUrlChange(), this === E && null !== s && (l.defer.cancel(s), 
x()), a = null;
do {
h = !1, $ = w;
for (var O = 0; O < S.length; O++) {
try {
g = S[O], u = g.fn, u(g.scope, g.locals);
} catch (V) {
r(V);
}
a = null;
}
S.length = 0;
t:do {
if (f = $.$$watchers) for (f.$$digestWatchIndex = f.length; f.$$digestWatchIndex--; ) try {
if (t = f[f.$$digestWatchIndex]) if (c = t.get, (i = c($)) === (o = t.last) || (t.eq ? z(i, o) :yi(i) && yi(o))) {
if (t === a) {
h = !1;
break t;
}
} else h = !0, a = t, t.last = t.eq ? H(i, null) :i, u = t.fn, u(i, o === b ? i :o, $), 
5 > y && (m = 4 - y, C[m] || (C[m] = []), C[m].push({
msg:A(t.exp) ? "fn: " + (t.exp.name || t.exp.toString()) :t.exp,
newVal:i,
oldVal:o
}));
} catch (V) {
r(V);
}
if (!(p = $.$$watchersCount && $.$$childHead || $ !== w && $.$$nextSibling)) for (;$ !== w && !(p = $.$$nextSibling); ) $ = $.$parent;
} while ($ = p);
if ((h || S.length) && !y--) throw v(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, C);
} while (h || S.length);
for (v(); M < k.length; ) try {
k[M++]();
} catch (V) {
r(V);
}
k.length = M = 0, l.$$checkUrlChange();
},
$destroy:function() {
if (!this.$$destroyed) {
var t = this.$parent;
this.$broadcast("$destroy"), this.$$destroyed = !0, this === E && l.$$applicationDestroyed(), 
m(this, -this.$$watchersCount);
for (var e in this.$$listenerCount) g(this, this.$$listenerCount[e], e);
t && t.$$childHead === this && (t.$$childHead = this.$$nextSibling), t && t.$$childTail === this && (t.$$childTail = this.$$prevSibling), 
this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = $, 
this.$on = this.$watch = this.$watchGroup = function() {
return $;
}, this.$$listeners = {}, this.$$nextSibling = null, h(this);
}
},
$eval:function(t, e) {
return c(t)(this, e);
},
$evalAsync:function(t, e) {
E.$$phase || S.length || l.defer(function() {
S.length && E.$digest();
}), S.push({
scope:this,
fn:c(t),
locals:e
});
},
$$postDigest:function(t) {
k.push(t);
},
$apply:function(t) {
try {
d("$apply");
try {
return this.$eval(t);
} finally {
v();
}
} catch (e) {
r(e);
} finally {
try {
E.$digest();
} catch (e) {
throw r(e), e;
}
}
},
$applyAsync:function(t) {
function e() {
n.$eval(t);
}
var n = this;
t && O.push(e), t = c(t), C();
},
$on:function(t, e) {
var n = this.$$listeners[t];
n || (this.$$listeners[t] = n = []), n.push(e);
var r = this;
do r.$$listenerCount[t] || (r.$$listenerCount[t] = 0), r.$$listenerCount[t]++; while (r = r.$parent);
var i = this;
return function() {
var r = n.indexOf(e);
-1 !== r && (delete n[r], g(i, 1, t));
};
},
$emit:function(t, e) {
var n, i, o, a = [], s = this, u = !1, c = {
name:t,
targetScope:s,
stopPropagation:function() {
u = !0;
},
preventDefault:function() {
c.defaultPrevented = !0;
},
defaultPrevented:!1
}, l = W([ c ], arguments, 1);
do {
for (n = s.$$listeners[t] || a, c.currentScope = s, i = 0, o = n.length; o > i; i++) if (n[i]) try {
n[i].apply(null, l);
} catch (f) {
r(f);
} else n.splice(i, 1), i--, o--;
if (u) break;
s = s.$parent;
} while (s);
return c.currentScope = null, c;
},
$broadcast:function(t, e) {
var n = this, i = n, o = n, a = {
name:t,
targetScope:n,
preventDefault:function() {
a.defaultPrevented = !0;
},
defaultPrevented:!1
};
if (!n.$$listenerCount[t]) return a;
for (var s, u, c, l = W([ a ], arguments, 1); i = o; ) {
for (a.currentScope = i, s = i.$$listeners[t] || [], u = 0, c = s.length; c > u; u++) if (s[u]) try {
s[u].apply(null, l);
} catch (f) {
r(f);
} else s.splice(u, 1), u--, c--;
if (!(o = i.$$listenerCount[t] && i.$$childHead || i !== n && i.$$nextSibling)) for (;i !== n && !(o = i.$$nextSibling); ) i = i.$parent;
}
return a.currentScope = null, a;
}
};
var E = new p(), S = E.$$asyncQueue = [], k = E.$$postDigestQueue = [], O = E.$$applyAsyncQueue = [], M = 0;
return E;
} ];
}
function Pn() {
var t = /^\s*(https?|s?ftp|mailto|tel|file):/, e = /^\s*((https?|ftp|file|blob):|data:image\/)/;
this.aHrefSanitizationWhitelist = function(e) {
return b(e) ? (t = e, this) :t;
}, this.imgSrcSanitizationWhitelist = function(t) {
return b(t) ? (e = t, this) :e;
}, this.$get = function() {
return function(n, r) {
var i, o = r ? e :t;
return i = Wn(n && n.trim()).href, "" === i || i.match(o) ? n :"unsafe:" + i;
};
};
}
function _n(t) {
return t.replace(Ko, Mt);
}
function Rn(t) {
if ("self" === t) return t;
if (C(t)) {
if (t.indexOf("***") > -1) throw Go("iwcard", "Illegal sequence *** in string matcher.  String: {0}", t);
return t = Ci(t).replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^:/.?&;]*"), new RegExp("^" + t + "$");
}
if (O(t)) return new RegExp("^" + t.source + "$");
throw Go("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
}
function Un(t) {
var e = [];
return b(t) && o(t, function(t) {
e.push(Rn(t));
}), e;
}
function Ln() {
this.SCE_CONTEXTS = Jo;
var t = [ "self" ], e = [];
this.resourceUrlWhitelist = function(e) {
return arguments.length && (t = Un(e)), t;
}, this.resourceUrlBlacklist = function(t) {
return arguments.length && (e = Un(t)), e;
}, this.$get = [ "$injector", function(n) {
function r(t, e) {
return "self" === t ? Gn(e) :!!t.exec(e.href);
}
function i(n) {
var i, o, a = Wn(n.toString()), s = !1;
for (i = 0, o = t.length; o > i; i++) if (r(t[i], a)) {
s = !0;
break;
}
if (s) for (i = 0, o = e.length; o > i; i++) if (r(e[i], a)) {
s = !1;
break;
}
return s;
}
function o(t) {
var e = function(t) {
this.$$unwrapTrustedValue = function() {
return t;
};
};
return t && (e.prototype = new t()), e.prototype.valueOf = function() {
return this.$$unwrapTrustedValue();
}, e.prototype.toString = function() {
return this.$$unwrapTrustedValue().toString();
}, e;
}
function a(t, e) {
var n = f.hasOwnProperty(t) ? f[t] :null;
if (!n) throw Go("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", t, e);
if (null === e || y(e) || "" === e) return e;
if ("string" != typeof e) throw Go("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", t);
return new n(e);
}
function s(t) {
return t instanceof l ? t.$$unwrapTrustedValue() :t;
}
function u(t, e) {
if (null === e || y(e) || "" === e) return e;
var n = f.hasOwnProperty(t) ? f[t] :null;
if (n && e instanceof n) return e.$$unwrapTrustedValue();
if (t === Jo.RESOURCE_URL) {
if (i(e)) return e;
throw Go("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", e.toString());
}
if (t === Jo.HTML) return c(e);
throw Go("unsafe", "Attempting to use an unsafe value in a safe context.");
}
var c = function(t) {
throw Go("unsafe", "Attempting to use an unsafe value in a safe context.");
};
n.has("$sanitize") && (c = n.get("$sanitize"));
var l = o(), f = {};
return f[Jo.HTML] = o(l), f[Jo.CSS] = o(l), f[Jo.URL] = o(l), f[Jo.JS] = o(l), f[Jo.RESOURCE_URL] = o(f[Jo.URL]), 
{
trustAs:a,
getTrusted:u,
valueOf:s
};
} ];
}
function qn() {
var t = !0;
this.enabled = function(e) {
return arguments.length && (t = !!e), t;
}, this.$get = [ "$parse", "$sceDelegate", function(e, n) {
if (t && 8 > si) throw Go("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
var r = Ct(Jo);
r.isEnabled = function() {
return t;
}, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, t || (r.trustAs = r.getTrusted = function(t, e) {
return e;
}, r.valueOf = v), r.parseAs = function(t, n) {
var i = e(n);
return i.literal && i.constant ? i :e(n, function(e) {
return r.getTrusted(t, e);
});
};
var i = r.parseAs, a = r.getTrusted, s = r.trustAs;
return o(Jo, function(t, e) {
var n = ri(e);
r[_n("parse_as_" + n)] = function(e) {
return i(t, e);
}, r[_n("get_trusted_" + n)] = function(e) {
return a(t, e);
}, r[_n("trust_as_" + n)] = function(e) {
return s(t, e);
};
}), r;
} ];
}
function Fn() {
this.$get = [ "$window", "$document", function(t, e) {
var n = {}, r = t.nw && t.nw.process, i = !r && t.chrome && (t.chrome.app && t.chrome.app.runtime || !t.chrome.app && t.chrome.runtime && t.chrome.runtime.id), o = !i && t.history && t.history.pushState, a = p((/android (\d+)/.exec(ri((t.navigator || {}).userAgent)) || [])[1]), s = /Boxee/i.test((t.navigator || {}).userAgent), u = e[0] || {}, c = u.body && u.body.style, l = !1, f = !1;
return c && (l = !!("transition" in c || "webkitTransition" in c), f = !!("animation" in c || "webkitAnimation" in c)), 
{
history:!(!o || 4 > a || s),
hasEvent:function(t) {
if ("input" === t && si) return !1;
if (y(n[t])) {
var e = u.createElement("div");
n[t] = "on" + t in e;
}
return n[t];
},
csp:Ei(),
transitions:l,
animations:f,
android:a
};
} ];
}
function Hn() {
var t;
this.httpOptions = function(e) {
return e ? (t = e, this) :t;
}, this.$get = [ "$exceptionHandler", "$templateCache", "$http", "$q", "$sce", function(e, n, r, i, o) {
function a(s, u) {
function c(t) {
return u || (t = Zo("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", s, t.status, t.statusText), 
e(t)), i.reject(t);
}
a.totalPendingRequests++, (!C(s) || y(n.get(s))) && (s = o.getTrustedResourceUrl(s));
var l = r.defaults && r.defaults.transformResponse;
return bi(l) ? l = l.filter(function(t) {
return t !== Pe;
}) :l === Pe && (l = null), r.get(s, f({
cache:n,
transformResponse:l
}, t))["finally"](function() {
a.totalPendingRequests--;
}).then(function(t) {
return n.put(s, t.data), t.data;
}, c);
}
return a.totalPendingRequests = 0, a;
} ];
}
function Bn() {
this.$get = [ "$rootScope", "$browser", "$location", function(t, e, n) {
var r = {};
return r.findBindings = function(t, e, n) {
var r = t.getElementsByClassName("ng-binding"), i = [];
return o(r, function(t) {
var r = mi.element(t).data("$binding");
r && o(r, function(r) {
if (n) {
var o = new RegExp("(^|\\s)" + Ci(e) + "(\\s|\\||$)");
o.test(r) && i.push(t);
} else -1 !== r.indexOf(e) && i.push(t);
});
}), i;
}, r.findModels = function(t, e, n) {
for (var r = [ "ng-", "data-ng-", "ng\\:" ], i = 0; i < r.length; ++i) {
var o = n ? "=" :"*=", a = "[" + r[i] + "model" + o + '"' + e + '"]', s = t.querySelectorAll(a);
if (s.length) return s;
}
}, r.getLocation = function() {
return n.url();
}, r.setLocation = function(e) {
e !== n.url() && (n.url(e), t.$digest());
}, r.whenStable = function(t) {
e.notifyWhenNoOutstandingRequests(t);
}, r;
} ];
}
function zn() {
this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(t, e, n, r, i) {
function o(o, s, u) {
A(o) || (u = s, s = o, o = $);
var c, l = G(arguments, 3), f = b(u) && !u, h = (f ? r :n).defer(), p = h.promise;
return c = e.defer(function() {
try {
h.resolve(o.apply(null, l));
} catch (e) {
h.reject(e), i(e);
} finally {
delete a[p.$$timeoutId];
}
f || t.$apply();
}, s), p.$$timeoutId = c, a[c] = h, p;
}
var a = {};
return o.cancel = function(t) {
return t && t.$$timeoutId in a ? (In(a[t.$$timeoutId].promise), a[t.$$timeoutId].reject("canceled"), 
delete a[t.$$timeoutId], e.defer.cancel(t.$$timeoutId)) :!1;
}, o;
} ];
}
function Wn(t) {
var e = t;
return si && (Yo.setAttribute("href", e), e = Yo.href), Yo.setAttribute("href", e), 
{
href:Yo.href,
protocol:Yo.protocol ? Yo.protocol.replace(/:$/, "") :"",
host:Yo.host,
search:Yo.search ? Yo.search.replace(/^\?/, "") :"",
hash:Yo.hash ? Yo.hash.replace(/^#/, "") :"",
hostname:Yo.hostname,
port:Yo.port,
pathname:"/" === Yo.pathname.charAt(0) ? Yo.pathname :"/" + Yo.pathname
};
}
function Gn(t) {
var e = C(t) ? Wn(t) :t;
return e.protocol === Qo.protocol && e.host === Qo.host;
}
function Jn() {
this.$get = m(t);
}
function Kn(t) {
function e(t) {
try {
return t.cookie || "";
} catch (e) {
return "";
}
}
function n(t) {
try {
return decodeURIComponent(t);
} catch (e) {
return t;
}
}
var r = t[0] || {}, i = {}, o = "";
return function() {
var t, a, s, u, c, l = e(r);
if (l !== o) for (o = l, t = o.split("; "), i = {}, s = 0; s < t.length; s++) a = t[s], 
u = a.indexOf("="), u > 0 && (c = n(a.substring(0, u)), y(i[c]) && (i[c] = n(a.substring(u + 1))));
return i;
};
}
function Zn() {
this.$get = Kn;
}
function Yn(t) {
function e(r, i) {
if (w(r)) {
var a = {};
return o(r, function(t, n) {
a[n] = e(n, t);
}), a;
}
return t.factory(r + n, i);
}
var n = "Filter";
this.register = e, this.$get = [ "$injector", function(t) {
return function(e) {
return t.get(e + n);
};
} ], e("currency", nr), e("date", mr), e("filter", Qn), e("json", gr), e("limitTo", yr), 
e("lowercase", oa), e("number", rr), e("orderBy", wr), e("uppercase", aa);
}
function Qn() {
return function(t, e, n, o) {
if (!i(t)) {
if (null == t) return t;
throw r("filter")("notarray", "Expected array but received: {0}", t);
}
o = o || "$";
var a, s, u = er(e);
switch (u) {
case "function":
a = e;
break;

case "boolean":
case "null":
case "number":
case "string":
s = !0;

case "object":
a = Xn(e, n, o, s);
break;

default:
return t;
}
return Array.prototype.filter.call(t, a);
};
}
function Xn(t, e, n, r) {
var i, o = w(t) && n in t;
return e === !0 ? e = z :A(e) || (e = function(t, e) {
return y(t) ? !1 :null === t || null === e ? t === e :w(e) || w(t) && !g(t) ? !1 :(t = ri("" + t), 
e = ri("" + e), -1 !== t.indexOf(e));
}), i = function(i) {
return o && !w(i) ? tr(i, t[n], e, n, !1) :tr(i, t, e, n, r);
};
}
function tr(t, e, n, r, i, o) {
var a = er(t), s = er(e);
if ("string" === s && "!" === e.charAt(0)) return !tr(t, e.substring(1), n, r, i);
if (bi(t)) return t.some(function(t) {
return tr(t, e, n, r, i);
});
switch (a) {
case "object":
var u;
if (i) {
for (u in t) if (u.charAt && "$" !== u.charAt(0) && tr(t[u], e, n, r, !0)) return !0;
return o ? !1 :tr(t, e, n, r, !1);
}
if ("object" === s) {
for (u in e) {
var c = e[u];
if (!A(c) && !y(c)) {
var l = u === r, f = l ? t :t[u];
if (!tr(f, c, n, r, l, l)) return !1;
}
}
return !0;
}
return n(t, e);

case "function":
return !1;

default:
return n(t, e);
}
}
function er(t) {
return null === t ? "null" :typeof t;
}
function nr(t) {
var e = t.NUMBER_FORMATS;
return function(t, n, r) {
y(n) && (n = e.CURRENCY_SYM), y(r) && (r = e.PATTERNS[1].maxFrac);
var i = n ? /\u00A4/g :/\s*\u00A4\s*/g;
return null == t ? t :ar(t, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, r).replace(i, n);
};
}
function rr(t) {
var e = t.NUMBER_FORMATS;
return function(t, n) {
return null == t ? t :ar(t, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, n);
};
}
function ir(t) {
var e, n, r, i, o, a = 0;
for ((n = t.indexOf(ta)) > -1 && (t = t.replace(ta, "")), (r = t.search(/e/i)) > 0 ? (0 > n && (n = r), 
n += +t.slice(r + 1), t = t.substring(0, r)) :0 > n && (n = t.length), r = 0; t.charAt(r) === ea; r++) ;
if (r === (o = t.length)) e = [ 0 ], n = 1; else {
for (o--; t.charAt(o) === ea; ) o--;
for (n -= r, e = [], i = 0; o >= r; r++, i++) e[i] = +t.charAt(r);
}
return n > Xo && (e = e.splice(0, Xo - 1), a = n - 1, n = 1), {
d:e,
e:a,
i:n
};
}
function or(t, e, n, r) {
var i = t.d, o = i.length - t.i;
e = y(e) ? Math.min(Math.max(n, o), r) :+e;
var a = e + t.i, s = i[a];
if (a > 0) {
i.splice(Math.max(t.i, a));
for (var u = a; u < i.length; u++) i[u] = 0;
} else {
o = Math.max(0, o), t.i = 1, i.length = Math.max(1, a = e + 1), i[0] = 0;
for (var c = 1; a > c; c++) i[c] = 0;
}
if (s >= 5) if (0 > a - 1) {
for (var l = 0; l > a; l--) i.unshift(0), t.i++;
i.unshift(1), t.i++;
} else i[a - 1]++;
for (;o < Math.max(0, e); o++) i.push(0);
var f = i.reduceRight(function(t, e, n, r) {
return e += t, r[n] = e % 10, Math.floor(e / 10);
}, 0);
f && (i.unshift(f), t.i++);
}
function ar(t, e, n, r, i) {
if (!C(t) && !E(t) || isNaN(t)) return "";
var o, a = !isFinite(t), s = !1, u = Math.abs(t) + "", c = "";
if (a) c = "∞"; else {
o = ir(u), or(o, i, e.minFrac, e.maxFrac);
var l = o.d, f = o.i, h = o.e, p = [];
for (s = l.reduce(function(t, e) {
return t && !e;
}, !0); 0 > f; ) l.unshift(0), f++;
f > 0 ? p = l.splice(f, l.length) :(p = l, l = [ 0 ]);
var d = [];
for (l.length >= e.lgSize && d.unshift(l.splice(-e.lgSize, l.length).join("")); l.length > e.gSize; ) d.unshift(l.splice(-e.gSize, l.length).join(""));
l.length && d.unshift(l.join("")), c = d.join(n), p.length && (c += r + p.join("")), 
h && (c += "e+" + h);
}
return 0 > t && !s ? e.negPre + c + e.negSuf :e.posPre + c + e.posSuf;
}
function sr(t, e, n, r) {
var i = "";
for ((0 > t || r && 0 >= t) && (r ? t = -t + 1 :(t = -t, i = "-")), t = "" + t; t.length < e; ) t = ea + t;
return n && (t = t.substr(t.length - e)), i + t;
}
function ur(t, e, n, r, i) {
return n = n || 0, function(o) {
var a = o["get" + t]();
return (n > 0 || a > -n) && (a += n), 0 === a && -12 === n && (a = 12), sr(a, e, r, i);
};
}
function cr(t, e, n) {
return function(r, i) {
var o = r["get" + t](), a = (n ? "STANDALONE" :"") + (e ? "SHORT" :""), s = ii(a + t);
return i[s][o];
};
}
function lr(t, e, n) {
var r = -1 * n, i = r >= 0 ? "+" :"";
return i += sr(Math[r > 0 ? "floor" :"ceil"](r / 60), 2) + sr(Math.abs(r % 60), 2);
}
function fr(t) {
var e = new Date(t, 0, 1).getDay();
return new Date(t, 0, (4 >= e ? 5 :12) - e);
}
function hr(t) {
return new Date(t.getFullYear(), t.getMonth(), t.getDate() + (4 - t.getDay()));
}
function pr(t) {
return function(e) {
var n = fr(e.getFullYear()), r = hr(e), i = +r - +n, o = 1 + Math.round(i / 6048e5);
return sr(o, t);
};
}
function dr(t, e) {
return t.getHours() < 12 ? e.AMPMS[0] :e.AMPMS[1];
}
function $r(t, e) {
return t.getFullYear() <= 0 ? e.ERAS[0] :e.ERAS[1];
}
function vr(t, e) {
return t.getFullYear() <= 0 ? e.ERANAMES[0] :e.ERANAMES[1];
}
function mr(t) {
function e(t) {
var e;
if (e = t.match(n)) {
var r = new Date(0), i = 0, o = 0, a = e[8] ? r.setUTCFullYear :r.setFullYear, s = e[8] ? r.setUTCHours :r.setHours;
e[9] && (i = p(e[9] + e[10]), o = p(e[9] + e[11])), a.call(r, p(e[1]), p(e[2]) - 1, p(e[3]));
var u = p(e[4] || 0) - i, c = p(e[5] || 0) - o, l = p(e[6] || 0), f = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
return s.call(r, u, c, l, f), r;
}
return t;
}
var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(n, r, i) {
var a, s, u = "", c = [];
if (r = r || "mediumDate", r = t.DATETIME_FORMATS[r] || r, C(n) && (n = ia.test(n) ? p(n) :e(n)), 
E(n) && (n = new Date(n)), !S(n) || !isFinite(n.getTime())) return n;
for (;r; ) s = ra.exec(r), s ? (c = W(c, s, 1), r = c.pop()) :(c.push(r), r = null);
var l = n.getTimezoneOffset();
return i && (l = Q(i, l), n = tt(n, i, !0)), o(c, function(e) {
a = na[e], u += a ? a(n, t.DATETIME_FORMATS, l) :"''" === e ? "'" :e.replace(/(^'|'$)/g, "").replace(/''/g, "'");
}), u;
};
}
function gr() {
return function(t, e) {
return y(e) && (e = 2), Z(t, e);
};
}
function yr() {
return function(t, e, n) {
return e = Math.abs(Number(e)) === 1 / 0 ? Number(e) :p(e), yi(e) ? t :(E(t) && (t = t.toString()), 
i(t) ? (n = !n || isNaN(n) ? 0 :p(n), n = 0 > n ? Math.max(0, t.length + n) :n, 
e >= 0 ? br(t, n, n + e) :0 === n ? br(t, e, t.length) :br(t, Math.max(0, n + e), n)) :t);
};
}
function br(t, e, n) {
return C(t) ? t.slice(e, n) :fi.call(t, e, n);
}
function wr(t) {
function e(e) {
return e.map(function(e) {
var n = 1, r = v;
if (A(e)) r = e; else if (C(e) && (("+" === e.charAt(0) || "-" === e.charAt(0)) && (n = "-" === e.charAt(0) ? -1 :1, 
e = e.substring(1)), "" !== e && (r = t(e), r.constant))) {
var i = r();
r = function(t) {
return t[i];
};
}
return {
get:r,
descending:n
};
});
}
function n(t) {
switch (typeof t) {
case "number":
case "boolean":
case "string":
return !0;

default:
return !1;
}
}
function o(t) {
return A(t.valueOf) && (t = t.valueOf(), n(t)) ? t :g(t) && (t = t.toString(), n(t)) ? t :t;
}
function a(t, e) {
var n = typeof t;
return null === t ? (n = "string", t = "null") :"object" === n && (t = o(t)), {
value:t,
type:n,
index:e
};
}
function s(t, e) {
var n = 0, r = t.type, i = e.type;
if (r === i) {
var o = t.value, a = e.value;
"string" === r ? (o = o.toLowerCase(), a = a.toLowerCase()) :"object" === r && (w(o) && (o = t.index), 
w(a) && (a = e.index)), o !== a && (n = a > o ? -1 :1);
} else n = i > r ? -1 :1;
return n;
}
return function(t, n, o, u) {
function c(t, e) {
return {
value:t,
tieBreaker:{
value:e,
type:"number",
index:e
},
predicateValues:f.map(function(n) {
return a(n.get(t), e);
})
};
}
function l(t, e) {
for (var n = 0, r = f.length; r > n; n++) {
var i = p(t.predicateValues[n], e.predicateValues[n]);
if (i) return i * f[n].descending * h;
}
return (p(t.tieBreaker, e.tieBreaker) || s(t.tieBreaker, e.tieBreaker)) * h;
}
if (null == t) return t;
if (!i(t)) throw r("orderBy")("notarray", "Expected array but received: {0}", t);
bi(n) || (n = [ n ]), 0 === n.length && (n = [ "+" ]);
var f = e(n), h = o ? -1 :1, p = A(u) ? u :s, d = Array.prototype.map.call(t, c);
return d.sort(l), t = d.map(function(t) {
return t.value;
});
};
}
function xr(t) {
return A(t) && (t = {
link:t
}), t.restrict = t.restrict || "AC", m(t);
}
function Cr(t, e) {
t.$name = e;
}
function Er(t, e, n, r, i) {
this.$$controls = [], this.$error = {}, this.$$success = {}, this.$pending = void 0, 
this.$name = i(e.name || e.ngForm || "")(n), this.$dirty = !1, this.$pristine = !0, 
this.$valid = !0, this.$invalid = !1, this.$submitted = !1, this.$$parentForm = ca, 
this.$$element = t, this.$$animate = r, Sr(this);
}
function Sr(t) {
t.$$classCache = {}, t.$$classCache[Ga] = !(t.$$classCache[Wa] = t.$$element.hasClass(Wa));
}
function kr(t) {
function e(t, e, n, r) {
t[e] || (t[e] = {}), a(t[e], n, r);
}
function n(t, e, n, r) {
t[e] && s(t[e], n, r), Ar(t[e]) && (t[e] = void 0);
}
function r(t, e, n) {
n && !t.$$classCache[e] ? (t.$$animate.addClass(t.$$element, e), t.$$classCache[e] = !0) :!n && t.$$classCache[e] && (t.$$animate.removeClass(t.$$element, e), 
t.$$classCache[e] = !1);
}
function i(t, e, n) {
e = e ? "-" + pt(e, "-") :"", r(t, Wa + e, n === !0), r(t, Ga + e, n === !1);
}
var o = t.clazz, a = t.set, s = t.unset;
o.prototype.$setValidity = function(t, o, u) {
y(o) ? e(this, "$pending", t, u) :n(this, "$pending", t, u), j(o) ? o ? (s(this.$error, t, u), 
a(this.$$success, t, u)) :(a(this.$error, t, u), s(this.$$success, t, u)) :(s(this.$error, t, u), 
s(this.$$success, t, u)), this.$pending ? (r(this, la, !0), this.$valid = this.$invalid = void 0, 
i(this, "", null)) :(r(this, la, !1), this.$valid = Ar(this.$error), this.$invalid = !this.$valid, 
i(this, "", this.$valid));
var c;
c = this.$pending && this.$pending[t] ? void 0 :this.$error[t] ? !1 :this.$$success[t] ? !0 :null, 
i(this, t, c), this.$$parentForm.$setValidity(t, c, this);
};
}
function Ar(t) {
if (t) for (var e in t) if (t.hasOwnProperty(e)) return !1;
return !0;
}
function Or(t) {
t.$formatters.push(function(e) {
return t.$isEmpty(e) ? e :e.toString();
});
}
function Mr(t, e, n, r, i, o) {
Vr(t, e, n, r, i, o), Or(r);
}
function Vr(t, e, n, r, i, o) {
var a = ri(e[0].type);
if (!i.android) {
var s = !1;
e.on("compositionstart", function() {
s = !0;
}), e.on("compositionend", function() {
s = !1, c();
});
}
var u, c = function(t) {
if (u && (o.defer.cancel(u), u = null), !s) {
var i = e.val(), c = t && t.type;
"password" === a || n.ngTrim && "false" === n.ngTrim || (i = xi(i)), (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, c);
}
};
if (i.hasEvent("input")) e.on("input", c); else {
var l = function(t, e, n) {
u || (u = o.defer(function() {
u = null, e && e.value === n || c(t);
}));
};
e.on("keydown", function(t) {
var e = t.keyCode;
91 === e || e > 15 && 19 > e || e >= 37 && 40 >= e || l(t, this, this.value);
}), i.hasEvent("paste") && e.on("paste cut drop", l);
}
e.on("change", c), Sa[a] && r.$$hasNativeValidators && a === n.type && e.on(Ea, function(t) {
if (!u) {
var e = this[ei], n = e.badInput, r = e.typeMismatch;
u = o.defer(function() {
u = null, (e.badInput !== n || e.typeMismatch !== r) && c(t);
});
}
}), r.$render = function() {
var t = r.$isEmpty(r.$viewValue) ? "" :r.$viewValue;
e.val() !== t && e.val(t);
};
}
function Tr(t, e) {
if (S(t)) return t;
if (C(t)) {
wa.lastIndex = 0;
var n = wa.exec(t);
if (n) {
var r = +n[1], i = +n[2], o = 0, a = 0, s = 0, u = 0, c = fr(r), l = 7 * (i - 1);
return e && (o = e.getHours(), a = e.getMinutes(), s = e.getSeconds(), u = e.getMilliseconds()), 
new Date(r, 0, c.getDate() + l, o, a, s, u);
}
}
return NaN;
}
function Nr(t, e) {
return function(n, r) {
var i, a;
if (S(n)) return n;
if (C(n)) {
if ('"' === n.charAt(0) && '"' === n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), 
$a.test(n)) return new Date(n);
if (t.lastIndex = 0, i = t.exec(n)) return i.shift(), a = r ? {
yyyy:r.getFullYear(),
MM:r.getMonth() + 1,
dd:r.getDate(),
HH:r.getHours(),
mm:r.getMinutes(),
ss:r.getSeconds(),
sss:r.getMilliseconds() / 1e3
} :{
yyyy:1970,
MM:1,
dd:1,
HH:0,
mm:0,
ss:0,
sss:0
}, o(i, function(t, n) {
n < e.length && (a[e[n]] = +t);
}), new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0);
}
return NaN;
};
}
function Ir(t, e, n, r) {
return function(i, o, a, s, u, c, l) {
function f(t) {
return t && !(t.getTime && t.getTime() !== t.getTime());
}
function h(t) {
return b(t) && !S(t) ? n(t) || void 0 :t;
}
jr(i, o, a, s), Vr(i, o, a, s, u, c);
var p, d = s && s.$options.getOption("timezone");
if (s.$$parserName = t, s.$parsers.push(function(t) {
if (s.$isEmpty(t)) return null;
if (e.test(t)) {
var r = n(t, p);
return d && (r = tt(r, d)), r;
}
return void 0;
}), s.$formatters.push(function(t) {
if (t && !S(t)) throw ts("datefmt", "Expected `{0}` to be a date", t);
return f(t) ? (p = t, p && d && (p = tt(p, d, !0)), l("date")(t, r, d)) :(p = null, 
"");
}), b(a.min) || a.ngMin) {
var $;
s.$validators.min = function(t) {
return !f(t) || y($) || n(t) >= $;
}, a.$observe("min", function(t) {
$ = h(t), s.$validate();
});
}
if (b(a.max) || a.ngMax) {
var v;
s.$validators.max = function(t) {
return !f(t) || y(v) || n(t) <= v;
}, a.$observe("max", function(t) {
v = h(t), s.$validate();
});
}
};
}
function jr(t, e, n, r) {
var i = e[0], o = r.$$hasNativeValidators = w(i.validity);
o && r.$parsers.push(function(t) {
var n = e.prop(ei) || {};
return n.badInput || n.typeMismatch ? void 0 :t;
});
}
function Dr(t) {
t.$$parserName = "number", t.$parsers.push(function(e) {
return t.$isEmpty(e) ? null :ga.test(e) ? parseFloat(e) :void 0;
}), t.$formatters.push(function(e) {
if (!t.$isEmpty(e)) {
if (!E(e)) throw ts("numfmt", "Expected `{0}` to be a number", e);
e = e.toString();
}
return e;
});
}
function Pr(t) {
return b(t) && !E(t) && (t = parseFloat(t)), yi(t) ? void 0 :t;
}
function _r(t) {
return (0 | t) === t;
}
function Rr(t) {
var e = t.toString(), n = e.indexOf(".");
if (-1 === n) {
if (t > -1 && 1 > t) {
var r = /e-(\d+)$/.exec(e);
if (r) return Number(r[1]);
}
return 0;
}
return e.length - n - 1;
}
function Ur(t, e, n) {
var r = Number(t), i = !_r(r), o = !_r(e), a = !_r(n);
if (i || o || a) {
var s = i ? Rr(r) :0, u = o ? Rr(e) :0, c = a ? Rr(n) :0, l = Math.max(s, u, c), f = Math.pow(10, l);
r *= f, e *= f, n *= f, i && (r = Math.round(r)), o && (e = Math.round(e)), a && (n = Math.round(n));
}
return (r - e) % n === 0;
}
function Lr(t, e, n, r, i, o) {
jr(t, e, n, r), Dr(r), Vr(t, e, n, r, i, o);
var a, s;
if ((b(n.min) || n.ngMin) && (r.$validators.min = function(t) {
return r.$isEmpty(t) || y(a) || t >= a;
}, n.$observe("min", function(t) {
a = Pr(t), r.$validate();
})), (b(n.max) || n.ngMax) && (r.$validators.max = function(t) {
return r.$isEmpty(t) || y(s) || s >= t;
}, n.$observe("max", function(t) {
s = Pr(t), r.$validate();
})), b(n.step) || n.ngStep) {
var u;
r.$validators.step = function(t, e) {
return r.$isEmpty(e) || y(u) || Ur(e, a || 0, u);
}, n.$observe("step", function(t) {
u = Pr(t), r.$validate();
});
}
}
function qr(t, e, n, r, i, o) {
function a(t, r) {
e.attr(t, n[t]), n.$observe(t, r);
}
function s(t) {
if (f = Pr(t), !yi(r.$modelValue)) if (l) {
var n = e.val();
f > n && (n = f, e.val(n)), r.$setViewValue(n);
} else r.$validate();
}
function u(t) {
if (h = Pr(t), !yi(r.$modelValue)) if (l) {
var n = e.val();
n > h && (e.val(h), n = f > h ? f :h), r.$setViewValue(n);
} else r.$validate();
}
function c(t) {
p = Pr(t), yi(r.$modelValue) || (l && r.$viewValue !== e.val() ? r.$setViewValue(e.val()) :r.$validate());
}
jr(t, e, n, r), Dr(r), Vr(t, e, n, r, i, o);
var l = r.$$hasNativeValidators && "range" === e[0].type, f = l ? 0 :void 0, h = l ? 100 :void 0, p = l ? 1 :void 0, d = e[0].validity, $ = b(n.min), v = b(n.max), m = b(n.step), g = r.$render;
r.$render = l && b(d.rangeUnderflow) && b(d.rangeOverflow) ? function() {
g(), r.$setViewValue(e.val());
} :g, $ && (r.$validators.min = l ? function() {
return !0;
} :function(t, e) {
return r.$isEmpty(e) || y(f) || e >= f;
}, a("min", s)), v && (r.$validators.max = l ? function() {
return !0;
} :function(t, e) {
return r.$isEmpty(e) || y(h) || h >= e;
}, a("max", u)), m && (r.$validators.step = l ? function() {
return !d.stepMismatch;
} :function(t, e) {
return r.$isEmpty(e) || y(p) || Ur(e, f || 0, p);
}, a("step", c));
}
function Fr(t, e, n, r, i, o) {
Vr(t, e, n, r, i, o), Or(r), r.$$parserName = "url", r.$validators.url = function(t, e) {
var n = t || e;
return r.$isEmpty(n) || va.test(n);
};
}
function Hr(t, e, n, r, i, o) {
Vr(t, e, n, r, i, o), Or(r), r.$$parserName = "email", r.$validators.email = function(t, e) {
var n = t || e;
return r.$isEmpty(n) || ma.test(n);
};
}
function Br(t, e, n, r) {
var i = !n.ngTrim || "false" !== xi(n.ngTrim);
y(n.name) && e.attr("name", u());
var o = function(t) {
var o;
e[0].checked && (o = n.value, i && (o = xi(o)), r.$setViewValue(o, t && t.type));
};
e.on("click", o), r.$render = function() {
var t = n.value;
i && (t = xi(t)), e[0].checked = t === r.$viewValue;
}, n.$observe("value", r.$render);
}
function zr(t, e, n, r, i) {
var o;
if (b(r)) {
if (o = t(r), !o.constant) throw ts("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, r);
return o(e);
}
return i;
}
function Wr(t, e, n, r, i, o, a, s) {
var u = zr(s, t, "ngTrueValue", n.ngTrueValue, !0), c = zr(s, t, "ngFalseValue", n.ngFalseValue, !1), l = function(t) {
r.$setViewValue(e[0].checked, t && t.type);
};
e.on("click", l), r.$render = function() {
e[0].checked = r.$viewValue;
}, r.$isEmpty = function(t) {
return t === !1;
}, r.$formatters.push(function(t) {
return z(t, u);
}), r.$parsers.push(function(t) {
return t ? u :c;
});
}
function Gr(t, e) {
function n(t, e) {
if (!t || !t.length) return [];
if (!e || !e.length) return t;
var n = [];
t:for (var r = 0; r < t.length; r++) {
for (var i = t[r], o = 0; o < e.length; o++) if (i === e[o]) continue t;
n.push(i);
}
return n;
}
function r(t) {
return t && t.split(" ");
}
function i(t) {
var e = t;
return bi(t) ? e = t.map(i).join(" ") :w(t) && (e = Object.keys(t).filter(function(e) {
return t[e];
}).join(" ")), e;
}
function a(t) {
var e = t;
if (bi(t)) e = t.map(a); else if (w(t)) {
var n = !1;
e = Object.keys(t).filter(function(e) {
var r = t[e];
return !n && y(r) && (n = !0), r;
}), n && e.push(void 0);
}
return e;
}
t = "ngClass" + t;
var s;
return [ "$parse", function(u) {
return {
restrict:"AC",
link:function(c, l, f) {
function h(t) {
t = $(r(t), 1), f.$addClass(t);
}
function p(t) {
t = $(r(t), -1), f.$removeClass(t);
}
function d(t, e) {
var i = r(t), o = r(e), a = n(i, o), s = n(o, i), u = $(a, -1), c = $(s, 1);
f.$addClass(c), f.$removeClass(u);
}
function $(t, e) {
var n = [];
return o(t, function(t) {
(e > 0 || S[t]) && (S[t] = (S[t] || 0) + e, S[t] === +(e > 0) && n.push(t));
}), n.join(" ");
}
function v(t) {
t === e ? h(y) :p(y), k = t;
}
function m(t) {
var e = i(t);
e !== y && g(e);
}
function g(t) {
k === e && d(y, t), y = t;
}
var y, b = f[t].trim(), w = ":" === b.charAt(0) && ":" === b.charAt(1), x = w ? a :i, C = u(b, x), E = w ? m :g, S = l.data("$classCounts"), k = !0;
S || (S = bt(), l.data("$classCounts", S)), "ngClass" !== t && (s || (s = u("$index", function(t) {
return 1 & t;
})), c.$watch(s, v)), c.$watch(C, E, w);
}
};
} ];
}
function Jr(t, e, n, r, i, o, a, s, u) {
this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = void 0, 
this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], 
this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, 
this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, 
this.$pending = void 0, this.$name = u(n.name || "", !1)(t), this.$$parentForm = ca, 
this.$options = es, this.$$updateEvents = "", this.$$updateEventHandler = this.$$updateEventHandler.bind(this), 
this.$$parsedNgModel = i(n.ngModel), this.$$parsedNgModelAssign = this.$$parsedNgModel.assign, 
this.$$ngModelGet = this.$$parsedNgModel, this.$$ngModelSet = this.$$parsedNgModelAssign, 
this.$$pendingDebounce = null, this.$$parserValid = void 0, this.$$currentValidationRunId = 0, 
Object.defineProperty(this, "$$scope", {
value:t
}), this.$$attr = n, this.$$element = r, this.$$animate = o, this.$$timeout = a, 
this.$$parse = i, this.$$q = s, this.$$exceptionHandler = e, Sr(this), Kr(this);
}
function Kr(t) {
t.$$scope.$watch(function(e) {
var n = t.$$ngModelGet(e);
return n === t.$modelValue || t.$modelValue !== t.$modelValue && n !== n || t.$$setModelValue(n), 
n;
});
}
function Zr(t) {
this.$$options = t;
}
function Yr(t, e) {
o(e, function(e, n) {
b(t[n]) || (t[n] = e);
});
}
function Qr(t, e) {
t.prop("selected", e), t.attr("selected", e);
}
var Xr = {
objectMaxDepth:5
}, ti = /^\/(.+)\/([a-z]*)$/, ei = "validity", ni = Object.prototype.hasOwnProperty, ri = function(t) {
return C(t) ? t.toLowerCase() :t;
}, ii = function(t) {
return C(t) ? t.toUpperCase() :t;
}, oi = function(t) {
return C(t) ? t.replace(/[A-Z]/g, function(t) {
return String.fromCharCode(32 | t.charCodeAt(0));
}) :t;
}, ai = function(t) {
return C(t) ? t.replace(/[a-z]/g, function(t) {
return String.fromCharCode(-33 & t.charCodeAt(0));
}) :t;
};
"i" !== "I".toLowerCase() && (ri = oi, ii = ai);
var si, ui, ci, li, fi = [].slice, hi = [].splice, pi = [].push, di = Object.prototype.toString, $i = Object.getPrototypeOf, vi = r("ng"), mi = t.angular || (t.angular = {}), gi = 0;
si = t.document.documentMode;
var yi = Number.isNaN || function(t) {
return t !== t;
};
$.$inject = [], v.$inject = [];
var bi = Array.isArray, wi = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/, xi = function(t) {
return C(t) ? t.trim() :t;
}, Ci = function(t) {
return t.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
}, Ei = function() {
function e() {
try {
return new Function(""), !1;
} catch (t) {
return !0;
}
}
if (!b(Ei.rules)) {
var n = t.document.querySelector("[ng-csp]") || t.document.querySelector("[data-ng-csp]");
if (n) {
var r = n.getAttribute("ng-csp") || n.getAttribute("data-ng-csp");
Ei.rules = {
noUnsafeEval:!r || -1 !== r.indexOf("no-unsafe-eval"),
noInlineStyle:!r || -1 !== r.indexOf("no-inline-style")
};
} else Ei.rules = {
noUnsafeEval:e(),
noInlineStyle:!1
};
}
return Ei.rules;
}, Si = function() {
if (b(Si.name_)) return Si.name_;
var e, n, r, i, o = Ai.length;
for (n = 0; o > n; ++n) if (r = Ai[n], e = t.document.querySelector("[" + r.replace(":", "\\:") + "jq]")) {
i = e.getAttribute(r + "jq");
break;
}
return Si.name_ = i;
}, ki = /:/g, Ai = [ "ng-", "data-ng-", "ng:", "x-ng-" ], Oi = ut(t.document), Mi = /[A-Z]/g, Vi = !1, Ti = 1, Ni = 2, Ii = 3, ji = 8, Di = 9, Pi = 11, _i = {
full:"1.6.9",
major:1,
minor:6,
dot:9,
codeName:"fiery-basilisk"
};
_t.expando = "ng339";
var Ri = _t.cache = {}, Ui = 1;
_t._data = function(t) {
return this.cache[t[this.expando]] || {};
};
var Li = /-([a-z])/g, qi = /^-ms-/, Fi = {
mouseleave:"mouseout",
mouseenter:"mouseover"
}, Hi = r("jqLite"), Bi = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, zi = /<|&#?\w+;/, Wi = /<([\w:-]+)/, Gi = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, Ji = {
option:[ 1, '<select multiple="multiple">', "</select>" ],
thead:[ 1, "<table>", "</table>" ],
col:[ 2, "<table><colgroup>", "</colgroup></table>" ],
tr:[ 2, "<table><tbody>", "</tbody></table>" ],
td:[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default:[ 0, "", "" ]
};
Ji.optgroup = Ji.option, Ji.tbody = Ji.tfoot = Ji.colgroup = Ji.caption = Ji.thead, 
Ji.th = Ji.td;
var Ki = t.Node.prototype.contains || function(t) {
return !!(16 & this.compareDocumentPosition(t));
}, Zi = _t.prototype = {
ready:Xt,
toString:function() {
var t = [];
return o(this, function(e) {
t.push("" + e);
}), "[" + t.join(", ") + "]";
},
eq:function(t) {
return ui(t >= 0 ? this[t] :this[this.length + t]);
},
length:0,
push:pi,
sort:[].sort,
splice:[].splice
}, Yi = {};
o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(t) {
Yi[ri(t)] = t;
});
var Qi = {};
o("input,select,option,textarea,button,form,details".split(","), function(t) {
Qi[t] = !0;
});
var Xi = {
ngMinlength:"minlength",
ngMaxlength:"maxlength",
ngMin:"min",
ngMax:"max",
ngPattern:"pattern",
ngStep:"step"
};
o({
data:Ht,
removeData:qt,
hasData:It,
cleanData:function(t) {
for (var e = 0, n = t.length; n > e; e++) qt(t[e]);
}
}, function(t, e) {
_t[e] = t;
}), o({
data:Ht,
inheritedData:Kt,
scope:function(t) {
return ui.data(t, "$scope") || Kt(t.parentNode || t, [ "$isolateScope", "$scope" ]);
},
isolateScope:function(t) {
return ui.data(t, "$isolateScope") || ui.data(t, "$isolateScopeNoTemplate");
},
controller:Jt,
injector:function(t) {
return Kt(t, "$injector");
},
removeAttr:function(t, e) {
t.removeAttribute(e);
},
hasClass:Bt,
css:function(t, e, n) {
return e = Ot(e), b(n) ? void (t.style[e] = n) :t.style[e];
},
attr:function(t, e, n) {
var r, i = t.nodeType;
if (i !== Ii && i !== Ni && i !== ji && t.getAttribute) {
var o = ri(e), a = Yi[o];
return b(n) ? void (null === n || n === !1 && a ? t.removeAttribute(e) :t.setAttribute(e, a ? o :n)) :(r = t.getAttribute(e), 
a && null !== r && (r = o), null === r ? void 0 :r);
}
},
prop:function(t, e, n) {
return b(n) ? void (t[e] = n) :t[e];
},
text:function() {
function t(t, e) {
if (y(e)) {
var n = t.nodeType;
return n === Ti || n === Ii ? t.textContent :"";
}
t.textContent = e;
}
return t.$dv = "", t;
}(),
val:function(t, e) {
if (y(e)) {
if (t.multiple && "select" === L(t)) {
var n = [];
return o(t.options, function(t) {
t.selected && n.push(t.value || t.text);
}), n;
}
return t.value;
}
t.value = e;
},
html:function(t, e) {
return y(e) ? t.innerHTML :(Ut(t, !0), void (t.innerHTML = e));
},
empty:Zt
}, function(t, e) {
_t.prototype[e] = function(e, n) {
var r, i, o = this.length;
if (t !== Zt && y(2 === t.length && t !== Bt && t !== Jt ? e :n)) {
if (w(e)) {
for (r = 0; o > r; r++) if (t === Ht) t(this[r], e); else for (i in e) t(this[r], i, e[i]);
return this;
}
for (var a = t.$dv, s = y(a) ? Math.min(o, 1) :o, u = 0; s > u; u++) {
var c = t(this[u], e, n);
a = a ? a + c :c;
}
return a;
}
for (r = 0; o > r; r++) t(this[r], e, n);
return this;
};
}), o({
removeData:qt,
on:function(t, e, n, r) {
if (b(r)) throw Hi("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
if (Nt(t)) {
var i = Ft(t, !0), o = i.events, a = i.handle;
a || (a = i.handle = ne(t, o));
for (var s = e.indexOf(" ") >= 0 ? e.split(" ") :[ e ], u = s.length, c = function(e, r, i) {
var s = o[e];
s || (s = o[e] = [], s.specialHandlerWrapper = r, "$destroy" === e || i || t.addEventListener(e, a)), 
s.push(n);
}; u--; ) e = s[u], Fi[e] ? (c(Fi[e], ie), c(e, void 0, !0)) :c(e);
}
},
off:Lt,
one:function(t, e, n) {
t = ui(t), t.on(e, function r() {
t.off(e, n), t.off(e, r);
}), t.on(e, n);
},
replaceWith:function(t, e) {
var n, r = t.parentNode;
Ut(t), o(new _t(e), function(e) {
n ? r.insertBefore(e, n.nextSibling) :r.replaceChild(e, t), n = e;
});
},
children:function(t) {
var e = [];
return o(t.childNodes, function(t) {
t.nodeType === Ti && e.push(t);
}), e;
},
contents:function(t) {
return t.contentDocument || t.childNodes || [];
},
append:function(t, e) {
var n = t.nodeType;
if (n === Ti || n === Pi) {
e = new _t(e);
for (var r = 0, i = e.length; i > r; r++) {
var o = e[r];
t.appendChild(o);
}
}
},
prepend:function(t, e) {
if (t.nodeType === Ti) {
var n = t.firstChild;
o(new _t(e), function(e) {
t.insertBefore(e, n);
});
}
},
wrap:function(t, e) {
Pt(t, ui(e).eq(0).clone()[0]);
},
remove:Yt,
detach:function(t) {
Yt(t, !0);
},
after:function(t, e) {
var n = t, r = t.parentNode;
if (r) {
e = new _t(e);
for (var i = 0, o = e.length; o > i; i++) {
var a = e[i];
r.insertBefore(a, n.nextSibling), n = a;
}
}
},
addClass:Wt,
removeClass:zt,
toggleClass:function(t, e, n) {
e && o(e.split(" "), function(e) {
var r = n;
y(r) && (r = !Bt(t, e)), (r ? Wt :zt)(t, e);
});
},
parent:function(t) {
var e = t.parentNode;
return e && e.nodeType !== Pi ? e :null;
},
next:function(t) {
return t.nextElementSibling;
},
find:function(t, e) {
return t.getElementsByTagName ? t.getElementsByTagName(e) :[];
},
clone:Rt,
triggerHandler:function(t, e, n) {
var r, i, a, s = e.type || e, u = Ft(t), c = u && u.events, l = c && c[s];
l && (r = {
preventDefault:function() {
this.defaultPrevented = !0;
},
isDefaultPrevented:function() {
return this.defaultPrevented === !0;
},
stopImmediatePropagation:function() {
this.immediatePropagationStopped = !0;
},
isImmediatePropagationStopped:function() {
return this.immediatePropagationStopped === !0;
},
stopPropagation:$,
type:s,
target:t
}, e.type && (r = f(r, e)), i = Ct(l), a = n ? [ r ].concat(n) :[ r ], o(i, function(e) {
r.isImmediatePropagationStopped() || e.apply(t, a);
}));
}
}, function(t, e) {
_t.prototype[e] = function(e, n, r) {
for (var i, o = 0, a = this.length; a > o; o++) y(i) ? (i = t(this[o], e, n, r), 
b(i) && (i = ui(i))) :Gt(i, t(this[o], e, n, r));
return b(i) ? i :this;
};
}), _t.prototype.bind = _t.prototype.on, _t.prototype.unbind = _t.prototype.off;
var to = Object.create(null);
se.prototype = {
_idx:function(t) {
return t === this._lastKey ? this._lastIndex :(this._lastKey = t, this._lastIndex = this._keys.indexOf(t), 
this._lastIndex);
},
_transformKey:function(t) {
return yi(t) ? to :t;
},
get:function(t) {
t = this._transformKey(t);
var e = this._idx(t);
return -1 !== e ? this._values[e] :void 0;
},
set:function(t, e) {
t = this._transformKey(t);
var n = this._idx(t);
-1 === n && (n = this._lastIndex = this._keys.length), this._keys[n] = t, this._values[n] = e;
},
"delete":function(t) {
t = this._transformKey(t);
var e = this._idx(t);
return -1 === e ? !1 :(this._keys.splice(e, 1), this._values.splice(e, 1), this._lastKey = NaN, 
this._lastIndex = -1, !0);
}
};
var eo = se, no = [ function() {
this.$get = [ function() {
return eo;
} ];
} ], ro = /^([^(]+?)=>/, io = /^[^(]*\(\s*([^)]*)\)/m, oo = /,/, ao = /^\s*(_?)(\S+?)\1\s*$/, so = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, uo = r("$injector");
he.$$annotate = fe;
var co = r("$animate"), lo = 1, fo = "ng-animate", ho = function() {
this.$get = $;
}, po = function() {
var t = new eo(), e = [];
this.$get = [ "$$AnimateRunner", "$rootScope", function(n, r) {
function i(t, e, n) {
var r = !1;
return e && (e = C(e) ? e.split(" ") :bi(e) ? e :[], o(e, function(e) {
e && (r = !0, t[e] = n);
})), r;
}
function a() {
o(e, function(e) {
var n = t.get(e);
if (n) {
var r = ve(e.attr("class")), i = "", a = "";
o(n, function(t, e) {
var n = !!r[e];
t !== n && (t ? i += (i.length ? " " :"") + e :a += (a.length ? " " :"") + e);
}), o(e, function(t) {
i && Wt(t, i), a && zt(t, a);
}), t["delete"](e);
}
}), e.length = 0;
}
function s(n, o, s) {
var u = t.get(n) || {}, c = i(u, o, !0), l = i(u, s, !1);
(c || l) && (t.set(n, u), e.push(n), 1 === e.length && r.$$postDigest(a));
}
return {
enabled:$,
on:$,
off:$,
pin:$,
push:function(t, e, r, i) {
i && i(), r = r || {}, r.from && t.css(r.from), r.to && t.css(r.to), (r.addClass || r.removeClass) && s(t, r.addClass, r.removeClass);
var o = new n();
return o.complete(), o;
}
};
} ];
}, $o = [ "$provide", function(t) {
var e = this, n = null, r = null;
this.$$registeredAnimations = Object.create(null), this.register = function(n, r) {
if (n && "." !== n.charAt(0)) throw co("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
var i = n + "-animation";
e.$$registeredAnimations[n.substr(1)] = i, t.factory(i, r);
}, this.customFilter = function(t) {
return 1 === arguments.length && (r = A(t) ? t :null), r;
}, this.classNameFilter = function(t) {
if (1 === arguments.length && (n = t instanceof RegExp ? t :null)) {
var e = new RegExp("[(\\s|\\/)]" + fo + "[(\\s|\\/)]");
if (e.test(n.toString())) throw n = null, co("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', fo);
}
return n;
}, this.$get = [ "$$animateQueue", function(t) {
function e(t, e, n) {
if (n) {
var r = $e(n);
!r || r.parentNode || r.previousElementSibling || (n = null);
}
n ? n.after(t) :e.prepend(t);
}
return {
on:t.on,
off:t.off,
pin:t.pin,
enabled:t.enabled,
cancel:function(t) {
t.end && t.end();
},
enter:function(n, r, i, o) {
return r = r && ui(r), i = i && ui(i), r = r || i.parent(), e(n, r, i), t.push(n, "enter", me(o));
},
move:function(n, r, i, o) {
return r = r && ui(r), i = i && ui(i), r = r || i.parent(), e(n, r, i), t.push(n, "move", me(o));
},
leave:function(e, n) {
return t.push(e, "leave", me(n), function() {
e.remove();
});
},
addClass:function(e, n, r) {
return r = me(r), r.addClass = de(r.addclass, n), t.push(e, "addClass", r);
},
removeClass:function(e, n, r) {
return r = me(r), r.removeClass = de(r.removeClass, n), t.push(e, "removeClass", r);
},
setClass:function(e, n, r, i) {
return i = me(i), i.addClass = de(i.addClass, n), i.removeClass = de(i.removeClass, r), 
t.push(e, "setClass", i);
},
animate:function(e, n, r, i, o) {
return o = me(o), o.from = o.from ? f(o.from, n) :n, o.to = o.to ? f(o.to, r) :r, 
i = i || "ng-inline-animate", o.tempClasses = de(o.tempClasses, i), t.push(e, "animate", o);
}
};
} ];
} ], vo = function() {
this.$get = [ "$$rAF", function(t) {
function e(e) {
n.push(e), n.length > 1 || t(function() {
for (var t = 0; t < n.length; t++) n[t]();
n = [];
});
}
var n = [];
return function() {
var t = !1;
return e(function() {
t = !0;
}), function(n) {
t ? n() :e(n);
};
};
} ];
}, mo = function() {
this.$get = [ "$q", "$sniffer", "$$animateAsyncRun", "$$isDocumentHidden", "$timeout", function(t, e, n, r, i) {
function a(t) {
this.setHost(t);
var e = n(), o = function(t) {
i(t, 0, !1);
};
this._doneCallbacks = [], this._tick = function(t) {
r() ? o(t) :e(t);
}, this._state = 0;
}
var s = 0, u = 1, c = 2;
return a.chain = function(t, e) {
function n() {
return r === t.length ? void e(!0) :void t[r](function(t) {
return t === !1 ? void e(!1) :(r++, void n());
});
}
var r = 0;
n();
}, a.all = function(t, e) {
function n(n) {
i = i && n, ++r === t.length && e(i);
}
var r = 0, i = !0;
o(t, function(t) {
t.done(n);
});
}, a.prototype = {
setHost:function(t) {
this.host = t || {};
},
done:function(t) {
this._state === c ? t() :this._doneCallbacks.push(t);
},
progress:$,
getPromise:function() {
if (!this.promise) {
var e = this;
this.promise = t(function(t, n) {
e.done(function(e) {
e === !1 ? n() :t();
});
});
}
return this.promise;
},
then:function(t, e) {
return this.getPromise().then(t, e);
},
"catch":function(t) {
return this.getPromise()["catch"](t);
},
"finally":function(t) {
return this.getPromise()["finally"](t);
},
pause:function() {
this.host.pause && this.host.pause();
},
resume:function() {
this.host.resume && this.host.resume();
},
end:function() {
this.host.end && this.host.end(), this._resolve(!0);
},
cancel:function() {
this.host.cancel && this.host.cancel(), this._resolve(!1);
},
complete:function(t) {
var e = this;
e._state === s && (e._state = u, e._tick(function() {
e._resolve(t);
}));
},
_resolve:function(t) {
this._state !== c && (o(this._doneCallbacks, function(e) {
e(t);
}), this._doneCallbacks.length = 0, this._state = c);
}
}, a;
} ];
}, go = function() {
this.$get = [ "$$rAF", "$q", "$$AnimateRunner", function(t, e, n) {
return function(e, r) {
function i() {
return t(function() {
o(), s || u.complete(), s = !0;
}), u;
}
function o() {
a.addClass && (e.addClass(a.addClass), a.addClass = null), a.removeClass && (e.removeClass(a.removeClass), 
a.removeClass = null), a.to && (e.css(a.to), a.to = null);
}
var a = r || {};
a.$$prepared || (a = H(a)), a.cleanupStyles && (a.from = a.to = null), a.from && (e.css(a.from), 
a.from = null);
var s, u = new n();
return {
start:i,
end:i
};
};
} ];
}, yo = r("$compile"), bo = new xe();
Ce.$inject = [ "$provide", "$$sanitizeUriProvider" ], Ee.prototype.isFirstChange = function() {
return this.previousValue === bo;
};
var wo = /^((?:x|data)[:\-_])/i, xo = /[:\-_]+(.)/g, Co = r("$controller"), Eo = /^(\S+)(\s+as\s+([\w$]+))?$/, So = function() {
this.$get = [ "$document", function(t) {
return function(e) {
return e ? !e.nodeType && e instanceof ui && (e = e[0]) :e = t[0].body, e.offsetWidth + 1;
};
} ];
}, ko = "application/json", Ao = {
"Content-Type":ko + ";charset=utf-8"
}, Oo = /^\[|^\{(?!\{)/, Mo = {
"[":/]$/,
"{":/}$/
}, Vo = /^\)]\}',?\n/, To = r("$http"), No = mi.$interpolateMinErr = r("$interpolate");
No.throwNoconcat = function(t) {
throw No("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", t);
}, No.interr = function(t, e) {
return No("interr", "Can't interpolate: {0}\n{1}", t, e.toString());
};
var Io = function() {
this.$get = function() {
function t(t) {
var e = function(t) {
e.data = t, e.called = !0;
};
return e.id = t, e;
}
var e = mi.callbacks, n = {};
return {
createCallback:function(r) {
var i = "_" + (e.$$counter++).toString(36), o = "angular.callbacks." + i, a = t(i);
return n[o] = e[i] = a, o;
},
wasCalled:function(t) {
return n[t].called;
},
getResponse:function(t) {
return n[t].data;
},
removeCallback:function(t) {
var r = n[t];
delete e[r.id], delete n[t];
}
};
};
}, jo = /^([^?#]*)(\?([^#]*))?(#(.*))?$/, Do = {
http:80,
https:443,
ftp:21
}, Po = r("$location"), _o = /^\s*[\\\/]{2,}/, Ro = {
$$absUrl:"",
$$html5:!1,
$$replace:!1,
absUrl:un("$$absUrl"),
url:function(t) {
if (y(t)) return this.$$url;
var e = jo.exec(t);
return (e[1] || "" === t) && this.path(decodeURIComponent(e[1])), (e[2] || e[1] || "" === t) && this.search(e[3] || ""), 
this.hash(e[5] || ""), this;
},
protocol:un("$$protocol"),
host:un("$$host"),
port:un("$$port"),
path:cn("$$path", function(t) {
return t = null !== t ? t.toString() :"", "/" === t.charAt(0) ? t :"/" + t;
}),
search:function(t, e) {
switch (arguments.length) {
case 0:
return this.$$search;

case 1:
if (C(t) || E(t)) t = t.toString(), this.$$search = rt(t); else {
if (!w(t)) throw Po("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
t = H(t, {}), o(t, function(e, n) {
null == e && delete t[n];
}), this.$$search = t;
}
break;

default:
y(e) || null === e ? delete this.$$search[t] :this.$$search[t] = e;
}
return this.$$compose(), this;
},
hash:cn("$$hash", function(t) {
return null !== t ? t.toString() :"";
}),
replace:function() {
return this.$$replace = !0, this;
}
};
o([ sn, an, on ], function(t) {
t.prototype = Object.create(Ro), t.prototype.state = function(e) {
if (!arguments.length) return this.$$state;
if (t !== on || !this.$$html5) throw Po("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
return this.$$state = y(e) ? null :e, this.$$urlUpdatedByLocation = !0, this;
};
});
var Uo = r("$parse"), Lo = {}.constructor.prototype.valueOf, qo = bt();
o("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(t) {
qo[t] = !0;
});
var Fo = {
n:"\n",
f:"\f",
r:"\r",
t:"	",
v:"",
"'":"'",
'"':'"'
}, Ho = function(t) {
this.options = t;
};
Ho.prototype = {
constructor:Ho,
lex:function(t) {
for (this.text = t, this.index = 0, this.tokens = []; this.index < this.text.length; ) {
var e = this.text.charAt(this.index);
if ('"' === e || "'" === e) this.readString(e); else if (this.isNumber(e) || "." === e && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent(); else if (this.is(e, "(){}[].,;:?")) this.tokens.push({
index:this.index,
text:e
}), this.index++; else if (this.isWhitespace(e)) this.index++; else {
var n = e + this.peek(), r = n + this.peek(2), i = qo[e], o = qo[n], a = qo[r];
if (i || o || a) {
var s = a ? r :o ? n :e;
this.tokens.push({
index:this.index,
text:s,
operator:!0
}), this.index += s.length;
} else this.throwError("Unexpected next character ", this.index, this.index + 1);
}
}
return this.tokens;
},
is:function(t, e) {
return -1 !== e.indexOf(t);
},
peek:function(t) {
var e = t || 1;
return this.index + e < this.text.length ? this.text.charAt(this.index + e) :!1;
},
isNumber:function(t) {
return t >= "0" && "9" >= t && "string" == typeof t;
},
isWhitespace:function(t) {
return " " === t || "\r" === t || "	" === t || "\n" === t || "" === t || " " === t;
},
isIdentifierStart:function(t) {
return this.options.isIdentifierStart ? this.options.isIdentifierStart(t, this.codePointAt(t)) :this.isValidIdentifierStart(t);
},
isValidIdentifierStart:function(t) {
return t >= "a" && "z" >= t || t >= "A" && "Z" >= t || "_" === t || "$" === t;
},
isIdentifierContinue:function(t) {
return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(t, this.codePointAt(t)) :this.isValidIdentifierContinue(t);
},
isValidIdentifierContinue:function(t, e) {
return this.isValidIdentifierStart(t, e) || this.isNumber(t);
},
codePointAt:function(t) {
return 1 === t.length ? t.charCodeAt(0) :(t.charCodeAt(0) << 10) + t.charCodeAt(1) - 56613888;
},
peekMultichar:function() {
var t = this.text.charAt(this.index), e = this.peek();
if (!e) return t;
var n = t.charCodeAt(0), r = e.charCodeAt(0);
return n >= 55296 && 56319 >= n && r >= 56320 && 57343 >= r ? t + e :t;
},
isExpOperator:function(t) {
return "-" === t || "+" === t || this.isNumber(t);
},
throwError:function(t, e, n) {
n = n || this.index;
var r = b(e) ? "s " + e + "-" + this.index + " [" + this.text.substring(e, n) + "]" :" " + n;
throw Uo("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", t, r, this.text);
},
readNumber:function() {
for (var t = "", e = this.index; this.index < this.text.length; ) {
var n = ri(this.text.charAt(this.index));
if ("." === n || this.isNumber(n)) t += n; else {
var r = this.peek();
if ("e" === n && this.isExpOperator(r)) t += n; else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" === t.charAt(t.length - 1)) t += n; else {
if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" !== t.charAt(t.length - 1)) break;
this.throwError("Invalid exponent");
}
}
this.index++;
}
this.tokens.push({
index:e,
text:t,
constant:!0,
value:Number(t)
});
},
readIdent:function() {
var t = this.index;
for (this.index += this.peekMultichar().length; this.index < this.text.length; ) {
var e = this.peekMultichar();
if (!this.isIdentifierContinue(e)) break;
this.index += e.length;
}
this.tokens.push({
index:t,
text:this.text.slice(t, this.index),
identifier:!0
});
},
readString:function(t) {
var e = this.index;
this.index++;
for (var n = "", r = t, i = !1; this.index < this.text.length; ) {
var o = this.text.charAt(this.index);
if (r += o, i) {
if ("u" === o) {
var a = this.text.substring(this.index + 1, this.index + 5);
a.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + a + "]"), 
this.index += 4, n += String.fromCharCode(parseInt(a, 16));
} else {
var s = Fo[o];
n += s || o;
}
i = !1;
} else if ("\\" === o) i = !0; else {
if (o === t) return this.index++, void this.tokens.push({
index:e,
text:r,
constant:!0,
value:n
});
n += o;
}
this.index++;
}
this.throwError("Unterminated quote", e);
}
};
var Bo = function(t, e) {
this.lexer = t, this.options = e;
};
Bo.Program = "Program", Bo.ExpressionStatement = "ExpressionStatement", Bo.AssignmentExpression = "AssignmentExpression", 
Bo.ConditionalExpression = "ConditionalExpression", Bo.LogicalExpression = "LogicalExpression", 
Bo.BinaryExpression = "BinaryExpression", Bo.UnaryExpression = "UnaryExpression", 
Bo.CallExpression = "CallExpression", Bo.MemberExpression = "MemberExpression", 
Bo.Identifier = "Identifier", Bo.Literal = "Literal", Bo.ArrayExpression = "ArrayExpression", 
Bo.Property = "Property", Bo.ObjectExpression = "ObjectExpression", Bo.ThisExpression = "ThisExpression", 
Bo.LocalsExpression = "LocalsExpression", Bo.NGValueParameter = "NGValueParameter", 
Bo.prototype = {
ast:function(t) {
this.text = t, this.tokens = this.lexer.lex(t);
var e = this.program();
return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
e;
},
program:function() {
for (var t = []; ;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && t.push(this.expressionStatement()), 
!this.expect(";")) return {
type:Bo.Program,
body:t
};
},
expressionStatement:function() {
return {
type:Bo.ExpressionStatement,
expression:this.filterChain()
};
},
filterChain:function() {
for (var t = this.expression(); this.expect("|"); ) t = this.filter(t);
return t;
},
expression:function() {
return this.assignment();
},
assignment:function() {
var t = this.ternary();
if (this.expect("=")) {
if (!yn(t)) throw Uo("lval", "Trying to assign a value to a non l-value");
t = {
type:Bo.AssignmentExpression,
left:t,
right:this.assignment(),
operator:"="
};
}
return t;
},
ternary:function() {
var t, e, n = this.logicalOR();
return this.expect("?") && (t = this.expression(), this.consume(":")) ? (e = this.expression(), 
{
type:Bo.ConditionalExpression,
test:n,
alternate:t,
consequent:e
}) :n;
},
logicalOR:function() {
for (var t = this.logicalAND(); this.expect("||"); ) t = {
type:Bo.LogicalExpression,
operator:"||",
left:t,
right:this.logicalAND()
};
return t;
},
logicalAND:function() {
for (var t = this.equality(); this.expect("&&"); ) t = {
type:Bo.LogicalExpression,
operator:"&&",
left:t,
right:this.equality()
};
return t;
},
equality:function() {
for (var t, e = this.relational(); t = this.expect("==", "!=", "===", "!=="); ) e = {
type:Bo.BinaryExpression,
operator:t.text,
left:e,
right:this.relational()
};
return e;
},
relational:function() {
for (var t, e = this.additive(); t = this.expect("<", ">", "<=", ">="); ) e = {
type:Bo.BinaryExpression,
operator:t.text,
left:e,
right:this.additive()
};
return e;
},
additive:function() {
for (var t, e = this.multiplicative(); t = this.expect("+", "-"); ) e = {
type:Bo.BinaryExpression,
operator:t.text,
left:e,
right:this.multiplicative()
};
return e;
},
multiplicative:function() {
for (var t, e = this.unary(); t = this.expect("*", "/", "%"); ) e = {
type:Bo.BinaryExpression,
operator:t.text,
left:e,
right:this.unary()
};
return e;
},
unary:function() {
var t;
return (t = this.expect("+", "-", "!")) ? {
type:Bo.UnaryExpression,
operator:t.text,
prefix:!0,
argument:this.unary()
} :this.primary();
},
primary:function() {
var t;
this.expect("(") ? (t = this.filterChain(), this.consume(")")) :this.expect("[") ? t = this.arrayDeclaration() :this.expect("{") ? t = this.object() :this.selfReferential.hasOwnProperty(this.peek().text) ? t = H(this.selfReferential[this.consume().text]) :this.options.literals.hasOwnProperty(this.peek().text) ? t = {
type:Bo.Literal,
value:this.options.literals[this.consume().text]
} :this.peek().identifier ? t = this.identifier() :this.peek().constant ? t = this.constant() :this.throwError("not a primary expression", this.peek());
for (var e; e = this.expect("(", "[", "."); ) "(" === e.text ? (t = {
type:Bo.CallExpression,
callee:t,
arguments:this.parseArguments()
}, this.consume(")")) :"[" === e.text ? (t = {
type:Bo.MemberExpression,
object:t,
property:this.expression(),
computed:!0
}, this.consume("]")) :"." === e.text ? t = {
type:Bo.MemberExpression,
object:t,
property:this.identifier(),
computed:!1
} :this.throwError("IMPOSSIBLE");
return t;
},
filter:function(t) {
for (var e = [ t ], n = {
type:Bo.CallExpression,
callee:this.identifier(),
arguments:e,
filter:!0
}; this.expect(":"); ) e.push(this.expression());
return n;
},
parseArguments:function() {
var t = [];
if (")" !== this.peekToken().text) do t.push(this.filterChain()); while (this.expect(","));
return t;
},
identifier:function() {
var t = this.consume();
return t.identifier || this.throwError("is not a valid identifier", t), {
type:Bo.Identifier,
name:t.text
};
},
constant:function() {
return {
type:Bo.Literal,
value:this.consume().value
};
},
arrayDeclaration:function() {
var t = [];
if ("]" !== this.peekToken().text) do {
if (this.peek("]")) break;
t.push(this.expression());
} while (this.expect(","));
return this.consume("]"), {
type:Bo.ArrayExpression,
elements:t
};
},
object:function() {
var t, e = [];
if ("}" !== this.peekToken().text) do {
if (this.peek("}")) break;
t = {
type:Bo.Property,
kind:"init"
}, this.peek().constant ? (t.key = this.constant(), t.computed = !1, this.consume(":"), 
t.value = this.expression()) :this.peek().identifier ? (t.key = this.identifier(), 
t.computed = !1, this.peek(":") ? (this.consume(":"), t.value = this.expression()) :t.value = t.key) :this.peek("[") ? (this.consume("["), 
t.key = this.expression(), this.consume("]"), t.computed = !0, this.consume(":"), 
t.value = this.expression()) :this.throwError("invalid key", this.peek()), e.push(t);
} while (this.expect(","));
return this.consume("}"), {
type:Bo.ObjectExpression,
properties:e
};
},
throwError:function(t, e) {
throw Uo("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", e.text, t, e.index + 1, this.text, this.text.substring(e.index));
},
consume:function(t) {
if (0 === this.tokens.length) throw Uo("ueoe", "Unexpected end of expression: {0}", this.text);
var e = this.expect(t);
return e || this.throwError("is unexpected, expecting [" + t + "]", this.peek()), 
e;
},
peekToken:function() {
if (0 === this.tokens.length) throw Uo("ueoe", "Unexpected end of expression: {0}", this.text);
return this.tokens[0];
},
peek:function(t, e, n, r) {
return this.peekAhead(0, t, e, n, r);
},
peekAhead:function(t, e, n, r, i) {
if (this.tokens.length > t) {
var o = this.tokens[t], a = o.text;
if (a === e || a === n || a === r || a === i || !e && !n && !r && !i) return o;
}
return !1;
},
expect:function(t, e, n, r) {
var i = this.peek(t, e, n, r);
return i ? (this.tokens.shift(), i) :!1;
},
selfReferential:{
"this":{
type:Bo.ThisExpression
},
$locals:{
type:Bo.LocalsExpression
}
}
};
var zo = 1, Wo = 2;
Cn.prototype = {
compile:function(t) {
var e = this;
this.state = {
nextId:0,
filters:{},
fn:{
vars:[],
body:[],
own:{}
},
assign:{
vars:[],
body:[],
own:{}
},
inputs:[]
}, mn(t, e.$filter);
var n, r = "";
if (this.stage = "assign", n = bn(t)) {
this.state.computing = "assign";
var i = this.nextId();
this.recurse(n, i), this.return_(i), r = "fn.assign=" + this.generateFunction("assign", "s,v,l");
}
var a = gn(t.body);
e.stage = "inputs", o(a, function(t, n) {
var r = "fn" + n;
e.state[r] = {
vars:[],
body:[],
own:{}
}, e.state.computing = r;
var i = e.nextId();
e.recurse(t, i), e.return_(i), e.state.inputs.push({
name:r,
isPure:t.isPure
}), t.watchId = n;
}), this.state.computing = "fn", this.stage = "main", this.recurse(t);
var s = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + r + this.watchFns() + "return fn;", u = new Function("$filter", "getStringValue", "ifDefined", "plus", s)(this.$filter, hn, pn, dn);
return this.state = this.stage = void 0, u;
},
USE:"use",
STRICT:"strict",
watchFns:function() {
var t = [], e = this.state.inputs, n = this;
return o(e, function(e) {
t.push("var " + e.name + "=" + n.generateFunction(e.name, "s")), e.isPure && t.push(e.name, ".isPure=" + JSON.stringify(e.isPure) + ";");
}), e.length && t.push("fn.inputs=[" + e.map(function(t) {
return t.name;
}).join(",") + "];"), t.join("");
},
generateFunction:function(t, e) {
return "function(" + e + "){" + this.varsPrefix(t) + this.body(t) + "};";
},
filterPrefix:function() {
var t = [], e = this;
return o(this.state.filters, function(n, r) {
t.push(n + "=$filter(" + e.escape(r) + ")");
}), t.length ? "var " + t.join(",") + ";" :"";
},
varsPrefix:function(t) {
return this.state[t].vars.length ? "var " + this.state[t].vars.join(",") + ";" :"";
},
body:function(t) {
return this.state[t].body.join("");
},
recurse:function(t, e, n, r, i, a) {
var s, u, c, l, f, h = this;
if (r = r || $, !a && b(t.watchId)) return e = e || this.nextId(), void this.if_("i", this.lazyAssign(e, this.computedMember("i", t.watchId)), this.lazyRecurse(t, e, n, r, i, !0));
switch (t.type) {
case Bo.Program:
o(t.body, function(e, n) {
h.recurse(e.expression, void 0, void 0, function(t) {
u = t;
}), n !== t.body.length - 1 ? h.current().body.push(u, ";") :h.return_(u);
});
break;

case Bo.Literal:
l = this.escape(t.value), this.assign(e, l), r(e || l);
break;

case Bo.UnaryExpression:
this.recurse(t.argument, void 0, void 0, function(t) {
u = t;
}), l = t.operator + "(" + this.ifDefined(u, 0) + ")", this.assign(e, l), r(l);
break;

case Bo.BinaryExpression:
this.recurse(t.left, void 0, void 0, function(t) {
s = t;
}), this.recurse(t.right, void 0, void 0, function(t) {
u = t;
}), l = "+" === t.operator ? this.plus(s, u) :"-" === t.operator ? this.ifDefined(s, 0) + t.operator + this.ifDefined(u, 0) :"(" + s + ")" + t.operator + "(" + u + ")", 
this.assign(e, l), r(l);
break;

case Bo.LogicalExpression:
e = e || this.nextId(), h.recurse(t.left, e), h.if_("&&" === t.operator ? e :h.not(e), h.lazyRecurse(t.right, e)), 
r(e);
break;

case Bo.ConditionalExpression:
e = e || this.nextId(), h.recurse(t.test, e), h.if_(e, h.lazyRecurse(t.alternate, e), h.lazyRecurse(t.consequent, e)), 
r(e);
break;

case Bo.Identifier:
e = e || this.nextId(), n && (n.context = "inputs" === h.stage ? "s" :this.assign(this.nextId(), this.getHasOwnProperty("l", t.name) + "?l:s"), 
n.computed = !1, n.name = t.name), h.if_("inputs" === h.stage || h.not(h.getHasOwnProperty("l", t.name)), function() {
h.if_("inputs" === h.stage || "s", function() {
i && 1 !== i && h.if_(h.isNull(h.nonComputedMember("s", t.name)), h.lazyAssign(h.nonComputedMember("s", t.name), "{}")), 
h.assign(e, h.nonComputedMember("s", t.name));
});
}, e && h.lazyAssign(e, h.nonComputedMember("l", t.name))), r(e);
break;

case Bo.MemberExpression:
s = n && (n.context = this.nextId()) || this.nextId(), e = e || this.nextId(), h.recurse(t.object, s, void 0, function() {
h.if_(h.notNull(s), function() {
t.computed ? (u = h.nextId(), h.recurse(t.property, u), h.getStringValue(u), i && 1 !== i && h.if_(h.not(h.computedMember(s, u)), h.lazyAssign(h.computedMember(s, u), "{}")), 
l = h.computedMember(s, u), h.assign(e, l), n && (n.computed = !0, n.name = u)) :(i && 1 !== i && h.if_(h.isNull(h.nonComputedMember(s, t.property.name)), h.lazyAssign(h.nonComputedMember(s, t.property.name), "{}")), 
l = h.nonComputedMember(s, t.property.name), h.assign(e, l), n && (n.computed = !1, 
n.name = t.property.name));
}, function() {
h.assign(e, "undefined");
}), r(e);
}, !!i);
break;

case Bo.CallExpression:
e = e || this.nextId(), t.filter ? (u = h.filter(t.callee.name), c = [], o(t.arguments, function(t) {
var e = h.nextId();
h.recurse(t, e), c.push(e);
}), l = u + "(" + c.join(",") + ")", h.assign(e, l), r(e)) :(u = h.nextId(), s = {}, 
c = [], h.recurse(t.callee, u, s, function() {
h.if_(h.notNull(u), function() {
o(t.arguments, function(e) {
h.recurse(e, t.constant ? void 0 :h.nextId(), void 0, function(t) {
c.push(t);
});
}), l = s.name ? h.member(s.context, s.name, s.computed) + "(" + c.join(",") + ")" :u + "(" + c.join(",") + ")", 
h.assign(e, l);
}, function() {
h.assign(e, "undefined");
}), r(e);
}));
break;

case Bo.AssignmentExpression:
u = this.nextId(), s = {}, this.recurse(t.left, void 0, s, function() {
h.if_(h.notNull(s.context), function() {
h.recurse(t.right, u), l = h.member(s.context, s.name, s.computed) + t.operator + u, 
h.assign(e, l), r(e || l);
});
}, 1);
break;

case Bo.ArrayExpression:
c = [], o(t.elements, function(e) {
h.recurse(e, t.constant ? void 0 :h.nextId(), void 0, function(t) {
c.push(t);
});
}), l = "[" + c.join(",") + "]", this.assign(e, l), r(e || l);
break;

case Bo.ObjectExpression:
c = [], f = !1, o(t.properties, function(t) {
t.computed && (f = !0);
}), f ? (e = e || this.nextId(), this.assign(e, "{}"), o(t.properties, function(t) {
t.computed ? (s = h.nextId(), h.recurse(t.key, s)) :s = t.key.type === Bo.Identifier ? t.key.name :"" + t.key.value, 
u = h.nextId(), h.recurse(t.value, u), h.assign(h.member(e, s, t.computed), u);
})) :(o(t.properties, function(e) {
h.recurse(e.value, t.constant ? void 0 :h.nextId(), void 0, function(t) {
c.push(h.escape(e.key.type === Bo.Identifier ? e.key.name :"" + e.key.value) + ":" + t);
});
}), l = "{" + c.join(",") + "}", this.assign(e, l)), r(e || l);
break;

case Bo.ThisExpression:
this.assign(e, "s"), r(e || "s");
break;

case Bo.LocalsExpression:
this.assign(e, "l"), r(e || "l");
break;

case Bo.NGValueParameter:
this.assign(e, "v"), r(e || "v");
}
},
getHasOwnProperty:function(t, e) {
var n = t + "." + e, r = this.current().own;
return r.hasOwnProperty(n) || (r[n] = this.nextId(!1, t + "&&(" + this.escape(e) + " in " + t + ")")), 
r[n];
},
assign:function(t, e) {
return t ? (this.current().body.push(t, "=", e, ";"), t) :void 0;
},
filter:function(t) {
return this.state.filters.hasOwnProperty(t) || (this.state.filters[t] = this.nextId(!0)), 
this.state.filters[t];
},
ifDefined:function(t, e) {
return "ifDefined(" + t + "," + this.escape(e) + ")";
},
plus:function(t, e) {
return "plus(" + t + "," + e + ")";
},
return_:function(t) {
this.current().body.push("return ", t, ";");
},
if_:function(t, e, n) {
if (t === !0) e(); else {
var r = this.current().body;
r.push("if(", t, "){"), e(), r.push("}"), n && (r.push("else{"), n(), r.push("}"));
}
},
not:function(t) {
return "!(" + t + ")";
},
isNull:function(t) {
return t + "==null";
},
notNull:function(t) {
return t + "!=null";
},
nonComputedMember:function(t, e) {
var n = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/, r = /[^$_a-zA-Z0-9]/g;
return n.test(e) ? t + "." + e :t + '["' + e.replace(r, this.stringEscapeFn) + '"]';
},
computedMember:function(t, e) {
return t + "[" + e + "]";
},
member:function(t, e, n) {
return n ? this.computedMember(t, e) :this.nonComputedMember(t, e);
},
getStringValue:function(t) {
this.assign(t, "getStringValue(" + t + ")");
},
lazyRecurse:function(t, e, n, r, i, o) {
var a = this;
return function() {
a.recurse(t, e, n, r, i, o);
};
},
lazyAssign:function(t, e) {
var n = this;
return function() {
n.assign(t, e);
};
},
stringEscapeRegex:/[^ a-zA-Z0-9]/g,
stringEscapeFn:function(t) {
return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
},
escape:function(t) {
if (C(t)) return "'" + t.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
if (E(t)) return t.toString();
if (t === !0) return "true";
if (t === !1) return "false";
if (null === t) return "null";
if ("undefined" == typeof t) return "undefined";
throw Uo("esc", "IMPOSSIBLE");
},
nextId:function(t, e) {
var n = "v" + this.state.nextId++;
return t || this.current().vars.push(n + (e ? "=" + e :"")), n;
},
current:function() {
return this.state[this.state.computing];
}
}, En.prototype = {
compile:function(t) {
var e = this;
mn(t, e.$filter);
var n, r;
(n = bn(t)) && (r = this.recurse(n));
var i, a = gn(t.body);
a && (i = [], o(a, function(t, n) {
var r = e.recurse(t);
r.isPure = t.isPure, t.input = r, i.push(r), t.watchId = n;
}));
var s = [];
o(t.body, function(t) {
s.push(e.recurse(t.expression));
});
var u = 0 === t.body.length ? $ :1 === t.body.length ? s[0] :function(t, e) {
var n;
return o(s, function(r) {
n = r(t, e);
}), n;
};
return r && (u.assign = function(t, e, n) {
return r(t, n, e);
}), i && (u.inputs = i), u;
},
recurse:function(t, e, n) {
var r, i, a, s = this;
if (t.input) return this.inputs(t.input, t.watchId);
switch (t.type) {
case Bo.Literal:
return this.value(t.value, e);

case Bo.UnaryExpression:
return i = this.recurse(t.argument), this["unary" + t.operator](i, e);

case Bo.BinaryExpression:
return r = this.recurse(t.left), i = this.recurse(t.right), this["binary" + t.operator](r, i, e);

case Bo.LogicalExpression:
return r = this.recurse(t.left), i = this.recurse(t.right), this["binary" + t.operator](r, i, e);

case Bo.ConditionalExpression:
return this["ternary?:"](this.recurse(t.test), this.recurse(t.alternate), this.recurse(t.consequent), e);

case Bo.Identifier:
return s.identifier(t.name, e, n);

case Bo.MemberExpression:
return r = this.recurse(t.object, !1, !!n), t.computed || (i = t.property.name), 
t.computed && (i = this.recurse(t.property)), t.computed ? this.computedMember(r, i, e, n) :this.nonComputedMember(r, i, e, n);

case Bo.CallExpression:
return a = [], o(t.arguments, function(t) {
a.push(s.recurse(t));
}), t.filter && (i = this.$filter(t.callee.name)), t.filter || (i = this.recurse(t.callee, !0)), 
t.filter ? function(t, n, r, o) {
for (var s = [], u = 0; u < a.length; ++u) s.push(a[u](t, n, r, o));
var c = i.apply(void 0, s, o);
return e ? {
context:void 0,
name:void 0,
value:c
} :c;
} :function(t, n, r, o) {
var s, u = i(t, n, r, o);
if (null != u.value) {
for (var c = [], l = 0; l < a.length; ++l) c.push(a[l](t, n, r, o));
s = u.value.apply(u.context, c);
}
return e ? {
value:s
} :s;
};

case Bo.AssignmentExpression:
return r = this.recurse(t.left, !0, 1), i = this.recurse(t.right), function(t, n, o, a) {
var s = r(t, n, o, a), u = i(t, n, o, a);
return s.context[s.name] = u, e ? {
value:u
} :u;
};

case Bo.ArrayExpression:
return a = [], o(t.elements, function(t) {
a.push(s.recurse(t));
}), function(t, n, r, i) {
for (var o = [], s = 0; s < a.length; ++s) o.push(a[s](t, n, r, i));
return e ? {
value:o
} :o;
};

case Bo.ObjectExpression:
return a = [], o(t.properties, function(t) {
t.computed ? a.push({
key:s.recurse(t.key),
computed:!0,
value:s.recurse(t.value)
}) :a.push({
key:t.key.type === Bo.Identifier ? t.key.name :"" + t.key.value,
computed:!1,
value:s.recurse(t.value)
});
}), function(t, n, r, i) {
for (var o = {}, s = 0; s < a.length; ++s) a[s].computed ? o[a[s].key(t, n, r, i)] = a[s].value(t, n, r, i) :o[a[s].key] = a[s].value(t, n, r, i);
return e ? {
value:o
} :o;
};

case Bo.ThisExpression:
return function(t) {
return e ? {
value:t
} :t;
};

case Bo.LocalsExpression:
return function(t, n) {
return e ? {
value:n
} :n;
};

case Bo.NGValueParameter:
return function(t, n, r) {
return e ? {
value:r
} :r;
};
}
},
"unary+":function(t, e) {
return function(n, r, i, o) {
var a = t(n, r, i, o);
return a = b(a) ? +a :0, e ? {
value:a
} :a;
};
},
"unary-":function(t, e) {
return function(n, r, i, o) {
var a = t(n, r, i, o);
return a = b(a) ? -a :-0, e ? {
value:a
} :a;
};
},
"unary!":function(t, e) {
return function(n, r, i, o) {
var a = !t(n, r, i, o);
return e ? {
value:a
} :a;
};
},
"binary+":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a), u = e(r, i, o, a), c = dn(s, u);
return n ? {
value:c
} :c;
};
},
"binary-":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a), u = e(r, i, o, a), c = (b(s) ? s :0) - (b(u) ? u :0);
return n ? {
value:c
} :c;
};
},
"binary*":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) * e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary/":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) / e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary%":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) % e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary===":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) === e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary!==":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) !== e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary==":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) == e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary!=":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) != e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary<":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) < e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary>":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) > e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary<=":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) <= e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary>=":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) >= e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary&&":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) && e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"binary||":function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) || e(r, i, o, a);
return n ? {
value:s
} :s;
};
},
"ternary?:":function(t, e, n, r) {
return function(i, o, a, s) {
var u = t(i, o, a, s) ? e(i, o, a, s) :n(i, o, a, s);
return r ? {
value:u
} :u;
};
},
value:function(t, e) {
return function() {
return e ? {
context:void 0,
name:void 0,
value:t
} :t;
};
},
identifier:function(t, e, n) {
return function(r, i, o, a) {
var s = i && t in i ? i :r;
n && 1 !== n && s && null == s[t] && (s[t] = {});
var u = s ? s[t] :void 0;
return e ? {
context:s,
name:t,
value:u
} :u;
};
},
computedMember:function(t, e, n, r) {
return function(i, o, a, s) {
var u, c, l = t(i, o, a, s);
return null != l && (u = e(i, o, a, s), u = hn(u), r && 1 !== r && l && !l[u] && (l[u] = {}), 
c = l[u]), n ? {
context:l,
name:u,
value:c
} :c;
};
},
nonComputedMember:function(t, e, n, r) {
return function(i, o, a, s) {
var u = t(i, o, a, s);
r && 1 !== r && u && null == u[e] && (u[e] = {});
var c = null != u ? u[e] :void 0;
return n ? {
context:u,
name:e,
value:c
} :c;
};
},
inputs:function(t, e) {
return function(n, r, i, o) {
return o ? o[e] :t(n, r, i);
};
}
}, Sn.prototype = {
constructor:Sn,
parse:function(t) {
var e = this.getAst(t), n = this.astCompiler.compile(e.ast);
return n.literal = wn(e.ast), n.constant = xn(e.ast), n.oneTime = e.oneTime, n;
},
getAst:function(t) {
var e = !1;
return t = t.trim(), ":" === t.charAt(0) && ":" === t.charAt(1) && (e = !0, t = t.substring(2)), 
{
ast:this.ast.ast(t),
oneTime:e
};
}
};
var Go = r("$sce"), Jo = {
HTML:"html",
CSS:"css",
URL:"url",
RESOURCE_URL:"resourceUrl",
JS:"js"
}, Ko = /_([a-z])/g, Zo = r("$compile"), Yo = t.document.createElement("a"), Qo = Wn(t.location.href);
Kn.$inject = [ "$document" ], Yn.$inject = [ "$provide" ];
var Xo = 22, ta = ".", ea = "0";
nr.$inject = [ "$locale" ], rr.$inject = [ "$locale" ];
var na = {
yyyy:ur("FullYear", 4, 0, !1, !0),
yy:ur("FullYear", 2, 0, !0, !0),
y:ur("FullYear", 1, 0, !1, !0),
MMMM:cr("Month"),
MMM:cr("Month", !0),
MM:ur("Month", 2, 1),
M:ur("Month", 1, 1),
LLLL:cr("Month", !1, !0),
dd:ur("Date", 2),
d:ur("Date", 1),
HH:ur("Hours", 2),
H:ur("Hours", 1),
hh:ur("Hours", 2, -12),
h:ur("Hours", 1, -12),
mm:ur("Minutes", 2),
m:ur("Minutes", 1),
ss:ur("Seconds", 2),
s:ur("Seconds", 1),
sss:ur("Milliseconds", 3),
EEEE:cr("Day"),
EEE:cr("Day", !0),
a:dr,
Z:lr,
ww:pr(2),
w:pr(1),
G:$r,
GG:$r,
GGG:$r,
GGGG:vr
}, ra = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/, ia = /^-?\d+$/;
mr.$inject = [ "$locale" ];
var oa = m(ri), aa = m(ii);
wr.$inject = [ "$parse" ];
var sa = m({
restrict:"E",
compile:function(t, e) {
return e.href || e.xlinkHref ? void 0 :function(t, e) {
if ("a" === e[0].nodeName.toLowerCase()) {
var n = "[object SVGAnimatedString]" === di.call(e.prop("href")) ? "xlink:href" :"href";
e.on("click", function(t) {
e.attr(n) || t.preventDefault();
});
}
};
}
}), ua = {};
o(Yi, function(t, e) {
function n(t, n, i) {
t.$watch(i[r], function(t) {
i.$set(e, !!t);
});
}
if ("multiple" !== t) {
var r = Se("ng-" + e), i = n;
"checked" === t && (i = function(t, e, i) {
i.ngModel !== i[r] && n(t, e, i);
}), ua[r] = function() {
return {
restrict:"A",
priority:100,
link:i
};
};
}
}), o(Xi, function(t, e) {
ua[e] = function() {
return {
priority:100,
link:function(t, n, r) {
if ("ngPattern" === e && "/" === r.ngPattern.charAt(0)) {
var i = r.ngPattern.match(ti);
if (i) return void r.$set("ngPattern", new RegExp(i[1], i[2]));
}
t.$watch(r[e], function(t) {
r.$set(e, t);
});
}
};
};
}), o([ "src", "srcset", "href" ], function(t) {
var e = Se("ng-" + t);
ua[e] = function() {
return {
priority:99,
link:function(n, r, i) {
var o = t, a = t;
"href" === t && "[object SVGAnimatedString]" === di.call(r.prop("href")) && (a = "xlinkHref", 
i.$attr[a] = "xlink:href", o = null), i.$observe(e, function(e) {
return e ? (i.$set(a, e), void (si && o && r.prop(o, i[a]))) :void ("href" === t && i.$set(a, null));
});
}
};
};
});
var ca = {
$addControl:$,
$$renameControl:Cr,
$removeControl:$,
$setValidity:$,
$setDirty:$,
$setPristine:$,
$setSubmitted:$
}, la = "ng-pending", fa = "ng-submitted";
Er.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ], Er.prototype = {
$rollbackViewValue:function() {
o(this.$$controls, function(t) {
t.$rollbackViewValue();
});
},
$commitViewValue:function() {
o(this.$$controls, function(t) {
t.$commitViewValue();
});
},
$addControl:function(t) {
mt(t.$name, "input"), this.$$controls.push(t), t.$name && (this[t.$name] = t), t.$$parentForm = this;
},
$$renameControl:function(t, e) {
var n = t.$name;
this[n] === t && delete this[n], this[e] = t, t.$name = e;
},
$removeControl:function(t) {
t.$name && this[t.$name] === t && delete this[t.$name], o(this.$pending, function(e, n) {
this.$setValidity(n, null, t);
}, this), o(this.$error, function(e, n) {
this.$setValidity(n, null, t);
}, this), o(this.$$success, function(e, n) {
this.$setValidity(n, null, t);
}, this), F(this.$$controls, t), t.$$parentForm = ca;
},
$setDirty:function() {
this.$$animate.removeClass(this.$$element, Ja), this.$$animate.addClass(this.$$element, Ka), 
this.$dirty = !0, this.$pristine = !1, this.$$parentForm.$setDirty();
},
$setPristine:function() {
this.$$animate.setClass(this.$$element, Ja, Ka + " " + fa), this.$dirty = !1, this.$pristine = !0, 
this.$submitted = !1, o(this.$$controls, function(t) {
t.$setPristine();
});
},
$setUntouched:function() {
o(this.$$controls, function(t) {
t.$setUntouched();
});
},
$setSubmitted:function() {
this.$$animate.addClass(this.$$element, fa), this.$submitted = !0, this.$$parentForm.$setSubmitted();
}
}, kr({
clazz:Er,
set:function(t, e, n) {
var r = t[e];
if (r) {
var i = r.indexOf(n);
-1 === i && r.push(n);
} else t[e] = [ n ];
},
unset:function(t, e, n) {
var r = t[e];
r && (F(r, n), 0 === r.length && delete t[e]);
}
});
var ha = function(t) {
return [ "$timeout", "$parse", function(e, n) {
function r(t) {
return "" === t ? n('this[""]').assign :n(t).assign || $;
}
var i = {
name:"form",
restrict:t ? "EAC" :"E",
require:[ "form", "^^?form" ],
controller:Er,
compile:function(n, i) {
n.addClass(Ja).addClass(Wa);
var o = i.name ? "name" :t && i.ngForm ? "ngForm" :!1;
return {
pre:function(t, n, i, a) {
var s = a[0];
if (!("action" in i)) {
var u = function(e) {
t.$apply(function() {
s.$commitViewValue(), s.$setSubmitted();
}), e.preventDefault();
};
n[0].addEventListener("submit", u), n.on("$destroy", function() {
e(function() {
n[0].removeEventListener("submit", u);
}, 0, !1);
});
}
var c = a[1] || s.$$parentForm;
c.$addControl(s);
var l = o ? r(s.$name) :$;
o && (l(t, s), i.$observe(o, function(e) {
s.$name !== e && (l(t, void 0), s.$$parentForm.$$renameControl(s, e), (l = r(s.$name))(t, s));
})), n.on("$destroy", function() {
s.$$parentForm.$removeControl(s), l(t, void 0), f(s, ca);
});
}
};
}
};
return i;
} ];
}, pa = ha(), da = ha(!0), $a = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/, va = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i, ma = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/, ga = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, ya = /^(\d{4,})-(\d{2})-(\d{2})$/, ba = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, wa = /^(\d{4,})-W(\d\d)$/, xa = /^(\d{4,})-(\d\d)$/, Ca = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Ea = "keydown wheel mousedown", Sa = bt();
o("date,datetime-local,month,time,week".split(","), function(t) {
Sa[t] = !0;
});
var ka = {
text:Mr,
date:Ir("date", ya, Nr(ya, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
"datetime-local":Ir("datetimelocal", ba, Nr(ba, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
time:Ir("time", Ca, Nr(Ca, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
week:Ir("week", wa, Tr, "yyyy-Www"),
month:Ir("month", xa, Nr(xa, [ "yyyy", "MM" ]), "yyyy-MM"),
number:Lr,
url:Fr,
email:Hr,
radio:Br,
range:qr,
checkbox:Wr,
hidden:$,
button:$,
submit:$,
reset:$,
file:$
}, Aa = [ "$browser", "$sniffer", "$filter", "$parse", function(t, e, n, r) {
return {
restrict:"E",
require:[ "?ngModel" ],
link:{
pre:function(i, o, a, s) {
s[0] && (ka[ri(a.type)] || ka.text)(i, o, a, s[0], e, t, n, r);
}
}
};
} ], Oa = /^(true|false|\d+)$/, Ma = function() {
function t(t, e, n) {
var r = b(n) ? n :9 === si ? "" :null;
t.prop("value", r), e.$set("value", n);
}
return {
restrict:"A",
priority:100,
compile:function(e, n) {
return Oa.test(n.ngValue) ? function(e, n, r) {
var i = e.$eval(r.ngValue);
t(n, r, i);
} :function(e, n, r) {
e.$watch(r.ngValue, function(e) {
t(n, r, e);
});
};
}
};
}, Va = [ "$compile", function(t) {
return {
restrict:"AC",
compile:function(e) {
return t.$$addBindingClass(e), function(e, n, r) {
t.$$addBindingInfo(n, r.ngBind), n = n[0], e.$watch(r.ngBind, function(t) {
n.textContent = wt(t);
});
};
}
};
} ], Ta = [ "$interpolate", "$compile", function(t, e) {
return {
compile:function(n) {
return e.$$addBindingClass(n), function(n, r, i) {
var o = t(r.attr(i.$attr.ngBindTemplate));
e.$$addBindingInfo(r, o.expressions), r = r[0], i.$observe("ngBindTemplate", function(t) {
r.textContent = y(t) ? "" :t;
});
};
}
};
} ], Na = [ "$sce", "$parse", "$compile", function(t, e, n) {
return {
restrict:"A",
compile:function(r, i) {
var o = e(i.ngBindHtml), a = e(i.ngBindHtml, function(e) {
return t.valueOf(e);
});
return n.$$addBindingClass(r), function(e, r, i) {
n.$$addBindingInfo(r, i.ngBindHtml), e.$watch(a, function() {
var n = o(e);
r.html(t.getTrustedHtml(n) || "");
});
};
}
};
} ], Ia = m({
restrict:"A",
require:"ngModel",
link:function(t, e, n, r) {
r.$viewChangeListeners.push(function() {
t.$eval(n.ngChange);
});
}
}), ja = Gr("", !0), Da = Gr("Odd", 0), Pa = Gr("Even", 1), _a = xr({
compile:function(t, e) {
e.$set("ngCloak", void 0), t.removeClass("ng-cloak");
}
}), Ra = [ function() {
return {
restrict:"A",
scope:!0,
controller:"@",
priority:500
};
} ], Ua = {}, La = {
blur:!0,
focus:!0
};
o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(t) {
var e = Se("ng-" + t);
Ua[e] = [ "$parse", "$rootScope", function(n, r) {
return {
restrict:"A",
compile:function(i, o) {
var a = n(o[e]);
return function(e, n) {
n.on(t, function(n) {
var i = function() {
a(e, {
$event:n
});
};
La[t] && r.$$phase ? e.$evalAsync(i) :e.$apply(i);
});
};
}
};
} ];
});
var qa = [ "$animate", "$compile", function(t, e) {
return {
multiElement:!0,
transclude:"element",
priority:600,
terminal:!0,
restrict:"A",
$$tlb:!0,
link:function(n, r, i, o, a) {
var s, u, c;
n.$watch(i.ngIf, function(n) {
n ? u || a(function(n, o) {
u = o, n[n.length++] = e.$$createComment("end ngIf", i.ngIf), s = {
clone:n
}, t.enter(n, r.parent(), r);
}) :(c && (c.remove(), c = null), u && (u.$destroy(), u = null), s && (c = yt(s.clone), 
t.leave(c).done(function(t) {
t !== !1 && (c = null);
}), s = null));
});
}
};
} ], Fa = [ "$templateRequest", "$anchorScroll", "$animate", function(t, e, n) {
return {
restrict:"ECA",
priority:400,
terminal:!0,
transclude:"element",
controller:mi.noop,
compile:function(r, i) {
var o = i.ngInclude || i.src, a = i.onload || "", s = i.autoscroll;
return function(r, i, u, c, l) {
var f, h, p, d = 0, $ = function() {
h && (h.remove(), h = null), f && (f.$destroy(), f = null), p && (n.leave(p).done(function(t) {
t !== !1 && (h = null);
}), h = p, p = null);
};
r.$watch(o, function(o) {
var u = function(t) {
t === !1 || !b(s) || s && !r.$eval(s) || e();
}, h = ++d;
o ? (t(o, !0).then(function(t) {
if (!r.$$destroyed && h === d) {
var e = r.$new();
c.template = t;
var s = l(e, function(t) {
$(), n.enter(t, null, i).done(u);
});
f = e, p = s, f.$emit("$includeContentLoaded", o), r.$eval(a);
}
}, function() {
r.$$destroyed || h === d && ($(), r.$emit("$includeContentError", o));
}), r.$emit("$includeContentRequested", o)) :($(), c.template = null);
});
};
}
};
} ], Ha = [ "$compile", function(e) {
return {
restrict:"ECA",
priority:-400,
require:"ngInclude",
link:function(n, r, i, o) {
return di.call(r[0]).match(/SVG/) ? (r.empty(), void e(jt(o.template, t.document).childNodes)(n, function(t) {
r.append(t);
}, {
futureParentElement:r
})) :(r.html(o.template), void e(r.contents())(n));
}
};
} ], Ba = xr({
priority:450,
compile:function() {
return {
pre:function(t, e, n) {
t.$eval(n.ngInit);
}
};
}
}), za = function() {
return {
restrict:"A",
priority:100,
require:"ngModel",
link:function(t, e, n, r) {
var i = n.ngList || ", ", a = "false" !== n.ngTrim, s = a ? xi(i) :i, u = function(t) {
if (!y(t)) {
var e = [];
return t && o(t.split(s), function(t) {
t && e.push(a ? xi(t) :t);
}), e;
}
};
r.$parsers.push(u), r.$formatters.push(function(t) {
return bi(t) ? t.join(i) :void 0;
}), r.$isEmpty = function(t) {
return !t || !t.length;
};
}
};
}, Wa = "ng-valid", Ga = "ng-invalid", Ja = "ng-pristine", Ka = "ng-dirty", Za = "ng-untouched", Ya = "ng-touched", Qa = "ng-empty", Xa = "ng-not-empty", ts = r("ngModel");
Jr.$inject = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$q", "$interpolate" ], 
Jr.prototype = {
$$initGetterSetters:function() {
if (this.$options.getOption("getterSetter")) {
var t = this.$$parse(this.$$attr.ngModel + "()"), e = this.$$parse(this.$$attr.ngModel + "($$$p)");
this.$$ngModelGet = function(e) {
var n = this.$$parsedNgModel(e);
return A(n) && (n = t(e)), n;
}, this.$$ngModelSet = function(t, n) {
A(this.$$parsedNgModel(t)) ? e(t, {
$$$p:n
}) :this.$$parsedNgModelAssign(t, n);
};
} else if (!this.$$parsedNgModel.assign) throw ts("nonassign", "Expression '{0}' is non-assignable. Element: {1}", this.$$attr.ngModel, et(this.$$element));
},
$render:$,
$isEmpty:function(t) {
return y(t) || "" === t || null === t || t !== t;
},
$$updateEmptyClasses:function(t) {
this.$isEmpty(t) ? (this.$$animate.removeClass(this.$$element, Xa), this.$$animate.addClass(this.$$element, Qa)) :(this.$$animate.removeClass(this.$$element, Qa), 
this.$$animate.addClass(this.$$element, Xa));
},
$setPristine:function() {
this.$dirty = !1, this.$pristine = !0, this.$$animate.removeClass(this.$$element, Ka), 
this.$$animate.addClass(this.$$element, Ja);
},
$setDirty:function() {
this.$dirty = !0, this.$pristine = !1, this.$$animate.removeClass(this.$$element, Ja), 
this.$$animate.addClass(this.$$element, Ka), this.$$parentForm.$setDirty();
},
$setUntouched:function() {
this.$touched = !1, this.$untouched = !0, this.$$animate.setClass(this.$$element, Za, Ya);
},
$setTouched:function() {
this.$touched = !0, this.$untouched = !1, this.$$animate.setClass(this.$$element, Ya, Za);
},
$rollbackViewValue:function() {
this.$$timeout.cancel(this.$$pendingDebounce), this.$viewValue = this.$$lastCommittedViewValue, 
this.$render();
},
$validate:function() {
if (!yi(this.$modelValue)) {
var t = this.$$lastCommittedViewValue, e = this.$$rawModelValue, n = this.$valid, r = this.$modelValue, i = this.$options.getOption("allowInvalid"), o = this;
this.$$runValidators(e, t, function(t) {
i || n === t || (o.$modelValue = t ? e :void 0, o.$modelValue !== r && o.$$writeModelToScope());
});
}
},
$$runValidators:function(t, e, n) {
function r() {
var t = l.$$parserName || "parse";
return y(l.$$parserValid) ? (s(t, null), !0) :(l.$$parserValid || (o(l.$validators, function(t, e) {
s(e, null);
}), o(l.$asyncValidators, function(t, e) {
s(e, null);
})), s(t, l.$$parserValid), l.$$parserValid);
}
function i() {
var n = !0;
return o(l.$validators, function(r, i) {
var o = Boolean(r(t, e));
n = n && o, s(i, o);
}), n ? !0 :(o(l.$asyncValidators, function(t, e) {
s(e, null);
}), !1);
}
function a() {
var n = [], r = !0;
o(l.$asyncValidators, function(i, o) {
var a = i(t, e);
if (!D(a)) throw ts("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", a);
s(o, void 0), n.push(a.then(function() {
s(o, !0);
}, function() {
r = !1, s(o, !1);
}));
}), n.length ? l.$$q.all(n).then(function() {
u(r);
}, $) :u(!0);
}
function s(t, e) {
c === l.$$currentValidationRunId && l.$setValidity(t, e);
}
function u(t) {
c === l.$$currentValidationRunId && n(t);
}
this.$$currentValidationRunId++;
var c = this.$$currentValidationRunId, l = this;
return r() && i() ? void a() :void u(!1);
},
$commitViewValue:function() {
var t = this.$viewValue;
this.$$timeout.cancel(this.$$pendingDebounce), (this.$$lastCommittedViewValue !== t || "" === t && this.$$hasNativeValidators) && (this.$$updateEmptyClasses(t), 
this.$$lastCommittedViewValue = t, this.$pristine && this.$setDirty(), this.$$parseAndValidate());
},
$$parseAndValidate:function() {
function t() {
r.$modelValue !== o && r.$$writeModelToScope();
}
var e = this.$$lastCommittedViewValue, n = e, r = this;
if (this.$$parserValid = y(n) ? void 0 :!0, this.$$parserValid) for (var i = 0; i < this.$parsers.length; i++) if (n = this.$parsers[i](n), 
y(n)) {
this.$$parserValid = !1;
break;
}
yi(this.$modelValue) && (this.$modelValue = this.$$ngModelGet(this.$$scope));
var o = this.$modelValue, a = this.$options.getOption("allowInvalid");
this.$$rawModelValue = n, a && (this.$modelValue = n, t()), this.$$runValidators(n, this.$$lastCommittedViewValue, function(e) {
a || (r.$modelValue = e ? n :void 0, t());
});
},
$$writeModelToScope:function() {
this.$$ngModelSet(this.$$scope, this.$modelValue), o(this.$viewChangeListeners, function(t) {
try {
t();
} catch (e) {
this.$$exceptionHandler(e);
}
}, this);
},
$setViewValue:function(t, e) {
this.$viewValue = t, this.$options.getOption("updateOnDefault") && this.$$debounceViewValueCommit(e);
},
$$debounceViewValueCommit:function(t) {
var e = this.$options.getOption("debounce");
E(e[t]) ? e = e[t] :E(e["default"]) && (e = e["default"]), this.$$timeout.cancel(this.$$pendingDebounce);
var n = this;
e > 0 ? this.$$pendingDebounce = this.$$timeout(function() {
n.$commitViewValue();
}, e) :this.$$scope.$root.$$phase ? this.$commitViewValue() :this.$$scope.$apply(function() {
n.$commitViewValue();
});
},
$overrideModelOptions:function(t) {
this.$options = this.$options.createChild(t), this.$$setUpdateOnEvents();
},
$processModelValue:function() {
var t = this.$$format();
this.$viewValue !== t && (this.$$updateEmptyClasses(t), this.$viewValue = this.$$lastCommittedViewValue = t, 
this.$render(), this.$$runValidators(this.$modelValue, this.$viewValue, $));
},
$$format:function() {
for (var t = this.$formatters, e = t.length, n = this.$modelValue; e--; ) n = t[e](n);
return n;
},
$$setModelValue:function(t) {
this.$modelValue = this.$$rawModelValue = t, this.$$parserValid = void 0, this.$processModelValue();
},
$$setUpdateOnEvents:function() {
this.$$updateEvents && this.$$element.off(this.$$updateEvents, this.$$updateEventHandler), 
this.$$updateEvents = this.$options.getOption("updateOn"), this.$$updateEvents && this.$$element.on(this.$$updateEvents, this.$$updateEventHandler);
},
$$updateEventHandler:function(t) {
this.$$debounceViewValueCommit(t && t.type);
}
}, kr({
clazz:Jr,
set:function(t, e) {
t[e] = !0;
},
unset:function(t, e) {
delete t[e];
}
});
var es, ns = [ "$rootScope", function(t) {
return {
restrict:"A",
require:[ "ngModel", "^?form", "^?ngModelOptions" ],
controller:Jr,
priority:1,
compile:function(e) {
return e.addClass(Ja).addClass(Za).addClass(Wa), {
pre:function(t, e, n, r) {
var i = r[0], o = r[1] || i.$$parentForm, a = r[2];
a && (i.$options = a.$options), i.$$initGetterSetters(), o.$addControl(i), n.$observe("name", function(t) {
i.$name !== t && i.$$parentForm.$$renameControl(i, t);
}), t.$on("$destroy", function() {
i.$$parentForm.$removeControl(i);
});
},
post:function(e, n, r, i) {
function o() {
a.$setTouched();
}
var a = i[0];
a.$$setUpdateOnEvents(), n.on("blur", function() {
a.$touched || (t.$$phase ? e.$evalAsync(o) :e.$apply(o));
});
}
};
}
};
} ], rs = /(\s+|^)default(\s+|$)/;
Zr.prototype = {
getOption:function(t) {
return this.$$options[t];
},
createChild:function(t) {
var e = !1;
return t = f({}, t), o(t, function(n, r) {
"$inherit" === n ? "*" === r ? e = !0 :(t[r] = this.$$options[r], "updateOn" === r && (t.updateOnDefault = this.$$options.updateOnDefault)) :"updateOn" === r && (t.updateOnDefault = !1, 
t[r] = xi(n.replace(rs, function() {
return t.updateOnDefault = !0, " ";
})));
}, this), e && (delete t["*"], Yr(t, this.$$options)), Yr(t, es.$$options), new Zr(t);
}
}, es = new Zr({
updateOn:"",
updateOnDefault:!0,
debounce:0,
getterSetter:!1,
allowInvalid:!1,
timezone:null
});
var is = function() {
function t(t, e) {
this.$$attrs = t, this.$$scope = e;
}
return t.$inject = [ "$attrs", "$scope" ], t.prototype = {
$onInit:function() {
var t = this.parentCtrl ? this.parentCtrl.$options :es, e = this.$$scope.$eval(this.$$attrs.ngModelOptions);
this.$options = t.createChild(e);
}
}, {
restrict:"A",
priority:10,
require:{
parentCtrl:"?^^ngModelOptions"
},
bindToController:!0,
controller:t
};
}, os = xr({
terminal:!0,
priority:1e3
}), as = r("ngOptions"), ss = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, us = [ "$compile", "$document", "$parse", function(e, n, r) {
function a(t, e, n) {
function o(t, e, n, r, i) {
this.selectValue = t, this.viewValue = e, this.label = n, this.group = r, this.disabled = i;
}
function a(t) {
var e;
if (!c && i(t)) e = t; else {
e = [];
for (var n in t) t.hasOwnProperty(n) && "$" !== n.charAt(0) && e.push(n);
}
return e;
}
var s = t.match(ss);
if (!s) throw as("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", t, et(e));
var u = s[5] || s[7], c = s[6], l = / as /.test(s[0]) && s[1], f = s[9], h = r(s[2] ? s[1] :u), p = l && r(l), d = p || h, $ = f && r(f), v = f ? function(t, e) {
return $(n, e);
} :function(t) {
return ae(t);
}, m = function(t, e) {
return v(t, C(t, e));
}, g = r(s[2] || s[1]), y = r(s[3] || ""), b = r(s[4] || ""), w = r(s[8]), x = {}, C = c ? function(t, e) {
return x[c] = e, x[u] = t, x;
} :function(t) {
return x[u] = t, x;
};
return {
trackBy:f,
getTrackByValue:m,
getWatchables:r(w, function(t) {
var e = [];
t = t || [];
for (var r = a(t), i = r.length, o = 0; i > o; o++) {
var u = t === r ? o :r[o], c = t[u], l = C(c, u), f = v(c, l);
if (e.push(f), s[2] || s[1]) {
var h = g(n, l);
e.push(h);
}
if (s[4]) {
var p = b(n, l);
e.push(p);
}
}
return e;
}),
getOptions:function() {
for (var t = [], e = {}, r = w(n) || [], i = a(r), s = i.length, u = 0; s > u; u++) {
var c = r === i ? u :i[u], l = r[c], h = C(l, c), p = d(n, h), $ = v(p, h), x = g(n, h), E = y(n, h), S = b(n, h), k = new o($, p, x, E, S);
t.push(k), e[$] = k;
}
return {
items:t,
selectValueMap:e,
getOptionFromViewValue:function(t) {
return e[m(t)];
},
getViewValueFromOption:function(t) {
return f ? H(t.viewValue) :t.viewValue;
}
};
}
};
}
function s(t, r, i, s) {
function l(t, e) {
var n = u.cloneNode(!1);
e.appendChild(n), h(t, n);
}
function f(t) {
var e = C.getOptionFromViewValue(t), n = e && e.element;
return n && !n.selected && (n.selected = !0), e;
}
function h(t, e) {
t.element = e, e.disabled = t.disabled, t.label !== e.label && (e.label = t.label, 
e.textContent = t.label), e.value = t.selectValue;
}
function p() {
var t = C && d.readValue();
if (C) for (var e = C.items.length - 1; e >= 0; e--) {
var n = C.items[e];
Yt(b(n.group) ? n.element.parentNode :n.element);
}
C = E.getOptions();
var i = {};
if (C.items.forEach(function(t) {
var e;
b(t.group) ? (e = i[t.group], e || (e = c.cloneNode(!1), S.appendChild(e), e.label = null === t.group ? "null" :t.group, 
i[t.group] = e), l(t, e)) :l(t, S);
}), r[0].appendChild(S), $.$render(), !$.$isEmpty(t)) {
var o = d.readValue(), a = E.trackBy || v;
(a ? z(t, o) :t === o) || ($.$setViewValue(o), $.$render());
}
}
for (var d = s[0], $ = s[1], v = i.multiple, m = 0, g = r.children(), y = g.length; y > m; m++) if ("" === g[m].value) {
d.hasEmptyOption = !0, d.emptyOption = g.eq(m);
break;
}
r.empty();
var w = !!d.emptyOption, x = ui(u.cloneNode(!1));
x.val("?");
var C, E = a(i.ngOptions, r, t), S = n[0].createDocumentFragment();
d.generateUnknownOptionValue = function(t) {
return "?";
}, v ? (d.writeValue = function(t) {
if (C) {
var e = t && t.map(f) || [];
C.items.forEach(function(t) {
t.element.selected && !q(e, t) && (t.element.selected = !1);
});
}
}, d.readValue = function() {
var t = r.val() || [], e = [];
return o(t, function(t) {
var n = C.selectValueMap[t];
n && !n.disabled && e.push(C.getViewValueFromOption(n));
}), e;
}, E.trackBy && t.$watchCollection(function() {
return bi($.$viewValue) ? $.$viewValue.map(function(t) {
return E.getTrackByValue(t);
}) :void 0;
}, function() {
$.$render();
})) :(d.writeValue = function(t) {
if (C) {
var e = r[0].options[r[0].selectedIndex], n = C.getOptionFromViewValue(t);
e && e.removeAttribute("selected"), n ? (r[0].value !== n.selectValue && (d.removeUnknownOption(), 
r[0].value = n.selectValue, n.element.selected = !0), n.element.setAttribute("selected", "selected")) :d.selectUnknownOrEmptyOption(t);
}
}, d.readValue = function() {
var t = C.selectValueMap[r.val()];
return t && !t.disabled ? (d.unselectEmptyOption(), d.removeUnknownOption(), C.getViewValueFromOption(t)) :null;
}, E.trackBy && t.$watch(function() {
return E.getTrackByValue($.$viewValue);
}, function() {
$.$render();
})), w && (e(d.emptyOption)(t), r.prepend(d.emptyOption), d.emptyOption[0].nodeType === ji ? (d.hasEmptyOption = !1, 
d.registerOption = function(t, e) {
"" === e.val() && (d.hasEmptyOption = !0, d.emptyOption = e, d.emptyOption.removeClass("ng-scope"), 
$.$render(), e.on("$destroy", function() {
var t = d.$isEmptyOptionSelected();
d.hasEmptyOption = !1, d.emptyOption = void 0, t && $.$render();
}));
}) :d.emptyOption.removeClass("ng-scope")), t.$watchCollection(E.getWatchables, p);
}
var u = t.document.createElement("option"), c = t.document.createElement("optgroup");
return {
restrict:"A",
terminal:!0,
require:[ "select", "ngModel" ],
link:{
pre:function(t, e, n, r) {
r[0].registerOption = $;
},
post:s
}
};
} ], cs = [ "$locale", "$interpolate", "$log", function(t, e, n) {
var r = /{}/g, i = /^when(Minus)?(.+)$/;
return {
link:function(a, s, u) {
function c(t) {
s.text(t || "");
}
var l, f = u.count, h = u.$attr.when && s.attr(u.$attr.when), p = u.offset || 0, d = a.$eval(h) || {}, v = {}, m = e.startSymbol(), g = e.endSymbol(), b = m + f + "-" + p + g, w = mi.noop;
o(u, function(t, e) {
var n = i.exec(e);
if (n) {
var r = (n[1] ? "-" :"") + ri(n[2]);
d[r] = s.attr(u.$attr[e]);
}
}), o(d, function(t, n) {
v[n] = e(t.replace(r, b));
}), a.$watch(f, function(e) {
var r = parseFloat(e), i = yi(r);
if (i || r in d || (r = t.pluralCat(r - p)), !(r === l || i && yi(l))) {
w();
var o = v[r];
y(o) ? (null != e && n.debug("ngPluralize: no rule defined for '" + r + "' in " + h), 
w = $, c()) :w = a.$watch(o, c), l = r;
}
});
}
};
} ], ls = [ "$parse", "$animate", "$compile", function(t, e, n) {
var a = "$$NG_REMOVED", s = r("ngRepeat"), u = function(t, e, n, r, i, o, a) {
t[n] = r, i && (t[i] = o), t.$index = e, t.$first = 0 === e, t.$last = e === a - 1, 
t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 === (1 & e));
}, c = function(t) {
return t.clone[0];
}, l = function(t) {
return t.clone[t.clone.length - 1];
};
return {
restrict:"A",
multiElement:!0,
transclude:"element",
priority:1e3,
terminal:!0,
$$tlb:!0,
compile:function(r, f) {
var h = f.ngRepeat, p = n.$$createComment("end ngRepeat", h), d = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if (!d) throw s("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", h);
var $ = d[1], v = d[2], m = d[3], g = d[4];
if (d = $.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/), !d) throw s("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", $);
var y = d[3] || d[1], b = d[2];
if (m && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(m) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(m))) throw s("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", m);
var w, x, C, E, S = {
$id:ae
};
return g ? w = t(g) :(C = function(t, e) {
return ae(e);
}, E = function(t) {
return t;
}), function(t, n, r, f, d) {
w && (x = function(e, n, r) {
return b && (S[b] = e), S[y] = n, S.$index = r, w(t, S);
});
var $ = bt();
t.$watchCollection(v, function(r) {
var f, v, g, w, S, k, A, O, M, V, T, N, I = n[0], j = bt();
if (m && (t[m] = r), i(r)) M = r, O = x || C; else {
O = x || E, M = [];
for (var D in r) ni.call(r, D) && "$" !== D.charAt(0) && M.push(D);
}
for (w = M.length, T = new Array(w), f = 0; w > f; f++) if (S = r === M ? f :M[f], 
k = r[S], A = O(S, k, f), $[A]) V = $[A], delete $[A], j[A] = V, T[f] = V; else {
if (j[A]) throw o(T, function(t) {
t && t.scope && ($[t.id] = t);
}), s("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", h, A, k);
T[f] = {
id:A,
scope:void 0,
clone:void 0
}, j[A] = !0;
}
for (var P in $) {
if (V = $[P], N = yt(V.clone), e.leave(N), N[0].parentNode) for (f = 0, v = N.length; v > f; f++) N[f][a] = !0;
V.scope.$destroy();
}
for (f = 0; w > f; f++) if (S = r === M ? f :M[f], k = r[S], V = T[f], V.scope) {
g = I;
do g = g.nextSibling; while (g && g[a]);
c(V) !== g && e.move(yt(V.clone), null, I), I = l(V), u(V.scope, f, y, k, b, S, w);
} else d(function(t, n) {
V.scope = n;
var r = p.cloneNode(!1);
t[t.length++] = r, e.enter(t, null, I), I = r, V.clone = t, j[V.id] = V, u(V.scope, f, y, k, b, S, w);
});
$ = j;
});
};
}
};
} ], fs = "ng-hide", hs = "ng-hide-animate", ps = [ "$animate", function(t) {
return {
restrict:"A",
multiElement:!0,
link:function(e, n, r) {
e.$watch(r.ngShow, function(e) {
t[e ? "removeClass" :"addClass"](n, fs, {
tempClasses:hs
});
});
}
};
} ], ds = [ "$animate", function(t) {
return {
restrict:"A",
multiElement:!0,
link:function(e, n, r) {
e.$watch(r.ngHide, function(e) {
t[e ? "addClass" :"removeClass"](n, fs, {
tempClasses:hs
});
});
}
};
} ], $s = xr(function(t, e, n) {
t.$watch(n.ngStyle, function(t, n) {
n && t !== n && o(n, function(t, n) {
e.css(n, "");
}), t && e.css(t);
}, !0);
}), vs = [ "$animate", "$compile", function(t, e) {
return {
require:"ngSwitch",
controller:[ "$scope", function() {
this.cases = {};
} ],
link:function(n, r, i, a) {
var s = i.ngSwitch || i.on, u = [], c = [], l = [], f = [], h = function(t, e) {
return function(n) {
n !== !1 && t.splice(e, 1);
};
};
n.$watch(s, function(n) {
for (var r, i; l.length; ) t.cancel(l.pop());
for (r = 0, i = f.length; i > r; ++r) {
var s = yt(c[r].clone);
f[r].$destroy();
var p = l[r] = t.leave(s);
p.done(h(l, r));
}
c.length = 0, f.length = 0, (u = a.cases["!" + n] || a.cases["?"]) && o(u, function(n) {
n.transclude(function(r, i) {
f.push(i);
var o = n.element;
r[r.length++] = e.$$createComment("end ngSwitchWhen");
var a = {
clone:r
};
c.push(a), t.enter(r, o.parent(), o);
});
});
});
}
};
} ], ms = xr({
transclude:"element",
priority:1200,
require:"^ngSwitch",
multiElement:!0,
link:function(t, e, n, r, i) {
var a = n.ngSwitchWhen.split(n.ngSwitchWhenSeparator).sort().filter(function(t, e, n) {
return n[e - 1] !== t;
});
o(a, function(t) {
r.cases["!" + t] = r.cases["!" + t] || [], r.cases["!" + t].push({
transclude:i,
element:e
});
});
}
}), gs = xr({
transclude:"element",
priority:1200,
require:"^ngSwitch",
multiElement:!0,
link:function(t, e, n, r, i) {
r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({
transclude:i,
element:e
});
}
}), ys = r("ngTransclude"), bs = [ "$compile", function(t) {
return {
restrict:"EAC",
compile:function(e) {
var n = t(e.contents());
return e.empty(), function(t, e, r, i, o) {
function a(t, n) {
t.length && u(t) ? e.append(t) :(s(), n.$destroy());
}
function s() {
n(t, function(t) {
e.append(t);
});
}
function u(t) {
for (var e = 0, n = t.length; n > e; e++) {
var r = t[e];
if (r.nodeType !== Ii || r.nodeValue.trim()) return !0;
}
}
if (!o) throw ys("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", et(e));
r.ngTransclude === r.$attr.ngTransclude && (r.ngTransclude = "");
var c = r.ngTransclude || r.ngTranscludeSlot;
o(a, null, c), c && !o.isSlotFilled(c) && s();
};
}
};
} ], ws = [ "$templateCache", function(t) {
return {
restrict:"E",
terminal:!0,
compile:function(e, n) {
if ("text/ng-template" === n.type) {
var r = n.id, i = e[0].text;
t.put(r, i);
}
}
};
} ], xs = {
$setViewValue:$,
$render:$
}, Cs = [ "$element", "$scope", function(e, n) {
function r() {
s || (s = !0, n.$$postDigest(function() {
s = !1, o.ngModelCtrl.$render();
}));
}
function i(t) {
u || (u = !0, n.$$postDigest(function() {
n.$$destroyed || (u = !1, o.ngModelCtrl.$setViewValue(o.readValue()), t && o.ngModelCtrl.$render());
}));
}
var o = this, a = new eo();
o.selectValueMap = {}, o.ngModelCtrl = xs, o.multiple = !1, o.unknownOption = ui(t.document.createElement("option")), 
o.hasEmptyOption = !1, o.emptyOption = void 0, o.renderUnknownOption = function(t) {
var n = o.generateUnknownOptionValue(t);
o.unknownOption.val(n), e.prepend(o.unknownOption), Qr(o.unknownOption, !0), e.val(n);
}, o.updateUnknownOption = function(t) {
var n = o.generateUnknownOptionValue(t);
o.unknownOption.val(n), Qr(o.unknownOption, !0), e.val(n);
}, o.generateUnknownOptionValue = function(t) {
return "? " + ae(t) + " ?";
}, o.removeUnknownOption = function() {
o.unknownOption.parent() && o.unknownOption.remove();
}, o.selectEmptyOption = function() {
o.emptyOption && (e.val(""), Qr(o.emptyOption, !0));
}, o.unselectEmptyOption = function() {
o.hasEmptyOption && Qr(o.emptyOption, !1);
}, n.$on("$destroy", function() {
o.renderUnknownOption = $;
}), o.readValue = function() {
var t = e.val(), n = t in o.selectValueMap ? o.selectValueMap[t] :t;
return o.hasOption(n) ? n :null;
}, o.writeValue = function(t) {
var n = e[0].options[e[0].selectedIndex];
if (n && Qr(ui(n), !1), o.hasOption(t)) {
o.removeUnknownOption();
var r = ae(t);
e.val(r in o.selectValueMap ? r :t);
var i = e[0].options[e[0].selectedIndex];
Qr(ui(i), !0);
} else o.selectUnknownOrEmptyOption(t);
}, o.addOption = function(t, e) {
if (e[0].nodeType !== ji) {
mt(t, '"option value"'), "" === t && (o.hasEmptyOption = !0, o.emptyOption = e);
var n = a.get(t) || 0;
a.set(t, n + 1), r();
}
}, o.removeOption = function(t) {
var e = a.get(t);
e && (1 === e ? (a["delete"](t), "" === t && (o.hasEmptyOption = !1, o.emptyOption = void 0)) :a.set(t, e - 1));
}, o.hasOption = function(t) {
return !!a.get(t);
}, o.$hasEmptyOption = function() {
return o.hasEmptyOption;
}, o.$isUnknownOptionSelected = function() {
return e[0].options[0] === o.unknownOption[0];
}, o.$isEmptyOptionSelected = function() {
return o.hasEmptyOption && e[0].options[e[0].selectedIndex] === o.emptyOption[0];
}, o.selectUnknownOrEmptyOption = function(t) {
null == t && o.emptyOption ? (o.removeUnknownOption(), o.selectEmptyOption()) :o.unknownOption.parent().length ? o.updateUnknownOption(t) :o.renderUnknownOption(t);
};
var s = !1, u = !1;
o.registerOption = function(t, e, n, a, s) {
if (n.$attr.ngValue) {
var u, c = NaN;
n.$observe("value", function(t) {
var n, r = e.prop("selected");
b(c) && (o.removeOption(u), delete o.selectValueMap[c], n = !0), c = ae(t), u = t, 
o.selectValueMap[c] = t, o.addOption(t, e), e.attr("value", c), n && r && i();
});
} else a ? n.$observe("value", function(t) {
o.readValue();
var n, r = e.prop("selected");
b(u) && (o.removeOption(u), n = !0), u = t, o.addOption(t, e), n && r && i();
}) :s ? t.$watch(s, function(t, r) {
n.$set("value", t);
var a = e.prop("selected");
r !== t && o.removeOption(r), o.addOption(t, e), r && a && i();
}) :o.addOption(n.value, e);
n.$observe("disabled", function(t) {
("true" === t || t && e.prop("selected")) && (o.multiple ? i(!0) :(o.ngModelCtrl.$setViewValue(null), 
o.ngModelCtrl.$render()));
}), e.on("$destroy", function() {
var t = o.readValue(), e = n.value;
o.removeOption(e), r(), (o.multiple && t && -1 !== t.indexOf(e) || t === e) && i(!0);
});
};
} ], Es = function() {
function t(t, e, n, r) {
var i = r[0], a = r[1];
if (!a) return void (i.registerOption = $);
if (i.ngModelCtrl = a, e.on("change", function() {
i.removeUnknownOption(), t.$apply(function() {
a.$setViewValue(i.readValue());
});
}), n.multiple) {
i.multiple = !0, i.readValue = function() {
var t = [];
return o(e.find("option"), function(e) {
if (e.selected && !e.disabled) {
var n = e.value;
t.push(n in i.selectValueMap ? i.selectValueMap[n] :n);
}
}), t;
}, i.writeValue = function(t) {
o(e.find("option"), function(e) {
var n = !!t && (q(t, e.value) || q(t, i.selectValueMap[e.value])), r = e.selected;
n !== r && Qr(ui(e), n);
});
};
var s, u = NaN;
t.$watch(function() {
u !== a.$viewValue || z(s, a.$viewValue) || (s = Ct(a.$viewValue), a.$render()), 
u = a.$viewValue;
}), a.$isEmpty = function(t) {
return !t || 0 === t.length;
};
}
}
function e(t, e, n, r) {
var i = r[1];
if (i) {
var o = r[0];
i.$render = function() {
o.writeValue(i.$viewValue);
};
}
}
return {
restrict:"E",
require:[ "select", "?ngModel" ],
controller:Cs,
priority:1,
link:{
pre:t,
post:e
}
};
}, Ss = [ "$interpolate", function(t) {
return {
restrict:"E",
priority:100,
compile:function(e, n) {
var r, i;
return b(n.ngValue) || (b(n.value) ? r = t(n.value, !0) :(i = t(e.text(), !0), i || n.$set("value", e.text()))), 
function(t, e, n) {
var o = "$selectController", a = e.parent(), s = a.data(o) || a.parent().data(o);
s && s.registerOption(t, e, n, r, i);
};
}
};
} ], ks = function() {
return {
restrict:"A",
require:"?ngModel",
link:function(t, e, n, r) {
r && (n.required = !0, r.$validators.required = function(t, e) {
return !n.required || !r.$isEmpty(e);
}, n.$observe("required", function() {
r.$validate();
}));
}
};
}, As = function() {
return {
restrict:"A",
require:"?ngModel",
link:function(t, e, n, i) {
if (i) {
var o, a = n.ngPattern || n.pattern;
n.$observe("pattern", function(t) {
if (C(t) && t.length > 0 && (t = new RegExp("^" + t + "$")), t && !t.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", a, t, et(e));
o = t || void 0, i.$validate();
}), i.$validators.pattern = function(t, e) {
return i.$isEmpty(e) || y(o) || o.test(e);
};
}
}
};
}, Os = function() {
return {
restrict:"A",
require:"?ngModel",
link:function(t, e, n, r) {
if (r) {
var i = -1;
n.$observe("maxlength", function(t) {
var e = p(t);
i = yi(e) ? -1 :e, r.$validate();
}), r.$validators.maxlength = function(t, e) {
return 0 > i || r.$isEmpty(e) || e.length <= i;
};
}
}
};
}, Ms = function() {
return {
restrict:"A",
require:"?ngModel",
link:function(t, e, n, r) {
if (r) {
var i = 0;
n.$observe("minlength", function(t) {
i = p(t) || 0, r.$validate();
}), r.$validators.minlength = function(t, e) {
return r.$isEmpty(e) || e.length >= i;
};
}
}
};
};
return t.angular.bootstrap ? void (t.console && console.log("WARNING: Tried to load AngularJS more than once.")) :(dt(), 
kt(mi), mi.module("ngLocale", [], [ "$provide", function(t) {
function e(t) {
t += "";
var e = t.indexOf(".");
return -1 == e ? 0 :t.length - e - 1;
}
function n(t, n) {
var r = n;
void 0 === r && (r = Math.min(e(t), 3));
var i = Math.pow(10, r), o = (t * i | 0) % i;
return {
v:r,
f:o
};
}
var r = {
ZERO:"zero",
ONE:"one",
TWO:"two",
FEW:"few",
MANY:"many",
OTHER:"other"
};
t.value("$locale", {
DATETIME_FORMATS:{
AMPMS:[ "AM", "PM" ],
DAY:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
ERANAMES:[ "Before Christ", "Anno Domini" ],
ERAS:[ "BC", "AD" ],
FIRSTDAYOFWEEK:6,
MONTH:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
SHORTDAY:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
SHORTMONTH:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
STANDALONEMONTH:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
WEEKENDRANGE:[ 5, 6 ],
fullDate:"EEEE, MMMM d, y",
longDate:"MMMM d, y",
medium:"MMM d, y h:mm:ss a",
mediumDate:"MMM d, y",
mediumTime:"h:mm:ss a",
"short":"M/d/yy h:mm a",
shortDate:"M/d/yy",
shortTime:"h:mm a"
},
NUMBER_FORMATS:{
CURRENCY_SYM:"$",
DECIMAL_SEP:".",
GROUP_SEP:",",
PATTERNS:[ {
gSize:3,
lgSize:3,
maxFrac:3,
minFrac:0,
minInt:1,
negPre:"-",
negSuf:"",
posPre:"",
posSuf:""
}, {
gSize:3,
lgSize:3,
maxFrac:2,
minFrac:2,
minInt:1,
negPre:"-¤",
negSuf:"",
posPre:"¤",
posSuf:""
} ]
},
id:"en-us",
localeID:"en_US",
pluralCat:function(t, e) {
var i = 0 | t, o = n(t, e);
return 1 == i && 0 == o.v ? r.ONE :r.OTHER;
}
});
} ]), void ui(function() {
ct(t.document, lt);
}));
}(window), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
!function(e, r) {
"use strict";
function t(e, r) {
if (u(e)) {
r = r || [];
for (var t = 0, n = e.length; n > t; t++) r[t] = e[t];
} else if (s(e)) {
r = r || {};
for (var a in e) ("$" !== a.charAt(0) || "$" !== a.charAt(1)) && (r[a] = e[a]);
}
return r || e;
}
function n() {
function e(e, t) {
return r.extend(Object.create(e), t);
}
function n(e, r) {
var t = r.caseInsensitiveMatch, n = {
originalPath:e,
regexp:e
}, a = n.keys = [];
return e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)(\*\?|[?*])?/g, function(e, r, t, n) {
var i = "?" === n || "*?" === n ? "?" :null, o = "*" === n || "*?" === n ? "*" :null;
return a.push({
name:t,
optional:!!i
}), r = r || "", "" + (i ? "" :r) + "(?:" + (i ? r :"") + (o && "(.+?)" || "([^/]+)") + (i || "") + ")" + (i || "");
}).replace(/([\/$*])/g, "\\$1"), n.regexp = new RegExp("^" + e + "$", t ? "i" :""), 
n;
}
u = r.isArray, s = r.isObject, l = r.isDefined, f = r.noop;
var a = {};
this.when = function(e, i) {
var o = t(i);
if (r.isUndefined(o.reloadOnSearch) && (o.reloadOnSearch = !0), r.isUndefined(o.caseInsensitiveMatch) && (o.caseInsensitiveMatch = this.caseInsensitiveMatch), 
a[e] = r.extend(o, e && n(e, o)), e) {
var c = "/" === e[e.length - 1] ? e.substr(0, e.length - 1) :e + "/";
a[c] = r.extend({
redirectTo:e
}, n(c, o));
}
return this;
}, this.caseInsensitiveMatch = !1, this.otherwise = function(e) {
return "string" == typeof e && (e = {
redirectTo:e
}), this.when(null, e), this;
}, h = !0, this.eagerInstantiationEnabled = function(e) {
return l(e) ? (h = e, this) :h;
}, this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", "$browser", function(t, n, i, o, c, u, s, l) {
function h(e, r) {
var t = r.keys, n = {};
if (!r.regexp) return null;
var a = r.regexp.exec(e);
if (!a) return null;
for (var i = 1, o = a.length; o > i; ++i) {
var c = t[i - 1], u = a[i];
c && u && (n[c.name] = u);
}
return n;
}
function d(e) {
var n = y.current;
R = C(), x = R && n && R.$$route === n.$$route && r.equals(R.pathParams, n.pathParams) && !R.reloadOnSearch && !S, 
x || !n && !R || t.$broadcast("$routeChangeStart", R, n).defaultPrevented && e && e.preventDefault();
}
function p() {
var e = y.current, n = R;
if (x) e.params = n.params, r.copy(e.params, i), t.$broadcast("$routeUpdate", e); else if (n || e) {
S = !1, y.current = n;
var a = o.resolve(n);
l.$$incOutstandingRequestCount(), a.then(v).then(g).then(function(o) {
return o && a.then(m).then(function(a) {
n === y.current && (n && (n.locals = a, r.copy(n.params, i)), t.$broadcast("$routeChangeSuccess", n, e));
});
})["catch"](function(r) {
n === y.current && t.$broadcast("$routeChangeError", n, e, r);
})["finally"](function() {
l.$$completeOutstandingRequest(f);
});
}
}
function v(e) {
var t = {
route:e,
hasRedirection:!1
};
if (e) if (e.redirectTo) if (r.isString(e.redirectTo)) t.path = P(e.redirectTo, e.params), 
t.search = e.params, t.hasRedirection = !0; else {
var a = n.path(), i = n.search(), u = e.redirectTo(e.pathParams, a, i);
r.isDefined(u) && (t.url = u, t.hasRedirection = !0);
} else if (e.resolveRedirectTo) return o.resolve(c.invoke(e.resolveRedirectTo)).then(function(e) {
return r.isDefined(e) && (t.url = e, t.hasRedirection = !0), t;
});
return t;
}
function g(e) {
var r = !0;
if (e.route !== y.current) r = !1; else if (e.hasRedirection) {
var t = n.url(), a = e.url;
a ? n.url(a).replace() :a = n.path(e.path).search(e.search).replace().url(), a !== t && (r = !1);
}
return r;
}
function m(e) {
if (e) {
var t = r.extend({}, e.resolve);
r.forEach(t, function(e, n) {
t[n] = r.isString(e) ? c.get(e) :c.invoke(e, null, null, n);
});
var n = w(e);
return r.isDefined(n) && (t.$template = n), o.all(t);
}
}
function w(e) {
var t, n;
return r.isDefined(t = e.template) ? r.isFunction(t) && (t = t(e.params)) :r.isDefined(n = e.templateUrl) && (r.isFunction(n) && (n = n(e.params)), 
r.isDefined(n) && (e.loadedTemplateUrl = s.valueOf(n), t = u(n))), t;
}
function C() {
var t, i;
return r.forEach(a, function(a, o) {
!i && (t = h(n.path(), a)) && (i = e(a, {
params:r.extend({}, n.search(), t),
pathParams:t
}), i.$$route = a);
}), i || a[null] && e(a[null], {
params:{},
pathParams:{}
});
}
function P(e, t) {
var n = [];
return r.forEach((e || "").split(":"), function(e, r) {
if (0 === r) n.push(e); else {
var a = e.match(/(\w+)(?:[?*])?(.*)/), i = a[1];
n.push(t[i]), n.push(a[2] || ""), delete t[i];
}
}), n.join("");
}
var R, x, S = !1, y = {
routes:a,
reload:function() {
S = !0;
var e = {
defaultPrevented:!1,
preventDefault:function() {
this.defaultPrevented = !0, S = !1;
}
};
t.$evalAsync(function() {
d(e), e.defaultPrevented || p();
});
},
updateParams:function(e) {
if (!this.current || !this.current.$$route) throw $("norout", "Tried updating route when with no current route");
e = r.extend({}, this.current.params, e), n.path(P(this.current.$$route.originalPath, e)), 
n.search(e);
}
};
return t.$on("$locationChangeStart", d), t.$on("$locationChangeSuccess", p), y;
} ];
}
function a(e) {
h && e.get("$route");
}
function i() {
this.$get = function() {
return {};
};
}
function o(e, t, n) {
return {
restrict:"ECA",
terminal:!0,
priority:400,
transclude:"element",
link:function(a, i, o, c, u) {
function s() {
d && (n.cancel(d), d = null), f && (f.$destroy(), f = null), h && (d = n.leave(h), 
d.done(function(e) {
e !== !1 && (d = null);
}), h = null);
}
function l() {
var o = e.current && e.current.locals, c = o && o.$template;
if (r.isDefined(c)) {
var l = a.$new(), d = e.current, v = u(l, function(e) {
n.enter(e, null, h || i).done(function(e) {
e === !1 || !r.isDefined($) || $ && !a.$eval($) || t();
}), s();
});
h = v, f = d.scope = l, f.$emit("$viewContentLoaded"), f.$eval(p);
} else s();
}
var f, h, d, $ = o.autoscroll, p = o.onload || "";
a.$on("$routeChangeSuccess", l), l();
}
};
}
function c(e, r, t) {
return {
restrict:"ECA",
priority:-400,
link:function(n, a) {
var i = t.current, o = i.locals;
a.html(o.$template);
var c = e(a.contents());
if (i.controller) {
o.$scope = n;
var u = r(i.controller, o);
i.controllerAs && (n[i.controllerAs] = u), a.data("$ngControllerController", u), 
a.children().data("$ngControllerController", u);
}
n[i.resolveAs || "$resolve"] = o, c(n);
}
};
}
var u, s, l, f, h, d = r.module("ngRoute", []).info({
angularVersion:"1.6.9"
}).provider("$route", n).run(a), $ = r.$$minErr("ngRoute");
a.$inject = [ "$injector" ], d.provider("$routeParams", i), d.directive("ngView", o), 
d.directive("ngView", c), o.$inject = [ "$route", "$anchorScroll", "$animate" ], 
c.$inject = [ "$compile", "$controller", "$route" ];
}(window, window.angular);
!function(n, t) {
"use strict";
function e(n, t, e) {
if (!n) throw hn("areq", "Argument '{0}' is {1}", t || "?", e || "required");
return n;
}
function a(n, t) {
return n || t ? n ? t ? (G(n) && (n = n.join(" ")), G(t) && (t = t.join(" ")), n + " " + t) :n :t :"";
}
function r(n) {
var t = {};
return n && (n.to || n.from) && (t.to = n.to, t.from = n.from), t;
}
function i(n, t, e) {
var a = "";
return n = G(n) ? n :n && nn(n) && n.length ? n.split(/\s+/) :[], z(n, function(n, r) {
n && n.length > 0 && (a += r > 0 ? " " :"", a += e ? t + n :n + t);
}), a;
}
function o(n, t) {
var e = n.indexOf(t);
t >= 0 && n.splice(e, 1);
}
function s(n) {
if (n instanceof en) switch (n.length) {
case 0:
return n;

case 1:
if (n[0].nodeType === R) return n;
break;

default:
return en(u(n));
}
return n.nodeType === R ? en(n) :void 0;
}
function u(n) {
if (!n[0]) return n;
for (var t = 0; t < n.length; t++) {
var e = n[t];
if (e.nodeType === R) return e;
}
}
function l(n, t, e) {
z(t, function(t) {
n.addClass(t, e);
});
}
function c(n, t, e) {
z(t, function(t) {
n.removeClass(t, e);
});
}
function f(n) {
return function(t, e) {
e.addClass && (l(n, t, e.addClass), e.addClass = null), e.removeClass && (c(n, t, e.removeClass), 
e.removeClass = null);
};
}
function m(n) {
if (n = n || {}, !n.$$prepared) {
var t = n.domOperation || an;
n.domOperation = function() {
n.$$domOperationFired = !0, t(), t = an;
}, n.$$prepared = !0;
}
return n;
}
function d(n, t) {
v(n, t), p(n, t);
}
function v(n, t) {
t.from && (n.css(t.from), t.from = null);
}
function p(n, t) {
t.to && (n.css(t.to), t.to = null);
}
function h(n, t, e) {
var a = t.options || {}, r = e.options || {}, i = (a.addClass || "") + " " + (r.addClass || ""), o = (a.removeClass || "") + " " + (r.removeClass || ""), s = g(n.attr("class"), i, o);
r.preparationClasses && (a.preparationClasses = k(r.preparationClasses, a.preparationClasses), 
delete r.preparationClasses);
var u = a.domOperation !== an ? a.domOperation :null;
return W(a, r), u && (a.domOperation = u), s.addClass ? a.addClass = s.addClass :a.addClass = null, 
s.removeClass ? a.removeClass = s.removeClass :a.removeClass = null, t.addClass = a.addClass, 
t.removeClass = a.removeClass, a;
}
function g(n, t, e) {
function a(n) {
nn(n) && (n = n.split(" "));
var t = {};
return z(n, function(n) {
n.length && (t[n] = !0);
}), t;
}
var r = 1, i = -1, o = {};
n = a(n), t = a(t), z(t, function(n, t) {
o[t] = r;
}), e = a(e), z(e, function(n, t) {
o[t] = o[t] === r ? null :i;
});
var s = {
addClass:"",
removeClass:""
};
return z(o, function(t, e) {
var a, o;
t === r ? (a = "addClass", o = !n[e] || n[e + L]) :t === i && (a = "removeClass", 
o = n[e] || n[e + q]), o && (s[a].length && (s[a] += " "), s[a] += e);
}), s;
}
function $(n) {
return n instanceof en ? n[0] :n;
}
function C(n, t, e) {
var a = "";
t && (a = i(t, H, !0)), e.addClass && (a = k(a, i(e.addClass, q))), e.removeClass && (a = k(a, i(e.removeClass, L))), 
a.length && (e.preparationClasses = a, n.addClass(a));
}
function y(n, t) {
t.preparationClasses && (n.removeClass(t.preparationClasses), t.preparationClasses = null), 
t.activeClasses && (n.removeClass(t.activeClasses), t.activeClasses = null);
}
function D(n, t) {
var e = t ? "-" + t + "s" :"";
return A(n, [ vn, e ]), [ vn, e ];
}
function b(n, t) {
var e = t ? "paused" :"", a = E + cn;
return A(n, [ a, e ]), [ a, e ];
}
function A(n, t) {
var e = t[0], a = t[1];
n.style[e] = a;
}
function k(n, t) {
return n ? t ? n + " " + t :n :t;
}
function w(n) {
return [ dn, n + "s" ];
}
function T(n, t) {
var e = t ? mn :vn;
return [ e, n + "s" ];
}
function S(n, t, e) {
var a = Object.create(null), r = n.getComputedStyle(t) || {};
return z(e, function(n, t) {
var e = r[n];
if (e) {
var i = e.charAt(0);
("-" === i || "+" === i || i >= 0) && (e = j(e)), 0 === e && (e = null), a[t] = e;
}
}), a;
}
function j(n) {
var t = 0, e = n.split(/\s*,\s*/);
return z(e, function(n) {
"s" === n.charAt(n.length - 1) && (n = n.substring(0, n.length - 1)), n = parseFloat(n) || 0, 
t = t ? Math.max(n, t) :n;
}), t;
}
function x(n) {
return 0 === n || null != n;
}
function O(n, t) {
var e = F, a = n + "s";
return t ? e += rn :a += " linear all", [ e, a ];
}
function P() {
var n = Object.create(null);
return {
flush:function() {
n = Object.create(null);
},
count:function(t) {
var e = n[t];
return e ? e.total :0;
},
get:function(t) {
var e = n[t];
return e && e.value;
},
put:function(t, e) {
n[t] ? n[t].total++ :n[t] = {
total:1,
value:e
};
}
};
}
function N(n, t, e) {
z(e, function(e) {
n[e] = X(n[e]) ? n[e] :t.style.getPropertyValue(e);
});
}
var F, M, E, I, R = 1, q = "-add", L = "-remove", H = "ng-", B = "-active", J = "-prepare", K = "ng-animate", Q = "$$ngAnimateChildren", U = "";
void 0 === n.ontransitionend && void 0 !== n.onwebkittransitionend ? (U = "-webkit-", 
F = "WebkitTransition", M = "webkitTransitionEnd transitionend") :(F = "transition", 
M = "transitionend"), void 0 === n.onanimationend && void 0 !== n.onwebkitanimationend ? (U = "-webkit-", 
E = "WebkitAnimation", I = "webkitAnimationEnd animationend") :(E = "animation", 
I = "animationend");
var V, W, z, G, X, Y, Z, _, nn, tn, en, an, rn = "Duration", on = "Property", sn = "Delay", un = "TimingFunction", ln = "IterationCount", cn = "PlayState", fn = 9999, mn = E + sn, dn = E + rn, vn = F + sn, pn = F + rn, hn = t.$$minErr("ng"), gn = [ "$$rAF", function(n) {
function t(n) {
a = a.concat(n), e();
}
function e() {
if (a.length) {
for (var t = a.shift(), i = 0; i < t.length; i++) t[i]();
r || n(function() {
r || e();
});
}
}
var a, r;
return a = t.queue = [], t.waitUntilQuiet = function(t) {
r && r(), r = n(function() {
r = null, t(), e();
});
}, t;
} ], $n = [ "$interpolate", function(n) {
return {
link:function(t, e, a) {
function r(n) {
n = "on" === n || "true" === n, e.data(Q, n);
}
var i = a.ngAnimateChildren;
nn(i) && 0 === i.length ? e.data(Q, !0) :(r(n(i)(t)), a.$observe("ngAnimateChildren", r));
}
};
} ], Cn = "$$animateCss", yn = 1e3, Dn = 3, bn = 1.5, An = {
transitionDuration:pn,
transitionDelay:vn,
transitionProperty:F + on,
animationDuration:dn,
animationDelay:mn,
animationIterationCount:E + ln
}, kn = {
transitionDuration:pn,
transitionDelay:vn,
animationDuration:dn,
animationDelay:mn
}, wn = [ "$animateProvider", function(n) {
var t = P(), e = P();
this.$get = [ "$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$$animateQueue", function(n, a, s, u, l, c, h, g) {
function C(n, t) {
var e = "$$ngAnimateParentKey", a = n.parentNode, r = a[e] || (a[e] = ++J);
return r + "-" + n.getAttribute("class") + "-" + t;
}
function y(e, a, r, i) {
var o = t.get(r);
return o || (o = S(n, e, i), "infinite" === o.animationIterationCount && (o.animationIterationCount = 1)), 
t.put(r, o), o;
}
function k(r, o, s, u) {
var l;
if (t.count(s) > 0 && (l = e.get(s), !l)) {
var c = i(o, "-stagger");
a.addClass(r, c), l = S(n, r, u), l.animationDuration = Math.max(l.animationDuration, 0), 
l.transitionDuration = Math.max(l.transitionDuration, 0), a.removeClass(r, c), e.put(s, l);
}
return l || {};
}
function j(n) {
K.push(n), h.waitUntilQuiet(function() {
t.flush(), e.flush();
for (var n = l(), a = 0; a < K.length; a++) K[a](n);
K.length = 0;
});
}
function P(n, t, e) {
var a = y(n, t, e, An), r = a.animationDelay, i = a.transitionDelay;
return a.maxDelay = r && i ? Math.max(r, i) :r || i, a.maxDuration = Math.max(a.animationDuration * a.animationIterationCount, a.transitionDuration), 
a;
}
var R = f(a), J = 0, K = [];
return function(n, e) {
function l() {
h();
}
function f() {
h(!0);
}
function h(t) {
if (!(X || Z && Y)) {
X = !0, Y = !1, Q.$$skipPreparationClasses || a.removeClass(n, An), a.removeClass(n, Tn), 
b(W, !1), D(W, !1), z(cn, function(n) {
W.style[n[0]] = "";
}), R(n, Q), d(n, Q), Object.keys(U).length && z(U, function(n, t) {
n ? W.style.setProperty(t, n) :W.style.removeProperty(t);
}), Q.onDone && Q.onDone(), vn && vn.length && n.off(vn.join(" "), J);
var e = n.data(Cn);
e && (u.cancel(e[0].timer), n.removeData(Cn)), _ && _.complete(!t);
}
}
function y(n) {
Hn.blockTransition && D(W, n), Hn.blockKeyframeAnimation && b(W, !!n);
}
function S() {
return _ = new s({
end:l,
cancel:f
}), j(an), h(), {
$$willAnimate:!1,
start:function() {
return _;
},
end:l
};
}
function J(n) {
n.stopPropagation();
var t = n.originalEvent || n;
if (t.target === W) {
var e = t.$manualTimeStamp || Date.now(), a = parseFloat(t.elapsedTime.toFixed(Dn));
Math.max(e - ln, 0) >= en && a >= rn && (Z = !0, h());
}
}
function K() {
function t() {
if (!X) {
if (y(!1), z(cn, function(n) {
var t = n[0], e = n[1];
W.style[t] = e;
}), R(n, Q), a.addClass(n, Tn), Hn.recalculateTimingStyles) {
if (wn = W.getAttribute("class") + " " + An, xn = C(W, wn), qn = P(W, wn, xn), Ln = qn.maxDelay, 
tn = Math.max(Ln, 0), rn = qn.maxDuration, 0 === rn) return void h();
Hn.hasTransitions = qn.transitionDuration > 0, Hn.hasAnimations = qn.animationDuration > 0;
}
if (Hn.applyAnimationDelay && (Ln = "boolean" != typeof Q.delay && x(Q.delay) ? parseFloat(Q.delay) :Ln, 
tn = Math.max(Ln, 0), qn.animationDelay = Ln, Bn = T(Ln, !0), cn.push(Bn), W.style[Bn[0]] = Bn[1]), 
en = tn * yn, sn = rn * yn, Q.easing) {
var t, r = Q.easing;
Hn.hasTransitions && (t = F + un, cn.push([ t, r ]), W.style[t] = r), Hn.hasAnimations && (t = E + un, 
cn.push([ t, r ]), W.style[t] = r);
}
qn.transitionDuration && vn.push(M), qn.animationDuration && vn.push(I), ln = Date.now();
var i = en + bn * sn, o = ln + i, s = n.data(Cn) || [], l = !0;
if (s.length) {
var c = s[0];
l = o > c.expectedEndTime, l ? u.cancel(c.timer) :s.push(h);
}
if (l) {
var f = u(e, i, !1);
s[0] = {
timer:f,
expectedEndTime:o
}, s.push(h), n.data(Cn, s);
}
vn.length && n.on(vn.join(" "), J), Q.to && (Q.cleanupStyles && N(U, W, Object.keys(Q.to)), 
p(n, Q));
}
}
function e() {
var t = n.data(Cn);
if (t) {
for (var e = 1; e < t.length; e++) t[e]();
n.removeData(Cn);
}
}
if (!X) {
if (!W.parentNode) return void h();
var r = function(n) {
if (Z) Y && n && (Y = !1, h()); else if (Y = !n, qn.animationDuration) {
var t = b(W, Y);
Y ? cn.push(t) :o(cn, t);
}
}, i = In > 0 && (qn.transitionDuration && 0 === On.transitionDuration || qn.animationDuration && 0 === On.animationDuration) && Math.max(On.animationDelay, On.transitionDelay);
i ? u(t, Math.floor(i * In * yn), !1) :t(), nn.resume = function() {
r(!0);
}, nn.pause = function() {
r(!1);
};
}
}
var Q = e || {};
Q.$$prepared || (Q = m(V(Q)));
var U = {}, W = $(n);
if (!W || !W.parentNode || !g.enabled()) return S();
var X, Y, Z, _, nn, tn, en, rn, sn, ln, cn = [], mn = n.attr("class"), dn = r(Q), vn = [];
if (0 === Q.duration || !c.animations && !c.transitions) return S();
var pn = Q.event && G(Q.event) ? Q.event.join(" ") :Q.event, hn = pn && Q.structural, gn = "", $n = "";
hn ? gn = i(pn, H, !0) :pn && (gn = pn), Q.addClass && ($n += i(Q.addClass, q)), 
Q.removeClass && ($n.length && ($n += " "), $n += i(Q.removeClass, L)), Q.applyClassesEarly && $n.length && R(n, Q);
var An = [ gn, $n ].join(" ").trim(), wn = mn + " " + An, Tn = i(An, B), Sn = dn.to && Object.keys(dn.to).length > 0, jn = (Q.keyframeStyle || "").length > 0;
if (!jn && !Sn && !An) return S();
var xn, On;
if (Q.stagger > 0) {
var Pn = parseFloat(Q.stagger);
On = {
transitionDelay:Pn,
animationDelay:Pn,
transitionDuration:0,
animationDuration:0
};
} else xn = C(W, wn), On = k(W, An, xn, kn);
Q.$$skipPreparationClasses || a.addClass(n, An);
var Nn;
if (Q.transitionStyle) {
var Fn = [ F, Q.transitionStyle ];
A(W, Fn), cn.push(Fn);
}
if (Q.duration >= 0) {
Nn = W.style[F].length > 0;
var Mn = O(Q.duration, Nn);
A(W, Mn), cn.push(Mn);
}
if (Q.keyframeStyle) {
var En = [ E, Q.keyframeStyle ];
A(W, En), cn.push(En);
}
var In = On ? Q.staggerIndex >= 0 ? Q.staggerIndex :t.count(xn) :0, Rn = 0 === In;
Rn && !Q.skipBlocking && D(W, fn);
var qn = P(W, wn, xn), Ln = qn.maxDelay;
tn = Math.max(Ln, 0), rn = qn.maxDuration;
var Hn = {};
if (Hn.hasTransitions = qn.transitionDuration > 0, Hn.hasAnimations = qn.animationDuration > 0, 
Hn.hasTransitionAll = Hn.hasTransitions && "all" === qn.transitionProperty, Hn.applyTransitionDuration = Sn && (Hn.hasTransitions && !Hn.hasTransitionAll || Hn.hasAnimations && !Hn.hasTransitions), 
Hn.applyAnimationDuration = Q.duration && Hn.hasAnimations, Hn.applyTransitionDelay = x(Q.delay) && (Hn.applyTransitionDuration || Hn.hasTransitions), 
Hn.applyAnimationDelay = x(Q.delay) && Hn.hasAnimations, Hn.recalculateTimingStyles = $n.length > 0, 
(Hn.applyTransitionDuration || Hn.applyAnimationDuration) && (rn = Q.duration ? parseFloat(Q.duration) :rn, 
Hn.applyTransitionDuration && (Hn.hasTransitions = !0, qn.transitionDuration = rn, 
Nn = W.style[F + on].length > 0, cn.push(O(rn, Nn))), Hn.applyAnimationDuration && (Hn.hasAnimations = !0, 
qn.animationDuration = rn, cn.push(w(rn)))), 0 === rn && !Hn.recalculateTimingStyles) return S();
if (null != Q.delay) {
var Bn;
"boolean" != typeof Q.delay && (Bn = parseFloat(Q.delay), tn = Math.max(Bn, 0)), 
Hn.applyTransitionDelay && cn.push(T(Bn)), Hn.applyAnimationDelay && cn.push(T(Bn, !0));
}
return null == Q.duration && qn.transitionDuration > 0 && (Hn.recalculateTimingStyles = Hn.recalculateTimingStyles || Rn), 
en = tn * yn, sn = rn * yn, Q.skipBlocking || (Hn.blockTransition = qn.transitionDuration > 0, 
Hn.blockKeyframeAnimation = qn.animationDuration > 0 && On.animationDelay > 0 && 0 === On.animationDuration), 
Q.from && (Q.cleanupStyles && N(U, W, Object.keys(Q.from)), v(n, Q)), Hn.blockTransition || Hn.blockKeyframeAnimation ? y(rn) :Q.skipBlocking || D(W, !1), 
{
$$willAnimate:!0,
end:l,
start:function() {
return X ? void 0 :(nn = {
end:l,
cancel:f,
resume:null,
pause:null
}, _ = new s(nn), j(K), _);
}
};
};
} ];
} ], Tn = [ "$$animationProvider", function(n) {
function t(n) {
return n.parentNode && 11 === n.parentNode.nodeType;
}
n.drivers.push("$$animateCssDriver");
var e = "ng-animate-shim", a = "ng-anchor", r = "ng-anchor-out", i = "ng-anchor-in";
this.$get = [ "$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$sniffer", "$$jqLite", "$document", function(n, o, s, u, l, c, f) {
function m(n) {
return n.replace(/\bng-\S+\b/g, "");
}
function d(n, t) {
return nn(n) && (n = n.split(" ")), nn(t) && (t = t.split(" ")), n.filter(function(n) {
return -1 === t.indexOf(n);
}).join(" ");
}
function v(t, o, u) {
function l(n) {
var t = {}, e = $(n).getBoundingClientRect();
return z([ "width", "height", "top", "left" ], function(n) {
var a = e[n];
switch (n) {
case "top":
a += g.scrollTop;
break;

case "left":
a += g.scrollLeft;
}
t[n] = Math.floor(a) + "px";
}), t;
}
function c() {
var t = n(h, {
addClass:r,
delay:!0,
from:l(o)
});
return t.$$willAnimate ? t :null;
}
function f(n) {
return n.attr("class") || "";
}
function v() {
var t = m(f(u)), e = d(t, C), a = d(C, t), o = n(h, {
to:l(u),
addClass:i + " " + e,
removeClass:r + " " + a,
delay:!0
});
return o.$$willAnimate ? o :null;
}
function p() {
h.remove(), o.removeClass(e), u.removeClass(e);
}
var h = en($(o).cloneNode(!0)), C = m(f(h));
o.addClass(e), u.addClass(e), h.addClass(a), y.append(h);
var D, b = c();
if (!b && (D = v(), !D)) return p();
var A = b || D;
return {
start:function() {
function n() {
e && e.end();
}
var t, e = A.start();
return e.done(function() {
return e = null, !D && (D = v()) ? (e = D.start(), e.done(function() {
e = null, p(), t.complete();
}), e) :(p(), void t.complete());
}), t = new s({
end:n,
cancel:n
});
}
};
}
function p(n, t, e, a) {
var r = h(n, an), i = h(t, an), o = [];
return z(a, function(n) {
var t = n.out, a = n["in"], r = v(e, t, a);
r && o.push(r);
}), r || i || 0 !== o.length ? {
start:function() {
function n() {
z(t, function(n) {
n.end();
});
}
var t = [];
r && t.push(r.start()), i && t.push(i.start()), z(o, function(n) {
t.push(n.start());
});
var e = new s({
end:n,
cancel:n
});
return s.all(t, function(n) {
e.complete(n);
}), e;
}
} :void 0;
}
function h(t) {
var e = t.element, a = t.options || {};
t.structural && (a.event = t.event, a.structural = !0, a.applyClassesEarly = !0, 
"leave" === t.event && (a.onDone = a.domOperation)), a.preparationClasses && (a.event = k(a.event, a.preparationClasses));
var r = n(e, a);
return r.$$willAnimate ? r :null;
}
if (!l.animations && !l.transitions) return an;
var g = f[0].body, C = $(u), y = en(t(C) || g.contains(C) ? C :g);
return function(n) {
return n.from && n.to ? p(n.from, n.to, n.classes, n.anchors) :h(n);
};
} ];
} ], Sn = [ "$animateProvider", function(n) {
this.$get = [ "$injector", "$$AnimateRunner", "$$jqLite", function(t, e, a) {
function r(e) {
e = G(e) ? e :e.split(" ");
for (var a = [], r = {}, i = 0; i < e.length; i++) {
var o = e[i], s = n.$$registeredAnimations[o];
s && !r[o] && (a.push(t.get(s)), r[o] = !0);
}
return a;
}
var i = f(a);
return function(n, t, a, o) {
function s() {
o.domOperation(), i(n, o);
}
function u() {
v = !0, s(), d(n, o);
}
function l(n, t, a, r, i) {
var o;
switch (a) {
case "animate":
o = [ t, r.from, r.to, i ];
break;

case "setClass":
o = [ t, g, $, i ];
break;

case "addClass":
o = [ t, g, i ];
break;

case "removeClass":
o = [ t, $, i ];
break;

default:
o = [ t, i ];
}
o.push(r);
var s = n.apply(n, o);
if (s) if (Z(s.start) && (s = s.start()), s instanceof e) s.done(i); else if (Z(s)) return s;
return an;
}
function c(n, t, a, r, i) {
var o = [];
return z(r, function(r) {
var s = r[i];
s && o.push(function() {
var r, i, o = !1, u = function(n) {
o || (o = !0, (i || an)(n), r.complete(!n));
};
return r = new e({
end:function() {
u();
},
cancel:function() {
u(!0);
}
}), i = l(s, n, t, a, function(n) {
var t = n === !1;
u(t);
}), r;
});
}), o;
}
function f(n, t, a, r, i) {
var o = c(n, t, a, r, i);
if (0 === o.length) {
var s, u;
"beforeSetClass" === i ? (s = c(n, "removeClass", a, r, "beforeRemoveClass"), u = c(n, "addClass", a, r, "beforeAddClass")) :"setClass" === i && (s = c(n, "removeClass", a, r, "removeClass"), 
u = c(n, "addClass", a, r, "addClass")), s && (o = o.concat(s)), u && (o = o.concat(u));
}
if (0 !== o.length) return function(n) {
var t = [];
return o.length && z(o, function(n) {
t.push(n());
}), t.length ? e.all(t, n) :n(), function(n) {
z(t, function(t) {
n ? t.cancel() :t.end();
});
};
};
}
var v = !1;
3 === arguments.length && _(a) && (o = a, a = null), o = m(o), a || (a = n.attr("class") || "", 
o.addClass && (a += " " + o.addClass), o.removeClass && (a += " " + o.removeClass));
var p, h, g = o.addClass, $ = o.removeClass, C = r(a);
if (C.length) {
var y, D;
"leave" === t ? (D = "leave", y = "afterLeave") :(D = "before" + t.charAt(0).toUpperCase() + t.substr(1), 
y = t), "enter" !== t && "move" !== t && (p = f(n, t, o, C, D)), h = f(n, t, o, C, y);
}
if (p || h) {
var b;
return {
$$willAnimate:!0,
end:function() {
return b ? b.end() :(u(), b = new e(), b.complete(!0)), b;
},
start:function() {
function n(n) {
u(n), b.complete(n);
}
function t(t) {
v || ((a || an)(t), n(t));
}
if (b) return b;
b = new e();
var a, r = [];
return p && r.push(function(n) {
a = p(n);
}), r.length ? r.push(function(n) {
s(), n(!0);
}) :s(), h && r.push(function(n) {
a = h(n);
}), b.setHost({
end:function() {
t();
},
cancel:function() {
t(!0);
}
}), e.chain(r, n), b;
}
};
}
};
} ];
} ], jn = [ "$$animationProvider", function(n) {
n.drivers.push("$$animateJsDriver"), this.$get = [ "$$animateJs", "$$AnimateRunner", function(n, t) {
function e(t) {
var e = t.element, a = t.event, r = t.options, i = t.classes;
return n(e, a, i, r);
}
return function(n) {
if (n.from && n.to) {
var a = e(n.from), r = e(n.to);
if (!a && !r) return;
return {
start:function() {
function n() {
return function() {
z(i, function(n) {
n.end();
});
};
}
function e(n) {
o.complete(n);
}
var i = [];
a && i.push(a.start()), r && i.push(r.start()), t.all(i, e);
var o = new t({
end:n(),
cancel:n()
});
return o;
}
};
}
return e(n);
};
} ];
} ], xn = "data-ng-animate", On = "$ngAnimatePin", Pn = [ "$animateProvider", function(t) {
function a(n) {
if (!n) return null;
var t = n.split(v), e = Object.create(null);
return z(t, function(n) {
e[n] = !0;
}), e;
}
function r(n, t) {
if (n && t) {
var e = a(t);
return n.split(v).some(function(n) {
return e[n];
});
}
}
function i(n, t, e) {
return p[n].some(function(n) {
return n(t, e);
});
}
function o(n, t) {
var e = (n.addClass || "").length > 0, a = (n.removeClass || "").length > 0;
return t ? e && a :e || a;
}
var l = 1, c = 2, v = " ", p = this.rules = {
skip:[],
cancel:[],
join:[]
};
p.join.push(function(n, t) {
return !n.structural && o(n);
}), p.skip.push(function(n, t) {
return !n.structural && !o(n);
}), p.skip.push(function(n, t) {
return "leave" === t.event && n.structural;
}), p.skip.push(function(n, t) {
return t.structural && t.state === c && !n.structural;
}), p.cancel.push(function(n, t) {
return t.structural && n.structural;
}), p.cancel.push(function(n, t) {
return t.state === c && n.structural;
}), p.cancel.push(function(n, t) {
if (t.structural) return !1;
var e = n.addClass, a = n.removeClass, i = t.addClass, o = t.removeClass;
return tn(e) && tn(a) || tn(i) && tn(o) ? !1 :r(e, o) || r(a, i);
}), this.$get = [ "$$rAF", "$rootScope", "$rootElement", "$document", "$$Map", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", "$$isDocumentHidden", function(a, r, v, p, g, D, b, A, k, w, T) {
function S() {
var n = !1;
return function(t) {
n ? t() :r.$$postDigest(function() {
n = !0, t();
});
};
}
function j(n, t) {
return h(n, t, {});
}
function x(n, t, e) {
var a = [], r = J[e];
return r && z(r, function(r) {
sn.call(r.node, t) ? a.push(r.callback) :"leave" === e && sn.call(r.node, n) && a.push(r.callback);
}), a;
}
function O(n, t, e) {
var a = u(t);
return n.filter(function(n) {
var t = n.node === a && (!e || n.callback === e);
return !t;
});
}
function P(n, t) {
"close" !== n || t.parentNode || un.off(t);
}
function N(n, t, e) {
function u(n, t, e, r) {
w(function() {
var n = x(A, g, t);
n.length ? a(function() {
z(n, function(n) {
n(p, e, r);
}), P(e, g);
}) :P(e, g);
}), n.progress(t, e, r);
}
function f(n) {
y(p, v), on(p, v), d(p, v), v.domOperation(), k.complete(!n);
}
var v = V(e), p = s(n), g = $(p), A = g && g.parentNode;
v = m(v);
var k = new b(), w = S();
if (G(v.addClass) && (v.addClass = v.addClass.join(" ")), v.addClass && !nn(v.addClass) && (v.addClass = null), 
G(v.removeClass) && (v.removeClass = v.removeClass.join(" ")), v.removeClass && !nn(v.removeClass) && (v.removeClass = null), 
v.from && !_(v.from) && (v.from = null), v.to && !_(v.to) && (v.to = null), !(H && g && an(g, t, e) && rn(g, v))) return f(), 
k;
var O = [ "enter", "move", "leave" ].indexOf(t) >= 0, N = T(), R = N || L.get(g), B = !R && q.get(g) || {}, J = !!B.state;
if (R || J && B.state === l || (R = !E(g, A, t)), R) return N && u(k, t, "start"), 
f(), N && u(k, t, "close"), k;
O && F(g);
var K = {
structural:O,
element:p,
event:t,
addClass:v.addClass,
removeClass:v.removeClass,
close:f,
options:v,
runner:k
};
if (J) {
var Q = i("skip", K, B);
if (Q) return B.state === c ? (f(), k) :(h(p, B, K), B.runner);
var U = i("cancel", K, B);
if (U) if (B.state === c) B.runner.end(); else {
if (!B.structural) return h(p, B, K), B.runner;
B.close();
} else {
var W = i("join", K, B);
if (W) {
if (B.state !== c) return C(p, O ? t :null, v), t = K.event = B.event, v = h(p, B, K), 
B.runner;
j(p, K);
}
}
} else j(p, K);
var X = K.structural;
if (X || (X = "animate" === K.event && Object.keys(K.options.to || {}).length > 0 || o(K)), 
!X) return f(), M(g), k;
var Y = (B.counter || 0) + 1;
return K.counter = Y, I(g, l, K), r.$$postDigest(function() {
p = s(n);
var e = q.get(g), a = !e;
e = e || {};
var r = p.parent() || [], i = r.length > 0 && ("animate" === e.event || e.structural || o(e));
if (a || e.counter !== Y || !i) return a && (on(p, v), d(p, v)), (a || O && e.event !== t) && (v.domOperation(), 
k.end()), void (i || M(g));
t = !e.structural && o(e, !0) ? "setClass" :e.event, I(g, c);
var l = D(p, t, e.options);
k.setHost(l), u(k, t, "start", {}), l.done(function(n) {
f(!n);
var e = q.get(g);
e && e.counter === Y && M(g), u(k, t, "close", {});
});
}), k;
}
function F(n) {
var t = n.querySelectorAll("[" + xn + "]");
z(t, function(n) {
var t = parseInt(n.getAttribute(xn), 10), e = q.get(n);
if (e) switch (t) {
case c:
e.runner.end();

case l:
q["delete"](n);
}
});
}
function M(n) {
n.removeAttribute(xn), q["delete"](n);
}
function E(n, t, e) {
var a, r = p[0].body, i = $(v), o = n === r || "HTML" === n.nodeName, s = n === i, u = !1, l = L.get(n), c = en.data(n, On);
for (c && (t = $(c)); t && (s || (s = t === i), t.nodeType === R); ) {
var f = q.get(t) || {};
if (!u) {
var m = L.get(t);
if (m === !0 && l !== !1) {
l = !0;
break;
}
m === !1 && (l = !1), u = f.structural;
}
if (tn(a) || a === !0) {
var d = en.data(t, Q);
X(d) && (a = d);
}
if (u && a === !1) break;
if (o || (o = t === r), o && s) break;
t = s || !(c = en.data(t, On)) ? t.parentNode :$(c);
}
var h = (!u || a) && l !== !0;
return h && s && o;
}
function I(n, t, e) {
e = e || {}, e.state = t, n.setAttribute(xn, t);
var a = q.get(n), r = a ? W(a, e) :e;
q.set(n, r);
}
var q = new g(), L = new g(), H = null, B = r.$watch(function() {
return 0 === A.totalPendingRequests;
}, function(n) {
n && (B(), r.$$postDigest(function() {
r.$$postDigest(function() {
null === H && (H = !0);
});
}));
}), J = Object.create(null), K = t.customFilter(), U = t.classNameFilter(), Z = function() {
return !0;
}, an = K || Z, rn = U ? function(n, t) {
var e = [ n.getAttribute("class"), t.addClass, t.removeClass ].join(" ");
return U.test(e);
} :Z, on = f(k), sn = n.Node.prototype.contains || function(n) {
return this === n || !!(16 & this.compareDocumentPosition(n));
}, un = {
on:function(n, t, e) {
var a = u(t);
J[n] = J[n] || [], J[n].push({
node:a,
callback:e
}), en(t).on("$destroy", function() {
var r = q.get(a);
r || un.off(n, t, e);
});
},
off:function(n, t, e) {
if (1 !== arguments.length || nn(arguments[0])) {
var a = J[n];
a && (J[n] = 1 === arguments.length ? null :O(a, t, e));
} else {
t = arguments[0];
for (var r in J) J[r] = O(J[r], t);
}
},
pin:function(n, t) {
e(Y(n), "element", "not an element"), e(Y(t), "parentElement", "not an element"), 
n.data(On, t);
},
push:function(n, t, e, a) {
return e = e || {}, e.domOperation = a, N(n, t, e);
},
enabled:function(n, t) {
var e = arguments.length;
if (0 === e) t = !!H; else {
var a = Y(n);
if (a) {
var r = $(n);
1 === e ? t = !L.get(r) :L.set(r, !t);
} else t = H = !!n;
}
return t;
}
};
return un;
} ];
} ], Nn = [ "$animateProvider", function(n) {
function t(n, t) {
n.data(s, t);
}
function e(n) {
n.removeData(s);
}
function r(n) {
return n.data(s);
}
var i = "ng-animate-ref", o = this.drivers = [], s = "$$animationRunner";
this.$get = [ "$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$Map", "$$rAFScheduler", function(n, s, u, l, c, v) {
function p(n) {
function t(n) {
if (n.processed) return n;
n.processed = !0;
var e = n.domNode, a = e.parentNode;
i.set(e, n);
for (var o; a; ) {
if (o = i.get(a)) {
o.processed || (o = t(o));
break;
}
a = a.parentNode;
}
return (o || r).children.push(n), n;
}
function e(n) {
var t, e = [], a = [];
for (t = 0; t < n.children.length; t++) a.push(n.children[t]);
var r = a.length, i = 0, o = [];
for (t = 0; t < a.length; t++) {
var s = a[t];
0 >= r && (r = i, i = 0, e.push(o), o = []), o.push(s.fn), s.children.forEach(function(n) {
i++, a.push(n);
}), r--;
}
return o.length && e.push(o), e;
}
var a, r = {
children:[]
}, i = new c();
for (a = 0; a < n.length; a++) {
var o = n[a];
i.set(o.domNode, n[a] = {
domNode:o.domNode,
fn:o.fn,
children:[]
});
}
for (a = 0; a < n.length; a++) t(n[a]);
return e(r);
}
var h = [], g = f(n);
return function(c, f, C) {
function y(n) {
var t = "[" + i + "]", e = n.hasAttribute(i) ? [ n ] :n.querySelectorAll(t), a = [];
return z(e, function(n) {
var t = n.getAttribute(i);
t && t.length && a.push(n);
}), a;
}
function D(n) {
var t = [], e = {};
z(n, function(n, a) {
var r = n.element, o = $(r), s = n.event, u = [ "enter", "move" ].indexOf(s) >= 0, l = n.structural ? y(o) :[];
if (l.length) {
var c = u ? "to" :"from";
z(l, function(n) {
var t = n.getAttribute(i);
e[t] = e[t] || {}, e[t][c] = {
animationID:a,
element:en(n)
};
});
} else t.push(n);
});
var a = {}, r = {};
return z(e, function(e, i) {
var o = e.from, s = e.to;
if (!o || !s) {
var u = o ? o.animationID :s.animationID, l = u.toString();
return void (a[l] || (a[l] = !0, t.push(n[u])));
}
var c = n[o.animationID], f = n[s.animationID], m = o.animationID.toString();
if (!r[m]) {
var d = r[m] = {
structural:!0,
beforeStart:function() {
c.beforeStart(), f.beforeStart();
},
close:function() {
c.close(), f.close();
},
classes:b(c.classes, f.classes),
from:c,
to:f,
anchors:[]
};
d.classes.length ? t.push(d) :(t.push(c), t.push(f));
}
r[m].anchors.push({
out:o.element,
"in":s.element
});
}), t;
}
function b(n, t) {
n = n.split(" "), t = t.split(" ");
for (var e = [], a = 0; a < n.length; a++) {
var r = n[a];
if ("ng-" !== r.substring(0, 3)) for (var i = 0; i < t.length; i++) if (r === t[i]) {
e.push(r);
break;
}
}
return e.join(" ");
}
function A(n) {
for (var t = o.length - 1; t >= 0; t--) {
var e = o[t], a = u.get(e), r = a(n);
if (r) return r;
}
}
function k() {
c.addClass(K), P && n.addClass(c, P), N && (n.removeClass(c, N), N = null);
}
function w(n, t) {
function e(n) {
var e = r(n);
e && e.setHost(t);
}
n.from && n.to ? (e(n.from.element), e(n.to.element)) :e(n.element);
}
function T() {
var n = r(c);
!n || "leave" === f && C.$$domOperationFired || n.end();
}
function S(t) {
c.off("$destroy", T), e(c), g(c, C), d(c, C), C.domOperation(), P && n.removeClass(c, P), 
c.removeClass(K), x.complete(!t);
}
C = m(C);
var j = [ "enter", "move", "leave" ].indexOf(f) >= 0, x = new l({
end:function() {
S();
},
cancel:function() {
S(!0);
}
});
if (!o.length) return S(), x;
t(c, x);
var O = a(c.attr("class"), a(C.addClass, C.removeClass)), P = C.tempClasses;
P && (O += " " + P, C.tempClasses = null);
var N;
return j && (N = "ng-" + f + J, n.addClass(c, N)), h.push({
element:c,
classes:O,
event:f,
structural:j,
options:C,
beforeStart:k,
close:S
}), c.on("$destroy", T), h.length > 1 ? x :(s.$$postDigest(function() {
var n = [];
z(h, function(t) {
r(t.element) ? n.push(t) :t.close();
}), h.length = 0;
var t = D(n), e = [];
z(t, function(n) {
e.push({
domNode:$(n.from ? n.from.element :n.element),
fn:function() {
n.beforeStart();
var t, e = n.close, a = n.anchors ? n.from.element || n.to.element :n.element;
if (r(a)) {
var i = A(n);
i && (t = i.start);
}
if (t) {
var o = t();
o.done(function(n) {
e(!n);
}), w(n, o);
} else e();
}
});
}), v(p(e));
}), x);
};
} ];
} ], Fn = [ "$animate", "$rootScope", function(n, t) {
return {
restrict:"A",
transclude:"element",
terminal:!0,
priority:600,
link:function(t, e, a, r, i) {
var o, s;
t.$watchCollection(a.ngAnimateSwap || a["for"], function(a) {
o && n.leave(o), s && (s.$destroy(), s = null), (a || 0 === a) && (s = t.$new(), 
i(s, function(t) {
o = t, n.enter(t, null, e);
}));
});
}
};
} ];
t.module("ngAnimate", [], function() {
an = t.noop, V = t.copy, W = t.extend, en = t.element, z = t.forEach, G = t.isArray, 
nn = t.isString, _ = t.isObject, tn = t.isUndefined, X = t.isDefined, Z = t.isFunction, 
Y = t.isElement;
}).info({
angularVersion:"1.6.9"
}).directive("ngAnimateSwap", Fn).directive("ngAnimateChildren", $n).factory("$$rAFScheduler", gn).provider("$$animateQueue", Pn).provider("$$animation", Nn).provider("$animateCss", wn).provider("$$animateCssDriver", Tn).provider("$$animateJs", Sn).provider("$$animateJsDriver", jn);
}(window, window.angular);
!function(e, t) {
"use strict";
function r() {
function r(e, t) {
var r, n = {}, i = e.split(",");
for (r = 0; r < i.length; r++) n[t ? l(i[r]) :i[r]] = !0;
return n;
}
function n(e, t) {
null === e || void 0 === e ? e = "" :"string" != typeof e && (e = "" + e);
var r = H(e);
if (!r) return "";
var n = 5;
do {
if (0 === n) throw p("uinput", "Failed to sanitize html because the input is unstable");
n--, e = r.innerHTML, r = H(e);
} while (e !== r.innerHTML);
for (var i = r.firstChild; i; ) {
switch (i.nodeType) {
case 1:
t.start(i.nodeName.toLowerCase(), f(i.attributes));
break;

case 3:
t.chars(i.textContent);
}
var o;
if (!(o = i.firstChild) && (1 === i.nodeType && t.end(i.nodeName.toLowerCase()), 
o = b("nextSibling", i), !o)) for (;null == o && (i = b("parentNode", i), i !== r); ) o = b("nextSibling", i), 
1 === i.nodeType && t.end(i.nodeName.toLowerCase());
i = o;
}
for (;i = r.firstChild; ) r.removeChild(i);
}
function f(e) {
for (var t = {}, r = 0, n = e.length; n > r; r++) {
var i = e[r];
t[i.name] = i.value;
}
return t;
}
function m(e) {
return e.replace(/&/g, "&amp;").replace(x, function(e) {
var t = e.charCodeAt(0), r = e.charCodeAt(1);
return "&#" + (1024 * (t - 55296) + (r - 56320) + 65536) + ";";
}).replace(k, function(e) {
return "&#" + e.charCodeAt(0) + ";";
}).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function g(e, t) {
var r = !1, n = i(e, e.push);
return {
start:function(e, i) {
e = l(e), !r && E[e] && (r = e), r || M[e] !== !0 || (n("<"), n(e), a(i, function(r, i) {
var o = l(i), a = "img" === e && "src" === o || "background" === o;
q[o] !== !0 || F[o] === !0 && !t(r, a) || (n(" "), n(i), n('="'), n(m(r)), n('"'));
}), n(">"));
},
end:function(e) {
e = l(e), r || M[e] !== !0 || w[e] === !0 || (n("</"), n(e), n(">")), e == r && (r = !1);
},
chars:function(e) {
r || n(m(e));
}
};
}
function v(t) {
for (;t; ) {
if (t.nodeType === e.Node.ELEMENT_NODE) for (var r = t.attributes, n = 0, i = r.length; i > n; n++) {
var o = r[n], a = o.name.toLowerCase();
("xmlns:ns1" === a || 0 === a.lastIndexOf("ns1:", 0)) && (t.removeAttributeNode(o), 
n--, i--);
}
var s = t.firstChild;
s && v(s), t = b("nextSibling", t);
}
}
function b(e, t) {
var r = t[e];
if (r && u.call(t, r)) throw p("elclob", "Failed to sanitize html because the element is clobbered: {0}", t.outerHTML || t.outerText);
return r;
}
var y = !1;
this.$get = [ "$$sanitizeUri", function(e) {
return y && o(M, D), function(t) {
var r = [];
return d(t, h(r, function(t, r) {
return !/^unsafe:/.test(e(t, r));
})), r.join("");
};
} ], this.enableSvg = function(e) {
return s(e) ? (y = e, this) :y;
}, i = t.bind, o = t.extend, a = t.forEach, s = t.isDefined, l = t.lowercase, c = t.noop, 
d = n, h = g, u = e.Node.prototype.contains || function(e) {
return !!(16 & this.compareDocumentPosition(e));
};
var x = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, k = /([^#-~ |!])/g, w = r("area,br,col,hr,img,wbr"), C = r("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), T = r("rp,rt"), L = o({}, T, C), z = o({}, C, r("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")), S = o({}, T, r("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), D = r("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"), E = r("script,style"), M = o({}, w, z, S, L), F = r("background,cite,href,longdesc,src,xlink:href,xml:base"), N = r("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"), $ = r("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0), q = o({}, F, $, N), H = function(e, t) {
function r(t) {
t = "<remove></remove>" + t;
try {
t = encodeURI(t);
} catch (r) {
return void 0;
}
var n = new e.XMLHttpRequest();
n.responseType = "document", n.open("GET", "data:text/html;charset=utf-8," + t, !1), 
n.send(null);
var i = n.response.body;
return i.firstChild.remove(), i;
}
function n(t) {
t = "<remove></remove>" + t;
try {
var r = new e.DOMParser().parseFromString(t, "text/html").body;
return r.firstChild.remove(), r;
} catch (n) {
return void 0;
}
}
function i(e) {
return a.innerHTML = e, t.documentMode && v(a), a;
}
var o;
if (!t || !t.implementation) throw p("noinert", "Can't create an inert html document");
o = t.implementation.createHTMLDocument("inert");
var a = (o.documentElement || o.getDocumentElement()).querySelector("body");
return a.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>', a.querySelector("svg") ? (a.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">', 
a.querySelector("svg img") ? n :i) :r;
}(e, e.document);
}
function n(e) {
var t = [], r = h(t, c);
return r.chars(e), t.join("");
}
var i, o, a, s, l, c, u, d, h, p = t.$$minErr("$sanitize");
t.module("ngSanitize", []).provider("$sanitize", r).info({
angularVersion:"1.6.9"
}), t.module("ngSanitize").filter("linky", [ "$sanitize", function(e) {
var r = /((s?ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i, i = /^mailto:/i, o = t.$$minErr("linky"), a = t.isDefined, s = t.isFunction, l = t.isObject, c = t.isString;
return function(t, u, d) {
function h(e) {
e && y.push(n(e));
}
function p(e, t) {
var r, n = v(e);
y.push("<a ");
for (r in n) y.push(r + '="' + n[r] + '" ');
!a(u) || "target" in n || y.push('target="', u, '" '), y.push('href="', e.replace(/"/g, "&quot;"), '">'), 
h(t), y.push("</a>");
}
if (null == t || "" === t) return t;
if (!c(t)) throw o("notstring", "Expected string but received: {0}", t);
for (var f, m, g, v = s(d) ? d :l(d) ? function() {
return d;
} :function() {
return {};
}, b = t, y = []; f = b.match(r); ) m = f[0], f[2] || f[4] || (m = (f[3] ? "http://" :"mailto:") + m), 
g = f.index, h(b.substr(0, g)), p(m, f[0].replace(i, "")), b = b.substring(g + f[0].length);
return h(b), e(y.join(""));
};
} ]);
}(window, window.angular);
!function(n, e) {
"use strict";
function t(n) {
return e.lowercase(n.nodeName || n[0] && n[0].nodeName);
}
function o(n, t) {
var o = !1, c = !1;
this.ngClickOverrideEnabled = function(i) {
return e.isDefined(i) ? (i && !c && (c = !0, r.$$moduleName = "ngTouch", t.directive("ngClick", r), 
n.decorator("ngClickDirective", [ "$delegate", function(n) {
if (o) n.shift(); else for (var e = n.length - 1; e >= 0; ) {
if ("ngTouch" === n[e].$$moduleName) {
n.splice(e, 1);
break;
}
e--;
}
return n;
} ])), o = i, this) :o;
}, this.$get = function() {
return {
ngClickOverrideEnabled:function() {
return o;
}
};
};
}
function c(n, t, o) {
i.directive(n, [ "$parse", "$swipe", function(c, i) {
var r = 75, u = .3, a = 30;
return function(s, l, h) {
function f(n) {
if (!d) return !1;
var e = Math.abs(n.y - d.y), o = (n.x - d.x) * t;
return v && r > e && o > 0 && o > a && u > e / o;
}
var d, v, g = c(h[n]), p = [ "touch" ];
e.isDefined(h.ngSwipeDisableMouse) || p.push("mouse"), i.bind(l, {
start:function(n, e) {
d = n, v = !0;
},
cancel:function(n) {
v = !1;
},
end:function(n, e) {
f(n) && s.$apply(function() {
l.triggerHandler(o), g(s, {
$event:e
});
});
}
}, p);
};
} ]);
}
var i = e.module("ngTouch", []);
i.info({
angularVersion:"1.6.9"
}), i.provider("$touch", o), o.$inject = [ "$provide", "$compileProvider" ], i.factory("$swipe", [ function() {
function n(n) {
var e = n.originalEvent || n, t = e.touches && e.touches.length ? e.touches :[ e ], o = e.changedTouches && e.changedTouches[0] || t[0];
return {
x:o.clientX,
y:o.clientY
};
}
function t(n, t) {
var o = [];
return e.forEach(n, function(n) {
var e = c[n][t];
e && o.push(e);
}), o.join(" ");
}
var o = 10, c = {
mouse:{
start:"mousedown",
move:"mousemove",
end:"mouseup"
},
touch:{
start:"touchstart",
move:"touchmove",
end:"touchend",
cancel:"touchcancel"
},
pointer:{
start:"pointerdown",
move:"pointermove",
end:"pointerup",
cancel:"pointercancel"
}
};
return {
bind:function(e, c, i) {
var r, u, a, s, l = !1;
i = i || [ "mouse", "touch", "pointer" ], e.on(t(i, "start"), function(e) {
a = n(e), l = !0, r = 0, u = 0, s = a, c.start && c.start(a, e);
});
var h = t(i, "cancel");
h && e.on(h, function(n) {
l = !1, c.cancel && c.cancel(n);
}), e.on(t(i, "move"), function(e) {
if (l && a) {
var t = n(e);
if (r += Math.abs(t.x - s.x), u += Math.abs(t.y - s.y), s = t, !(o > r && o > u)) return u > r ? (l = !1, 
void (c.cancel && c.cancel(e))) :(e.preventDefault(), void (c.move && c.move(t, e)));
}
}), e.on(t(i, "end"), function(e) {
l && (l = !1, c.end && c.end(n(e), e));
});
}
};
} ]);
var r = [ "$parse", "$timeout", "$rootElement", function(n, o, c) {
function i(n, e, t, o) {
return Math.abs(n - t) < p && Math.abs(e - o) < p;
}
function r(n, e, t) {
for (var o = 0; o < n.length; o += 2) if (i(n[o], n[o + 1], e, t)) return n.splice(o, o + 2), 
!0;
return !1;
}
function u(n) {
if (!(Date.now() - l > g)) {
var e = n.touches && n.touches.length ? n.touches :[ n ], o = e[0].clientX, c = e[0].clientY;
1 > o && 1 > c || f && f[0] === o && f[1] === c || (f && (f = null), "label" === t(n.target) && (f = [ o, c ]), 
r(h, o, c) || (n.stopPropagation(), n.preventDefault(), n.target && n.target.blur && n.target.blur()));
}
}
function a(n) {
var e = n.touches && n.touches.length ? n.touches :[ n ], t = e[0].clientX, c = e[0].clientY;
h.push(t, c), o(function() {
for (var n = 0; n < h.length; n += 2) if (h[n] === t && h[n + 1] === c) return void h.splice(n, n + 2);
}, g, !1);
}
function s(n, e) {
h || (c[0].addEventListener("click", u, !0), c[0].addEventListener("touchstart", a, !0), 
h = []), l = Date.now(), r(h, n, e);
}
var l, h, f, d = 750, v = 12, g = 2500, p = 25, m = "ng-click-active";
return function(t, o, c) {
function i() {
f = !1, o.removeClass(m);
}
var r, u, a, l, h = n(c.ngClick), f = !1;
o.on("touchstart", function(n) {
f = !0, r = n.target ? n.target :n.srcElement, 3 === r.nodeType && (r = r.parentNode), 
o.addClass(m), u = Date.now();
var e = n.originalEvent || n, t = e.touches && e.touches.length ? e.touches :[ e ], c = t[0];
a = c.clientX, l = c.clientY;
}), o.on("touchcancel", function(n) {
i();
}), o.on("touchend", function(n) {
var t = Date.now() - u, h = n.originalEvent || n, g = h.changedTouches && h.changedTouches.length ? h.changedTouches :h.touches && h.touches.length ? h.touches :[ h ], p = g[0], m = p.clientX, w = p.clientY, $ = Math.sqrt(Math.pow(m - a, 2) + Math.pow(w - l, 2));
f && d > t && v > $ && (s(m, w), r && r.blur(), e.isDefined(c.disabled) && c.disabled !== !1 || o.triggerHandler("click", [ n ])), 
i();
}), o.onclick = function(n) {}, o.on("click", function(n, e) {
t.$apply(function() {
h(t, {
$event:e || n
});
});
}), o.on("mousedown", function(n) {
o.addClass(m);
}), o.on("mousemove mouseup", function(n) {
o.removeClass(m);
});
};
} ];
c("ngSwipeLeft", -1, "swipeleft"), c("ngSwipeRight", 1, "swiperight");
}(window, window.angular);
