/* #vfic now: 30 Aug 2019 13:18:59 on web268 */ 
!function(e) {
e.fn.autoResize = function(n) {
var t = e.extend({
extraSpace:20
}, n);
return this.filter("textarea").each(function() {
var n = e(this).css({
resize:"none",
"overflow-y":"hidden"
}), i = n.height(), r = /\n/g, a = "<br>", s = function() {
var t = [ "width", "font-family", "font-size", "lineHeight", "textDecoration", "letterSpacing" ], i = {};
return e.each(t, function(e, t) {
i[t] = n.css(t);
}), jQuery("<div/>").css("display", "none").css("word-wrap", "break-word").css(i).insertBefore(n);
}(), c = function() {
var c = s.text(e(this).val()).html();
if (c = c.replace(r, a).replace(), s.html(c), "" == c) var h = i; else var h = Math.max(n.height(), s.height() + t.extraSpace);
n.css("height", h);
};
n.unbind(".dynSiz").bind("keyup.dynSiz", c).bind("keydown.dynSiz", c).bind("change.dynSiz", c);
}), this;
};
}(jQuery);
!function(e) {
function t() {
this.initialize.apply(this, arguments);
}
function o(o, i, s) {
function a(e, t, o, i, n, s) {
var a = Math.round(i / 1.7320508);
t.inactive()["setBorder" + o.camel.pos.f](i)["setBorder" + o.camel.pos.c1](a)["setBorder" + o.camel.pos.c2](a)["set" + o.camel.pos.p1](o.isTopLeft ? -i :e.inner[o.size.p])["set" + o.camel.pos.c1](e.inner[o.size.c] / 2 - a).active().$.css("border-" + o.pos.f + "-color", n), 
s && (o.isTopLeft ? (t.$.css("height", i), t.$.css("width", 2 * a)) :(t.$.css("height", 2 * a), 
t.$.css("width", i)));
}
i.stop(!0, !0);
var r, l, p = {
position:"absolute",
border:"solid 0 transparent"
}, c = new t(o), d = new t(i);
if (s.ieQuirks ? p.overflow = "hidden" :(p.height = "0", p.width = "0"), d.setTop(-s.offsetY + (s.position && s.position.indexOf("top") >= 0 ? c.top - d.height :s.position && s.position.indexOf("bottom") >= 0 ? c.bottom :c.center.top - d.height / 2)), 
d.setLeft(s.offsetX + (s.position && s.position.indexOf("left") >= 0 ? c.left - d.width :s.position && s.position.indexOf("right") >= 0 ? c.right :c.center.left - d.width / 2)), 
s.tipSize > 0) {
i.data("outerTip") && (i.data("outerTip").remove(), i.removeData("outerTip")), i.data("innerTip") && (i.data("innerTip").remove(), 
i.removeData("innerTip")), r = new t(e("<div>").css(p).appendTo(i)), l = new t(e("<div>").css(p).appendTo(i));
var f;
if (s.autoTipPosition) for (var u = 0; u < n.pos.length; u++) {
if (f = n.getRelativeNames(u), d.center[f.pos.c1] >= c[f.pos.c1] && d.center[f.pos.c1] <= c[f.pos.c2]) if (u % 2 == 0) {
if (d[f.pos.o] >= c[f.pos.o] && d[f.pos.f] >= c[f.pos.f]) break;
} else if (d[f.pos.o] <= c[f.pos.o] && d[f.pos.f] <= c[f.pos.f]) break;
f = null;
} else f = n.getRelativeNames(n.pos.indexOf(s.tipPosition));
f ? (d["set" + f.camel.pos.p1](d[f.pos.p1] + (f.isTopLeft ? 1 :-1) * (s.tipSize - d["border" + f.camel.pos.o])), 
a(d, r, f, s.tipSize, i.css("border-" + f.pos.o + "-color"), s.ieQuirks), a(d, l, f, s.tipSize - 2 * d["border" + f.camel.pos.o], i.css("background-color"), s.ieQuirks), 
i.data("outerTip", r.$).data("innerTip", l.$)) :e.each([ r.$, l.$ ], function() {
this.remove();
});
}
}
function i(t, o) {
var i = t.data("balloon") && t.data("balloon").get(0);
return !(i && (i == o.relatedTarget || e.contains(i, o.relatedTarget)));
}
var n = {};
n.pos = e.extend([ "top", "bottom", "left", "right" ], {
camel:[ "Top", "Bottom", "Left", "Right" ]
}), n.size = e.extend([ "height", "width" ], {
camel:[ "Height", "Width" ]
}), n.getRelativeNames = function(e) {
var t = {
pos:{
o:e,
f:e % 2 == 0 ? e + 1 :e - 1,
p1:e % 2 == 0 ? e :e - 1,
p2:e % 2 == 0 ? e + 1 :e,
c1:2 > e ? 2 :0,
c2:2 > e ? 3 :1
},
size:{
p:2 > e ? 0 :1,
c:2 > e ? 1 :0
}
}, o = {};
for (var i in t) {
o[i] || (o[i] = {});
for (var s in t[i]) o[i][s] = n[i][t[i][s]], o.camel || (o.camel = {}), o.camel[i] || (o.camel[i] = {}), 
o.camel[i][s] = n[i].camel[t[i][s]];
}
return o.isTopLeft = o.pos.o == o.pos.p1, o;
}, function() {
function o(e, t) {
if (void 0 == t) return o(e, !0), o(e, !1);
var i = n.getRelativeNames(t ? 0 :2);
return e[i.size.p] = e.$["outer" + i.camel.size.p](), e[i.pos.f] = e[i.pos.o] + e[i.size.p], 
e.center[i.pos.o] = e[i.pos.o] + e[i.size.p] / 2, e.inner[i.pos.o] = e[i.pos.o] + e["border" + i.camel.pos.o], 
e.inner[i.size.p] = e.$["inner" + i.camel.size.p](), e.inner[i.pos.f] = e.inner[i.pos.o] + e.inner[i.size.p], 
e.inner.center[i.pos.o] = e.inner[i.pos.f] + e.inner[i.size.p] / 2, e;
}
var i = {
setBorder:function(e, t) {
return function(i) {
return this.$.css("border-" + e.toLowerCase() + "-width", i + "px"), this["border" + e] = i, 
this.isActive ? o(this, t) :this;
};
},
setPosition:function(e, t) {
return function(i) {
return this.$.css(e.toLowerCase(), i + "px"), this[e.toLowerCase()] = i, this.isActive ? o(this, t) :this;
};
}
};
t.prototype = {
initialize:function(t) {
this.$ = t, e.extend(!0, this, this.$.offset(), {
center:{},
inner:{
center:{}
}
});
for (var o = 0; o < n.pos.length; o++) this["border" + n.pos.camel[o]] = parseInt(this.$.css("border-" + n.pos[o] + "-width")) || 0;
this.active();
},
active:function() {
return this.isActive = !0, o(this), this;
},
inactive:function() {
return this.isActive = !1, this;
}
};
for (var s = 0; s < n.pos.length; s++) t.prototype["setBorder" + n.pos.camel[s]] = i.setBorder(n.pos.camel[s], 2 > s), 
s % 2 == 0 && (t.prototype["set" + n.pos.camel[s]] = i.setPosition(n.pos.camel[s], 2 > s));
}(), e.fn.balloon = function(t) {
return t = e.extend(!0, {}, e.balloon.defaults, t), this.one("mouseenter", function(o) {
var n = e(this), s = this, a = n.unbind("mouseenter", arguments.callee).showBalloon(t).mouseenter(function(e) {
i(n, e) && n.showBalloon();
}).data("balloon");
a && a.mouseleave(function(t) {
s == t.relatedTarget || e.contains(s, t.relatedTarget) || n.hideBalloon();
}).mouseenter(function(e) {
n.showBalloon();
});
}).mouseleave(function(t) {
var o = e(this);
i(o, t) && o.hideBalloon();
});
}, e.fn.showBalloon = function(t) {
var i, n, s, a;
return e.balloon.defaults.css || (e.balloon.defaults.css = {}), (t || !this.data("options")) && this.data("options", e.extend(!0, {}, e.balloon.defaults, t)), 
t = this.data("options"), this.each(function() {
i = e(this), (s = i.data("onTimer")) && clearTimeout(s), (a = i.data("offTimer")) && clearTimeout(a);
var r = e.isFunction(t.contents) ? t.contents() :t.contents || i.attr("title"), l = !(n = i.data("balloon"));
l && (n = e("<div>").append(r)), (t.url || n && "" != n.html()) && (!l && r && r != n.html() && n.empty().append(r), 
i.removeAttr("title"), t.url && n.load(e.isFunction(t.url) ? t.url(this) :t.url, function(e, s, a) {
t.ajaxComplete && t.ajaxComplete(e, s, a), o(i, n, t);
}), l ? (n.addClass(t.classname).css({
visibility:"hidden",
position:"absolute"
}).appendTo("body"), i.data("balloon", n), o(i, n, t), n.hide().css("visibility", "visible")) :o(i, n, t), 
i.data("onTimer", setTimeout(function() {
t.showAnimation ? t.showAnimation.apply(n.stop(!0, !0), [ t.showDuration ]) :n.show(t.showDuration, function() {
this.style.removeAttribute && this.style.removeAttribute("filter");
});
}, t.delay)));
});
}, e.fn.hideBalloon = function() {
var t, o, i = this.data("options");
return "undefined" == typeof i ? void ("undefined" == typeof t && "undefined" == typeof o && e(".warning_tooltip").remove()) :this.each(function() {
var n = e(this), s = n.data("balloon");
(!s || 0 != i.delay || s.is(":visible")) && ((t = n.data("onTimer")) && clearTimeout(t), 
(o = n.data("offTimer")) && clearTimeout(o), n.data("offTimer", setTimeout(function() {
var e = n.data("balloon");
i.hideAnimation ? e && i.hideAnimation.apply(e.stop(!0, !0), [ i.hideDuration ]) :e && e.stop(!0, !0).hide(i.hideDuration);
}, i.minLifetime)));
});
}, e.balloon = {
defaults:{
contents:null,
url:null,
ajaxComplete:null,
classname:"balloonStyle",
position:"top",
offsetX:0,
offsetY:0,
tipSize:12,
autoTipPosition:!0,
tipPosition:"bottom",
delay:0,
minLifetime:200,
showDuration:"fast",
showAnimation:function(e) {
this.fadeIn(e);
},
hideDuration:"fast",
hideAnimation:function(e) {
this.fadeOut(e);
},
ieQuirks:!1
}
};
}(jQuery);
!function(e, t, i) {
function o(i, o, n) {
var h = t.createElement(i);
return o && (h.id = J + o), n && (h.style.cssText = n), e(h);
}
function n(e) {
var t = b.length, i = (R + e) % t;
return 0 > i ? t + i :i;
}
function h(e, t) {
return Math.round((/%/.test(e) ? ("x" === t ? C.width() :C.height()) / 100 :1) * parseInt(e, 10));
}
function s(e) {
return D.photo || /\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(e);
}
function r() {
var t;
D = e.extend({}, e.data(P, $));
for (t in D) e.isFunction(D[t]) && "on" !== t.slice(0, 2) && (D[t] = D[t].call(P));
D.rel = D.rel || P.rel || "nofollow", D.href = D.href || e(P).attr("href"), D.title = D.title || P.title, 
"string" == typeof D.href && (D.href = e.trim(D.href));
}
function l(i, o) {
e(t).trigger(i), o && o.call(P);
}
function a() {
var e, t, i, o = J + "Slideshow_", n = "click." + J;
D.slideshow && b[1] ? (t = function() {
I.text(D.slideshowStop).unbind(n).bind(Z, function() {
(D.loop || b[R + 1]) && (e = setTimeout(N.next, D.slideshowSpeed));
}).bind(Y, function() {
clearTimeout(e);
}).one(n + " " + ee, i), p.removeClass(o + "off").addClass(o + "on"), e = setTimeout(N.next, D.slideshowSpeed);
}, i = function() {
clearTimeout(e), I.text(D.slideshowStart).unbind([ Z, Y, ee, n ].join(" ")).one(n, function() {
N.next(), t();
}), p.removeClass(o + "on").addClass(o + "off");
}, D.slideshowAuto ? t() :i()) :p.removeClass(o + "off " + o + "on");
}
function d(t) {
q || (P = t, r(), b = e(P), R = 0, "nofollow" !== D.rel && (b = e("." + U).filter(function() {
var t = e.data(this, $).rel || this.rel;
return t === D.rel;
}), R = b.index(P), -1 === R && (b = b.add(P), R = b.length - 1)), z || (z = A = !0, 
p.show(), D.returnFocus && e(P).blur().one(te, function() {
e(this).focus();
}), u.css({
opacity:+D.opacity,
cursor:D.overlayClose ? "pointer" :"auto"
}).show(), D.w = h(D.initialWidth, "x"), D.h = h(D.initialHeight, "y"), N.position(), 
l(X, D.onOpen), _.add(k).hide(), K.html(D.close).show()), N.load(!0));
}
function c() {
!p && t.body && (Q = !1, C = e(i), p = o(ne).attr({
id:$,
"class":oe ? J + "IE" :""
}).hide(), u = o(ne, "Overlay").hide(), w = o(ne, "Wrapper"), m = o(ne, "Content").append(T = o(ne, "LoadedContent", "width:0; height:0; overflow:hidden"), H = o(ne, "LoadingOverlay").add(o(ne, "LoadingGraphic")), k = o(ne, "Title"), M = o(ne, "Current"), L = o(ne, "Next"), S = o(ne, "Previous"), I = o(ne, "Slideshow").bind(X, a), K = o(ne, "Close")), 
w.append(o(ne).append(o(ne, "TopLeft"), g = o(ne, "TopCenter"), o(ne, "TopRight")), o(ne, !1, "clear:left").append(x = o(ne, "MiddleLeft"), m, y = o(ne, "MiddleRight")), o(ne, !1, "clear:left").append(o(ne, "BottomLeft"), v = o(ne, "BottomCenter"), o(ne, "BottomRight"))).find("div div").css({
"float":"left"
}), W = o(ne, !1, "position:absolute; width:9999px; visibility:hidden; display:none"), 
_ = L.add(S).add(M).add(I), e(t.body).append(u, p.append(w, W)));
}
function f() {
return p ? (Q || (Q = !0, E = g.height() + v.height() + m.outerHeight(!0) - m.height(), 
B = x.width() + y.width() + m.outerWidth(!0) - m.width(), F = T.outerHeight(!0), 
O = T.outerWidth(!0), p.css({
"padding-bottom":E,
"padding-right":B
}), L.click(function() {
N.next();
}), S.click(function() {
N.prev();
}), K.click(function() {
N.close();
}), u.click(function() {
D.overlayClose && N.close();
}), e(t).bind("keydown." + J, function(e) {
var t = e.keyCode;
z && D.escKey && 27 === t && (e.preventDefault(), N.close()), z && D.arrowKey && b[1] && (37 === t ? (e.preventDefault(), 
S.click()) :39 === t && (e.preventDefault(), L.click()));
}), e(t).on("click", "." + U, function(e) {
e.which > 1 || e.shiftKey || e.altKey || e.metaKey || (e.preventDefault(), d(this));
})), !0) :!1;
}
var u, p, w, m, g, x, y, v, b, C, T, W, H, k, M, I, L, S, K, _, D, E, B, F, O, P, R, j, z, A, q, G, N, Q, V = {
transition:"elastic",
speed:300,
width:!1,
initialWidth:"600",
innerWidth:!1,
maxWidth:!1,
height:!1,
initialHeight:"450",
innerHeight:!1,
maxHeight:!1,
scalePhotos:!0,
scrolling:!0,
inline:!1,
html:!1,
iframe:!1,
fastIframe:!0,
photo:!1,
href:!1,
title:!1,
rel:!1,
opacity:.9,
preloading:!0,
current:"image {current} of {total}",
previous:"previous",
next:"next",
close:"close",
open:!1,
returnFocus:!0,
reposition:!0,
loop:!0,
slideshow:!1,
slideshowAuto:!0,
slideshowSpeed:2500,
slideshowStart:"start slideshow",
slideshowStop:"stop slideshow",
onOpen:!1,
onLoad:!1,
onComplete:!1,
onCleanup:!1,
onClosed:!1,
overlayClose:!0,
escKey:!0,
arrowKey:!0,
top:!1,
bottom:!1,
left:!1,
right:!1,
fixed:!1,
data:void 0
}, $ = "colorbox", J = "cbox", U = J + "Element", X = J + "_open", Y = J + "_load", Z = J + "_complete", ee = J + "_cleanup", te = J + "_closed", ie = J + "_purge", oe = -1 != i.navigator.appVersion.indexOf("MSIE"), ne = "div";
e.colorbox || (e(c), N = e.fn[$] = e[$] = function(t, i) {
var o = this;
if (t = t || {}, c(), f()) {
if (!o[0]) {
if (o.selector) return o;
o = e("<a/>"), t.open = !0;
}
i && (t.onComplete = i), o.each(function() {
e.data(this, $, e.extend({}, e.data(this, $) || V, t));
}).addClass(U), (e.isFunction(t.open) && t.open.call(o) || t.open) && d(o[0]);
}
return o;
}, N.position = function(e, t) {
function i(e) {
g[0].style.width = v[0].style.width = m[0].style.width = e.style.width, m[0].style.height = x[0].style.height = y[0].style.height = e.style.height;
}
var o = 0, n = 0, s = p.offset(), r = C.scrollTop(), l = C.scrollLeft();
C.unbind("resize." + J), p.css({
top:-9e4,
left:-9e4
}), D.fixed ? (s.top -= r, s.left -= l, p.css({
position:"fixed"
})) :(o = r, n = l, p.css({
position:"absolute"
})), n += D.right !== !1 ? Math.max(C.width() - D.w - O - B - h(D.right, "x"), 0) :D.left !== !1 ? h(D.left, "x") :Math.round(Math.max(C.width() - D.w - O - B, 0) / 2), 
o += D.bottom !== !1 ? Math.max(C.height() - D.h - F - E - h(D.bottom, "y"), 0) :D.top !== !1 ? h(D.top, "y") :Math.round(Math.max(C.height() - D.h - F - E, 0) / 2), 
p.css({
top:s.top,
left:s.left
}), e = p.width() === D.w + O && p.height() === D.h + F ? 0 :e || 0, w[0].style.width = w[0].style.height = "9999px", 
p.dequeue().animate({
width:D.w + O,
height:D.h + F,
top:o,
left:n
}, {
duration:e,
complete:function() {
i(this), A = !1, w[0].style.width = D.w + O + B + "px", w[0].style.height = D.h + F + E + "px", 
D.reposition && setTimeout(function() {
C.bind("resize." + J, N.position);
}, 1), t && t();
},
step:function() {
i(this);
}
});
}, N.resize = function(e) {
z && (e = e || {}, e.width && (D.w = h(e.width, "x") - O - B), e.innerWidth && (D.w = h(e.innerWidth, "x")), 
T.css({
width:D.w
}), e.height && (D.h = h(e.height, "y") - F - E), e.innerHeight && (D.h = h(e.innerHeight, "y")), 
e.innerHeight || e.height || (T.css({
height:"auto"
}), D.h = T.height()), T.css({
height:D.h
}), N.position("none" === D.transition ? 0 :D.speed));
}, N.prep = function(t) {
function i() {
return D.w = D.w || T.width(), D.w = D.mw && D.mw < D.w ? D.mw :D.w, D.w;
}
function h() {
return D.h = D.h || T.height(), D.h = D.mh && D.mh < D.h ? D.mh :D.h, D.h;
}
if (z) {
var r, a = "none" === D.transition ? 0 :D.speed;
T.remove(), T = o(ne, "LoadedContent").append(t), T.hide().appendTo(W.show()).css({
width:i(),
overflow:D.scrolling ? "auto" :"hidden"
}).css({
height:h()
}).prependTo(m), W.hide(), e(j).css({
"float":"none"
}), r = function() {
function t() {
oe && p[0].style.removeAttribute("filter");
}
var i, h, r, d, c, f, u = b.length, w = "frameBorder", m = "allowTransparency";
if (z) {
if (d = function() {
clearTimeout(G), H.hide(), l(Z, D.onComplete);
}, oe && j && T.fadeIn(100), k.html(D.title).add(T).show(), u > 1) {
if ("string" == typeof D.current && M.html(D.current.replace("{current}", R + 1).replace("{total}", u)).show(), 
L[D.loop || u - 1 > R ? "show" :"hide"]().html(D.next), S[D.loop || R ? "show" :"hide"]().html(D.previous), 
D.slideshow && I.show(), D.preloading) for (i = [ n(-1), n(1) ]; h = b[i.pop()]; ) c = e.data(h, $).href || h.href, 
e.isFunction(c) && (c = c.call(h)), s(c) && (f = new Image(), f.src = c);
} else _.hide();
D.iframe ? (r = o("iframe")[0], w in r && (r[w] = 0), m in r && (r[m] = "true"), 
r.name = J + +new Date(), D.fastIframe ? d() :e(r).one("load", d), r.src = D.href, 
D.scrolling || (r.scrolling = "no"), e(r).addClass(J + "Iframe").appendTo(T).one(ie, function() {
r.src = "//about:blank";
})) :d(), "fade" === D.transition ? p.fadeTo(a, 1, t) :t();
}
}, "fade" === D.transition ? p.fadeTo(a, 0, function() {
N.position(0, r);
}) :N.position(a, r);
}
}, N.load = function(t) {
var i, n, a = N.prep;
A = !0, j = !1, P = b[R], t || r(), l(ie), l(Y, D.onLoad), D.h = D.height ? h(D.height, "y") - F - E :D.innerHeight && h(D.innerHeight, "y"), 
D.w = D.width ? h(D.width, "x") - O - B :D.innerWidth && h(D.innerWidth, "x"), D.mw = D.w, 
D.mh = D.h, D.maxWidth && (D.mw = h(D.maxWidth, "x") - O - B, D.mw = D.w && D.w < D.mw ? D.w :D.mw), 
D.maxHeight && (D.mh = h(D.maxHeight, "y") - F - E, D.mh = D.h && D.h < D.mh ? D.h :D.mh), 
i = D.href, G = setTimeout(function() {
H.show();
}, 100), D.inline ? (o(ne).hide().insertBefore(e(i)[0]).one(ie, function() {
e(this).replaceWith(T.children());
}), a(e(i))) :D.iframe ? a(" ") :D.html ? a(D.html) :s(i) ? (e(j = new Image()).addClass(J + "Photo").error(function() {
D.title = !1, a(o(ne, "Error").text("This image could not be loaded"));
}).load(function() {
var e;
j.onload = null, D.scalePhotos && (n = function() {
j.height -= j.height * e, j.width -= j.width * e;
}, D.mw && j.width > D.mw && (e = (j.width - D.mw) / j.width, n()), D.mh && j.height > D.mh && (e = (j.height - D.mh) / j.height, 
n())), D.h && (j.style.marginTop = Math.max(D.h - j.height, 0) / 2 + "px"), b[1] && (D.loop || b[R + 1]) && (j.style.cursor = "pointer", 
j.onclick = function() {
N.next();
}), oe && (j.style.msInterpolationMode = "bicubic"), setTimeout(function() {
a(j);
}, 1);
}), setTimeout(function() {
j.src = i;
}, 1)) :i && W.load(i, D.data, function(t, i, n) {
a("error" === i ? o(ne, "Error").text("Request unsuccessful: " + n.statusText) :e(this).contents());
});
}, N.next = function() {
!A && b[1] && (D.loop || b[R + 1]) && (R = n(1), N.load());
}, N.prev = function() {
!A && b[1] && (D.loop || R) && (R = n(-1), N.load());
}, N.close = function() {
z && !q && (q = !0, z = !1, l(ee, D.onCleanup), u.fadeTo(200, 0), p.stop().fadeTo(300, 0, function() {
p.add(u).css({
opacity:1,
cursor:"auto"
}).hide(), l(ie), setTimeout(function() {
q = !1, l(te, D.onClosed), T.remove();
}, 1);
}));
}, N.remove = function() {
e([]).add(p).add(u).remove(), p = null, e("." + U).removeData($).removeClass(U).off();
}, N.element = function() {
return e(P);
}, N.settings = V);
}(jQuery, document, this);
!function(t) {
function i(i) {
this.options = t.extend({
slides:"ul.slideset > li",
activeClass:"active",
disabledClass:"disabled",
btnPrev:"a.btn-prev",
btnNext:"a.btn-next",
generatePagination:!1,
pagerList:"<ul>",
pagerListItem:'<li><a href="#"></a></li>',
pagerListItemText:"a",
pagerLinks:".pagination li",
currentNumber:"span.current-num",
totalNumber:"span.total-num",
btnPlay:".btn-play",
btnPause:".btn-pause",
btnPlayPause:".btn-play-pause",
galleryReadyClass:"gallery-js-ready",
autorotationActiveClass:"autorotation-active",
autorotationDisabledClass:"autorotation-disabled",
autorotationStopAfterClick:!1,
circularRotation:!0,
switchSimultaneously:!0,
disableWhileAnimating:!1,
disableFadeIE:!1,
autoRotation:!1,
pauseOnHover:!0,
autoHeight:!1,
useSwipe:!1,
swipeThreshold:15,
switchTime:4e3,
animSpeed:600,
event:"click"
}, i), this.init();
}
i.prototype = {
init:function() {
this.options.holder && (this.findElements(), this.attachEvents(), this.refreshState(!0), 
this.autoRotate(), this.makeCallback("onInit", this));
},
findElements:function() {
if (this.gallery = t(this.options.holder).addClass(this.options.galleryReadyClass), 
this.slides = this.gallery.find(this.options.slides), this.slidesHolder = this.slides.eq(0).parent(), 
this.stepsCount = this.slides.length, this.btnPrev = this.gallery.find(this.options.btnPrev), 
this.btnNext = this.gallery.find(this.options.btnNext), this.currentIndex = 0, this.options.disableFadeIE && !t.support.opacity && (this.options.animSpeed = 0), 
"string" == typeof this.options.generatePagination) {
this.pagerHolder = this.gallery.find(this.options.generatePagination).empty(), this.pagerList = t(this.options.pagerList).appendTo(this.pagerHolder);
for (var i = 0; i < this.stepsCount; i++) t(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i + 1);
this.pagerLinks = this.pagerList.children();
} else this.pagerLinks = this.gallery.find(this.options.pagerLinks);
var e = this.slides.filter("." + this.options.activeClass);
e.length && (this.currentIndex = this.slides.index(e)), this.prevIndex = this.currentIndex, 
this.btnPlay = this.gallery.find(this.options.btnPlay), this.btnPause = this.gallery.find(this.options.btnPause), 
this.btnPlayPause = this.gallery.find(this.options.btnPlayPause), this.curNum = this.gallery.find(this.options.currentNumber), 
this.allNum = this.gallery.find(this.options.totalNumber), this.slides.css({
display:"block",
opacity:0
}).eq(this.currentIndex).css({
opacity:""
});
},
attachEvents:function() {
var i = this;
this.resizeHandler = function() {
i.onWindowResize();
}, t(window).bind("load resize orientationchange", this.resizeHandler), this.btnPrev.length && (this.btnPrevHandler = function(t) {
t.preventDefault(), i.prevSlide(), i.options.autorotationStopAfterClick && i.stopRotation();
}, this.btnPrev.bind(this.options.event, this.btnPrevHandler)), this.btnNext.length && (this.btnNextHandler = function(t) {
t.preventDefault(), i.nextSlide(), i.options.autorotationStopAfterClick && i.stopRotation();
}, this.btnNext.bind(this.options.event, this.btnNextHandler)), this.pagerLinks.length && (this.pagerLinksHandler = function(t) {
t.preventDefault(), i.numSlide(i.pagerLinks.index(t.currentTarget)), i.options.autorotationStopAfterClick && i.stopRotation();
}, this.pagerLinks.bind(i.options.event, this.pagerLinksHandler)), this.btnPlay.length && (this.btnPlayHandler = function(t) {
t.preventDefault(), i.startRotation();
}, this.btnPlay.bind(this.options.event, this.btnPlayHandler)), this.btnPause.length && (this.btnPauseHandler = function(t) {
t.preventDefault(), i.stopRotation();
}, this.btnPause.bind(this.options.event, this.btnPauseHandler)), this.btnPlayPause.length && (this.btnPlayPauseHandler = function(t) {
t.preventDefault(), i.gallery.hasClass(i.options.autorotationActiveClass) ? i.stopRotation() :i.startRotation();
}, this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler)), this.options.useSwipe && t.fn.hammer && e && this.gallery.hammer({
drag_block_horizontal:!0,
drag_min_distance:1
}).on("release dragleft dragright swipeleft swiperight", function(t) {
switch (t.type) {
case "dragright":
case "dragleft":
t.gesture.preventDefault();
break;

case "swipeleft":
i.nextSlide(), t.gesture.stopDetect();
break;

case "swiperight":
i.prevSlide(), t.gesture.stopDetect();
break;

case "release":
Math.abs(t.gesture[i.options.vertical ? "deltaY" :"deltaX"]) > i.options.swipeThreshold && ("right" == t.gesture.direction ? i.prevSlide() :"left" == t.gesture.direction && i.nextSlide());
}
}), this.options.pauseOnHover && (this.hoverHandler = function() {
i.options.autoRotation && (i.galleryHover = !0, i.pauseRotation());
}, this.leaveHandler = function() {
i.options.autoRotation && (i.galleryHover = !1, i.resumeRotation());
}, this.gallery.bind({
mouseenter:this.hoverHandler,
mouseleave:this.leaveHandler
}));
},
onWindowResize:function() {
this.options.autoHeight && this.slidesHolder.css({
height:this.slides.eq(this.currentIndex).outerHeight(!0)
});
},
prevSlide:function() {
this.options.disableWhileAnimating && this.galleryAnimating || (this.prevIndex = this.currentIndex, 
this.currentIndex > 0 ? (this.currentIndex--, this.switchSlide()) :this.options.circularRotation && (this.currentIndex = this.stepsCount - 1, 
this.switchSlide()));
},
nextSlide:function(t) {
this.options.disableWhileAnimating && this.galleryAnimating || (this.prevIndex = this.currentIndex, 
this.currentIndex < this.stepsCount - 1 ? (this.currentIndex++, this.switchSlide()) :(this.options.circularRotation || t === !0) && (this.currentIndex = 0, 
this.switchSlide()));
},
numSlide:function(t) {
this.currentIndex != t && (this.prevIndex = this.currentIndex, this.currentIndex = t, 
this.switchSlide());
},
switchSlide:function() {
var t = this;
this.slides.length > 1 && (this.galleryAnimating = !0, this.options.animSpeed ? this.slides.eq(this.prevIndex).stop().animate({
opacity:0
}, {
duration:this.options.animSpeed
}) :this.slides.eq(this.prevIndex).css({
opacity:0
}), this.switchNext = function() {
t.options.animSpeed ? t.slides.eq(t.currentIndex).stop().animate({
opacity:1
}, {
duration:t.options.animSpeed
}) :t.slides.eq(t.currentIndex).css({
opacity:""
}), clearTimeout(this.nextTimer), this.nextTimer = setTimeout(function() {
t.slides.eq(t.currentIndex).css({
opacity:""
}), t.galleryAnimating = !1, t.autoRotate(), t.makeCallback("onChange", t);
}, t.options.animSpeed);
}, this.options.switchSimultaneously ? t.switchNext() :(clearTimeout(this.switchTimer), 
this.switchTimer = setTimeout(function() {
t.switchNext();
}, this.options.animSpeed)), this.refreshState(), this.makeCallback("onBeforeChange", this));
},
refreshState:function(t) {
this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass), 
this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass), 
this.curNum.html(this.currentIndex + 1), this.allNum.html(this.stepsCount), this.options.autoHeight && (t ? this.slidesHolder.css({
height:this.slides.eq(this.currentIndex).outerHeight(!0)
}) :this.slidesHolder.stop().animate({
height:this.slides.eq(this.currentIndex).outerHeight(!0)
}, {
duration:this.options.animSpeed
})), this.options.circularRotation || (this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass), 
0 === this.currentIndex && this.btnPrev.addClass(this.options.disabledClass), this.currentIndex === this.stepsCount - 1 && this.btnNext.addClass(this.options.disabledClass)), 
this.gallery.toggleClass("not-enough-slides", 1 === this.stepsCount);
},
startRotation:function() {
this.options.autoRotation = !0, this.galleryHover = !1, this.autoRotationStopped = !1, 
this.resumeRotation();
},
stopRotation:function() {
this.galleryHover = !0, this.autoRotationStopped = !0, this.pauseRotation();
},
pauseRotation:function() {
this.gallery.addClass(this.options.autorotationDisabledClass), this.gallery.removeClass(this.options.autorotationActiveClass), 
clearTimeout(this.timer);
},
resumeRotation:function() {
this.autoRotationStopped || (this.gallery.addClass(this.options.autorotationActiveClass), 
this.gallery.removeClass(this.options.autorotationDisabledClass), this.autoRotate());
},
autoRotate:function() {
var t = this;
clearTimeout(this.timer), !this.options.autoRotation || this.galleryHover || this.autoRotationStopped ? this.pauseRotation() :(this.gallery.addClass(this.options.autorotationActiveClass), 
this.timer = setTimeout(function() {
t.nextSlide(!0);
}, this.options.switchTime));
},
makeCallback:function(t) {
if ("function" == typeof this.options[t]) {
var i = Array.prototype.slice.call(arguments);
i.shift(), this.options[t].apply(this, i);
}
},
destroy:function() {
this.btnPrev.unbind(this.options.event, this.btnPrevHandler), this.btnNext.unbind(this.options.event, this.btnNextHandler), 
this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler), t(window).unbind("load resize orientationchange", this.resizeHandler), 
this.stopRotation(), this.btnPlay.unbind(this.options.event, this.btnPlayHandler), 
this.btnPause.unbind(this.options.event, this.btnPauseHandler), this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler), 
this.gallery.bind({
mouseenter:this.hoverHandler,
mouseleave:this.leaveHandler
}), this.options.useSwipe && t.fn.hammer && this.gallery.hammer().off("release dragleft dragright swipeleft swiperight"), 
"string" == typeof this.options.generatePagination && this.pagerHolder.empty();
var i = [ this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass ];
this.gallery.removeClass(i.join(" ")), this.slidesHolder.add(this.slides).removeAttr("style");
}
};
var e = /MSIE 10.*Touch/.test(navigator.userAgent) || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
t.fn.fadeGallery = function(e) {
return this.each(function() {
t(this).data("FadeGallery", new i(t.extend(e, {
holder:this
})));
});
};
}(jQuery);
!function(i) {
var h = {
pluginClassName:"matchSize"
}, t = {
_matchGroupSize:function(h) {
var t = 0, e = 0;
this.each(function() {
h.height && (t = Math.max(t, i(this).height())), h.width && (e = Math.max(e, i(this).width()));
}), this.each(function() {
h.height && i(this).height(t), h.width && i(this).width(e);
});
}
};
i.fn.matchSize = function(e) {
var e = i.extend({
useGroups:!0,
height:!0,
width:!1
}, e);
return e.useGroups ? this.find('[class*="' + h.pluginClassName + '"]').each(function() {
var a = new RegExp(h.pluginClassName + "\\[[^\\]]*\\]", "g").exec(this.className);
if (a) {
a = a[0];
var s = i("." + a.replace(/\[/, "\\[").replace(/\]/, "\\]"));
t._matchGroupSize.apply(s, [ e ]);
}
}) :t._matchGroupSize.apply(this, [ e ]), this;
};
}(jQuery);
function MH_Dialog(t) {
this.dictionary = null, this.defaults = null;
var e = this, i = new MH_DIALOG_GLOBALS(), n = function() {
return languageCode && languageCode.length > 0 ? languageCode :i.getConstant("DEFAULT_LANGUAGE");
}();
window.mhDialogCache ? (e.dictionary = window.mhDialogCache, this.init(t)) :jQuery.ajax({
url:"/FP/API/MhDialog/mhDialog.php",
dataType:"json",
data:{
lang:n
},
success:function(i) {
window.mhDialogCache = e.dictionary = i, e.init(t), "function" == typeof t.success && t.success.call(e);
}
});
}

