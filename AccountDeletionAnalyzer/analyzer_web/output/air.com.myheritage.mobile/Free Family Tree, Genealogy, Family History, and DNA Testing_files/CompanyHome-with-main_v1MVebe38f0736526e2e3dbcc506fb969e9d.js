/* #vfic now: 12 Sep 2019 03:52:14 on web268 */ 
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
!function(e) {
function o(r) {
if (t[r]) return t[r].exports;
var i = t[r] = {
i:r,
l:!1,
exports:{}
};
return e[r].call(i.exports, i, i.exports, o), i.l = !0, i.exports;
}
var t = {};
return o.m = e, o.c = t, o.d = function(e, t, r) {
o.o(e, t) || Object.defineProperty(e, t, {
enumerable:!0,
get:r
});
}, o.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value:"Module"
}), Object.defineProperty(e, "__esModule", {
value:!0
});
}, o.t = function(e, t) {
if (1 & t && (e = o(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (o.r(r), Object.defineProperty(r, "default", {
enumerable:!0,
value:e
}), 2 & t && "string" != typeof e) for (var i in e) o.d(r, i, function(o) {
return e[o];
}.bind(null, i));
return r;
}, o.n = function(e) {
var t = e && e.__esModule ? function() {
return e["default"];
} :function() {
return e;
};
return o.d(t, "a", t), t;
}, o.o = function(e, o) {
return Object.prototype.hasOwnProperty.call(e, o);
}, o.p = "/FP/Assets/Cache/output/", o(o.s = "e62a0257d1e6896d8761");
}({
"15673937f4591bbdf4d6":function(e, o, t) {
"use strict";
function r(e) {
return e && e.__esModule ? e :{
"default":e
};
}
var i = t("3f91d37d2a3421a4eeb1"), a = r(t("e1f3b0007f303bd65601"));
!function(e) {
e.MobileRegistration = {
showMobileRegistration:function(e) {
var o = jQuery("#mobile_login_container"), t = jQuery("#mobile_signup_container"), r = jQuery("#mobile_forgot_password_container");
o.show(), t.show(), r.show();
var n = jQuery("#mobile_registration_container");
n.show(), n.find("select").styledSelect({
useFixedCoverWidth:!1
}), n.hide(), o.hide(), t.hide(), r.hide(), "login" == e ? o.show() :"forgotPassword" == e ? r.show() :(t.show(), 
CompanyHome.trackGoogleAnalyticsRegistrationEvent()), jQuery("#wrapper").fadeOut("fast", function() {
jQuery("body").addClass("mobile_registration_background"), jQuery("#mobile_registration_container").fadeIn("fast");
}), a["default"](i.ACTIVITY_MOBILE_REGISTRATION_VIEWED);
},
hideMobileRegistration:function() {
document.location.hash = "#", jQuery("#mobile_registration_container").fadeOut("fast", function() {
jQuery("body").removeClass("mobile_registration_background"), jQuery("#wrapper").fadeIn("fast");
});
},
loginGoToSignup:function() {
var e = jQuery("#mobile_signup_container");
e.show(), e.find("select").styledSelect({
useFixedCoverWidth:!1
}), e.hide(), jQuery("#mobile_login_container").fadeOut("fast", function() {
jQuery("#mobile_signup_container").fadeIn("fast");
});
},
loginGoToForgotPassword:function() {
jQuery("#mobile_login_container").fadeOut("fast", function() {
jQuery("#mobile_forgot_password_container").fadeIn("fast");
});
},
forgotPasswordGoToLogin:function() {
jQuery("#mobile_forgot_password_container").fadeOut("fast", function() {
jQuery("#mobile_login_container").fadeIn("fast");
});
},
signupGoToLogin:function() {
a["default"](i.ACTIVITY_MOBILE_REGISTRATION_LOGIN_CLICKED), jQuery("#mobile_signup_container").fadeOut("fast", function() {
jQuery("#mobile_login_container").fadeIn("fast");
});
},
loginClicked:function() {
var e = jQuery("#mobile_login_submit_button");
e.attr("disabled", !0);
var o = jQuery("#mobile_login_form");
if (!o.validationEngine("validate")) return void e.attr("disabled", !1);
var t = MobileRegistration.login.loginApi, r = o.serializeArray().reduce(function(e, o) {
return e[o.name] = o.value, e;
}, {});
setCookie(MobileRegistration.login.cookieCheckerCookieName, 1, -1), mhLogin.performLogin({
type:"POST",
url:t,
data:r,
success:this.loginCallback,
dataType:"html"
});
},
loginCallback:function(e) {
if (e = unescape(e), -1 == e.indexOf("<error ")) window.location.reload(); else {
var o = MobileRegistration.login.defaultLoginErrorCode, t = e.indexOf('<error code="');
if (t > -1) {
t += 13;
var r = e.indexOf('">', t);
r > -1 && (o = parseInt(e.substr(t, r - t)));
}
alert(MobileRegistration.login.getLoginErrorMsg(o));
var i = jQuery("#mobile_login_submit_button");
i.attr("disabled", !1);
}
},
forgotPasswordClicked:function() {
var e = jQuery("#mobile_forgot_password_submit_button");
e.attr("disabled", !0);
var o = jQuery("#mobile_forgot_password_form");
if (!o.validationEngine("validate")) return e.attr("disabled", !1), !1;
var t = MobileRegistration.forgotPassword.forgotPasswordApi, r = {
email:jQuery("#mobile_forgot_password_email").val()
};
return jQuery.post(t, r, this.forgotPasswordCallback, "html"), !1;
},
forgotPasswordCallback:function(e) {
e = unescape(e);
var o = jQuery("#mobile_forgot_password_email").val(), t = jQuery("#mobile_forgot_password_submit_button");
if (e.indexOf("|") < 0) alert(MobileRegistration.forgotPassword.forgotPasswordFail.replace("%1", o)), 
t.attr("disabled", !1); else {
var r = e.split("|"), i = r[0];
if (0 == i) {
var a = MobileRegistration.forgotPassword.forgotPasswordSuccess.replace("%1", o);
alert(a), t.attr("disabled", !1);
} else alert(MobileRegistration.forgotPassword.forgotPasswordFail.replace("%1", o)), 
t.attr("disabled", !1);
}
},
signupClicked:function() {
a["default"](i.ACTIVITY_MOBILE_REGISTRATION_SIGN_UP_CLICKED);
var e = jQuery("#mobile_signup_submit_button");
e.attr("disabled", !0);
var o = jQuery("#mobile_signup_form :radio:not(:visible), #mobile_signup_form :checkbox:not(:visible)");
o.show();
var t = jQuery("#mobile_signup_form"), r = t.validationEngine("validate");
if (o.hide(), !r) return jQuery(" body").animate({
scrollTop:0
}, 150), e.attr("disabled", !1), !1;
var n = jQuery("#mobile_signup_email");
if (!isEmail(n.val())) return n.addClass("errorField").validationEngine("showPrompt", MobileRegistration.signup.invalidEmailString), 
e.attr("disabled", !1), !1;
var _ = jQuery("#mobile_registration_reason"), s = jQuery("#mobile_signup_implicit_country"), l = MobileRegistration.signup.signupApi, u = {
email:n.val(),
gender:jQuery("#mobile_signup_gender").val(),
password:jQuery("#mobile_signup_password").val(),
rootPersonFirstName:jQuery("#mobile_signup_root_person_first_name").val(),
rootPersonLastName:jQuery("#mobile_signup_root_person_last_name").val(),
rootPersonFullName:jQuery("#mobile_signup_root_person_full_name").val(),
country:s.length > 0 ? s.val() :jQuery("#mobile_signup_country").val(),
birthYear:jQuery("#mobile_signup_birth_year").val(),
userGotGedcom:jQuery("#mobile_signup_user_got_gedcom").val(),
step:jQuery("#mobile_signup_step").val(),
noParentsRegistration:jQuery("#no_parents_registration").val(),
partner_id:jQuery("#mobile_partner_id").val(),
partner_token:jQuery("#mobile_partner_token").val(),
partner_token_expiration:jQuery("#mobile_partner_token_expiration").val(),
partner_unique_identifier:jQuery("#mobile_partner_unique_identifier").val()
};
return _.length > 0 && (u.registration_reason = _.val()), jQuery.post(l, u, function(e) {
var o = jQuery("#mobile_signup_submit_button");
if (e.indexOf("|") < 0) o.attr("disabled", !1), alert(MobileRegistration.signup.FTW_GENERAL_ERROR_MESSAGE); else {
var t = e.substr(0, e.indexOf("|"));
if (t == MobileRegistration.signup.FTW_SUCCESS) {
try {
googleAnalyticsTracking.trackEvent("Registration", "Web Registration form success", "Short", null, null, "GTM page To GA");
} catch (r) {}
location.href = e.substr(e.indexOf("|") + 1);
} else o.attr("disabled", !1), t == MobileRegistration.signup.FTW_EMAIL_IS_IN_THE_SYSTEM || t == MobileRegistration.signup.FTW_EMAIL_IS_IN_THE_SYSTEM_WITH_NO_SITE ? jQuery("#mobile_signup_genderF").is(":checked") ? alert(MobileRegistration.signup.EMAIL_IS_IN_THE_SYSTEM_MESSAGE_F) :alert(MobileRegistration.signup.EMAIL_IS_IN_THE_SYSTEM_MESSAGE_M) :(o.attr("disabled", !1), 
alert(MobileRegistration.signup.FTW_GENERAL_ERROR_MESSAGE));
}
}, "html"), !1;
}
};
}(window.CompanyHome = window.CompanyHome || {});
},
"309f86470e197ac2d7e8":function(e, o, t) {
"use strict";
function r(e, o, t, r) {
var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] :window.googleAnalyticsTracking, a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] :new Date();
return i ? i.trackEventObject({
event:e,
testName:o,
testVarId:t,
testVarName:r,
testEntryDate:a.toLocaleDateString("en-US")
}) :void 0;
}
Object.defineProperty(o, "__esModule", {
value:!0
}), o.pushTestEvent = r;
},
"3f91d37d2a3421a4eeb1":function(e, o, t) {
"use strict";
Object.defineProperty(o, "__esModule", {
value:!0
}), o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_STORE_INSTALL_CLICKED = o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_CONTINUE_WITH_WEB_CLICKED = o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_CLOSE_BUTTON_CLICKED = o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_INSTALL_CLICKED = o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_VIEW = o.ACTIVITY_MOBILE_PASSWORD_POPUP_VIEWED = o.ACTIVITY_MOBILE_PASSWORD_POPUP_SAVE_CLICKED = o.ACTIVITY_MOBILE_PASSWORD_POPUP_CLOSE_CLICKED = o.ACTIVITY_FULL_SCREEN_MOBILE_PASSWORD_VIEWED = o.ACTIVITY_FULL_SCREEN_MOBILE_PASSWORD_SAVE_CLICKED = o.ACTIVITY_FULL_SCREEN_MOBILE_PASSWORD_CLOSE_CLICKED = o.ACTIVITY_MOBILE_REGISTRATION_LOGIN_CLICKED = o.ACTIVITY_MOBILE_REGISTRATION_SIGN_UP_CLICKED = o.ACTIVITY_MOBILE_REGISTRATION_VIEWED = o.SERVICE_NAME = o.SECTION_NAME = void 0;
var r = "mobile-web-onboarding";
o.SECTION_NAME = r;
var i = "mobileWebOnboarding";
o.SERVICE_NAME = i;
var a = "MobileRegistration.Viewed";
o.ACTIVITY_MOBILE_REGISTRATION_VIEWED = a;
var n = "MobileRegistration.SignUpClicked";
o.ACTIVITY_MOBILE_REGISTRATION_SIGN_UP_CLICKED = n;
var _ = "MobileRegistration.LoginClicked";
o.ACTIVITY_MOBILE_REGISTRATION_LOGIN_CLICKED = _;
var s = "FullScreenMobilePassword.CloseButtonClicked";
o.ACTIVITY_FULL_SCREEN_MOBILE_PASSWORD_CLOSE_CLICKED = s;
var l = "FullScreenMobilePassword.SaveButtonClicked";
o.ACTIVITY_FULL_SCREEN_MOBILE_PASSWORD_SAVE_CLICKED = l;
var u = "FullScreenMobilePassword.Viewed";
o.ACTIVITY_FULL_SCREEN_MOBILE_PASSWORD_VIEWED = u;
var d = "MobilePasswordPopup.CloseButtonClicked";
o.ACTIVITY_MOBILE_PASSWORD_POPUP_CLOSE_CLICKED = d;
var I = "MobilePasswordPopup.SaveButtonClicked";
o.ACTIVITY_MOBILE_PASSWORD_POPUP_SAVE_CLICKED = I;
var c = "MobilePasswordPopup.Viewed";
o.ACTIVITY_MOBILE_PASSWORD_POPUP_VIEWED = c;
var b = "MobilePromotionalPopup.Viewed";
o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_VIEW = b;
var f = "MobilePromotionalPopup.InstallClicked";
o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_INSTALL_CLICKED = f;
var g = "MobilePromotionalPopup.CloseButtonClicked";
o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_CLOSE_BUTTON_CLICKED = g;
var p = "MobilePromotionalPopup.ContinueWithWebClicked";
o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_CONTINUE_WITH_WEB_CLICKED = p;
var E = "MobilePromotionalPopup.StoreInstallClicked";
o.ACTIVITY_MOBILE_PROMOTIONAL_POPUP_STORE_INSTALL_CLICKED = E;
},
"5aef2a6e3fd48bb06a74":function(e, o, t) {
"use strict";
t.p = window.AssetManager ? window.AssetManager.R_JS("/FP/Assets/Cache/output/") :"";
},
e1f3b0007f303bd65601:function(e, o, t) {
"use strict";
function r(e) {
if (e && e.__esModule) return e;
var o = {};
if (null != e) for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, t) :{};
r.get || r.set ? Object.defineProperty(o, t, r) :o[t] = e[t];
}
return o["default"] = e, o;
}
function i(e) {
var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :window.writeActivityIndicator;
window.isMobile && !window.isTablet && !window.embed && _.contains(a, e) && o && o("".concat(a.SECTION_NAME, ".").concat(e));
}
Object.defineProperty(o, "__esModule", {
value:!0
}), o["default"] = i;
var a = r(t("3f91d37d2a3421a4eeb1"));
},
e62a0257d1e6896d8761:function(e, o, t) {
"use strict";
function r(e, o) {
window.core_as_primary_product_ab_test_data && "signup_popup_ftfc" === window.core_as_primary_product_ab_test_data.variantName && (window.location.href = window.core_as_primary_product_ab_test_data.ppcCheckoutUrl);
}
t("5aef2a6e3fd48bb06a74"), t("15673937f4591bbdf4d6");
var i = t("309f86470e197ac2d7e8"), a = "GTM test To GA";
if (window.core_as_primary_product_ab_test_data) {
var n = window.core_as_primary_product_ab_test_data && window.core_as_primary_product_ab_test_data.abTestName, _ = window.core_as_primary_product_ab_test_data && window.core_as_primary_product_ab_test_data.variantId, s = window.core_as_primary_product_ab_test_data && window.core_as_primary_product_ab_test_data.variantName;
$(document).ready(function() {
i.pushTestEvent(a, n, _, s);
});
}
if (window.new_company_home_page_ab_test_data) {
var l = window.new_company_home_page_ab_test_data, u = l.testName, d = l.testVarId, I = l.testVarName;
$(document).ready(function() {
i.pushTestEvent(a, u, d, I);
});
}
window.successfulMiniSignupCallback = r;
}
});
!function(e) {
e.initAnimationCenter = function() {
function e() {
o.css(t, -(r - a.width()) / 2);
}
function i() {
var e = (_ - l.width()) / 2;
s.css(t, -e), s.css("width", jQuery(window).width() + e - 15);
}
var n = jQuery(window), t = "margin-" + displayLanguageDirection, o = jQuery("#tree_chart_animation"), a = o.parent(), r = o.width(), s = jQuery("#records_animation"), l = s.parent(), _ = s.width();
e(), n.resize(function() {
e();
}), i(), n.resize(function() {
i();
});
}, e.initBtnAnimation = function() {
var e = jQuery("#slide-up-btn");
jQuery(window).scroll(function() {
var i = jQuery(e).offset().top, n = jQuery(window).scrollTop();
n + 800 > i && $(e).addClass("slideUp");
});
}, e.initArrowDownScroll = function() {
jQuery(".scroll-down").click(function(e) {
e.preventDefault(), jQuery("html, body").animate({
scrollTop:$(".scroll-down").offset().top
}, 1800);
});
}, e.initTextEntrance = function() {
jQuery("#mobile_registration_btn").fadeIn(800), jQuery(window).resize(function() {
var e = jQuery("#mobile_registration_btn");
e.is(":hidden") && e.fadeIn(800);
});
}, e.initPersonAnimation = function() {
var e, i, n = 1, t = 12e3, o = "genealogy_%1_image", a = "ethnicity_%1_image", r = "genealogy_%1_title", s = "ethnicity_%1_title", l = DnaContentData.two_faces_info.images, _ = l.length;
setInterval(function() {
if (!jQuery(".genealogy_ethnicity_container").hasClass("move_away")) {
e = n % _, i = 0 > e - 1 ? _ - 1 :e - 1;
var t = jQuery("." + o.replace("%1", l[i])), c = jQuery("." + a.replace("%1", l[i])), d = jQuery("." + r.replace("%1", l[i])), y = jQuery("." + s.replace("%1", l[i]));
jQuery(".promotional_info_container").removeClass(l[i]).addClass(l[e]), t.addClass("hide_genealogy_person"), 
c.addClass("hide_ethnicity_person"), d.addClass("hide_genealogy_title").removeClass("show_genealogy_title"), 
y.addClass("hide_ethnicity_title").removeClass("show_ethnicity_title"), jQuery("." + o.replace("%1", l[e])).removeClass("hide_genealogy_person").addClass("show_genealogy_person"), 
jQuery("." + a.replace("%1", l[e])).removeClass("hide_ethnicity_person").addClass("show_ethnicity_person"), 
jQuery("." + r.replace("%1", l[e])).removeClass("hide_genealogy_title").addClass("show_genealogy_title"), 
jQuery("." + s.replace("%1", l[e])).removeClass("hide_ethnicity_title").addClass("show_ethnicity_title"), 
window.setTimeout(function() {
t.removeClass("show_genealogy_person"), c.removeClass("show_ethnicity_person");
}, 1e3), n++;
}
}, t);
};
}(window);
!function(e) {
e.imageFade = {
slideshowSpeed:15e3,
setImageFade:function() {
this.intervalHandle = setInterval(function() {
imageFade.changeImages();
}, this.slideshowSpeed);
},
changeImages:function() {
imageFade.stopImageFade(), CompanyHomeSlides.activeImg++, CompanyHomeSlides.imgListCursor++, 
CompanyHomeSlides.activeImg > 1 && (CompanyHomeSlides.activeImg = 0), CompanyHomeSlides.imgListCursor > CompanyHomeSlides.imgSrc.length - 1 && (CompanyHomeSlides.imgListCursor = 0), 
this.setQouteText(), jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).css("background-image", "url(" + CompanyHomeSlides.imgSrc[CompanyHomeSlides.imgListCursor] + ")");
var e = new Image();
e.onload = this.toggleFade, e.src = CompanyHomeSlides.imgSrc[CompanyHomeSlides.imgListCursor];
},
toggleFade:function() {
imageFade.setImageFade(), 1 == CompanyHomeSlides.activeImg ? jQuery(CompanyHomeSlides.imgList[0]).removeClass("fadein").addClass("fadeout") :jQuery(CompanyHomeSlides.imgList[0]).removeClass("fadeout").addClass("fadein");
},
init:function() {
var e = new Image();
e.onload = function() {
jQuery("#first-slide").addClass("fadein"), imageFade.setQouteText(), imageFade.startImageFade();
}, e.src = CompanyHomeSlides.imgSrc[0], jQuery("#first-slide").addClass("fadeOut").css("background-image", "url(" + CompanyHomeSlides.imgSrc[0] + ")"), 
CompanyHomeSlides.imgList = jQuery("div.slideshow .slide");
},
setQouteText:function() {
for (k = 0; k < CompanyHomeSlides.imgQuote.length; k++) {
if (CompanyHomeSlides.imgListCursor == CompanyHomeSlides.imgQuote[k].position) {
var e = jQuery('<div class="slideshow-quote"><h1>' + CompanyHomeSlides.imgQuote[k].header + "</h1><span>" + CompanyHomeSlides.imgQuote[k].whoami + "</span></div>");
jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).append(e), jQuery(e).fadeIn(1e3);
break;
}
jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).find(".slideshow-quote") && jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).find(".slideshow-quote").remove();
}
},
startImageFade:function() {
this.setImageFade();
},
stopImageFade:function() {
clearInterval(this.intervalHandle);
}
};
}(window);
!function(e) {
e.onGenderChange = function() {
jQuery("input[name='gender']").change(function() {
if (jQuery("#genderF").is(":checked")) {
var e = jQuery("#rootPersonLastName");
e.attr("placeholder", CompanyHomeStrings.maidenNameString), e.attr("aria-label", CompanyHomeStrings.accessibilityMaidenName);
} else jQuery("#rootPersonLastName").attr("placeholder", CompanyHomeStrings.lastNameString);
}).change();
}, e.onMobileGenderChange = function() {
jQuery("select[name='mobile_signup_gender']").change(function() {
"F" === jQuery("#mobile_signup_gender").val() ? jQuery("#mobile_signup_root_person_last_name").attr("placeholder", CompanyHomeStrings.maidenNameString) :jQuery("#mobile_signup_root_person_last_name").attr("placeholder", CompanyHomeStrings.lastNameString);
}).change();
}, e.enableFatherAutocomplete = function() {
jQuery("#rootPersonLastName").bind("keyup change", function() {
var e = jQuery("#fatherLastNameList");
e.find("option").attr("value", this.value);
});
}, e.enableEmailValidation = function() {
jQuery("#email").on("blur", function() {
var e = jQuery(this), n = jQuery("#email_spell_error");
e.val(trim(e.val())), e.mailcheck({
suggested:function(e, a) {
n.html(CompanyHomeStrings.didYouMean.replace("%1", a.full)).slideDown();
var i = jQuery(e).val().split("@"), r = "unknown";
2 == i.length && (r = i[1]), writeActivityIndicatorWithCallback([ {
activityId:"users.EmailSpellingErrorFound",
scenario:r
} ]);
},
empty:function() {
n.is(":visible") && writeActivityIndicatorWithCallback([ {
activityId:"users.EmailSpellingErrorCorrectedByUser"
} ]), n.slideUp();
}
});
});
};
}(window.CompanyHome = window.CompanyHome || {});
function openRegularSignupPopup(o, e, i) {
window.openSignupPopup(languageCode, {
flavor:"liteSignup",
startWith:"signup",
signupReason:e || "family tree data entry",
signupTitle:o || window.createMyFamilyTreeTitle,
socialSignupPosition:window.socialSignupPosition,
createTreeOnSignup:!0,
hideDescription:!0,
shouldIncludesFullName:!0,
hideCheckboxTermsAndConditions:!0,
shouldDefineSignupPopupContentAdjustmentFunction:!0,
should_redirect_to_magic7:i || !0
});
}

