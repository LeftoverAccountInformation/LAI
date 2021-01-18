/* #vfic now: 30 Aug 2019 13:57:57 on web250 */ 
!function(e, t) {
"use strict";
function n(e) {
h = this, u = e || t;
}
function i() {
if (l = u.document.getElementById("payment_iframe"), f = !1, l) {
s = l.contentWindow ? l.contentWindow :l.contentDocument.defaultView;
var e = jQuery(s);
e.on("load", o), e.on("scroll", h.changeHeightOnScroll), jQuery(u).on("resize", h.updateIframeHeight), 
u.successfulLoginCallback = function() {
f = !0;
var e = l.contentWindow;
e.postMessage("after login", "https://www.myheritage.com");
}, jQuery(u).on("message", function(e) {
r(e);
});
}
}
function o() {
p = s.document.getElementById("checkout_height_container"), h.isThin = p && p.getElementsByClassName("thin").length, 
h.defaultHeight = h.isThin ? 430 :750, h.extraHeight = 20, h.currentHeight = 0, 
s.updateIframeHeight = h.updateIframeHeight;
}
function a() {
if (p && p.clientHeight) {
var e = h.currentHeight;
p.clientHeight > h.defaultHeight ? h.currentHeight = p.clientHeight + h.extraHeight :h.currentHeight = h.defaultHeight, 
h.currentHeight !== e && (l.style.height = h.currentHeight + "px");
}
}
function c() {
p && p.clientHeight > h.currentHeight - h.extraHeight && h.updateIframeHeight();
}
function r(e) {
var t = e.originalEvent;
if (t.origin.match("https://www.myheritage.com")) switch (t.data.message) {
case "open popup":
openSignupPopup(languageCode, {
popupType:"loginOnly",
emailValue:t.data.email,
preFillFieldType:"password",
onCloseCallback:g
});
}
}
function g() {
if (!f) {
var e = l.contentWindow;
e.postMessage("close login", "https://www.myheritage.com");
}
}
var h, u, l, s, p, f;
e.CheckoutFrameController = n, n.prototype = {
init:i,
updateIframeHeight:a,
changeHeightOnScroll:c
};
}(window, window);