function appendDialogTriggerElement() {
jQuery("body").append('<span id="' + _dialogId + '" style="display:hidden;"></span>');
}

function generateDialogId() {
return "dialog_" + parseInt(1e4 * Math.random());
}

function getHtmlWrappingContainer(t) {
return '<div id="popupDynamicStructure" class="rgba"><div id="mhDialogWrapper" class="newPopupOuterContainer newPopupOuterContainerRounderCorners ' + t + '"><div id="mhDialogContent" class="cssgradients borderradius"></div></div></div>';
}

function getHtmlIconContainer() {
return '<div class="mhDialogBody clearfix"><img id="mhDialogIcon" src="' + AssetManager.spacer() + '"><span class="mhDialogMassage"></span></div>';
}

function getHtmlCheckboxContainer(t, e) {
return '<label class="checkbox_container"><input type="checkbox" class="checkbox_input"' + (e ? " checked" :"") + ">" + t + "</label>";
}

function getHeight() {
return jQuery("body").height();
}

function isDomElementExists(t) {
return jQuery(t).is("*");
}

function MH_Error(t) {
return t = t || {}, t.buttons || (t.buttons = {}), t.buttons.secondary = !1, t.iconClassName = "mhErrorIcon", 
t.title = t.title || "title error", t.message = t.message || "error message", new MH_Dialog(t);
}