function openSignupForm() {
window.closeNewPopup(), CompanyHome.openSignupForm(), history.pushState({
showForm:1
}, "", "");
}

function redirectToUrl(o, e) {
disableCssButton(e), window.location.href = o;
}

!function(o) {
o.onSignupFormClose = function() {
jQuery(".close_signup_form").click(function(o) {
o.preventDefault(), history.go(-1), CompanyHome.closeSignupForm();
});
}, o.closeSignupForm = function() {
jQuery("#mobile_registration_container").is(":visible") ? CompanyHome.MobileRegistration.hideMobileRegistration() :jQuery(".genealogy_ethnicity_container").removeClass("show_form move_away");
}, o.openSignupForm = function() {
if (jQuery("#mobile_registration_btn").is(":visible") || jQuery("#start_your_family_tree_button_mobile").is(":visible")) openRegularSignupPopup(); else {
var o = jQuery(".genealogy_ethnicity_container");
o.addClass("move_away").delay(1500).queue(function() {
o.addClass("show_form").dequeue();
});
}
CompanyHomeGeneral.isPhone || CompanyHome.trackGoogleAnalyticsRegistrationEvent();
}, o.onDnaSignupClicked = function() {
jQuery("#start_your_family_tree_button").click(function(o) {
o.preventDefault(), CompanyHome.openSignupForm(), history.pushState({
showForm:1
}, "", "");
}), jQuery("#start_your_family_tree_button_mobile").click(function(o) {
o.preventDefault(), window.coreFreeTrialData && window.coreFreeTrialData.isFreeTrialExposed ? (window.successfulSignupCallback = function() {
window.successfulSignupCallback = void 0, redirectToUrl(window.coreFreeTrialData.ppcCheckoutUrl, "start_free_button_mobile");
}, window.successfulLoginCallback = function() {
window.successfulLoginCallback = void 0, redirectToUrl(window.coreFreeTrialData.ppcCheckoutUrl, "start_free_button_mobile");
}, openRegularSignupPopup(window.coreFreeTrialData.signupMobileTitle, window.coreFreeTrialData.signupReason)) :openRegularSignupPopup(), 
history.pushState({
showForm:1
}, "", "");
}), jQuery("#start_free_button_mobile").click(function(o) {
o.preventDefault(), "signup_open_form_ftfc" === window.core_as_primary_product_ab_test_data.variantName ? (window.successfulSignupCallback = function() {
window.successfulSignupCallback = void 0, redirectToUrl(window.core_as_primary_product_ab_test_data.ppcCheckoutUrl, "start_free_button_mobile");
}, window.successfulLoginCallback = function() {
window.successfulLoginCallback = void 0, redirectToUrl(window.core_as_primary_product_ab_test_data.ppcCheckoutUrl, "start_free_button_mobile");
}, openRegularSignupPopup(window.core_as_primary_product_ab_test_data.signupMobileTitle, window.core_as_primary_product_ab_test_data.signupReason)) :openRegularSignupPopup(window.core_as_primary_product_ab_test_data.signupMobileTitle);
});
}, o.onSearchHistoricalRecordsClicked = function(o) {
writeActivityIndicator(CompanyHomeGeneral.searchHistoricalRecordsClicksActivity), 
window.location.href = o;
}, o.onGetDnaKitClicked = function() {
jQuery("#top_get_dna_test_button, #dna_section_get_dna_test_button").click(function(o) {
o.preventDefault(), location.href = CompanyHomeGeneral.dnaLandingPageUrl;
});
}, o.onSignupClicked = function() {
jQuery("#signupSubmitButton").click(function(o) {
o.preventDefault(), CompanyHome.signupFormClicked();
});
}, o.onImportGedcomClicked = function() {
jQuery("#import_gedcom").click(function(o) {
o.preventDefault(), CompanyHome.importGedcomClicked();
});
}, o.onFtbDownloadClicked = function() {
jQuery("#ftb_download").click(function(o) {
o.preventDefault(), writeActivityIndicator(CompanyHomeGeneral.downloadFtbActivity), 
location.href = CompanyHomeGeneral.downloadFtbUrl;
});
}, o.validateButtons = function() {
jQuery("#signup_form, #mobile_login_form, #mobile_forgot_password_form, #mobile_signup_form").validationEngine();
}, o.onLangClicked = function() {
jQuery(".lang").click(function(o) {
o.preventDefault();
var e = {};
pk_openLanguageSelector(FamilyTreeWizardVariables.siteId, languageCode, e);
});
}, o.onLoginClicked = function() {
jQuery(".login").click(function(o) {
var e = {
popupType:"combined",
flavor:"liteSignup",
hideCheckboxTermsAndConditions:!0,
hideDescription:!0,
socialSignupPosition:window.socialSignupPosition,
shouldDefineSignupPopupContentAdjustmentFunction:!0,
extraPopupClass:"create_tree_login"
};
return o.preventDefault(), jQuery("#mobile_registration_btn").is(":visible") || (e.popupType = window.socialSignupPosition ? "combined" :"loginOnly", 
e.flavor = window.socialSignupPosition ? "liteSignup" :""), openSignupPopup(languageCode, e), 
!0;
});
}, o.onStartTreeClicked = function() {
jQuery(".startTree").click(function() {
var o = jQuery(".genealogy_ethnicity_container");
core_as_primary_product_ab_test_data && "signup_popup_ftfc" === core_as_primary_product_ab_test_data.variantName ? window.location = core_as_primary_product_ab_test_data.ppcPopupUrl :window.coreFreeTrialData && window.coreFreeTrialData.isFreeTrialExposed && window.isMobile ? (window.successfulSignupCallback = function() {
window.successfulSignupCallback = void 0, redirectToUrl(window.coreFreeTrialData.ppcCheckoutUrl, "start_free_button_mobile");
}, window.successfulLoginCallback = function() {
window.successfulLoginCallback = void 0, redirectToUrl(window.coreFreeTrialData.ppcCheckoutUrl, "start_free_button_mobile");
}, openRegularSignupPopup(window.coreFreeTrialData.signupMobileTitle, window.coreFreeTrialData.signupReason)) :jQuery("#start_your_family_tree_button").is(":visible") && !o.hasClass("show_form") ? (window.scrollTo(0, 0), 
history.pushState({
showForm:1
}, "", ""), o.addClass("move_away").delay(1e3).queue(function() {
jQuery(".genealogy_ethnicity_container").addClass("show_form").dequeue();
})) :jQuery("#mobile_registration_btn").is(":visible") || jQuery("#start_your_family_tree_button_mobile").is(":visible") ? (history.pushState({
showForm:1
}, "", ""), openRegularSignupPopup()) :window.scrollTo(0, 0);
var e = jQuery("#signup_revealer");
return e.trigger("click"), !0;
});
}, o.handleMobileButtonsClicked = function() {
jQuery("#mobile_registration_btn").click(function() {
history.pushState({
showForm:1
}, "", ""), openRegularSignupPopup();
}), jQuery("#mobile_signup_close").click(function(o) {
o.preventDefault(), history.go(-1), CompanyHome.MobileRegistration.hideMobileRegistration();
}), jQuery("#mobile_login_close, #mobile_forgot_password_close").click(CompanyHome.MobileRegistration.hideMobileRegistration), 
jQuery("#mobile_login_go_to_signup").click(CompanyHome.MobileRegistration.loginGoToSignup), 
jQuery("#mobile_login_go_to_forgot_password").click(CompanyHome.MobileRegistration.loginGoToForgotPassword), 
jQuery("#mobile_forgot_password_to_login").click(CompanyHome.MobileRegistration.forgotPasswordGoToLogin), 
jQuery("#mobile_signup_go_to_login").click(CompanyHome.MobileRegistration.signupGoToLogin);
};
}(window.CompanyHome = window.CompanyHome || {});
!function(e) {
e.imageFade = {
slideshowSpeed:15e3,
setImageFade:function() {
this.intervalHandle = setInterval(function() {
imageFade.changeImages();
}, this.slideshowSpeed);
},
changeImages:function() {
imageFade.stopImageFade(), CompanyHomeSlides.activeImg++, CompanyHomeSlides.imgListCursor++, 
CompanyHomeSlides.activeImg > 1 && (CompanyHomeSlides.activeImg = 0), CompanyHomeSlides.imgListCursor > CompanyHomeSlides.imgSrc.length - 1 && (CompanyHomeSlides.imgListCursor = 0), 
this.setQouteText(), jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).css("background-image", "url(" + CompanyHomeSlides.imgSrc[CompanyHomeSlides.imgListCursor] + ")");
var e = new Image();
e.onload = this.toggleFade, e.src = CompanyHomeSlides.imgSrc[CompanyHomeSlides.imgListCursor];
},
toggleFade:function() {
imageFade.setImageFade(), 1 == CompanyHomeSlides.activeImg ? jQuery(CompanyHomeSlides.imgList[0]).removeClass("fadein").addClass("fadeout") :jQuery(CompanyHomeSlides.imgList[0]).removeClass("fadeout").addClass("fadein");
},
init:function() {
var e = new Image();
e.onload = function() {
jQuery("#first-slide").addClass("fadein"), imageFade.setQouteText(), imageFade.startImageFade();
}, e.src = CompanyHomeSlides.imgSrc[0], jQuery("#first-slide").addClass("fadeOut").css("background-image", "url(" + CompanyHomeSlides.imgSrc[0] + ")"), 
CompanyHomeSlides.imgList = jQuery("div.slideshow .slide");
},
setQouteText:function() {
for (k = 0; k < CompanyHomeSlides.imgQuote.length; k++) {
if (CompanyHomeSlides.imgListCursor == CompanyHomeSlides.imgQuote[k].position) {
var e = jQuery('<div class="slideshow-quote"><h1>' + CompanyHomeSlides.imgQuote[k].header + "</h1><span>" + CompanyHomeSlides.imgQuote[k].whoami + "</span></div>");
jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).append(e), jQuery(e).fadeIn(1e3);
break;
}
jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).find(".slideshow-quote") && jQuery(CompanyHomeSlides.imgList[CompanyHomeSlides.activeImg]).find(".slideshow-quote").remove();
}
},
startImageFade:function() {
this.setImageFade();
},
stopImageFade:function() {
clearInterval(this.intervalHandle);
}
};
}(window);
!function(e) {
e.initVideo = function() {
function e() {
"#play_video" != window.location.hash && o(), "#signup_section" == window.location.hash && jQuery("#mobile_registration_btn").is(":visible") && CompanyHome.MobileRegistration.showMobileRegistration("signup");
}
var i = function() {
var e = jQuery("#myheritage-video");
0 == e.length && (jQuery(".video-placeholder").append('<iframe id="myheritage-video" onload="sendVimeo(\'play\')" src="//player.vimeo.com/video/' + CompanyHomeGeneral.videoUrlId + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&api=1" width="100%" height="640px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), 
e = jQuery("#myheritage-video"), n()), jQuery(".video-overlay").fadeIn(500, function() {
document.location.hash = "play_video";
var e = jQuery(".video-overlay").is(":visible");
e && sendVimeo("play");
}), a();
}, o = function() {
sendVimeo("pause"), jQuery(".video-overlay").fadeOut(500);
}, n = function() {
jQuery("#myheritage-video").height(jQuery(window).height() - 70);
}, a = function() {
jQuery.ajax({
url:CompanyHomeGeneral.reportVideoPlaybackAPI,
data:"action=reportVideoPlaybackGoal",
dataType:"json",
type:"POST",
success:function(e) {},
error:function() {}
});
}, t = function() {
sendVimeo("pause"), document.location.hash = "#";
};
jQuery(function() {
jQuery(window).bind("hashchange", e).trigger("hashchange").resize(n);
}), jQuery(".play").click(function(e) {
e.preventDefault(), i();
}), jQuery(".close").click(t), jQuery(document).keyup(function(e) {
27 == e.which && t();
});
}, e.sendVimeo = function(e) {
var i = jQuery("#myheritage-video");
if (!(i.length <= 0 || CompanyHomeGeneral.mhAppUrl)) {
var o = i.attr("src").split("?")[0], n = {
method:e
};
i[0].contentWindow.postMessage(JSON.stringify(n), "https:" + o);
}
};
}(window);
!function(e) {
function n() {
CompanyHome.spinnerData.submitButton.attr("disabled", !0);
}
function t() {
CompanyHome.spinnerData.submitButton.removeAttr("disabled");
}
e.signupFormClicked = function() {
var e = this;
e.spinnerData.submitButton = jQuery("#signupSubmitButton"), e.spinnerData.spinner = jQuery('<div class="spinner_container"></div>'), 
e.spinnerData.buttonText = e.spinnerData.submitButton.text(), n();
var i = jQuery("#signup_form"), a = i.validationEngine("validate");
if (!a) return jQuery(window).scrollTop(0), t(), !1;
var o = jQuery("#email");
if (!isEmail(o.val(), void 0, CompanyHomeGeneral.isInOffice)) return t(), setTimeout(function() {
o.addClass("errorField").validationEngine("showPrompt", "Please enter a valid email address");
}, 100), !1;
var r = o.val(), s = {
email:r
};
return this.getIsEmailInUseAjax(s), !1;
}, e.getIsEmailInUseAjax = function(e) {
var i = this;
jQuery.get(CompanyHomeGeneral.testEmailIsInUseUrl, e, function(a) {
if (a.indexOf("|") < 0) return t(), i.showFTWError(), !1;
var o = a.substr(0, a.indexOf("|"));
return o == FamilyTreeWizardConstants.FTW_SUCCESS ? (CompanyHome.getParentalConsentIfNeeded(), 
!1) :o != FamilyTreeWizardConstants.FTW_GUEST_EXCEEDED_EMAIL_IN_USE_LIMIT ? o == FamilyTreeWizardConstants.FTW_EMAIL_IS_IN_THE_SYSTEM || o == FamilyTreeWizardConstants.FTW_EMAIL_IS_IN_THE_SYSTEM_WITH_NO_SITE ? (t(), 
CompanyHome.showEmailInUseMessage(), !1) :(t(), i.showFTWError(), !1) :void i.forceRecaptchaInput().then(function(t) {
e.recaptchaToken = t, i.getIsEmailInUseAjax(e), closeNewPopup(), n();
});
}, "html").fail(function() {
return t(), i.showFTWError(), !1;
});
}, e.submitSignupForm = function() {
var e = jQuery("#signup_form"), n = new FormData(e[0]);
return this.signUpFormAjax(n), !1;
}, e.signUpFormAjax = function(e) {
var n = jQuery("#signup_form").attr("action");
jQuery.ajax({
type:"POST",
url:n,
data:e,
success:this.signUpFormCallback.bind(this, e),
contentType:!1,
dataType:"html",
processData:!1
}).fail(function() {
return t(), that.showFTWError(), !1;
});
}, e.signUpFormCallback = function(e, i) {
var a = this;
if (i.indexOf("|") < 0) t(), this.showFTWError(); else {
var o = i.substr(0, i.indexOf("|"));
o == FamilyTreeWizardConstants.FTW_SUCCESS ? (CompanyHome.trackGoogleAnalyticsRegistrationEvent(!0), 
location.href = i.substr(i.indexOf("|") + 1)) :(t(), o == FamilyTreeWizardConstants.FTW_EMAIL_IS_IN_THE_SYSTEM || o == FamilyTreeWizardConstants.FTW_EMAIL_IS_IN_THE_SYSTEM_WITH_NO_SITE ? this.showEmailInUseMessage() :o == FamilyTreeWizardConstants.FTW_GUEST_EXCEEDED_SIGNUP_LIMIT ? this.forceRecaptchaInput().then(function(t) {
e.append("recaptchaToken", t), a.signUpFormAjax(e), closeNewPopup(), n();
}) :this.showFTWError());
}
}, e.forceRecaptchaInput = function() {
return openNewPopup("/FP/Library/ReCaptchaPopup/ReCaptchaPopup.php", "&lang=" + languageCode), 
window.reCaptchaPopupDefer = $.Deferred(), reCaptchaPopupDefer.promise();
}, e.showEmailInUseMessage = function() {
var e = jQuery("#email"), n = CompanyHomeStrings.login, t = CompanyHomeStrings.fixEmailM, i = CompanyHomeStrings.EMAIL_IS_IN_THE_SYSTEM_MESSAGE_M;
jQuery("#genderF").is(":checked") && (t = CompanyHomeStrings.fixEmailF, i = CompanyHomeStrings.EMAIL_IS_IN_THE_SYSTEM_MESSAGE_F);
var a = new MH_Notice({
title:CompanyHomeStrings.EMAIL_IS_IN_THE_SYSTEM_TITLE,
message:i,
buttons:{
primary:{
text:t,
click:function() {
a.close(), e.focus();
}
},
secondary:{
text:n,
click:function() {
a.close(), openSignupPopup(languageCode, {
popupType:"loginOnly"
});
}
}
}
});
}, e.showFTWError = function() {
window.writeActivityIndicator(".Mobile", "CompanyHome"), new MH_Confirm({
message:CompanyHomeStrings.FTW_GENERAL_ERROR_MESSAGE
});
}, e.importGedcomClicked = function() {
var e = jQuery("#gedcom"), n = jQuery("#import_gedcom"), t = jQuery("#father_and_mother"), i = jQuery("#signupSubmitButton"), a = function() {
jQuery("#gedcomFile").removeAttr("disabled").focus(), i.attr("aria-label", CompanyHomeStrings.accessibilitySubmitButton), 
n.text(CompanyHomeStrings.backString), jQuery("#userGotGedcom").val("true");
}, o = function() {
i.attr("aria-label", CompanyHomeStrings.accessibilitySubmitButton + ". " + CompanyHomeStrings.accessibilitySubmitButtonGedcomDeselected), 
i.focus(), n.text(CompanyHomeStrings.importGedcomString), jQuery("#userGotGedcom").val("false"), 
jQuery("#gedcomFile").prop("disabled", "disabled");
};
t.length ? t.is(":visible") ? (t.fadeOut(300, function() {
e.fadeIn(300, function() {
a();
});
}), jQuery("#fatherLastName").removeClass("validate[required]"), jQuery("#motherLastName").removeClass("validate[required]")) :(e.fadeOut(300, function() {
t.fadeIn(300, function() {
o();
});
}), jQuery("#fatherLastName").addClass("validate[required]"), jQuery("#motherLastName").addClass("validate[required]")) :e.is(":visible") ? e.fadeOut(300, function() {
o();
}) :e.fadeIn(300, function() {
a();
});
}, e.stopButtonLoading = t, window.CompanyHomeGeneral && window.CompanyHomeGeneral.isImportGetcomContext && e.importGedcomClicked(), 
e.openSignupPopup = function(e) {
var n = {
flavor:"liteSignup",
startWith:"signup",
signupReason:"regular signup",
hideCheckboxTermsAndConditions:!0,
hideDescription:!0,
shouldDefineSignupPopupContentAdjustmentFunction:!0,
should_redirect_to_magic7:!0
};
openSignupPopup(languageCode, _.extend(n, e || {}));
};
}(window.CompanyHome = window.CompanyHome || {});
!function() {
function e(e) {
return e.length ? (e.change(function() {}), void e.trigger("change")) :void ("" == this.value ? jQuery("#" + this.id + "_styled").addClass("select-replace-empty") :jQuery("#" + this.id + "_styled").removeClass("select-replace-empty"));
}
!CompanyHomeGeneral.isUserAllowedToViewDnaContent || CompanyHomeGeneral.isGenealogyUser ? (initTextEntrance(), 
imageFade.init(), initVideo(), initArrowDownScroll()) :CompanyHomeGeneral.isUserAllowedToViewDnaContent && !CompanyHomeGeneral.isGenealogyUser && initPersonAnimation();
var o = jQuery(".genealogy_ethnicity_section_signup_form");
o.css({
display:"block"
}), jQuery("#signup_form select").styledSelect(), e(jQuery("#birthYear")), e(jQuery("#mobile_signup_gender")), 
e(jQuery("#country")), o.css({
display:""
}), CompanyHome.onGenderChange(), CompanyHome.onMobileGenderChange(), CompanyHome.enableFatherAutocomplete(), 
CompanyHome.enableEmailValidation(), CompanyHome.onImportGedcomClicked(), CompanyHome.onFtbDownloadClicked(), 
CompanyHome.onStartTreeClicked(), initBtnAnimation();
}(), jQuery(function() {
CompanyHome.validateButtons(), CompanyHome.onSignupFormClose(), CompanyHome.onSignupClicked(), 
CompanyHome.onDnaSignupClicked(), CompanyHome.onGetDnaKitClicked(), CompanyHome.onLoginClicked(), 
CompanyHome.onLangClicked(), CompanyHome.handleMobileButtonsClicked(), jQuery("#signup_form input, #signup_form select").focus(function() {
imageFade.stopImageFade();
}).blur(function() {
imageFade.startImageFade();
}), CompanyHome.performSharedDiscoveryLogic(), displayHomePageAnimations && initAnimationCenter(), 
"1" == SocialConnectPartners.isLoginWithFacebookExposed && CompanyHome.facebookConnect.init(), 
CompanyHomeGeneral.showMobileSignupPopup && CompanyHome.MobileRegistration.showMobileRegistration("signup");
}), jQuery(window).on("load", function() {
document.body.classList.add("page_loaded");
});
!function(e) {
e.getParentalConsentIfNeeded = function() {
var e = jQuery("#birthYear"), n = parseInt(e.find(" :selected").val()), a = jQuery("#mobile_signup_implicit_country"), t = a.length > 0 ? a.val() :jQuery("#mobile_signup_country").val(), r = new Date().getFullYear(), o = parseInt(n) >= r - CompanyHomeGeneral.userSensitiveAgeLimit;
if (CompanyHomeGeneral.userSensitiveAgeLimit && o) {
var i = trim(jQuery("#rootPersonFirstName").val()), l = trim(jQuery("#rootPersonLastName").val()), p = trim(jQuery("#email").val()), s = jQuery('input[name="gender"]:checked').val();
jQuery("#birthYear_styled").addClass("select-replace-empty"), e.prop("disabled", !0), 
setCookie(CompanyHomeGeneral.underAgeOnSignupCookieName, n, new Date().getTime() + 6048e5), 
openParentalConsentPopup(i + " " + l, p, n, s, t, this.parentalConsentPopupCallback, this.parentalConsentPopupNotReceivedCallback, !1, !1);
} else this.submitSignupForm();
}, e.parentalConsentPopupNotReceivedCallback = function() {
CompanyHome.displayParentalConsentErrorMessage(CompanyHomeStrings.underageByMistakeText), 
e.stopButtonLoading();
}, e.parentalConsentPopupCallback = function(e, n) {
"undefined" != typeof e && null != e && "" != e && "undefined" != typeof n && null != n && "" != n && (jQuery("#parentalConsentParentName").val(e), 
jQuery("#parentalConsentParentEmail").val(n)), CompanyHome.submitSignupForm();
}, e.displayParentalConsentErrorMessage = function(e) {
var n = jQuery("#parental_consent_message");
"" == e && n.html(e).hide(), n.html(e).show();
}, e.prepareAgeVerificationPopup = function() {
var e = parseInt(jQuery("#birthYear").find(" :selected").val()), n = trim(jQuery("#rootPersonFirstName").val()), a = trim(jQuery("#rootPersonLastName").val()), t = trim(jQuery("#email").val()), r = jQuery('input[name="gender"]:checked').val(), o = jQuery("#mobile_signup_implicit_country"), i = o.length > 0 ? o.val() :jQuery("#mobile_signup_country").val();
openAgeVerificationPopup(n + " " + a, t, e, r, i);
};
}(window.CompanyHome = window.CompanyHome || {});
!function(e) {
function a(e) {
e = e.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
var a = location.search.match(new RegExp("[?&]" + e + "=([^&]+)(&|$)"));
return a && decodeURIComponent(a[1].replace(/\+/g, " "));
}
function t(e) {
var a = "<table><tr><td>" + e.info.title + "</td></tr></table>", t = "";
t += '<div class="title">' + a + "</div>\n", t += '<div class="summary">' + e.info.summary + "</div>\n", 
t += '<div class="names">' + e.info.names + "</div>\n";
var i = "<table>";
i += '<tr><td class="text">' + t + '</td><td class="flag"></td></tr>';
for (var r = [], s = 0; s < e.images.length; s++) {
var o = e.images[s];
r.push('<img style="height:' + o.height + 'px" src="' + o.url + '">');
}
r.length > 0 && (i += '<tr><td colspan="2" class="image">' + r.join(" ") + "</td></tr>"), 
i += "</table>";
var c = '<div id="callout" class="overlay">' + i + "</div>", d = jQuery(".page-title");
d.replaceWith(c);
}
e.performSharedDiscoveryLogic = function() {
var e = a("discovery_id");
if ("company_homepage_share_discovery" === a("flow") && e) {
var i = e.split("-")[1], r = {
site:i,
discovery_match_id:e
};
jQuery(".page-title").hide(), jQuery.ajax({
dataType:"json",
url:"/FP/DiscoveryFeed/get-discovery.php",
data:r,
success:function(e) {
try {
var a = e.data;
t(a);
} catch (i) {
jQuery(".page-title").show();
}
}
});
}
};
}(window.CompanyHome = window.CompanyHome || {});
!function(n) {
n.spinnerData = {
spinnerOptions:{
lines:8,
length:4,
width:3,
radius:6,
color:"#fff",
speed:1,
trail:60,
shadow:!1
},
submitButton:null,
spinner:null,
buttonText:null
};
}(window.CompanyHome = window.CompanyHome || {});
!function(n) {
n.trackGoogleAnalyticsRegistrationEvent = function(n) {
var o = n ? "Web Registration form success" :"Web Registration form presented", t = CompanyHomeGeneral.isPhone ? "short" :"long", i = "GTM page To GA";
try {
googleAnalyticsTracking.trackEvent("Registration", o, t, void 0, void 0, i), n && (googleAnalyticsTracking.trackEvent("Signup Interaction", "Individual - Add", "Mother", null, null, i), 
googleAnalyticsTracking.trackEvent("Signup Interaction", "Individual - Add", "Father", null, null, i));
} catch (e) {}
};
}(window.CompanyHome = window.CompanyHome || {});
!function(o) {
var n = jQuery(window);
n.scroll(function() {
var o = n.scrollTop(), t = o + n.height(), e = jQuery("#community-bottom").offset().top, m = jQuery("#community-section");
t >= e && !m.hasClass("community_cream") ? m.addClass("community_cream", 1e3) :e > t && m.removeClass("community_cream", 1e3);
}), n.on("popstate", function(o) {
o.originalEvent.state && o.originalEvent.state.showForm && 1 == o.originalEvent.state.showForm ? CompanyHome.openSignupForm() :CompanyHome.closeSignupForm();
});
}(window);
!function() {
function e(e, n) {
openSignupPopup(languageCode, e), writeActivityIndicator(n.activityId);
}
function n() {
return jQuery(".company_home_free_trial_header .banner_benefits,.company_home_free_trial_header .learn_more,.company_home_free_trial_header").toggleClass("hide_banner_benefits"), 
!1;
}
var o = "company_home_free_trial_main_button", i = {
experimentName:"CompanyHome.FreeTrial.Experiment"
}, a = {
flavor:"liteSignup",
signupReason:"company home free trial",
startWith:"signup",
createTreeOnSignup:!0,
hideCheckboxTermsAndConditions:!0,
hideDescription:!0,
shouldDefineSignupPopupContentAdjustmentFunction:!0,
extraPopupClass:"companyHomeFreeTrialPopup",
onCloseByCancel:function() {
window.successfulSignupCallback = void 0, enableCssButton(o);
}
};
jQuery("#" + o).not(".start_your_tree").on("click", function() {
i.activityId = "CompanyHomeFreeTrial.Subscribe.Click", window.successfulSignupCallback = function(e, n) {
window.successfulSignupCallback = void 0, window.location.href = window.freeTrialData.checkoutUrl.replace("account_id_placeholder", n);
}, e(a, i);
}), jQuery(".company_home_free_trial_header .header_text_content .start_your_tree").on("click", function() {
i.activityId = "CompanyHomeFreeTrial.StartYourTree.Click", a.signupReason = "family tree data entry", 
window.successfulSignupCallback = function(e) {
window.successfulSignupCallback = void 0, window.location.href = window.freeTrialData.treeWizardUrl.replace("site_id", e);
}, e(a, i);
}), jQuery(".company_home_free_trial_header .learn_more").on("click", n);
}(window.CompanyHome = window.CompanyHome || {});
!function(t) {
t.homePageAnimations = [ {
selector:"#father_parents",
keyframes:[ {
position:"bottom",
style:"opacity: 0;"
}, {
position:"-30p-bottom",
style:"opacity: 1;"
} ]
}, {
selector:"#mother_parents",
keyframes:[ {
position:"bottom",
style:"opacity: 0;"
}, {
position:"-30p-bottom",
style:"opacity: 1;"
} ]
}, {
selector:".parents_connector.mother_connector",
keyframes:[ {
position:"-20p-bottom",
style:"opacity: 0; transform: scale(0);"
}, {
position:"-40p-bottom",
style:"opacity: 1; transform: scale(1);"
} ]
}, {
selector:".parents_connector.father_connector",
keyframes:[ {
position:"-20p-bottom",
style:"opacity: 0; transform: scale(0);"
}, {
position:"-40p-bottom",
style:"opacity: 1; transform: scale(1);"
} ]
}, {
selector:".parent_container.parent_mother_container",
keyframes:[ {
position:"bottom",
style:"opacity: 0; transform:scale(0.01);"
}, {
position:"-10p-bottom",
style:"opacity: 1; transform:scale(1);"
} ]
}, {
selector:"#mother",
keyframes:[ {
position:"bottom",
style:"left: 300px; transform: rotate(0); opacity: 0;"
}, {
position:"-20p-bottom",
style:"left: 0px; transform: rotate(0); opacity: 1;"
} ]
}, {
selector:".parent_container.parent_father_container",
keyframes:[ {
position:"bottom",
style:"opacity: 0; transform:scale(0.01);"
}, {
position:"-10p-bottom",
style:"opacity: 1; transform:scale(1);"
} ]
}, {
selector:"#father",
keyframes:[ {
position:"bottom",
style:"left: -300px; transform: rotate(0); opacity: 0;"
}, {
position:"-20p-bottom",
style:"left: 0px; transform: rotate(0); opacity: 1;"
} ]
}, {
selector:".parents_connector.mother_father_connector",
keyframes:[ {
position:"-20p-bottom",
style:"opacity: 0; transform: scale(0);"
}, {
position:"-40p-bottom",
style:"opacity: 1; transform: scale(1);"
} ]
}, {
selector:"#start_tree",
keyframes:[ {
position:"-20p-bottom",
style:"opacity: 0; transform: scale(0.9);"
}, {
position:"-40p-bottom",
style:"opacity: 1; transform: scale(1);"
} ]
}, {
selector:"#passport_record",
keyframes:[ {
position:"bottom-center",
style:"left: 540px; transform: rotate(-5deg);"
}, {
position:"-30-center",
style:"left: 220px; transform: rotate(0);"
} ]
}, {
selector:"#census_record",
keyframes:[ {
position:"bottom-center",
style:"left: 430px; transform: rotate(7deg);"
}, {
position:"-30-center",
style:"left: 350px; transform: rotate(0);"
} ]
}, {
selector:"#newspapers_record",
keyframes:[ {
position:"bottom-center",
style:"left: 770px; transform: rotate(3deg);"
}, {
position:"-30-center",
style:"left: 1050px; transform: rotate(0);"
} ]
}, {
selector:"#id_man_record",
keyframes:[ {
position:"bottom-center",
style:"left: 610px; transform: rotate(-5deg);"
}, {
position:"-30-center",
style:"left: 620px; transform: rotate(0);"
} ]
}, {
selector:"#id_woman_record",
keyframes:[ {
position:"bottom-center",
style:"left: 700px; transform: rotate(-4deg);"
}, {
position:"-30-center",
style:"left: 850px; transform: rotate(0);"
} ]
}, {
selector:"#railway_record",
keyframes:[ {
position:"bottom-center",
style:"left: 385px; transform: rotate(-5deg);"
}, {
position:"-30-center",
style:"left: 0px; transform: rotate(0);"
} ]
}, {
selector:"#letter_record",
keyframes:[ {
position:"bottom-center",
style:"left: 640px; transform: rotate(9deg);"
}, {
position:"-30-center",
style:"left: 720px; transform: rotate(0);"
} ]
}, {
selector:"#box_photo_family",
keyframes:[ {
position:"-300-bottom-center",
style:"left: 160px; top: 150px; transform: scale(0.7) rotate(-40deg)"
}, {
position:"-500-bottom-center",
style:"left: 210px; top: 43px; transform: scale(1) rotate(-21deg)"
} ]
}, {
selector:"#box_photo_id",
keyframes:[ {
position:"-346-bottom-center",
style:"left: 160px; top: 150px; transform: scale(0.7) rotate(1deg)"
}, {
position:"-546-bottom-center",
style:"left: 202px; top: -25px; transform: scale(1) rotate(29deg)"
} ]
}, {
selector:"#box_photo_table",
keyframes:[ {
position:"-393-bottom-center",
style:"left: 160px; top: 150px; transform: scale(0.7) rotate(-60deg)"
}, {
position:"-593-bottom-center",
style:"left: 210px; top: -68px; transform: scale(1) rotate(-32deg)"
} ]
}, {
selector:"#box_photo_portrait",
keyframes:[ {
position:"-393-bottom-center",
style:"left: 160px; top: 150px; transform: scale(0.7) rotate(60deg)"
}, {
position:"-593-bottom-center",
style:"left: 37px; top: -66px; transform: scale(1) rotate(-4deg)"
} ]
}, {
selector:"#box_photo_people",
keyframes:[ {
position:"-350-bottom-center",
style:"left: 160px; top: 150px; transform: scale(0.7) rotate(56deg)"
}, {
position:"-550-bottom-center",
style:"left: -7px; top: -9px; transform: scale(1) rotate(-16deg)"
} ]
}, {
selector:"#box_photo_cert",
keyframes:[ {
position:"-452-bottom-center",
style:"left: 160px; top: 150px; transform: scale(0.7) rotate(40deg)"
}, {
position:"-652-bottom-center",
style:"left: 68px; top: -126px; transform: scale(1) rotate(2deg)"
} ]
}, {
selector:"#box_photo_blue",
keyframes:[ {
position:"-472-bottom-center",
style:"left: 160px; top: 150px; transform: scale(0.7) rotate(40deg)"
}, {
position:"-672-bottom-center",
style:"left: 140px; top: -149px; transform: scale(1) rotate(0deg)"
} ]
}, {
selector:"#box_star1",
keyframes:[ {
position:"-230-bottom-center",
style:"left: 90px; top: 100px; transform: scale(0.5) rotate(300deg)"
}, {
position:"-430-bottom-center",
style:"left: 6px; top: 145px; transform: scale(0.5) rotate(0deg)"
} ]
}, {
selector:"#box_star2",
keyframes:[ {
position:"-380-bottom-center",
style:"left: 90px; top: 100px; transform: scale(1) rotate(300deg)"
}, {
position:"-580-bottom-center",
style:"left: -6px; top: -35px; transform: scale(1) rotate(29deg)"
} ]
}, {
selector:"#box_star3",
keyframes:[ {
position:"-330-bottom-center",
style:"left: 160px; top: 150px; transform: scale(1) rotate(100deg)"
}, {
position:"-530-bottom-center",
style:"left: 135px; top: 19px; transform: scale(1) rotate(18deg)"
} ]
}, {
selector:"#box_star4",
keyframes:[ {
position:"-480-bottom-center",
style:"left: 230px; top: 170px; transform: scale(0.6) rotate(-80deg)"
}, {
position:"-680-bottom-center",
style:"left: 314px; top: -106px; transform: scale(0.6) rotate(26deg)"
} ]
}, {
selector:"#box_star5",
keyframes:[ {
position:"-366-bottom-center",
style:"left: 260px; top: 150px; transform: scale(0.6) rotate(-160deg)"
}, {
position:"-566-bottom-center",
style:"left: 365px; top: 10px; transform: scale(0.6) rotate(2deg)"
} ]
}, {
selector:"#box_star6",
keyframes:[ {
position:"-294-bottom-center",
style:"left: 260px; top: 150px; transform: scale(0.8) rotate(-200deg)"
}, {
position:"-494-bottom-center",
style:"left: 357px; top: 58px; transform: scale(0.8) rotate(7deg)"
} ]
}, {
selector:"#web_animation",
keyframes:[ {
position:"-150-bottom-center",
style:"opacity:0.3; transform: scale(0.6)"
}, {
position:"-350-bottom-center",
style:"opacity:1;transform: scale(1)"
} ]
}, {
selector:"#mobile_animation",
keyframes:[ {
position:"-150-bottom-center",
style:"opacity:0.3; transform: scale(0.6)"
}, {
position:"-350-bottom-center",
style:"opacity:1;transform: scale(1)"
} ]
}, {
selector:"#desktop_animation",
keyframes:[ {
position:"-150-bottom-center",
style:"opacity:0.3; transform: scale(0.6)"
}, {
position:"-350-bottom-center",
style:"opacity:1;transform: scale(1)"
} ]
} ];
}(window);
function openParentalConsentPopup(e, n, a, t, i, o, r, s, l) {
e = encodeURIComponent(e), n = encodeURIComponent(n), jQuery.isFunction(o) && (parentalConsentReceivedCallback = o), 
jQuery.isFunction(r) && (parentalConsentNotReceivedCallback = r), "undefined" == typeof s && (s = !1), 
"undefined" == typeof l && (l = !0);
var u = {
OnBeforeClose:parentalConsentPopupBeforeClose,
dontAllowClosing:s
}, c = [ "userName=" + e, "userEmail=" + n, "userBirthYear=" + a, "userGender=" + t, "userCountry=" + i, "lang=" + languageCode, "isStandardPage=" + (isStandardPage ? 1 :0), "showNotMinorLink=" + (l ? 1 :0) ].join("&");
openNewPopup("/FP/Library/Privacy/Web/Ui/ParentalConsent/Popup/parentalConsentPopup.php", c, u);
}

