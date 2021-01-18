/* #vfic now: 30 Aug 2019 13:18:59 on web256 */ 
!function(e, t, n) {
function r(e, t) {
return typeof e === t;
}
function a() {
var e, t, n, a, i, o, s;
for (var l in b) if (b.hasOwnProperty(l)) {
if (e = [], t = b[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
for (a = r(t.fn, "function") ? t.fn() :t.fn, i = 0; i < e.length; i++) o = e[i], 
s = o.split("."), 1 === s.length ? S[s[0]] = a :(!S[s[0]] || S[s[0]] instanceof Boolean || (S[s[0]] = new Boolean(S[s[0]])), 
S[s[0]][s[1]] = a), w.push((a ? "" :"no-") + s.join("-"));
}
}
function i(e) {
var t = _.className, n = S._config.classPrefix || "";
if (B && (t = t.baseVal), S._config.enableJSClass) {
var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
t = t.replace(r, "$1" + n + "js$2");
}
S._config.enableClasses && (t += " " + n + e.join(" " + n), B ? _.className.baseVal = t :_.className = t);
}
function o() {
return "function" != typeof t.createElement ? t.createElement(arguments[0]) :B ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) :t.createElement.apply(t, arguments);
}
function s(e) {
return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
return t + n.toUpperCase();
}).replace(/^-/, "");
}
function l(e, t) {
if ("object" == typeof e) for (var n in e) j(e, n) && l(n, e[n]); else {
e = e.toLowerCase();
var r = e.split("."), a = S[r[0]];
if (2 == r.length && (a = a[r[1]]), "undefined" != typeof a) return S;
t = "function" == typeof t ? t() :t, 1 == r.length ? S[r[0]] = t :(!S[r[0]] || S[r[0]] instanceof Boolean || (S[r[0]] = new Boolean(S[r[0]])), 
S[r[0]][r[1]] = t), i([ (t && 0 != t ? "" :"no-") + r.join("-") ]), S._trigger(e, t);
}
return S;
}
function u(e, t) {
return !!~("" + e).indexOf(t);
}
function c(e, t) {
return function() {
return e.apply(t, arguments);
};
}
function d(e, t, n) {
var a;
for (var i in e) if (e[i] in t) return n === !1 ? e[i] :(a = t[e[i]], r(a, "function") ? c(a, n || t) :a);
return !1;
}
function f(e) {
return e.replace(/([A-Z])/g, function(e, t) {
return "-" + t.toLowerCase();
}).replace(/^ms-/, "-ms-");
}
function A(t, n, r) {
var a;
if ("getComputedStyle" in e) {
a = getComputedStyle.call(e, t, n);
var i = e.console;
if (null !== a) r && (a = a.getPropertyValue(r)); else if (i) {
var o = i.error ? "error" :"log";
i[o].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
}
} else a = !n && t.currentStyle && t.currentStyle[r];
return a;
}
function p() {
var e = t.body;
return e || (e = o(B ? "svg" :"body"), e.fake = !0), e;
}
function m(e, n, r, a) {
var i, s, l, u, c = "modernizr", d = o("div"), f = p();
if (parseInt(r, 10)) for (;r--; ) l = o("div"), l.id = a ? a[r] :c + (r + 1), d.appendChild(l);
return i = o("style"), i.type = "text/css", i.id = "s" + c, (f.fake ? f :d).appendChild(i), 
f.appendChild(d), i.styleSheet ? i.styleSheet.cssText = e :i.appendChild(t.createTextNode(e)), 
d.id = c, f.fake && (f.style.background = "", f.style.overflow = "hidden", u = _.style.overflow, 
_.style.overflow = "hidden", _.appendChild(f)), s = n(d, e), f.fake ? (f.parentNode.removeChild(f), 
_.style.overflow = u, _.offsetHeight) :d.parentNode.removeChild(d), !!s;
}
function g(t, r) {
var a = t.length;
if ("CSS" in e && "supports" in e.CSS) {
for (;a--; ) if (e.CSS.supports(f(t[a]), r)) return !0;
return !1;
}
if ("CSSSupportsRule" in e) {
for (var i = []; a--; ) i.push("(" + f(t[a]) + ":" + r + ")");
return i = i.join(" or "), m("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
return "absolute" == A(e, null, "position");
});
}
return n;
}
function h(e, t, a, i) {
function l() {
d && (delete L.style, delete L.modElem);
}
if (i = r(i, "undefined") ? !1 :i, !r(a, "undefined")) {
var c = g(e, a);
if (!r(c, "undefined")) return c;
}
for (var d, f, A, p, m, h = [ "modernizr", "tspan", "samp" ]; !L.style && h.length; ) d = !0, 
L.modElem = o(h.shift()), L.style = L.modElem.style;
for (A = e.length, f = 0; A > f; f++) if (p = e[f], m = L.style[p], u(p, "-") && (p = s(p)), 
L.style[p] !== n) {
if (i || r(a, "undefined")) return l(), "pfx" == t ? p :!0;
try {
L.style[p] = a;
} catch (v) {}
if (L.style[p] != m) return l(), "pfx" == t ? p :!0;
}
return l(), !1;
}
function v(e, t, n, a, i) {
var o = e.charAt(0).toUpperCase() + e.slice(1), s = (e + " " + N.join(o + " ") + o).split(" ");
return r(t, "string") || r(t, "undefined") ? h(s, t, a, i) :(s = (e + " " + F.join(o + " ") + o).split(" "), 
d(s, t, n));
}
function y(e, t, r) {
return v(e, n, n, t, r);
}
var w = [], b = [], C = {
_version:"3.6.0",
_config:{
classPrefix:"",
enableClasses:!0,
enableJSClass:!0,
usePrefixes:!0
},
_q:[],
on:function(e, t) {
var n = this;
setTimeout(function() {
t(n[e]);
}, 0);
},
addTest:function(e, t, n) {
b.push({
name:e,
fn:t,
options:n
});
},
addAsyncTest:function(e) {
b.push({
name:null,
fn:e
});
}
}, S = function() {};
S.prototype = C, S = new S(), S.addTest("filereader", !!(e.File && e.FileList && e.FileReader)), 
S.addTest("applicationcache", "applicationCache" in e), S.addTest("history", function() {
var t = navigator.userAgent;
return -1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") || "file:" === location.protocol ? e.history && "pushState" in e.history :!1;
}), S.addTest("json", "JSON" in e && "parse" in JSON && "stringify" in JSON), S.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), 
S.addTest("localstorage", function() {
var e = "modernizr";
try {
return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
} catch (t) {
return !1;
}
}), S.addTest("svgfilters", function() {
var t = !1;
try {
t = "SVGFEColorMatrixElement" in e && 2 == SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE;
} catch (n) {}
return t;
});
var x = C._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") :[ "", "" ];
C._prefixes = x;
var E = "CSS" in e && "supports" in e.CSS, T = "supportsCSS" in e;
S.addTest("supports", E || T);
var _ = t.documentElement, B = "svg" === _.nodeName.toLowerCase();
B || !function(e, t) {
function n(e, t) {
var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement;
return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild);
}
function r() {
var e = y.elements;
return "string" == typeof e ? e.split(" ") :e;
}
function a(e, t) {
var n = y.elements;
"string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), 
y.elements = n + " " + e, u(t);
}
function i(e) {
var t = v[e[g]];
return t || (t = {}, h++, e[g] = h, v[h] = t), t;
}
function o(e, n, r) {
if (n || (n = t), d) return n.createElement(e);
r || (r = i(n));
var a;
return a = r.cache[e] ? r.cache[e].cloneNode() :m.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() :r.createElem(e), 
!a.canHaveChildren || p.test(e) || a.tagUrn ? a :r.frag.appendChild(a);
}
function s(e, n) {
if (e || (e = t), d) return e.createDocumentFragment();
n = n || i(e);
for (var a = n.frag.cloneNode(), o = 0, s = r(), l = s.length; l > o; o++) a.createElement(s[o]);
return a;
}
function l(e, t) {
t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, 
t.frag = t.createFrag()), e.createElement = function(n) {
return y.shivMethods ? o(n, e, t) :t.createElem(n);
}, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(e) {
return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
}) + ");return n}")(y, t.frag);
}
function u(e) {
e || (e = t);
var r = i(e);
return !y.shivCSS || c || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
d || l(e, r), e;
}
var c, d, f = "3.7.3", A = e.html5 || {}, p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, m = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g = "_html5shiv", h = 0, v = {};
!function() {
try {
var e = t.createElement("a");
e.innerHTML = "<xyz></xyz>", c = "hidden" in e, d = 1 == e.childNodes.length || function() {
t.createElement("a");
var e = t.createDocumentFragment();
return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement;
}();
} catch (n) {
c = !0, d = !0;
}
}();
var y = {
elements:A.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
version:f,
shivCSS:A.shivCSS !== !1,
supportsUnknownElements:d,
shivMethods:A.shivMethods !== !1,
type:"default",
shivDocument:u,
createElement:o,
createDocumentFragment:s,
addElements:a
};
e.html5 = y, u(t), "object" == typeof module && module.exports && (module.exports = y);
}("undefined" != typeof e ? e :this, t), S.addTest("webgl", function() {
var t = o("canvas"), n = "probablySupportsContext" in t ? "probablySupportsContext" :"supportsContext";
return n in t ? t[n]("webgl") || t[n]("experimental-webgl") :"WebGLRenderingContext" in e;
}), S.addTest("cssgradients", function() {
for (var e, t = "background-image:", n = "gradient(linear,left top,right bottom,from(#9f9),to(white));", r = "", a = 0, i = x.length - 1; i > a; a++) e = 0 === a ? "to " :"", 
r += t + x[a] + "linear-gradient(" + e + "left top, #9f9, white);";
S._config.usePrefixes && (r += t + "-webkit-" + n);
var s = o("a"), l = s.style;
return l.cssText = r, ("" + l.backgroundImage).indexOf("gradient") > -1;
}), S.addAsyncTest(function() {
if (S.webglextensions = !1, S.webgl) {
var e, t, r;
try {
e = o("canvas"), t = e.getContext("webgl") || e.getContext("experimental-webgl"), 
r = t.getSupportedExtensions();
} catch (a) {
return;
}
t !== n && (S.webglextensions = new Boolean(!0));
for (var i = -1, s = r.length; ++i < s; ) S.webglextensions[r[i]] = !0;
e = n;
}
});
var k = o("input"), O = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "), R = {};
S.input = function(t) {
for (var n = 0, r = t.length; r > n; n++) R[t[n]] = !!(t[n] in k);
return R.list && (R.list = !(!o("datalist") || !e.HTMLDataListElement)), R;
}(O);
var Q = "search tel url email datetime date month week time datetime-local number range color".split(" "), U = {};
S.inputtypes = function(e) {
for (var r, a, i, o = e.length, s = "1)", l = 0; o > l; l++) k.setAttribute("type", r = e[l]), 
i = "text" !== k.type && "style" in k, i && (k.value = s, k.style.cssText = "position:absolute;visibility:hidden;", 
/^range$/.test(r) && k.style.WebkitAppearance !== n ? (_.appendChild(k), a = t.defaultView, 
i = a.getComputedStyle && "textfield" !== a.getComputedStyle(k, null).WebkitAppearance && 0 !== k.offsetHeight, 
_.removeChild(k)) :/^(search|tel)$/.test(r) || (i = /^(url|email)$/.test(r) ? k.checkValidity && k.checkValidity() === !1 :k.value != s)), 
U[e[l]] = !!i;
return U;
}(Q);
var D = "Moz O ms Webkit", N = C._config.usePrefixes ? D.split(" ") :[];
C._cssomPrefixes = N;
var P = function(t) {
var r, a = x.length, i = e.CSSRule;
if ("undefined" == typeof i) return n;
if (!t) return !1;
if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;
for (var o = 0; a > o; o++) {
var s = x[o], l = s.toUpperCase() + "_" + r;
if (l in i) return "@-" + s.toLowerCase() + "-" + t;
}
return !1;
};
C.atRule = P;
var F = C._config.usePrefixes ? D.toLowerCase().split(" ") :[];
C._domPrefixes = F;
var j;
!function() {
var e = {}.hasOwnProperty;
j = r(e, "undefined") || r(e.call, "undefined") ? function(e, t) {
return t in e && r(e.constructor.prototype[t], "undefined");
} :function(t, n) {
return e.call(t, n);
};
}(), C._l = {}, C.on = function(e, t) {
this._l[e] || (this._l[e] = []), this._l[e].push(t), S.hasOwnProperty(e) && setTimeout(function() {
S._trigger(e, S[e]);
}, 0);
}, C._trigger = function(e, t) {
if (this._l[e]) {
var n = this._l[e];
setTimeout(function() {
var e, r;
for (e = 0; e < n.length; e++) (r = n[e])(t);
}, 0), delete this._l[e];
}
}, S._q.push(function() {
C.addTest = l;
}), S.addAsyncTest(function() {
function e(e, t, n) {
function r(t) {
var r = t && "load" === t.type ? 1 == a.width :!1, i = "webp" === e;
l(e, i && r ? new Boolean(r) :r), n && n(t);
}
var a = new Image();
a.onerror = r, a.onload = r, a.src = t;
}
var t = [ {
uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
name:"webp"
}, {
uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
name:"webp.alpha"
}, {
uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
name:"webp.animation"
}, {
uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
name:"webp.lossless"
} ], n = t.shift();
e(n.name, n.uri, function(n) {
if (n && "load" === n.type) for (var r = 0; r < t.length; r++) e(t[r].name, t[r].uri);
});
}), S.addAsyncTest(function() {
function e() {
var e = new Image();
e.onerror = function() {
l("datauri", !0), S.datauri = new Boolean(!0), S.datauri.over32kb = !1;
}, e.onload = function() {
l("datauri", !0), S.datauri = new Boolean(!0), S.datauri.over32kb = 1 == e.width && 1 == e.height;
};
for (var t = "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; t.length < 33e3; ) t = "\r\n" + t;
e.src = "data:image/gif;base64," + t;
}
-1 !== navigator.userAgent.indexOf("MSIE 7.") && setTimeout(function() {
l("datauri", !1);
}, 10);
var t = new Image();
t.onerror = function() {
l("datauri", !1);
}, t.onload = function() {
1 == t.width && 1 == t.height ? e() :l("datauri", !1);
}, t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
});
var z = {
elem:o("modernizr")
};
S._q.push(function() {
delete z.elem;
});
var L = {
style:z.elem.style
};
S._q.unshift(function() {
delete L.style;
}), C.testAllProps = v, C.prefixed = function(e, t, n) {
return 0 === e.indexOf("@") ? P(e) :(-1 != e.indexOf("-") && (e = s(e)), t ? v(e, t, n) :v(e, "pfx"));
}, C.testAllProps = y, S.addTest("csstransforms3d", function() {
return !!y("perspective", "1px", !0);
}), S.addTest("backgroundsize", y("backgroundSize", "100%", !0)), S.addTest("borderradius", y("borderRadius", "0px", !0)), 
S.addTest("csstransforms", function() {
return -1 === navigator.userAgent.indexOf("Android 2.") && y("transform", "scale(1)", !0);
}), S.addTest("csstransitions", y("transition", "all", !0)), a(), i(w), delete C.addTest, 
delete C.addAsyncTest;
for (var M = 0; M < S._q.length; M++) S._q[M]();
e.Modernizr = S;
}(window, document);
