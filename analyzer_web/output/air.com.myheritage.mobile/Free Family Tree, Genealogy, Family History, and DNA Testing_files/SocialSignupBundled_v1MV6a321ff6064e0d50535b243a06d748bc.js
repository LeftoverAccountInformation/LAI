/* #vfic now: 30 Aug 2019 13:19:50 on web263 */ 
!function(e) {
function n(r) {
if (t[r]) return t[r].exports;
var i = t[r] = {
i:r,
l:!1,
exports:{}
};
return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
}
var t = {};
return n.m = e, n.c = t, n.d = function(e, t, r) {
n.o(e, t) || Object.defineProperty(e, t, {
enumerable:!0,
get:r
});
}, n.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value:"Module"
}), Object.defineProperty(e, "__esModule", {
value:!0
});
}, n.t = function(e, t) {
if (1 & t && (e = n(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (n.r(r), Object.defineProperty(r, "default", {
enumerable:!0,
value:e
}), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function(n) {
return e[n];
}.bind(null, i));
return r;
}, n.n = function(e) {
var t = e && e.__esModule ? function() {
return e["default"];
} :function() {
return e;
};
return n.d(t, "a", t), t;
}, n.o = function(e, n) {
return Object.prototype.hasOwnProperty.call(e, n);
}, n.p = "/FP/Assets/Cache/output/", n(n.s = "8c6a28adcf76fcad4a89");
}({
"085980ef13ef519a645f":function(e, n, t) {
"use strict";
function r(e) {
return e && e.__esModule ? e :{
"default":e
};
}
function i(e) {
if (e && e.__esModule) return e;
var n = {};
if (null != e) for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, t) :{};
r.get || r.set ? Object.defineProperty(n, t, r) :n[t] = e[t];
}
return n["default"] = e, n;
}
function o(e) {
for (var n = 1; n < arguments.length; n++) {
var t = null != arguments[n] ? arguments[n] :{}, r = Object.keys(t);
"function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(t).filter(function(e) {
return Object.getOwnPropertyDescriptor(t, e).enumerable;
}))), r.forEach(function(n) {
a(e, n, t[n]);
});
}
return e;
}
function a(e, n, t) {
return n in e ? Object.defineProperty(e, n, {
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[n] = t, e;
}
function s(e) {
var n = e.isLogin, t = e.successfulSignupCallback, r = e.successfulLoginCallback, i = e.handleErrorEmailExists, o = e.registrationReason, a = e.handleNewAccountFromLogin;
E.reportButtonClick(m.KNOWN_CLIENT_ID_GOOGLE);
var s = {
successfulSignupCallback:t,
successfulLoginCallback:r,
handleErrorEmailExists:i,
fromLogin:n,
registrationReason:o,
handleNewAccountFromLogin:a
};
return D().then(function() {
return N.getGoogleProfileData();
}).then(function(e) {
return _(P(e), s);
})["catch"](R);
}
function u() {
return h === m.KNOWN_CLIENT_ID_FACEBOOK ? {
accessToken:FB.getAccessToken(),
userId:FB.getUserID(),
socialNetworkId:h
} :b;
}
function c(e) {
var n = e.isLogin, t = e.successfulSignupCallback, r = e.successfulLoginCallback, i = e.handleErrorEmailExists, o = e.registrationReason, a = e.handleNewAccountFromLogin;
E.reportButtonClick(m.KNOWN_CLIENT_ID_FACEBOOK);
var s = {
successfulSignupCallback:t,
successfulLoginCallback:r,
handleErrorEmailExists:i,
fromLogin:n,
registrationReason:o,
handleNewAccountFromLogin:a
};
return w().then(function() {
return p.login(L && h === m.KNOWN_CLIENT_ID_FACEBOOK ? {
auth_type:"rerequest"
} :null);
}).then(function(e) {
var n = e.status;
return h = m.KNOWN_CLIENT_ID_FACEBOOK, n === m.FB_STATUS_CONNECTED ? p.getUserData() :Promise.reject(null);
}).then(function(e) {
return e.permissions ? _(e, s) :(g.unknownFail(m.KNOWN_CLIENT_ID_FACEBOOK, "failed to get permissions"), 
Promise.reject(null));
})["catch"](function(e) {
null !== e && (e.type === m.ERR_FB_NOT_AVAILABLE ? g.serviceUnavailable(m.KNOWN_CLIENT_ID_FACEBOOK) :window.FB ? g.unknownFail(m.KNOWN_CLIENT_ID_FACEBOOK, e.message) :g.serviceUnavailable(m.KNOWN_CLIENT_ID_FACEBOOK));
});
}
function l(e) {
if (h === m.KNOWN_CLIENT_ID_FACEBOOK) {
var n = e.filter(function(e) {
return "declined" === e.status;
});
if (n.find(function(e) {
var n = e.permission;
return "user_birthday" === n;
}) && E.reportNoPermissionBirthDate(h), 0 === n.length && E.reportFullPermissions(h), 
L = n.some(function(e) {
return ~S.indexOf(e.permission);
})) return g.failNoPermission(m.KNOWN_CLIENT_ID_FACEBOOK), !1;
}
return !0;
}
function _(e, n) {
var t = e.signUpData, r = e.permissions, i = e.birthDate, o = n.successfulSignupCallback, a = n.successfulLoginCallback, s = n.handleErrorEmailExists, u = n.fromLogin, c = n.registrationReason;
if (l(r)) {
if (t.email || g.unknownFail(void 0, "user email is not provided"), v.DateParserService.calculateAge(i) < 13) return void E.reportFailTooYoung(h);
var _ = Object.keys(t).reduce(function(e, n) {
return t[n] && e.append(n, t[n]), e;
}, new FormData());
return f(_).then(function(e) {
switch (e) {
case m.ACCOUNT_STATUS_LINKED:
return O(_).then(function(e) {
"function" == typeof a ? e && a() :e && window.location.reload();
});

case m.ACCOUNT_STATUS_MAIL_EXIST:
E.reportAccountAlreadyExists(h), s(h, t.email);
break;

case m.ACCOUNT_STATUS_NEW_MEMBER:
if (!u) return _.append("signupReason", c), d(_).then(function(e) {
var n = e.destinationURL, t = e.accountId, r = e.siteId, i = e.returnCode;
1 > i && g.unknownFail(h, "failed to create user. return code ".concat(i)), i === m.SIGNUP_RETURN_CODE_SUCCESS && E.reportSuccessfulRegistration(), 
"function" == typeof o ? o(r, t, n) :n ? n && (window.location.href = n) :window.location.reload();
});
n.handleNewAccountFromLogin ? n.handleNewAccountFromLogin() :g.failNewAccountFromLogin(h);
break;

case m.ACCOUNT_STATUS_ERROR:
g.unknownFail(h, "checkAccountStatus returned an error RESPONSE_USER_NOT_LOGGED_IN_WITH_SOCIAL_NETWORK");
}
});
}
}
function d(e) {
return T["default"].post(m.SIGNUP_MEMBER_URL, e, {
headers:{
"Content-Type":"multipart/form-data"
}
}).then(function(e) {
var n = e.data;
return n;
});
}
function O(e) {
return T["default"].post(m.AUTH_WITH_SOCIAL_NETWORK_URL, e, {
headers:{
"Content-Type":"multipart/form-data"
}
}).then(function(e) {
var n = e.data;
return n;
});
}
function f(e) {
return T["default"].post(m.CHECK_ACCOUNT_STATUS_URL, e, {
headers:{
"Content-Type":"multipart/form-data"
}
}).then(function(e) {
var n = e.data;
return n;
});
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.loginWithGoogle = s, n.getSocialLinkageInfo = u, n.loginWithFacebook = c, 
n.initGoogleAPI = n.getStatisticService = n.initStatisticsService = n.initFacebookAPI = void 0;
var E, g, N = i(t("17fd86197d39cde7d14e")), p = i(t("5c1b8abeb38be21bcd2e")), T = r(t("b45312c3f297dfaa5e2c")), C = t("c27cdd1b7c76313bdfab"), A = r(t("09c470e228d4ca653ac1")), v = t("84981c1f2f19bdbc06c6"), I = r(t("d69a8f91fce45c45409d")), m = t("87c7a1aa683980bcbd97"), S = [ "email" ], L = !1, h = null, b = null, R = function(e) {
e.error && "popup_closed_by_user" === e.error || (e.result && 401 === e.result.error.code ? (gapi.auth2.getAuthInstance().signOut(), 
g.failNoPermission(m.KNOWN_CLIENT_ID_GOOGLE)) :window.gapi ? g.unknownFail(m.KNOWN_CLIENT_ID_GOOGLE, "google api error ".concat(e.result && e.result.error.code)) :g.serviceUnavailable(m.KNOWN_CLIENT_ID_GOOGLE));
}, w = function(e) {
var n = C.getWindow();
return n.facebookAPIPromise || (n.facebookAPIPromise = new Promise(function(n, t) {
p.init({
onSuccess:n,
onError:t,
appId:e
});
})), n.facebookAPIPromise;
};
n.initFacebookAPI = w;
var F = function(e) {
var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :function() {};
return E = A["default"](e), g = I["default"](E, n), E;
};
n.initStatisticsService = F;
var y = function() {
return E;
};
n.getStatisticService = y;
var D = function() {
var e = C.getWindow();
return e.googleAPIPromise || (e.googleAPIPromise = new Promise(function(e, n) {
N.init(e, n);
})), e.googleAPIPromise;
};
n.initGoogleAPI = D;
var P = function(e) {
var n = e.userData, t = e.profileData, r = t.result, i = n.getBasicProfile(), s = function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :[], n = arguments.length > 1 ? arguments[1] :void 0, t = e.find(function(e) {
return e && e.metadata && e.metadata.primary;
});
return o(a({}, n, null), t)[n];
}, u = s(r.genders, "value");
u = "male" === u ? "M" :"female" === u ? "F" :null;
var c = o({
year:null,
month:null,
day:null
}, s(r.birthdays, "date")), l = c.year, _ = new Date(c.year, c.month ? c.month - 1 :null, c.day), d = {
signupFirstName:s(r.names, "givenName"),
signupLastName:s(r.names, "familyName"),
email:s(r.emailAddresses, "value"),
signupEmail:s(r.emailAddresses, "value"),
profile_picture_url:s(r.photos, "url"),
partner_unique_identifier:i.getId(),
partner_token:n.getAuthResponse().id_token,
partner_id:m.KNOWN_CLIENT_ID_GOOGLE,
gender:u,
signupBirthYear:l
};
return h = m.KNOWN_CLIENT_ID_GOOGLE, b = {
accessToken:n.getAuthResponse().id_token,
userId:i.getId(),
socialNetworkId:h
}, {
signUpData:d,
birthDate:_
};
};
},
"09c470e228d4ca653ac1":function(e, n, t) {
"use strict";
function r(e) {
if (e && e.__esModule) return e;
var n = {};
if (null != e) for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, t) :{};
r.get || r.set ? Object.defineProperty(n, t, r) :n[t] = e[t];
}
return n["default"] = e, n;
}
function i(e, n, t) {
return n in e ? Object.defineProperty(e, n, {
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[n] = t, e;
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n["default"] = void 0;
var o = r(t("3d6c0e38d475382cf212")), a = t("87c7a1aa683980bcbd97"), s = "GTM event To GA", u = function(e) {
var n;
return (n = {}, i(n, a.KNOWN_CLIENT_ID_FACEBOOK, o.SCENARIO_FACEBOOK), i(n, a.KNOWN_CLIENT_ID_GOOGLE, o.SCENARIO_GOOGLE), 
n)[e];
}, c = function(e) {
var n = o.FLOWS[e], t = function(e, t) {
var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :!1, i = r ? n[t] :u(t);
window.writeActivityIndicator(e, i);
}, r = function(e, n) {
var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :window.googleAnalyticsTracking;
arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] :new Date();
return t && t.trackEvent(o.GA_CATEGORY, e, n, void 0, void 0, s);
}, i = function(e) {
var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :window.googleAnalyticsTracking;
n && n.trackEventObject(e);
};
return {
reportButtonClick:function(e) {
t(o.CLICK_ON_START_WITH_SOCIAL_NETWORK, e, !0), r(o.CLICK_ON_START_WITH_SOCIAL_NETWORK, o.ID_TO_NETWORK[e]);
},
reportAccountAlreadyExists:function(e) {
return t(o.ACCOUNT_ALREADY_EXIST_POPUP_VIEW, e);
},
reportFullPermissions:function(e) {
return t(o.APPROVED_FULL_PERMISSION, e);
},
reportFailNoPermissions:function(e) {
return t(o.FAILED_TO_CREATE_ACCOUNT_NO_PERMISSION, e);
},
reportFailTooYoung:function(e) {
return t(o.FAILED_TO_CREATE_ACCOUNT_YOUNGER_THAN_13, e);
},
reportFailUnknownReason:function(e) {
return t(o.FAILED_TO_CREATE_ACCOUNT_UNKNOWN_REASON, e);
},
reportFailServiceUnavailable:function(e) {
return t(o.FAILED_TO_CREATE_ACCOUNT_SERVICE_UNAVAILABLE, e);
},
reportNoPermissionBirthDate:function(e) {
return t(o.REJECTED_PERMISSION_FOR_BIRTH_DATE, e);
},
reportFailNoAccount:function(e) {
return t(o.ACTIVITY_FAILED_TO_LOGIN_NO_ACCOUNT, e);
},
reportTCAgreeButtonClick:function() {
t(o.TERMS_STEP_CLICK_ON_CONTINUE), r(o.TERMS_STEP_CLICK_ON_CONTINUE);
},
reportTCCloseButtonClick:function() {
return t(o.TERMS_STEP_CLICK_ON_CLOSE);
},
reportTCStepView:function() {
return r(o.TC_STEP_VIEW);
},
reportSuccessfulRegistration:function() {
switch (e) {
case o.FLOW_NAME_DNA:
i({
event:s,
eventCategory:"Registration",
eventAction:"Popup Registration form success",
eventLabel:"dna landing page"
});
break;

case o.FLOW_NAME_GENEALOGY:
i({
event:s,
eventCategory:"Registration",
eventAction:"Web Registration form success",
eventLabel:"long"
});
}
}
};
};
n["default"] = c;
},
"17fd86197d39cde7d14e":function(e, n, t) {
"use strict";
function r() {
return new Promise(function(e, n) {
try {
s(function(n) {
gapi.client.people.people.get({
resourceName:"people/me",
personFields:"genders,names,emailAddresses,photos,birthdays,addresses"
}).then(function(t) {
return e({
userData:n,
profileData:t
});
});
}, n);
} catch (t) {
n(t);
}
});
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.getGoogleProfileData = r, n.getGoogleProfileDataCB = n.signIn = n.init = void 0;
var i = function(e) {
console.log("Logged in as: " + e.getBasicProfile().getName());
}, o = function(e) {
throw e;
}, a = function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :i, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :o;
window.googleOnLoad = function() {
gapi.load("client:auth2", function() {
gapi.client.init({
clientId:"1064508439328-p17lgt0tod03fvlggoj0c34rgnvlov1u.apps.googleusercontent.com",
discoveryDocs:[ "https://people.googleapis.com/$discovery/rest?version=v1" ],
scope:"profile"
}).then(e, n);
});
}, function(e, t, r) {
var i, o = e.getElementsByTagName(t)[0];
e.getElementById(r) || (i = e.createElement(t), i.id = r, i.onerror = n, i.src = "//apis.google.com/js/platform.js?onload=googleOnLoad", 
o.parentNode.insertBefore(i, o));
}(document, "script", "google-jssdk");
};
n.init = a;
var s = function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :i, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :o, t = gapi.auth2.getAuthInstance();
t.signIn().then(e, n);
};
n.signIn = s;
var u = function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :i, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :o;
s(function(t) {
gapi.client.people.people.get({
resourceName:"people/me",
personFields:"genders,names,emailAddresses,photos,birthdays,addresses"
}).then(function(n) {
return e(t, n);
}, n);
}, n);
};
n.getGoogleProfileDataCB = u;
},
"3d6c0e38d475382cf212":function(e, n, t) {
"use strict";
function r(e, n, t) {
return n in e ? Object.defineProperty(e, n, {
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[n] = t, e;
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.FLOW_NAME_DNA = n.FLOW_NAME_GENEALOGY = n.GA_CATEGORY = n.SCENARIO_FACEBOOK = n.SCENARIO_GOOGLE = n.FLOWS = n.ID_TO_NETWORK = n.FLOW_GENEALOGY = n.FLOW_DNA = n.TC_STEP_VIEW = n.CREATED_ACCOUNT_FROM_LOGIN_FLOW = n.LINKED_EXISTING_ACCOUNT = n.SUCCESSFUL_LOGIN_WITH_SOCIAL_NETWORK = n.TERMS_STEP_CLICK_ON_CLOSE = n.TERMS_STEP_CLICK_ON_BACK = n.TERMS_STEP_CLICK_ON_CONTINUE = n.ACTIVITY_FAILED_TO_LOGIN_NO_ACCOUNT = n.FAILED_TO_CREATE_ACCOUNT_SERVICE_UNAVAILABLE = n.FAILED_TO_CREATE_ACCOUNT_UNKNOWN_REASON = n.FAILED_TO_CREATE_ACCOUNT_YOUNGER_THAN_13 = n.FAILED_TO_CREATE_ACCOUNT_NO_PERMISSION = n.ACCOUNT_ALREADY_EXIST_POPUP_LOGIN_CLICK = n.ACCOUNT_ALREADY_EXIST_POPUP_VIEW = n.REJECTED_PERMISSION_FOR_PROFILE_PHOTO = n.REJECTED_PERMISSION_FOR_BIRTH_DATE = n.APPROVED_FULL_PERMISSION = n.COMPLETED_REGISTRATION_WITH_SOCIAL_NETWORK = n.CLICK_ON_START_WITH_SOCIAL_NETWORK = void 0;
var i, o, a, s = t("87c7a1aa683980bcbd97"), u = "ClickOnStartWithSocialNetwork";
n.CLICK_ON_START_WITH_SOCIAL_NETWORK = u;
var c = "CompletedRegistrationWithSocialNetwork";
n.COMPLETED_REGISTRATION_WITH_SOCIAL_NETWORK = c;
var l = "ApprovedFullPermission";
n.APPROVED_FULL_PERMISSION = l;
var _ = "RejectedPermissionForBirthDate";
n.REJECTED_PERMISSION_FOR_BIRTH_DATE = _;
var d = "RejectedPermissionForProfilePhoto";
n.REJECTED_PERMISSION_FOR_PROFILE_PHOTO = d;
var O = "AccountAlreadyExistPopupView";
n.ACCOUNT_ALREADY_EXIST_POPUP_VIEW = O;
var f = "AccountAlreadyExistPopupLoginClick";
n.ACCOUNT_ALREADY_EXIST_POPUP_LOGIN_CLICK = f;
var E = "FailedToCreateAccountNoPermission";
n.FAILED_TO_CREATE_ACCOUNT_NO_PERMISSION = E;
var g = "FailedToCreateAccountYoungerThan13";
n.FAILED_TO_CREATE_ACCOUNT_YOUNGER_THAN_13 = g;
var N = "FailedToCreateAccountUnknownReason";
n.FAILED_TO_CREATE_ACCOUNT_UNKNOWN_REASON = N;
var p = "FailedToCreateAccountServiceUnavailable";
n.FAILED_TO_CREATE_ACCOUNT_SERVICE_UNAVAILABLE = p;
var T = "FailedToLoginNoAccount";
n.ACTIVITY_FAILED_TO_LOGIN_NO_ACCOUNT = T;
var C = "TermsStepClickOnContinue";
n.TERMS_STEP_CLICK_ON_CONTINUE = C;
var A = "TermsStepClickOnBack";
n.TERMS_STEP_CLICK_ON_BACK = A;
var v = "TermsStepClickOnClose";
n.TERMS_STEP_CLICK_ON_CLOSE = v;
var I = "SuccessfulLoginWithSocialNetwork";
n.SUCCESSFUL_LOGIN_WITH_SOCIAL_NETWORK = I;
var m = "LinkedExistingAccount";
n.LINKED_EXISTING_ACCOUNT = m;
var S = "CreatedAccountFromLoginFlow";
n.CREATED_ACCOUNT_FROM_LOGIN_FLOW = S;
var L = "T&C popup viewed";
n.TC_STEP_VIEW = L;
var h = (i = {}, r(i, s.KNOWN_CLIENT_ID_FACEBOOK, "FacebookDna"), r(i, s.KNOWN_CLIENT_ID_GOOGLE, "GoogleDna"), 
r(i, "PREFIX", "DnaFlow"), i);
n.FLOW_DNA = h;
var b = (o = {}, r(o, s.KNOWN_CLIENT_ID_FACEBOOK, "FacebookGenealogy"), r(o, s.KNOWN_CLIENT_ID_GOOGLE, "GoogleGenealogy"), 
r(o, "PREFIX", "GenealogyFlow"), o);
n.FLOW_GENEALOGY = b;
var R = (a = {}, r(a, s.KNOWN_CLIENT_ID_FACEBOOK, "Facebook"), r(a, s.KNOWN_CLIENT_ID_GOOGLE, "Google"), 
a);
n.ID_TO_NETWORK = R;
var w = {
FLOW_GENEALOGY:b,
FLOW_DNA:h
};
n.FLOWS = w;
var F = "Google";
n.SCENARIO_GOOGLE = F;
var y = "Facebook";
n.SCENARIO_FACEBOOK = y;
var D = "SocialSignup";
n.GA_CATEGORY = D;
var P = "FLOW_GENEALOGY";
n.FLOW_NAME_GENEALOGY = P;
var U = "FLOW_DNA";
n.FLOW_NAME_DNA = U;
},
"5aef2a6e3fd48bb06a74":function(e, n, t) {
"use strict";
t.p = window.AssetManager ? window.AssetManager.R_JS("/FP/Assets/Cache/output/") :"";
},
"5c1b8abeb38be21bcd2e":function(e, n, t) {
"use strict";
function r(e) {
for (var n = 1; n < arguments.length; n++) {
var t = null != arguments[n] ? arguments[n] :{}, r = Object.keys(t);
"function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(t).filter(function(e) {
return Object.getOwnPropertyDescriptor(t, e).enumerable;
}))), r.forEach(function(n) {
i(e, n, t[n]);
});
}
return e;
}
function i(e, n, t) {
return n in e ? Object.defineProperty(e, n, {
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[n] = t, e;
}
function o(e) {
var n = e.onSuccess, t = e.onError, r = e.appId;
window.fbAsyncInit = function() {
FB.init({
appId:r,
cookie:!0,
xfbml:!0,
version:"v2.9"
}), void 0 !== n && n();
}, function(e, n, r) {
var i, o = e.getElementsByTagName(n)[0];
e.getElementById(r) || (i = e.createElement(n), t && (i.onerror = t), i.id = r, 
i.src = "//connect.facebook.net/en_US/sdk.js", o.parentNode.insertBefore(i, o));
}(document, "script", "facebook-jssdk");
}
function a(e) {
return new Promise(function(n, t) {
window.FB ? FB.login(function() {
n.apply(void 0, arguments);
}, r({
scope:"public_profile,email,user_birthday"
}, e)) :t({
type:u.ERR_FB_NOT_AVAILABLE
});
});
}
function s() {
return new Promise(function(e, n) {
FB.getAccessToken() ? FB.api("/me", {
fields:"gender, email, first_name, last_name, birthday, permissions, picture.width(320)"
}, function(n) {
var t = n.gender, r = n.email, i = n.first_name, o = n.last_name, a = n.birthday, s = n.permissions, c = n.picture;
e({
signUpData:{
gender:u.FB_GENDER_MAP[t],
signupFirstName:i,
signupLastName:o,
signupBirthYear:new Date(a).getFullYear(),
email:r,
signupEmail:r,
partner_unique_identifier:FB.getUserID(),
partner_token:FB.getAccessToken(),
partner_id:u.KNOWN_CLIENT_ID_FACEBOOK,
profile_picture_url:c && c.data ? c.data.url :null
},
birthDate:new Date(a),
permissions:s && s.data
});
}) :n({
type:"socialAuthError"
});
});
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.init = o, n.login = a, n.getUserData = s;
var u = t("87c7a1aa683980bcbd97");
},
"698d75b157f24ae829cc":function(e, n) {
var t;
t = function() {
return this;
}();
try {
t = t || new Function("return this")();
} catch (r) {
"object" == typeof window && (t = window);
}
e.exports = t;
},
"77a7b674cf801aaf6039":function(e, n, t) {
"use strict";
function r(e) {
var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :null, t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] :window;
n ? t.open(e, n) :t.location.href = e;
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n["default"] = r;
},
"84981c1f2f19bdbc06c6":function(e, n, t) {
"use strict";
function r(e, n) {
return a(e) || o(e, n) || i();
}
function i() {
throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function o(e, n) {
var t = [], r = !0, i = !1, o = void 0;
try {
for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (t.push(a.value), 
!n || t.length !== n); r = !0) ;
} catch (u) {
i = !0, o = u;
} finally {
try {
r || null == s["return"] || s["return"]();
} finally {
if (i) throw o;
}
}
return t;
}
function a(e) {
return Array.isArray(e) ? e :void 0;
}
function s(e, n) {
if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function u(e, n) {
for (var t = 0; t < n.length; t++) {
var r = n[t];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
function c(e, n, t) {
return n && u(e.prototype, n), t && u(e, t), e;
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.DateParserService = void 0;
var l = "-,/ 	", _ = "Invalid date", d = "Invalid year", O = "Invalid param", f = function() {
function e(n, t) {
s(this, e), this.months = n, this.isMiddleEndian = t, this.parseResult = {};
}
return c(e, [ {
key:"parse",
value:function(e) {
if ("string" != typeof e) this.parseResult.error = O; else {
var n = new RegExp("(?:[".concat(l, "]|\\.(?![").concat(l, "]))+"), "g"), t = e.split(n), i = r(t, 4), o = i[0], a = i[1], s = i[2], u = i[3];
u ? this.parseResult.error = _ :this.isYear(s) ? this.parseMonthAndDay(o, a, s) :this.isYear(a) ? this.parseMonthAndDay(o, s, a) :this.isYear(o) ? a ? this.parseMonthAndDay(a, s, o) :this.createDate(null, null, o) :this.parseResult.error = d;
}
return this.parseResult;
}
}, {
key:"parseMonthAndDay",
value:function(e, n, t) {
this.isConclusive(e, n) ? this.createDate(e, n, t) :this.isConclusive(n, e) ? this.createDate(n, e, t) :this.isMonthWithoutDay(e, n) ? this.createDate(null, e, t) :this.isMonthNumber(e) && this.isMonthNumber(n) ? this.handleUnsureOrder(e, n, t) :this.parseResult.error = _;
}
}, {
key:"createDate",
value:function(e, n, t) {
var r = this.getFixedDate(e, n, t);
this.setDate(r);
}
}, {
key:"setDate",
value:function(e) {
e ? this.parseResult.date = e :this.parseResult.error = _;
}
}, {
key:"getFixedDate",
value:function(e, n, t) {
e = this.getFixedDay(e), n = this.getFixedMonth(n), t = this.getFixedYear(t);
var r = new Date(t, (n || 1) - 1, e || 1);
return isNaN(r.getDate()) || n && r.getMonth() !== n - 1 ? null :{
day:e,
month:n,
year:t
};
}
}, {
key:"getFixedDay",
value:function(e) {
return +e;
}
}, {
key:"getFixedMonth",
value:function(e) {
return +(this.months[this.getFixedMonthName(e)] || e);
}
}, {
key:"getFixedMonthName",
value:function(e) {
return ("" + e).toLowerCase();
}
}, {
key:"getFixedYear",
value:function(e) {
return +e;
}
}, {
key:"getAge",
value:function(n) {
return e.calculateAge(this.parseResult.date);
}
}, {
key:"isDay",
value:function(e) {
var n = +e;
return !isNaN(n) && n > 0 && 32 > n;
}
}, {
key:"isMonth",
value:function(e) {
return this.isMonthNumber(e) || this.isMonthString(e);
}
}, {
key:"isMonthNumber",
value:function(e) {
var n = +e;
return !isNaN(n) && n > 0 && 13 > n;
}
}, {
key:"isMonthString",
value:function(e) {
return this.months[this.getFixedMonthName(e)];
}
}, {
key:"isYear",
value:function(e) {
return !isNaN(+e) && (4 === e.length || 3 === e.length);
}
}, {
key:"isConclusive",
value:function(e, n) {
return this.isConclusiveNumber(e, n) || this.isConclusiveMonthAndDay(e, n);
}
}, {
key:"isConclusiveNumber",
value:function(e, n) {
return this.isDay(e) && !this.isMonthNumber(e) && this.isMonthNumber(n);
}
}, {
key:"isConclusiveMonthAndDay",
value:function(e, n) {
return this.isDay(e) && this.isMonthString(n);
}
}, {
key:"isMonthWithoutDay",
value:function(e, n) {
return !n && this.isMonth(e);
}
}, {
key:"handleUnsureOrder",
value:function(e, n, t) {
if (e === n) this.createDate(e, n, t); else {
var r = this.getFixedDate(e, n, t), i = this.getFixedDate(n, e, t);
i ? r ? this.parseResult.date = this.isMiddleEndian ? [ i, r ] :[ r, i ] :this.setDate(i) :this.setDate(r);
}
}
} ], [ {
key:"calculateAge",
value:function(e) {
var n = new Date(Date.now() - e.getTime());
return Math.abs(n.getUTCFullYear() - 1970);
}
}, {
key:"parseDate",
value:function(n) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] :{}, r = t.months, i = void 0 === r ? {} :r, o = t.isMiddleEndian, a = new e(i, o);
return a.parse(n);
}
} ]), e;
}();
n.DateParserService = f;
},
"87c7a1aa683980bcbd97":function(e, n, t) {
"use strict";
function r(e, n, t) {
return n in e ? Object.defineProperty(e, n, {
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[n] = t, e;
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.SIGNUP_RETURN_CODE_SUCCESS = n.NODE_ID_TERMS_CHECKBOX = n.NETWORK_NAMES = n.ERR_FB_NOT_AVAILABLE = n.FB_STATUS_CONNECTED = n.KNOWN_CLIENT_ID_GOOGLE = n.KNOWN_CLIENT_ID_FACEBOOK = n.ACCOUNT_STATUS_ERROR = n.ACCOUNT_STATUS_NEW_MEMBER = n.ACCOUNT_STATUS_MAIL_EXIST = n.ACCOUNT_STATUS_LINKED = n.ERROR_LOG_URL = n.AUTH_WITH_SOCIAL_NETWORK_URL = n.SIGNUP_MEMBER_URL = n.CHECK_ACCOUNT_STATUS_URL = n.FB_GENDER_MAP = void 0;
var i, o = {
male:"M",
female:"F"
};
n.FB_GENDER_MAP = o;
var a = "/FP/API/Utilities/checkAccountStatus.php";
n.CHECK_ACCOUNT_STATUS_URL = a;
var s = "/FP/API/SignupPopup/signupMember.php";
n.SIGNUP_MEMBER_URL = s;
var u = "/FP/API/Utilities/authenticateWithSocialNetwork.php";
n.AUTH_WITH_SOCIAL_NETWORK_URL = u;
var c = "/FP/API/ErrorLog/social-signup-error.php";
n.ERROR_LOG_URL = c;
var l = 2;
n.ACCOUNT_STATUS_LINKED = l;
var _ = 1;
n.ACCOUNT_STATUS_MAIL_EXIST = _;
var d = 0;
n.ACCOUNT_STATUS_NEW_MEMBER = d;
var O = -1;
n.ACCOUNT_STATUS_ERROR = O;
var f = 2222;
n.KNOWN_CLIENT_ID_FACEBOOK = f;
var E = 3333;
n.KNOWN_CLIENT_ID_GOOGLE = E;
var g = "connected";
n.FB_STATUS_CONNECTED = g;
var N = "fb_not_available";
n.ERR_FB_NOT_AVAILABLE = N;
var p = (i = {}, r(i, f, "facebook"), r(i, E, "google"), i);
n.NETWORK_NAMES = p;
var T = "agreeTerms";
n.NODE_ID_TERMS_CHECKBOX = T;
var C = 1;
n.SIGNUP_RETURN_CODE_SUCCESS = C;
},
"8c6a28adcf76fcad4a89":function(e, n, t) {
"use strict";
t("5aef2a6e3fd48bb06a74");
var r = t("085980ef13ef519a645f"), i = t("a4eee4d5442c9b450f81"), o = t("87c7a1aa683980bcbd97"), a = function() {
if ("ready" !== window.socialSignupInitFlag) {
var e = window.socialSignupExposure, n = e.facebookExposed, t = e.googleExposed, a = window.socialSignupFacebookConfig.appId, s = r.initStatisticsService(window.socialSignupFlow);
window.getSocialLinkageInfo = r.getSocialLinkageInfo, n && (jQuery(document).on("click", ".facebook_login_button", function() {
i.handleSocialAuthFromLegacyForm(this, o.KNOWN_CLIENT_ID_FACEBOOK);
}), r.initFacebookAPI(a)), t && (jQuery(document).on("click", ".google_login_button", function() {
i.handleSocialAuthFromLegacyForm(this, o.KNOWN_CLIENT_ID_GOOGLE);
}), r.initGoogleAPI()), jQuery(document).on("click", "#agree_and_continue_button", function() {
s.reportTCAgreeButtonClick();
}), jQuery(document).on("click", ".popup_close", function() {
jQuery.find("#agree_and_continue_button").length > 0 && s.reportTCCloseButtonClick();
}), window.socialSignupInitFlag = "ready";
}
};
document.addEventListener("init_social_buttons", a), window.socialSignupExposure && a();
},
a4eee4d5442c9b450f81:function(e, n, t) {
"use strict";
function r(e) {
return e && e.__esModule ? e :{
"default":e
};
}
function i(e, n, t) {
return n in e ? Object.defineProperty(e, n, {
value:t,
enumerable:!0,
configurable:!0,
writable:!0
}) :e[n] = t, e;
}
function o(e, n) {
var t = "true" === e.dataset.isLogin, r = u.getWindow(), i = r.successfulLoginCallback, o = r.callbackExtraParameter, a = e.dataset.destinationUrl ? function() {
return c["default"](e.dataset.destinationUrl);
} :u.getWindow().successfulSignupCallback, s = function() {
return _[n]({
isLogin:t,
handleErrorEmailExists:O,
successfulSignupCallback:a ? function(e, n) {
return a(e, n, o);
} :void 0,
successfulLoginCallback:i,
registrationReason:e.dataset.signupReason
});
};
e.disabled = !0, e.classList.add("disabled");
var l = function() {
e.disabled = !1, e.classList.remove("disabled");
};
return ("true" === e.dataset.requireTerms ? d().then(s) :s()).then(l)["catch"](l);
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.handleSocialAuthFromLegacyForm = o;
var a, s = t("085980ef13ef519a645f"), u = t("c27cdd1b7c76313bdfab"), c = r(t("77a7b674cf801aaf6039")), l = t("87c7a1aa683980bcbd97"), _ = (a = {}, 
i(a, l.KNOWN_CLIENT_ID_GOOGLE, s.loginWithGoogle), i(a, l.KNOWN_CLIENT_ID_FACEBOOK, s.loginWithFacebook), 
a), d = function() {
var e = document.getElementById(l.NODE_ID_TERMS_CHECKBOX);
return e && e.checked ? Promise.resolve() :new Promise(function(e) {
var n = u.getWindow();
n.openTermsStep && (n.openTermsStep(function() {
n.closeNewPopup(), e();
}), s.getStatisticService().reportTCStepView());
});
}, O = function(e, n) {
var t = u.getWindow().socialSignupTranslations || {};
u.getWindow().openSignupPopup(u.getWindow().languageCode, {
popupType:"loginOnly",
flavor:"linkSocialAccount",
emailValue:n,
focusOnPreFillValueType:"email",
preFillFieldType:"email",
loginTitle:t["Account exist"],
socialNetworkId:e
});
};
},
b45312c3f297dfaa5e2c:function(e, n) {
e.exports = axios;
},
c27cdd1b7c76313bdfab:function(e, n, t) {
"use strict";
(function(e) {
function t() {
var n = null;
return "undefined" != typeof window && "Window" === window.constructor.name ? n = window :"undefined" != typeof e && (n = e), 
n;
}
function r() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] :window;
return e;
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n.getGlobal = t, n.getWindow = r;
}).call(this, t("698d75b157f24ae829cc"));
},
d69a8f91fce45c45409d:function(e, n, t) {
"use strict";
function r(e, n, t, r) {
var i = new MH_Dialog({
title:e,
message:n,
buttons:{
secondary:!1,
primary:{
text:t,
click:function() {
r && r(), i.close();
}
}
},
iconClassName:"social_signup_message_icon",
customClass:"social_signup_error_message"
});
}
Object.defineProperty(n, "__esModule", {
value:!0
}), n["default"] = void 0;
var i = t("87c7a1aa683980bcbd97"), o = function(e, n) {
return {
unknownFail:function(t, o) {
if (n(), e.reportFailUnknownReason(t), window.writeActivityIndicator("SignupSignin.FailedToCreateAccountUnknownReason"), 
navigator.sendBeacon) {
var a = new FormData();
a.append("message", o), a.append("socialNetwork", t), a.append("csrf_token", window.mhXsrfToken), 
navigator.sendBeacon(i.ERROR_LOG_URL, a);
}
r(window.socialSignupTranslations["Unknown Error title"], window.socialSignupTranslations["Unknown Error message"], window.socialSignupTranslations.ok);
},
failNoPermission:function(t) {
n(), e.reportFailNoPermissions(t), r(window.socialSignupTranslations["Failed to create account"], window.socialSignupTranslations["Provide permissions"], window.socialSignupTranslations.ok);
},
serviceUnavailable:function(t) {
n(), e.reportFailServiceUnavailable(t), r(window.socialSignupTranslations["Unknown Error title"], window.socialSignupTranslations["service is unavailable"].replace("{social_network}", window.socialSignupTranslations[i.NETWORK_NAMES[t]]), window.socialSignupTranslations.ok);
},
failNewAccountFromLogin:function(n) {
e.reportFailNoAccount(n), r(window.socialSignupTranslations["no account title"], window.socialSignupTranslations["no account message"], window.socialSignupTranslations.ok, function() {
window.CompanyHome ? (closeNewPopup(), setTimeout(function() {
return window.CompanyHome.openSignupForm();
}, 500)) :window.signupClicked && window.signupClicked();
});
}
};
};
n["default"] = o;
}
});