function parentalConsentPopupBeforeClose() {
parentalConsentDetachValidation(), isParentalConsentReceived || jQuery.isFunction(parentalConsentNotReceivedCallback) && parentalConsentNotReceivedCallback();
}

function showConfirmationErrorMessage() {
jQuery("#confirmationCodeErrorMessage").fadeIn();
}

function hideConfirmationErrorMessage() {
jQuery("#confirmationCodeErrorMessage").hide();
}

function showEmailSentMessage() {
var e = jQuery("#emailSentMessage"), n = jQuery(".emailSentMessageBannerContainer");
e.html(confirmationEmailSentMessage.replace("%1", trim(jQuery("#parentEmail").val()))), 
n.slideDown();
}

function hideEmailSentMessage() {
var e = jQuery(".emailSentMessageBannerContainer");
e.hide();
}

function consentDetachValidation() {
var e = jQuery("#consentForm");
e.validationEngine("hideAll"), e.validationEngine("detach");
}

function ageDeclarationDetachValidation() {
var e = jQuery("#ageDeclarationForm");
e.validationEngine("hideAll"), e.validationEngine("detach");
}

function parentalConsentDetachValidation() {
consentDetachValidation(), ageDeclarationDetachValidation();
}

function hashCommand(e) {
window.location.hash = "mobile-" + encodeURIComponent(JSON.stringify(e));
}

