/* #vfic now: 30 Aug 2019 13:23:33 on web257 */ 
!function(r) {
"use strict";
function e(r) {
return r.replace(/\n/g, " ").replace(/\s+/g, " ").replace(/\s*([\{\}\(\):,])\s*/g, "$1").trim();
}
var n = "{lang_code}", t = "//familygraphql.myheritage.com";
r.FamilyGraphQl = function(e) {
function n(r, e) {
var n = r.data || [], t = r.errors || [];
e.resolve({
data:n,
errors:t
});
}
function a(r, e) {
var n = Array.isArray(e) && e.length > 0 ? _.pluck(e, "message").join(", ") :"Unexpected error";
r.reject({
data:[],
errors:[ {
message:n
} ]
});
}
function i() {
return e ? e.getParamsToEnhanceRequest() :null;
}
function o(r, e) {
!r.data || Array.isArray(r.errors) && r.errors.length > 0 ? a(e, r.errors) :n(r, e);
}
function u(r, e) {
r && r.responseJSON ? n(r.responseJSON, e) :r && "abort" === r.statusText ? e.reject("abort") :a(e);
}
this.lang = "EN", this.setLanguage = function(r) {
this.lang = r;
}, this.composeArgumentsString = function(r, e) {
e = e || Object.keys(r);
var n = [];
for (var t in r) if (e.indexOf(t) >= 0) {
var a = r[t];
"number" != typeof a && (a = '"' + ("string" == typeof a ? a.replace('"', '\\"') :a) + '"'), 
n.push(t + ": " + a);
}
return n.join(", ");
}, this.getBulkActionObject = function(r, e, n, t) {
var a = {};
for (var i in n) t.indexOf(i) >= 0 && (a[i] = n[i]);
var o = {};
return o[r] = {
update:e,
params:a
}, {
bulk_action:o
};
}, this.query = function(e, n, a, s) {
var c = jQuery.Deferred();
if (!s || !s.description) return c.reject("You must pass a description."), c;
var p = t, f = {
bearer_token:e,
query:r.prepareQuery(n, this.lang),
operation:a
};
if (s && (jQuery.extend(f, s), s.description)) {
var y = r.snakify(s.description);
y && (p += "/" + y + "/");
}
jQuery.extend(f, i());
var d = jQuery.isPlainObject(s) && s.timeout && isNaN(s.timeout);
d && delete f.timeout;
var l = jQuery.ajax({
url:p,
type:"POST",
data:f,
success:function(r) {
o(r, c);
},
error:function(r) {
u(r, c);
}
});
return d && s.timeout.then(function() {
l.abort();
}), c;
}, this.mutation = function(e, n, a, s, c) {
var p = jQuery.Deferred(), f = new FormData();
f.append("bearer_token", e), f.append("query", r.prepareQuery(n, this.lang)), a && f.append("variables", JSON.stringify(a));
for (var y in s) s.hasOwnProperty(y) && f.append(y, s[y]);
c && f.append("operation", c);
var d = i();
if (d) for (var l in d) d.hasOwnProperty(l) && f.append(l, d[l]);
return jQuery.ajax({
url:t,
type:"POST",
data:f,
processData:!1,
contentType:!1,
success:function(r) {
o(r, p);
},
error:function(r) {
u(r, p);
}
}), p;
};
}, r.snakify = function(r) {
return r.replace(/[\'\"]/g, "").toLowerCase().match(/([a-zA-Z0-9]+)/g).reduce(function(r, e) {
return r + "_" + e;
});
}, r.prepareQuery = function(r, t) {
return r = r.replace(new RegExp(n, "g"), t), JSON.stringify(e(r));
};
}(window.api = window.api || {});
