/* #vfic now: 30 Aug 2019 13:23:33 on web258 */ 
!function(t) {
"use strict";
var a = [ "mh_automations", "featureFlagData", "automation_test_services" ], n = "mhc#";
t.RequestEnhancer = function() {
this.getParamsToEnhanceRequest = function() {
var t = {};
return a.forEach(function(a) {
var e = getCookie(a);
null !== e && (t[n + a] = e);
}), t;
};
};
}(window.api = window.api || {});