function validateParentalConsent() {
var e = jQuery("#consentForm"), n = jQuery("#ageDeclarationForm");
hideConfirmationErrorMessage(), hideEmailSentMessage(), parentalConsentDetachValidation();
var a = [ e ], t = !0, i = !0;
jQuery("#consentForm input[type=text]").each(function() {
jQuery(this).val() && (t = !1);
}), t && jQuery("#consentForm input[type=checkbox]").each(function() {
jQuery(this).prop("checked") && (t = !1);
}), jQuery("#confirmationCode").val() && (i = !1), a = i ? [ e ] :[ e, n ];
for (var o = 0; o < a.length; o++) if (a[o].validationEngine({
validationEventTrigger:""
}), !a[o].validationEngine("validate")) return void enableCssButton("submitButton");
return trim(jQuery("#parentName").val()).toLowerCase() === userName.toLowerCase() ? (jQuery("#parentName").validationEngine("showPrompt", notUsingParentNameError), 
void enableCssButton("submitButton")) :trim(jQuery("#parentEmail").val()).toLowerCase() === userEmail.toLowerCase() ? (jQuery("#parentEmail").validationEngine("showPrompt", notUsingParentEmailError), 
void enableCssButton("submitButton")) :void jQuery.ajax({
url:"/FP/Library/Privacy/Web/Ui/ParentalConsent/Ajax/isEmailOfUnderaged.php",
data:{
email:jQuery("#parentEmail").val()
},
dataType:"json",
type:"POST",
success:function(e) {
return e.isUnderaged ? (jQuery("#parentEmail").validationEngine("showPrompt", notUsingParentEmailError), 
void enableCssButton("submitButton")) :void parentalConsentReceived(a);
},
error:function(e, n) {}
});
}

