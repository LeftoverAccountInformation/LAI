/* #vfic now: 30 Aug 2019 13:31:13 on web249 */ 
!function(e) {
function t(a) {
if (n[a]) return n[a].exports;
var o = n[a] = {
i:a,
l:!1,
exports:{}
};
return e[a].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
}
var n = {};
return t.m = e, t.c = n, t.d = function(e, n, a) {
t.o(e, n) || Object.defineProperty(e, n, {
enumerable:!0,
get:a
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
var a = Object.create(null);
if (t.r(a), Object.defineProperty(a, "default", {
enumerable:!0,
value:e
}), 2 & n && "string" != typeof e) for (var o in e) t.d(a, o, function(t) {
return e[t];
}.bind(null, o));
return a;
}, t.n = function(e) {
var n = e && e.__esModule ? function() {
return e["default"];
} :function() {
return e;
};
return t.d(n, "a", n), n;
}, t.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, t.p = "/FP/Assets/Cache/output/", t(t.s = "7099d9badc9f1a4571fc");
}({
"5aef2a6e3fd48bb06a74":function(e, t, n) {
"use strict";
n.p = window.AssetManager ? window.AssetManager.R_JS("/FP/Assets/Cache/output/") :"";
},
"7099d9badc9f1a4571fc":function(e, t, n) {
"use strict";
n("5aef2a6e3fd48bb06a74"), n("df057236630e017352c8");
},
cc56d8eb241f8dac47ea:function(e, t) {},
df057236630e017352c8:function(e, t, n) {
"use strict";
n("cc56d8eb241f8dac47ea");
var a = document.getElementById("dna_strip_health_button"), o = document.getElementById("dna_strip_ancestry_button"), r = document.getElementById("top_dna_two_offers_button");
a && (a.onclick = function() {
return window.writeRedirectActivity("CompanyHomePage.Health.BelowTheFoldHealthDnaCtaClick", window.healthData.dna_enhancement_variant, window.healthData.health_lp_url);
}), o && (o.onclick = function() {
return window.writeRedirectActivity("CompanyHomePage.Health.BelowTheFoldAncestryDnaCtaClick", window.healthData.dna_enhancement_variant, window.CompanyHomeGeneral.dnaLandingPageUrl);
}), r && (r.onclick = function() {
return window.writeRedirectActivity("CompanyHomePage.Health.AboveTheFoldCtaClick", window.healthData.dna_enhancement_variant, window.healthData.health_two_offers_lp_url);
});
}
});