function MH_Confirm(t) {
return t = t || {}, t.buttons || (t.buttons = {}), t.buttons.secondary = !1, t.iconClassName = "mhCofirmIcon", 
t.title = t.title || "title confirmation", t.message = t.message || "confirm message", 
new MH_Dialog(t);
}

function MH_Notice(t) {
return t = t || {}, t.buttons || (t.buttons = {}), t.iconClassName = "mhNoticeIcon", 
t.title = t.title || "title notice", t.message = t.message || "Notice message.", 
new MH_Dialog(t);
}

window.mhDialogCache = null;

var MH_DIALOG_GLOBALS = function() {
var t = {
WIDTH:475,
POSITION:{
my:"center",
at:"center",
of:window
},
CLASS:"mhDialog",
IS_RESIZABLE:"false",
IS_MODAL:"true",
IS_DRAGGABLE:"true",
DEFAULT_LANGUAGE:"EN",
CLASS_ICON:"mhCofirmIcon",
CLASS_PRIMARY_BUTTON:"mh_dialog_primary qButton-dnaSite",
CLASS_PRIMARY_BUTTON_COLOR:"Green",
CLASS_SECONDARY_BUTTON:"mh_dialog_secondary qButton-dnaSite qButton-White",
CLASS_DIALOG_BODY:"newPopupBody",
CLASS_DIALOG_TOP_BAR:"newPopupTopBar",
CLOSE_CALLBACK:function() {
jQuery("object,embed").css("visibility", "visible");
}
};
return function() {
this.getConstant = function(e) {
if (t[e]) return t[e];
throw new Error("The constant " + e + " doesn't exist.");
};
};
}();