function parentalConsentReceived(e) {
if (e.length >= 2) jQuery.ajax({
url:"/FP/Library/Privacy/Web/Ui/ParentalConsent/Ajax/validateConfirmationCode.php",
data:{
emailAddress:userEmail,
confirmationCode:trim(jQuery("#confirmationCode").val())
},
dataType:"json",
type:"POST",
success:function(e) {
if (e.success) {
var n = trim(jQuery("#parentName").val()), a = trim(jQuery("#parentEmail").val());
if (window.clientData && window.clientData.isEmbededInMHApp) return void hashCommand({
consentFormCompleted:{
parentName:n,
parentEmail:a
}
});
if (isParentalConsentReceived = !0, closeNewPopup(), jQuery.isFunction(parentalConsentReceivedCallback)) parentalConsentReceivedCallback(n, a); else {
var t = [ "parentName=" + trim(jQuery("#parentName").val()), "parentEmail=" + trim(jQuery("#parentEmail").val()) ].join("&");
jQuery.ajax({
url:"/FP/Library/Privacy/Web/Ui/ParentalConsent/Ajax/addParentalConsent.php",
data:t,
dataType:"json",
type:"POST",
success:function(e) {
document.location.reload();
},
error:function(e, n) {}
});
}
} else showConfirmationErrorMessage(), enableCssButton("submitButton");
},
error:function(e, n) {}
}); else if (1 == e.length) {
var n = {
parentName:trim(jQuery("#parentName").val()),
parentEmail:trim(jQuery("#parentEmail").val()),
userName:userName,
userEmail:userEmail,
emailLang:languageCode
};
jQuery.ajax({
url:"/FP/Library/Privacy/Web/Ui/ParentalConsent/Ajax/sendConfirmationCodeToParent.php",
data:n,
dataType:"json",
type:"POST",
success:function(e) {
e.success && (showEmailSentMessage(), jQuery("#confirmationCode").focus(), enableCssButton("submitButton"), 
window.clientData && window.clientData.isEmbededInMHApp && document.getElementById("email_sent_message_banner_container").scrollIntoView());
},
error:function(e, n) {}
});
}
}

function openAgeVerificationPopup(e, n, a, t, i) {
var o = [ "userName=" + encodeURIComponent(e), "userEmail=" + encodeURIComponent(n), "userBirthYear=" + a, "userGender=" + t, "userCountry=" + i, "lang=" + languageCode ].join("&"), r = {
OnBeforeClose:ageVerificationPopupBeforeClose
};
openNewPopup("/FP/Library/Privacy/Web/Ui/ParentalConsent/Popup/underageByMistakePopup.php", o, r);
}

function ageVerificationPopupBeforeClose() {
jQuery("#ageValidationForm").validationEngine("hideAll");
}

function validateAgeVerification() {
var e = jQuery("#ageValidationForm");
return e.validationEngine("validate") ? void sendUnderageByMistakeMail() :void enableCssButton("submitButton");
}

function sendUnderageByMistakeMail() {
var e = jQuery("#ageValidationForm"), n = "/FP/Library/Privacy/Web/Ui/ParentalConsent/Ajax/sendUnderageByMistakeEmail.php", a = e.serialize();
jQuery.post(n, a, function(e) {
e.success && showAgeVerificationEmailSentMessage();
}, "json");
}

function showAgeVerificationEmailSentMessage() {
var e = jQuery(".emailSentMessageBannerContainer");
e.slideDown();
}