MH_Dialog.prototype.init = function(t) {
var e = this, i = new MH_DIALOG_GLOBALS(), n = i.getConstant("WIDTH");
t.title = e.dictionary && e.dictionary[t.title] ? e.dictionary[t.title] :t.title, 
t.message = e.dictionary && e.dictionary[t.message] ? e.dictionary[t.message] :t.message, 
n > jQuery(window).width() && (n = jQuery(window).width() - 40), this.defaults = {
title:"",
message:"",
variant:"",
messageIsHTML:!1,
customClass:i.getConstant("CLASS"),
iconClassName:i.getConstant("CLASS_ICON"),
resizable:i.getConstant("IS_RESIZABLE"),
modal:i.getConstant("IS_MODAL"),
draggable:i.getConstant("IS_DRAGGABLE"),
width:n,
position:i.getConstant("POSITION"),
close:i.getConstant("CLOSE_CALLBACK"),
buttons:[ {
text:e.dictionary.ok,
click:function() {
e.mainFunction.call(e);
}
}, {
text:e.dictionary.cancel,
click:function() {
e.contextFunction.call(e);
}
} ]
}, _dialogId = generateDialogId(), appendDialogTriggerElement(_dialogId), e.merge(t), 
e.showDialog(), e.enhanceDialog(), e.setIcon(), e.setMessage();
}, MH_Dialog.prototype.merge = function(t) {
var e, i, n = [], a = this;
switch (t.buttons ? (e = t.buttons.primary ? t.buttons.primary :t.buttons.primary === !1 ? !1 :null, 
i = t.buttons.secondary ? t.buttons.secondary :t.buttons.secondary === !1 ? !1 :null) :(e = null, 
i = null), t.buttons = [], e) {
case null:
n.push(this.defaults.buttons[0]);
break;

case !1:
break;

default:
a.dictionary[e.text] && (e.text = a.dictionary[e.text]), n.push(e);
}
switch (i) {
case null:
n.push(this.defaults.buttons[1]);
break;

case !1:
break;

default:
a.dictionary[i.text] && (i.text = a.dictionary[i.text]), n.push(i);
}
delete t.buttons, this.defaults.buttons = n, jQuery.extend(!0, this.defaults, t);
}, MH_Dialog.prototype.close = function() {
jQuery("#" + _dialogId).dialog("close");
}, MH_Dialog.prototype.enhanceDialog = function() {
var t, e, i, n, a = jQuery(".ui-dialog-titlebar-close .ui-icon").first(), o = jQuery(".ui-dialog .ui-dialog-titlebar"), s = jQuery(".ui-dialog"), l = new MH_DIALOG_GLOBALS();
isDomElementExists("#popupDynamicStructure") || (s.wrapInner(getHtmlWrappingContainer(this.defaults.customClass)), 
a.addClass("PK_Clickable PK_ClickableThinX"), o.after(getHtmlIconContainer()).addClass(l.getConstant("CLASS_DIALOG_TOP_BAR")).find(">span").addClass("PK_popupTitle"), 
i = jQuery(".mhDialogBody"), t = s.find(".ui-dialog-buttonset"), e = t.find(":first"), 
n = this.defaults.classPrimaryButton ? this.defaults.classPrimaryButton :l.getConstant("CLASS_PRIMARY_BUTTON_COLOR"), 
i.addClass(l.getConstant("CLASS_DIALOG_BODY")), e.addClass(l.getConstant("CLASS_PRIMARY_BUTTON") + " qButton-" + n), 
e.next().addClass(l.getConstant("CLASS_SECONDARY_BUTTON")), t.find("button").each(function(t, e) {
jQuery(e).attr("data-automations", e.innerText);
}), this.defaults.variant ? t.find(".ui-button-text").addClass("css_button css_button_big css_button_" + this.defaults.variant + "_default") :(t.find("button").prepend('<span class="qButton-left"></span>'), 
t.find(".ui-button-text").addClass("qButton-right")), this.defaults.checkbox && e.before(getHtmlCheckboxContainer(this.defaults.checkbox.text, this.defaults.checkbox.checked)), 
s.css("visibility", "hidden"), setTimeout(function() {
s.css({
marginTop:0 - jQuery("#popupDynamicStructure").height() / 2,
visibility:"visible"
});
}, 0));
}, MH_Dialog.prototype.setMessage = function() {
this.defaults.messageIsHTML ? jQuery(".mhDialogMassage").html(this.defaults.message) :jQuery(".mhDialogMassage").text(this.defaults.message);
}, MH_Dialog.prototype.setIcon = function() {
var t = jQuery("#mhDialogIcon"), e = this.defaults.iconClassName;
e ? this.defaults.icon ? t.attr("src", this.defaults.icon) :(t.after('<div class="PK_NotificationIcon ' + e + '"></div>'), 
t.remove()) :t.remove();
}, MH_Dialog.prototype.showDialog = function() {
var t = this;
jQuery("#" + _dialogId).bind("click", function() {
isDomElementExists(".ui-dialog") && jQuery(".ui-dialog").remove(), jQuery("object,embed").css("visibility", "hidden"), 
jQuery(this).dialog(t.defaults);
}).click();
}, MH_Dialog.prototype.contextFunction = function() {
return this.close(), !1;
}, MH_Dialog.prototype.mainFunction = function() {
return this.defaults.checkbox && this.defaults.checkbox.callback(jQuery(".checkbox_input").prop("checked")), 
this.close(), !0;
};
!function(t, e) {
"use strict";
t.fn.mhTooltip = function(n) {
var o = {
after:500,
position:"bottom",
additionalWrapperClass:"",
getUniqueID:function(t) {
return t.attr("id");
},
getContent:function(e) {
var n = t("<div>");
return n.text(e.attr("title")), n;
},
getElementToOpenTooltipOn:function(t) {
return t;
}
}, i = null, l = null, a = /ipad|iphone|ipod|android|blackberry|bb10|iemobile/i.test(navigator.userAgent.toLowerCase()), u = function(o, u, d, c) {
var p = function() {
o.data("scheduledTooltipEvents", null), d ? ((null === u || 0 === u.length) && (u = s(o)), 
i = o, l = u, u.fadeIn()) :null !== u && (o === i && u === l && (i = null, l = null, 
a && t("html").unbind("touchend", r)), u.fadeOut(function() {
t(this).remove();
}));
};
if (c) p(); else {
var f = o.data("scheduledTooltipEvents");
null == f ? (f = e.setTimeout(p, n.after), o.data("scheduledTooltipEvents", f)) :(e.clearTimeout(f), 
o.data("scheduledTooltipEvents", null));
}
}, r = function(e) {
null !== l && null !== i && (t.contains(i[0], e.target) || i[0] === e.target || t.contains(l[0], e.target) || l[0] === e.target || u(i, l, !1, !0));
}, s = function(e) {
var o = n.getUniqueID(e), i = t("#Tooltip_" + o);
if (i.length > 0) return i;
var l = n.getContent(e);
return i = t('<div class="mh-tooltip ' + n.additionalWrapperClass + '" id="Tooltip_' + o + '"><div>'), 
i.append(l).appendTo("body").position({
my:"center " + ("bottom" === n.position ? "top+15" :"bottom-15"),
at:"center " + n.position,
collision:"flipfit",
of:n.getElementToOpenTooltipOn(e),
using:function(e, n) {
t(this).css(e);
var o = t("<div>").addClass("mh-tooltip-arrow").addClass(n.vertical).addClass(n.horizontal), i = n.target.left - n.element.left + n.target.width / 2 + 3;
i > 0 && i < n.element.width && o.appendTo(this).css("left", i + "px");
}
}), a ? t("html").bind("touchend", r) :(i.mouseenter(function() {
u(e, i, !0);
}), i.mouseleave(function() {
u(e, i, !1);
})), i;
};
return n = t.extend(o, n), this.each(function() {
var e = t(this);
a ? e.click(function(o) {
e !== i && null !== i && u(i, l, !1, !0);
var a = n.getUniqueID(e), r = t("#Tooltip_" + a);
r.length > 0 && r.is(":visible") ? u(e, r, !1, !0) :(u(e, null, !0, !0), o.preventDefault());
}) :(e.mouseenter(function() {
u(e, null, !0);
}), e.mouseleave(function() {
var o = n.getUniqueID(e);
u(e, t("#Tooltip_" + o), !1);
}));
}), this;
};
}(jQuery, window);
jQuery.fn.mhTranslate = function(a) {
a = jQuery.extend({
lang:"EN"
}, a), this.each(function() {
var t = jQuery(this), n = t.data("translation-set"), e = t.data("translation-category"), r = t.data("translation-key"), s = t.data("translation-template-values"), i = t.data("translation-xml-parsing"), l = t.data("translation-gender-aware"), o = {
lang:a.lang,
set:n,
category:e,
stringName:r
};
void 0 != s && (o.templateValues = s), void 0 != i && (o.xmlParsing = i), void 0 != l && (o.genderAware = l), 
jQuery.post("/FP/API/Translation/get-single-translation.php", o, function(a) {
t.html(a);
}, "json");
});
};
var Kicksend = {
mailcheck:{
threshold:3,
defaultDomains:[ "gmail.com", "hotmail.com", "yahoo.com", "mail.ru", "aol.com", "seznam.cz", "yahoo.com.ar", "hotmail.co.uk", "live.com", "wp.pl", "hotmail.fr", "yahoo.com.br", "orange.fr", "web.de", "msn.com", "outlook.com", "walla.com", "hotmail.es", "libero.it", "comcast.net", "gmx.de", "btinternet.com", "facebook.com", "yandex.ru", "yahoo.co.uk", "bigpond.com", "t-online.de", "hotmail.com.ar", "yahoo.es", "yahoo.fr", "hotmail.it", "yahoo.com.mx", "ymail.com", "o2.pl", "online.no", "icloud.com", "att.net", "wanadoo.fr", "alice.it", "ig.com.br", "me.com", "googlemail.com", "free.fr", "bol.com.br", "sbcglobal.net", "interia.pl", "yahoo.de", "sfr.fr", "verizon.net", "live.com.ar", "telenet.be", "yahoo.it", "xtra.co.nz", "live.co.uk", "live.fr", "walla.co.il", "telia.com", "op.pl", "uol.com.br", "yahoo.ca", "sky.com", "live.nl", "hotmail.de", "live.com.mx", "shaw.ca", "bluewin.ch", "yahoo.com.au", "rambler.ru", "tiscali.it", "laposte.net", "centrum.cz", "qq.com", "skynet.be", "cox.net", "talktalk.net", "live.dk", "bellsouth.net", "videotron.ca", "terra.com.br", "hotmail.ca", "gmx.at", "virgilio.it", "rocketmail.com", "live.it", "gmx.net", "bk.ru", "rogers.com", "freenet.de", "sympatico.ca", "optusnet.com.au", "freemail.hu", "email.cz", "ntlworld.com", "live.ca", "mail.com", "ziggo.nl", "charter.net", "onet.pl", "home.nl", "testmh.com" ],
defaultTopLevelDomains:null,
run:function(e) {
e.domains = e.domains || Kicksend.mailcheck.defaultDomains, e.topLevelDomains = e.topLevelDomains || Kicksend.mailcheck.defaultTopLevelDomains, 
e.distanceFunction = e.distanceFunction || Kicksend.sift3Distance;
var o = function(e) {
return e;
}, t = e.suggested || o, n = e.empty || o, i = Kicksend.mailcheck.suggest(encodeURI(e.email), e.domains, e.topLevelDomains, e.distanceFunction);
return i ? t(i) :n();
},
suggest:function(e, o, t, n) {
e = e.toLowerCase();
var i = this.splitEmail(e), a = this.findClosestDomain(i.domain, o, n);
if (a) {
if (a != i.domain) return {
address:i.address,
domain:a,
full:i.address + "@" + a
};
} else {
var l = this.findClosestDomain(i.topLevelDomain, t);
if (i.domain && l && l != i.topLevelDomain) {
var r = i.domain;
return a = r.substring(0, r.lastIndexOf(i.topLevelDomain)) + l, {
address:i.address,
domain:a,
full:i.address + "@" + a
};
}
}
return !1;
},
findClosestDomain:function(e, o, t) {
var n, i = 99, a = null;
if (!e || !o) return !1;
t || (t = this.sift3Distance);
for (var l = 0; l < o.length; l++) {
if (e === o[l]) return e;
n = t(e, o[l]), i > n && (i = n, a = o[l]);
}
return i <= this.threshold && null !== a ? a :!1;
},
sift3Distance:function(e, o) {
if (null == e || 0 === e.length) return null == o || 0 === o.length ? 0 :o.length;
if (null == o || 0 === o.length) return e.length;
for (var t = 0, n = 0, i = 0, a = 0, l = 5; t + n < e.length && t + i < o.length; ) {
if (e.charAt(t + n) == o.charAt(t + i)) a++; else {
n = 0, i = 0;
for (var r = 0; l > r; r++) {
if (t + r < e.length && e.charAt(t + r) == o.charAt(t)) {
n = r;
break;
}
if (t + r < o.length && e.charAt(t) == o.charAt(t + r)) {
i = r;
break;
}
}
}
t++;
}
return (e.length + o.length) / 2 - a;
},
splitEmail:function(e) {
var o = e.split("@");
if (o.length < 2) return !1;
for (var t = 0; t < o.length; t++) if ("" === o[t]) return !1;
var n = o.pop(), i = n.split("."), a = "";
if (0 == i.length) return !1;
if (1 == i.length) a = i[0]; else {
for (var t = 1; t < i.length; t++) a += i[t] + ".";
i.length >= 2 && (a = a.substring(0, a.length - 1));
}
return {
topLevelDomain:a,
domain:n,
address:o.join("@")
};
}
}
};