var parentalConsentReceivedCallback = null, parentalConsentNotReceivedCallback = null, isParentalConsentReceived = !1;
function initQuotesSlide() {
function e() {
jQuery(window).width() > o ? l = a.length :(l = r, h > r && (h = c));
}
function t() {
for (var e = l < y.length ? l :y.length, t = Q, n = 0; e > n; n++) {
var i = jQuery(y[n]).innerHeight() + j;
i > t && (t = i);
}
jQuery("#quotes-section .quotes").css("min-height", function() {
return t > Q ? t :Q;
});
}
function n() {
u(h, !1), h++, h >= l ? h = 0 :!1;
}
function i(e) {
var t = e.currentTarget.className, n = parseInt(t.charAt(5));
u(n, e.originalEvent), f && (f = !1, d.each(function(e) {
n != e && ($(this).attr("disabled", !0), setTimeout(function() {
d.each(function() {
$(this).removeAttr("disabled");
}), f = !0;
}, v));
}));
}
function u(e, t) {
t ? (clearInterval(g), g = setInterval(n, s), h = e) :jQuery("#quotes-section #thumb" + e).attr("checked", "checked"), 
setTimeout(function() {
jQuery("#quotes-section .slide-out").removeClass("slide-out").addClass("slide-in"), 
jQuery("#quotes-section .item" + e).removeClass("slide-in").addClass("slide-out");
}, m);
}
var s = 8e3, o = 767, r = 3, c = 5, a = jQuery('[class^="thumb"]'), l = a.length, d = jQuery('[id^="thumb"]'), h = 1, f = !0, Q = 150, j = 10, y = jQuery("#quotes-section .quotes")[0].children, m = 1600, v = 2e3, g = setInterval(n, s);
e(), t(), jQuery(window).resize(function() {
e(), t();
}), jQuery(".people").click(i);
}

jQuery(function() {
initQuotesSlide();
});
!function(e, t, r) {
"use strict";
function n(r) {
if (o = t.documentElement, a = t.body, K(), ie = this, r = r || {}, ue = r.constants || {}, 
r.easing) for (var n in r.easing) U[n] = r.easing[n];
ye = r.edgeStrategy || "set", ce = {
beforerender:r.beforerender,
render:r.render,
keyframe:r.keyframe
}, fe = r.forceHeight !== !1, fe && (Ve = r.scale || 1), me = r.mobileDeceleration || x, 
de = r.smoothScrolling !== !1, ge = r.smoothScrollingDuration || E, ve = {
targetTop:ie.getScrollTop()
}, Ge = (r.mobileCheck || function() {
return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera);
})(), Ge ? (se = t.getElementById("skrollr-body"), se && ae(), X(), De(o, [ y, S ], [ T ])) :De(o, [ y, b ], [ T ]), 
ie.refresh(), Se(e, "resize orientationchange", function() {
var e = o.clientWidth, t = o.clientHeight;
(t !== $e || e !== Me) && ($e = t, Me = e, _e = !0);
});
var i = Y();
return function l() {
Z(), be = i(l);
}(), ie;
}
var o, a, i = {
get:function() {
return ie;
},
init:function(e) {
return ie || new n(e);
},
VERSION:"0.6.26"
}, l = Object.prototype.hasOwnProperty, s = e.Math, c = e.getComputedStyle, f = "touchstart", u = "touchmove", m = "touchcancel", p = "touchend", d = "skrollable", g = d + "-before", v = d + "-between", h = d + "-after", y = "skrollr", T = "no-" + y, b = y + "-desktop", S = y + "-mobile", k = "linear", w = 1e3, x = .004, E = 200, A = "start", F = "end", C = "center", D = "bottom", H = "___skrollable_id", I = /^(?:input|textarea|button|select)$/i, P = /^\s+|\s+$/g, N = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/, O = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, V = /^(@?[a-z\-]+)\[(\w+)\]$/, z = /-([a-z0-9_])/g, q = function(e, t) {
return t.toUpperCase();
}, L = /[\-+]?[\d]*\.?[\d]+/g, M = /\{\?\}/g, $ = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g, _ = /[a-z\-]+-gradient/g, B = "", G = "", K = function() {
var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
if (c) {
var t = c(a, null);
for (var r in t) if (B = r.match(e) || +r == r && t[r].match(e)) break;
if (!B) return void (B = G = "");
B = B[0], "-" === B.slice(0, 1) ? (G = B, B = {
"-webkit-":"webkit",
"-moz-":"Moz",
"-ms-":"ms",
"-o-":"O"
}[B]) :G = "-" + B.toLowerCase() + "-";
}
}, Y = function() {
var t = e.requestAnimationFrame || e[B.toLowerCase() + "RequestAnimationFrame"], r = Pe();
return (Ge || !t) && (t = function(t) {
var n = Pe() - r, o = s.max(0, 1e3 / 60 - n);
return e.setTimeout(function() {
r = Pe(), t();
}, o);
}), t;
}, R = function() {
var t = e.cancelAnimationFrame || e[B.toLowerCase() + "CancelAnimationFrame"];
return (Ge || !t) && (t = function(t) {
return e.clearTimeout(t);
}), t;
}, U = {
begin:function() {
return 0;
},
end:function() {
return 1;
},
linear:function(e) {
return e;
},
quadratic:function(e) {
return e * e;
},
cubic:function(e) {
return e * e * e;
},
swing:function(e) {
return -s.cos(e * s.PI) / 2 + .5;
},
sqrt:function(e) {
return s.sqrt(e);
},
outCubic:function(e) {
return s.pow(e - 1, 3) + 1;
},
bounce:function(e) {
var t;
if (.5083 >= e) t = 3; else if (.8489 >= e) t = 9; else if (.96208 >= e) t = 27; else {
if (!(.99981 >= e)) return 1;
t = 91;
}
return 1 - s.abs(3 * s.cos(e * t * 1.028) / t);
}
};
n.prototype.refresh = function(e) {
var n, o, a = !1;
for (e === r ? (a = !0, le = [], Be = 0, e = t.getElementsByTagName("*")) :e.length === r && (e = [ e ]), 
n = 0, o = e.length; o > n; n++) {
var i = e[n], l = i, s = [], c = de, f = ye, u = !1;
if (a && H in i && delete i[H], i.attributes) {
for (var m = 0, p = i.attributes.length; p > m; m++) {
var g = i.attributes[m];
if ("data-anchor-target" !== g.name) if ("data-smooth-scrolling" !== g.name) if ("data-edge-strategy" !== g.name) if ("data-emit-events" !== g.name) {
var v = g.name.match(N);
if (null !== v) {
var h = {
props:g.value,
element:i,
eventType:g.name.replace(z, q)
};
s.push(h);
var y = v[1];
y && (h.constant = y.substr(1));
var T = v[2];
/p$/.test(T) ? (h.isPercentage = !0, h.offset = (0 | T.slice(0, -1)) / 100) :h.offset = 0 | T;
var b = v[3], S = v[4] || b;
b && b !== A && b !== F ? (h.mode = "relative", h.anchors = [ b, S ]) :(h.mode = "absolute", 
b === F ? h.isEnd = !0 :h.isPercentage || (h.offset = h.offset * Ve));
}
} else u = !0; else f = g.value; else c = "off" !== g.value; else if (l = t.querySelector(g.value), 
null === l) throw 'Unable to find anchor target "' + g.value + '"';
}
if (s.length) {
var k, w, x;
!a && H in i ? (x = i[H], k = le[x].styleAttr, w = le[x].classAttr) :(x = i[H] = Be++, 
k = i.style.cssText, w = Ce(i)), le[x] = {
element:i,
styleAttr:k,
classAttr:w,
anchorTarget:l,
keyFrames:s,
smoothScrolling:c,
edgeStrategy:f,
emitEvents:u,
lastFrameIndex:-1
}, De(i, [ d ], []);
}
}
}
for (Ee(), n = 0, o = e.length; o > n; n++) {
var E = le[e[n][H]];
E !== r && (J(E), ee(E));
}
return ie;
}, n.prototype.relativeToAbsolute = function(e, t, r) {
var n = o.clientHeight, a = e.getBoundingClientRect(), i = a.top, l = a.bottom - a.top;
return t === D ? i -= n :t === C && (i -= n / 2), r === D ? i += l :r === C && (i += l / 2), 
i += ie.getScrollTop(), i + .5 | 0;
}, n.prototype.animateTo = function(e, t) {
t = t || {};
var n = Pe(), o = ie.getScrollTop();
return pe = {
startTop:o,
topDiff:e - o,
targetTop:e,
duration:t.duration || w,
startTime:n,
endTime:n + (t.duration || w),
easing:U[t.easing || k],
done:t.done
}, pe.topDiff || (pe.done && pe.done.call(ie, !1), pe = r), ie;
}, n.prototype.stopAnimateTo = function() {
pe && pe.done && pe.done.call(ie, !0), pe = r;
}, n.prototype.isAnimatingTo = function() {
return !!pe;
}, n.prototype.isMobile = function() {
return Ge;
}, n.prototype.setScrollTop = function(t, r) {
return he = r === !0, Ge ? Ke = s.min(s.max(t, 0), Oe) :e.scrollTo(0, t), ie;
}, n.prototype.getScrollTop = function() {
return Ge ? Ke :e.pageYOffset || o.scrollTop || a.scrollTop || 0;
}, n.prototype.getMaxScrollTop = function() {
return Oe;
}, n.prototype.on = function(e, t) {
return ce[e] = t, ie;
}, n.prototype.off = function(e) {
return delete ce[e], ie;
}, n.prototype.destroy = function() {
var e = R();
e(be), we(), De(o, [ T ], [ y, b, S ]);
for (var t = 0, n = le.length; n > t; t++) oe(le[t].element);
o.style.overflow = a.style.overflow = "", o.style.height = a.style.height = "", 
se && i.setStyle(se, "transform", "none"), ie = r, se = r, ce = r, fe = r, Oe = 0, 
Ve = 1, ue = r, me = r, ze = "down", qe = -1, Me = 0, $e = 0, _e = !1, pe = r, de = r, 
ge = r, ve = r, he = r, Be = 0, ye = r, Ge = !1, Ke = 0, Te = r;
};
var X = function() {
var n, i, l, c, d, g, v, h, y, T, b, S;
Se(o, [ f, u, m, p ].join(" "), function(e) {
var o = e.changedTouches[0];
for (c = e.target; 3 === c.nodeType; ) c = c.parentNode;
switch (d = o.clientY, g = o.clientX, T = e.timeStamp, I.test(c.tagName) || e.preventDefault(), 
e.type) {
case f:
n && n.blur(), ie.stopAnimateTo(), n = c, i = v = d, l = g, y = T;
break;

case u:
I.test(c.tagName) && t.activeElement !== c && e.preventDefault(), h = d - v, S = T - b, 
ie.setScrollTop(Ke - h, !0), v = d, b = T;
break;

default:
case m:
case p:
var a = i - d, k = l - g, w = k * k + a * a;
if (49 > w) {
if (!I.test(n.tagName)) {
n.focus();
var x = t.createEvent("MouseEvents");
x.initMouseEvent("click", !0, !0, e.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), 
n.dispatchEvent(x);
}
return;
}
n = r;
var E = h / S;
E = s.max(s.min(E, 3), -3);
var A = s.abs(E / me), F = E * A + .5 * me * A * A, C = ie.getScrollTop() - F, D = 0;
C > Oe ? (D = (Oe - C) / F, C = Oe) :0 > C && (D = -C / F, C = 0), A *= 1 - D, ie.animateTo(C + .5 | 0, {
easing:"outCubic",
duration:A
});
}
}), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden";
}, j = function() {
var e, t, r, n, a, i, l, c, f, u, m, p = o.clientHeight, d = Ae();
for (c = 0, f = le.length; f > c; c++) for (e = le[c], t = e.element, r = e.anchorTarget, 
n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], u = l.offset, m = d[l.constant] || 0, 
l.frame = u, l.isPercentage && (u *= p, l.frame = u), "relative" === l.mode && (oe(t), 
l.frame = ie.relativeToAbsolute(r, l.anchors[0], l.anchors[1]) - u, oe(t, !0)), 
l.frame += m, fe && !l.isEnd && l.frame > Oe && (Oe = l.frame);
for (Oe = s.max(Oe, Fe()), c = 0, f = le.length; f > c; c++) {
for (e = le[c], n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], m = d[l.constant] || 0, 
l.isEnd && (l.frame = Oe - l.offset + m);
e.keyFrames.sort(Ne);
}
}, W = function(e, t) {
for (var r = 0, n = le.length; n > r; r++) {
var o, a, s = le[r], c = s.element, f = s.smoothScrolling ? e :t, u = s.keyFrames, m = u.length, p = u[0], y = u[u.length - 1], T = f < p.frame, b = f > y.frame, S = T ? p :y, k = s.emitEvents, w = s.lastFrameIndex;
if (T || b) {
if (T && -1 === s.edge || b && 1 === s.edge) continue;
switch (T ? (De(c, [ g ], [ h, v ]), k && w > -1 && (xe(c, p.eventType, ze), s.lastFrameIndex = -1)) :(De(c, [ h ], [ g, v ]), 
k && m > w && (xe(c, y.eventType, ze), s.lastFrameIndex = m)), s.edge = T ? -1 :1, 
s.edgeStrategy) {
case "reset":
oe(c);
continue;

case "ease":
f = S.frame;
break;

default:
case "set":
var x = S.props;
for (o in x) l.call(x, o) && (a = ne(x[o].value), 0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) :i.setStyle(c, o, a));
continue;
}
} else 0 !== s.edge && (De(c, [ d, v ], [ g, h ]), s.edge = 0);
for (var E = 0; m - 1 > E; E++) if (f >= u[E].frame && f <= u[E + 1].frame) {
var A = u[E], F = u[E + 1];
for (o in A.props) if (l.call(A.props, o)) {
var C = (f - A.frame) / (F.frame - A.frame);
C = A.props[o].easing(C), a = re(A.props[o].value, F.props[o].value, C), a = ne(a), 
0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) :i.setStyle(c, o, a);
}
k && w !== E && ("down" === ze ? xe(c, A.eventType, ze) :xe(c, F.eventType, ze), 
s.lastFrameIndex = E);
break;
}
}
}, Z = function() {
_e && (_e = !1, Ee());
var e, t, n = ie.getScrollTop(), o = Pe();
if (pe) o >= pe.endTime ? (n = pe.targetTop, e = pe.done, pe = r) :(t = pe.easing((o - pe.startTime) / pe.duration), 
n = pe.startTop + t * pe.topDiff | 0), ie.setScrollTop(n, !0); else if (!he) {
var a = ve.targetTop - n;
a && (ve = {
startTop:qe,
topDiff:n - qe,
targetTop:n,
startTime:Le,
endTime:Le + ge
}), o <= ve.endTime && (t = U.sqrt((o - ve.startTime) / ge), n = ve.startTop + t * ve.topDiff | 0);
}
if (Ge && se && i.setStyle(se, "transform", "translate(0, " + -Ke + "px) " + Te), 
he || qe !== n) {
ze = n > qe ? "down" :qe > n ? "up" :ze, he = !1;
var l = {
curTop:n,
lastTop:qe,
maxTop:Oe,
direction:ze
}, s = ce.beforerender && ce.beforerender.call(ie, l);
s !== !1 && (W(n, ie.getScrollTop()), qe = n, ce.render && ce.render.call(ie, l)), 
e && e.call(ie, !1);
}
Le = o;
}, J = function(e) {
for (var t = 0, r = e.keyFrames.length; r > t; t++) {
for (var n, o, a, i, l = e.keyFrames[t], s = {}; null !== (i = O.exec(l.props)); ) a = i[1], 
o = i[2], n = a.match(V), null !== n ? (a = n[1], n = n[2]) :n = k, o = o.indexOf("!") ? Q(o) :[ o.slice(1) ], 
s[a] = {
value:o,
easing:U[n]
};
l.props = s;
}
}, Q = function(e) {
var t = [];
return $.lastIndex = 0, e = e.replace($, function(e) {
return e.replace(L, function(e) {
return e / 255 * 100 + "%";
});
}), G && (_.lastIndex = 0, e = e.replace(_, function(e) {
return G + e;
})), e = e.replace(L, function(e) {
return t.push(+e), "{?}";
}), t.unshift(e), t;
}, ee = function(e) {
var t, r, n = {};
for (t = 0, r = e.keyFrames.length; r > t; t++) te(e.keyFrames[t], n);
for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) te(e.keyFrames[t], n);
}, te = function(e, t) {
var r;
for (r in t) l.call(e.props, r) || (e.props[r] = t[r]);
for (r in e.props) t[r] = e.props[r];
}, re = function(e, t, r) {
var n, o = e.length;
if (o !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
var a = [ e[0] ];
for (n = 1; o > n; n++) a[n] = e[n] + (t[n] - e[n]) * r;
return a;
}, ne = function(e) {
var t = 1;
return M.lastIndex = 0, e[0].replace(M, function() {
return e[t++];
});
}, oe = function(e, t) {
e = [].concat(e);
for (var r, n, o = 0, a = e.length; a > o; o++) n = e[o], r = le[n[H]], r && (t ? (n.style.cssText = r.dirtyStyleAttr, 
De(n, r.dirtyClassAttr)) :(r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = Ce(n), 
n.style.cssText = r.styleAttr, De(n, r.classAttr)));
}, ae = function() {
Te = "translateZ(0)", i.setStyle(se, "transform", Te);
var e = c(se), t = e.getPropertyValue("transform"), r = e.getPropertyValue(G + "transform"), n = t && "none" !== t || r && "none" !== r;
n || (Te = "");
};
i.setStyle = function(e, t, r) {
var n = e.style;
if (t = t.replace(z, q).replace("-", ""), "zIndex" === t) isNaN(r) ? n[t] = r :n[t] = "" + (0 | r); else if ("float" === t) n.styleFloat = n.cssFloat = r; else try {
B && (n[B + t.slice(0, 1).toUpperCase() + t.slice(1)] = r), n[t] = r;
} catch (o) {}
};
var ie, le, se, ce, fe, ue, me, pe, de, ge, ve, he, ye, Te, be, Se = i.addEvent = function(t, r, n) {
var o = function(t) {
return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function() {
t.returnValue = !1, t.defaultPrevented = !0;
}), n.call(this, t);
};
r = r.split(" ");
for (var a, i = 0, l = r.length; l > i; i++) a = r[i], t.addEventListener ? t.addEventListener(a, n, !1) :t.attachEvent("on" + a, o), 
Ye.push({
element:t,
name:a,
listener:n
});
}, ke = i.removeEvent = function(e, t, r) {
t = t.split(" ");
for (var n = 0, o = t.length; o > n; n++) e.removeEventListener ? e.removeEventListener(t[n], r, !1) :e.detachEvent("on" + t[n], r);
}, we = function() {
for (var e, t = 0, r = Ye.length; r > t; t++) e = Ye[t], ke(e.element, e.name, e.listener);
Ye = [];
}, xe = function(e, t, r) {
ce.keyframe && ce.keyframe.call(ie, e, t, r);
}, Ee = function() {
var e = ie.getScrollTop();
Oe = 0, fe && !Ge && (a.style.height = ""), j(), fe && !Ge && (a.style.height = Oe + o.clientHeight + "px"), 
Ge ? ie.setScrollTop(s.min(ie.getScrollTop(), Oe)) :ie.setScrollTop(e, !0), he = !0;
}, Ae = function() {
var e, t, r = o.clientHeight, n = {};
for (e in ue) t = ue[e], "function" == typeof t ? t = t.call(ie) :/p$/.test(t) && (t = t.slice(0, -1) / 100 * r), 
n[e] = t;
return n;
}, Fe = function() {
var e = se && se.offsetHeight || 0, t = s.max(e, a.scrollHeight, a.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight);
return t - o.clientHeight;
}, Ce = function(t) {
var r = "className";
return e.SVGElement && t instanceof e.SVGElement && (t = t[r], r = "baseVal"), t[r];
}, De = function(t, n, o) {
var a = "className";
if (e.SVGElement && t instanceof e.SVGElement && (t = t[a], a = "baseVal"), o === r) return void (t[a] = n);
for (var i = t[a], l = 0, s = o.length; s > l; l++) i = Ie(i).replace(Ie(o[l]), " ");
i = He(i);
for (var c = 0, f = n.length; f > c; c++) -1 === Ie(i).indexOf(Ie(n[c])) && (i += " " + n[c]);
t[a] = He(i);
}, He = function(e) {
return e.replace(P, "");
}, Ie = function(e) {
return " " + e + " ";
}, Pe = Date.now || function() {
return +new Date();
}, Ne = function(e, t) {
return e.frame - t.frame;
}, Oe = 0, Ve = 1, ze = "down", qe = -1, Le = Pe(), Me = 0, $e = 0, _e = !1, Be = 0, Ge = !1, Ke = 0, Ye = [];
"function" == typeof define && define.amd ? define([], function() {
return i;
}) :"undefined" != typeof module && module.exports ? module.exports = i :e.skrollr = i;
}(window, document);
!function(n) {
function t() {}
t.prototype.applyAnimation = function(n, t) {
var i = jQuery(n);
_.each(t, function(n) {
n instanceof Object && i.attr("data-" + n.position, n.style);
});
}, t.prototype.applyAnimationsList = function(n) {
var t = this;
_.each(n, function(n) {
t.applyAnimation(n.selector, n.keyframes);
});
}, n.SkrollrAnimations = t;
}(window);
function trim(e) {
return e.replace(/^\s*|\s*$/g, "");
}

setCookie("userTimezone", new Date().getTimezoneOffset());
function _togglePasswordInputVisibility(t, e, i, o) {
var n = _passwordInputVisibilityService(t), s = document.querySelector(e);
s.textContent = "text" === n ? o :i;
}

function _setPasswordButtonVisibility(t, e) {
var i = document.querySelector(t), o = document.querySelector(e);
o.style.visibility = i.value ? "visible" :"hidden";
}
"use strict";

function _passwordInputVisibilityService(t) {
var e = "password", r = "text", i = "type", s = document.querySelector(t), u = s.getAttribute(i), c = u === r ? e :r;
return s.setAttribute(i, c), c;
}
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