"undefined" != typeof module && module.exports && (module.exports = Kicksend.mailcheck), 
"undefined" != typeof window && window.jQuery && !function(e) {
e.fn.mailcheck = function(e) {
var o = this;
if (e.suggested) {
var t = e.suggested;
e.suggested = function(e) {
t(o, e);
};
}
if (e.empty) {
var n = e.empty;
e.empty = function() {
n.call(null, o);
};
}
e.email = this.val(), Kicksend.mailcheck.run(e);
};
}(jQuery);
!function(e) {
function t(t) {
var n = t || window.event, i = [].slice.call(arguments, 1), l = 0, s = 0, o = 0;
return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (l = n.wheelDelta / 120), 
n.detail && (l = -n.detail / 3), o = l, void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (o = 0, 
s = -1 * l), void 0 !== n.wheelDeltaY && (o = n.wheelDeltaY / 120), void 0 !== n.wheelDeltaX && (s = -1 * n.wheelDeltaX / 120), 
i.unshift(t, l, s, o), (e.event.dispatch || e.event.handle).apply(this, i);
}
var n = [ "DOMMouseScroll", "mousewheel" ];
if (e.event.fixHooks) for (var i = n.length; i; ) e.event.fixHooks[n[--i]] = e.event.mouseHooks;
e.event.special.mousewheel = {
setup:function() {
if (this.addEventListener) for (var e = n.length; e; ) this.addEventListener(n[--e], t, !1); else this.onmousewheel = t;
},
teardown:function() {
if (this.removeEventListener) for (var e = n.length; e; ) this.removeEventListener(n[--e], t, !1); else this.onmousewheel = null;
}
}, e.fn.extend({
mousewheel:function(e) {
return e ? this.bind("mousewheel", e) :this.trigger("mousewheel");
},
unmousewheel:function(e) {
return this.unbind("mousewheel", e);
}
});
}(jQuery);
!function(o) {
"function" == typeof define && define.amd ? define([ "jquery" ], o) :o(jQuery);
}(function(o) {
var e = [], i = o(document), t = navigator.userAgent.toLowerCase(), n = o(window), a = [], d = {
opera:/opera/.test(t),
mobile:/android|ipad|iphone|ipod/.test(t)
};
o.modal = function(e, i) {
return o.modal.impl.init(e, i);
}, o.modal.close = function() {
o.modal.impl.close();
}, o.modal.focus = function(e) {
o.modal.impl.focus(e);
}, o.modal.setContainerDimensions = function() {
o.modal.impl.setContainerDimensions();
}, o.modal.setPosition = function() {
o.modal.impl.setPosition();
}, o.modal.update = function(e, i) {
o.modal.impl.update(e, i);
}, o.modal.isOpen = function() {
return o.modal.impl.isOpen();
}, o.fn.modal = function(e) {
return o.modal.impl.init(this, e);
}, o.modal.defaults = {
appendTo:"#popup_container",
focus:!0,
opacity:50,
overlayId:"simplemodal-overlay",
overlayCss:{},
containerId:"simplemodal-container",
containerCss:{},
dataId:"simplemodal-data",
dataCss:{},
minHeight:null,
minWidth:null,
maxHeight:null,
maxWidth:null,
autoResize:!1,
autoPosition:!0,
zIndex:1e3,
close:!0,
closeHTML:'<a class="modalCloseImg" title="Close"></a>',
closeClass:"simplemodal-close",
escClose:!0,
overlayClose:!1,
fixed:!0,
position:null,
persist:!1,
modal:!0,
onOpen:null,
onShow:null,
onClose:null
}, o.modal.impl = {
d:{},
init:function(e, i) {
var t = this;
if (t.d.data) return !1;
if (t.o = o.extend({}, o.modal.defaults, i), 0 === o(t.o.appendTo).length && (t.o.appendTo = "body"), 
t.zIndex = t.o.zIndex, t.occb = !1, "object" == typeof e) e = e instanceof o ? e :o(e), 
t.d.placeholder = !1, e.parent().parent().size() > 0 && (e.before(o("<span></span>").attr("id", "simplemodal-placeholder").css({
display:"none"
})), t.d.placeholder = !0, t.display = e.css("display"), t.o.persist || (t.d.orig = e.clone(!0))); else {
if ("string" != typeof e && "number" != typeof e) return alert("SimpleModal Error: Unsupported data type: " + typeof e), 
t;
e = o("<div></div>").html(e);
}
return t.create(e), e = null, t.open(), o.isFunction(t.o.onShow) && t.o.onShow.apply(t, [ t.d ]), 
t;
},
create:function(i) {
var t = this;
t.getDimensions(), o("body").addClass("mobile_responsive_popup"), t.d.overlay = o("<div></div>").attr("id", t.o.overlayId).addClass("simplemodal-overlay").css(o.extend(t.o.overlayCss, {
display:"none",
opacity:t.o.opacity / 100,
height:t.o.modal ? e[0] :0,
width:t.o.modal ? e[1] :0,
position:"fixed",
left:0,
top:0,
zIndex:t.o.zIndex + 1
})).appendTo(t.o.appendTo), t.d.container = o("<div></div>").attr("id", t.o.containerId).addClass("simplemodal-container").css(o.extend({
position:t.o.fixed ? "fixed" :"absolute"
}, t.o.containerCss, {
display:"none",
zIndex:t.o.zIndex + 2
})).append(t.o.close && t.o.closeHTML ? o(t.o.closeHTML).addClass(t.o.closeClass) :"").appendTo(t.o.appendTo), 
t.d.wrap = o("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
height:"100%",
outline:0,
width:"100%"
}).appendTo(t.d.container), t.d.data = i.attr("id", i.attr("id") || t.o.dataId).addClass("simplemodal-data").css(o.extend(t.o.dataCss, {
display:"none"
})).appendTo("body"), i = null, t.setContainerDimensions(), t.d.data.appendTo(t.d.wrap);
},
bindEvents:function() {
var t = this;
o("." + t.o.closeClass).bind("click.simplemodal", function(o) {
o.preventDefault(), t.close();
}), t.o.modal && t.o.close && t.o.overlayClose && t.d.overlay.bind("click.simplemodal", function(o) {
o.preventDefault(), t.close();
}), i.bind("keydown.simplemodal", function(o) {
t.o.modal && 9 === o.keyCode ? t.watchTab(o) :t.o.close && t.o.escClose && 27 === o.keyCode && (o.preventDefault(), 
t.close());
}), n.bind("resize.simplemodal orientationchange.simplemodal", function() {
t.getDimensions(), t.o.autoResize ? t.setContainerDimensions() :t.o.autoPosition && t.setPosition(), 
t.o.modal && (t.d.iframe && t.d.iframe.css({
height:a[0],
width:a[1]
}), t.d.overlay.css({
height:e[0],
width:e[1]
}));
});
},
unbindEvents:function() {
o("." + this.o.closeClass).unbind("click.simplemodal"), i.unbind("keydown.simplemodal"), 
n.unbind(".simplemodal"), this.d.overlay.unbind("click.simplemodal");
},
focus:function(e) {
var i = this, t = e && -1 !== o.inArray(e, [ "first", "last" ]) ? e :"first", n = o(":input:enabled:visible:" + t, i.d.wrap);
setTimeout(function() {
n.length > 0 ? n.focus() :i.d.wrap.focus();
}, 10);
},
getDimensions:function() {
var o = "undefined" == typeof window.innerHeight ? n.height() :window.innerHeight;
e = [ i.height(), i.width() ], a = [ o, n.width() ];
},
getVal:function(o, e) {
return o ? "number" == typeof o ? o :"auto" === o ? 0 :o.indexOf("%") > 0 ? parseInt(o.replace(/%/, "")) / 100 * ("h" === e ? a[0] :a[1]) :parseInt(o.replace(/px/, "")) :null;
},
update:function(o, e) {
var i = this;
return i.d.data ? (i.d.origHeight = i.getVal(o, "h"), i.d.origWidth = i.getVal(e, "w"), 
i.d.data.hide(), o && i.d.container.css("height", o), e && i.d.container.css("width", e), 
i.setContainerDimensions(), i.d.data.show(), i.o.focus && i.focus(), i.unbindEvents(), 
void i.bindEvents()) :!1;
},
setContainerDimensions:function() {
var o = this, e = o.d.origHeight ? o.d.origHeight :d.opera ? o.d.container.height() :o.getVal(o.d.container.css("height"), "h"), i = o.d.origWidth ? o.d.origWidth :d.opera ? o.d.container.width() :o.getVal(o.d.container.css("width"), "w"), t = o.d.data.outerHeight(!0), n = o.d.data.outerWidth(!0);
o.d.origHeight = o.d.origHeight || e, o.d.origWidth = o.d.origWidth || i;
var s = o.o.maxHeight ? o.getVal(o.o.maxHeight, "h") :null, l = o.o.maxWidth ? o.getVal(o.o.maxWidth, "w") :null, r = s && s < a[0] ? s :a[0], p = l && l < a[1] ? l :a[1], c = o.o.minHeight ? o.getVal(o.o.minHeight, "h") :"auto";
e = e ? o.o.autoResize && e > r ? r :c > e ? c :e :t ? t > r ? r :o.o.minHeight && "auto" !== c && c > t ? c :t :c;
var u = o.o.minWidth ? o.getVal(o.o.minWidth, "w") :"auto";
i = i ? o.o.autoResize && i > p ? p :u > i ? u :i :n ? n > p ? p :o.o.minWidth && "auto" !== u && u > n ? u :n :u, 
o.d.container.css({
height:e,
width:i
}), o.d.wrap.css({
overflow:t > e || n > i ? "auto" :"visible"
}), o.o.autoPosition && o.setPosition();
},
setPosition:function() {
var o, e, i = this, t = i.d.container.outerHeight(!0), s = i.d.container.outerWidth(!0), l = a[0] / 2 - t / 2, r = a[1] / 2 - s / 2;
st = "fixed" !== i.d.container.css("position") ? n.scrollTop() :0, i.o.position && "[object Array]" === Object.prototype.toString.call(i.o.position) ? (o = st + (i.o.position[0] || l), 
e = i.o.position[1] || r) :(o = st + l, e = r), 10 > o && (o = 10), 10 > e && (e = 10), 
i.d.container.css({
left:e,
top:o
}), d.mobile && (i.o.fixed || t > a[0] || s > a[1] ? i.d.container.css({
position:"absolute"
}) :i.d.container.css({
position:"fixed"
}));
},
watchTab:function(e) {
var i = this;
if (o(e.target).parents(".simplemodal-container").length > 0) {
if (i.inputs = o(":input:enabled:visible:first, :input:enabled:visible:last", i.d.data[0]), 
!e.shiftKey && e.target === i.inputs[i.inputs.length - 1] || e.shiftKey && e.target === i.inputs[0] || 0 === i.inputs.length) {
e.preventDefault();
var t = e.shiftKey ? "last" :"first";
i.focus(t);
}
} else e.preventDefault(), i.focus();
},
open:function() {
var e = this;
e.d.iframe && e.d.iframe.show(), o.isFunction(e.o.onOpen) ? e.o.onOpen.apply(e, [ e.d ]) :(e.d.overlay.show(), 
e.d.container.show(), e.d.data.show()), e.o.focus && e.focus(), e.bindEvents();
},
close:function() {
var e = this;
if (!e.d.data) return !1;
if (e.unbindEvents(), o.isFunction(e.o.onClose) && !e.occb) e.occb = !0, e.o.onClose.apply(e, [ e.d, e.o ]); else {
if (e.d.placeholder) {
var i = o("#simplemodal-placeholder");
e.o.persist ? i.replaceWith(e.d.data.removeClass("simplemodal-data").css("display", e.display)) :(e.d.data.hide().remove(), 
i.replaceWith(e.d.orig));
} else e.d.data.hide().remove();
e.d.container.hide().remove(), e.d.overlay.hide(), e.d.iframe && e.d.iframe.hide().remove(), 
e.d.overlay.remove(), e.d = {};
}
},
isOpen:function() {
var o = this;
return void 0 !== o.d.data;
}
};
});
!function(t) {
var s = function(s) {
this.origHtmlMargin = parseFloat(t("html").css("margin-top")), this.options = t.extend({}, t.smartbanner.defaults, s);
var e = navigator.standalone;
if (this.options.force ? this.type = this.options.force :null != navigator.userAgent.match(/iPad|iPhone|iPod/i) ? null != navigator.userAgent.match(/Safari/i) && (null != navigator.userAgent.match(/CriOS/i) || window.Number(navigator.userAgent.substr(navigator.userAgent.indexOf("OS ") + 3, 3).replace("_", ".")) < 6) && (this.type = "ios") :null != navigator.userAgent.match(/Android/i) ? this.type = "android" :null != navigator.userAgent.match(/Windows NT 6.2/i) && (this.type = "windows"), 
this.type && !e && !this.getCookie("sb-closed") && !this.getCookie("sb-installed")) {
this.scale = "auto" == this.options.scale ? t(window).width() / window.screen.width :this.options.scale, 
this.scale < 1 && (this.scale = 1);
var i = t("android" == this.type ? 'meta[name="google-play-app"]' :"ios" == this.type ? 'meta[name="apple-itunes-app"]' :'meta[name="msApplication-ID"]');
0 != i.length && ("windows" == this.type ? (this.pfn = t('meta[name="msApplication-PackageFamilyName"]').attr("content"), 
this.appId = i.attr("content")[1]) :this.appId = /app-id=([^\s,]+)/.exec(i.attr("content"))[1], 
this.title = this.options.title ? this.options.title :t("title").text().replace(/\s*[|\-·].*$/, ""), 
this.author = this.options.author ? this.options.author :t('meta[name="author"]').length ? t('meta[name="author"]').attr("content") :window.location.hostname, 
this.create(), this.show(), this.listen());
}
};
s.prototype = {
constructor:s,
create:function() {
var s, e = this.options.url ? this.options.url :("windows" == this.type ? "ms-windows-store:PDP?PFN=" + this.pfn :"android" == this.type ? "market://details?id=" :"https://itunes.apple.com/" + this.options.appStoreLanguage + "/app/id") + this.appId, i = this.options.price ? this.options.price + " - " + ("android" == this.type ? this.options.inGooglePlay :"ios" == this.type ? this.options.inAppStore :this.options.inWindowsStore) :"", n = null === this.options.iconGloss ? "ios" == this.type :this.options.iconGloss;
t("body").append('<div id="smartbanner" class="' + this.type + '"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon"></span><div class="sb-info"><strong>' + this.title + "</strong><span>" + this.author + "</span><span>" + i + '</span></div><a href="' + e + '" class="sb-button"><span>' + this.options.button + "</span></a></div></div>"), 
this.options.icon ? s = this.options.icon :t('link[rel="apple-touch-icon-precomposed"]').length > 0 ? (s = t('link[rel="apple-touch-icon-precomposed"]').attr("href"), 
null === this.options.iconGloss && (n = !1)) :t('link[rel="apple-touch-icon"]').length > 0 ? s = t('link[rel="apple-touch-icon"]').attr("href") :t('meta[name="msApplication-TileImage"]').length > 0 ? s = t('meta[name="msApplication-TileImage"]').attr("content") :t('meta[name="msapplication-TileImage"]').length > 0 && (s = t('meta[name="msapplication-TileImage"]').attr("content")), 
s ? (t("#smartbanner .sb-icon").css("background-image", "url(" + s + ")"), n && t("#smartbanner .sb-icon").addClass("gloss")) :t("#smartbanner").addClass("no-icon"), 
this.bannerHeight = t("#smartbanner").outerHeight() + 2, this.scale > 1 && (t("#smartbanner").css("top", parseFloat(t("#smartbanner").css("top")) * this.scale).css("height", parseFloat(t("#smartbanner").css("height")) * this.scale), 
t("#smartbanner .sb-container").css("-webkit-transform", "scale(" + this.scale + ")").css("-msie-transform", "scale(" + this.scale + ")").css("-moz-transform", "scale(" + this.scale + ")").css("width", t(window).width() / this.scale));
},
listen:function() {
t("#smartbanner .sb-close").on("click", t.proxy(this.close, this)), t("#smartbanner .sb-button").on("click", t.proxy(this.install, this));
},
show:function(s) {
t("#smartbanner").stop().animate({
top:0
}, this.options.speedIn).addClass("shown"), t("html").animate({
marginTop:this.origHtmlMargin + this.bannerHeight * this.scale
}, this.options.speedIn, "swing", s);
},
hide:function(s) {
t("#smartbanner").stop().animate({
top:-1 * this.bannerHeight * this.scale
}, this.options.speedOut).removeClass("shown"), t("html").animate({
marginTop:this.origHtmlMargin
}, this.options.speedOut, "swing", s);
},
close:function(t) {
t.preventDefault(), this.hide(), this.setCookie("sb-closed", "true", this.options.daysHidden), 
this.reportAbTestGoal("smartBannerDismissGoal");
},
install:function(t) {
this.hide(), this.setCookie("sb-installed", "true", this.options.daysReminder), 
this.reportAbTestGoal("smartBannerDownloadGoal");
},
reportAbTestGoal:function(t) {
var s = this.options.promotionalAbTestName;
"undefined" != typeof features && features.exposureService && s && "string" == typeof t && this.options[t] && features.exposureService.logExperimentActivity(s, this.options[t]);
},
setCookie:function(t, s, e) {
var i = new Date();
i.setDate(i.getDate() + e), s = escape(s) + (null == e ? "" :"; expires=" + i.toUTCString()), 
document.cookie = t + "=" + s + "; path=/;";
},
getCookie:function(t) {
var s, e, i, n = document.cookie.split(";");
for (s = 0; s < n.length; s++) if (e = n[s].substr(0, n[s].indexOf("=")), i = n[s].substr(n[s].indexOf("=") + 1), 
e = e.replace(/^\s+|\s+$/g, ""), e == t) return unescape(i);
return null;
},
switchType:function() {
var s = this;
this.hide(function() {
s.type = "android" == s.type ? "ios" :"android";
var e = t("android" == s.type ? 'meta[name="google-play-app"]' :'meta[name="apple-itunes-app"]').attr("content");
s.appId = /app-id=([^\s,]+)/.exec(e)[1], t("#smartbanner").detach(), s.create(), 
s.show();
});
}
}, t.smartbanner = function(e) {
var i = t(window), n = i.data("typeahead"), a = "object" == typeof e && e;
n || i.data("typeahead", n = new s(a)), "string" == typeof e && n[e]();
}, t.smartbanner.defaults = {
title:null,
author:null,
price:"FREE",
appStoreLanguage:"us",
inAppStore:"On the App Store",
inGooglePlay:"In Google Play",
inWindowsStore:"In the Windows Store",
icon:null,
iconGloss:null,
button:"VIEW",
url:null,
scale:"auto",
speedIn:300,
speedOut:400,
daysHidden:15,
daysReminder:90,
force:null
}, t.smartbanner.Constructor = s;
}(window.jQuery);
!function(t, e, i) {
function r(t, i) {
var r, o = e.createElement(t || "div");
for (r in i) o[r] = i[r];
return o;
}
function o(t, e, i) {
return i && !i.parentNode && o(t, i), t.insertBefore(e, i || null), t;
}
function n(t, e, i, r) {
var o = [ "opacity", e, ~~(100 * t), i, r ].join("-"), n = .01 + i / r * 100, s = Math.max(1 - (1 - t) / e * (100 - n), t), a = p.substring(0, p.indexOf("Animation")).toLowerCase(), l = a && "-" + a + "-" || "";
return h[o] || (g.insertRule("@" + l + "keyframes " + o + "{0%{opacity:" + s + "}" + n + "%{opacity:" + t + "}" + (n + .01) + "%{opacity:1}" + (n + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + s + "}}", g.cssRules ? g.cssRules.length :0), 
h[o] = 1), o;
}
function s(t, e) {
var r, o, n = t.style;
if (n[e] !== i) return e;
for (e = e.charAt(0).toUpperCase() + e.slice(1), o = 0; o < d.length; o++) if (r = d[o] + e, 
n[r] !== i) return r;
}
function a(t, e) {
for (var i in e) t.style[s(t, i) || i] = e[i];
return t;
}
function l(t, e) {
for (var r in e) t[r] === i && (t[r] = e[r]);
return t;
}
function f(t) {
for (var e = {
x:t.offsetLeft,
y:t.offsetTop
}; t = t.offsetParent; ) e.x += t.offsetLeft, e.y += t.offsetTop;
return e;
}
function u(i) {
var r = e.getElementById(i) || e.body;
if (r.currentStyle) var o = r.currentStyle.direction; else if (t.getComputedStyle) var o = e.defaultView.getComputedStyle(r, null).getPropertyValue("direction");
return o;
}
function c(t) {
this.opts = l(t || {}, {
lines:12,
length:7,
width:5,
radius:10,
color:"#000",
speed:1,
trail:100,
opacity:.25,
className:"jquery_spinner"
});
}
var p, d = [ "webkit", "Moz", "ms", "O" ], h = {}, y = !1, g = function() {
var t = r("style", {
type:"text/css"
});
return o(e.getElementsByTagName("head")[0], t), t.sheet || t.styleSheet;
}(), m = c.prototype = {
spin:function(t) {
var e, i, n = this, s = n.el = a(r(), {
position:"relative"
});
if (t) {
if (i = f(o(t, s, t.firstChild)), e = f(s), "rtl" != u(s) || y) var l = {
left:(t.offsetWidth >> 1) - e.x + i.x + "px"
}; else var c = this.opts.radius, l = {
right:(t.offsetWidth >> 1) - c - e.x + i.x + "px"
};
l.top = (t.offsetHeight >> 1) - e.y + i.y + "px", l.width = 0, a(s, l);
}
if (s.setAttribute("class", n.opts.className), n.lines(s, n.opts), !p) {
var d = n.opts, h = 0, g = 20 / d.speed, m = (1 - d.opacity) / (g * d.trail / 100), v = g / d.lines;
!function w() {
h++;
for (var t = d.lines; t; t--) {
var e = Math.max(1 - (h + t * v) % g * m, d.opacity);
n.opacity(s, d.lines - t, e, d);
}
n.timeout = n.el && setTimeout(w, 50);
}();
}
return n;
},
stop:function() {
var t = this, e = t.el;
return clearTimeout(t.timeout), e && e.parentNode && e.parentNode.removeChild(e), 
t.el = i, t;
}
};
m.lines = function(t, e) {
function i(t, i) {
return a(r(), {
position:"absolute",
width:e.length + e.width + "px",
height:e.width + "px",
background:t,
boxShadow:i,
transformOrigin:"left",
transform:"rotate(" + ~~(360 / e.lines * l) + "deg) translate(" + e.radius + "px,0)",
borderRadius:(e.width >> 1) + "px"
});
}
for (var s, l = 0; l < e.lines; l++) s = a(r(), {
position:"absolute",
top:1 + ~(e.width / 2) + "px",
opacity:e.opacity,
animation:p && n(e.opacity, e.trail, l, e.lines) + " " + 1 / e.speed + "s linear infinite"
}), e.shadow && o(s, a(i("#000", "0 0 4px #000"), {
top:"2px"
})), o(t, o(s, i(e.color, "0 0 1px rgba(0,0,0,.1)")));
return t;
}, m.opacity = function(t, e, i) {
e < t.childNodes.length && (t.childNodes[e].style.opacity = i);
}, function() {
var t, e = a(r("group"), {
behavior:"url(#default#VML)"
});
if (!s(e, "transform") && e.adj) {
for (y = !0, t = 4; t--; ) g.addRule([ "group", "roundrect", "fill", "stroke" ][t], "behavior:url(#default#VML)");
m.lines = function(t, e) {
function i() {
return a(r("group", {
coordsize:f + " " + f,
coordorigin:-l + " " + -l
}), {
width:f,
height:f
});
}
function n(t, n, s) {
o(u, o(a(i(), {
rotation:360 / e.lines * t + "deg",
left:~~n
}), o(a(r("roundrect", {
arcsize:1
}), {
width:l,
height:e.width,
left:e.radius,
top:-e.width >> 1,
filter:s
}), r("fill", {
color:e.color,
opacity:e.opacity
}), r("stroke", {
opacity:0
}))));
}
var s, l = e.length + e.width, f = 2 * l, u = i(), c = ~(e.length + e.radius + e.width) + "px";
if (e.shadow) for (s = 1; s <= e.lines; s++) n(s, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
for (s = 1; s <= e.lines; s++) n(s);
return o(a(t, {
margin:c + " 0 0 " + c
}), u);
}, m.opacity = function(t, e, i, r) {
var o = t.firstChild;
r = r.shadow && r.lines || 0, o && e + r < o.childNodes.length && (o = o.childNodes[e + r], 
o = o && o.firstChild, o = o && o.firstChild, o && (o.opacity = i));
};
} else p = s(e, "animation");
}(), t.Spinner = c;
}(window, document), function(t) {
t.fn.spin = function(e) {
return this.each(function() {
var i = t(this), r = i.data();
r.spinner && (r.spinner.stop(), delete r.spinner), e !== !1 && (r.spinner = new Spinner(t.extend({
color:i.css("color")
}, e)).spin(this));
}), this;
};
}(jQuery);
jQuery.fn.styledSelect = function(i) {
var e = {
coverClass:"select-replace-cover",
innerClass:"select-replace",
adjustPosition:{
top:0,
left:0
},
selectOpacity:0,
useFixedCoverWidth:!0,
backgroundPosition:{
ltr:17,
rtl:4
}
};
return i && jQuery.extend(e, i), this.each(function() {
function i() {
jQuery(this).parent().width(jQuery(this).outerWidth() + "px");
}
function t() {
jQuery(this).next().children(":first-child").width(jQuery(this).outerWidth() - 25 + "px");
}
function s() {
jQuery(this).next().children(":first-child").text(jQuery(this).find(" :selected").text());
}
var n = jQuery(this);
if (n.css("opacity") == e.selectOpacity) return !0;
if (0 == n.is(":visible")) return !0;
n.wrap("<span></span>"), n.after('<span id="' + this.id + '_styled"><span id="' + this.id + '_selectedValue"></span></span>');
var r = n.next(), l = n.next().children(":first-child"), a = n.parent();
return n.css({
opacity:e.selectOpacity,
visibility:"visible",
position:"absolute",
top:0,
left:0,
display:"inline",
"z-index":1
}), a.addClass(e.coverClass).css({
display:"inline-block",
position:"relative",
top:e.adjustPosition.top,
left:e.adjustPosition.left,
"z-index":0,
"vertical-align":"middle",
width:"100%"
}), r.addClass(e.innerClass).css({
display:"block",
"white-space":"nowrap",
"text-align":"LTR" == languageDirection ? "left" :"right",
"background-position":("LTR" == languageDirection ? n.outerWidth() - e.backgroundPosition.ltr :e.backgroundPosition.rtl) + "px 50%"
}), l.css({
display:"inline-block",
overflow:"hidden"
}), l.css({
display:"inline-block",
overflow:"hidden"
}), n.bind("change keyup", s).bind("resize", t), e.useFixedCoverWidth && n.bind("resize", i), 
n.each(s), e.useFixedCoverWidth && n.each(i), n.each(t), !0;
});
};
!function(e) {
"use strict";
var t = {
init:function(a) {
var r = this;
return r.data("jqv") && null != r.data("jqv") || (a = t._saveOptions(r, a), e(document).on("click", ".formError", function() {
e(this).fadeOut(150, function() {
e(this).parent(".formErrorOuter").remove(), e(this).remove();
});
})), this;
},
attach:function(a) {
var r, i = this;
return r = a ? t._saveOptions(i, a) :i.data("jqv"), r.validateAttribute = i.find("[data-validation-engine*=validate]").length ? "data-validation-engine" :"class", 
r.binded && (i.find("[" + r.validateAttribute + "*=validate]").not("[type=checkbox]").not("[type=radio]").not(".datepicker").bind(r.validationEventTrigger, t._onFieldEvent), 
i.find("[" + r.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").bind("click", t._onFieldEvent), 
i.find("[" + r.validateAttribute + "*=validate][class*=datepicker]").bind(r.validationEventTrigger, {
delay:300
}, t._onFieldEvent), r.showOnePopup && (i.find("[" + r.validateAttribute + "*=validate]").bind("focus", t._onFieldFocus), 
i.find("[" + r.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").bind("click", t._onFieldFocus))), 
r.autoPositionUpdate && e(window).bind("resize", {
noAnimation:!0,
formElem:i
}, t.updatePromptsPosition), i.bind("submit", t._onSubmitEvent), this;
},
detach:function() {
var a = this, r = a.data("jqv");
return a.find("[" + r.validateAttribute + "*=validate]").not("[type=checkbox]").unbind(r.validationEventTrigger, t._onFieldEvent), 
a.find("[" + r.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").unbind("click", t._onFieldEvent), 
a.unbind("submit", t.onAjaxFormComplete), a.find("[" + r.validateAttribute + "*=validate]").not("[type=checkbox]").off(r.validationEventTrigger, t._onFieldEvent), 
a.find("[" + r.validateAttribute + "*=validate][type=checkbox]").off("click", t._onFieldEvent), 
a.find("[" + r.validateAttribute + "*=validate]").unbind("focus"), a.off("submit", t.onAjaxFormComplete), 
a.removeData("jqv"), e(".errorField").each(function() {
e(this).removeClass("errorField").attr("aria-invalid", !1).siblings(".select-replace").removeClass("errorField").attr("aria-invalid", !1);
}), r.autoPositionUpdate && e(window).unbind("resize", t.updatePromptsPosition), 
this;
},
validate:function() {
return t._validateFields(this);
},
validateField:function(a) {
var r = e(this).data("jqv"), i = t._validateField(e(a), r);
return r.onSuccess && 0 == r.InvalidFields.length ? r.onSuccess() :r.onFailure && r.InvalidFields.length > 0 && r.onFailure(), 
i;
},
validateform:function() {
return t._onSubmitEvent.call(this);
},
updatePromptsPosition:function(a) {
if (a && this == window) var r = a.data.formElem, i = a.data.noAnimation; else var r = e(this.closest("form"));
var n = r.data("jqv");
return r.find("[" + n.validateAttribute + "*=validate]").not(":hidden").not(":disabled").each(function() {
var a = e(this), r = t._getPrompt(a), o = e(r).find(".formErrorContent").html();
r && t._updatePrompt(a, e(r), o, void 0, !1, n, i);
}), this;
},
showPrompt:function(e, a, r, i) {
var n = this.closest("form"), o = n.data("jqv");
return o || (o = t._saveOptions(this, o)), r && (o.promptPosition = r), o.showArrow = 1 == i, 
t._showPrompt(this, e, a, !1, o), this;
},
hidePrompt:function() {
var a = this, r = (a.data("jqv"), "." + t._getClassName(e(this).attr("id")) + "formError");
return e(r).each(function() {
e(this).parent(".formErrorOuter").remove(), e(this).remove();
}), this;
},
hide:function() {
var a, r = this;
r.data("jqv");
return a = e(this).is("form") ? "parentForm" + t._getClassName(e(this).attr("id")) :t._getClassName(e(this).attr("id")) + "formError", 
e("." + a).each(function() {
e(this).parent(".formErrorOuter").remove(), e(this).remove();
}), this;
},
hideAll:function() {
var t = this;
t.data("jqv");
return e(".formError").each(function() {
e(this).parent(".formErrorOuter").remove(), e(this).remove();
}), this;
},
_onFieldEvent:function(a) {
var r = e(this), i = r.closest("form"), n = i.data("jqv");
window.setTimeout(function() {
if (t._validateField(r, n), n.showOnePopup && n.InvalidFields.length > 0) {
var a = e(n.InvalidFields[0]);
t._validateField(a, n);
}
0 == n.InvalidFields.length && n.onSuccess ? n.onSuccess() :n.InvalidFields.length > 0 && n.onFailure && n.onFailure();
}, a.data ? a.data.delay :0);
},
_onFieldFocus:function(a) {
var r = e(this), i = r.closest("form"), n = i.data("jqv");
if (n.showOnePopup && n.InvalidFields.length > 0) {
var o = e.inArray(this, n.InvalidFields);
o > 0 && -1 != o && (t._closePrompt(e(n.InvalidFields[0])), n.InvalidFields.splice(0, 0, n.InvalidFields.splice(o, 1)[0]), 
t._validateField(r, n));
}
},
_onSubmitEvent:function() {
var a = e(this), r = a.data("jqv"), i = t._validateFields(a, !0);
return i && r.ajaxFormValidation ? (t._validateFormWithAjax(a, r), !1) :r.onValidationComplete ? (r.onValidationComplete(a, i), 
!1) :i;
},
_checkAjaxStatus:function(t) {
var a = !0;
return e.each(t.ajaxValidCache, function(e, t) {
return t ? void 0 :(a = !1, !1);
}), a;
},
_validateFields:function(a, r) {
var i = a.data("jqv"), n = !1;
a.trigger("jqv.form.validating");
var o = null;
if (a.find("[" + i.validateAttribute + "*=validate]").not(":disabled").each(function() {
var a = e(this), l = a.prop("type");
if ("password" == l) {
var s = a.next("#" + a.attr("id") + "_clear");
if (0 === s.length && a.is(":hidden")) return;
} else if (a.is(":hidden")) return;
return n |= t._validateField(a, i, r), i.doNotShowAllErrosOnSubmit ? !1 :void (n && null == o && (o = a));
}), a.trigger("jqv.form.result", [ n ]), n) {
if (i.scroll) {
var l = o.offset().top, s = o.offset().left, d = i.promptPosition;
if ("string" == typeof d && -1 != d.indexOf(":") && (d = d.substring(0, d.indexOf(":"))), 
"bottomRight" != d && "bottomLeft" != d) {
var u = t._getPrompt(o);
l = u.offset().top;
}
if (i.isOverflown) {
var v = e(i.overflownDIV);
if (!v.length) return !1;
var c = v.scrollTop(), f = -parseInt(v.offset().top);
l += c + f - 5;
var p = e(i.overflownDIV + ":not(:animated)");
p.animate({
scrollTop:l
}, 1100, function() {
i.focusFirstField && o.focus();
});
} else e("html:not(:animated),body:not(:animated)").animate({
scrollTop:l,
scrollLeft:s
}, 1100, function() {
i.focusFirstField && o.focus();
});
} else i.focusFirstField && o.focus();
return !1;
}
return !0;
},
_validateFormWithAjax:function(a, r) {
var i = a.serialize(), n = r.ajaxFormValidationURL ? r.ajaxFormValidationURL :a.attr("action");
e.ajax({
type:"GET",
url:n,
cache:!1,
dataType:"json",
data:i,
form:a,
methods:t,
options:r,
beforeSend:function() {
return r.onBeforeAjaxFormValidation(a, r);
},
error:function(e, a) {
t._ajaxError(e, a);
},
success:function(i) {
if (i !== !0) {
for (var n = !1, o = 0; o < i.length; o++) {
var l = i[o], s = l[0], d = e(e("#" + s)[0]);
if (1 == d.length) {
var u = l[2];
if (1 == l[1]) if ("" != u && u) {
if (r.allrules[u]) {
var v = r.allrules[u].alertTextOk;
v && (u = v);
}
t._showPrompt(d, u, "pass", !1, r, !0);
} else t._closePrompt(d); else {
if (n |= !0, r.allrules[u]) {
var v = r.allrules[u].alertText;
v && (u = v);
}
t._showPrompt(d, u, "", !1, r, !0);
}
}
}
r.onAjaxFormComplete(!n, a, i, r);
} else r.onAjaxFormComplete(!0, a, "", r);
}
});
},
_validateField:function(a, r, i) {
a.attr("id") || e.error("jQueryValidate: an ID attribute is required for this field: " + a.attr("name") + " class:" + a.attr("class"));
var n = a.attr(r.validateAttribute), o = /validate\[(.*)\]/.exec(n);
if (!o) return !1;
var l = o[1], s = l.split(/\[|,|\]/), d = !1, u = a.attr("name"), v = "", c = !1;
r.isError = !1, r.showArrow = !0;
var f = !1, p = a.attr(r.customValidationMessageAttributeName);
if (p) {
f = {};
for (var m = p.split(";"), h = 0; h < m.length; h++) {
var g = m[h].split(":");
2 == g.length && (f[g[0]] = g[1].trim());
}
}
for (var _ = e(a.closest("form")), x = "", b = 0; b < s.length; b++) {
s[b] = s[b].replace(" ", "");
var w = void 0;
switch (s[b]) {
case "required":
c = !0, x = w = t._required(a, s, b, r);
break;

case "conditionalRequired":
w = t._conditionalRequired(a, s, b, r), w && (c = !0);
break;

case "custom":
w = t._customRegex(a, s, b, r);
break;

case "groupRequired":
var C = "[" + r.validateAttribute + "*=" + s[b + 1] + "]", T = _.find(C).eq(0);
if (T[0] != a[0]) {
t._validateField(T, r, i), r.showArrow = !0;
continue;
}
w = t._groupRequired(a, s, b, r), w && (c = !0), r.showArrow = !1;
break;

case "ajax":
i || (t._ajax(a, s, b, r), d = !0);
break;

case "minSize":
w = t._minSize(a, s, b, r);
break;

case "minSizeDigits":
w = t._minSizeDigits(a, s, b, r);
break;

case "maxSize":
w = t._maxSize(a, s, b, r);
break;

case "min":
w = t._min(a, s, b, r);
break;

case "max":
w = t._max(a, s, b, r);
break;

case "realPhone":
w = t._realPhone(a, s, b, r);
break;

case "past":
w = t._past(a, s, b, r);
break;

case "future":
w = t._future(a, s, b, r);
break;

case "dateRange":
var C = "[" + r.validateAttribute + "*=" + s[b + 1] + "]", T = _.find(C).eq(0), P = _.find(C).eq(1);
(T[0].value || P[0].value) && (w = t._dateRange(T, P, s, b, r)), w && (c = !0), 
r.showArrow = !1;
break;

case "dateTimeRange":
var C = "[" + r.validateAttribute + "*=" + s[b + 1] + "]", T = _.find(C).eq(0), P = _.find(C).eq(1);
(T[0].value || P[0].value) && (w = t._dateTimeRange(T, P, s, b, r)), w && (c = !0), 
r.showArrow = !1;
break;

case "maxCheckbox":
w = t._maxCheckbox(_, a, s, b, r), a = e(_.find("input[name='" + u + "']"));
break;

case "minCheckbox":
w = t._minCheckbox(_, a, s, b, r), a = e(_.find("input[name='" + u + "']"));
break;

case "equals":
w = t._equals(a, s, b, r);
break;

case "greater":
w = t._greater(a, s, b, r);
break;

case "funcCall":
w = t._funcCall(a, s, b, r);
break;

case "creditCard":
w = t._creditCard(a, s, b, r);
break;

case "year":
w = t._year(a, s, b, r);
break;

case "age":
w = t._age(a, s, b, r);
}
void 0 !== w && (f && f[s[b]] && (w = f[s[b]]), v += w + "<br/>", r.isError = !0);
}
c && (x || f.hasOwnProperty("required")) ? v = f.hasOwnProperty("required") ? f.required :x :c || (t._equalsComment(a) || "" == a.val().trim()) && (r.isError = !1);
var F = a.prop("type");
if (("radio" == F || "checkbox" == F) && _.find("input[name='" + u + "']").size() > 1 && (a = e(_.find("input[name='" + u + "'][type!=hidden]:first")), 
r.showArrow = !1), "password" == F) {
var k = a.next("#" + a.attr("id") + "_clear");
k.length > 0 && (a = a.next("#" + a.attr("id") + "_clear"));
}
"text" == F && _.find("input[name='" + u + "']").size() > 1 && (a = e(_.find("input[name='" + u + "'][type!=hidden]:first")), 
r.showArrow = !1);
var E = e.inArray(a[0], r.InvalidFields);
-1 == E ? r.isError && r.InvalidFields.push(a[0]) :r.isError || r.InvalidFields.splice(E, 1);
var A = r.showOnePopup ? r.InvalidFields.length > 0 && r.InvalidFields[0] == a.get(0) :!0;
return r.isError && A ? t._showPrompt(a, v, "", !1, r) :d || t._closePrompt(a), 
d || a.trigger("jqv.field.result", [ a, r.isError, v ]), r.isError ? (a.addClass("errorField").attr("aria-invalid", !0), 
a.attr("id").indexOf("_clear") >= 0 && a.prev('[type="password"]').addClass("errorField").attr("aria-invalid", !0), 
a.siblings(".select-replace").addClass("errorField").attr("aria-invalid", !0)) :(a.removeClass("errorField").attr("aria-invalid", !1), 
a.attr("id").indexOf("_clear") >= 0 && a.prev('[type="password"]').removeClass("errorField").attr("aria-invalid", !1), 
a.siblings(".select-replace").removeClass("errorField").attr("aria-invalid", !1)), 
r.isError;
},
_textTemplate:function(e, t) {
if (!e || 0 == t.length) return !1;
for (var a = 1; a <= t.length; a++) e = e.replace("%" + a, t[a - 1]);
return e;
},
_required:function(e, a, r, i) {
switch (e.prop("type")) {
case "text":
case "password":
case "textarea":
case "file":
default:
if (t._equalsComment(e) || !e.val().trim()) return i.allrules[a[r]].alertText;
break;

case "radio":
case "checkbox":
var n = e.closest("form"), o = e.attr("name");
if (0 == n.find("input[name='" + o + "']:checked").size()) return 1 == n.find("input[name='" + o + "']").size() ? e.attr(i.validationNameAttributeName) ? t._textTemplate(i.allrules[a[r]].alertTextCheckboxTemplate, [ e.attr(i.validationNameAttributeName) ]) :i.allrules[a[r]].alertTextCheckbox :i.allrules[a[r]].alertTextCheckboxMultiple;
break;

case "select-one":
if (!e.val().trim()) return i.allrules[a[r]].alertText;
break;

case "select-multiple":
if (!e.find("option:selected").val().trim()) return i.allrules[a[r]].alertText;
}
},
_conditionalRequired:function(a, r, i, n) {
for (var o = !1, l = i + 1; l < r.length && "" !== r[l]; l++) {
var s = e("#" + r[l].trim());
s.length > 0 && !t._required(s, [ "required" ], 0, n) && (o = !0);
}
return o && t._required(a, [ "required" ], 0, n) ? n.allrules[r[i]].alertText :void 0;
},
_groupRequired:function(a, r, i, n) {
var o = "[" + n.validateAttribute + "*=" + r[i + 1] + "]", l = !1;
return a.closest("form").find(o).each(function() {
return t._required(e(this), r, i, n) ? void 0 :(l = !0, !1);
}), l ? void 0 :n.allrules[r[i]].alertText;
},
_customRegex:function(e, t, a, r) {
var i = t[a + 1], n = r.allrules[i];
if (!n) return alert("jqv:custom rule not found " + i), !1;
var o = n.regex;
if (!o) return alert("jqv:custom regex not found " + i), !1;
var l = new RegExp(o);
return l.test(e.val()) ? void 0 :r.allrules[i].alertText;
},
_funcCall:function(e, t, a, r) {
var i = t[a + 1], n = window[i] || r.customFunctions[i];
return "function" == typeof n ? n(e, t, a, r) :void 0;
},
_equals:function(a, r, i, n) {
var o = r[i + 1];
return a.val() != e("#" + o).val() ? "password" == a.prop("type") ? n.allrules.equals.alertTextPassword :a.attr(n.validationNameAttributeName) ? t._textTemplate(n.allrules.equals.alertTextTemplate, [ a.attr(n.validationNameAttributeName) ]) :n.allrules.equals.alertText :void 0;
},
_greater:function(a, r, i, n) {
var o = r[i + 1], l = parseInt(a.val()), s = parseInt(e("#" + o).val());
return s >= l ? a.attr(n.validationNameAttributeName) ? t._textTemplate(n.allrules.greater.alertText, [ a.attr(n.validationNameAttributeName) ]) :t._textTemplate(n.allrules.greater.alertText, [ s ]) :void 0;
},
_maxSize:function(e, a, r, i) {
var n = a[r + 1], o = e.val().length;
if (o > n) {
var l = i.allrules.maxSize;
return t._textTemplate(l.alertText, [ n ]);
}
},
_minSize:function(e, a, r, i) {
var n = a[r + 1], o = e.val().length;
if (n > o) {
var l = i.allrules.minSize;
return t._textTemplate(l.alertText, [ n ]);
}
},
_minSizeDigits:function(e, a, r, i) {
var n = a[r + 1], o = e.val(), l = o.replace(/[^0-9]/g, ""), s = l.length;
if (n > s) {
var d = i.allrules.minSizeDigits;
return t._textTemplate(d.alertText, [ n ]);
}
},
_realPhone:function(e, t, a, r) {
var i = e.val(), n = this._minSizeDigits(e, t, a, r);
if (void 0 === n) {
var o = new RegExp(r.allrules.phone.regex);
o.test(i) || (n = r.allrules.phone.alertText);
}
if (void 0 === n) {
var l, s = i.replace(/[^0-9]/g, "").split(""), d = s.length, u = [], v = 0;
for (l = 0; d > l; l++) void 0 === u[s[l]] && (u[s[l]] = 1, v++);
3 > v && (n = r.allrules.realPhone.alertText);
}
return void 0 === n && /12345/.test(i) && (n = r.allrules.realPhone.alertText), 
n;
},
_min:function(e, a, r, i) {
var n = parseFloat(a[r + 1]), o = parseFloat(e.val());
if (n > o) {
var l = i.allrules.min;
return t._textTemplate(l.alertText, [ n ]);
}
},
_max:function(e, a, r, i) {
var n = parseFloat(a[r + 1]), o = parseFloat(e.val());
if (o > n) {
var l = i.allrules.max;
return t._textTemplate(l.alertText, [ n ]);
}
},
_past:function(e, a, r, i) {
var n = a[r + 1], o = "now" == n.toLowerCase() ? new Date() :t._parseDate(n), l = t._parseDate(e.val());
if (l > o) {
var s = i.allrules.past;
return t._textTemplate(s.alertText, [ t._dateToString(o) ]);
}
},
_future:function(e, a, r, i) {
var n = a[r + 1], o = "now" == n.toLowerCase() ? new Date() :t._parseDate(n), l = t._parseDate(e.val());
if (o > l) {
var s = i.allrules.future;
return t._textTemplate(s.alertText, [ t._dateToString(o) ]);
}
},
_isDate:function(e) {
var t = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
return t.test(e);
},
_isDateTime:function(e) {
var t = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
return t.test(e);
},
_dateCompare:function(e, t) {
return new Date(e.toString()) < new Date(t.toString());
},
_dateRange:function(e, a, r, i, n) {
return !e[0].value && a[0].value || e[0].value && !a[0].value ? n.allrules[r[i]].alertText :t._isDate(e[0].value) && t._isDate(a[0].value) && t._dateCompare(e[0].value, a[0].value) ? void 0 :n.allrules[r[i]].alertText;
},
_dateTimeRange:function(e, a, r, i, n) {
return !e[0].value && a[0].value || e[0].value && !a[0].value ? n.allrules[r[i]].alertText :t._isDateTime(e[0].value) && t._isDateTime(a[0].value) && t._dateCompare(e[0].value, a[0].value) ? void 0 :n.allrules[r[i]].alertText;
},
_maxCheckbox:function(e, a, r, i, n) {
var o = r[i + 1], l = a.attr("name"), s = e.find("input[name='" + l + "']:checked").size();
return s > o ? (n.showArrow = !1, t._textTemplate(n.allrules.maxCheckbox.alertText, [ o ])) :void 0;
},
_minCheckbox:function(e, a, r, i, n) {
var o = r[i + 1], l = a.attr("name"), s = e.find("input[name='" + l + "']:checked").size();
return o > s ? (n.showArrow = !1, 1 == o ? n.allrules.minCheckbox.alertText :t._textTemplate(n.allrules.minCheckbox.alertTextPlural, [ o ])) :void 0;
},
_creditCard:function(e, t, a, r) {
var i = !1, n = e.val().replace(/ +/g, "").replace(/-+/g, ""), o = n.length;
if (o >= 14 && 16 >= o && parseInt(n) > 0) {
var l, s = 0, a = o - 1, d = 1, u = new String();
do l = parseInt(n.charAt(a)), u += d++ % 2 == 0 ? 2 * l :l; while (--a >= 0);
for (a = 0; a < u.length; a++) s += parseInt(u.charAt(a));
i = s % 10 == 0;
}
return i ? void 0 :r.allrules.creditCard.alertText;
},
_year:function(e, a, r, i) {
var n = e.val(), o = !0;
if (t._equalsComment(e)) return void 0;
if (isNaN(n)) o = !1; else if (0 >= n) o = !1; else {
var l = new Date(), s = l.getFullYear();
n > s + 10 && (o = !1);
}
return o ? void 0 :i.allrules.year.alertText;
},
_age:function(e, a, r, i) {
var n = e.val(), o = !0;
return t._equalsComment(e) ? void 0 :(isNaN(n) ? o = !1 :0 > n && (o = !1), o ? void 0 :i.allrules.age.alertText);
},
_equalsComment:function(e) {
return void 0 !== e.attr("comment") && e.val() === e.attr("comment") ? !0 :!1;
},
_ajax:function(a, r, i, n) {
var o = r[i + 1], l = n.allrules[o], s = l.extraData, d = l.extraDataDynamic;
if (s || (s = ""), d) {
for (var u = [], v = String(d).split(","), i = 0; i < v.length; i++) {
var c = v[i];
if (e(c).length) {
var f = a.closest("form").find(c).val(), p = c.replace("#", "") + "=" + escape(f);
u.push(p);
}
}
d = u.join("&");
} else d = "";
n.isError || e.ajax({
type:"GET",
url:l.url,
cache:!1,
dataType:"json",
data:"fieldId=" + a.attr("id") + "&fieldValue=" + a.val() + "&extraData=" + s + "&" + d,
field:a,
rule:l,
methods:t,
options:n,
beforeSend:function() {
var e = l.alertTextLoad;
e && t._showPrompt(a, e, "load", !0, n);
},
error:function(e, a) {
t._ajaxError(e, a);
},
success:function(a) {
var r = a[0], i = e(e("input[id='" + r + "']")[0]);
if (1 == i.length) {
var o = a[1], s = a[2];
if (o) {
if (void 0 !== n.ajaxValidCache[r] && (n.ajaxValidCache[r] = !0), s) {
if (n.allrules[s]) {
var d = n.allrules[s].alertTextOk;
d && (s = d);
}
} else s = l.alertTextOk;
s ? t._showPrompt(i, s, "pass", !0, n) :t._closePrompt(i);
} else {
if (n.ajaxValidCache[r] = !1, n.isError = !0, s) {
if (n.allrules[s]) {
var d = n.allrules[s].alertText;
d && (s = d);
}
} else s = l.alertText;
t._showPrompt(i, s, "", !0, n);
}
}
i.trigger("jqv.field.result", [ i, n.isError, s ]);
}
});
},
_ajaxError:function(e, t) {
0 == e.status && null == t ? alert("The page is not served from a server! ajax call failed") :"undefined" != typeof console && console.log("Ajax error: " + e.status + " " + t);
},
_dateToString:function(e) {
return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
},
_parseDate:function(e) {
var t = e.split("-");
return t == e && (t = e.split("/")), new Date(t[0], t[1] - 1, t[2]);
},
_showPrompt:function(e, a, r, i, n, o) {
var l = t._getPrompt(e);
o && (l = !1), l ? t._updatePrompt(e, l, a, r, i, n) :t._buildPrompt(e, a, r, i, n);
},
_buildPrompt:function(a, r, i, n, o) {
var l = e("<div>");
switch (l.addClass(t._getClassName(a.attr("id")) + "formError"), a.is(":input") && l.addClass("parentForm" + t._getClassName(a.parents("form").attr("id"))), 
l.addClass("formError"), t.isRTL(a) && l.addClass("formErrorRTL"), i) {
case "pass":
l.addClass("greenPopup");
break;

case "load":
l.addClass("blackPopup");
}
n && l.addClass("ajaxed");
e("<div>").addClass("formErrorContent").html(r).appendTo(l);
if (o.alwaysShowPopupArrow || o.showArrow) {
var s = e("<div>").addClass("formErrorArrow"), d = a.data("promptPosition") || o.promptPosition;
if ("string" == typeof d) {
var u = d.indexOf(":");
-1 != u && (d = d.substring(0, u));
}
switch (d) {
case "bottomCenter":
s.addClass("formErrorArrowCenter");

case "bottomLeft":
case "bottomRight":
l.find(".formErrorContent").before(s), s.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
break;

case "topCenter":
s.addClass("formErrorArrowCenter");

case "topLeft":
case "topRight":
s.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>'), 
l.append(s);
}
}
if (o.relative) {
var v = e("<div>").css("position", "relative").css("vertical-align", "top").addClass("formErrorOuter").append(l.css("position", "absolute"));
a.after(v), o.relativePadding && v.css("padding-bottom", l.height() + "px");
} else o.isOverflown ? a.before(l) :e("body").append(l);
var u = t._calculatePosition(a, l, o);
return l.css({
top:u.callerTopPosition,
left:u.callerleftPosition,
marginTop:u.marginTopSize,
opacity:0
}).data("callerField", a), o.autoHidePrompt && setTimeout(function() {
l.animate({
opacity:0
}, function() {
l.closest(".formErrorOuter").remove(), l.remove();
});
}, o.autoHideDelay), l.animate({
opacity:1
});
},
_updatePrompt:function(e, a, r, i, n, o, l) {
if (a) {
"undefined" != typeof i && ("pass" == i ? a.addClass("greenPopup") :a.removeClass("greenPopup"), 
"load" == i ? a.addClass("blackPopup") :a.removeClass("blackPopup")), n ? a.addClass("ajaxed") :a.removeClass("ajaxed"), 
a.find(".formErrorContent").html(r);
var s = t._calculatePosition(e, a, o), d = {
top:s.callerTopPosition,
left:s.callerleftPosition,
marginTop:s.marginTopSize
};
l ? a.css(d) :a.animate(d);
}
},
_closePrompt:function(e) {
var a = t._getPrompt(e);
a && a.each(function() {
a.parent(".formErrorOuter").remove(), a.remove();
});
},
closePrompt:function(e) {
return t._closePrompt(e);
},
_getPrompt:function(a) {
var r = t._getClassName(a.attr("id")) + "formError", i = e("." + t._escapeExpression(r))[0];
return i ? e(i) :void 0;
},
_escapeExpression:function(e) {
return e.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
},
isRTL:function(t) {
var a = e(document), r = e("html"), i = e("body"), n = t && t.hasClass("rtl") || t && "rtl" === (t.attr("dir") || "").toLowerCase() || a.hasClass("rtl") || "rtl" === (a.attr("dir") || "").toLowerCase() || "rtl" === (r.attr("dir") || "").toLowerCase() || i.hasClass("rtl") || "rtl" === (i.attr("dir") || "").toLowerCase();
return Boolean(n);
},
_calculatePosition:function(e, a, r) {
var i, n, o, l = e.outerWidth(!0), s = e.outerHeight(!0), d = a.width(), u = a.height(), v = r.isOverflown || r.relative;
if (v) i = n = 0, o = -u; else {
var c = e.offset();
i = c.top, isIE && t.isRTL(e) && !jQuery.support.boxModel ? e.each(function() {
n = this.getBoundingClientRect().left;
}) :n = c.left, o = 0;
}
var f = e.data("promptPosition") || r.promptPosition, p = "", m = "", h = 0, g = 0;
if ("string" == typeof f && -1 != f.indexOf(":") && (p = f.substring(f.indexOf(":") + 1), 
f = f.substring(0, f.indexOf(":")), -1 != p.indexOf(",") && (m = p.substring(p.indexOf(",") + 1), 
p = p.substring(0, p.indexOf(",")), g = parseInt(m), isNaN(g) && (g = 0)), h = parseInt(p), 
isNaN(p) && (p = 0)), t.isRTL(e)) switch (f) {
default:
case "topCenter":
v ? n += (l - d) / 2 :(n += (l - d) / 2, i += -u - 2);
break;

case "topLeft":
v ? n -= d - 30 :(n -= d - 30, i += -u - 2);
break;

case "topRight":
v ? n += l - d :(n += l - d, i += -u - 2);
break;

case "centerRight":
v ? (i = s, n = l + 5) :n += l + 5;
break;

case "centerLeft":
n -= d + 5;
break;

case "bottomCenter":
v ? n += (l - d) / 2 :(n += (l - d) / 2, i += s + 5);
break;

case "bottomLeft":
n += -d + 30, i += s + 5;
break;

case "bottomRight":
n += l - d, i += s + 5;
} else switch (f) {
default:
case "topCenter":
v ? n += (l - d) / 2 :(n += (l - d) / 2, i += -u - 2);
break;

case "topRight":
v ? n += l - 30 :(n += l - 30, i += -u - 2);
break;

case "topLeft":
i += -u - 10;
break;

case "centerRight":
v ? (i = s, n = l + 5) :n += l + 5;
break;

case "centerLeft":
n -= d + 5;
break;

case "bottomCenter":
v ? n += (l - d) / 2 :(n += (l - d) / 2, i += s + 5);
break;

case "bottomLeft":
i += s + 5;
break;

case "bottomRight":
n += l - 30, i += s + 5;
}
return n += h, i += g, r.screenLimitPadding >= 0 && (n < r.screenLimitPadding ? n = r.screenLimitPadding :n + d + r.screenLimitPadding > window.innerWidth && (n = window.innerWidth - d - r.screenLimitPadding)), 
{
callerTopPosition:i + "px",
callerleftPosition:n + "px",
marginTopSize:o + "px"
};
},
_saveOptions:function(t, a) {
if (e.validationEngineLanguage) {
e.validationEngineLanguage.allRules || e.validationEngineLanguage.newLang();
var r = e.validationEngineLanguage.allRules;
} else e.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
e.validationEngine.defaults.allrules = r;
var i = e.extend(!0, {}, e.validationEngine.defaults, a);
return i.isOverflown && (i.relative = !0), i.relative && (i.isOverflown = !0), t.data("jqv", i), 
i;
},
_getClassName:function(e) {
return e ? e.replace(/:/g, "_").replace(/\./g, "_") :void 0;
}
};
e.fn.validationEngine = function(a) {
var r = e(this);
return r[0] ? "string" == typeof a && "_" != a.charAt(0) && t[a] ? ("showPrompt" != a && "hidePrompt" != a && "hide" != a && "hideAll" != a && t.init.apply(r), 
t[a].apply(r, Array.prototype.slice.call(arguments, 1))) :"object" != typeof a && a ? void e.error("Method " + a + " does not exist in jQuery.validationEngine") :(t.init.apply(r, arguments), 
t.attach.apply(r)) :!1;
}, e.validationEngine = {
defaults:{
validationEventTrigger:"blur",
scroll:!1,
focusFirstField:!0,
promptPosition:"topCenter",
screenLimitPadding:5,
bindMethod:"bind",
inlineAjax:!1,
ajaxFormValidation:!1,
ajaxFormValidationURL:!1,
onAjaxFormComplete:e.noop,
onBeforeAjaxFormValidation:e.noop,
onValidationComplete:!1,
relative:!1,
relativePadding:!1,
isOverflown:!1,
overflownDIV:"",
doNotShowAllErrosOnSubmit:!1,
showOnePopup:!0,
alwaysShowPopupArrow:!0,
binded:!1,
showArrow:!0,
isError:!1,
ajaxValidCache:{},
autoPositionUpdate:!1,
InvalidFields:[],
onSuccess:!1,
onFailure:!1,
autoHidePrompt:!0,
autoHideDelay:3e3,
fadeDuration:.2,
customValidationMessageAttributeName:"customValidationMessage",
validationNameAttributeName:"validationName"
}
}, e(function() {
e.validationEngine.defaults.promptPosition = "topCenter";
});
}(jQuery);
jQuery(document).ready(function(e) {
e.fn.validationEngineLanguage = function() {}, e.validationEngineLanguage = {
translate:function(e) {
return void 0 !== window.ValidationPluginDictionary ? window.ValidationPluginDictionary[e] :e;
},
newLang:function() {
e.validationEngineLanguage.allRules = {
required:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for required"),
alertTextCheckboxMultiple:e.validationEngineLanguage.translate("Rule alert for required checkbox multiple"),
alertTextCheckbox:e.validationEngineLanguage.translate("Rule alert for required checkbox"),
alertTextCheckboxTemplate:e.validationEngineLanguage.translate("Rule alert for required checkbox template"),
alertTextDateRange:"Both date range fields are required"
},
conditionalRequired:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for required")
},
dateRange:{
regex:"none",
alertText:"Invalid Date Range"
},
dateTimeRange:{
regex:"none",
alertText:"Invalid Date Time Range"
},
minSize:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for minSize")
},
minSizeDigits:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for minSize digits")
},
maxSize:{
regex:"none",
alertText:"Maximum %1 characters allowed"
},
groupRequired:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for groupRequired")
},
min:{
regex:"none",
alertText:"Minimum value is %1"
},
max:{
regex:"none",
alertText:"Maximum value is %1"
},
past:{
regex:"none",
alertText:"Date prior to %1"
},
future:{
regex:"none",
alertText:"Date past %1"
},
maxCheckbox:{
regex:"none",
alertText:"Maximum %1 options allowed"
},
minCheckbox:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for minCheckbox"),
alertTextPlural:e.validationEngineLanguage.translate("Rule alert for minCheckbox plural")
},
equals:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for equals"),
alertTextPassword:e.validationEngineLanguage.translate("Rule alert for equals password"),
alertTextTemplate:e.validationEngineLanguage.translate("Rule alert for equals template")
},
greater:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for greater")
},
creditCard:{
regex:"none",
alertText:"Invalid credit card number"
},
year:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for year")
},
age:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for age")
},
phone:{
regex:/^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
alertText:e.validationEngineLanguage.translate("Rule alert for phone")
},
realPhone:{
regex:"none",
alertText:e.validationEngineLanguage.translate("Rule alert for phone")
},
email:{
regex:/^[_a-z0-9-]+((\.|\+)[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.(?:[a-z]{2,4}|email))$/i,
alertText:e.validationEngineLanguage.translate("Rule alert for email address")
},
passwordLegalChars:{
regex:/^[^+]+$/,
alertText:e.validationEngineLanguage.translate("Rule alert for illegal characters in password")
},
validGedcomFile:{
regex:/\.ged$/i,
alertText:e.validationEngineLanguage.translate("Rule alert for illegal gedcom file")
},
integer:{
regex:/^[\-\+]?\d+$/,
alertText:"Not a valid integer"
},
number:{
regex:/^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
alertText:"Invalid floating decimal number"
},
date:{
regex:/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
alertText:"Invalid date, must be in YYYY-MM-DD format"
},
individualName:{
regex:/^[^!@#\$%\^\*<>\/,\{\}\[\]~;:]+$/i,
alertText:e.validationEngineLanguage.translate("Rule alert for individualName")
},
fullName:{
regex:/^[^ ]+ +[^ ]+.*$/i,
alertText:e.validationEngineLanguage.translate("Rule alert for full name")
},
ipv4:{
regex:/^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
alertText:"Invalid IP address"
},
url:{
regex:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
alertText:"Invalid URL"
},
ssn:{
regex:/^([0-6]\d{2}|7[0-6]\d|77[0-2])([ \-]?)(\d{2})\2(\d{4})$/,
alertText:"Invalid SSN, expected format is AAA-GG-SSSS"
},
onlyNumberSp:{
regex:/^[0-9\ ]+$/,
alertText:"Numbers only"
},
onlyLetterSp:{
regex:/^[a-zA-Z\ \']+$/,
alertText:"Letters only"
},
onlyLetterNumber:{
regex:/^[0-9a-zA-Z]+$/,
alertText:"No special characters allowed"
},
ajaxUserCall:{
url:"ajaxValidateFieldUser",
extraData:"name=eric",
alertText:"This user is already taken",
alertTextLoad:"Validating, please wait"
},
ajaxUserCallPhp:{
url:"phpajax/ajaxValidateFieldUser.php",
extraData:"name=eric",
alertTextOk:"This username is available",
alertText:"This user is already taken",
alertTextLoad:"Validating, please wait"
},
ajaxNameCall:{
url:"ajaxValidateFieldName",
alertText:"This name is already taken",
alertTextOk:"This name is available",
alertTextLoad:"Validating, please wait"
},
ajaxNameCallPhp:{
url:"phpajax/ajaxValidateFieldName.php",
alertText:"This name is already taken",
alertTextLoad:"Validating, please wait"
},
validate2fields:{
alertText:"Please input HELLO"
},
dateFormat:{
regex:/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
alertText:"Invalid Date"
},
dateTimeFormat:{
regex:/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
alertText:"Invalid Date or Date Format",
alertText2:"Expected Format: ",
alertText3:"mm/dd/yyyy hh:mm:ss AM|PM or ",
alertText4:"yyyy-mm-dd hh:mm:ss AM|PM"
},
passwordRequirementVariantFiveCharsUpperAndLowerCase:{
regex:/^(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
alertText:e.validationEngineLanguage.translate("Password requirements five chars upper and lower case")
},
passwordRequirementVariantEightCharsUpperAndLowerCase:{
regex:/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
alertText:e.validationEngineLanguage.translate("Password requirements eight chars upper and lower case")
},
passwordRequirementVariantEightCharsUpperAndLowerCaseAndNumber:{
regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
alertText:e.validationEngineLanguage.translate("Password requirements eight chars upper and lower case and digit")
}
};
}
};
});
!function(t) {
var e = -1, o = -1, a = function(e) {
var o = 1, a = t(e), n = null, r = [];
return a.each(function() {
var e = t(this), a = e.offset().top - i(e.css("margin-top")), s = r.length > 0 ? r[r.length - 1] :null;
null === s ? r.push(e) :Math.floor(Math.abs(n - a)) <= o ? r[r.length - 1] = s.add(e) :r.push(e), 
n = a;
}), r;
}, i = function(t) {
return parseFloat(t) || 0;
}, n = function(e) {
var o = {
byRow:!1,
remove:!1,
property:"height"
};
return "object" == typeof e ? t.extend(o, e) :("boolean" == typeof e ? o.byRow = e :"remove" === e && (o.remove = !0), 
o);
}, r = t.fn.matchHeight = function(e) {
var o = n(e);
if (o.remove) {
var a = this;
return this.css(o.property, ""), t.each(r._groups, function(t, e) {
e.elements = e.elements.not(a);
}), this;
}
return this.length <= 1 ? this :(r._groups.push({
elements:this,
options:o
}), r._apply(this, o), this);
};
r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, 
r._afterUpdate = null, r._apply = function(e, o) {
var s = n(o), h = t(e), c = [ h ], l = t(window).scrollTop(), p = t("html").outerHeight(!0), d = h.parents().filter(":hidden");
return d.each(function() {
var e = t(this);
e.data("style-cache", e.attr("style"));
}), d.css("display", "block"), s.byRow && (h.each(function() {
var e = t(this), o = "inline-block" === e.css("display") ? "inline-block" :"block";
e.data("style-cache", e.attr("style")), e.css({
display:o,
"padding-top":"0",
"padding-bottom":"0",
"margin-top":"0",
"margin-bottom":"0",
"border-top-width":"0",
"border-bottom-width":"0",
height:"100px"
});
}), c = a(h), h.each(function() {
var e = t(this);
e.attr("style", e.data("style-cache") || "");
})), t.each(c, function(e, o) {
var a = t(o), n = 0;
return s.byRow && a.length <= 1 ? void a.css(s.property, "") :(a.each(function() {
var e = t(this), o = "inline-block" === e.css("display") ? "inline-block" :"block", a = {
display:o
};
a[s.property] = "", e.css(a), e.outerHeight(!1) > n && (n = e.outerHeight(!1)), 
e.css("display", "");
}), void a.each(function() {
var e = t(this), o = 0;
"border-box" !== e.css("box-sizing") && (o += i(e.css("border-top-width")) + i(e.css("border-bottom-width")), 
o += i(e.css("padding-top")) + i(e.css("padding-bottom"))), e.css(s.property, n - o);
}));
}), d.each(function() {
var e = t(this);
e.attr("style", e.data("style-cache") || null);
}), r._maintainScroll && t(window).scrollTop(l / p * t("html").outerHeight(!0)), 
this;
}, r._applyDataApi = function() {
var e = {};
t("[data-match-height], [data-mh]").each(function() {
var o = t(this), a = o.attr("data-match-height") || o.attr("data-mh");
a in e ? e[a] = e[a].add(o) :e[a] = o;
}), t.each(e, function() {
this.matchHeight(!0);
});
};
var s = function(e) {
r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function() {
r._apply(this.elements, this.options);
}), r._afterUpdate && r._afterUpdate(e, r._groups);
};
r._update = function(a, i) {
if (i && "resize" === i.type) {
var n = t(window).width();
if (n === e) return;
e = n;
}
a ? -1 === o && (o = setTimeout(function() {
s(i), o = -1;
}, r._throttle)) :s(i);
}, t(r._applyDataApi), t(window).bind("load", function(t) {
r._update(!1, t);
}), t(window).bind("resize orientationchange", function(t) {
r._update(!0, t);
});
}(jQuery);
